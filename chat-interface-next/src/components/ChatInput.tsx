"use client"
import { useState } from 'react';

type ChatInputProps = {
    onSend : (message:string) => void;
}

export default function ChatInput({onSend}:ChatInputProps){
    const [text, setText] = useState("");

    return <div className = {"h-auto w-full flex flex-row gap-[10px] pt-[10px] border-t-stone-300 border-t pt-[20px]"}>
        <textarea className = {"flex grow-auto overflow-y-auto bg-stone-100 border border-stone-300 resize-none rounded-full px-[14px] w-full h-12 pt-[10px]"} onChange = {(e) => setText(e.target.value)} placeholder = "Enter message here..." value={text}></textarea>
        <button className= {"border bg-black text-white rounded-full w-[50px] h-full items-center shadow-md"} onClick = {()=>{onSend(text);setText("")}}>Send</button>
    </div>

}