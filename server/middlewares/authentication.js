const {User} = require("../models/index")
const Helper = require("../Helper/helpers")

module.exports = async (req, res, next)=>{
    try{
        // console.log(">>>>>>>>>>>>>>>>>>", req.headers.access_token)
        const access_token = req.headers.access_token
        // console.log("access this third")
        
        const decoded = Helper.verifyToken(access_token)
        
        req.loginUser = decoded
        const user = await User.findOne({
            where:{
                id: decoded.id
            }
        })
            // console.log(user)
        if(user){
            console.log("access authorization")
            next()
        } else {
            res.status(401).json({msg: 'please login first'})
            // throw {
            //     status: 401,
            //     message: `please login first`
            // }
        }
        
    }catch{
        // console.log(e)
        res.status(500).json({message: 'internal server error'})
        // next(e)
    }
}