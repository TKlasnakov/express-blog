const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blog-routes');

const dbUri = '';
mongoose.connect(dbUri)
    .then(data => {
        console.log('Connected to DB');
        app.listen(3000);
    })
    .catch(error => console.log(error));

const app = express();
const root = __dirname;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
});


app.use((req, res) => {
    res.status(404)
        .render('404', { root, title: '404' })
})