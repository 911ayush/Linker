const Dev= require('../models/devs')

const authenticate=function (socket, data, callback) {
    try {
        const objectID = data.objectID
        developer = Dev.findById(objectID)
        if (!developer) {
                 return callback(new Error("User not found"))
        }
         return callback(null,true)
    }
    catch(e){
            callback(new Error("User not found"))
    }
//     db.findUser('User', {username:username}, function(err, user) {
//         if (err || !user) return callback(new Error("User not found"));
//         return callback(null, user.password == password);
//     });
     }


//      const  postAuthenticate =    function(socket, data) {
//     var username = data.username;
//
//     db.findUser('User', {username:username}, function(err, user) {
//         socket.client.user = user;
//     });
// }
//
//   const  disconnect =  function (socket) {
//     console.log(socket.id + ' disconnected');
//     }
module.exports= authenticate