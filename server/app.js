// ===============================================================================
// ======================[REQUIRE MODULE]=========================================

    // package
const 
    express     = require('express'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    env         = require('dotenv'),
    cors        = require('cors')

    // routes
const 
    userRoutes      = require('./api/routes/users.routes'),
    levelRoutes     = require('./api/routes/levels.routes'),
    roleRoutes      = require('./api/routes/roles.routes'),
    adminRoutes     = require('./api/routes/admins.routes'),
    platformRoutes  = require('./api/routes/platforms.routes'),
    videoRoutes     = require('./api/routes/videos.routes')

// ===============================================================================
// ======================[USE MODULE FOR STARTED]=================================

const app = express()

app.use(morgan('dev'))  // untuk logging request
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/users_directories', express.static('users_directories'))

env.config()

// ===============================================================================
// ======================[SETTING DATABASE TO USE]================================

mongoose.connect(
    'mongodb://reyhan:reyhan@boedakit-shard-00-00-rsid0.mongodb.net:27017,boedakit-shard-00-01-rsid0.mongodb.net:27017,boedakit-shard-00-02-rsid0.mongodb.net:27017/test?ssl=true&replicaSet=BOEDAKIT-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        auth : {
            user : "reyhan",
            password : "reyhan"
        },
        useNewUrlParser : true
    }
)
.catch(err=>{
    console.log(err)
})

mongoose.Promise = global.Promise

// ===============================================================================
// ======================[DEPLOY SOME ROUTES]=====================================

app.use('/users', userRoutes)
app.use('/levels', levelRoutes)
app.use('/roles', roleRoutes)
app.use('/admins', adminRoutes)
app.use('/platforms', platformRoutes)
app.use('/videos', videoRoutes)


// ===============================================================================
// ======================[CUSTOM ERROR MESSAGE]===================================

app.use((req,res,next)=>{
    const error = new Error('Not found !')
    error.status = 404
    next(error)
})

app.use((error, req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app