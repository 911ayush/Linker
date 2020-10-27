const  Feed= require('../models/feeds/feed')
const cdauth= require('../authentication/cdauth')
const express= require('express')
 const router=  new express.Router()

 router.get('/likepost/:id',cdauth,async (req,res)=>{
            const  postId= req.params.id
       try{
                 const post=  await Feed.findById(postId)
            if(! post){
                  return res.status(404).send('Not Fouund')
            }
             post.like = post.like+1
            await post.save()
            res.status(200).send({likes: post.like})
            }
            catch(e){
                 res.status(500).send({error : e.toString()})
            }
 })






module.exports= router