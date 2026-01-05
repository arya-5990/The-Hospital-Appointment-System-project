const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, cancelAppointment } = require('../controllers/appointmentController');

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.put('/:id/cancel', cancelAppointment);

module.exports = router;
