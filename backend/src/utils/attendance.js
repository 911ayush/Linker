// const users = []
//
// const addUser = ({ username, room }) => {
//     // Clean the data
//     username = username.trim().toLowerCase()
//     room = room.trim().toLowerCase()
//
//     // Validate the data
//     if (!username || !room) {
//         return {
//             error: 'Username and room are required!'
//         }
//     }
//
//     // Check for existing user
//     const existingUser = users.find((user) => {
//         return user.room === room && user.username === username
//     })
//
//     // Validate username
//     if (existingUser) {
//         return {
//             error: 'Username is in use!'
//         }
//     }
//
//     // Store user
//     const user = { username, room }
//     users.push(user)
//     return { user }
// }
//
// const removeUser = (room) => {
//     const index = users.findIndex((user) => user.room === room)
//
//     if (index !== -1) {
//         return users.splice(index, 1)[0]
//     }
// }
//
// const getUser = (room) => {
//     return users.find((user) => user.room === room)
// }
//
// const getUsersInRoom = (room) => {
//     room = room.trim().toLowerCase()
//     return users.filter((user) => user.room === room)
// }
//
// module.exports = {
//     addUser,
//     removeUser,
//     getUser,
//     getUsersInRoom
// }