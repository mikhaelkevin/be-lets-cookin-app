require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const bodyParser = require('body-parser');

const cors = require('./config/cors');
const { cloudinaryConfig } = require('./config/cloudinary');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(cors);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xss());

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use('*', cloudinaryConfig);
app.use('/auth', authRoutes);
app.use('/recipe', recipeRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Running on port', port);
});
