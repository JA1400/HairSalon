const Inquiry = require('../models/inquiry');
const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require("ejs");

require('dotenv').config();

module.exports.inquiryIndex = async (req, res) => {
    const inquiries = await Inquiry.find();
    res.render('admin/inquiries', { inquiries });
};

module.exports.deleteInquiry = async (req, res) => {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id)
    req.flash('success', 'Inquiry deleted!')
    res.redirect('/admin/inquiries')
}

/* ************************************************ */

module.exports.postInquiry = async (req, res) => {
    console.log('Made it in here!');
    console.log(__dirname, '..', '/views/email');
    const { name, email, subject, message } = req.body.inquiry
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASSKEY,
        },
    });
    const data = await ejs.renderFile(path.join(__dirname, '../', 'views', 'email', 'templateOne.ejs'), { name, message });
    const info = await transporter.sendMail({
        from: `"${process.env.USERNAME}" <${process.env.USER}>`, // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "", // plain text body
        html: data // html body
    })
    const dataTwo = await ejs.renderFile(path.join(__dirname, '../', 'views', 'email', 'templateTwo.ejs'), { name, subject, email, message });
    const infoTwo = await transporter.sendMail({
        from: `"customer" <${process.env.USER}>`, // sender address
        to: `${process.env.USER}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "", // plain text body
        html: dataTwo // html body
    }).catch(console.error);
    console.log("Message sent: %s", info.messageId, infoTwo.messageId);
    const inquiry = new Inquiry({ ...req.body.inquiry });
    await inquiry.save();
    res.redirect('/contact');
}