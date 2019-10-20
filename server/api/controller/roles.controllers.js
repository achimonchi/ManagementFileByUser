const 
    mongoose    = require('mongoose')

const 
    Roles       = require('./../models/role.models')

exports.roleList = (req,res) => {
    Roles.find()
        .then(roles =>{
            res.status(200).json({
                count : roles.length,
                roles
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
}

exports.roleById = (req,res) =>{
    const id = req.params.id

    Roles.findById(id)
        .then(role=>{
            return res.status(200).json({
                role
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.roleAdd = (req,res)=>{
    const role = new Roles({
        _id : mongoose.Types.ObjectId(),
        r_name : req.body.r_name
    })

    role.save()
        .then(data=>{
            res.status(201).json({
                message : "New Role Created Successfully !",
                role : data
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
}

exports.roleEdit = async (req,res) =>{
    try{
        const id = req.params.id
        await Roles.findOneAndUpdate({_id : id}, req.body)
        return res.status(200).json({
            message : "Update role success "
        })
    }
    catch(err){
        return res.status(500).json({
            error : err
        })
    }
}