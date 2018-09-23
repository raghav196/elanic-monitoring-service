'use strict';

const router = require('express-promise-router')();

require('./url')(router);
require('./test')(router);

module.exports = router;