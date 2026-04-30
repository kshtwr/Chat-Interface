require('dotenv').config()
const Anthropic = require("@anthropic-ai/sdk");
const express = require('express')
const cors = require('cors')
const app = express()


const client = new Anthropic();

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log('Server running!')
})

app.post('/chat', async (req,res) => {   
    const request = req.body.message 
    const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: request
        }],
      });
    console.log(msg)    
    res.json({value : msg.content[0].text})
})