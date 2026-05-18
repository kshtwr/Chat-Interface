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

    
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of msg){
                if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta"){
                    controller.enqueue(chunk.delta.text)
                }
            }
            controller.close()
        }
    })
    return new Response(stream)
      
}
