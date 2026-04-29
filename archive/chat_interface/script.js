async function send(){
    const val = document.getElementById("input").value
    console.log(val)
    const text = document.createElement("p");
    text.innerText = val
    text.classList.add("user-input")
    document.getElementById("chat-window").appendChild(text)
    document.getElementById("input").value = "";

    const loading_text = document.createElement("p");
    loading_text.innerText = "Thinking...";
    loading_text.classList.add("llm-output");
    document.getElementById("chat-window").appendChild(loading_text)

    let output = await llm_call(val);
    loading_text.remove()
    console.log(output)
    const out_text = document.createElement("p");
    if (!(output == "ERROR")){
        out_text.innerText = output;
        out_text.classList.add("llm-output");
    } else{
        out_text.innerText = "Something went wrong, please try again!";
        out_text.classList.add("output-error");
    }
    document.getElementById("chat-window").appendChild(out_text);

}

async function llm_call(prompt){
    const url = "https://api.chucknorris.io/jokes/random";
    try{
        const response = await fetch(url);
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