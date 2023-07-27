const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var admin = require("firebase-admin");




const userRouter = require('./router/user.route');
const destinationRouter = require('./router/destination.route');
const orderRouter = require('./router/order.route');
const rivewRouter = require('./router/rivew.router');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




app.use('/destinations', destinationRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/rivews', rivewRouter);




// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// })



var serviceAccount = require("./travel-agency-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Route not found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Bad Request' });
})


//Handling server error
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Server error' });
})


module.exports = app;