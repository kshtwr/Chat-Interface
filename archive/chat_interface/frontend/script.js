async function send(){
    const val = document.getElementById("input").value
    console.log(val)
    const text = document.createElement("div");
    text.innerHTML = val
    text.classList.add("user-input")
    document.getElementById("chat-window").appendChild(text)
    document.getElementById("input").value = "";

    const loading_text = document.createElement("div");
    loading_text.innerHTML = "Thinking...";
    loading_text.classList.add("llm-output");
    document.getElementById("chat-window").appendChild(loading_text)

    let output = await llm_call(val);
    loading_text.remove()
    console.log(output)
    const out_text = document.createElement("div");
    if (!(output == "ERROR")){
        out_text.innerHTML = marked.parse(output);
        out_text.classList.add("llm-output");
    } else{
        out_text.innerHTML = "Something went wrong, please try again!";
        out_text.classList.add("output-error");
    }
    document.getElementById("chat-window").appendChild(out_text);

}

async function llm_call(prompt){
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
        const result = await response.json();
        //console.log(result.value)
        return (result.value)

    } catch(error){
        console.error(error.message)
        return "ERROR"
    }

}