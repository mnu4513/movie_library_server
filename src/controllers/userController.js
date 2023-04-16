const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const validName = (name) => /^[a-zA-Z ]{3,20}$/.test(name);
const validMail = (mail) => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail);
const passwordValidator = require('password-validator');
const { isValidObjectId } = require('mongoose');
const validPassword = new passwordValidator();
validPassword
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .not().spaces();

const createUser = async function (req, res) {
    try {
        const data = req.body;
        const { name, email, password } = data;
        // validating data :- 
        if (Object.keys(data).length < 1) return res.status(400).send({status: false, message: "please enter all required fields"});
        if (!name) return res.status(400).send({status: false, message: 'Please enter name'});
        if (!email) return res.status(400).send({status: false, message: 'Please enter email'});
        if (!password) return res.status(400).send({status: false, message: 'Please enter password'});
        if (!validName(name)) return res.status(400).send({status: false, message: 'Please enter a valid name'});
        if (!validMail(email)) return res.status(400).send({status: false, message: 'Please enter a valid email'});
        if (!validPassword.validate(password)) return res.status(400).send({status: false, message: 'Please choose a strong password'});
        // checking unique email :- 
        const userExist = await userModel.findOne({email: email});
        if (userExist) return res.status(409).send({status: false, message: 'User already exists with this email'});
        // creating user :- 
        const user = await userModel.create(data);
        res.status(201).json({ status: true, message: "user registration successfull", data: { name, email } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    };
};

const loginUser = async function (req, res) {
    try {
        const data = req.body;
        const { email, password } = data;
        // validating data :- 
        if (Object.keys(data).length < 1) return res.status(400).send({status: false, message: "please enter all required fields"});
        if (!email) return res.status(400).send({status: false, message: 'Please enter email'});
        if (!password) return res.status(400).send({status: false, message: 'Please enter password'});
        if (!validMail(email)) return res.status(400).send({status: false, message: 'Please enter a valid email'});
        // logging in user :- 
        const user = await userModel.findOne(data);
        if (!user) return res.status(400).send({ status: false, message: 'Either email or password is incorrect' });
        // generating token and storing in cookie -- 
        const payLoad = { userId: user._id, email: user.email };
        const token = jwt.sign(payLoad, 'key');
        res.status(200).send({ status: true, message: 'loggedIn successfull', token: token, user: {name: user.name, email: email, userId: user._id} });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const userDetails = async function (req, res) {
    try {
        const userId = req.params.userId;
        if (!isValidObjectId(userId)) return res.status(400).send({status: false, message: 'Invalid userId'});
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).send({ status: false, message: "User does not exist" });
        return res.status(200).send({ status: true, data: user });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = { createUser, loginUser, userDetails };