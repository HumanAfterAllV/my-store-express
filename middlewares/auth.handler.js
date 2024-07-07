const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apikey) {
        next();
    } else {
        next(boom.unauthorized('Invalid API Key'));
    }
};

function checkAdminRole (req, res, next) {
    const user = req.user;
    if (user.role === 'admin'){
        next();
    }
    else {
        next(boom.unauthorized('Invalid Role'));
    }
};

function checkRoles (...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)){
            next();
        }
        else {
            next(boom.unauthorized('Invalid Role'));
        }
    }
};

module.exports = { checkApiKey, checkAdminRole, checkRoles };