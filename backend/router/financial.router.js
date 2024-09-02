const express = require("express");
const router = express.Router();
const financialController = require("../controllers/financial.controller");

//Create a new financial
router.post("/", financialController.create);

//Retrieve a financial by ID
router.get("/:id", financialController.getById);

//Retrieve all financial
router.get("/", financialController.findAll);

//Retrieve all financial record By User ID
router.get("/user/:userId", financialController.findAllByUserId);

//Update a financial by ID
router.put(
  "/:id", financialController.update,
);

//Delete a restaurant by ID
router.delete(
  "/:id", financialController.delete
);

module.exports = router;