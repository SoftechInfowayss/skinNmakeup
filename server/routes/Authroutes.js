const express = require('express');
const router = express.Router();
const { signup, login ,getAllUsers, getUserCount } = require('../controllers/authcontroller');
const {contact ,getAllContacts } =require('../controllers/contactcontroller')
router.post('/signup', signup);
router.post('/login', login);
router.get('/getuser', getAllUsers)
router.post('/contact',contact)
router.get('/getcontact',getAllContacts)
router.get('/getcount' , getUserCount)
module.exports = router;