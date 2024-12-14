const monsooge = require('mongoose');
const connectDB = async()=>{
    try{
        const db = await monsooge.connect(process.env.DB_URL);
        const {name, host} = db.connection;
        console.log(`Nombre de la BD ${name} y servidor: ${host}`);
    } catch (error){
        console.log(error);
    }
};
module.exports = connectDB;
