const Feed= require('../../models/feeds/feed')
 const  dauth= require('../../authentication/dauth')
const DevProfile= require('../../models/devaccount/devprofile')
const Dev= require('../../models/devs')
const multer= require('multer')
 const sharp= require('sharp')
 const express= require('express')
 const router =  new express.Router()

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



// Foreign Field
       router.get('/devfeed/foreign',dauth,async (req,res)=>{
              try{
                   await  req.user.populate({
                       path:'devforeignpost',
                       options:{
                             sort:{
                                  createdAt: 1
                             }
                       }
                   }).execPopulate()
                     const  posts= req.user.devforeignpost

                  if( ! posts){
                         return  res.status(404).send({ warn: 'Please follow some companies and stars to get notification' })
                  }
                  // Temporary
                  const newPosts= posts.forEach((post)=>{
                      const objectPost=post.toObject()
                      delete objectPost.image
                      return objectPost
                  })
                     res.status(200).send(newPosts)
              }
              catch(e){
                   res.status(404).send({ error : e.toString()})
              }
       })
    router.post('/devfeed/post',dauth,upload.single('pic'),async(req,res)=>{
    try{
        const listeners= await    DevProfile.findOne({ owner: req.user._id })
            await  listeners.save()
        const feed = new Feed({
            description: req.body.description,
            owner: req.user._id
        })
         if(listeners.subscribers){
                   feed.subscribers= listeners.subscribers
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
// My Post
router.get('/devfeed/getPost',dauth,async (req,res)=>{
    try{
        await req.user.populate({
            path: 'devpost',
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
        // Temperory
        const newPosts=[]
        posts.forEach((post)=>{
            const objectPost=post.toObject()
            delete objectPost.image
            newPosts.push(objectPost)
        })
        console.log(newPosts)
        res.status(200).send(newPosts)
    }
    catch(e){
        res.status(404).send({ error : e.toString() })
    }
})
router.delete('/devfeed/:id/remove',dauth,async (req,res)=>{
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