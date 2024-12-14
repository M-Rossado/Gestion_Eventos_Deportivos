const express = require('express');
const router = express.Router();

const {addUser, getUserByName, deleteUser, register, login, getProfile} = require('../../controllers/user.controller');
const {auth, checkToken} = require('../../middleware/auth')

router.post('/add', addUser); 
router.get('/getUserByName', getUserByName); 
router.delete('/deleteUser/:id', deleteUser); 

router.post('/register', register); 

router.post('/login', login); 
router.get('/profile', checkToken, getProfile);
//router.post('/guardrProyecto', middleGuarFoyo, guardarProyecto);

module.exports = router;




