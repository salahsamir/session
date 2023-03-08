import bcrypt from "bcrypt"


export const hash_password=({plantext,salt_round=parseInt(process.env.SALT)}={})=>{
    const hash=bcrypt.hashSync(plantext,salt_round)
    return hash
}
export const compare_password=({plantext1,plantext2}={})=>{
    const match=bcrypt.compareSync(plantext1,plantext2)
    return match
}