 const intents = {
    pt: [
      {
        name: "saudacao",
        trainingPhrases: ["oi", "olá", "bom dia", "tudo bem"],
        responses: ["Olá! Como posso ajudar?"],
      },
      {
        name: "pagamento",
        trainingPhrases: ["pagar fatura", "ver boleto", "quero pagar a conta"],
        responses: ["Ok, redirecionando para a seção de pagamentos."],
      },
      {
        name: "despedida",
        trainingPhrases: ["tchau", "até logo", "adeus"],
        responses: ["Até mais!"],
      },
    ],
    en: [
      {
        name: "greeting",
        trainingPhrases: ["hi", "hello", "good morning", "how are you"],
        responses: ["Hello! How can I help?"],
      },
      {
        name: "payment",
        trainingPhrases: ["pay bill", "see invoice", "i want to pay the bill"],
        responses: ["Ok, redirecting to the payment section."],
      },
      {
        name: "goodbye",
        trainingPhrases: ["bye", "see you later", "goodbye"],
        responses: ["See you!"],
      },
    ],
  };
