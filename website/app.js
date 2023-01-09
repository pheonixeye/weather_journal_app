/* Global Variables */
var city = '';
var feelings = '';
const apiKey = 'c1793ff3b0d9bf1323bff4bd0366ab38';
var baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

console.log('app.js connected');
console.log(`${newDate}`);

const cityTextfield = document.getElementById('city');

// cityTextfield.addEventListener('input', (_) => {
//     city = cityTextfield.value;
//     console.log(city);
// });


const feelingTextField = document.getElementById('feelings');

// feelingTextField.addEventListener('input', (_) => {
//     feelings = feelingTextField.value;
//     console.log(feelings);
// });

const genButton = document.getElementById('generate');



genButton.addEventListener('click', async (_) => {
    baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTextfield.value}&appid=${apiKey}&units=metric`;
    console.log(baseUrl);
    const serverResponse = await fetch(baseUrl);
    const response = serverResponse.json();
    console.log(response);
});

const entriesList = document.getElementById('items');