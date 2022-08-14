const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const moment = require("moment");
const dotenv = require("dotenv");
require("dotenv").config(); //read .env file

const mongoClient = new MongoClient(process.env.MONGODB_URL);
const clientPromise = mongoClient.connect();

router.get("/", async function (req, res) {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    const data = await database.collection("GymStore").find().toArray();
    res.status(200).json({ data: data, error: null });
  } catch (err) {
    res.status(500).json({ data: { status: "failed", token: null }, error: e });
  }
});

router.post("/", async function (req, res) {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    await database.collection("GymStore").insertOne(req.body);
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
      .json({ data: { status: "Failed to insert", token: null }, error: e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    await database.collection("GymStore").findOneAndUpdate(
      { _id: { $gte: new ObjectId(req.params.id) } },
      {
        $set: {
          itemCode: req.body.itemCode,
          itemName: req.body.itemName,
          itemPrice: req.body.itemPrice,
          description: req.body.description,
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
});

router.delete("/:id", async (req, res) => {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    const data = await database
      .collection("GymStore")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    console.log(data);
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

module.exports = router;
