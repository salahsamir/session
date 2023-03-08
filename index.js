import  express from 'express'
import dotenv from 'dotenv'
import { init_app } from './src/init_app.js'
dotenv.config()
const app = express()
const port = process.env.PORT
init_app(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
