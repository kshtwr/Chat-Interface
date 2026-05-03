import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();


export async function POST(request: Request) {
    const req = await request.json()
    

    const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: req.messages,
        system: "Keep answers brief."
      });

    const textBlock = msg.content[0]
    if (textBlock.type === "text") {
        return Response.json({ value: textBlock.text })
    }
      
}
