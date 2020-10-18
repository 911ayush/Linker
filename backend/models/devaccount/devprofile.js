 require('../../db/connect')
 const mongoose= require('mongoose')


  const devpSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    about:{
       type: String,
      trim: true,
      default: 'Every man is special and i contains that'
    },
    skills:[
         {
            type: String,
           trim: true,
         }
    ],
    owner:{
       type: mongoose.Schema.Types.ObjectID,
       ref: 'Dev',
       required: true,
        unique: true
    },
      avatar: {
          type: Buffer
      }
    },{
    timestamps: true
  })


 const Devprofile = mongoose.model('Devprofile',devpSchema)

  module.exports= Devprofile