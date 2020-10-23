const express= require('express')
const cauth= require('../authentication/cauth')
 const dauth= require('../authentication/dauth')
 const router=  new express.Router()
const Devp= require('../models/devaccount/devprofile')
const Dev= require('../models/devs')

   router.get('/fetchdeveloper/asComp',cauth,async(req,res)=>{
      try{
          const allDeveloper=  await Dev.find({})
          const updatedDeveloper=[]
          for(const developer of allDeveloper) {
              const devObject = developer.toObject()
              const title = await Devp.findOne({owner: developer._id})
              if(title){
                  updatedDeveloper.push({
                      name: title.name,
                      _id: devObject._id
                  })
              }
          }
          res.status(200).send(updatedDeveloper)
      }
        catch(e){
          res.status(404).send({error: e.toString()})
      }
  })

   router.get('/fetchdeveloper/asDev',dauth,async (req,res)=>{
     try{
         const allDeveloper=  await Dev.find({})
         const updatedDeveloper=[]
         for(const developer of allDeveloper) {
             const devObject = developer.toObject()
             const title = await Devp.findOne({owner: developer._id})
             if(title){
                 updatedDeveloper.push({
                     name: title.name,
                     _id: devObject._id
                 })
             }
         }
         res.status(200).send(updatedDeveloper)
     }
     catch(e){
         res.status(404).send({error: e.toString()})
     }
 })






 module.exports= router