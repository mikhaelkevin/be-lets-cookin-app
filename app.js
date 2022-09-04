const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const bodyParser = require('body-parser');

const cors = require('./config/cors');
const errorHandler = require('./app/middlewares/errorHandler');

require('dotenv').config();

const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(cors);
app.use(xss);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Running on port', port);
});
