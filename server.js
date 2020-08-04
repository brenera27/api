const express = require('express');
var cors = require('cors');



const app = express();
app.use(express.json());
app.use('/api', require('./src/routes'));
app.use(cors());

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});
