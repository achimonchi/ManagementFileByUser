const 
    mongoose    = require('mongoose')

const 
    Level       = require('./../models/level.models')

exports.levelList = (req,res)=>{
    Level.find()
        .then(level =>{
            res.status(200).json({
                count : level.length,
                level
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
}

exports.levelById = (req,res) =>{
    const id = req.params.id

    Level.findById(id)
        .exec()
        .then(level =>{
            return res.status(200).json({
                level
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.levelAdd = (req,res)=>{
    const level = new Level({
        _id : mongoose.Types.ObjectId(),
        l_name : req.body.l_name,
        l_xp : req.body.l_xp
    })

    level.save()
        .then(data=>{
            res.status(201).json({
                message : "New Level Created Successfully !",
                level : data
            })
        })
        .catch(err=>{
            res.status(500).json({
                error : err
            })
        })
}

exports.levelEdit = async (req,res)=>{
    try{
        const id = req.params.id
        await Level.findOneAndUpdate({_id : id}, req.body)
        return res.status(200).json({
            message : "Edit level success !"
        })
    }
    catch(err){
        return res.status(500).json({
            error : err
        })
    }
}