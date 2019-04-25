const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const forecastMessage = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    printForecast(location)
})

const printForecast = (location) => {
    const url = 'http://localhost:3000/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
                forecastMessage.forecastMessage = ''
            } else {
                errorMessage.textContent = ''
                forecastMessage.textContent = data.location + ': ' + data.forecast
            }
        })
    })
}