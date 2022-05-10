const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = ''

const submitForm = document.getElementById('submitForm')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value
    // console.log(searchQuery)
})

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('Form has been submitted!!')

    const request = new XMLHttpRequest()

    request.open('post', 'contact.php')
    request.onload = function () {
        console.log(request.responseText)
    }

    request.send(new FormData (submitForm))

})


