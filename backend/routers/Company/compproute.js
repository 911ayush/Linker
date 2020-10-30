  const CompProfile= require('../../models/compaccount/compprofile')
    const express= require('express')
   const router= new express.Router()
  const request= require('request')
   const cauth= require('../../authentication/cauth')
  const dauth= require('../../authentication/dauth')
  const cdauth= require('../../authentication/cdauth')
  const multer= require('multer')
  const sharp= require('sharp')

  const upload= multer({
      limits:{
          fileSize: 2000000
      },
      fileFilter(req,file,cb){
          if(! file.originalname.match(/\.(jpeg|jpg|png)$/)) {
              return cb(new Error('Please Upload image in format of jpeg or jpg or png'))
          }
          cb(undefined,true)
      }
  })


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


  router.post('/compprofile/create/image',cauth,upload.single('image'),async (req,res)=>{
      const   buffer= await sharp(req.file.buffer).resize({height: 300, width: 300}).png().toBuffer()
      const compprofile= await CompProfile.findOne({owner: req.user._id})
      compprofile.avatar=buffer
      await compprofile.save()
      res.status(202).send('Image Uploaded successfully')
  },(error,req,res,next)=>{
      res.status(400).send({error: error.message})
  })

  // Any one which is authenticate can see image
  router.get('/comppprofile/:id/image',cdauth,async(req,res)=>{
      try {
          const compId = req.params.id
          const compprofile = await CompProfile.findOne({ owner: compId })
          if(! compprofile || ! compprofile.image) {
              return res.status(400).send('Hey there are no content for you')
          }
          res.status(200).send(compprofile.image)
      }
      catch(e){
          res.status(500).send({ error :  e.toString()})
      }
  })
  router.get('/compprofile/myimage',cauth,async(req,res)=>{
      try{
          const compprofile = await CompProfile.findOne({owner: req.user._id})
          if(! compprofile || ! compprofile.image) {
              return res.status(400).send('Hey there are no content for you')
          }

          res.status(200).send(compprofile.image)
      }
      catch(e){
          res.status(500).send({ error : e.toString() })
      }
  })
  router.delete('/compprofile/finish/image',cauth,async(req,res)=>{
      try {
          const compprofile = await CompProfile.findOne({owner: req.user._id})
          if(! compprofile.image) {
              return res.status(404).send('already you have not profile pic')
          }
          compprofile.image= undefined
          await  compprofile.save()
          res.status(200).send()
      }
      catch(e){
          res.status(500).send( { error: e.toString()} )
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