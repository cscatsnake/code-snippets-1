const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    console.log('----- INSIDE sessionController.isLoggedIn -----');
    const { ssid } = req.cookies;
    const session = await Session.findOne({ ssid });
    
    if (session) {
      console.log('User is logged in.');
      next();
    } else {
      next({
        log: 'User is not logged in.',
        status: 401,
        message: { err: 'Unauthorized' },
      });
    }
  } catch (error) {
    next({
      log: 'Error occurred in sessionController.isLoggedIn.',
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

sessionController.startSession = async (req, res, next) => {
  try {
    console.log('----- INSIDE sessionController.startSession -----');
    const session = new Session({ cookieId: res.locals.user });
    await session.save();
    console.log('DATA FROM SESSION:', session);
    next();
  } catch (error) {
    next({
      log: 'Error occurred in sessionController.startSession.',
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = sessionController;