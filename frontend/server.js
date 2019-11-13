const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const app = express();

app.use('/', expressStaticGzip('build'));

app.listen(9000, () => console.log('Build Test Server Started, on 9000'));
