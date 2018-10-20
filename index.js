const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

const authentication = require('./routes/authentication')(router);
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{ useNewUrlParser: true },(err) => {
    if(err) {
        console.log('database connection error detected'+ err)
    }
    else{
        console.log('connected to database');
    }
});


app.use(cors({ origin: 'http://localhost:4200' })); // Allows cross origin in development only
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(__dirname+'/client/dist/client'));
app.use('/authentication',authentication);

app.get('*', (req, res) => { res.sendFile(path.join(__dirname+'/client/dist/client/index.html')) });

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})