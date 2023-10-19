const express = require('express');
const axios = require('axios'); // 确保已经安装axios
const OpenAI = require("openai")
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const apiKey = process.env.CHATGPT_API_KEY;
console.log(apiKey);

router.post('/ask', async (req, res) => {
    // console.log(123456);
    // try {
    //     const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
    //         prompt: req.body.prompt,
    //         max_tokens: 150
    //     }, {
    //         headers: {
    //             'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
    //         }
    //     });

    //     res.json(response.data);
    // } catch (error) {
    //     console.error('Detailed error:', error);  // 打印详细的错误信息
    //     res.status(500).json({ error: 'Error calling ChatGPT API' });
    // }

 

const openai = new OpenAI({
    apiKey,
});

try {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: req.body.prompt }],
        model: "gpt-3.5-turbo",
    });

    const generatedResponse = chatCompletion.choices[0].message.content;
    res.json(generatedResponse);
} catch (error) {
    console.error('发生错误:', error);
}
});

module.exports = router;
