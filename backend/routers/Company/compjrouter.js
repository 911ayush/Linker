const Job= require('../../models/jobs/job')
  const mongoose= require('mongoose')
 const express= require('express')
 const router= new express.Router()
 const cauth=  require('../../authentication/cauth')
const   CompProfile= require('../../models/compaccount/compprofile')



 router.post('/compjob/publish',cauth,async (req,res)=>{
     console.log(req.body)
       const compProfile= await CompProfile.findOne({ owner: req.user._id})
          const subscribers= compProfile.subscribers
     console.log(compProfile)
               try {
                   const job = await new Job({
                           post: req.body.post,
                           createdBy: req.body.createdBy,
                           description: req.body.description,
                           recommended: req.body.recommendation,
                           selectedRange: req.body.selectedRange,
                           owner:  req.user._id,
                           subscribers
                   })
                   await job.save()
                   res.status(200).send('Job published Successfully')
               }catch(e){
                    res.status(404).send(e)
               }
 })
// Use Params for query string in postman
// apply asec if want to find job filter with early created
// apply desc in query if want to find job status crated latest

     router.get('/compjob/status/all',cauth,async (req,res)=> {
         const sort = {}
         if (req.query.sortBy) {
             const element = req.query.sortBy.split('_')
             const final = element[0] + '.' + element[1]
             sort[final] = element[2] === 'desc' ? -1 : 1
         }
         try {
             await req.user.populate({
                 path: 'jobs',
                 options: {
                     sort
                 }
             }).execPopulate()
             const allJob = req.user.jobs
                 res.status(200).send(allJob)
         }
         catch(e){
                 res.status(404).send({error: e.toString()})
         }
      })

  // Company Internal section
// Use Params for query string in postman
// apply asec if want to find job filter with early created
// apply desc in query if want to find job status crated latest
// Isme Third Party error aayega abhi kyonki ye free api se hai baaki code sahi hai to ek second main keval ek query bhejta hai
router.get('/compjob/status/ongoing',cauth,async (req,res)=>{
       const sort={}
         if(req.query.sortBy){
                const element=  req.query.sortBy.split('_')
                const final= element[0]+ '.start'
                sort[final] = element[1]==='desc' ? -1: 1
         }
       try{
            await  req.user.populate({
               path: 'jobs',
                options: {
                   sort
                }
            }).execPopulate()
           const allJob= req.user.jobs
               const  jobOngoing=[]

            for( let job of allJob){
                    await  job.checkDeadline()
                   jobOngoing.push(job)
            }
            res.status(200).send(jobOngoing)
       }
       catch(e){
            console.log(e)
       }
  })
 router.get('/compjob/status/closed',cauth,async(req,res)=>{
     console.log('Received')
     const sort={}
     if(req.query.sortBy) {
    const element=  req.query.sortBy.split('_')
    const final= element[0]+ '.start'
    sort[final] = element[1]==='desc' ? -1: 1
   }
      try{
    await  req.user.populate({
        path: 'jobs',
        options: {
            sort
        }
    }).execPopulate()
          const allJob= req.user.jobs
          const  jobClosed=[]
             for(let job of allJob){
                  try {
                      await job.checkDeadline()
                  }
                  catch(e){
                       if(e.toString()==='Error: Registration has close now'){
                            jobClosed.push(job)
                       }
                  }
             }
             res.status(200).send(jobClosed)
   }
   catch(e){
       res.status(404).send({error: e.toString()})
     }
 })










// const sort={}
// if(req.query.sortBy){
//     const element=  req.query.sortBy.split('_')
//     const final= element[0]+ '.start'
//     sort[final] = element[1]==='desc' ? -1: 1
// }
// try{
//     await  req.user.populate({
//         path: 'jobs',
//         options: {
//             sort
//         }
//     }).execPopulate()
//     const allJob= req.user.jobs




module.exports=  router