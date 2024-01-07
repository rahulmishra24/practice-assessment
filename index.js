const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const config = require('./config');
const { verifyToken } = require('./middleware/validateToken');

const app = express();
const port = process.env.PORT || 3000;



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use(verifyToken);
app.use('/api/notes', noteRoutes);

if (require.main === module) {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("DB CONNECTED");
  });
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}


module.exports = app;