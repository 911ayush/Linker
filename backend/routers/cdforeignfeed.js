const Feed = require('../models/feeds/feed')
const cdauth= require('../authentication/cdauth')
const express= require('express')
 const router=  new express.Router()

  router.get('/cdforeignfeeds/:id/get',cdauth,async (req,res)=>{
  const id= req.params.id
        try{
       const  feed= await Feed.find({ owner: id })
               if(! feed) {
                      res.status(404).send({ warn: 'No Post yet  or Id is wrong' })
               }
                 res.status(200).send()
         }
          catch (e) {
                  res.status(500).send({ error: e.toString()})
          }
  })

 module.exports= router