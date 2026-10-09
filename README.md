# 💰 Calculadora de Salário Líquido

Aplicação web para estimar o salário líquido a partir do salário bruto, considerando descontos de **INSS e Imposto de Renda Retido na Fonte (IRRF)**.

Desenvolvido com HTML5, CSS3 e JavaScript puro, o projeto reúne cálculo salarial, histórico de simulações, gráficos e exportação dos resultados em PDF.

Projeto criado por **André Waldige** para estudo e portfólio de desenvolvimento web.

---

## 🌐 Demonstração Online

🔗 **[Acessar a Calculadora de Salário Líquido](https://calculadora-de-salario-liquido.vercel.app/)**

---

## ✨ Funcionalidades

- 💰 Cálculo do salário líquido a partir do salário bruto
- 🧾 Estimativa dos descontos de INSS e IRRF
- 📊 Gráfico com a distribuição entre salário líquido e descontos
- 📜 Histórico dos cálculos realizados
- 💾 Armazenamento local do histórico com `localStorage`
- 📄 Exportação do histórico em PDF
- 🧹 Opção para limpar o cálculo atual
- 🗑️ Opção para apagar o histórico
- ✅ Validação de entradas inválidas
- 📱 Interface responsiva

---

## 🖼️ Demonstração Visual

![IMG_1261](https://github.com/user-attachments/assets/69b31e45-e62a-48fc-bf10-ceee1de8f1a5)
![IMG_1262](https://github.com/user-attachments/assets/0948fee1-2e7e-4b02-9059-0ac7d41654ac)
![IMG_1263](https://github.com/user-attachments/assets/2954694c-5945-4ea8-a9dd-01d50b4a107c)
![IMG_1264](https://github.com/user-attachments/assets/49a84945-23f8-4701-b9ba-61d9b96d956b)


---

## 🧰 Tecnologias Utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e responsividade |
| JavaScript (Vanilla) | Cálculos, eventos e manipulação do DOM |
| Chart.js | Criação dos gráficos |
| jsPDF | Geração de arquivos PDF |
| LocalStorage | Persistência local do histórico |

---

## ▶️ Como Utilizar

### Acessar online

1. Abra a [calculadora no navegador](https://calculadora-de-salario-liquido.vercel.app/).
2. Informe o salário bruto.
3. Clique em **Calcular**.
4. Consulte o salário líquido estimado e os descontos.
5. Confira o gráfico e o histórico de cálculos.
6. Utilize a opção de exportação para gerar um PDF do histórico.

### Executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/awaldige/calculadora-de-Salario-Liquido.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd calculadora-de-Salario-Liquido
   ```

3. Abra o arquivo `index.html` no navegador.

Não é necessário instalar um backend para a execução básica. As bibliotecas utilizadas pela aplicação precisam estar disponíveis conforme as referências definidas no HTML.

---

## 📂 Estrutura do Projeto

```text
calculadora-de-Salario-Liquido/
├── index.html    # Estrutura da aplicação
├── style.css     # Estilos e responsividade
├── script.js     # Cálculos, histórico e gráficos
└── README.md     # Documentação do projeto
```

---

## ⚠️ Observação sobre os cálculos

A implementação atual utiliza as tabelas de INSS e IRRF de **2025**. Os resultados são estimativas e podem não contemplar todas as particularidades de uma folha de pagamento real.

Antes de utilizar os valores para decisões financeiras, confira as regras oficiais vigentes e considere descontos ou condições individuais que não estejam contemplados na aplicação.

---

## 🔮 Melhorias Futuras

- Atualização das tabelas de INSS e IRRF para o ano vigente
- Testes automatizados para validar os cálculos por faixa salarial
- Inclusão de dependentes e outros descontos configuráveis
- Comparação entre diferentes cenários salariais
- Aprimoramentos de acessibilidade
- Exportação de relatórios com apresentação mais detalhada

---

## 👨‍💻 Autor

**André Waldige — AW TECHNOLOGY**

🔗 [GitHub: @awaldige](https://github.com/awaldige)

---

⭐ Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório!







