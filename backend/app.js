const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://mesto-frontend-mp.nomoredomains.sbs',
    'http://mesto-backtend-mp.nomoredomains.sbs',
    'https://mesto-frontend-mp.nomoredomains.sbs',
    'https://mesto-backtend-mp.nomoredomains.sbs',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
});

app.use(requestLogger); // connect request logger
app.use(routes); // all routes logic
app.use(errorLogger); // connect error logger
app.use(errors()); // celebrate errors Handler
app.use(error); // centralized error handler

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
