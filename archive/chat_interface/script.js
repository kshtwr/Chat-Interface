function send(){
    const val = document.getElementById("input").value
    console.log(val)
    const text = document.createElement("p");
    text.innerText = val
    text.classList.add("user-input")
    document.getElementById("chat-window").appendChild(text)
    document.getElementById("input").value = "";
}