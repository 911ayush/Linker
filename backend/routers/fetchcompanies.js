const express= require('express')
const cauth= require('../authentication/cauth')
const dauth= require('../authentication/dauth')
const router=  new express.Router()
const Compp= require('../models/compaccount/compprofile')
const Comp= require('../models/comps')


router.get('/fetchcomp/asComp',cauth,async(req,res)=>{
        try{
                      const allComp= await Comp.find({})
                          const updateComp= []
                       for(const comp of allComp) {
                           const compObject = comp.toObject()
                             delete compObject.email
                            delete  compObject.__v
                                 delete compObject.password
                                 delete compObject.tokens
                           updateComp.push(compObject)
                       }
                     res.status(200).send(updateComp)
                 }
                 catch(e){
                        res.status(400).send({error : e.toString()})
                 }
})


  router.get('/fetchcomp/asDev',dauth,async(req,res)=>{
      try {
          const allComp = await Comp.find({})
          const updateComp = []
          for (const comp of allComp) {
              const compObject = comp.toObject()
              delete compObject.email
              delete  compObject.__v
              delete compObject.password
              delete compObject.tokens
              updateComp.push(compObject)
          }
          res.status(200).send(updateComp)
      }
      catch(e){
          res.status(404).send({error : e.toString()})
      }

  })

module.exports= router
