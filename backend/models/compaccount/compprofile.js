require('../../db/connect')
 const mongoose= require('mongoose')
  const Comp= require('../comps')

const comppSchema= new mongoose.Schema({
      title: {
           type: String,
           trim: true,
           required: true,
      },
      address:{
           type: String,
            trim:true
      },
     about:{
           type: String,
          trim:true,

     },
     lookup:[
         {
              type: String,
              trim: true,
         }
     ],
    owner:{
           type: mongoose.Schema.Types.ObjectID,
           required: true,
           ref: 'Comp'
       },
    subscribers:[{
        subscriber: {
            type: mongoose.Schema.Types.ObjectID
        }
    }],
    image:{
           type:  Buffer
    }
},{
     timestamps: true
})





 const CompProfile=  mongoose.model('Compprofile',comppSchema)
 module.exports= CompProfile





