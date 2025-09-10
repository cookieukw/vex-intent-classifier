document.addEventListener("DOMContentLoaded", () => {
  // --- Translation Data ---

  let currentLang = "pt";

  const trainingDataContainer = document.getElementById(
    "training-data-container"
  );

  const renderTrainingData = () => {
    const T = translations[currentLang];
    trainingDataContainer.innerHTML = "";
    intents[currentLang].forEach((intent) => {
      const phrasesHTML = intent.trainingPhrases
        .map(
          (p) =>
            `<li class="text-sm bg-[#e7e5e1] dark:bg-[#3f3c36] px-2 py-1 rounded">${p}</li>`
        )
        .join("");
      const card = document.createElement("div");
      card.className =
        "bg-white dark:bg-[#3f3c36] p-4 rounded-lg shadow border border-[#d1c9bd] dark:border-[#57534e]";
      card.innerHTML = `
                        <h4 class="font-bold text-lg font-mono">${intent.name}</h4>
                        <div class="mt-2">
                            <h5 class="font-semibold text-sm mb-1">${T.manage_data_phrases_title}</h5>
                            <ul class="flex flex-wrap gap-2">${phrasesHTML}</ul>
                        </div>
                        <div class="mt-3">
                             <h5 class="font-semibold text-sm mb-1">${T.manage_data_response_title}</h5>
                             <p class="text-sm italic">"${intent.responses[0]}"</p>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div class="flex rounded-md shadow-sm">
                                <input type="text" data-intent-name="${intent.name}" class="flex-1 block w-full rounded-none rounded-l-md p-2 bg-white dark:bg-[#2c2a26] border-gray-300 dark:border-[#57534e] focus:ring-[#b4ad9f] focus:border-[#b4ad9f]" placeholder="${T.manage_data_add_phrase_btn}...">
                                <button class="add-phrase-btn inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-[#57534e] rounded-r-md bg-gray-50 dark:bg-[#57534e] text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#71717a]" data-intent-name="${intent.name}">${T.manage_data_add_phrase_btn}</button>
                            </div>
                        </div>
                    `;
      trainingDataContainer.appendChild(card);
    });
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-translate-key]").forEach((el) => {
      const key = el.getAttribute("data-translate-key");
      if (translations[lang][key]) {
        if (el.hasAttribute("placeholder")) {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });

    document
      .getElementById("lang-pt")
      .classList.toggle("font-bold", lang === "pt");
    document
      .getElementById("lang-en")
      .classList.toggle("font-bold", lang === "en");
    localStorage.setItem("language", lang);
    renderTrainingData();
  };

  document
    .getElementById("lang-pt")
    .addEventListener("click", () => setLanguage("pt"));
  document
    .getElementById("lang-en")
    .addEventListener("click", () => setLanguage("en"));

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const lightIcon = document.getElementById("theme-toggle-light-icon");
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  }
  themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    darkIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });

  // --- Navigation Logic ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- Data Management Logic ---
  document.getElementById("add-intent-btn").addEventListener("click", () => {
    const name = document.getElementById("new-intent-name").value.trim();
    const phrases = document.getElementById("new-intent-phrases").value.trim();
    const response = document
      .getElementById("new-intent-response")
      .value.trim();
    if (name && phrases && response) {
      const newIntent = {
        name,
        trainingPhrases: phrases
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        responses: [response],
      };
      intents[currentLang].push(newIntent);
      renderTrainingData();
      document.getElementById("new-intent-name").value = "";
      document.getElementById("new-intent-phrases").value = "";
      document.getElementById("new-intent-response").value = "";
    }
  });

  trainingDataContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-phrase-btn")) {
      const intentName = e.target.getAttribute("data-intent-name");
      const input = document.querySelector(
        `input[data-intent-name="${intentName}"]`
      );
      const newPhrase = input.value.trim();
      if (newPhrase) {
        const intent = intents[currentLang].find((i) => i.name === intentName);
        if (intent) {
          intent.trainingPhrases.push(newPhrase);
          renderTrainingData();
        }
      }
    }
  });

  const savedLang = localStorage.getItem("language");
  setLanguage(savedLang && translations[savedLang] ? savedLang : "pt");

  // --- Interactive Explorer Logic ---
  const classifyBtn = document.getElementById("classifyBtn");
  const userInput = document.getElementById("userInput");
  const resultsDiv = document.getElementById("results");
  const levenshteinResultDiv = document.getElementById("levenshteinResult");
  const cosineSection = document.getElementById("cosineSection");
  const cosineResultDiv = document.getElementById("cosineResult");
  const finalResultDiv = document.getElementById("finalResult");

  const cleanAndTokenize = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter(Boolean);
  const levenshtein = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(null));
    for (let i = 0; i <= a.length; i += 1) {
      matrix[0][i] = i;
    }
    for (let j = 0; j <= b.length; j += 1) {
      matrix[j][0] = j;
    }
    for (let j = 1; j <= b.length; j += 1) {
      for (let i = 1; i <= a.length; i += 1) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    return matrix[b.length][a.length];
  };

  classifyBtn.addEventListener("click", () => {
    const message = userInput.value;
    if (!message.trim()) return;
    resultsDiv.classList.remove("hidden");
    cosineSection.classList.add("hidden");
    const cleanedMessage = cleanAndTokenize(message).join(" ");
    const currentIntents = intents[currentLang];
    const T = translations[currentLang];

    let bestMatch = { distance: Infinity, phrase: "", intent: null };
    for (const intent of currentIntents) {
      for (const phrase of intent.trainingPhrases) {
        const distance = levenshtein(cleanedMessage, phrase);
        if (distance < bestMatch.distance) {
          bestMatch = { distance, phrase, intent };
        }
      }
    }
    const threshold = bestMatch.phrase
      ? Math.floor(bestMatch.phrase.length / 4)
      : 0;
    let stage1Success =
      bestMatch.intent &&
      bestMatch.distance <= threshold &&
      bestMatch.distance < 3;

    if (stage1Success) {
      levenshteinResultDiv.innerHTML = `<p class="text-sm">${T.sim_found_match}</p><ul class="text-xs list-disc pl-5 mt-2 space-y-1"><li><strong>${T.sim_closest_phrase}</strong> "${bestMatch.phrase}"</li><li><strong>${T.sim_lev_distance}</strong> <span class="font-bold text-green-600">${bestMatch.distance}</span></li><li><strong>${T.sim_threshold}</strong> ${threshold}</li></ul><p class="text-sm mt-2 text-green-700 dark:text-green-400"><strong>${T.sim_success}</strong> ${T.sim_success_text}</p>`;
      finalResultDiv.innerHTML = `<p class="text-sm"><strong>${T.sim_intent_classified}</strong> <span class="font-mono bg-amber-200 dark:bg-amber-800 dark:text-amber-100 px-2 py-1 rounded">${bestMatch.intent.name}</span></p><p class="text-sm mt-2"><strong>${T.sim_ai_response}</strong> "${bestMatch.intent.responses[0]}"</p>`;
    } else {
      levenshteinResultDiv.innerHTML = `<p class="text-sm">${
        T.sim_no_match
      }</p><ul class="text-xs list-disc pl-5 mt-2 space-y-1"><li><strong>${
        T.sim_closest_phrase
      }</strong> "${bestMatch.phrase || "N/A"}"</li><li><strong>${
        T.sim_lev_distance
      }</strong> <span class="font-bold text-red-600">${
        bestMatch.distance
      }</span></li><li><strong>${
        T.sim_threshold
      }</strong> ${threshold}</li></ul><p class="text-sm mt-2 text-red-700 dark:text-red-400"><strong>${
        T.sim_success
      }</strong> ${T.sim_failure_text}</p>`;
      cosineSection.classList.remove("hidden");
      let cosineScores = [];
      const userTokens = cleanAndTokenize(message);
      currentIntents.forEach((intent) => {
        const intentTokens = cleanAndTokenize(intent.trainingPhrases.join(" "));
        const intersection = userTokens.filter((token) =>
          intentTokens.includes(token)
        );
        let score =
          userTokens.length > 0
            ? (intersection.length / userTokens.length) *
              (Math.random() * 0.4 + 0.6)
            : 0;
        cosineScores.push({
          name: intent.name,
          score: Math.min(score, 0.99),
        });
      });
      cosineScores.sort((a, b) => b.score - a.score);
      cosineResultDiv.innerHTML = `<p class="text-sm mb-3">${T.sim_comparing}</p>`;
      cosineScores.forEach((item) => {
        const percentage = (item.score * 100).toFixed(1);
        cosineResultDiv.innerHTML += `<div class="flex items-center"><span class="w-24 text-sm font-mono shrink-0">${item.name}</span><div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4"><div class="bg-[#b4ad9f] dark:bg-[#71717a] h-4 rounded-full" style="width: ${percentage}%"></div></div><span class="w-16 text-right text-sm font-bold">${percentage}%</span></div>`;
      });
      const bestCosineMatch = cosineScores[0];
      const confidenceThreshold = 0.35;
      if (bestCosineMatch && bestCosineMatch.score > confidenceThreshold) {
        const matchedIntent = currentIntents.find(
          (i) => i.name === bestCosineMatch.name
        );
        finalResultDiv.innerHTML = `<p class="text-sm"><strong>${
          T.sim_intent_classified
        }</strong> <span class="font-mono bg-amber-200 dark:bg-amber-800 dark:text-amber-100 px-2 py-1 rounded">${
          bestCosineMatch.name
        }</span> (${T.sim_confidence}: ${(bestCosineMatch.score * 100).toFixed(
          1
        )}%)</p><p class="text-sm mt-2"><strong>${
          T.sim_ai_response
        }</strong> "${matchedIntent.responses[0]}"</p>`;
      } else {
        finalResultDiv.innerHTML = `<p class="text-sm text-red-800 dark:text-red-400"><strong>${
          T.sim_not_recognized
        }</strong></p><p class="text-sm mt-2">${
          T.sim_confidence_low
        } <strong>${(bestCosineMatch ? bestCosineMatch.score * 100 : 0).toFixed(
          1
        )}%</strong>, ${T.sim_below_threshold} <strong>${
          confidenceThreshold * 100
        }%</strong>.</p><p class="text-sm mt-2"><strong>${
          T.sim_ai_response
        }</strong> "${T.sim_fallback_response}"</p>`;
      }
    }
    resultsDiv.scrollIntoView({ behavior: "smooth" });
  });
});
