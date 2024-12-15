const express = require('express');
const router = express.Router();

const {register, login,  getProfile} = require('../../controllers/user.controller');
const {auth, checkToken} = require('../../middleware/auth')

router.post('/register', register); 
router.post('/login', login); 
router.get('/profile', checkToken, getProfile); //Necesita autenticación (token)


module.exports = router;




