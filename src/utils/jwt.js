const jwt = require("jsonwebtoken")

const createToken = (info) => {

    const data = {
        user_id: info._id,
        username: info.username
    }
    return jwt.sign(data, process.env.SECRET_KEY_JWT, {expiresIn: "1h"})
    
}

module.exports = {createToken}