const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();

});
app.use('/api', require('./src/routes'));


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
