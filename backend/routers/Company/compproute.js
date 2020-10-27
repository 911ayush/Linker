  const CompProfile= require('../../models/compaccount/compprofile')
    const express= require('express')
   const router= new express.Router()
  const request= require('request')
   const cauth= require('../../authentication/cauth')
  const dauth= require('../../authentication/dauth')
  const cdauth= require('../../authentication/cdauth')




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
  // test things correctly
  //   router.get('/testee',async (req,res)=>{
  //           request({
  //                url:'http://localhost:3001/compprofile/read',
  //                json
  //           },(error,resp)=>{
  //                    res.send(resp)
  //
  //          })
  // })

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

   router.get('/compprofile/:id/read_only',cdauth,async(req,res)=>{
           const  compId= req.params.id
        try {
            const compprofile = await CompProfile.findOne({owner:compId})
            if (!compprofile) {
                return res.status(404).send('Could not find')
            }
             res.status(200).send(compprofile)
        }
        catch(e){
                res.status(404).send(e)
        }
   })

  router.get('/compprofile/:id/subscribe',dauth,async (req,res)=>{
                  const compId=  req.params.id
               try {
                   const compProfile = await CompProfile.findOne({owner: compId})
                   if (!compProfile) {
                       return res.status(200).send({error: 'No match found'})
                   }

                      const check= compProfile.subscribers.filter((sub)=> sub.subscriber.toString() == req.user._id)
                     if(check.length !==0) {
                           throw new Error('You have Subscribed earlier')
                     }
                       compProfile.subscribers.push({subscriber: req.user._id})
              // Field for furue

                   await compProfile.save()
                       res.status(200).send()
                   }

               catch(e){
                         res.status(404).send({error: e.toString()})
               }
  })


  module.exports= router