const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        eventname: {type:String, require:true, unique:true},
        description: {type:String},
        date: {type:Date},
        location: {type:String},
        sportType: {type:String, enum:["futbol", "baloncesto", "atletismo","tenis", "natacion", "otros"]},
        users: [{type: Schema.Types.ObjectId, ref: "users"}]
    },
    {
        collection: 'events',
        timestamps: true, //esto creaba dos propiedades: cretedAt, updatedAt
    }
);
//Creo el modelo de datos
const Events = mongoose.model('events', eventSchema);
//lo exporto
module.exports = Events;