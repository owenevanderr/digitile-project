const {User} = require("../models");

module.exports.signup_get = (req, res) => {
    return res.sendStatus(200);
}

// create user
module.exports.signup_post = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({name, email, password})
        return res.status(201).json(user);
    } catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

module.exports.login_get = (req, res) => {
    return res.sendStatus(200);
}

module.exports.login_post = (req, res) => {
    return res.send(200);
}