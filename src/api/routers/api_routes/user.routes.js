const express = require('express');
const router = express.Router();

const {register, getUserByName, deleteUser,  login, getProfile} = require('../../controllers/user.controller');
const {auth, checkToken} = require('../../middleware/auth')

router.post('/register', register); 
router.post('/login', login); 
router.get('/profile', checkToken, getProfile);

router.get('/getUserByName', getUserByName); 
router.delete('/deleteUser/:id', deleteUser); 



module.exports = router;




