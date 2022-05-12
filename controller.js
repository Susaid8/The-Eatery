const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = ''
const APP_ID = '193297ce'
const API_KEY = 'bde38678ea6901034f2e6381c3d9929'
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
  
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })
  
  function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
  }
  
  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
  }