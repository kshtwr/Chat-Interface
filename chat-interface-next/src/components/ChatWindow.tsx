"use client"
import ChatInput from "@/components/ChatInput"
import MessageBubble from "@/components/MessageBubble"
import { useRef, useEffect, useState } from 'react';

type Message = {
    content: string
    role: "user" | "assistant" | "error"
}

export default function ChatWindow(){
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    async function handleSend(e: string) {
        if (e.trim()) {
            const new_messages: Message[] = [...messages, {role: "user", content: e}]
            setMessages(new_messages)
            

            let url = "/api/chat"

            setIsLoading(true);
            try {
                const response = await fetch(url,{
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({messages: new_messages})
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                
                if (response.body){
                    const reader = response.body.getReader();
                
                const textDecoder = new TextDecoder();
                let result = ""
                setIsLoading(false);

                setMessages([...new_messages, {role: "assistant", content: result}]) 
                while (true){
                    const {done, value} = await reader.read()
                    if (done) {break} else{
                        result+= textDecoder.decode(value);
                        setMessages([...new_messages, {role: "assistant", content: result}])
                    }
                }
            }
                              
            } catch {
                setIsLoading(false);
                setMessages([...new_messages, {role: "error", content:"Error getting response. Please try again."}])
            }
        }
    }

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages]);

    return <div className = {"flex flex-col h-[75vh] bg-white w-full md:w-1/2 p-5 rounded-[3%] shadow-sm"}> 
        <div className = {"grow overflow-y-auto flex flex-col gap-[10px] pb-[10px]"}>
            {messages.map((message, idx) =>
                <MessageBubble key ={idx} role = {message.role} content={message.content}/>
            )}
            {isLoading && <MessageBubble role="assistant" content="Thinking..." />}
            <div ref = {scrollRef}/>
        </div>
        
        <ChatInput isLoading = {isLoading} onSend = {handleSend} />
    </div>
}