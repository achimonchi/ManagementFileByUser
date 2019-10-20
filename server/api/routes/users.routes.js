const 
    express     = require('express')

const 
    {
        addUser,
        userById,
        userLogin,
        userEdit
    } = require('./../controller/users.controllers')

const 
    {
        playlistList,
        playlistByIdList,
        playlistByCategory,
        playlistByIdUser,
        playlistAdd
    } = require('./../controller/playlists.controllers')

const 
    {
        platformList
    } = require('./../controller/platforms.controllers')

const
    {
        forumList,
        forumAdd,
        forumEdit,
        forumById
    } = require ('./../controller/forums.controllers')

const 
    {
        categoryListByIdPlatform,
        categoryById
    } = require('./../controller/categories.controllers')

const 
    checkAuth   = require('./../middleware/checkAuth')

const router    = express.Router()


// ====================================================================================
// ============================== [ROUTES USERS ROOT] =================================
router.post('/signup', addUser)

router.post('/login', userLogin)

router.get('/',checkAuth, userById)

router.patch('/', checkAuth, userEdit)

// ====================================================================================
// ============================== [ROUTES USERS PLAYLIST] =============================
router.get('/playlist/p', checkAuth, playlistList)

router.get('/playlist/p/:id', checkAuth, playlistByIdList)

router.get('/playlist/u', checkAuth, playlistByIdUser)

router.get('/playlist/c/:id', checkAuth, playlistByCategory)

router.post('/playlist/p', checkAuth, playlistAdd)

// ====================================================================================
// ============================== [ROUTES USERS PLAYLIST] =============================
router.get('/forum/f', checkAuth, forumList);

router.post('/forum/f', checkAuth, forumAdd);

router.patch('/forum/f/:id', checkAuth, forumEdit);

router.get('/forum/f/:id', checkAuth, forumById);

// ====================================================================================
// ============================== [ROUTES USERS PLATFORMS] =============================
router.get('/platforms/p', checkAuth, platformList);

// ====================================================================================
// ============================== [ROUTES USERS PLATFORMS] =============================
router.get('/categories/p/:idPlatform', checkAuth, categoryListByIdPlatform);

module.exports = router
