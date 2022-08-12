const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("dotenv").config(); //read .env file

const user = require("./routes/user");

const app = express(); //invoke express

const PORT = process.env.PORT || 8070; //PORT, that use connect to the serever

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); //use body-parser to convert jason to javascript object

app.use("/user", user);

app.listen(PORT, () => {
  //Listen to the PORT
  console.log(`Server is up & running on port : ${PORT}`);
});
