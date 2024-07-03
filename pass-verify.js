const bcrypt = require('bcrypt');


async function verifyPassword() {
    const myPassword = 'password123';
    const hash = '$2b$10$kLYmVP6P6XRYiLS6ZAZM1.ujMYuPlh6GGwg6j9FQ837viroJsj5ku'
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword();