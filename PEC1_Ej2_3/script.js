
// Elementos del DOM

const container = document.querySelector('table');
const seats = document.querySelectorAll('.seats td:not(.occupied)');
const countTotalSeats = document.getElementById('countSeats');
const countPriceTotal = document.getElementById('finalPrice');
const movieElement = document.getElementById('movie');
const currencyElement = document.getElementById('currency');

let ticketPrice = +movieElement.value;
let currencyRate = 1;
let currencySelected = 'EUR';



// Función que actualiza el total de asientos y precio

function updatedTotal() {
    const selectedSeats = document.querySelectorAll('.seats td.selected');
    const totalSeats = selectedSeats.length;

    const updatedPriceExchange = (totalSeats * ticketPrice * currencyRate).toFixed(2);

    countTotalSeats.textContent = totalSeats;
    countPriceTotal.textContent = `${updatedPriceExchange} ${currencySelected}`;
}



// Función que calcula el tipo de cambio y la divisa

function calcularExchangeUpdated() {
    const currency = currencyElement.value;


    fetch(`https://v6.exchangerate-api.com/v6/fcfa1f62262f1762591c9667/latest/EUR`)

        .then(res => res.json ())
        .then(data => {
            currencyRate = data.conversion_rates[currency];
            currencySelected = currency;

            updateMoviePrices();
            updatedTotal();

        })

        .catch(error => {
            console.error('Error al realizar la tasa de cambio en la moneda', error);
        });
        
}



// Función que actualiza el precio de las películas en el desplegable

function updateMoviePrices() {
    
    const movieOptions = movieElement.options;

    for (let i = 0; i < movieOptions.length; i++) {
        const priceBase = +movieOptions[i].value;
        const priceConverted = (priceBase * currencyRate).toFixed(2);
        
        movieOptions[i].textContent = `${movieOptions[i].textContent.split('(')[0]} (${priceConverted} ${currencySelected})`;
    }
}



// Evento que actualiza el precio de la película cuando se selecciona una nueva película

movieElement.addEventListener('change', e => {

    ticketPrice = +e.target.value;

    updatedTotal();
})



// Evento para seleccionar o deseleccionar los asientos

container.addEventListener('click', e => {

    if(e.target.tagName === 'TD' && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updatedTotal();
    }
})



// Evento para cuando se cambia la moneda

currencyElement.addEventListener('change', calcularExchangeUpdated);



// Inicializa el cambio de moneda

calcularExchangeUpdated();


