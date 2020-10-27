const mongoose= require('mongoose')
   require('../../db/connect')
 const Dev= require ('../devaccount/devprofile')
 const time= require('../../src/utils')
const fetch = require('node-fetch');


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
         description: {
             type: String,
                 trim: true
       },
       recommended: [{
               type: String,
               trim: true
       }],
      selectedRange: {   start:
               { type: Date,
                 req: true
           },
           end: {
             type: Date,
               req: true
      }

       },
       applicants: [{
               dev: {
                     type: mongoose.Schema.Types.ObjectID,
                     ref:'Dev'
               }
          }],
       subscribers: [{
           subscriber: {
               type: mongoose.Schema.Types.ObjectID,
           }
       }],
       owner: {
               type: mongoose.Schema.Types.ObjectID,
               ref: 'Comp'
       }
  },{
       timestamps: true
  })

    jobSchema.methods.checkAndSave = async function(id){
                const job= this
             const isContains= job.applicants.filter((exist)=> exist.dev.toString()==id)
                if(isContains.length !== 0) {

                     throw new Error('You had applied already for this post')
                }
                 job.applicants.push({dev: id})
          await  job.save()
         return job
     }



     jobSchema.methods.checkDeadline= async function() {
         const job = this
         const status= true
         const promise= new Promise((accept,reject)=>{
             time('varanasi',accept)
         })
         //  In future it will be company city
         // We will implement time also for it
         await  promise.then( (data) => {
             if (data.wether.localtime < job.selectedRange.start.toISOString().split('T')[0]) {
                             throw new Error('Registraion is not start yet')
                           }
                 else if (data.wether.localtime > job.selectedRange.end.toISOString().split('T')[0]) {
                            throw new Error('Registration has close now')
                     }
                })

             // await time('varanasi', (data) => {
             //       if (data.wether.localtime < job.selectedRange.start.toISOString().split('T')[0]) {
             //             status.error= 'Registration is not Start yet'
             //
             //
             //       } else if (data.wether.localtime > job.selectedRange.end.toISOString().split('T')[0]) {
             //              status.error= 'Registration has closed'
             //           console.log(status)
             //       }
             //   })
           return status
             }













const  Jobs=  mongoose.model('Job',jobSchema)
module.exports= Jobs







