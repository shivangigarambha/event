const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

// 1) add event - path - '/add-event'
router.post('/add-event', eventController.postAddEvent);

// 2) List Event - path - '/events
router.get('/events', eventController.getEvents);

// 3) View Event -path - '/event/<eventId>'
router.get('/event/:eventId', eventController.getViewEvent);

// 4) Edit Event - path - '/edit-event/<eventId>'
router.put('/edit-event/:eventId', eventController.putEditEvent);

module.exports = router;