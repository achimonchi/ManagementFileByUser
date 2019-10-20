const
    express     = require('express')

const 
    {
        categoryList
    } = require('./../controller/categories.controllers')

const router = express.Router()

router.get('/', categoryList)

module.exports = router