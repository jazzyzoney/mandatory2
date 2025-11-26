import nodemailer from 'nodemailer';

async function createAccount() {
    // This asks Ethereal to create a brand new account for you
    const testAccount = await nodemailer.createTestAccount();
    
    console.log("------------------------------------------------");
    console.log("COPY THESE CREDENTIALS INTO YOUR mailRouter.js:");
    console.log("------------------------------------------------");
    console.log("user: '" + testAccount.user + "',");
    console.log("pass: '" + testAccount.pass + "'");
    console.log("------------------------------------------------");
}

createAccount();