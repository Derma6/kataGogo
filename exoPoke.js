const img = document.querySelector('#img')
const name = document.querySelector('#name')


// async function easyFetch (url) {
//     const response = await fetch(url)
//     const data = await response.json()

//     img.innerHTML += `<li><img src="${data.sprites.back_default}" alt=""></li>`
//     name.innerHTML += `${data.name}`
// }

// for(i=1; i<=5; i++) {

//     easyFetch(`https://pokeapi.co/api/v2/pokemon-form/${i}/`)
// }


async function fetchRecursive (url, i, end){
    const response = await fetch(url)
    const data = await response.json()

    console.log(data.name)
    console.log(data.sprites.back_default)

    img.innerHTML += `<li><img src="${data.sprites.back_default}" alt=""></li>`
    name.innerHTML += `<li>${data.name}</li>`

    if (i<end) {
        i++
        fetchRecursive(`https://pokeapi.co/api/v2/pokemon-form/${i}/`, i, end)
    }
    
}

fetchRecursive('https://pokeapi.co/api/v2/pokemon-form/1/', 1, 5)