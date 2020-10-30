 const  http=  require('http')
 const app= require('./src/app')
 const cors= require('cors')
 const port= process.env.PORT ||  3001
 const server= http.createServer(app)
 const mongodb= require('mongodb')
 require('./db/connect')
 const  socketio= require('socket.io')
  const io= socketio(server)
 const cdauth =  require('./authentication/cdauth')
const Notification=  require('./models/notification/notifi')
 const Dev= require('./models/devs')
 const Comp= require('./models/comps')
 const CompProfile= require('./models/compaccount/compprofile')
 const chatAuth= require('./authentication/chatAuth')
const {
    generateMessage,
    generateLocationMessage
} = require('./src/utils/messages')
 const socketAuth= require('socketio-auth')
  const {  addUser,
      removeUser,
      getUser,
      getUsersInRoom
  }   = require('./src/utils/users')










 /*
  const bodyParser= require('body-parser')
  app.use(bodyParser.json())
  app.use(cors())
 */



     const changeStream =  Notification.watch([{$project: {fullDocument: 1, operationType: 1}}])
        io.on('connection', (socket) => {
             socket.on('join', (options, callback) => {
                 const {error, user} = addUser({id: socket.id, ...options})
                 if (error) {
                     return callback(error)
                 }
                 socket.join(user.room)
                 changeStream.on("change", function (change) {
                        if(change.fullDocument.subscribers &&  change.fullDocument.owner.toString() === user.room ) {
                             for( var subscriber  of  change.fullDocument.subscribers) {
                                 io.to(subscriber.subscriber.toString()).emit('message', generateMessage(change.fullDocument.head, change.fullDocument.body))
                             }
                        }
                 })
                 callback()
             })
         })









  server.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
  })
