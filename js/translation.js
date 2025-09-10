  const translations = {
    en: {
      sidebar_title: "Classifier Analysis",
      nav_objective: "Objective & Scope",
      nav_architecture: "Hybrid Architecture",
      nav_training: "Training Phase",
      nav_prediction: "Prediction Phase",
      nav_optimizations: "Optimizations",
      nav_conclusion: "Conclusion",
      nav_manage_data: "Manage Data",
      nav_explorer: "Interactive Explorer",
      objective_title: "1. Objective and Scope of `IntentClassifier`",
      objective_p1:
        'The `IntentClassifier` acts as an <strong>NLU (Natural Language Understanding)</strong> engine. Its primary function is to receive a text input from the user (an "utterance") and classify it into a predefined set of categories known as "intents." This component is fundamental for dialogue systems, such as chatbots, as it translates human language into structured commands that a system can process.',
      objective_li1:
        '<strong>Input:</strong> A text string (e.g., <code>"what is the status of my order?"</code>).',
      objective_li2:
        "<strong>Processing:</strong> Lexical and semantic analysis of the text.",
      objective_li3:
        '<strong>Output:</strong> The most likely intent (e.g., <code>"check_order_status"</code>) and an associated response.',
      architecture_title: "2. Hybrid Classification Architecture",
      architecture_p1:
        "The classifier implements a <strong>two-stage hybrid approach</strong>, a strategy that aims to balance precision, recall, and performance. This pipeline architecture ensures that simple cases are resolved quickly, while more complex cases receive a deeper analysis.",
      flowchart_title: "Classification Flow",
      flowchart_input: "User Input",
      flowchart_step1_title: "Stage 1: String Similarity",
      flowchart_step1_desc:
        "Search for exact or misspelled matches via <strong>Levenshtein Distance</strong>.",
      flowchart_question: "Match Found?",
      flowchart_yes: "YES",
      flowchart_no: "NO",
      flowchart_return: "Return Intent",
      flowchart_step2_title: "Stage 2: Semantic Similarity",
      flowchart_step2_desc:
        "Meaning analysis with <strong>TF-IDF</strong> and <strong>Cosine Similarity</strong>.",
      training_title: "3. Analysis of the Training Process (`async train()`)",
      training_p1:
        "The `train()` method is responsible for preparing the classifier, transforming raw training data into usable mathematical models. This process is executed once before predictions can be made.",
      training_h3_1: "3.1. Corpus Collection and Preparation",
      training_p2:
        'Initially, data is loaded and processed. A "document" is created for each intent, aggregating all its training phrases. The `nlp.cleanAndTokenize` function performs crucial preprocessing tasks like tokenization, normalization, stopword removal, and stemming.',
      training_h3_2: "3.2. The Vector Space Model: TF-IDF",
      training_p3:
        "The heart of the semantic model is <strong>TF-IDF (Term Frequency-Inverse Document Frequency)</strong>, a statistical technique that assigns a weight to each word in a document, reflecting its importance.",
      training_idf_title: "a) IDF (Inverse Document Frequency)",
      training_idf_desc:
        'Measures the <strong>rarity</strong> of a word across the entire dataset. Rare words (e.g., "invoice") are more informative and receive a higher weight.',
      training_tf_title: "b) TF (Term Frequency)",
      training_tf_desc:
        "Measures the <strong>frequency</strong> of a word within a single document (intent). Words that appear more often are more relevant to that specific topic.",
      training_p4:
        'The final TF-IDF weight is the product of these two values, resulting in a <strong>vector</strong> that represents the semantic "fingerprint" of each intent.',
      prediction_title: "4. Analysis of the Prediction Process (`predict()`)",
      prediction_p1:
        "This method executes the two-stage pipeline to classify a new user message.",
      prediction_h3_1:
        "4.1. Stage 1: String Similarity Classification (Levenshtein)",
      prediction_p2:
        'The <strong>Levenshtein Distance</strong> is an algorithm that measures the "edit distance" between two strings. It calculates the minimum number of character insertions, deletions, or substitutions required to change one string into the other, making it ideal for catching typos. The implementation uses a dynamic threshold for greater flexibility.',
      prediction_h3_2:
        "4.2. Stage 2: Semantic Similarity Classification (Cosine)",
      prediction_p3:
        "If Stage 1 fails, the system resorts to <strong>Cosine Similarity</strong>. This metric measures the angle between the TF-IDF vectors of the user's message and each intent. A result close to 1 indicates high semantic similarity, while a result close to 0 indicates a low relationship. The result is only returned if it surpasses a predefined confidence threshold.",
      optimizations_title: "5. Architecture Analysis and Optimizations",
      optimizations_h3_1: "5.1. Strengths",
      optimizations_li1:
        "<strong>Hybrid Architecture:</strong> Robust combination of string-based and semantic methods.",
      optimizations_li2:
        "<strong>Client-Side Execution:</strong> Low latency and enhanced data privacy.",
      optimizations_li3:
        "<strong>Robustness:</strong> Correctly handles edge cases and unseen terms.",
      optimizations_h3_2: "5.2. Performance Optimization: Caching",
      optimizations_p1:
        "The main suggested optimization is <strong>caching</strong>. In the original implementation, training phrases are cleaned and tokenized on every `predict()` call. The solution is to preprocess these phrases once during the `train()` method and cache them. This moves the expensive computation to a one-time initialization phase, making subsequent predictions significantly faster and more scalable.",
      optimizations_code: "Example of optimization in the train() method",
      conclusion_title: "6. Conclusion",
      conclusion_p1:
        "The `IntentClassifier.ts` is a solid and successful implementation of an intent classifier for NLU. Its hybrid architecture results in an effective system. Applying optimizations, such as caching preprocessed data, can further enhance its performance for large-scale applications.",
      manage_data_title: "7. Manage Training Data",
      manage_data_p1:
        "Add new intents or more training phrases to existing ones to see how the classifier adapts. Changes are for this simulation only and will be lost on page reload.",
      manage_data_add_title: "Add New Intent",
      manage_data_name_label: "Intent Name",
      manage_data_name_placeholder: "e.g., product_info",
      manage_data_phrases_label: "Training Phrases (comma-separated)",
      manage_data_phrases_placeholder:
        "e.g., what is the price?, how much does it cost, tell me more about it",
      manage_data_response_label: "AI Response",
      manage_data_response_placeholder: "e.g., The price is $50.00.",
      manage_data_add_btn: "Add Intent",
      manage_data_add_phrase_btn: "Add Phrase",
      manage_data_phrases_title: "Training Phrases:",
      manage_data_response_title: "AI Response:",
      explorer_title: "🧪 Interactive Classifier Explorer",
      explorer_p1:
        "Enter a sentence below to simulate how the classifier would process your input. The simulation uses the training data above to demonstrate the two-stage logic in action.",
      explorer_label: "Your message:",
      explorer_placeholder: "Ex: hello, how are you?",
      explorer_button: "Classify",
      explorer_stage1_title:
        "Stage 1 Analysis: String Similarity (Levenshtein)",
      explorer_stage2_title: "Stage 2 Analysis: Semantic Similarity (Cosine)",
      explorer_final_title: "Final Result",
      sim_found_match: "Found a close match!",
      sim_closest_phrase: "Closest training phrase:",
      sim_lev_distance: "Levenshtein Distance:",
      sim_threshold: "Acceptance threshold:",
      sim_success: "Result:",
      sim_success_text: "Match found. Direct classification.",
      sim_no_match: "No string similarity match was found.",
      sim_failure_text: "Failure. Proceeding to Stage 2.",
      sim_comparing: "Comparing your message vector with each intent vector:",
      sim_intent_classified: "Classified Intent:",
      sim_confidence: "Confidence:",
      sim_ai_response: "AI Response:",
      sim_not_recognized: "Intent not recognized.",
      sim_confidence_low: "The highest confidence was",
      sim_below_threshold: "which is below the threshold of",
      sim_fallback_response: "Sorry, I didn't understand what you meant.",
    },
    pt: {
      sidebar_title: "Análise do Classificador",
      nav_objective: "Objetivo e Escopo",
      nav_architecture: "Arquitetura Híbrida",
      nav_training: "Fase de Treinamento",
      nav_prediction: "Fase de Predição",
      nav_optimizations: "Otimizações",
      nav_conclusion: "Conclusão",
      nav_manage_data: "Gerenciar Dados",
      nav_explorer: "Explorador Interativo",
      objective_title: "1. Objetivo e Escopo da Classe `IntentClassifier`",
      objective_p1:
        'O <code>IntentClassifier</code> funciona como um motor de <strong>NLU (Natural Language Understanding)</strong>. Sua função primária é receber uma entrada de texto do usuário (uma "utterance") e classificá-la dentro de um conjunto pré-definido de categorias, conhecidas como "intenções". Este componente é fundamental para sistemas de diálogo, como chatbots, pois traduz a linguagem humana em comandos estruturados que um sistema pode processar.',
      objective_li1:
        '<strong>Entrada:</strong> Uma string de texto (ex: <code>"qual o status do meu pedido?"</code>).',
      objective_li2:
        "<strong>Processamento:</strong> Análise léxica e semântica do texto.",
      objective_li3:
        '<strong>Saída:</strong> A intenção mais provável (ex: <code>"verificar_status_pedido"</code>) e uma resposta associada.',
      architecture_title: "2. Arquitetura Híbrida de Classificação",
      architecture_p1:
        "O classificador implementa uma <strong>abordagem híbrida em duas etapas</strong>, uma estratégia que visa equilibrar precisão, recall e performance. Esta arquitetura em pipeline garante que casos simples sejam resolvidos rapidamente, enquanto casos mais complexos recebem uma análise mais profunda.",
      flowchart_title: "Fluxo de Classificação",
      flowchart_input: "Entrada do Usuário",
      flowchart_step1_title: "Etapa 1: Similaridade de String",
      flowchart_step1_desc:
        "Busca por correspondência exata ou com erros de digitação via <strong>Distância de Levenshtein</strong>.",
      flowchart_question: "Match Encontrado?",
      flowchart_yes: "SIM",
      flowchart_no: "NÃO",
      flowchart_return: "Retorna Intenção",
      flowchart_step2_title: "Etapa 2: Similaridade Semântica",
      flowchart_step2_desc:
        "Análise de significado com <strong>TF-IDF</strong> e <strong>Similaridade de Cosseno</strong>.",
      training_title: "3. Análise do Processo de Treinamento (`async train()`)",
      training_p1:
        "O método <code>train()</code> é responsável por preparar o classificador, transformando os dados brutos de treinamento em modelos matemáticos utilizáveis. Este processo é executado uma única vez antes que as predições possam ser feitas.",
      training_h3_1: "3.1. Coleta e Preparação do Corpus",
      training_p2:
        'Inicialmente, os dados são carregados e processados. Um "documento" é criado para cada intenção, agregando todas as suas frases de treinamento. A função <code>nlp.cleanAndTokenize</code> executa tarefas de pré-processamento cruciais como tokenização, normalização, remoção de stopwords e stemming.',
      training_h3_2: "3.2. O Modelo de Espaço Vetorial: TF-IDF",
      training_p3:
        "O coração do modelo semântico é o <strong>TF-IDF (Term Frequency-Inverse Document Frequency)</strong>, uma técnica estatística que atribui um peso a cada palavra em um documento, refletindo sua importância.",
      training_idf_title: "a) IDF (Inverse Document Frequency)",
      training_idf_desc:
        'Mede a <strong>raridade</strong> de uma palavra em todo o conjunto de dados. Palavras raras (ex: "boleto") são mais informativas e recebem um peso maior.',
      training_tf_title: "b) TF (Term Frequency)",
      training_tf_desc:
        "Mede a <strong>frequência</strong> de uma palavra dentro de um único documento (intenção). Palavras que aparecem mais vezes são mais relevantes para aquele tópico específico.",
      training_p4:
        'O peso final TF-IDF é a multiplicação desses dois valores, resultando em um <strong>vetor</strong> que representa a "impressão digital" semântica de cada intenção.',
      prediction_title: "4. Análise do Processo de Predição (`predict()`)",
      prediction_p1:
        "Este método executa o pipeline de duas etapas para classificar uma nova mensagem do usuário.",
      prediction_h3_1:
        "4.1. Etapa 1: Classificação por Similaridade de String (Levenshtein)",
      prediction_p2:
        'A <strong>Distância de Levenshtein</strong> é um algoritmo que mede a "distância de edição" entre duas strings. Ele calcula o número mínimo de inserções, exclusões ou substituições de caracteres para transformar uma string na outra, sendo ideal para capturar erros de digitação. A implementação utiliza um limiar dinâmico para maior flexibilidade.',
      prediction_h3_2:
        "4.2. Etapa 2: Classificação por Similaridade Semântica (Cosseno)",
      prediction_p3:
        "Se a Etapa 1 falhar, o sistema recorre à <strong>Similaridade de Cosseno</strong>. Esta métrica mede o ângulo entre os vetores TF-IDF da mensagem do usuário e de cada intenção. Um resultado próximo a 1 indica alta semelhança semântica, enquanto um resultado próximo a 0 indica baixa relação. O resultado só é retornado se ultrapassar um limiar de confiança pré-definido.",
      optimizations_title: "5. Análise de Arquitetura e Otimizações",
      optimizations_h3_1: "5.1. Pontos Fortes",
      optimizations_li1:
        "<strong>Arquitetura Híbrida:</strong> Combinação robusta de métodos baseados em string e semântica.",
      optimizations_li2:
        "<strong>Execução Local (Client-Side):</strong> Baixa latência e maior privacidade dos dados.",
      optimizations_li3:
        "<strong>Robustez:</strong> Lida corretamente com casos extremos e termos não vistos.",
      optimizations_h3_2: "5.2. Otimização de Performance: Caching",
      optimizations_p1:
        "A principal otimização sugerida é o **caching**. Na implementação original, as frases de treinamento são limpas e tokenizadas a cada chamada de <code>predict()</code>. A solução é pré-processar essas frases uma única vez durante o método <code>train()</code> e armazená-las em cache. Isso move a computação cara para uma fase de inicialização, tornando as predições subsequentes significativamente mais rápidas e escaláveis.",
      optimizations_code: "Exemplo de otimização no método train()",
      conclusion_title: "6. Conclusão",
      conclusion_p1:
        "O <code>IntentClassifier.ts</code> é uma implementação sólida e bem-sucedida de um classificador de intenções para NLU. Sua arquitetura híbrida resulta em um sistema eficaz. A aplicação de otimizações, como o caching de dados pré-processados, pode aprimorar ainda mais sua performance para aplicações em larga escala.",
      manage_data_title: "7. Gerenciar Dados de Treino",
      manage_data_p1:
        "Adicione novas intenções ou mais frases de exemplo às intenções existentes para ver como o classificador se adapta. As alterações são apenas para esta simulação e serão perdidas ao recarregar a página.",
      manage_data_add_title: "Adicionar Nova Intenção",
      manage_data_name_label: "Nome da Intenção",
      manage_data_name_placeholder: "ex: informacoes_produto",
      manage_data_phrases_label: "Frases de Treino (separadas por vírgula)",
      manage_data_phrases_placeholder:
        "ex: qual o preço?, quanto custa, me fale mais sobre",
      manage_data_response_label: "Resposta da IA",
      manage_data_response_placeholder: "ex: O preço é R$ 50,00.",
      manage_data_add_btn: "Adicionar Intenção",
      manage_data_add_phrase_btn: "Adicionar Frase",
      manage_data_phrases_title: "Frases de Treino:",
      manage_data_response_title: "Resposta da IA:",
      explorer_title: "🧪 Explorador Interativo do Classificador",
      explorer_p1:
        "Digite uma frase abaixo para simular como o classificador processaria sua entrada. A simulação usa os dados de treino acima para demonstrar a lógica de duas etapas em ação.",
      explorer_label: "Sua mensagem:",
      explorer_placeholder: "Ex: olá, tudo bem?",
      explorer_button: "Classificar",
      explorer_stage1_title:
        "Análise da Etapa 1: Similaridade de String (Levenshtein)",
      explorer_stage2_title:
        "Análise da Etapa 2: Similaridade Semântica (Cosseno)",
      explorer_final_title: "Resultado Final",
      sim_found_match: "Encontrada correspondência próxima!",
      sim_closest_phrase: "Frase de treino mais próxima:",
      sim_lev_distance: "Distância de Levenshtein:",
      sim_threshold: "Limiar de aceitação:",
      sim_success: "Resultado:",
      sim_success_text: "Match encontrado. Classificação direta.",
      sim_no_match:
        "Nenhuma correspondência por similaridade de string foi encontrada.",
      sim_failure_text: "Falha. Prosseguindo para a Etapa 2.",
      sim_comparing:
        "Comparando o vetor da sua mensagem com o vetor de cada intenção:",
      sim_intent_classified: "Intenção Classificada:",
      sim_confidence: "Confiança:",
      sim_ai_response: "Resposta da IA:",
      sim_not_recognized: "Intenção não reconhecida.",
      sim_confidence_low: "A maior confiança foi de",
      sim_below_threshold: "o que está abaixo do limiar de",
      sim_fallback_response: "Desculpe, não entendi o que você quis dizer.",
    },
  };