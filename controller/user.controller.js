
const { v4: uuidv4 } = require('uuid');
const User = require('../model/user.model');
const ObjectId = require('mongodb').ObjectID;

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

exports.GetAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.GetOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


exports.CreateUser = async (req, res) => {
    try {
        const newUser = new User({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            role: req.body.role
        });
        await newUser.save();
        res.status(200).json({ message: 'successfully created user', newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const filter = { email: req.body.email }
        const update = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            role: req.body.role
        };
        const user = await User.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
        });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


exports.DeleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = req.body;
        const requester = req.decodedEmail;
        if (requester) {
            const requesterAccount = await User.findOne({
                email: requester,
            });
            if (requesterAccount.role === 'administer') {
                await User.deleteOne({ id: req.params.id });
                res.status(200).json({ message: 'successfully deleted user' });
            } else {
                res.status(500).json({ message: "only administer can delete admin" })
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.createAdmin = async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const options = { upsert: true };
        const update = { $set: user };
        const user = await User.updateOne(filter, update, options);
        await user.save();
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}




exports.updateAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = req.body;
        const requester = req.decodedEmail;
        if (requester) {
            const requesterAccount = await User.findOne({
                email: requester,
            });
            if (requesterAccount.role === 'admin' || requesterAccount.role === 'administer') {
                const filter = { email: req.body.email };
                const update = { $set: { role: "admin" } };
                const user = await User.updateOne(filter, update);
                await user.save();
                res.json(result);
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.adminList = async (req, res) => {
    try {
        const admin = await User.find({ role: 'admin' });
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.checkAdmin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        let isAdmin = false;
        if (user?.role === "admin" || user?.role === "administer") {
            isAdmin = true;
        }
        res.json({ admin: isAdmin });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

