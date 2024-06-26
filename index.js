const express = require("express");
const routerApi = require('./routes/index');

const {logErrors, errorHandler, boomErrorHandler, ormErroresHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

routerApi(app);

app.use(logErrors);
app.use(ormErroresHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

