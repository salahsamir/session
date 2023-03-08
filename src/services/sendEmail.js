import nodemailer from 'nodemailer'
export const send_email=async({to='',html='',subject=''})=>{
    let transport=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL_ACCOUNT,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    let send=await transport.sendMail({
        from:process.env.EMAIL_ACCOUNT,
        to,
        html,
        subject,
    })
    if(send.accepted.length){
        return true
    }else{
        return false
    }

}