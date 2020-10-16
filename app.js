// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { PORT } = require('./config');

// SERVER
const app = express();
app.listen(PORT || 3000, () => console.log(`Listening on PORT ${PORT}`));


// MIDDLEWARE
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

// ROUTES MIDDLEWARE
const vdsRouter = require('./routes/vds');
const contentRouter = require('./routes/content');
app.use('/', vdsRouter);
app.use('/', contentRouter);

// RENDER VDS PAGE
const renderVDSPage = require('./services/core/renderVDS');
app.get('/:code', renderVDSPage)

