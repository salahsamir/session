import { User } from "../../../../DB/models/user.models.js"
import { compare_password, hash_password } from "../../../utitis/hash&compar.js";
import { errorHandel } from './../../../utitis/error_handeler.js';
export const getuser=errorHandel(
    async(req,res,next)=>{
         const {id}=req.user
        const user=await User.findById(id)
        return res.status(200).json({message:'done',user})
    }
)

export const updete_user=errorHandel(
    async(req,res,next)=>{
        const {name,age}=req.body
        const{id}=req.user
        // console.log({name,age,id});
        const update =await User.findByIdAndUpdate(id,{name,age},{new:true})
        return res.status(200).json({message:"update succesfully",update})
    }
)
export const update_password=errorHandel(
    async(req,res,next)=>
    {
        const{oldpassword,password,cpassword}=req.body
        const{id}=req.user
        const user=await User.findById(id)
        if(!user){
            return next(new Error('in_valid user_data'))
        }
        // console.log(user);
        const compare=compare_password({plantext1:oldpassword,plantext2:user.password})
        if(!compare){
            return next(new Error("old password not match"))
        }
        const hash=hash_password({plantext:password})
        user.password=hash
        user.save()
        return res.status(200).json({message:"password updated successfully",user})
        
    }
)

export const delete_user=errorHandel(
    async(req,res,next)=>{
        const {id}=req.user
        const deleteuser=await User.findByIdAndDelete(id,{new:true})
        return res.status(200).json({message:"delete done",deleteuser})
    }
)
export const logout=errorHandel(
    async(req,res,next)=>{
        const {id}=req.user
        const user=await User.findByIdAndUpdate(id,{confirem:false},{new:true})
        return res.status(200).json({message:"logout successfuly",user})

    }
)
export const getall=errorHandel(
    async(req,res,next)=>{
        const {id}=req.user
        const user=await User.find()
        return res.status(200).json({message:"done successfuly",user})

    }
)