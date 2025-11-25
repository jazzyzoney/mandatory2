import { Router } from "express" 
import bcrypt from "bcrypt" 
import db from "../database/connection.js" 

const router = Router() 

//signup
router.post("/api/signup", async (req, res) => {
    const { email, password } = req.body 

    //check if user exists
    const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]) 
    if (userExists) {
        return res.status(400).send({ message: "User already exists" }) 
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12) 

    //save user
    const result = await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]) 

    // Send the welcome email (internal fetch or direct function call)
    // For simplicity, we assume the frontend triggers the email or we do it here.
    res.send({ message: "User created", id: result.lastID }) 
}) 

//login
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body 

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]) 
    
    if (!user) {
        return res.status(400).send({ message: "Invalid credentials" }) 
    }

    const isSame = await bcrypt.compare(password, user.password) 
    if (!isSame) {
        return res.status(400).send({ message: "Invalid credentials" }) 
    }

    req.session.user = { id: user.id, email: user.email } 
    res.send({ message: "Logged in", user: req.session.user }) 
}) 

//logout
router.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ message: "Logged out" }) 
    }) 
}) 

router.get("/api/auth-check", (req, res) => {
    if (req.session.user) {
        res.send({ user: req.session.user }) 
    } else {
        res.status(401).send({ message: "Not logged in" }) 
    }
}) 

export default router 