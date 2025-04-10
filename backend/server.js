const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));
app.use(express.json());

// Import Routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const medicineRoute = require('./routes/medicineRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const resetPasswordRoute = require('./routes/resetpasswordRoute');
const billingRoute = require('./routes/invoiceRoute');
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Register Routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/medicine', medicineRoute);  // 🔥 includes /api/medicine/all for View Medicine
app.use('/api/dashboard', dashboardRoute);
app.use('/api/reset-password', resetPasswordRoute);
app.use('/api/invoices', billingRoute);

// Default Route
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
