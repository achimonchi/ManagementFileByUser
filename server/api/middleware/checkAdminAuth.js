const
    jwt = require('jsonwebtoken')

exports.checkLogin = (req,res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_KEY)
        req.userData = decoded

        next()
    }
    catch(err){
        return res.status(401).json({
            message: "Auth failed !"
        })
    }
}

exports.checkRole = (roles) =>{
    return function(req,res,next){
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_KEY)
    
        if(roles.includes(decoded.level)){
            next()
        }
        else{
            return res.status(401).json({
                message: "Auth failed !"
            })
            
        }
        
    }
}