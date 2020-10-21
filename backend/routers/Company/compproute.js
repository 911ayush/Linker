  const CompProfile= require('../../models/compaccount/compprofile')
    const express= require('express')
   const router= new express.Router()
   const cauth= require('../../authentication/cauth')

     router.patch('/compprofile/update',cauth,async(req,res)=>{
                const updateWant= ['about','lookup','address']
           const updateReceived=  Object.keys(req.body)
             const isValid=  updateReceived.every((update)=>updateWant.includes(update))
          if(! isValid) {
                    return res.status(400).send('Please send request for proper updative fields')
          }
           try{
                 const  compprofile= await  CompProfile.findOne({owner: req.user._id})
                      updateReceived.forEach((update)=>{
                             compprofile[update]=  req.body[update]
                     })
                   await compprofile.save()
               res.status(200).send(compprofile)
           }
           catch(e){
               res.status(404).send(e)
           }
     })

  router.get('/compprofile/read',cauth,async(req,res)=>{
       try {
           const compprofile = await CompProfile.findOne({owner: req.user._id})
           res.status(200).send(compprofile)
       }catch(e){
            res.status(400).send(e)
       }
  })

  // This is for who they can not see the company profile in restricted manner
  // Aage information jod ke modified karnge

   router.get('/compprofile/:id/read_only',cauth,async (req,res)=>{
           const  compId= req.params.id
       console.log(compId)
        try {
            const compprofile = await CompProfile.findById(compId)
            if (!compprofile) {
                return res.status(404).send('Could not find')
            }
             res.status(200).send(compprofile)
        }
        catch(e){
                res.status(404).send(e)
        }
   })



  module.exports= router