const Users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {createToken} =  require("../../utils/jwt")


const register = async (req, res) => {
    try{
        //Recibo los datos
        const newUser = req.body

        //Valido si el usuario ya existe
        const userDB = await Users.find({username: newUser.username})

        //Si existe un envío error de respuesta
        if (userDB.length !== 0){
            return res.json({message: "El usuario ya existe"})
        }
        
        //Si no existe --> encripto la contraseña y lo añado
        newUser.password = await bcrypt.hash(newUser.password, 10)
        const user = await Users.create(newUser)
        return res.json(user)
        
    }catch (error){

    }
};

const login = async (req, res) => {
    try{
        //Recibo los datos
        const {username, password} = req.body

        //Valido si el usuario ya existe findOne
        const userDB = await Users.findOne({username:req.body.username});
        if(!userDB){
            return res.json({message: "Este usuario no existe"})
        }
        //Valido si la contraseña coincide con la de la BD: bcrypt.compare()
        const same = await bcrypt.compare(password, userDB.password)
        if(!same){
            return res.json({message: "La contraseña es incorrecta"})
            console.log(error)
        }
        
        //Si coinciden creo el token
        return res.json({
            message: "Loging exitoso",
            token: createToken(userDB)
        })

        //Si no coinciden envío el mansaje de error
        
    }catch (error){

    }
};

const getProfile = async (req, res) => {
    //Busco en la BD la info que me interesa de ese usuario
    const dataUser = await Users.find({username: req.user.username});
    return res.json(dataUser);
};

module.exports = {register, login, getProfile};