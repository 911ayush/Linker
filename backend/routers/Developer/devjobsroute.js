const  Job= require('../../models/jobs/job')
    const express= require('express')
 const dauth= require('../../authentication/dauth')
  const   Dev= require('../../models/devs')
const router= new  express.Router()
 // Subscribed Jobs
   // Please apply filter
// end_asec for those which are ending soon
// asec for normal order who have published as order
//
   router.get('/devjobs',dauth,async(req,res)=>{
       const  sort= {}
       if (req.query.sortBy) {
           const element = req.query.sortBy.split('_')
           const final = element[0] + '.' + element[1]
           sort[final] = element[2] === 'desc' ? -1 : 1
       }
       try{
           await  req.user.populate({
                path: 'djobs',
                 options: {
                        sort
                }
           }).execPopulate()
            const jobs= req.user.djobs
           if(! jobs.length ){
                 return  res.status(404).send(' Nothing to show Please subscribe some companies')
            }
             res.status(200).send(jobs)
       }
       catch(e){
              res.status(400).send(e)
       }
   })

   router.get('/devjobs/applied',dauth,async(req,res)=>{
           try{
                  await    req.user.populate('daplliedJobs').execPopulate()
                 const allJob= req.user.dappliedJobs
                       res.status(200).send(allJob)
           }
           catch(e){
                 res.status(404).send()
           }
   })

// here id is Job Id
 router.get('/devjobs/:id/apply',dauth,async(req,res)=>{
               const jobId=   req.params.id
      try {
          const job = await Job.findById(jobId)
          if (!job) {
              return res.status(400).send('There is no job here releating with this id')
          }
          // Please Disable apply button after it
          // Lot work on it
       const status =await  job.checkDeadline()
            await job.checkAndSave(req.user._id)
          res.status(200).send('You have applied Successfully')
      }
          catch(e){
                res.status(404).send({ error: e.toString()})
          }
 })

 module.exports= router
