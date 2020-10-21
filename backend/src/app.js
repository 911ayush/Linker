const express= require('express')
 const devgRouter=   require('../routers/devgroute')
 const devProfileRouter= require('../routers/Developer/devproute')
 const compgRouter= require('../routers/compgroute')
const comppRouter= require('../routers/Company/compproute')
const app= express()
   app.use(express.json())

    app.get('/',async(req,res)=>{
             res.send('Hello Server is ready to work')
    })
app.use(devgRouter)
app.use(devProfileRouter)
app.use(compgRouter)
app.use(comppRouter)
   module.exports= app