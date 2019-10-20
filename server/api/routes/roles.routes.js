const 
    express     = require('express')

const 
    {
        roleList,
        roleById,
        roleAdd,
        roleEdit
    } = require('./../controller/roles.controllers')

const 
    {
        checkLogin,
        checkRole
    } = require('./../middleware/checkAdminAuth')


const router    = express.Router()


router.get('/', roleList)

router.get('/:id', checkLogin, checkRole(["super admin"]), roleById)

router.post('/', checkLogin, checkRole(["super admin"]),  roleAdd)

router.patch('/:id', checkLogin, checkRole(["super admin"]), roleEdit)

module.exports = router