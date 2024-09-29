require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const orgKey = "org-C0V9tT5zjNoT3VLZp6IH4mwF"; // Replace with your OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());

app.use('/', express.static(path.resolve(`${__dirname}/../Act 2 - Search/`)));

app.use('/', express.static(path.resolve(`${__dirname}/../Act 2 - Path Plant List/`)));


app.post('/api/suggestions', async (req, res) => {
  const query = req.body.query;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Organization': `${orgKey}`,
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "user", content: `Suggest plants related to "${query}but limit it to 10 results, but I just want to display the common names most relevant, no other data for now"` }
        ]
      })
    });

    const data = await response.json();
    const suggestions = data.choices[0].message.content.split('\n').filter(item => item);

    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
