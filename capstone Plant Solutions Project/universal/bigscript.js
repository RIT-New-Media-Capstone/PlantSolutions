import OpenAI from "openai";

const apiKey = "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";
const openai = new OpenAI({
  apiKey: apiKey
});

async function fetchOpenAISuggestions(query) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {"role": "user", "content": `Suggest plants related to "${query}"`}
      ],
    });

    // Assuming the response returns a list of plant suggestions
    return completion.choices[0].message.content.split('\n').filter(item => item);
  } catch (error) {
    console.error("Error in fetching OpenAI data:", error);
    return [];
  }
}

export { fetchOpenAISuggestions };
