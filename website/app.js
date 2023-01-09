/* Global Variables */

const apiKey = 'c1793ff3b0d9bf1323bff4bd0366ab38';
// var baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
let newTime = d.toLocaleTimeString();

console.log('app.js connected');
console.log(`${newDate}`);
console.log(`${newTime}`);

const cityTextfield = document.getElementById('city');

// cityTextfield.addEventListener('input', (_) => {
//     city = cityTextfield.value;
//     console.log(city);
//! no need to add event listerner for this change
// });


const feelingTextField = document.getElementById('feelings');

// feelingTextField.addEventListener('input', (_) => {
//     feelings = feelingTextField.value;
//     console.log(feelings);
// });

const genButton = document.getElementById('generate');


let serverRes = {};

genButton.addEventListener('click', async (_) => {
    baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTextfield.value}&appid=${apiKey}&units=metric`;
    let response;
    try {
        response = await fetch(baseUrl);
    } catch (error) {
        console.log(error);
    }
    const body = await response.json();
    console.log(body);
    const temp = body['main']['temp'];

    serverRes = {
        'date': newDate,
        'time': newTime,
        'temp': temp,
        'content': feelingTextField.value,
    };
    console.log(serverRes);

    await fetch('http://localhost:3000/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverRes),
    }).then(async (value) => {
        const res = await value.json();
        console.log(res);
    });


});

const entriesList = document.getElementById('items');