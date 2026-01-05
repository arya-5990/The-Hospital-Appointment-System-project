const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, reason } = req.body;
        const newAppointment = new Appointment({ patientId, doctorId, date, reason });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const { userId, role } = req.query;
        // minimal logic: if role is doctor, find by doctorId, else patientId
        let query = {};
        if (role === 'doctor') {
            query = { doctorId: userId };
        } else if (role === 'patient') {
            query = { patientId: userId };
        } else {
            // admin or fetch all
        }

        const appointments = await Appointment.find(query).populate('patientId').populate('doctorId');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Appointment.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
