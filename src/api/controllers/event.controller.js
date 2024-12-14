const Events = require('../models/event.model');
const bcrypt = require('bcryptjs');
const {createToken} =  require("../../utils/jwt")

//Para añadir un nuevo Evento (Solo para usuarioa autenticados)
const addEvent = async (req, res) => {
    try {
        const data = req.body;
        const newEvent = new Events(data);

        const createdEvent = await newEvent.save();
        return res.json({message: 'Evento creado', data: createdEvent });
    } catch (error){
        console.log(error);
    }
}; 

//Para tener una lista de todos los eventos (cualquier usuario)
const getEvents = async (req, res) => {
     try {
         const listEvent = await Events.find();
         res.json({success: true, list: listEvent});

     } catch (error){
         console.log(error);
     }
};


//TODO
//Para tener los datos de un evento especifico a traves de su id (cualquier usuario)
const getEventById= async (req, res) => {
    try{
        const {id} = req.params; 
        const data = await Events.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Id no encontrado' });
        }
        return res.json(data);
     }catch(error){
         console.log(error);
     }
};

//Para modificar un evento (Solo para usuarios autenticados)
const updateEvent = async (req, res) => {
    const id = req.params.id;
    const event = req.body;
    try{
        const newEvent = await Events.findByIdAndUpdate(id, curso,{new:true})
        return res.json(newEvent);
    }catch(error){
        console.log(error);
    }
};

const deleteEvent = async (req, res) => {
    try{
        const deleteEvent = await Events.findByIdAndDelete(req.params.id);
        return res.json(deleteEvent);
    }catch(error){
        console.log(error);
    }
};


const addUserToEvent= async (req, res) => {
    const idEvent = req.params.idE;
    const idUser = req.params.idU;
    const findEvent = await Events.findById(idEvent)
    if (!findEvent){
        return res.json({msg:"No existe este evento"})  
    }
    if (findEvent.users.includes(idUser)){
        return res.json({msg: "El usuario ya existe"})
    }
    findEvent.users.push(idUser)

    const newUser = await findEvent.save();

    return res.json({msg: "Modificado con éxito", data: newUser})
};


//TODO: no funciona el endpoint getAllName
const getAllName= async (req, res) => {
    try {
        const nameEvent = req.body.eventname;
        const data = await Events.find()({
            eventname: { $regex: nameEvent, $options: "i" }
        })
        return res.json(data)
    } catch (error) {
        console.log(error) 
    }
};
 
module.exports = {addEvent, getEvents, updateEvent, deleteEvent, getEventById, addUserToEvent, getAllName}; 