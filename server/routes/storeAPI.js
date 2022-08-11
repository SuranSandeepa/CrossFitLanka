const router = require("express").Router();
const StoreItem = require("../models/store");

//get all data from database
router.route("/store").get(async (req, res) => {
  try {
    const store = await StoreItem.find()
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//insert data
router.route("/insertstore").post(async (req, res) => {
    //get frontend request body data and store it in variables
    const itemCode = req.body.itemCode;
    const itemName = req.body.itemName;
    const itemPrice = Number(req.body.itemPrice);
    const itemQuantity = Number(req.body.itemQuantity);
    
    //create an objec to store the data
    const newItem = new StoreItem({
        itemCode,
        itemName,
        itemPrice,
        itemQuantity
    })

    newItem.save().then((err) => { 
        req.jason("Item saved Successfully");
    }).catch((err) => { 
        console.log(err.message);
    })
});
