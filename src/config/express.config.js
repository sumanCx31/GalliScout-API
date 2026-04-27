const express = require('express');
const router = require('./router.config');

const app = express();
app.use(express.json());
app.use("/api/v1/",router);



module.exports =app;