# Hybrid Intent Classifier in TypeScript

A lightweight NLU (Natural Language Understanding) intent classifier, running 100% on the client-side, written in TypeScript.  
This project uses a hybrid approach to classify a user's intent from text messages, combining the accuracy of string similarity with the robustness of semantic analysis.

✨ **[Check out the Hybrid Intent Classifier online demo](https://vex-intent-classifier.netlify.app/)**

## ✨ **[Check out the Hybrid Intent Classifier source code](https://github.com/Vex-AI/Vex-AI/tree/main/classes)**

## About the Project

This classifier is designed to be the "brain" of a chatbot or virtual assistant that needs to understand human language without relying on external APIs.  
Since it runs entirely in the browser, it provides low-latency responses and ensures user data privacy.

📖 For the Portuguese version, see [`pt-readme.md`](./pt-readme.md).

---

## Key Features

- **Hybrid Architecture:** Two-step strategy for maximum efficiency and accuracy.
- **Client-Side:** No server required for NLU processing.
- **Lightweight and Fast:** Optimized for performance in web applications.
- **Error-Tolerant:** Handles typos and variations in phrasing.

---

## How It Works

The classifier operates in two main phases: **Training** and **Prediction**.

### 1. Training Phase (`async train()`)

Before it can classify messages, the model must be trained with a set of intents and example phrases. The process involves:

- **Data Loading:** Intents and training phrases are loaded (e.g., from a local database such as `vexDB`).
- **IDF Calculation (Inverse Document Frequency):** The classifier determines the importance and rarity of each word.
- **TF-IDF Vectorization:** Each intent is transformed into a TF-IDF vector, a semantic “fingerprint” representing its meaning numerically.

### 2. Prediction Phase (`predict()`)

When a user sends a message, the classifier runs a two-step pipeline:

#### Step 1: String Similarity (Levenshtein)

- Compares the input with training phrases using **Levenshtein Distance**.
- If a close match is found (typo-tolerant), the corresponding intent is returned immediately.

#### Step 2: Semantic Similarity (Cosine)

- If the first step fails, the input is converted into a TF-IDF vector.
- Computes **Cosine Similarity** between the input vector and trained intent vectors.
- Returns the intent with the highest similarity score, provided it exceeds a minimum confidence threshold.

---

## Usage Example

Basic usage in TypeScript:

```ts
// Import the classifier
import { IntentClassifier } from "./lib/IntentClassifier";

// 1. Create an instance
const classifier = new IntentClassifier();

// 2. Train the classifier
async function initializeClassifier() {
  await classifier.train();
  console.log("Classifier trained and ready!");
}
initializeClassifier();

// 3. Predict an intent
function findIntent(message: string) {
  const result = classifier.predict(message, 0.35); // confidence threshold: 35%

  if (result) {
    console.log(`Intent Found: ${result.intent}`);
    console.log(`Confidence: ${(result.confidence * 100).toFixed(2)}%`);
    console.log(`Suggested Response: ${result.response}`);
    // >> Return this response to the user
  } else {
    console.log("No intent found with sufficient confidence.");
    // >> Return a fallback response, e.g., "I didn’t understand"
  }
}

// Examples
findIntent("hi, how are you?");
findIntent("I want to pay my bill");
```

---

## Dependencies

- **@/lib/vexDB:** A Dexie.js instance or other DB wrapper to store and retrieve intents.
- **./nlp-util:** Utility module containing NLP functions such as `cleanAndTokenize`, `levenshtein`, and `cosineSimilarity`.

---

## Author

**cookieukw** - [GitHub](https://github.com/cookieukw)

---

## License

This project is licensed under the **MIT License**.
See the LICENSE file for details.
