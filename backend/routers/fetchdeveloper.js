const express= require('express')
const cauth= require('../authentication/cauth')
 const dauth= require('../authentication/dauth')
 const router=  new express.Router()
const Dev= require('../models/devaccount/devprofile')


  router.get('/fetchdeveloper/asComp',cauth,async(req,res)=>{
                try{
                     const allDeveloper=  await Dev.find({})
                    const updatedDeveloper=[]
                     allDeveloper.forEach((developer)=>{
                                   const devObject=developer.toObject()
                                   delete devObject.avatar
                                  delete devObject.skills
                            delete devObject.owner
                            delete devObject.createdAt
                            delete devObject.updatedAt
                        delete devObject.about
                         delete devObject.__v
                             updatedDeveloper.push(devObject)

                    })
                    console.log(updatedDeveloper)
                               res.send(updatedDeveloper)
                }
                catch(e){
                     res.status(404).send({error: e.toString()})
                }
  })
 router.get('/fetchdeveloper/asDev',dauth,async(req,res)=>{
       try {
           const allDeveloper = await Dev.find({})
           const updatedDeveloper = []
           allDeveloper.forEach((developer) => {
               const devObject = developer.toObject()
               delete devObject.avatar
               delete devObject.skills
               delete devObject.owner
               delete devObject.createdAt
               delete devObject.updatedAt
               delete devObject.about
               delete devObject.__v
               updatedDeveloper.push(devObject)
           })
           res.status(200).send(updatedDeveloper)
       }
       catch(e){
             res.status(404).send({ error: e.toObject()})
       }
 })






 module.exports= router