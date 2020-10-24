const Comp= require('../models/comps')
const jwt= require('jsonwebtoken')

const cauth= (async(req,res,next)=>{
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const isIndeed=  jwt.verify(token, 'iamcompany')
        const user=  await Comp.findOne({_id: isIndeed._id, 'tokens.token': token })

        console.log()
        if(!user){
            return res.status(401).status('Hey You are not Recognizable')
        }
        req.user= user
        req.token= token
        next()
    }
    catch(e){

        res.status(404).send()
    }

})

module.exports= cauth