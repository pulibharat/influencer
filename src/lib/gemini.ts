export async function chatWithGemini(prompt: string) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("Neural API Diagnostic - Key Present:", !!apiKey);
    console.log("Neural API Diagnostic - All Env Keys:", Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));

    if (!apiKey) {
        console.warn("Gemini API key is missing. Please check your .env file for VITE_GEMINI_API_KEY.");
        return null;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        console.log("Calling Gemini API with prompt:", prompt);
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${prompt}\n\nContext: You are a premium AI Influencer Matching Assistant for the 'InfluMatch' platform. Your tone is professional, strategic, and high-end. Keep answers concise but insightful.`
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Gemini API Error Response:", errorBody);
            return null;
        }

        const data = await response.json();
        console.log("Gemini API Success:", data);
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error("Gemini API Fetch Error:", error);
        return null;
    }
}
