 const mongoose= require('mongoose')
    require('../db/connect')
   const validator= require('validator')
 const passwordHash = require('password-hash');
 const jwt= require('jsonwebtoken')
      const Job=  require('../models/jobs/job')
 const Feed= require('../models/feeds/feed')
 const Notification= require('../models/notification/notifi')

  const  devSchema= new mongoose.Schema({
         email:{
               type: String,
              required: true,
              trim: true,
             lowercase: true,
              unique: true,
              validate(value){
                     if(! validator.isEmail(value)){
                      throw new Error('Email is invalid')
                     }
                }
         },
      password: {
              type: String,
              required: true,
              trim: true,
             minlength: 7,
               validate(value){
                    if(value.toLowerCase().includes('password')) {
                          throw new Error('Password Should not contain any String like password')
                    }
               }
         },
         tokens: [{
              token: {
                   type: String,
                   required: true,
              }
         }]
   })
   devSchema.statics.findByCredentials= async(email,pass)=>{
           const dev= await Dev.findOne({email})
          if(! dev) {
               throw new Error('No Match Found Please Sign Up')
          }
       //    console.log('Match from here')
       //    console.log(passwordHash.generate(pass) === 'sha1$fe41fb4b$1$806e0cbc5880dc1cd6ce56a25326144ba7c05032')
       //  console.log(pass)
       // console.log(passwordHash.generate(pass))
       //
       //   const isMatched = passwordHash.verify(pass, dev.password)
       //  if(! isMatched) {
       //          throw new Error(' Password is Defected')
       //  }
          return dev
}

   devSchema.methods.generateToken= async function (){
       const dev= this
        const devToken=await jwt.sign({_id: this._id.toString()},'iamdeveloper',{expiresIn: '2 Days'})
           dev.tokens.push({token: devToken})
         await dev.save()
       return devToken
 }

   devSchema.methods.toJSON=  function(){
            const dev=this
          const devObject=  dev.toObject()
        delete devObject.tokens
        delete devObject.password
        return devObject
   }
   devSchema.pre('save',async function(next){
        const dev= this
       if(dev.isModified) {
           const hashedPass =  passwordHash.generate(dev.password);
             dev.password= hashedPass
           console.log(hashedPass)
            next()
       }
  })
   devSchema.virtual('djobs',{
                  ref: 'Job',
                  localField: '_id',
                  foreignField: 'subscribers.subscriber'
   })

 devSchema.virtual('dappliedJobs',{
          ref:'Job',
         localField: '_id',
         foreignField: 'applicants.dev'
 })

  devSchema.virtual('devforeignpost',{
        ref: 'Feed',
       localField: '_id',
       foreignField: 'subscribers.subscriber'
  })
 devSchema.virtual('devpost',{
        ref: 'Feed',
        localField: '_id',
        foreignField: 'owner'
 })
  devSchema.virtual('mynotifi',{
        ref: 'Notification',
        localField: '_id',
         foreignField: 'subscribers.subscriber'
  })

 const Dev= mongoose.model('Dev',devSchema)
    module.exports = Dev