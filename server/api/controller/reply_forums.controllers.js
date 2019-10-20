const 
    mongoose = require("mongoose"),
    jwt = require("jsonwebtoken");

const 
    Forum = require("./../models/forum.models"),
    User = require("./../models/user.models"),
    Reply_forum = require("./../models/reply_forum.models");

exports.replyList = (req, res) => {
  Reply_forum.find()
    .populate("rf_user")
    .populate("rf_forum")
    .exec()
    .then(result => {
      return res.status(200).json({ result });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

exports.replyAdd = (req, res) => {
  const body = req.body;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const reply_forum = new Reply_forum({
    _id: mongoose.Types.ObjectId(),
    rf_reply: body.rf_reply,
    rf_forum: body.rf_forum,
    rf_user: decoded._id
  });

  reply_forum
    .save()
    .then(data => {
      return res.status(201).json({
        message: "Created reply success !",
        data
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.replyByIdReply = (req, res) => {
  Reply_forum.findById(req.params.id)
    .populate("rf_user")
    .populate("rf_forum")
    .exec()
    .then(reply_forum => {
      return res.status(200).json({
        reply_forum: reply_forum,
        status: "was found"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "BAD REQUEST ",
        error: err
      });
    });
};

exports.replyByIdUser = (req, res) => {
  Reply_forum.find({ rf_user: req.params.id })
    .populate("rf_user")
    .populate("rf_forum")
    .exec()
    .then(reply_forum => {
      return res.status(200).json({
        reply_forum: reply_forum,
        status: "was found"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "BAD REQUEST ",
        error: err
      });
    });
};

exports.replyByIdForum = (req, res) => {
  Reply_forum.find({ rf_forum: req.params.id })
    .populate("rf_user")
    .populate("rf_forum")
    .exec()
    .then(reply_forum => {
      return res.status(200).json({
        reply_forum: reply_forum,
        status: "was found"
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "BAD REQUEST ",
        error: err
      });
    });
};

exports.replyEdit = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const body = req.body;

  await Reply_forum.findOneAndUpdate(
    { _id: req.params.id, rf_user: decoded._id },
    body
  );
  res.status(200).json({
    message: "Update data successfull"
  });
};

exports.replyDeleteByIdReply = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  const body = req.body;
  const id = req.params.id;
  Reply_forum.findById(id)
    .exec()
    .then(reply_forum => {
      if (reply_forum) {
        Reply_forum.remove({ _id: id })
          .exec()
          .then(result => {
            return res.status(200).json({
              message: "Reply deleted successfull"
            });
          });
      } else {
        return res.status(404).json({
          message: "Reply not found !"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.replyDeleteByIdForum = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const body = req.body;

  Reply_forum.find({ rf_forum: req.params.id })
    .exec()
    .then(reply_forum => {
      if (reply_forum) {
        Reply_forum.remove({ rf_forum: req.params.id })
          .exec()
          .then(result => {
            next();
          });
      } else {
        return res.status(404).json({
          message: "Reply not found !"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.replyDeleteByIdUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const body = req.body;

  Reply_forum.find({ rf_user: req.params.id })
    .exec()
    .then(reply_forum => {
      if (reply_forum) {
        Reply_forum.remove({ rf_user: req.params.id })
          .exec()
          .then(result => {
            return res.status(200).json({
              message: "Reply deleted successfull"
            });
          });
      } else {
        return res.status(404).json({
          message: "Reply not found !"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};

exports.replyDeleteByIdUserForum = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const body = req.body;

  Reply_forum.find({ rf_user: req.params.idUser, rf_forum: req.params.idForum })
    .exec()
    .then(reply_forum => {
      if (reply_forum) {
        Reply_forum.remove({
          rf_user: req.params.idUser,
          rf_forum: req.params.idForum
        })
          .exec()
          .then(result => {
            return res.status(200).json({
              message: "Reply deleted successfull"
            });
          });
      } else {
        return res.status(404).json({
          message: "Reply not found !"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
};
