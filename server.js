const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());
app.use((req,res,next) => {
    app.use(cors());
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    
    next();

});
app.use('/api', require('./src/routes'));


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
