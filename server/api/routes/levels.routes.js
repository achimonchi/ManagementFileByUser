const 
    express     = require('express')

const {
    levelList,
    levelById,
    levelAdd,
    levelEdit
} = require('./../controller/levels.controllers')

const 
    {
        checkLogin,
        checkRole
    } = require('./../middleware/checkAdminAuth')

const router    = express.Router()



module.exports = router