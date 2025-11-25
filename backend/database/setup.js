import db from "./connection.js"
import { hashPassword } from "../util/encryption.js"

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true

if (isDeleteMode) {
    await db.exec(`DROP TABLE IF EXISTS users;`)
}

await db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
);
`);

//seeding
if (isDeleteMode) {
    const hashedPassword = await hashPassword("password")
    await db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, ['test@test.com', hashedPassword])
}

console.log("Database setup complete.")