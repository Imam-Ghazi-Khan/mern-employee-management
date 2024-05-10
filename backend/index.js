const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); 
const helloRoute = require('./routes/helloRoute');

const connectDB = require('./utils/db');


const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);

app.use('/api', employeeRoutes);

app.use('/',helloRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
