async function send(){
    const val = document.getElementById("input").value
    console.log(val)
    if (val){
        const text = document.createElement("div");
        text.innerHTML = val
        text.classList.add("user-input")
        document.getElementById("chat-window").appendChild(text)
        document.getElementById("input").value = "";

        const loading_text = document.createElement("div");
        loading_text.innerHTML = "Thinking...";
        loading_text.classList.add("llm-output");
        document.getElementById("chat-window").appendChild(loading_text)

        const out_text = document.createElement("div");    
        out_text.classList.add("llm-output");

        //await sample_call(val, out_text, loading_text);
        await llm_call(val, out_text, loading_text);
    } 

}

async function llm_call(prompt, out_text, loading_text){
    const url = "http://localhost:3000/chat";
    try{
        const response = await fetch(url,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({message: prompt})
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const textDecoder = new TextDecoder();
        let result = ""
        
        const cursor = document.createElement("span");
        const text = document.createElement("span");
        cursor.innerHTML = "▌"
        cursor.classList.add("cursor");

        console.log(cursor)

        loading_text.remove()
        document.getElementById("chat-window").appendChild(out_text);

        out_text.appendChild(text);
        out_text.appendChild(cursor);
        
        const chat_window = document.getElementById("chat-window")
        while (true){
            const {done, value} = await reader.read()
            if (done) {break} else{
                text.innerHTML += textDecoder.decode(value);
                chat_window.scrollTop = chat_window.scrollHeight;
                result+= textDecoder.decode(value)
            }
        }

        cursor.remove()
        text.innerHTML = marked.parse(result)
        chat_window.scrollTop = chat_window.scrollHeight;

    } catch(error){
        console.error(error.message)
        return "ERROR"
    }

}

async function sample_call(val, out_text, loading_text){
    loading_text.remove()
    document.getElementById("chat-window").appendChild(out_text);

    out_text.innerHTML = marked.parse("# Hello\n\nThis is **bold** and *italic* text.\n\n- item one\n- item two\n- item three")


}