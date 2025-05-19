const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Connected to MongoDB');
        console.log(`Server running on port ${process.env.PORT}`);
    });
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
    process.exit(1);
    }
);
 