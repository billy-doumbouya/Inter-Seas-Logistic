import { NextResponse } from "next/server";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/company";

// Liste des modèles gratuits à tester dans l'ordre en cas de surcharge (503)
const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages invalides" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Erreur : GEMINI_API_KEY manquante.");
      return NextResponse.json(
        { error: "Configuration serveur incomplète" },
        { status: 500 },
      );
    }

    // Nettoyage et formatage de l'historique
    const validHistory = messages.filter(
      (m, index) =>
        !(index === 0 && m.role === "assistant") && m.content?.trim(),
    );

    const formattedContents = validHistory.slice(-10).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (formattedContents.length === 0) {
      formattedContents.push({ role: "user", parts: [{ text: "Bonjour" }] });
    }

    const payload = {
      contents: formattedContents,
      systemInstruction: {
        parts: [
          {
            text:
              CHATBOT_SYSTEM_PROMPT ||
              "Tu es ARIA, l'assistante virtuelle d'Inter Seas Logistic.",
          },
        ],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 400,
      },
    };

    let response;
    let currentModelUsed = "";
    let lastErrorLog = "";

    // Boucle de repli : on essaie les modèles l'un après l'autre si ça sature
    for (const modelName of MODELS_TO_TRY) {
      currentModelUsed = modelName;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      console.log(`🤖 Tentative d'appel avec le modèle : ${modelName}...`);

      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Si la réponse est OK, on sort immédiatement de la boucle !
      if (response.ok) {
        break;
      }

      // Sinon, on stocke l'erreur et la boucle passe au modèle suivant
      lastErrorLog = await response.text();
      console.warn(
        `⚠️ Le modèle ${modelName} a échoué (Surcharge ou restriction). Tentative de repli...`,
      );
    }

    // Si aucun des modèles n'a fonctionné après la boucle
    if (!response || !response.ok) {
      console.error(
        "❌ Tous les modèles de secours ont échoué. Dernière erreur brute :",
        lastErrorLog,
      );
      return NextResponse.json(
        { error: "Service temporairement surchargé chez Google. Réessayez." },
        { status: 503 },
      );
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Désolé, je n'ai pas pu générer une réponse.";

    console.log(`✅ Réponse générée avec succès via ${currentModelUsed}`);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("💥 Chat API error:", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}
