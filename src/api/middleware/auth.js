const jwt = require("jsonwebtoken");
const Users = require("../models/user.model")

const checkToken = async (req, res, next) => {
    //Validar que el token es correcto
    if(!req.headers["authorization"]){
        return res.json({msg: "debe incluir el token"})
    }

    //Validar el token y el rol
    const token = req.headers["authorization"];
    console.log(token);

    let data;
    try {
        const tokenVe = token.split(' ')[1]
        data = jwt.verify(tokenVe, process.env.SECRET_KEY_JWT);
    } catch (error) {
        return res.json({msg: 'el token es incorrecto'});
    }

    //Buscar en la BD el usuario del token
    const user =  await Users.findById(data.user_id);
    if (!user){
        return res.json({msg: "El usuario no existe"})
    }

    req.user = user;
    next();
    
};

module.exports = {checkToken}