
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");
const moment = require('moment');
const dotenv = require("dotenv");
require("dotenv").config();//read .env file

const mongoClient = new MongoClient(process.env.MONGODB_URL);
const clientPromise = mongoClient.connect();

router.post('/login', async function (req, res) {
    try {
        const database = (await clientPromise).db(process.env.MONGO_DB);
        let result = await database.collection('user').findOne({ email: req.body.email });
        let token = null;
        let insertedU = null;
        if (!result) {
            req.body.created = moment(new Date()).format('YYYY-MM-DD');
            req.body.role = 2;
            insertedU = await database.collection('user').insertOne(req.body);
            token = await new Promise((resolve, reject) => {
                result = { '_id': insertedU.insertedId.toString(), name: req.body.name, email: req.body.email, created: req.body.created, role: req.body.role };
                jwt.sign({ user: { '_id': insertedU.insertedId.toString(), googleId: req.body.googleId, name: req.body.name, email: req.body.email, created: req.body.created, role: req.body.role } }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
                    resolve(token);
                })
            });
        } else {
            token = await new Promise((resolve, reject) => {
                jwt.sign({ user: result }, process.env.SECRET, { expiresIn: '6h' }, (err, token) => {
                    resolve(token);
                })
            });
        }
        res.status(200).json({ data: { status: 'success', token: token, user: result ? { '_id': result._id, name: result.name, email: result.email, created: result.created, role: result.role} : null }, error: null });
    } catch (e) {
        console.log(e);
        res.status(500).json({ data: { status: 'failed', token: null }, error: e });
    }
});

module.exports = router;