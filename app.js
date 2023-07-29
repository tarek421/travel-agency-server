const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var admin = require("firebase-admin");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ["https://travel-agency-1.netlify.app/", "https://easy-pear-moth-fez.cyclic.app", "http://localhost:3000", "https://travel-agency-client-six.vercel.app/"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const userRouter = require('./router/user.route');
const destinationRouter = require('./router/destination.route');
const orderRouter = require('./router/order.route');
const rivewRouter = require('./router/rivew.router');




app.use('/destinations', cors(), destinationRouter);
app.use('/users', cors(), userRouter);
app.use('/orders', cors(), orderRouter);
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