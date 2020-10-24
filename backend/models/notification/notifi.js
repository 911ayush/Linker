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
    active: {
                type: Boolean,
                  default: true,
           },
     redirect:{
                 type: Number,
                default: 1
       }
},{
     timestamps: true
})



const Notifications= mongoose.model('Notification',notificationSchema)
  module.exports = Notifications