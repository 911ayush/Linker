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
const compNotiRouter= require('../routers/Company/compnotirouter')
const devNotiRouter= require('../routers/Developer/devnotirouter')
const devEvaluationRouter= require('../routers/Developer/evaluationroute')
const allFeedRouter= require('../routers/cdforeignfeed')
const app= express()
const cors= require('cors')
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
const path= require('path')
const Jquiz= require('../models/evaluation/jquiz')
const Webquiz = require('../models/evaluation/webquiz')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

    app.post('/jpush',async(req,res)=>{
                 try{
                      const jquiz= new Jquiz(req.body)
                       await  jquiz.save()
                       res.status(200).send('Saved Successful')
                 }
                 catch(e){
                        res.status(404).send({ error: e.toString() })
                 }
    })
app.post('/wpush',async(req,res)=>{
    try{
        const wquiz= new Webquiz(req.body)
        await  wquiz.save()
        res.status(200).send('Saved Successful')
    }
    catch(e){
        res.status(404).send({ error: e.toString() })
    }
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
app.use(compNotiRouter)
app.use(devNotiRouter)
app.use(devEvaluationRouter)
app.use(allFeedRouter)
module.exports= app