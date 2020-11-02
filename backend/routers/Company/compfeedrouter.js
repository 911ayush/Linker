const Feed= require('../../models/feeds/feed')
 const cauth =  require('../../authentication/cauth')
const cdauth= require('../../authentication/cdauth')
const express= require('express')
  const router= new express.Router()
   const Comp= require('../../models/compaccount/compprofile')
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
// Any one which is authenticate can see image

 router.post('/compfeed/post',cauth,upload.single('pic'),async(req,res)=>{
          try{
            const listeners= await Comp.findOne({ owner: req.user._id })
              const feed = new Feed({
                  description: req.body.description,
                  owner: req.user._id,
                  type: true
           })
               if(listeners){
                         feed.subscribers=listeners.subscribers
               }
               if(req.file){
                   const buffer= await  sharp(req.file.buffer).resize({ height: 500, width: 500 }).png().toBuffer()
                      feed.image= buffer
               }
               await feed.save()
              res.status(200).send('Post Successfully')

       }
       catch(e){
                 res.status(404).send({error: e.toString()})
       }
 },(error,req,res,next)=>{
     res.status(400).send({error: error.message})
 })
  //
  router.get('/compfeed/getPost',cauth,async (req,res)=>{
              try{
                await req.user.populate({
                       path: 'feeds',
                      options: {
                            sort :{
                                   createdAt: 1
                            }
                      }
                  }).execPopulate()
                  const posts= req.user.feeds
                  if( ! posts){
                       return res.status(400).send({ warn: 'You have not posts anything yet'})
                  }
                  res.status(200).send(posts)
              }
              catch(e){
                   res.status(404).send({ error : e.toString() })
              }
  })
  router.delete('/compfeed/:id/remove',cauth,async (req,res)=>{
                   try{
                        const id= req.params.id
                         const  deletePost= await Feed.findOneAndDelete({ _id: id, owner: req.user._id })

                       if(! deletePost){
                             res.status(404).send({ warn: 'No such Post Available'})
                       }
                        res.status(200).send()
                   }
                   catch(e){
                         res.status(500).send({error : e.toString()})
                   }
  })


 module.exports= router
