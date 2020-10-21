const mongoose= require('mongoose')
   require('../../db/connect')
 const Dev= require ('../devaccount/devprofile')
   // Basically here owner mean Company who Creates Job
// In deadline we will say to give no of daysafter we will  match it from unix timestamp
// Owner fir fetching the all post of all type companies by search bar
  const jobSchema= new mongoose.Schema({
          post: {
                type: String,
                required: true,
               trim: true
          },
       createdBy: {
               type: String,
               required: true,
             trim: true,
       },
       deadline: {
               type: Number,
            default: Infinity,
            required: true,
            trim: true
       },
       applicants: [{
               dev: {
                     type: mongoose.Schema.Types.ObjectID,
               }
       }],
       audiences: [{
           audience: {
               type: mongoose.Schema.Types.ObjectID,
           }
       }],
       owner: {
               type: mongoose.Schema.Types.ObjectID,
       }
  },{
       timestamps: true
  })




const  Jobs=  mongoose.model('Job',jobSchema)
module.exports= Jobs







