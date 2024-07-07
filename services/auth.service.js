const UserService = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const service = new UserService();


class AuthService {
    
    async getUser(email, password){
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw boom.unauthorized('Invalid password');
        }

        delete user.dataValues.password;
        return user;
    }

    async signToken(){
        const payload = {
            sub: user.id,
            role: user.role,
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return token;

    }

    async sendEmail(email){
        const transporter = nodemailer.createTransport({
            service: 'smtp.gmail.com',//config.emailService,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'example', // generated ethereal user, ENV variable
                pass: 'example' // generated ethereal password, ENV variable
            }
        });

        await transporter.sendMail({
            from: config.email, // sender address
            to: `${user.email}`,
            subject: 'Password recovery', // Subject
            text: 'Your password has been recovered', // plain text body
            html: '<b>Your password has been recovered</b>'
        });

        return {message: 'Email sent'};
    }
}

module.exports = AuthService;
