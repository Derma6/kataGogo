const input = document.querySelector('input')
const addBtn = document.querySelector('#add')
const elementOfList = document.querySelector('ul')
let list = document.querySelector('ul')

function addDeletebtn () {
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    return deleteBtn
}
function addToList (text) {
    const li = document.createElement('li');
    li.innerHTML = `${text}`;
    li.appendChild(addDeletebtn())
    return li
}
function saveContent(key, contenu) {
    localStorage.setItem(key, contenu)
}
function loadContent (key){
    if(!localStorage.getItem(key))return
         return localStorage.getItem(key)
}
addBtn.addEventListener('click', ()=> {
    if (!input.value) {
        window.alert('You must write something!')
    } else {
        list.appendChild(addToList(input.value));
        input.value = "";
        saveContent('toDo', list.innerHTML)
    }
})
elementOfList.addEventListener('click', (e) => {
    console.log(e.target.textContent)
    if (e.target.textContent == 'X') {
        list.removeChild(e.target.parentNode);
    } else {   
        e.target.classList.toggle('check')
    }
    saveContent('toDo', list.innerHTML)
})

window.onload = () => {
    if(loadContent("toDo")) {
        list.innerHTML = loadContent("toDo")
    }
    console.log(loadContent('toDo'))
}