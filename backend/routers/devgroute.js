const express= require('express')
const router= new express.Router()
const  Dev= require('../models/devs')


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
  router.post('/devg/login',async(req,res)=>{
    const dev= await Dev.findByCredentials(req.body.email,req.body.password)
       try{
           if(!dev){
                 res.status(406).send('Either password Or Email is not matched')
           }
              const logToken= await dev.generateToken()
           // Token Chuppa Diye Hai Dhyaan Dena
             res.status(201).send({dev,logToken})
    }
    catch(e) {
          res.status(400).send(e)
    }
  })
 module.exports= router
