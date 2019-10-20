const
    mongoose    = require('mongoose')

const
    Category  = require('./../models/category.models')

exports.categoryList = (req,res) =>{
    Category.find()
        .populate('c_platform')
        .then(cat=>{
            return res.status(200).json({
                count : cat.length,
                cat
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.categoryListByIdPlatform=(req,res)=>{
    
    const data ={
        c_platform : req.params.idPlatform
    }
    console.log(data)
    Category.find(data)
        .populate('c_platform')
        .then(cat=>{
            return res.status(200).json({
                count : cat.length,
                cat
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.categoryById = (req,res) =>{
    const id = req.params.id

    Category.findById(id)
        .populate('c_platform')
        .then(cat=>{
            return res.status(200).json({
                cat
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })

}

exports.categoryAdd = (req,res) =>{
    const body = req.body

    const cat = new Category({
        _id : mongoose.Types.ObjectId(),
        c_name : body.c_name,
        c_platform : body.c_platform
    })

    cat.save()
        .then(result=>{
            return res.status(201).json({
                message : "Created Category success ",
                category : result
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })

}

exports.categoryEdit = async(req,res)=>{
    try{
        const id = req.params.id
        await Category.findOneAndUpdate({_id : id}, req.body)
        return res.status(200).json({
            message : "Edit Category success"
        })
    }
    catch(err){
        return res.status(500).json({
            error : err
        })
    }
}