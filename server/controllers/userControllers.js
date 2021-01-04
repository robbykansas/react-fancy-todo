const {User} = require("../models/index")
const bcrypt = require('bcryptjs')
const Helper = require("../Helper/helpers")
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController{
    static register(req, res, next){
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        // console.log(obj)
        User.create(obj)
        .then(data=>{
            console.log(data)
            res.status(201).json({email: data.email, id: data.id})
        })
        .catch(e=>{
            next(e)
        })
    }

    static login(req, res, next){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(data=>{
            if(!data){
                throw {
                    status: 401,
                    message: `invalid account`
                }
            } else if (bcrypt.compareSync(req.body.password, data.password)){
                // console.log("access this second")
                const access_token = Helper.generateToken({id: data.id, email:data.email})
                res.status(200).json({access_token})
            } else {
                // res.status(401).json({message: `invalid email/password`})
                throw {
                    status: 401,
                    message: `invalid email/password`
                }
            }
            }
        )
        .catch(e=>{
            next(e)
        })
    }

    static googleLogin(req, res, next){
        let payload
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket=>{
            payload = ticket.getPayload()
            return User.findOne({
                where:{
                    email: payload.email
                }
            })
        })
        .then(user=>{
            if (user){
                return user
            } else {
                console.log("access user create")
                return User.create({
                    first_name: payload.given_name,
                    last_name: payload.family_name,
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                })
            }
        })
        .then(user=>{
            console.log(user)
            const access_token = Helper.generateToken({id: user.id, email: user.email})
            res.status(200).json( {access_token} )
        })
        .catch(e=>{
            console.log(e)
            res.status(500).json(e)
        })
    }
}

module.exports = UserController