import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let connection = null

export async function getDb() {
    if (connection) return connection

    connection = await open({
        filename: './auth.db',
        driver: sqlite3.Database
    });

    // setup logic, kept them combined in same file
    await connection.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            login_count INTEGER DEFAULT 0
        )
    `)

    return connection
}