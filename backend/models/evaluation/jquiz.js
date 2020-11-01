require('../../db/connect')
 const mongoose= require('mongoose')


const jquizSchema = new mongoose.Schema({
           head: {
               type: String,
               required: true,
               trim: true
           },
       body: {
                type: String,
                trim: true
       },
      options: [{
               type: String,
              trim: true
           }],
      answer: { 
                type: Number,
              required:  true,
          trim: true
      }
  },{
     timestamps: true
})


 const Jquiz= mongoose.model('Jquiz',jquizSchema)

  module.exports= Jquiz