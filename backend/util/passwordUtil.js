import bcrypt from 'bcryptjs'

const password = "hunter123"
const saltRounds = 14

// /register /forgotpassword
// const hashedPassword = await bcrypt.hash(password, saltRounds)

// const savedHashedPassword="$2b$14$iYYtsOKeqJdMOY62r88CTO2BQXxmIUB5jzuNwBFJHj6VWeHXHK9eG"
// const comparePassword="hunter123"

// /login
const isSame = await bcrypt.compare(comparePassword, savedHashedPassword)
console.log(isSame)