import jwt from'jsonwebtoken'

export const generate_token=({plantext})=>{
const token=jwt.sign(plantext,process.env.SEGNATURE)
return token
}
export const verify_token=({plantext})=>{
    const token=jwt.verify(plantext,process.env.SEGNATURE)
    return token
    }