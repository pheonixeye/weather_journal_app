const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
// Setup empty JS object to act as endpoint for all routes

//! changed to js object instead of js array
projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CORS());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));




// Setup Server
app.post('/add', async (req, res) => {
    console.log('add data to projectData...');
    const data = await req.body;
    // projectData.push(data);
    Object.assign(projectData, data);
    console.log('pushed data to projectData', ' Length==>> ', `${projectData.length}`);
    res.send('POST request received...');
});


app.get('/all', (req, res) => {
    console.log('get request =>> /all...');
    res.json(projectData);
});





// Start Listening
app.listen(3000);

console.log('Listening on port 3000');