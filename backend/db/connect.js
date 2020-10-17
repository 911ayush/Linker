const mongoose= require('mongoose')
   mongoose.connect('mongodb://127.0.0.1:27017/Linked',{
         useNewUrlParser: true,
         useCreateIndex: true,
        useFindAndModify: true
   }).then((succ)=>{
         console.log('Connected')
   }).catch((e)=>{
      console.log('e')
})


