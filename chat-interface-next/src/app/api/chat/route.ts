import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();


export async function POST(request: Request) {
    const req = await request.json()
    

    const msg = client.messages.stream({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: req.messages,
        system: "Keep answers brief."
      });
    
    const stream = await msg.finalMessage();
    const textBlock = stream.content.find((block) => block.type == "text") // I need to read more about ReadableStream
    if (textBlock && textBlock.type === "text") {
        return Response.json({ value: textBlock.text })
    }
      
}
