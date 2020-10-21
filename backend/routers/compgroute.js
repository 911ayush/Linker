const Comp = require('../models/comps')
  const express= require('express')
 const router=  new express.Router()
   const cauth= require('../authentication/cauth')
 const CompProfile= require('../models/compaccount/compprofile')

router.post('/compg/signup',async(req,res)=>{
    try {
        const comp = await new Comp(req.body)
        await comp.save()
        const compprofile = await new CompProfile({
            title: req.body.title,
            owner: comp._id
        })
        await compprofile.save()
        res.status(201).send()
    }
    catch(e){
        res.status(500).send()
    }
})
router.post('/compg/login',async(req,res)=>{
    const comp= await Comp.findByCredentials(req.body.email,req.body.password)
    try{
        if(!comp){
            res.status(406).send('Either password Or Email is not matched')
        }
        const logToken= await comp.generateToken()
        res.status(201).send({comp,logToken})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

module.exports=  router