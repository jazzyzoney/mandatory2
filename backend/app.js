import express from "express" 
import session from "express-session" 
import "dotenv/config" 

import authRouter from "./routers/authRouter.js" 
import mailRouter from "./routers/mailRouter.js" 
import { getDb } from "./database/connection.js"


const app = express() 

app.use(express.json()) 

//cors without the library
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})

app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
})) 

app.use(authRouter) 
app.use(mailRouter) 

const PORT = 8080 
getDb().then(() => {
app.listen(PORT, () => console.log("Server running on port", PORT)) 
})