const
    mongoose    = require('mongoose'),
    jwt         = require('jsonwebtoken'),
    fs          = require('fs-extra')

const 
    Playlist    = require('./../models/playlist.models'),
    Category    = require('./../models/category.models')


exports.playlistList = (req,res) =>{
    Playlist.find()
        .populate('pl_user')
        .populate('pl_category')
        .populate('pl_platform')
        .exec()
        .then(lists =>{
            return res.status(200).json({
                count : lists.length,
                lists
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.playlistByIdList = (req,res) =>{
    const id = req.params.id
    
    Playlist.findById(id)
        .populate('pl_user')
        .populate('pl_category')
        .then(list=>{
            return res.status(200).json({
                list
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.playlistByCategory = (req,res) =>{
    const id = req.params.id

    Playlist.find({pl_category : id})
        .populate('pl_user')
        .populate('pl_category')
        .exec()
        .then(lists =>{
            return res.status(200).json({
                lists
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.playlistByIdUser = (req,res) =>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    Playlist.find({pl_user : decoded._id})
        .populate('pl_user')
        .populate('pl_category')
        .exec()
        .then(lists=>{
            return res.status(200).json({
                lists
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.playlistAdd = (req,res) =>{
    const body = req.body

    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    const pl = new Playlist({
        _id : mongoose.Types.ObjectId(),
        pl_name : body.pl_name,
        pl_price : body.pl_price,
        pl_platform : body.pl_platform,
        pl_category : body.pl_category,
        pl_user : decoded._id
    })

    pl.save()
        .then(data=>{
            Category.findById(data.pl_category)
                .populate('c_platform')
                .then(cat => {
                    fs.mkdirs('./users_directories/'+decoded.u_email+"/playlists/"+cat.c_platform.p_name+"/"+cat.c_name+"/"+data.pl_name)
                    return res.status(200).json({
                        message : "Created playlist success !",
                        data,
                        cat
                    })
                })
                .catch(err=>{
                    return res.status(500).json({
                        error : err
                    })        
                })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}