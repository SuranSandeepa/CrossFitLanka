const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

require("dotenv").config();//read .env file

const app = express(); //invoke express

const PORT = process.env.PORT || 8070; //PORT, that use connect to the serever
const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json()); //use body-parser to convert jason to javascript object

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Error with DB connecting!", err.message);
  });

app.listen(PORT, () => {
  //Listen to the PORT
  console.log(`Server is up & running on port : ${PORT}`);
});
