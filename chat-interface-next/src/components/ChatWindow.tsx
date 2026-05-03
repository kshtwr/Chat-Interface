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

    async function handleSend(e: string) {
        const new_messages: Message[] = [...messages, {role: "user", content: e}]
        setMessages(new_messages)

        let url = "/api/chat"

        const response = await fetch(url,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({messages: new_messages})
        });
        
        const output = await response.json()
        setMessages([...new_messages, {role: "assistant", content: output.value}])
    }

    return <div>
        <div>
            {messages.map((message, idx) =>
                <MessageBubble key ={idx} role = {message.role} content={message.content} />
            )}
        </div>
        
        <ChatInput onSend = {handleSend} />
    </div>
}