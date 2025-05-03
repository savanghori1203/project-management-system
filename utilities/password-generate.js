const crypto = require("crypto");
const { SECRET_KEY, IV } = require('../utilities/constant')

//due to length error of key
const key = crypto.createHash("sha256").update(SECRET_KEY).digest();
const iv = Buffer.from(IV, "utf8");

function encryptPassword(password) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decryptPassword(encryptedPassword) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = Object.freeze({
    encryptPassword,
    decryptPassword
})
