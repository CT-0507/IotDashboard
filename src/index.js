const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass');
const app = express();
const path = require('path');
const port = 3000;
const route = require('./routes');
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://hackblack86:123@demo.gxocm.mongodb.net/Lab4?retryWrites=true&w=majority';


const host = '192.168.0.111'; // đổi thành IP của máy 

async function connect() {
    try {
        await mongoose.connect(dbURI, () => {
            console.log('Connect to database.');
        });
    } catch (error) {
        console.log('Failed to connect');
    }
}

connect();

// cần có cái này để gửi request đến mạng local, ví dụ: 192.168.0.111:3000/update
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })


// use urlencoded
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// JSON
app.use(express.json());
// public file can be view via url
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

//Template engine
// Using handlebars to view
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            checkCurrent: (a) => {
                if (a == 1) return true;
            },
            sum: function (a, b) {
                var c = parseInt(a) + parseInt(b);
                return c;
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// connect to route file
route(app);

// Start listening 
app.listen(port, host, () => {
    console.log(`App listening on ${host}:${port}...`);
});
