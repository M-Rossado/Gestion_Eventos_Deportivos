const express = require("express");
const router = express.Router();


const {auth, checkToken} = require('../../middleware/auth')
const {addEvent, getEvents, updateEvent, deleteEvent, getEventById, addUserToEvent, getAllName} = require('../../controllers/event.controller');



router.get('/listevents', getEvents);
router.get('/getEventById/:id', getEventById);
router.post('/add', checkToken, addEvent);  //con autenticación
router.put('/update/:id', updateEvent);

router.delete('/delete/:id', deleteEvent);


router.put('/addUserToEvent/:idE/:idU', addUserToEvent);

router.get('/getAllName', getAllName);



module.exports = router;


