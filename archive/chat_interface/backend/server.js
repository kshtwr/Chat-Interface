require('dotenv').config()
const Anthropic = require("@anthropic-ai/sdk");
const express = require('express')
const cors = require('cors')
const app = express()


const client = new Anthropic();

app.use(express.json())
app.use(cors())

var context = []

app.listen(3000, () => {
    console.log('Server running!')
})

app.post('/chat', async (req,res) => {   
    const request = req.body.message 
    context.push({role:"user", content:request})
    const msg = await client.messages.stream({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: context,
        system: "Keep answers brief."
      });
    console.log(msg)

    let output = ""

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Transfer-Encoding', 'chunked')

    for await (const chunk of msg) {
      if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
        res.write(chunk.delta.text);
        output += chunk.delta.text
      }
    }

    res.end();

    context.push({role:"assistant", content: output})    
})