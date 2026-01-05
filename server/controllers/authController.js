const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, password, role, specialization } = req.body;
        // In a real app, hash password here
        const newUser = new User({ username, password, role, specialization });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // In real app, compare hash
        if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        // In real app, return JWT
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
