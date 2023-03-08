import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as usercontroller  from "./controller/user.js";
import { validation } from './../../middleware/validate.js';
import { update_password_schema, update_user_schema } from "../../middleware/valadition_schema.js";
export const user_router=Router()
// user_router.get('/',auth,usercontroller.getuser)
user_router.get('/',usercontroller.getall)

user_router.put('/',auth,validation(update_user_schema) ,usercontroller.updete_user)
user_router.patch('/',auth,validation(update_password_schema) ,usercontroller.update_password)
user_router.delete('/',auth,usercontroller.delete_user)
user_router.patch('/logout',auth,usercontroller.logout)



