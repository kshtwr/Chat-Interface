"use client"
import { useState } from 'react';

type ChatInputProps = {
    onSend : (message:string) => void;
}

export default function ChatInput({onSend}:ChatInputProps){
    const [text, setText] = useState("");

    return <div>
        <textarea onChange = {(e) => setText(e.target.value)} placeholder = "Enter message here..." value={text}></textarea>
        <button onClick = {()=>{onSend(text);setText("")}}>Send</button>
    </div>

}