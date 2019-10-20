const
    bcrypt      = require('bcrypt'),
    jwt         = require('jsonwebtoken'),
    mongoose    = require('mongoose')

const 
    Admin       = require('./../models/admin.models')

exports.adminList = (req,res) =>{
    Admin.find()
        .populate('a_role')
        .exec()
        .then(admins=>{
            return res.status(200).json({
                count : admins.length,
                admins
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.adminById = (req,res) =>{
    const id = req.params.id

    Admin.findById(id)
        .populate('a_role')
        .exec()
        .then(admin=>{
            return res.status(200).json({
                admin
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.adminAdd = (req,res) =>{
    const body = req.body

    bcrypt.hash(body.a_password, 10 , (err,hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            })
        }
        else{
            const admin = new Admin({
                _id : mongoose.Types.ObjectId(),
                a_name : body.a_name,
                a_email : body.a_email,
                a_password : hash,
                a_role : body.a_role
            })

            admin.save()
                .then(data=>{
                    return res.status(201).json({
                        message : "Admin created successfull !",
                        admin : data
                    })
                })
                .catch(err=>{
                    return res.status(500).json({
                        error : err
                    })
                })
        }
    })
}

exports.adminLogin = (req,res) =>{
    Admin.find({a_email : req.body.a_email})
        .populate('a_role')
        .exec()
        .then(admin=>{
            if(admin.length !== 1){
                return res.status(401).json({
                    message : "Auth Failed !"
                })
            }
            else{
                bcrypt.compare(req.body.a_password, admin[0].a_password, (err,result)=>{
                    if(err){
                        return res.status(401).json({
                            message : "Auth Failed !"
                        })
                    }
                    else{
                        if(result){
                            const token = jwt.sign({
                                _id : admin[0]._id,
                                a_email : admin[0].a_email,
                                level : admin[0].a_role.r_name
                            },
                            process.env.JWT_ADMIN_KEY,
                            {
                                expiresIn : "1d"
                            })

                            return res.status(200).json({
                                message : "Auth success ",
                                token : "Baerer " + token
                            })
                        }
                        else{
                            return res.status(401).json({
                                message : "Auth Failed !"
                            })
                        }
                    }
                })
            }
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}