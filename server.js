const express = require('express');
const app = express();
const router = require('./routes/router')
const path = require('path');
const https = require('https');
const port = 3000;

app.use(express.static('public'));
app.use('/weather', router)

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
