const 
    mongoose = require("mongoose"),
    jwt = require("jsonwebtoken");

const 
    User = require("./../models/user.models"),
    Histories_TopUp = require("./../models/histories_topup.models");

exports.historiesAdd = (req, res) => {
    const body = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const histories = new Histories_TopUp({
        _id: mongoose.Types.ObjectId(),
        ht_code: body.ht_code,
        ht_information: body.ht_information,
        ht_status: body.ht_status,
        ht_user: decoded._id
    });

  histories
    .save()
    .then(data => {
      return res.status(201).json({
        message: "Created history top up success! ",
        data
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.historiesList = (req, res) => {
  Histories_TopUp.find()
    .populate("ht_user")
    .exec()
    .then(histories => {
      return res.status(200).json({
        count: histories.length,
        histories
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.historiesById = (req, res) => {
  Histories_TopUp.findById(req.params.id)
    .then(histories => {
      return res.status(200).json({
        histories: histories,
        status: "was found"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "BAD REQUEST!",
        error: err
      });
    });
};

exports.historiesByIdUser = (req, res) => {
  Histories_TopUp.find({ ht_user: req.params.id })
    .populate("ht_user")
    .exec()
    .then(histories => {
      return res.status(200).json({
        histories: histories,
        status: "was found"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "BAD REQUEST!",
        error: err
      });
    });
};

exports.historiesEdit = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const body = req.body;

  if (body.ht_status) {
    await Histories_TopUp.findOneAndUpdate(
      { _id: req.params.id, ht_user: decoded._id },
      body
    );
    res.status(200).json({
      message: "Update data successfull"
    });
  } else {
    return res.status(500).json({
      message: "Invalid request !"
    });
  }
};

