require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', require('./routes/jobs'));

app.use((req, res, next) => res.status(404).json({ error: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));