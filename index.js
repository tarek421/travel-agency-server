const express = require('express')
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g7gsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



async function run() {
  try {
    await client.connect();
    const destinationCollection = client.db("travelAgency").collection("destinations");
    const orderCollection = client.db("travelAgency").collection("orders")
    
    app.post("/destinations", async (req, res) => {
      const destination = req.body;
      const result = await destinationCollection.insertOne(destination);
      res.json(result);
    })

    app.get("/destinations", async (req, res) => {
      const result = await destinationCollection.find({}).toArray();
      res.json(result);
    })


    app.get("/destination", async (req, res) => {
      const title = req.query.title;
      const query = {title: title};
      const result = await destinationCollection.find(query).toArray();
      res.json(result);
      console.log(result);
    })

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    })

    app.get('/orders', async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.json(result);
    })

    app.get('/order:email', async (req, res) => {
      const query = req.query.email;
      const result = await orderCollection.find(query).toArray();
      res.json(result);
    })

  } finally { }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})