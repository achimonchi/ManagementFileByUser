const
    mongoose    = require('mongoose'),
    jwt         = require('jsonwebtoken'),
    fs          = require('fs-extra')

const 
    Video       = require('./../models/video.models'),
    Playlist    = require('./../models/playlist.models')



exports.myVideosInPlaylist=(req,res)=>{
    Video.find({v_playlist : req.params.id})
        .populate('v_playlist')
        .exec()
        .then(videos=>{
            return res.status(200).json({
                count : videos.length,
                videos
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}   

exports.myVideoById=(req,res)=>{
    Video.findById(req.params.id)
        .populate('v_playlist')
        .exec()
        .then(video=>{
            return res.status(200).json({
                video
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

exports.addMyVideosByPlaylist=(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    
    Playlist.findOne({_id : req.body.v_playlist, pl_user : decoded._id})
        .populate('pl_user')
        .populate('pl_category')
        .populate('pl_platform')
        .then(list=>{
            fs.move('users_directories/'+req.file.filename, 'users_directories/'+decoded.u_email+'/playlists/'+list.pl_platform.p_name+"/"+list.pl_category.c_name+"/"+list.pl_name+"/"+req.file.filename)
            .then(()=>{
                const video = new Video ({
                    _id : mongoose.Types.ObjectId(),
                    v_title : req.body.v_title,
                    v_name : 'users_directories/'+decoded.u_email+'/playlists/'+list.pl_platform.p_name+"/"+list.pl_category.c_name+"/"+list.pl_name+"/"+req.file.filename,
                    v_size : req.file.size,
                    v_playlist : req.body.v_playlist
                })

                video.save()
                    .then(data=>{
                        res.status(200).json({
                            message : "Upload File Successfull !",
                            data
                        })
                    })
                    .catch(err=>{
                        return res.status(500).json({
                            error : err
                        })
                    })

                

                
                
            })
            
            
            
            
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })

    
}

exports.editMyVideo=async(req,res)=>{
    try{
        const body = req.body

        await Video.findOneAndUpdate(
            {_id : req.params.id},
            body
        )

        res.status(200).json({
            message : "Update Video successfull"
        })
    }
    catch{
        res.status(500).json({
            message : "Update Video Failed !"
        })
    }
}

exports.deleteMyVideo=(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    Video.findById(req.params.id)
        .then(v=>{
            fs.remove(v.v_name)
                .then(()=>{
                    Video.remove({_id:v._id})
                        .exec()
                        .then(()=>{
                            res.status(200).json({
                                message : "Delete Video Successfull"
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: err
                            })
                        })
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    })
                })
            
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })

    // Video.remove({_id : req.params.id})
    //     .exec()
    //     .then(result=>{
    //         return res.status(200).json({
    //             message : "Video Deleted Successfull    "
    //         });
    //     })
    //     .catch(err=>{
    //         return res.status(500).json({
    //             error: err
    //         })
    //     })
}

exports.allVideos = (req,res)=>{
    Video.find()
        .populate('v_playlist')
        .exec()
        .then(videos=>{
            return res.status(200).json({
                count : videos.length,
                videos
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}


exports.deleteMyVideoByPlaylist=(req,res)=>{
    Video.find({v_playlist : req.params.id})
        .populate('v_playlist')
        .exec()
        .then(videos=>{
            return res.status(200).json({
                videos
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
}

