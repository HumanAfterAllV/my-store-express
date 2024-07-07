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

    async sendRecovery(email){
        const user = await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized('User not found');
        }

        const payload = {sub: user.id};
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15m'});
        /* const link = 'http://localhost:3000/recovery/' + token; */
        await service.update(user.id, {recoveryToken: token});
        const mail = {
            from: config.emailService,
            to: `${user.email}`,
            subject: 'Password recovery',
            html: `<b>Click on the following link to recover your password: ${link} </b>`
        }

        const rta = await this.sendEmail(mail);
        return rta;
    }

    async changePassword(token, newPassword){
        try{
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== token){
                throw boom.unauthorized('User not found');
            }
            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {password: hash, recoveryToken: null});
            return {message: 'Password changed'};
        }
        catch(error){
            throw boom.unauthorized('Invalid token');
        }
    }

    async sendEmail(infoMail){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',//config.emailService,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'example', // generated ethereal user, ENV variable
                pass: 'example' // generated ethereal password, ENV variable
            }
        });

        await transporter.sendMail(infoMail);
        return {message: 'Email sent'};
    }
}

module.exports = AuthService;
