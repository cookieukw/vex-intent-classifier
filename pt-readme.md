# Classificador de Intenções Híbrido em TypeScript

Um classificador de intenções NLU (Natural Language Understanding) leve, executado 100% no lado do cliente (client-side), escrito em TypeScript.  
Este projeto utiliza uma abordagem híbrida para classificar a intenção de um usuário a partir de uma mensagem de texto, combinando a precisão da similaridade de string com a robustez da análise semântica.


✨ **[Veja uma demonstração online do Classificador de Intenções Híbrido](https://vex-intent-classifier.netlify.app/)**

✨ **[Veja o código fonte do Classificador de Intenções Híbrido](https://github.com/Vex-AI/Vex-AI/tree/main/classes)**

---

## Sobre o Projeto
Este classificador foi projetado para ser o "cérebro" de um chatbot ou assistente virtual que precisa entender a linguagem humana sem depender de APIs externas.  
Por ser executado inteiramente no navegador, ele oferece respostas de baixa latência e garante a privacidade dos dados do usuário.

📖 Para a versão em inglês, visite [`readme.md`](./readme.md).

---

## Principais Características
- **Arquitetura Híbrida:** Utiliza uma estratégia de duas etapas para máxima eficiência e precisão.  
- **Client-Side:** Sem necessidade de um servidor para o processamento de NLU.  
- **Leve e Rápido:** Otimizado para performance em aplicações web.  
- **Tolerante a Erros:** Lida com erros de digitação e variações na formulação de frases.  

---

## Como Funciona
O classificador opera em duas fases principais: **Treinamento** e **Predição**.

### 1. Fase de Treinamento (`async train()`)
Antes de poder classificar mensagens, o modelo precisa ser treinado com um conjunto de intenções e frases de exemplo. O processo envolve:

- **Carregamento de Dados:** As intenções e suas frases de treinamento são carregadas (a partir de um banco local como o `vexDB`).  
- **Cálculo do IDF (Inverse Document Frequency):** O classificador calcula a importância e raridade de cada palavra.  
- **Vetorização TF-IDF:** Cada intenção recebe um vetor TF-IDF, que funciona como uma “impressão digital” semântica.  

### 2. Fase de Predição (`predict()`)
Quando uma mensagem é enviada, o pipeline segue duas etapas:

#### Etapa 1: Similaridade de String (Levenshtein)
- Compara a mensagem com frases de treinamento via **Distância de Levenshtein**.  
- Se encontrar correspondência próxima (considerando erros de digitação), retorna a intenção de imediato.  

#### Etapa 2: Similaridade Semântica (Cosseno)
- Caso a etapa anterior falhe, a mensagem é convertida em vetor TF-IDF.  
- Calcula-se a **Similaridade de Cosseno** com as intenções treinadas.  
- Retorna a intenção com maior similaridade, desde que acima de um limiar mínimo de confiança.  

---

## Como Usar
Exemplo básico em TypeScript:

```ts
// Importa a classe do classificador
import { IntentClassifier } from './lib/IntentClassifier';

// 1. Cria uma instância
const classifier = new IntentClassifier();

// 2. Treina com os dados
async function initializeClassifier() {
  await classifier.train();
  console.log("Classificador treinado e pronto!");
}
initializeClassifier();

// 3. Predição de intenção
function findIntent(message: string) {
  const result = classifier.predict(message, 0.35); // limiar de confiança: 35%

  if (result) {
    console.log(`Intenção Encontrada: ${result.intent}`);
    console.log(`Confiança: ${(result.confidence * 100).toFixed(2)}%`);
    console.log(`Resposta Sugerida: ${result.response}`);
    // >> Retorna a resposta para o usuário
  } else {
    console.log("Nenhuma intenção encontrada com confiança suficiente.");
    // >> Mensagem de fallback: "Não entendi"
  }
}

// Exemplos
findIntent("oi, tudo bem?");
findIntent("quero pagar minha fatura");
````

---

## Dependências

* **@/lib/vexDB:** Instância do Dexie.js ou outro wrapper de banco de dados para intenções.
* **./nlp-util:** Funções de PLN como `cleanAndTokenize`, `levenshtein` e `cosineSimilarity`.

---

## Autor

**cookieukw** - [GitHub](https://github.com/cookieukw)

---

## Licença

Este projeto está licenciado sob a **Licença MIT**.
Veja o arquivo LICENSE para mais detalhes.
