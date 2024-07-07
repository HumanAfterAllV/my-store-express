const jwt = require('jsonwebtoken');

const secret = "myCat";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMDMxMDQ1OH0.eQauk-uHeQ5tzOOW_V8Ozvc6Pax8-fLwZ_A-9xi3k5Y';

function verifyToken(payload, secret){
    return jwt.verify(payload, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);