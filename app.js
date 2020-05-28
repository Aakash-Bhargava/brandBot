const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reservationRoutes = require('./api/routes/reservations');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/reservations', reservationRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:  {
            message: error.message || 'Something went wrong'
        }
    })
})
module.exports = app