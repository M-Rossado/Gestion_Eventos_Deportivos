const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {type:String, require:true},
        password: {type:String, require:true}
        //event: [{type: Schema.Types.ObjectId, ref: "events"}]
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