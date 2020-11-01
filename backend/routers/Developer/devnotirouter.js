const  Notifi=  require('../../models/notification/notifi')
 const   express= require('express')
const dauth = require('../../authentication/dauth')
  const router=  new express.Router()

      // to fetch all route

     router.get('/devnotification',dauth,async (req,res)=>{
                    try{
                   await  req.user.populate({
                     path: 'mynotifi',
                      options: {
                       sort : {
                            createdAt : 1
                       }
                      }
                   }).execPopulate()
                const allNotifications=  req.user.mynotifi
                      res.status(200).send(allNotifications)
                    }
                    catch (e) {
                           res.status(500).send({ error : e.toString() })
                    }
     })
// To deactivate Notification



     router.get('/ping/deactivate',dauth,async (req,res)=>{
          try {
           const  notifications =  await  Notifi.find({ 'subscribers.subscribe' :  req.user._id })

                  if(! notifications){
                       return res.status(404).send({ warn: ' No notification for you'})
                  }

                      notifications.subscribers.active= false
                 await  notifications.save()

              res.status(200).send()
          }
           catch(e){
               res.status(500).send({ error : e.toString()})
           }
     })



module.exports= router