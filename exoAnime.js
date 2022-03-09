const body = document.querySelector('body');
const button = document.querySelector('button');

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
let count = 0;

function display () {
    const size = getRandom(20, 200);
    const div = document.createElement('div');
    div.className = 'animation';
    div.style = `width:${size}px; height:${size}px; animation-duration: ${getRandom(5, 10)}s; left:${getRandom(0, 100)}%`
    div.addEventListener("animationend", () => {
        div.remove()
    });
    document.body.appendChild(div)
}

button.addEventListener('click', ()=> {

})

function displayButton () {
    button.style.borderRadius = `${getRandom(0, 25)}px`
    button.style.opacity = `${getRandom(0, 1)}`
}

setInterval(display, 500)
setInterval(displayButton, 20000)
