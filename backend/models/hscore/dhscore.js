require('../../db/connect')
 const mongoose= require('mongoose')


  const dhscoreSchema=  new  mongoose.Schema({
            score:[{
                       marks : {
                      type: Number,
                      required: true
                  },
                  field:{
                            type: String,
                           required: true
                  }
              }],
        owner: {
                type: mongoose.Schema.Types.ObjectID,
                required: true
        }
      })


const  Dhscore =  mongoose.model('Dhscore',dhscoreSchema)


 module.exports= Dhscore