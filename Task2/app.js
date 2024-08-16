require('dotenv').config();

const express = require('express');
const app = express();
const expresslayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');

const connectDB = require('./server/config/db');

const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'arcues',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),

}));

app.use(express.static('public'));

app.use(expresslayout);
app.set('layout', './layouts/main');        //set main.js as default layout
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
    console.log('App listening on port: ', PORT);
});