const Financial = require("../models/financial.model");

//create a new Financial record
exports.create = async (req, res) => {
  const { userId, description, date, amount, category, paymentMethod } =
    req.body;
  const newRecord = {
    userId,
    description,
    date,
    amount,
    category,
    paymentMethod,
  };
  await Financial.create(newRecord)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while creating the Financial record",
      });
    });
};

//Get By ID financial
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Financial.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No Found Financial with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while creating the financial.",
      });
    });
};

//Retrieve all financial records
exports.findAll = async (req, res) => {
  await Financial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while creating the financial record.",
      });
    });
};

//Retrieve all financial records by User ID
exports.findAllByUserId = async (req, res) => {
  const userId = req.params.userId;
  await Financial.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while retrieving the financial record.",
      });
    });
};

// Update a financial
exports.update = async (req, res) => {
  const id = req.params.id;
  await Financial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Financial was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Financial with id=" +
            id +
            "Maybe Financial was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the financial.",
      });
    });
};

//Delete a financial
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Financial.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Financial was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Financial with id=" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the financial.",
      });
    });
};
