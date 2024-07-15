
const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

// Routes
const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
