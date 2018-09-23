"use strict";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('ELANIC:app');
const routes = require('./routes');
const monitorUrlCronJob = require('./cron-jobs/monitorUrl');

const app = express();

// app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//CORS Enabling
app.use(cors());
app.options('*', cors());


process.on("unhandledRejection", function(reason, promise){
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
  console.log("unhandledRejection", reason, promise);
});

// cron job to monitor urls
monitorUrlCronJob.monitorUrlsCron();

app.get('/', function(req, res){
  res.status(200).json({
    success: true,
    message: 'Elanic Monitoring URLs API - Health Check'
  });
});


app.use('/api/v1', routes);


app.use(function(err, req, res, next){
  debug('-------ERROR------');
  debug(err);
  debug(err.statusCode, typeof err.statusCode);
  debug(err.message);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode === 500 ? 'Something went wrong' : err.message,
  });
});

//Module
module.exports = app;