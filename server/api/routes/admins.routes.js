const 
    express = require('express')

const 
    {
        adminList,
        adminById,
        adminAdd,
        adminLogin
    } = require('./../controller/admins.controllers')

const
    {   
        userList,
        userDelete,
        userByIdinAdmin

    } = require('./../controller/users.controllers')

const 
    {
        categoryList,
        categoryById,
        categoryAdd,
        categoryEdit
    } = require('./../controller/categories.controllers')

const  
    {
        platformList,
        platformById,
        platformAdd,
        platformEdit
    } = require('./../controller/platforms.controllers')

const 
    {
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



const router = express.Router()

// ====================================================================================
// ============================== [ROUTES ADMIN ROOT] =================================

router.get('/',checkLogin, checkRole(["super admin"]), adminList)

router.get('/:id', checkLogin, checkRole(["super admin"]), adminById)

router.post('/', adminAdd)

router.post('/login', adminLogin)


// ====================================================================================
// ============================== [ROUTES ADMIN LEVEL] =================================

router.get('/levels/l', levelList)

router.get('/levels/l/:id', checkLogin, checkRole(['super admin']), levelById)

router.post('/levels/l/',checkLogin, checkRole(['super admin']),levelAdd)

router.patch('/levels/l/:id', checkLogin, checkRole(['super admin']), levelEdit )

// ====================================================================================
// ============================== [ROUTES ADMIN USERS] =================================

router.get('/users/u', userList)
router.get('/users/u/:id', userByIdinAdmin)
router.delete('/users/u/:id', userDelete)

// ====================================================================================
// ============================== [ROUTES ADMIN CATEGORIES] ===========================

router.get('/categories/c', checkLogin, 
        checkRole(["super admin","admin video"]), categoryList)

router.get('/categories/c/:id', checkLogin, 
        checkRole(["super admin","admin video"]), categoryById)

router.post('/categories/c', checkLogin, 
        checkRole(["super admin","admin video"]), categoryAdd)

router.patch('/categories/c/:id', checkLogin,
        checkRole(["super admin","admin video"]), categoryEdit)


// ====================================================================================
// ============================== [ROUTES ADMIN PLATFORMS] ============================

router.get('/platforms/p', checkLogin, checkRole(["super admin","admin video"]), platformList)

router.get('/platforms/p/:id', checkLogin, platformById)

router.post('/platforms/p/', checkLogin, platformAdd)

router.patch('/platforms/p/:id', checkLogin, platformEdit)

// ====================================================================================
// ============================== [ROUTES ADMIN ROLES] ================================

module.exports = router