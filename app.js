// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const { PORT } = require('./config');

// SERVER
const app = express();
app.listen(PORT || 3000, () => console.log(`Listening on PORT ${PORT}`));


// MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

// ROUTES MIDDLEWARE
const vdsRouter = require('./routes/vds');
app.use('/', vdsRouter);




