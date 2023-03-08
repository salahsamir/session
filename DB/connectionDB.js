import mongoose from "mongoose"
export const connectiondb=()=>{
    return mongoose.connect(process.env.LOCALURI).then(result=>{
        console.log('connected db');
    }).catch(err=>{
        console.log('fail db');
    })
}