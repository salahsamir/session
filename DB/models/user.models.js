import mongoose,{model, Schema} from 'mongoose'
const user_schema=new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
confirem:{
    type:Boolean,
    default:false
}
})
export const User=mongoose.models.User||model('User',user_schema)