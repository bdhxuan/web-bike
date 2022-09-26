const nodeMailer = require("nodemailer");
const config = require("../config/index");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: config.smpt.smpth,
        port: config.smpt.smptport,
        service: config.smpt.smpts,
        auth : {
            user: config.smpt.smptm,
            pass: config.smpt.smptp,
        },
    });

    const mailOptions = {
        from: config.smpt.smptm,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    transporter.sendMail(mailOptions);
};
module.exports = sendEmail;