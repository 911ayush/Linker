 const  http=  require('http')
 const app= require('./src/app')
 const port= process.env.PORT ||  3001


 const server= http.createServer(app)


  server.listen(port,()=>{
        console.log('Server is listening on port 3001')
  })
