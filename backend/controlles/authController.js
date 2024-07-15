require('dotenv').config();  // Top of your file
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../connect');

// User registration
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [existingUser] = await pool.execute(
            'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
            [email]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'User registration failed', error });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE LOWER(email) = LOWER(?)',
            [email]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Authentication failed', error });
    }
};

exports.list = async(req,res)=>{
        try {
            const [rows] = await pool.execute('SELECT email FROM users');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve tasks', error });
        }
    
}