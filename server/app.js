require('./db'); // DB connection file

// Dependencies
const createError = require('http-errors');
const express = require('express'); // The web framework
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Enables Cross-Origin Resource Sharing

// Import Routes
const indexRouter = require('./routes/index');
const playersRouter = require('./routes/players');
const areasRouter = require('./routes/areas');
const tournyRouter = require('./routes/tourny');

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enables cross-origin requests (important for React frontend)

// API Routes
app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/areas', areasRouter);
app.use('/tournaments', tournyRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
