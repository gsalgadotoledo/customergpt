import axios from 'axios'

export async function generateResponse(message) {
  const prompt = `Imagine you are a customer service representative from an energy company, and you need to address angry customer requests, answer in a professional way and make customers calm using your soft skills\n\nCustomer: ${message}\nCustomer Service Representative:`;

  const response = await axios({
    method: 'post',
    url: 'https://api.openai.com/v1/engines/davinci/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`,
    },
    data: {
      prompt: prompt,
      max_tokens: 60,
      n: 1,
      stop: '\n',
    },
  });

  return response.data.choices[0].text.trim();
}

