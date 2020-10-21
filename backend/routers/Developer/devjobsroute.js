const  Job= require('../../models/jobs/job')
    const express= require('express')
 const dauth= require('../../authentication/dauth')
const devProfile= require('../../models/devaccount/devprofile)
const router= new  express.Router()
 // Subscribed Jobs
   router.get('/devjobs',dauth,async(req,res)=>{
                     const  devprofile = await devProfile.findById(req.user._id)
        if(!devprofile){
             return res.status(400).send('Please Fill your  Profile First')
        }
       try{
           await  devprofile.populate('jobs').execPopulate()
            if(! devprofile.jobs){
                 return  res.status(404).send(' Nothing to show Please subscribe some companies')
            }
             res.status(200).send(devprofile.jobs)
       }
       catch(e){
              res.status(400).send(e)
       }
   })


   router.get('/devjobs/applied',dauth,async(req,res)=>{
       const  devprofile = await devProfile.findById(req.user._id)
       if(!devprofile){
           return res.status(400).send('Please Fill your  Profile First')
       }
        try{
             await  devprofile.populate({
                 path:'jobs',
                 match:{
                      'applicants.dev':  devprofile._id
                 }
             }).execPopulate()
            if(! devprofile.jobs){
                  return res.status(404).send('You have not applied for any job yet')
            }
               res.status(202).send(devprofile.jobs)
        }
        catch(e){
              res.status(400).send(e)
        }
   })
// here id is Job Id
 router.get('/devjobs/:id/apply',dauth,async(req,res)=>{
               const jobId=   req.params.id
            const job=  await Job.findById(jobId)
      try {
          if (!job) {
              return res.status(400).send('There is no job here releating with this job')
          }
          catch(e){
                res.status(404).send(e)
          }
      }

 })
