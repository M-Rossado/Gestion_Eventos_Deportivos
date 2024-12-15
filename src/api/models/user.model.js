const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {type:String, require:true, unique:true},
        email: { 
            type      : String, 
            unique    : [ true, 'El correo está duplicado'],
            required  : [ true, 'El correo es obligatorio' ], 
            match     : [/.+\@.+\..+/, 'Por favor ingrese un correo válido'] // <- Validación regexp para correo
        },
        password: {type:String, require:true},
        event: [{type: Schema.Types.ObjectId, ref: "events"}]
    },
    {
        collection: 'users',
        timestamps: true, //esto creaba dos propiedades: cretedAt, updatedAt
    }
);
//Creo el modelo de datos
const Users = mongoose.model('users', userSchema);
//lo exporto
module.exports = Users;