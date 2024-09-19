import OpenAI from "openai";

const apiKey = "org-C0V9tT5zjNoT3VLZp6IH4mwF";
const openai = new OpenAI({
  apiKey: apiKey
});
async function fetchOpenAISuggestions(query) {
  const apiKey = "org-C0V9tT5zjNoT3VLZp6IH4mwF"; // Your OpenAI API key
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "user", content: `Suggest plants related to "${query}"` }
        ]
      })
    });

    const data = await response.json();
    
    // Assuming OpenAI API returns a message containing suggestions
    return data.choices[0].message.content.split('\n').filter(item => item);
  } catch (error) {
    console.error("Error fetching OpenAI data:", error);
    return [];
  }
}
