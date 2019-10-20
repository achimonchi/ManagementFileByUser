const 
    express = require('express'),
    multer  = require('multer')

const { 
    myVideosInPlaylist,
    addMyVideosByPlaylist,
    myVideoById,
    editMyVideo,
    deleteMyVideo,
    allVideos,
    deleteMyVideoByPlaylist
} = require('./../controller/videos.controllers')

const 
    checkAuth   = require('./../middleware/checkAuth')

const 
    {
        checkLogin,
        checkRole
    } = require('./../middleware/checkAdminAuth')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'users_directories/')
    },
    filename : function(req,file,cb){
        cb(null, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file.originalname)
    }
})

var upload = multer({storage:storage})

const router = express.Router()

// =================================================================================
// ===========================[FOR USERS]===========================================

router.get('/playlist/:id', checkAuth, myVideosInPlaylist)

router.delete('/playlist/:id', checkAuth, deleteMyVideoByPlaylist)

router.get('/:id', checkAuth, myVideoById)

router.post('/',checkAuth, upload.single('v_video'), addMyVideosByPlaylist)

router.patch('/:id', checkAuth, editMyVideo)

router.delete('/:id', checkAuth, deleteMyVideo)



// =================================================================================
// ===========================[FOR ADMIN]===========================================

router.get('/', checkLogin,checkRole(["super admin"]), allVideos)



module.exports = router