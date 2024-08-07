const express = require("express");
const routerApi = require('./routes/index');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth.handler');

const {logErrors, errorHandler, boomErrorHandler, ormErroresHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(options));

require('./utils/auth/index');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/nueva-ruta', checkApiKey,(req, res) => {
    res.send('Hello, this is a new route');
});

routerApi(app);

app.use(logErrors);
app.use(ormErroresHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

