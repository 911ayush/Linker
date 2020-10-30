const express= require('express')
const router= new express.Router()
const  Dev= require('../models/devs')
const dauth=  require('../authentication/dauth')

const cdauth= require('../authentication/cdauth')
const Notification= require('../models/notification/notifi')
 router.post('/devg/signup',async(req,res)=>{
      try {
          const dev= await new Dev(req.body)
            await dev.save()
         res.status(201).send()
      }
      catch(e){
          res.status(500).send(e)
      }
 })

  router.post('/devg/login',async(req,res)=>{
      try{
    const dev= await Dev.findByCredentials(req.body.email,req.body.password)

           if(!dev){
                 res.status(406).send('Either password Or Email is not matched')
           }
              const logToken= await dev.generateToken()

          // Socket Connection Area
          // Do not try to  touch hazard zone
          res.status(201).send({dev,logToken})
    }
    catch(e) {
          res.status(400).send({error : e.toString()})
    }
  })



//    router.get('/subscription',cdauth,async (req,res)=>{
//     const UserId= req.user._id
//     const userId= UserId.toString()
//     const changeStream=Notification.watch()
//     io.on('connection',async (socket)=>{
//         //   socket.join(userId)
//         console.log('connection getting')
//         socket.emit('message',generateMessage('Admin','if question is right then there will be a answer necessarly'))
//         // changeStream.on('change',async (data)=>{
//         //           const findTarget = {
//         //               head: data.fullDocument.head,
//         //               body: data.fullDocument.body,
//         //               redirect: data.fullDocument.redirect
//         //           }
//         //           if(data.subscribers) {
//         //               data.fullDocument.subscribers.forEach((subscriber)=>{
//         //                       socket.to(`${subscriber.toString()}`).emit(findTarget)
//         //               })
//         //           }
//         // })
//
//     })
//
//     res.status(200).send({ message: 'Socket add successfully'})
// })





module.exports= router
