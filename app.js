const http = require('http');
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

mongoose.connect('DB_STRING',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        server.listen(3000)
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed')
    });
app.use(cors());
app.use(express.json());

const userTokenRoutes = require('./backend/routes/user-token');
const contactMeRoutes = require('./backend/routes/contact-me');
const otherRoutes = require('./backend/routes/other');

app.use('/api/user-token', userTokenRoutes);
app.use('/api/contact-me', contactMeRoutes);
app.use('/api/other', otherRoutes);

