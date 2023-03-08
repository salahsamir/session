import { Router } from "express";
import { code_schema, forget_schema, signin_schema, signup_schema } from "../../middleware/valadition_schema.js";
import { validation } from "../../middleware/validate.js";
import * as authcontroller  from "./controller/auth.js";
export const auth_router=Router()
auth_router.post('/signup',validation(signup_schema),authcontroller.signup)

auth_router.get('/confirem/:token',authcontroller.confirem)
auth_router.get('/refresh/:token',authcontroller.refresh)
auth_router.post('/new/:token',validation(code_schema),authcontroller.newpassword)

auth_router.post('/forget',validation(forget_schema),authcontroller.forget_password)
auth_router.post('/signin',validation(signin_schema),authcontroller.signin)
