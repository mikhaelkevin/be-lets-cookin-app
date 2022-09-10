const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const bodyParser = require('body-parser');

const cors = require('./config/cors');
const errorHandler = require('./app/middlewares/errorHandler');

require('dotenv').config();

const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(cors);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xss());

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Running on port', port);
});
