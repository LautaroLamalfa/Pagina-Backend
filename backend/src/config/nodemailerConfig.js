const {createTransport} = require ('nodemailer')

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: `${process.env.NMAILER_USER}`,
        pass: `${process.env.NMAILER_PASSWORD}`
    }
});

module.exports = transporter;

