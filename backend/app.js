import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routers/authRouter.js";
import mailRouter from "./routers/mailRouter.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true            
}));

app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// Routes
app.use(authRouter);
app.use(mailRouter);

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));