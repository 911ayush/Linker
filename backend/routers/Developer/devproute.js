const express= require('express')
const  Devprofile= require('../../models/devaccount/devprofile')
 const dauth= require('../../authentication/dauth')
 const  router= new express.Router()
  const multer= require('multer')
 const sharp= require('sharp')



 // If Exist please redirect to  Static Field server will sent a error
   router.post('/devprofile/create',dauth,async(req,res)=>{
        try {
            const devprofile = await new Devprofile({
                name: req.body.name,
                about: req.body.about,
                 skills: req.body.skills,
                 owner: req.user._id
            })
             await devprofile.save()
            console.log(req.body.name,req.body.about,req.body.skills,req.user._id)
             res.status(202).send()
        }
        catch(e){
              res.status(404).send()
        }
   })
  // This field is specified to set Avatar, may Updated or save
  // Abhi Ham alag alag image and json serve karenge baad main ham merge kar denge so abhi ke liye do request
 // There is some content type problem
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
  router.post('/devprofile/create/avatar',dauth,upload.single('profilepic'),async (req,res)=>{
             const   buffer= await sharp(req.file.buffer).resize({height: 300, width: 300}).png().toBuffer()
               const devprofile= await Devprofile.findOne({owner: req.user._id})
                  devprofile.avatar=buffer
               await devprofile.save()
        res.status(202).send('Image Uploaded successfully')
  },(error,req,res,next)=>{
       res.status(400).send({error: error.message})
  })


 // Any one which is authenticate can see image
 router.get('/devprofile/:id/avatar',dauth,async(req,res)=>{
       try {
           const devId = req.params.id
           const devprofile = await Devprofile.findById(devId)
            if(!devprofile || ! devprofile.avatar) {
                  return res.status(400).send('Hey there are no content for you')
            }
              res.set('Content-Type','image/png')
           res.status(200).send(devprofile.avatar)
       }
       catch(e){
               res.status(400).send(e)
       }
 })
   router.delete('/devprofile/finish/avatar',dauth,async(req,res)=>{
       try {
           const devprofile = await Devprofile.findOne({owner: req.user._id})
          if(! devprofile.avatar) {
               return res.status(404).send('already you have not profile pic')
          }
            devprofile.avatar= undefined
             await  devprofile.save()
            res.status(200).send()
       }
       catch(e){
            res.status(400).send(e)
       }
   })

// Please take These Router to Redirect whether you saved profile or not
   router.get('/devprofile/read',dauth,async(req,res)=>{
          try{
                const devprofile= await Devprofile.findOne({owner: req.user._id})
                     if(!devprofile){
                          // Please take help this message to say that make your profile first by first router
                          return res.status(400).send('Please set your profile first then come')
                     }
                        const devTrench =    devprofile.toObject()
                      delete devTrench.avatar
                    res.status(200).send(devTrench)
          }
           catch(e){
               res.status(400).send(e)
           }
    })

// This Area is for Who can see your profile but can not edit and can not see sensitive and confidental  info

         router.get('/devprofile/:id/read',dauth,async (req,res)=>{
                        const devId=  req.params.id
                   console.log(devId)
        try {
            const devprofile =await  Devprofile.findById(devId)
            console.log(devprofile)
            if (!devprofile) {
                res.send(new Error('User not found'))
            }
            const publicProfile = devprofile.toObject()
            delete publicProfile.owner
            delete publicProfile.avatar
            delete publicProfile.timestamps
            res.status(200).send(publicProfile)
        }
          catch(e){
                             res.status(400).send(e)
          }
         })

// Update User Profile Option

 router.patch('/devproute/update',dauth,async (req,res)=>{
     const updateWant= ['name','about','address','skills']
     const updateReceived=  Object.keys(req.body)
     const isValid=  updateReceived.every((update)=>updateWant.includes(update))
     if(! isValid) {
         return res.status(400).send('Please send request for proper updative fields')
     }
     try{
         const   devprofile= await  Devprofile.findOne({owner: req.user._id})
         updateReceived.forEach((update)=>{
             devprofile[update]=  req.body[update]
         })
         await devprofile.save()
         res.status(200).send(devprofile)
     }
     catch(e){
         res.status(404).send(e)
     }
 })










 module.exports= router