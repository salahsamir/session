import { connectiondb } from "../DB/connectionDB.js"
import { auth_router } from "./modules/auth/auth-router.js"
import { user_router } from "./modules/user/user_router.js"
import { global_error } from "./utitis/error_handeler.js"



export const init_app=(app,express)=>{
    app.use(express.json())
    app.use('/user',user_router)
    app.use('/auth',auth_router)

    app.get('/', (req, res) => res.send('Hello World!'))
    app.all('*',(req, res) => res.send('Ooops no page found'))
    app.use(global_error)
    /*******to connect db */
    connectiondb()
}