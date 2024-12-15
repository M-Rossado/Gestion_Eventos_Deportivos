const Events = require('../models/event.model');
const bcrypt = require('bcryptjs');
const {createToken} =  require("../../utils/jwt")

//Para añadir un nuevo Evento (Solo para usuarios autenticados)
const addEvent = async (req, res) => {
    try {
        const data = req.body;
        const newEvent = new Events(data);

        const createdEvent = await newEvent.save();
        return res.json({message: 'Evento creado con éxito', data: createdEvent });
    } catch (error){
        console.error(error);
    }
};

//Para tener una lista de todos los eventos (cualquier usuario)
const getEvents = async (req, res) => {
     try {
         const listEvent = await Events.find();
         res.json({success: true, list: listEvent});

     } catch (error){
         console.error(error);
     }
};

//Para tener los datos de un evento especifico a traves de su id (cualquier usuario)
const getEventById= async (req, res) => {
    try{
        const {id} = req.params;
        const data = await Events.findById(id);
        if (!data) {
            return res.json({ message: 'Id no encontrado' });
        }
        return res.json(data);
     }catch(error){
         console.error(error);
     }
};

//Para modificar un evento (Solo para usuarios autenticados)
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedEvent = await Events.findByIdAndUpdate(id, data, { new: true });
        return res.json({ message: 'Este evento deportivo ha sido actualizado', data: updatedEvent });
    } catch (error) {
        console.error(error);
    }
};

//Borrar un evento (Solo para usuarios autenticados)
const deleteEvent = async (req, res) => {
    try{
        const deleteEvent = await Events.findByIdAndDelete(req.params.id);
        return res.json({message: 'Evento eliminado con éxito', data: deleteEvent });
    }catch(error){
        console.error(error);
    }
};

//Para obtener todos los eventos por orden de fecha (cualquier usuario)
const orderByDate = async (req, res) => {
    try {
        const eventsByDate = await Events.find().sort({ date: 1 }); // Orden ascendente
        return res.status(200).json({ message: 'Estos son los eventos por orden de fecha', data: eventsByDate })
    } catch (error) {
        console.error(error);
    }
};

//Para obtener todos los eventos filtrados por un tipo de deporte (cualquier usuario)
const getBySport = async (req, res) => {
    try {
        const { sportType } = req.query;

        //Si no añades ningún deporte
        if (!sportType) {
            return res.status(400).json({ message: 'Debe añadir un tipo de deporte' });
        }
        const events = await Events.find({ sportType });
        // Si no encuentra ningún evento con el tipo seleccionado
        if (events.length === 0) {
            return res.status(404).json({ message: 'No hay ningún evento registrado para este deporte' });
        }
        return res.json({ message: 'Estos son los eventos para este deporte:', data: events });
    } catch (error) {
        console.error(error);
    }
};




module.exports = {addEvent, getEvents, getEventById, updateEvent, deleteEvent, orderByDate, getBySport};