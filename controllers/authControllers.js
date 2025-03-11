const {User} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const errorHandling = (err) => {
    let errors = { name: '', email: '', password: '' };

    if(err.message === 'incorrect email'){
        errors.email = 'wrong email';
    }

    if(err.message === 'incorrect password'){
        errors.password = 'wrong password';
    }

    // Validation Errors (e.g., empty fields, invalid formats)
    if (err instanceof ValidationError) {
        err.errors.forEach((error) => {
            errors[error.path] = error.message;
        });
    }

    // Unique Constraint Error (e.g., email already exists)
    if (err instanceof UniqueConstraintError) {
        errors.email = 'Email already exists';
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    return res.sendStatus(200);
}

// create user
module.exports.signup_post = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({name, email, password});
        const jwt = createToken(user.uuid);
        res.cookie('jwt', jwt, {
            maxAge: maxAge,
            sameSite: 'Lax' // Ensures cookies are sent in requests
        });
        return res.status(201).json(user.uuid);
    } catch(err) {
        console.log(err);
        const errors = errorHandling(err);
        return res.status(400).json(errors);
    }
}

// get all users
module.exports.users_get = async (req, res) => {
    try{
        const users = await User.findAll();
        console.log(req.cookies);
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json(err);
    }
}

// find user by id
module.exports.find_users_byid = async (req, res) => {
    try{
        const uuid = req.params.uuid;
        const user = await User.findOne({
            where: {uuid},
            include: 'posts'
        });

        return res.status(200).json(user);

    } catch(err) {
        return res.status(500).json(err);
    }
}

module.exports.login_get = (req, res) => {
    return res.sendStatus(200);
}

// user login
module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const jwt = createToken(user.uuid);
        res.cookie('jwt', jwt, {
            maxAge: maxAge,
            sameSite: 'Lax', // Ensures cookies are sent in requests
        });
        return res.status(201).json(user.uuid);
    } catch(err) {
        console.log(err);
        const errors = errorHandling(err);
        return res.status(400).json(errors);
    }
}

// user logout
module.exports.logout_get = async (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 1});
        res.status(200).json({message: 'user logout!'});
    } catch (err) {
        console.log(err);
        return res.status(400).json(errors);
    }
}