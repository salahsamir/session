
import joi from 'joi'
const global={
    name: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
    
    }),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
            "string.pattern.base":'invalid password'
        }),
        age:joi.number().min(18).max(80).messages({
            'number.min':"age must be greater than 18 years old",
            'number.max':"age must be smaller than 80 years old",

        }),
    cpassword: joi.string().valid(joi.ref('password')).required(),


}
export const signup_schema={
    body:joi.object({
        name:global.name,
        email:global.email,
        password:global.password,
    age:global.age,
   cpassword:global.cpassword
  
    }).required()
}
export const signin_schema={
    body:joi.object({
        email:global.email,
        password:global.password,
    }).required()
}
export const code_schema={
    body:joi.object({
        code:joi.number().min(1000).max(9999).required(),
        password:global.password
    })
}
export const forget_schema={
    body:joi.object({
      
        email:global.email
    })
}
export const update_user_schema={
    body:joi.object({
        name:global.name,
        age:global.age
    })
}
export const update_password_schema={
    body:joi.object({
        oldpassword:global.password,
        password:global.password.invalid(joi.ref('oldpassword')).messages({
            "any.invalid":"must change password",
        }),
        cpassword:global.cpassword.messages({
            "any.only":"cpassword must match password"

        })
    })
}