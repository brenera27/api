const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();
var cors = require('cors');
app.use(express.json());
app.use((req,res,next) => {
    app.use(cors());
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.use(routes);

var port = 3333;
app.listen(port, function () {
    console.log('Running in port %s', port);
});
