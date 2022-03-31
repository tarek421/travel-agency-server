const express = require('express');
const app = express();
require('dotenv').config();
var admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;

var serviceAccount = require("./travel-agency-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g7gsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const verifyToken = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      req.decodedEmail = decodedUser.email;
    } catch { }
  }

  next();
};



app.get('/', (req, res) => {
  res.send('Hello World!')
})


async function run() {
  try {
    await client.connect();
    const destinationCollection = client.db("travelAgency").collection("destinations");
    const orderCollection = client.db("travelAgency").collection("orders");
    const userCollection = client.db("travelAgency").collection("users");
    const rivewsCollection = client.db("travelAgency").collection("rivews");

    // Destination Collection post and get operations

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
      const query = { title: title };
      const result = await destinationCollection.find(query).toArray();
      res.json(result);
    })

    // place Order collection pose and get

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    })

    app.get('/orders', verifyToken, async (req, res) => {
      const token = req.headers.authorization;
      const requester = req.decodedEmail;
      if (requester) {
        const result = await orderCollection.find({}).toArray();
        res.json(result);
      }

    })

    //Order status serviceAccount
  
    app.put('/orders/status', async (req, res) =>{
      const token = req.headers.authorization;
      const requester = req.decodedEmail;

      const orderStatus = req.body;
      const { id, value } = orderStatus;

      const filter = {_id : ObjectId(id)};
          const update = { $set: { status: value}};
          const result = await orderCollection.updateOne(filter, update);
          res.json(result);
          console.log(result);


      if(requester){
        const requesterAccount = await userCollection.findOne({
          email: requester,
        });

        if (requesterAccount.role === 'admin') {
          const orderStatus = req.body;
          const { id, value } = orderStatus;
    
          const filter = {_id : ObjectId(id)};
              const update = { $set: { status: value}};
              const result = await orderCollection.updateOne(filter, update);
              res.json(result);
        }
      }
    })

    app.get('/order', verifyToken, async (req, res) => {
      const token = req.headers.authorization;
      const requester = req.decodedEmail;
      if (requester) {
        const email = req.query.email;
        const query = { email: email };
        const result = await orderCollection.find(query).toArray();
        res.json(result);
      }

    })

    // User collection post, get and Make Admin

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.json(result);
    });



    //Make Admin API
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === "admin") {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });

    // update Admin api
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const update = { $set: user };
      const result = await userCollection.updateOne(filter, update, options);
      res.json(result);
    });

    //verify Admin API
    app.put("/users/admin", verifyToken, async (req, res) => {
      const token = req.headers.authorization;
      const user = req.body;
      const requester = req.decodedEmail;
      if (requester) {
        const requesterAccount = await userCollection.findOne({
          email: requester,
        });
        if (requesterAccount.role === 'admin') {
          const user = req.body;
          const filter = { email: user.email };
          const update = { $set: { role: "admin" } };
          const result = await userCollection.updateOne(filter, update);
          res.json(result);
        }
      }
    });

    // Rivew Collection post and get

    app.post("/rivews", async (req, res) => {
      const rivew = req.body;
      const result = await rivewsCollection.insertOne(rivew);
      res.json(result);
    })

    app.get("/rivews", async (req, res) => {
      const result = await rivewsCollection.find({}).toArray();
      res.json(result);
    })

  } finally { }
}
run().catch(console.dir);






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})