const {Todo} = require("../models/index")

module.exports = async(req, res, next)=>{
    try{
        const data = await Todo.findOne({
            where:{
                id: req.params.id,
                UserId: req.loginUser.id
            }
        })
        // console.log(data)
        if(data){
            console.log("access controller")
            next()
        }
        else{
            // console.log("error 401")
            res.status(401).json({message: `you aren't authorized to access this todo`})
            // throw {
            //     status: 401,
            //     message: `you aren't authorized to access this todo`
            // }
        }
    }catch{
        // console.log("error 500")
        res.status(500).json({message: 'internal server error'})
        // next(e)
    }
}