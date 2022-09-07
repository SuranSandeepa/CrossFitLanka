const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const moment = require("moment");
const dotenv = require("dotenv");
const multer = require("multer");
var fs = require("fs");
var path = require("path");
require("dotenv").config(); //read .env file

const mongoClient = new MongoClient(process.env.MONGODB_URL);
const clientPromise = mongoClient.connect();

router.get("/", async function (req, res) {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    const data = await database.collection("GymMember").find().toArray();
    res.status(200).json({ data: data, error: null });
  } catch (err) {
    res.status(500).json({ data: { status: "failed", token: null }, error: err });
  }
});

router.post("/", async function (req, res) {
  try {
    req.body.file = {
      data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.body.file)),
      contentType: "image/png",
    };
    const database = (await clientPromise).db(process.env.MONGO_DB);
    await database.collection("GymMember").insertOne(req.body);
    res.status(200).json({
      data: {
        status: "Insert successfully",
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ data: { status: "Failed to insert", token: null }, error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    req.body.file = {
      data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.body.file)),
      contentType: "image/png",
    };
    const database = (await clientPromise).db(process.env.MONGO_DB);
    await database.collection("GymMember").findOneAndUpdate(
      { _id: { $gte: new ObjectId(req.params.id) } },
      {
        $set: {
          memberName: req.body.memberName,
          memberAddress: req.body.memberAddress,
          memberContact: req.body.memberContact,
          description: req.body.description,
          schedule: req.body.schedule,
          file: req.body.file,
        },
      }
    );
    res.status(200).json({
      data: {
        status: "Update Successfully",
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: { status: "Failed to update" }, error: err });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    const data = await database
      .collection("GymMember")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    // console.log(data);
    res.status(200).json({
      data: {
        status: "Delete Successfully",
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: { status: "Failed to Delete" },
      error: err,
    });
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

router.post(
  "/upload",
  multer({
    dest: "./routes/uploads",
    fileFilter,
    limits: { fileSize: 5000000 },
  }).single("file"),
  (req, res) => {
    res.json({ file: req.file });
  }
);

module.exports = router;