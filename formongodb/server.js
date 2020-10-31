const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');
var app = new express();
const router = express.Router();
const multer = require('multer');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());


var profile = {
    name: "Ayush Yadav",
    location: "finland",
    about: "i am a bad boy",
    skill: ["web Dev","Cricket"],
    interest:["cricket","coding"]
}
var cprofile={
    name: "Ayush Yadav",
    location: "finland",
    about: "i am a bad boy",
    skill: ["web Dev","Cricket"]
}
var cNotification=[{name:"ayush yadav"},{name:"Sudyut salv"},{name:"Boss"},{name:"Divyansh"}];
var pending=[{name:"ayush"},{name:"Sudyut"},{name:"Boss"},{name:"Divyansh"}];
var sent=[{name:"ayush yadav"},{name:"Sudyut"},{name:"Boss chutiya"},{name:"Divyansh"}];
var connection=[{name:"ayush yadav",
                _id:"4567898765467"                
                },
                {name:"vishal kumar",
                _id:"4567764565467"},
                {name:"bhargav duvey",
                _id:"4567675765467"},
                {name:"pragya jha",
                _id:"4567823465467"},
                {name:"priyanshu jha",
                _id:"4567829565467"}]
var network={
    pending:pending,
    sent:sent
}
var cnetwork={
    pending:pending,
    sent:sent
}


const storage = multer.diskStorage({
    destination:(req,file,callBack) => {
        callBack(null,'uploads')
    },
    filename:(req,file,callBack)=>{
        callBack(null,file.originalname)
    }
})
var upload = multer({storage:storage})

app.post('/profile/changedp',upload.single('file'),(req,res,next)=>{
    const file = req.file;
    if(!file){
        const error = new Error('please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
app.get('/connection-list/:id', (req,res) => {
    console.log("connection list sending");
    res.send(connection);
 });
// app.post('/post/:id',uploadpost.single('file'),(req,res,next)=>{
//     const file = req.file;
//     if(!file){
//         const error = new Error('please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })
// mongoose.connect('mongodb://localhost:27017/testdb')
// const db = mongoose.connection

// db.on('error',(err) => {
//     console.log(err)
// })
// db.once('open',() => {
//     console.log('Database Connection Established!', {useNewUrlParser:true,useUnifiedTopology:true});   
//     const bookStoreChangeStream = mongoose.connection.collection("bookstore").watch();
//     bookStoreChangeStream.on('changes',() => {
//     console.log("changes shown");
//     });
// });

// var BookSchema = mongoose.Schema({
//     name: String,
//     price: Number,
//     quantity: Number
// });
// var Book = mongoose.model('Book', BookSchema, 'bookstore');

  
// app.get('/issit',function(req,res){
//     console.log("working");
    
   
//       // compile schema to model
     
   
//       // a document instance
//     var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
   
//       // save model to database
//     book1.save(function (err, book) {
//         if (err) return console.error(err);
//         console.log(book.name + " saved to bookstore collection.");
//     });
   
      
//     res.send("hii");
// });

// app.get('/profile',(req,res)=>{
//     console.log("reciving from profile");
//     res.send("do you get the response");
// })

router.route('/profile/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(profile);
});
// router.route('/profile/:id').get((req,res) => {
//     console.log(req.params.id);
//     res.send(profile);
// });
router.route('/company/profile/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(cprofile);
});
router.route('/company/notification/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(cNotification);
});
router.route('/network/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(network);
});
router.route('/company/network/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(cnetwork);
});
router.route('/notification/:id').get((req,res) => {
    console.log(req.params.id);
    res.send(cNotification);
});
//var mess=[];
io.on('connection',function(socket){
    console.log("a user connected");
    // socket.emit("start","here is some data ");
    // socket.on("message",(data) =>{
    //     console.log(data);
    //     mess.push(data);
    //     socket.emit("ayushrudra",data);
    // })
});
app.use('/',router);

// var ss = ['user','me'].sort().join('');
// console.log(ss);

server.listen(4000,()=>{
    console.log("listening at 4000");
});

// server.listen(3000,()=>{
//     console.log("listening at 3000");
// })