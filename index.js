const express = require("express");
const {faker} = require('@faker-js/faker');

const routerApi = require('./routes/index');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

routerApi(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

