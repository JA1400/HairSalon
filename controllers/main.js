const StoredTestimonial = require('../models/storedTestimonial');
const Service = require('../models/service');
const Contact = require('../models/contact');
const Image = require('../models/image');


module.exports.redirectHome = (req, res) => {
    res.redirect('/home');
}

module.exports.viewHome = async (req, res) => {
    const contact = await Contact.find();
    const testimonials = await StoredTestimonial.find();
    res.render('main/home', { testimonials, contact })
}

module.exports.viewServices = async (req, res) => {
    const contact = await Contact.find();
    const services = await Service.find();
    res.render('main/services', { services, contact })
}

module.exports.viewAbout = async (req, res) => {
    const contact = await Contact.find();
    res.render('main/about', { contact })
}

module.exports.viewGallery = async (req, res) => {
    const contact = await Contact.find();
    const images = await Image.find();
    const size = '?tr=w-900,h-900';
    res.render('main/gallery', { images, size, contact })
}

module.exports.viewTestimonial = async (req, res) => {
    const contact = await Contact.find();
    const testimonials = await StoredTestimonial.find();
    res.render('main/testimonials', { testimonials, contact })
}

module.exports.viewContact = async (req, res) => {
    const contact = await Contact.find();
    res.render('main/contact', { contact })
}