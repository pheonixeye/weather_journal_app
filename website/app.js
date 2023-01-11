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

const feelingTextField = document.getElementById('feelings');

const genButton = document.getElementById('generate');

let serverRes = {};

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

//! Get data from the API. Extract the relevant results.
async function fetcDataFromAPI() {
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
}

//! Save it on backend/express app using a POST request
async function saveDataToServer() {
    await fetch('http://127.0.0.1:3000/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverRes),
    }).then(() => {
        console.log('saved data in server...');
    });
}

//! Fetch it back from the express app using a GET request
async function fetchDataFromServer() {
    let val;
    await fetch('http://127.0.0.1:3000/all', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (v) => {
        await v.json().then((value) => {
            console.log('fetched data from server...');
            val = value;
        });
    });
    console.log(val);
    return val;
}


//!  and display the results.
function rebuildUI(all) {
    all.map((e) => {
        entriesList.insertAdjacentHTML('afterbegin', buildNavItem(e));
        console.log('Mapped...');
        console.log(e);
    });

    entriesList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    cityTextfield.value = '';
    feelingTextField.value = '';
}


//! A top level event listener to bind all of them together.
genButton.addEventListener('click', async (_) => {
    await fetcDataFromAPI().then(async () => {
        await saveDataToServer().then(async () => {
            await fetchDataFromServer().then(async (value) => {
                console.log('value ==>>' + value);
                rebuildUI(value);
            });
        });
    });
});



