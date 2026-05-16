"use client"
import ChatInput from "@/components/ChatInput"
import MessageBubble from "@/components/MessageBubble"
import { useState } from 'react';

type Message = {
    content: string
    role: "user" | "assistant"
}

export default function ChatWindow(){
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSend(e: string) {
        if (e) {
            const new_messages: Message[] = [...messages, {role: "user", content: e}]
            setMessages(new_messages)
            

            let url = "/api/chat"

            setIsLoading(true);
            const response = await fetch(url,{
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({messages: new_messages})
            });
            
            const output = await response.json()
            setIsLoading(false);
            
            setMessages([...new_messages, {role: "assistant", content: output.value}])
        }
    }

    return <div className = {"flex flex-col h-[75vh] bg-white w-1/2 p-5 my-[5%] mx-auto rounded-[3%] shadow-sm"}> 
        <div className = {"grow overflow-y-auto flex flex-col gap-[10px] pb-[10px]"}>
            {messages.map((message, idx) =>
                <MessageBubble key ={idx} role = {message.role} content={message.content} />
            )}
            {isLoading && <MessageBubble role="assistant" content="Thinking..." />}
        </div>
        
        <ChatInput onSend = {handleSend} />
    </div>
}