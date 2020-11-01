require('../../db/connect')
const mongoose= require('mongoose')


const webquizSchema= new mongoose.Schema({
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
    }
    ],
    answer:{
         type: Number,
        required: true
    }
},{
    timestmps: true
})

const Webquiz= mongoose.model('Webquiz',webquizSchema)

module.exports= Webquiz