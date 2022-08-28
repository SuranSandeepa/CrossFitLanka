const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const moment = require("moment");
const dotenv = require("dotenv");
require("dotenv").config(); //read .env file

const mongoClient = new MongoClient(process.env.MONGODB_URL);
const clientPromise = mongoClient.connect();

router.get("/", async function (req, res) {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    const data = await database.collection("GymTrainer").find().toArray();
    console.log(data);
    res.status(200).json({ data: data, error: null });
  } catch (err) {
    res.status(500).json({ data: { status: "failed", token: null }, error: e });
  }
});

router.post("/", async function (req, res) {
  try {
    const database = (await clientPromise).db(process.env.MONGO_DB);
    await database.collection("GymTrainer").insertOne(req.body);
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

// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const database = (await clientPromise).db(process.env.MONGO_DB);
//     await database.collection("GymStore").findByIdAndUpdate(id, req.body);
//     res.status(200).json({
//       data: {
//         status: "Update Successfully",
//       },
//       error: null,
//     });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ data: { status: "Failed to update", token: null }, error: e });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const database = (await clientPromise).db(process.env.MONGO_DB);
//     await database.collection("GymStore").findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       data: { status: "Failed to Delete", token: null },
//       error: e,
//     });
//   }
// });
module.exports = router;