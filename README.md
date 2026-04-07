# pwii-luiz-batista
Aula de Programação Aplicativos Mobile ll com o professor João Siles

# 🧮 Calculadora em React Native

Calculadora simples feita com **React Native** e **TypeScript**, focada em organização e boas práticas.

----------

## 🚀 Funcionalidades

-   Operações básicas: +, -, x, ÷
-   Suporte a decimais e parênteses
-   Ações: limpar (`AC`), apagar (`⌫`) e calcular (`=`)

----------

## 🧠 Estrutura

-   **Estado**
    -   `expressao`: entrada do usuário
    -   `resultado`: valor exibido
-   **Lógica**
    -   `lidarComToque`: controla entrada, valida operadores e calcula resultado
-   **Componente**
    -   `Botao`: reutilizável e estilizado dinamicamente

----------

## ⚠️ Observação

Utiliza `eval()` para cálculos — em produção, prefira alternativas seguras.

----------

## 🛠️ Tecnologias

-   React Native
-   TypeScript
