const Notification= require('../../models/notification/notifi')
   const mongoose= require('mongoose')
   const Comp= require('../../models/comps')
  const CompProfile= require('../../models/compaccount/compprofile')
const cauth= require('../../authentication/cauth')
 const  express = require('express')
 const router= new express.Router()


  router.post('/compnotifi/new',cauth,async (req,res)=> {
      console.log('Request')
      try {
          const compProfile = await CompProfile.findOne({owner: req.user._id})
          const notification = new Notification({
                head: req.body.head,
                body: req.body.body,
                redirect: req.body.redirect,
                owner: req.user._id,
                subscribers : req.user.subscribers || compProfile.subscribers
          })
             notification.subscribers.active= true
          await notification.save()
      res.status(200).send( notification)
      }
         catch(e) {
             res.status(500).send({error: e.toString()})
         }
  })

 module.exports= router
