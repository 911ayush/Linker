const mongoose= require('mongoose')
require('../db/connect')
const validator= require('validator')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')


const  compSchema= new mongoose.Schema({
     title: {
           type: String,
           required: true,
           trim: true,
     },
     region:{
           type: String,
           required: true,
           trim: true,
     },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
     cin:{
          type: String,
          trim: true,
          maxlength: 21,
     },
    postcode: {
        type: Number,
        trim: true,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password Should not contain any String like password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})
compSchema.statics.findByCredentials= async(email,pass)=>{
    const comp= await Comps.findOne({email})
    if(! comp) {
        throw new Error('No Match Found Please Sign Up')
    }
    const isMatched= bcrypt.compare(pass,comp.password)
    if(! isMatched) {
        throw new Error(' Password is Defected')
    }
    return comp
}

compSchema.methods.generateToken= async function (){
    const comp= this
    const compToken=await jwt.sign({_id: this._id.toString()},'iamcompany',{expiresIn: '2 Days'})
    comp.tokens.push({token: compToken})
    await comp.save()
    return compToken
}

compSchema.methods.toJSON=  function(){
    const comp=this
    const compObject=  comp.toObject()
    delete compObject.tokens
    delete compObject.password
    return compObject
}







compSchema.pre('save',async function(next){
    const comp= this
    if(comp.isModified) {
        const hashedPass =  await bcrypt.hash(comp.password, 8)
        comp.password= hashedPass
        console.log(hashedPass)
        next()
    }
})

const Comps= mongoose.model('Comp',compSchema)
module.exports= Comps