 const  http=  require('http')
 const app= require('./src/app')
 const cors= require('cors')
 const port= process.env.PORT ||  3001
 const server= http.createServer(app)

 /*
  const bodyParser= require('body-parser')
  app.use(bodyParser.json())
  app.use(cors())
 */


  server.listen(port,()=>{
        console.log(`Server is listening on port port ${port}`)
  })
