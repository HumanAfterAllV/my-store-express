const { ValidationError, or } = require("sequelize");

function logErrors (error, req, res, next) {
    if (error) {
        return res.status(500).json({
            message: error.message
        });
    }
    next();
}

function errorHandler (error, req, res, next) {
    if (error) {
        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
    next();
}

function boomErrorHandler (error, req, res, next) {
    if (error.isBoom) {
        const { output } = error;
        res.status(output.statusCode).json(output.payload);
    }
    else{
        next(error);
    }
}

function ormErroresHandler (error, req, res, next) {
    if (error instanceof ValidationError) {
        return res.status(409).json({
            message: 'Validation errors',
            errors: error.errors
        });
    }
    next(error);
}

module.exports = {logErrors, errorHandler, boomErrorHandler, ormErroresHandler};