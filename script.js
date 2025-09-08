// Mensagens
const MENSAGEM_VAZIA_HISTORICO = "Nenhum cálculo no histórico.";
const MENSAGEM_VAZIO_CALCULO = "Nenhum cálculo no momento.";

// Elementos
const btnCalcular = document.getElementById("btnCalcular");
const btnExportar = document.getElementById("btnExportar");
const btnLimpar = document.getElementById("btnLimpar");
const btnLimparCalculo = document.getElementById("btnLimparCalculo");
const listaHistorico = document.getElementById("listaHistorico");
const historicoDiv = document.getElementById("historico");
const resultadoDiv = document.getElementById("resultado");
const graficoCanvas = document.getElementById("grafico");
const mensagemErro = document.getElementById("mensagemErro");

let historico = JSON.parse(localStorage.getItem("historicoSalarios")) || [];
let grafico = null;

// Inicializar histórico
atualizarListaHistorico();

// Eventos
btnCalcular.addEventListener("click", calcular);
btnExportar.addEventListener("click", exportarPDF);
btnLimpar.addEventListener("click", limparHistorico);
btnLimparCalculo.addEventListener("click", limparCalculo);

// ----- Cálculo INSS 2025 -----
function calcularINSS(salario) {
    const faixas = [
        { teto: 1518.00, aliquota: 0.075 },
        { teto: 2793.88, aliquota: 0.09 },
        { teto: 4190.83, aliquota: 0.12 },
        { teto: 8157.41, aliquota: 0.14 }
    ];
    let restante = salario;
    let total = 0;
    for (let i = 0; i < faixas.length; i++) {
        let base = i === 0 ? Math.min(restante, faixas[i].teto) : Math.min(restante, faixas[i].teto - faixas[i-1].teto);
        if(base>0){ total += base*faixas[i].aliquota; restante -= base; }
    }
    return Math.min(total, 8157.41*0.14);
}

// ----- Cálculo IR 2025 -----
function calcularIR(salarioBase){
    const faixas = [
        { limite: 2428.80, aliquota:0, deducao:0 },
        { limite: 2826.65, aliquota:0.075, deducao:142.80 },
        { limite: 3751.05, aliquota:0.15, deducao:354.80 },
        { limite: 4664.68, aliquota:0.225, deducao:636.13 },
        { limite: Infinity, aliquota:0.275, deducao:869.36 }
    ];
    const faixa = faixas.find(f => salarioBase <= f.limite);
    return Math.max(0, salarioBase*faixa.aliquota - faixa.deducao);
}

// ----- Função principal -----
function calcular(){
    const bruto = parseFloat(document.getElementById("salario").value);
    if(isNaN(bruto) || bruto<=0){ mostrarErro("Digite um salário válido!"); return; }

    const inss = calcularINSS(bruto);
    const ir = calcularIR(bruto - inss);
    const liquido = bruto - inss - ir;

    const percINSS = ((inss/bruto)*100).toFixed(2);
    const percIR = ((ir/bruto)*100).toFixed(2);
    const percLiquido = ((liquido/bruto)*100).toFixed(2);

    resultadoDiv.classList.remove("hidden");
    graficoCanvas.classList.remove("hidden");
    btnLimparCalculo.classList.remove("hidden");

    resultadoDiv.innerHTML = `
        <p><strong>Salário Bruto:</strong> R$ ${bruto.toFixed(2)}</p>
        <p><strong>INSS:</strong> R$ ${inss.toFixed(2)} (${percINSS}%)</p>
        <p><strong>IR:</strong> R$ ${ir.toFixed(2)} (${percIR}%)</p>
        <p style="font-size:1.3rem;color:#4CAF50"><strong>Salário Líquido: R$ ${liquido.toFixed(2)} (${percLiquido}%)</strong></p>
    `;

    gerarGrafico(inss, ir, liquido);
    adicionarHistorico(bruto, inss, ir, liquido);
}

// ----- Gráfico -----
function gerarGrafico(inss, ir, liquido){
    if(grafico) grafico.destroy();

    grafico = new Chart(graficoCanvas, {
        type: "doughnut",
        data:{
            labels:["INSS","IR","Líquido"],
            datasets:[{ data:[inss,ir,liquido], backgroundColor:["#667eea","#764ba2","#4CAF50"] }]
        },
        options:{
            plugins:{
                tooltip:{
                    callbacks:{
                        label: function(context){
                            const total = context.dataset.data.reduce((a,b)=>a+b,0);
                            const perc = ((context.raw/total)*100).toFixed(2);
                            return `${context.label}: R$${context.raw.toFixed(2)} (${perc}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ----- Histórico -----
function adicionarHistorico(salario, inss, ir, liquido){
    historicoDiv.classList.remove("hidden");

    historico.push({salario,inss,ir,liquido,data:new Date().toLocaleString("pt-BR")});
    localStorage.setItem("historicoSalarios", JSON.stringify(historico));
    atualizarListaHistorico();
}

function atualizarListaHistorico(){
    listaHistorico.innerHTML = "";
    if(historico.length===0){
        listaHistorico.innerHTML = `<li style="color:gray;">${MENSAGEM_VAZIA_HISTORICO}</li>`;
        historicoDiv.classList.add("hidden");
        return;
    }
    historico.forEach((item,index)=>{
        const li=document.createElement("li");
        li.textContent=`[${item.data}] Bruto: R$${item.salario.toFixed(2)} | INSS: R$${item.inss.toFixed(2)} | IR: R$${item.ir.toFixed(2)} | Líquido: R$${item.liquido.toFixed(2)}`;
        if(index===historico.length-1){ li.style.background="#e8e8ff"; li.style.fontWeight="bold"; li.style.borderRadius="5px"; }
        listaHistorico.appendChild(li);
    });
}

// ----- Exportar PDF -----
function exportarPDF(){
    if(historico.length===0){ mostrarErro("Não há histórico para exportar!"); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Histórico de Cálculos - Salário Líquido 2025",10,10);
    doc.setFontSize(11);
    let y=20;
    historico.forEach(item=>{
        doc.text(`[${item.data}] Bruto: R$${item.salario.toFixed(2)} | INSS: R$${item.inss.toFixed(2)} | IR: R$${item.ir.toFixed(2)} | Líquido: R$${item.liquido.toFixed(2)}`,10,y);
        y+=10;
        if(y>280){ doc.addPage(); y=20; }
    });
    doc.save("historico_salarios.pdf");
}

// ----- Limpar histórico -----
function limparHistorico(){
    historico=[];
    localStorage.removeItem("historicoSalarios");
    atualizarListaHistorico();
}

// ----- Limpar cálculo -----
function limparCalculo(){
    resultadoDiv.classList.add("hidden");
    graficoCanvas.classList.add("hidden");
    btnLimparCalculo.classList.add("hidden");
    if(grafico){ grafico.destroy(); grafico=null; }
    document.getElementById("salario").value="";
}

// ----- Mensagem de erro -----
function mostrarErro(msg){
    mensagemErro.textContent=msg;
    mensagemErro.classList.remove("hidden");
    setTimeout(()=>{ mensagemErro.classList.add("hidden"); },3000);
}
