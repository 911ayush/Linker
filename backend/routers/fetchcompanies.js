const express= require('express')
const cauth= require('../authentication/cauth')
const dauth= require('../authentication/dauth')
const router=  new express.Router()
const Comp= require('../models/compaccount/compprofile')


router.get('/fetchcomp/asComp',cauth,async(req,res)=>{
                 try{
                      const allComp= await Comp.find({})
                          const updateComp= []
                       allComp.forEach((comp)=>{
                               const compObject= comp.toObject()
                              delete compObject.address
                                  delete compObject.about
                               delete compObject.lookup
                               delete compObject.owner
                           delete compObject.subscriber
                               delete compObject.createdAt
                               delete compObject.updatedAt
                           delete compObject.__v
                            updateComp.push(compObject)
                       })
                     res.status(200).send(updateComp)
                 }
                 catch(e){
                        res.status(404).send({error : e.toString()})
                 }
})


  router.get('/fetchcomp/asDev',dauth,async(req,res)=>{
      try{
          const allComp= await Comp.find({})
          const updateComp= []
          allComp.forEach((comp)=>{
              const compObject= comp.toObject()
              delete compObject.address
              delete compObject.about
              delete compObject.lookup
              delete compObject.owner
              delete compObject.subscriber
              delete compObject.createdAt
              delete compObject.updatedAt
              delete compObject.__v
               updateComp.push(compObject)
          })
          res.status(200).send(updateComp)
      }
      catch(e){
          res.status(404).send({error : e.toString()})
      }

  })

module.exports= router
