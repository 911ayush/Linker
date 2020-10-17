const express= require('express')
 const devgRouter=   require('../routers/devgroute')
const app= express()
   app.use(express.json())

    app.get('/',async(req,res)=>{
             res.send('Hello Server is ready to work')
    })
app.use(devgRouter)
   module.exports= app