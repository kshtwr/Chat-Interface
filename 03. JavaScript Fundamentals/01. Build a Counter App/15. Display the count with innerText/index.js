// grab the count-el element, store it in a countEl variable
let count = 0

countEl = document.getElementByID("count-el")

function increment() {
    count = count + 1
    // set countEl's innerText to the count
    countEl.innerText = count
}


