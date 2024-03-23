const Service = require('../models/service');
const Contact = require('../models/contact');

module.exports.servicesIndex = async (req, res) => {
    const contacts = await Contact.find();
    const services = await Service.find();
    res.render('admin/services', { services, contacts });
}

module.exports.newService = async (req, res) => {
    const service = new Service(req.body.service)
    await service.save();
    req.flash('success', 'New service added!')
    res.redirect('/admin/services')
}

module.exports.updateService = async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndUpdate(id, { ...req.body.service })
    req.flash('success', 'Service updated!')
    res.redirect('/admin/services')
}

module.exports.deleteService = async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndDelete(id)
    req.flash('success', 'Service deleted!')
    res.redirect('/admin/services')
}

module.exports.updateContact = async (req, res) => {
    await Contact.findOneAndUpdate({ ...req.body.contact })
    req.flash('success', 'Contact info updated!')
    res.redirect('/admin/services')
}