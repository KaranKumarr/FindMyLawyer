const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// enable cors
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.options(
    '*',
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);


app.use('/api/lawyers', require('./routes/lawyerRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/reviews', require('./routes/reviewsRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
});