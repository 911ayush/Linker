const express= require('express')
const router= new express.Router()
const  Dev= require('../models/devs')
const dauth=  require('../authentication/dauth')

 router.post('/devg/signup',async(req,res)=>{
      try {
          const dev= await new Dev(req.body)
            await dev.save()
         res.status(201).send()
      }
      catch{
          res.status(500).send()
      }
 })
  router.post('/devg/login',dauth,async(req,res)=>{
    const dev= await Dev.findByCredentials(req.body.email,req.body.password)
       try{
           if(!dev){
                 res.status(406).send('Either password Or Email is not matched')
           }
              const logToken= await dev.generateToken()
             res.status(201).send({dev,logToken})
    }
    catch(e) {
          res.status(400).send(e)
    }
  })
   router.get('/devg',dauth,(req,res)=>{
              res.status(201).send('Recognizable')
   })
 module.exports= router
