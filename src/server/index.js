const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const aylien = require('aylien_textapi');

// Set aylien API credentials
var textapi = new aylien({
    application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8085, function() {
    console.log('Example app listening on port 8085!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

app.post('/api',getResults);



function getResults(req, res) {
    textapi.sentiment({
            url: req.body.url
        },
        function(error, response) {
            res.send(response);
        }
    );
}
