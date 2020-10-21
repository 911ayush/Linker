 require('../../db/connect')
 const mongoose= require('mongoose')


  const devpSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
      address:{
         type: String,
          trim: true
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

  devpSchema.virtual('jobs',{
         ref:  'Job',
         localField: '_id',
          foreignField: 'audiences.audience'
  })


 const Devprofile = mongoose.model('Devprofile',devpSchema)

  module.exports= Devprofile