const Dev= require('../models/devs')
  const jwt= require('jsonwebtoken')

  const dauth= (async(req,res,next)=>{
      try {
          const token = req.header('Authorization').replace('Bearer ', '')
           const isIndeed=  jwt.verify(token, 'iamdeveloper')
          const user=  await Dev.findOne({_id: isIndeed._id, 'tokens.token': token })
            if(!user){
                   return res.status(401).status('Hey You are not Recognizable')
            }
               req.user= user
              req.token= token
           next()
      }
       catch(e){
           res.status(409).send()
       }
  })

module.exports= dauth