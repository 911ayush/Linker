const Jquiz= require('../../models/evaluation/jquiz')
const Webquiz= require('../../models/evaluation/webquiz')
 const dauth= require('../../authentication/dauth')
const  Hscore = require('../../models/hscore/dhscore')
  const express=  require('express')
 const router=   new express.Router()

     router.post('/evaluation/getquizzes',dauth,async (req,res)=>{
                try{
                      const subjects =  req.body.subjects
                    console.log(subjects)
                    if( ! subjects ) {
                        return   res.status(400).send({ warn : 'You may get less priority in jobs so please take this way'})
                    }
                         const  questions = {}
                              for( let subject of subjects) {
                                   switch (subject.toLowerCase()) {

                                       case 'java': {
                                                   questions.java =  []
                                             const  Questions = await Jquiz.find({})
                                             var i=0
                                           // Maxm 5 questions for each skills
                                                    while ( i<5 && i<Questions.length) {
                                                         const randomQuestion= Questions[Math.floor(Math.random()*Questions.length)].toObject()
                                                        if( questions.java.every((question)=>question._id.toString() !== randomQuestion._id.toString())) {
                                                            delete randomQuestion.answer
                                                            questions.java.push(randomQuestion)
                                                              i++
                                                        }
                                                    }
                                                    break
                                       }
                                       case  'web development' : {

                                           questions.webd =  []
                                           const  Questions = await Webquiz.find({})
                                           var i=0
                                           while ( i<5 && i<Questions.length) {
                                               const randomQuestion= Questions[Math.floor(Math.random()*Questions.length)].toObject()
                                               if( questions.webd.every((question)=>question._id.toString() !== randomQuestion._id.toString())) {
                                                   delete randomQuestion.answer
                                                   questions.webd.push(randomQuestion)
                                                   i++
                                               }
                                           }
                                       }
                                   }
                              }
                            res.status(200).send(questions)
                }
                catch(e){
                      res.status(500).send({ error : e.toString() })
                }
     })



     router.post('/evaluation/sendresponse',dauth,async (req,res)=>{
                        const fields= Object.keys(req.body)
         console.log(fields)
         const response=req.body
         var  score= []
                try{
                           for( let  field of fields) {
                                   switch (field.toLowerCase()) {
                                       case  'java': {
                                           var i = 0
                                           var count = 0
                                           while (i < 6 && i < response[field].length) {
                                               console.log(response[field][i].qId)
                                               const question = await Jquiz.findById(response[field][i].qId)
                                               console.log(question.answer === response[field][i].aId)
                                               if (question.answer == response[field][i].aId) {
                                                 console.log( question.answer == response[field][i].aId )
                                                   count++
                                               }
                                               i++
                                           }
                                            console.log(count)
                                           score.push({
                                               field: field,
                                               marks: count
                                           })
                                            break
                                       }
                                       case  'web development': {
                                           var i = 0
                                           var count = 0
                                           while (i < 6 && i < response[field].length) {
                                               const question = await Webquiz.findById(response[field][i].qId)
                                               if (question.answer === response[field][i].aId) {
                                                   count++
                                               }
                                               i++
                                           }
                                           score.push({
                                               field: field,
                                               marks: count
                                           })
                                       }
                                   }
                               }
                             const hscore = new  Hscore({
                                  score,
                                  owner: req.user._id
                             })
                    console.log(hscore)
                      await hscore.save()
                            res.status(200).send(hscore)
                     }
                     catch(e){
                              res.status(500).send({ error: e.toString() })
                     }
     })










 module.exports=  router