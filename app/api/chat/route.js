import { NextResponse } from "next/server";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/company";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages invalides" },
        { status: 400 },
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OpenRouter API key missing");
      return NextResponse.json(
        { error: "Clé OpenRouter manquante" },
        { status: 500 },
      );
    }

    // 💡 Filtrage : On retire le message d'accueil si c'est le premier élément
    // afin que le premier message envoyé à l'IA soit strictement un rôle "user".
    const validHistory = messages.filter(
      (m, index) => !(index === 0 && m.role === "assistant"),
    );

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Inter Seas Logistic Chatbot",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              CHATBOT_SYSTEM_PROMPT ||
              "Tu es ARIA, l'assistante virtuelle d'Inter Seas Logistic.",
          },
          ...validHistory.slice(-10), // Récupère les 10 derniers messages valides
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errLog = await response.text();
      // On affiche l'erreur réelle d'OpenRouter dans la console système pour débugger
      console.error("OpenRouter rejection raw data:", errLog);
      return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer une réponse.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
