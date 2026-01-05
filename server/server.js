const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

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
