const express= require('express')
 const devgRouter=   require('../routers/devgroute')
 const devProfileRouter= require('../routers/Developer/devproute')
 const compgRouter= require('../routers/compgroute')
const comppRouter= require('../routers/Company/compproute')
const compjRouter= require('../routers/Company/compjrouter')
const devjRouter= require('../routers/Developer/devjobsroute')
const fetchDev= require('../routers/fetchdeveloper')
const fetchComp= require('../routers/fetchcompanies')
const feedComp= require('../routers/Company/compfeedrouter')
const feedDev= require('../routers/Developer/devfeedrouter')
const likePost= require('../routers/likepostroute')
const app= express()
   app.use(express.json())

    app.get('/',async(req,res)=>{
             res.send('Hello Server is ready to work')
    })
app.use(devgRouter)
app.use(devProfileRouter)
app.use(compgRouter)
app.use(comppRouter)
app.use(compjRouter)
app.use(devjRouter)
app.use(fetchDev)
app.use(fetchComp)
app.use(feedComp)
app.use(feedDev)
app.use(likePost)
module.exports= app