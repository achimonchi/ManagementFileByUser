const
    express = require('express')

const 
    {
        platformList,
        platformById,
        platformAdd,
        platformEdit
    } = require('./../controller/platforms.controllers')

const 
    checkAuth = require('./../middleware/checkAuth')

const router = express.Router()



module.exports = router