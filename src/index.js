const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass');
const app = express();
const path = require('path');
const port = 3000;
const route = require('./routes');
const mongoose = require('mongoose');
const dbURI =
    'mongodb+srv://hackblack86:123@demo.gxocm.mongodb.net/Lab4?retryWrites=true&w=majority';
// const host = '172.31.250.62'
mongoose
    .connect(dbURI)
    .then(() => {
        console.log('Connect to db.');
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Can't connect to db.`);
        console.log(err);
    });

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
console.log(path.join(__dirname, 'public'));
app.use(morgan('combined'));

//Template engine
// Using handlebars to view
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// connect to route file
route(app);

// Start listening
