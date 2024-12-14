const express = require("express");
const router = express.Router();

const {addEvent, getEvents, updateEvent, deleteEvent, getEventById, addUserToEvent, getAllName} = require('../../controllers/event.controller');

router.post('/add', addEvent); 
router.get('/listevents', getEvents);
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);
router.get('/getEventById/:id', getEventById);

router.put('/addUserToEvent/:idE/:idU', addUserToEvent);

router.get('/getAllName', getAllName);



module.exports = router;


