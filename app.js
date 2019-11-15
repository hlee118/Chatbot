// modules
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let https = require('https');
var cors = require('cors');
const fs = require('fs');
let port = 80;
let dialogflow = require('./dialogflow')

// routers path
let indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.all('/*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  res.header("Content-Type", "application/x-www-form-urlencoded");
  next();
});

// router
app.post('/fulfillment', dialogflow)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('port is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log('Listening on port ' + port);
}
