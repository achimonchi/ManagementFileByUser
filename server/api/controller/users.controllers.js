const 
    bcrypt      = require('bcrypt'),
    fs          = require('fs-extra'),
    jwt         = require('jsonwebtoken'),
    mongoose    = require('mongoose')

const 
    User        = require('./../models/user.models'),
    Level       = require('./../models/level.models')



exports.userList = (req,res)=>{
    User.find()
        .then(result=>{
            res.status(200).json({
                count : result.length,
                result
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.userByIdinAdmin = (req,res)=>{
    const id = req.params.id

    User.findById(id)
        .then(user=>{
            if(user){
                Level.aggregate(
                    [
                        {$match : {l_xp : {$lte : user.u_xp}}},
                        {$sort : {l_xp : -1}}
                    ]
                )
                .exec()
                .then(level =>{
                    return res.status(200).json({
                        user : user,
                        level : level[0]
                    })
                })
                .catch(err=>{
                    return res.status(500).json({
                        error : err
                    })
                })
            }
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.addUser = (req,res)=>{
    const body = req.body

    bcrypt.hash(body.u_password, 10, (err,hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            })
        }
        else{
            const user = new User({
                _id : mongoose.Types.ObjectId(),
                u_name : body.u_name,
                u_password : hash,
                u_email : body.u_email,
                u_contact : body.u_contact,
                u_gender : body.u_gender,
            })

            user.save()
                .then(data=>{
                    fs.mkdirs('./users_directories/'+data.u_email)
                    res.status(200).json({
                        message : "User created successfully !",
                        user : data
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

exports.userById = (req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    User.findById(decoded._id)
        .then(user=>{
            if(user){

                Level.aggregate([
                    {$match : {l_xp : {$gte : user.u_xp}}},
                    {$sort : {l_xp : 1}}
                ])
                .exec()
                .then(levelUp=>{
                    Level.aggregate([
                        {$match : {l_xp : {$lte : user.u_xp}}},
                        {$sort : {l_xp : -1}}
                    ])
                    .exec()
                    .then(levelDown=>{
                        return res.status(200).json({
                            user,
                            levelUp : levelUp[0],
                            levelNow : levelDown[0]
                        })
                    })
                    .catch(err=>{
                        return res.status(404).json({
                            message : "User not found !",
                            error : err
                        })
                    })
                    
                })
            }
            
        })
        .catch(err=>{
            return res.status(404).json({
                message : "User not found !",
                error : err
            })
        })
    
}

exports.userLogin = (req,res)=>{
    User.find({u_email : req.body.u_email})
        .exec()
        .then(user=>{
            if(user.length !== 1){
                return res.status(401).json({
                    message : "Auth Failed !"
                })
            }
            else{
                bcrypt.compare(req.body.u_password, user[0].u_password, (err,result)=>{
                    if(err){
                        return res.status(401).json({
                            message : "Auth Failed !"
                        })      
                    }
                    else{
                        if(result){
                            const token = jwt.sign({
                                u_email : user[0].u_email,
                                _id : user[0]._id,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn : "1d"
                            })

                            return res.status(200).json({
                                message : "Auth Success !",
                                token : "Baerer "+token
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


exports.userEdit = async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    const body = req.body

    if(body.u_xp || body.u_coin){
        return res.status(500).json({
            message : "Invalid request !"
        })
    }
    
    if(body.u_password){
        try{
            body.u_password = await bcrypt.hash(body.u_password, 10)
        }
        catch(error){
            return res.status(500).json({
                error : error
            })
        }
    }
    await User.findOneAndUpdate({_id : decoded._id}, body)
    res.status(200).json({
        message : "Update data successfull"
    })
}

exports.userDelete = (req,res)=>{
    const id = req.params.id
    User.findById(id)
        .exec()
        .then(user=>{
            if(user){
                User.remove({_id : id})
                    .exec()
                    .then(result=>{
                        fs.removeSync('./users_directories/'+user.u_email)
                        return res.status(200).json({
                            message : "User deleted successfull"
                        })
                    })
            }
            else{
                return res.status(404).json({
                    message: 'User not found !'
                })
            }
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}