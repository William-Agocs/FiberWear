const baseURL = "https://www.nautilusdevelopment.ca/api/";

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('short'));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit:'5mb' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static('uploads'));

var mainRoutes = require('./routes/main/main');

// API routes for the referrals application
app.use('/api/main', mainRoutes);

app.listen(8081, () => {
    console.log("Server is up and listening on 8081..");
});

