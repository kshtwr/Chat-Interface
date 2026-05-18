"use client"
import { useState } from 'react';

type ChatInputProps = {
    isLoading : boolean;
    onSend : (message:string) => void;
}

export default function ChatInput({onSend, isLoading}:ChatInputProps){
    const [text, setText] = useState("");

    return <div className = {"h-auto w-full flex flex-row gap-[10px] pt-[10px] border-t-stone-300 border-t pt-[20px]"}>
        <textarea className = {"flex grow-auto overflow-y-auto bg-stone-100 border border-stone-300 resize-none rounded-full px-[14px] w-full h-12 pt-[10px]"} onKeyDown ={(e)=>{if(!isLoading && e.key === "Enter"){ e.preventDefault(); onSend(text); setText("")}}} onChange = {(e) => setText(e.target.value)} placeholder = "Enter message here..." value={text}></textarea>
        <button className= {`border text-white rounded-full w-[50px] h-full items-center shadow-md ${isLoading? "bg-stone-400" :"bg-black"}`} onClick = {()=>{if(!isLoading){ onSend(text); setText("")}}}>Send</button>
    </div>

}