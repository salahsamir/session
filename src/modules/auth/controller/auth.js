import { send_email } from "../../../services/sendEmail.js";
import { errorHandel } from "../../../utitis/error_handeler.js";
import { compare_password, hash_password } from "../../../utitis/hash&compar.js";
import { generate_token, verify_token } from "../../../utitis/token.js";
import { User } from './../../../../DB/models/user.models.js';
export const signup=errorHandel(
    async(req,res,next)=>{
        const {name,email,password,age}=req.body
         const check_email=await User.findOne({email})
         if(check_email){
          return next(new Error('email must be unique',{cause:401}))
         }
       const hash= hash_password({plantext:password})
        const newuser=await User.create({name,email,password:hash,age})
        const token=generate_token({plantext:{id:newuser.id,email}})
        const link=`${req.protocol}://${req.headers.host}/auth/confirem/${token}`
        
        const refresh=`${req.protocol}://${req.headers.host}/auth/refresh/${token}`
        const send=await send_email({to:email,subject:" confirem email",html:`<a href=${link}> click here to confirem</a>`})
        if(!send){
            return res.json({message:"rejected this email"})
        }
       
        return res.status(201).json({message:"done  please confirem email"})
 }
)
export const confirem =errorHandel(
    async(req,res,next)=>{
        const{token}=req.params;
        const verify=verify_token({plantext:token});
        console.log(verify);
        const user=await User.findByIdAndUpdate(verify.id,{confirem:true},{new:true})
        if(user){
            return res.status(200).json({message:'done',user})
            // redirect('http://localhost:5000/auth/signin')
        }
        else{
            return next(new Error('Oops not register account '))
        }
    }
)
export const refresh=errorHandel(
    async(req,res,next)=>{
        const {token}=req.params;
        const {id}=verify_token({plantext:token})
        // console.log(id);
        const new_token=generate_token({plantext:{id}})
        return new_token?res.status(201).json({messae:"new token",token}):res.status(500).json({messae:"error refresh token"})

    }
)
export const signin=errorHandel(
    async(req,res,next)=>{
        const{email,password}=req.body
        const user=await User.findOne({email,confirem:true})
        if(!user){
            return next(new Error('in-valid account',{cause:401}))
        }
        const match=compare_password({plantext1:password,plantext2:user.password})
      
        if(!match){
            return next(new Error('in-valid password',{cause:403}))
        }
        const token=generate_token({plantext:{id:user._id}})
        return res.status(200).json({message:"sign in successfuly",token})
    }
)
export const forget_password=errorHandel(
    async(req,res,next)=>{
        const {email}=req.body
        const code=Math.floor(Math.random() * 9000) + 1000;
        // console.log(code);
        const token=generate_token({plantext:{email,code}})
        const forget=`${req.protocol}://${req.headers.host}/auth/new/${token}`
        console.log(forget);
        const send=await send_email({to:email,subject:"click here to get code",html:`<a href=${forget}>${code}</a>`})
        if(send){
            return res.json({message:"please write the code",token})
        }
        else{
            return next(new Error('Oops'))
        }
    }
)
export const newpassword=errorHandel(
    async(req,res,next)=>{
        const{token}=req.params;
        const data=verify_token({plantext:token})
        const{password,code}=req.body
        // console.log(data);
        if(data.code!=code){
            return next(new Error('code not match'))
        }
        const hash=hash_password({plantext:password})
        const user=await User.findOneAndUpdate({email:data.email},{password:hash},{new:true})

        return user? res.json({user}):res.json('invalid-input')

    }
)