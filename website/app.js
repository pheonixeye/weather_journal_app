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
// let allResponses = [];

const entriesList = document.getElementById('items');

function buildNavItem(e) {
    return `<li id="${e.time}">
    <div id="date">Date : ${e.date}</div>
    <div id="time">Time : ${e.time}</div>
    <div id="city">City : ${e.city}</div>
    <div id="temp">Temp : ${e.temp} °C</div>
    <div id="content">Feeling : ${e.content}</div>
    </li>`;
}


genButton.addEventListener('click', async (_) => {
    baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTextfield.value}&appid=${apiKey}&units=metric`;
    let response;
    try {
        response = await fetch(baseUrl);
    } catch (error) {
        console.log(error);
        //TODO: show dialog to present error;
    }
    const body = await response.json();
    console.log(body);
    const temp = body['main']['temp'];

    serverRes = {
        'date': newDate,
        'time': newTime,
        'city': cityTextfield.value,
        'temp': temp,
        'content': feelingTextField.value,
    };
    console.log(serverRes);

    await fetch('http://127.0.0.1:3000/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverRes),
    }).then(async () => {
        const getReq = await fetch('http://127.0.0.1:3000/all', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const allResponses = await getReq.json().then((value) => {
            value.map((e) => {
                entriesList.insertAdjacentHTML('afterbegin', buildNavItem(e));
                console.log('Mapped...');
            });

            entriesList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        });
        console.log(allResponses);
    });


});



// allResponses.map((e) => {
//     entriesList.insertAdjacentHTML('afterbegin', buildNavItem(e));
//     console.log('Mapped...');
// });