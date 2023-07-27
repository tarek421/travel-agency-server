const Rivew = require("../model/rivew.model");



exports.getAllRivew = async (req, res) => {
    try {
        const rivew = await Rivew.find({});
        res.json(rivew);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.createRivew = async (req, res) => {
    try {
        const newRivew = new Rivew({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
        })

        await newRivew.save();
        res.status(200).json({ message: 'successfully created Order', newOrder })
    } catch (error) {
        res.status(500).json(error.message)
    }
}
