const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Helpdesk = require('./api/models/helpdesk_Model');
const routes = require('./api/routes/helpdesk_Routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/helpdesk');
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});
console.log(`Helpdesk RESTful API server started on: ${port}`);