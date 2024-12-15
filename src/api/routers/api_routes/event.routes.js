const express = require("express");
const router = express.Router();


const {auth, checkToken} = require('../../middleware/auth')
const {addEvent, getEvents, getEventById, updateEvent, deleteEvent, getBySport, orderByDate} = require('../../controllers/event.controller');


router.post('/add', addEvent);  //con autenticación
router.get('/listevents', getEvents);
router.get('/getEventById/:id', getEventById);
router.put('/update/:id', checkToken, updateEvent);  //con autenticación
router.delete('/delete/:id', checkToken, deleteEvent); //con autenticación
//router.get('/orderByDate', orderByDate);
router.get('/getBySport', getBySport);


module.exports = router;


