const Destination = require("../model/destination.model");
const User = require("../model/user.model");
const { v4: uuidv4 } = require('uuid');
const ObjectId = require('mongodb').ObjectID;


exports.getAllDestination = async (req, res) => {
    try {
        const destination = await Destination.find();
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.getDestinationByTitle = async (req, res) => {
    try {
        const result = await Destination.find({ title: req.params.title });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.createDestination = async (req, res) => {
    try {
        const newDestination = new Destination({
            id: uuidv4(),
            title: req.body.title,
            rating: req.body.rating,
            duration: req.body.duration,
            oprning: req.body.oprning,
            description: req.body.description,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
        });
        await newDestination.save();
        res.status(200).json({ message: 'successfully created destination' });
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.deleteDestination = async (req, res) => {
    try {
        // const token = req.headers.authorization;
        // const requester = req.decodedEmail;
        // if (requester) {
        //     const requesterAccount = await User.findOne({
        //         email: requester,
        //     });

        //     if (requesterAccount.role === 'admin') {
        //         const id = req.query.id;
        //         const filter = { _id: ObjectId(id) };
        //         const result = await Destination.deleteOne(filter);
        //         res.json(result);
        //     } else {
        //         res.status(500).json({ message: "Only Admin can delete file" })
        //     }
        // }

        const id = req.query.id;
        const filter = { _id: ObjectId(id) };
        const result = await Destination.deleteOne(filter);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}


