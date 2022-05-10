const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = ''
const APP_ID = '193297ce'
const API_KEY = 'bde38678ea6901034f2e6381c3d9929'

// const express = require('express')

// const cors = require('cors')

// const app = express()

// app.use(express.json())
// app.use(cors())

// app.listen(4000, () => console.log("Server running on port 4000"))

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
  })

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=193297ce&app_key=bde38678ea6901034f2e6381c3d99291`
    const response = await fetch(baseURL)
    const data = await response.json()
    generateHTML(data.hits)
    console.log(data)
}

function generateHTML(results){
    let generatedHTML = ''
    results.map((result) => {
        generatedHTML +=
        ` <div class="item">
            <img src="${result.recipe.image}" alt="img">
                <figcaption>${result.recipe.label}</figcaption>
                <br>
                    <div class="flex-container">
                        <a class="view-recipe" href="${result.recipe.url}" target="_blank">Recipe</a>
                        <br>
                    </div>
                    <br>
                    <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <br>
                    <p class="item-data">Health Lables: ${result.recipe.healthLabels}</p>
            </div> `
    })

    searchResultDiv.innerHTML = generatedHTML
}





// const submitForm = document.getElementById('submitForm')

// submitForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     // console.log('Form has been submitted!!')

//     const request = new XMLHttpRequest()

//     request.open('post', 'contact.php')
//     request.onload = function () {
//         // console.log(request.responseText)
//     }

//     request.send(new FormData (submitForm))

// })




