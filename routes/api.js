'use strict';


const express = require('express');



let router = express.Router();


router.use('/cruds', require('./cruds'))




module.exports = router;  