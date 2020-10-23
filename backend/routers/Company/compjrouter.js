const Job= require('../../models/jobs/job')
  const mongoose= require('mongoose')
 const express= require('express')
 const router= new express.Router()
 const cauth=  require('../../authentication/cauth')



 router.post('/compjob/publish',cauth,async (req,res)=>{
     console.log(req.body)
               try {
                   const job = await new Job({
                           post: req.body.post,
                           createdBy: req.body.createdBy,
                           selectedRange: req.body.selectedRange,
                           owner:  req.user._id
                   })
                   await job.save()
                   res.status(200).send('Job published Successfully')
               }catch(e){
                    res.status(404).send(e)
               }
 })










module.exports=  router