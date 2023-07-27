const { v4: uuidv4 } = require('uuid');
const Order = require("../model/order.model");
var admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
    console.log(req.headers?.authorization)
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
            console.log(decodedUser.email);
        } catch { }
    }
    next();
};


exports.creatOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            id: uuidv4(),
            destinationName: req.body.destinationName,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            state: req.body.state,
            price: req.body.price,
            adultPerson: req.body.adultPerson,
            comment: req.body.comment,
        });
        await newOrder.save();
        res.status(200).json({ message: 'successfully created Order', newOrder });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const result = await Order.find({});
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }

}

exports.getOrderByEmail = async (req, res) => {
    try {
        const result = await Order.find({ email: req.params.email });
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.orderStatus = verifyToken, async (req, res) => {
    try {
        const token = req.headers.authorization;
        const requesterEmail = req.decodedEmail;

        if (requester) {
            const requesterAccount = await Order.findOne({
                email: requesterEmail,
            });

            if (requesterAccount.role === 'admin' || requesterAccount.role === 'administer') {
                const { id, value } = req.body;
                const filter = { _id: ObjectId(id) };
                const update = { $set: { status: value } };
                const result = await Order.updateOne(filter, update);
                res.json(result);
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}