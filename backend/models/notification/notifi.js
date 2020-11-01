require('../../db/connect')
 const mongoose= require('mongoose')



 const notificationSchema= new mongoose.Schema({
            head: {
                 type: String,
                  required: true,
                 trim: true
            },
     body:{
                 type: String,
                 trim: true
     },
     redirect:{
                 type: Number,
                default: 1
       },
     subscribers: [{
                 subscriber: {
                     type: mongoose.Schema.Types.ObjectID,
                 },
         active: {
              type: Boolean,
              default: true
         }

                 }],
     owner : {
                 type: mongoose.Schema.Types.ObjectID,
                  required: true
     }

},{
     timestamps: true
})



const Notifications= mongoose.model('Notification',notificationSchema)
  module.exports = Notifications