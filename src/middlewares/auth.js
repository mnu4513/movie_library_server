const express = require('express');
const jwt = require('jsonwebtoken');

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["token"];
        if (!token) return res.status(400).send({ status: false, message: "Missing authentication token, Please login first" });
        jwt.verify(token, 'key', (error, token) => {
            if (error) return res.status(401).send({ status: false, message: error.message });
            req.userId = token.userId;
            next();
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    };
};

const authrization = async function (req, res) {
    try {

    } catch (error) {
        return res.status(500).send({status: false, message: error.message});
    };
};

module.exports = { authentication, authrization };