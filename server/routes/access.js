const express = require('express');
const accessController = require('../controllers/accessController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.post('/login',accessController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req,res) => {
  return res.redirect('/snippets');
});
	


router.post('/signup', 
  (req, res, next) => {
    console.log('Received signup request');
    console.log('Request body:', req.body);
    next();
  },
  accessController.createUser, 
  (req,res) => {
    const {first, last} = req.body;
    return res.status(201).json({first,last});
  });


module.exports = router;