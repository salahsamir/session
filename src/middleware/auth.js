import { User } from "../../DB/models/user.models.js";
import { verify_token } from "../utitis/token.js";
export const auth=async(req,res,next)=>{
    try {
        const {authorization}=req.headers
    // console.log(authorization);
    if(!authorization?.startsWith(process.env.BEARER)){
        return next(new Error('in-valid_bearer key'),{cause:404})
    }
    const token=authorization.split(process.env.BEARER)[1]
    // console.log(token);
    const decoded=verify_token({plantext:token})
    // console.log(decoded);
    if(!decoded || !decoded.id){
        return next(new Error('token is wrong'),{cause:404})
    }
    const user=await User.findById(decoded.id)
    // console.log(user)
    if(!user){
        return next(new Error('user not exist'),{cause:404})

    }
    req.user=user
    return next()
        
    } catch (error) {
        return next(new Error('error in auth'))
        
    }
}