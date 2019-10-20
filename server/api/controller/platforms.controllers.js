const
    mongoose = require('mongoose')

const
    Platform = require('./../models/platform.models')

exports.platformList = (req,res)=>{
    Platform.find()
        .then(platforms=>{
            return res.status(200).json({
                count : platforms.length,
                platforms
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error :err
            })
        })
}

exports.platformById = (req,res) =>{
    const id = req.params.id

    Platform.findById(id)
        .exec()
        .then(platform =>{
            return res.status(200).json({
                platform
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.platformAdd = (req,res) =>{
    const body = req.body

    const platform = new Platform({
        _id : mongoose.Types.ObjectId(),
        p_name : body.p_name
    })

    platform.save()
        .then(data=>{
            res.status(201).json({
                message : "New Platform Created Successfull",
                platform : data
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.platformEdit = async (req,res) =>{
    try{
        const id = req.params.id
        await Platform.findOneAndUpdate({_id : id}, req.body)
        return res.status(200).json({
            message : "Edit Platform success"
        })
    }
    catch(err){
        return res.status(500).json({
            error : err
        })
    }
}