const 
    mongoose    = require('mongoose'),
    jwt         = require('jsonwebtoken')

const 
    Forum       = require('./../models/forum.models'),
    User        = require('./../models/user.models'),
    Category    = require('./../models/category.models')

exports.forumList = (req, res) => {
    Forum.find()
        .populate('f_user')
        .populate('f_category')
        .exec()
        .then(forums=>{
            return res.status(200).json({
                count : forums.length,
                forums 
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.forumAdd = (req,res) => {
    const body = req.body

    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    const forum = new Forum({
        _id : mongoose.Types.ObjectId(),
        f_title : body.f_title,
        f_question : body.f_question,
        f_user : decoded._id,
        f_category : body.f_category
    })

    forum.save()
        .then(data =>{
            return res.status(201).json({
                message : "Created question success !",
                data
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.forumEdit = async (req, res) =>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    const body = req.body

    await Forum.findOneAndUpdate({_id : req.params.id, f_user : decoded._id}, body)
    res.status(200).json({
        message : "Update data successfull"
    })
}

exports.forumById = (req, res)=>{
    Forum.findById(req.params.id)
        .then(forum=>{
            return res.status(200).json({
                forum : forum,
                status : 'was found'
            })
        })
        .catch(err=>{
            return res.status(500).json({
                message : 'BAD REQUEST !',
                error : err
            })
        })
}

exports.forumDelete = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const body = req.body;
    const id = req.params.id;
  
    Forum.findById(id)
      .exec()
      .then(forum => {
        if (forum) {
          Forum.remove({ _id: id })
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
  
