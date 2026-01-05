const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

// Debug Access
console.log('Attempting to connect to DB...');
if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error Details:', err);
    });

app.use(cors());
app.use(express.json());

// Routes Placeholder
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.get('/', (req, res) => {
    res.send('Hospital Appointment System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
