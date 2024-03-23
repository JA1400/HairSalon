const Testimonial = require('../models/testimonials');
const StoredTestimonial = require('../models/storedTestimonial');

module.exports.testimonialIndex = async (req, res) => {
    const testimonials = await Testimonial.find();
    const storedTestimonials = await StoredTestimonial.find();
    res.render('admin/testimonials', { testimonials, storedTestimonials });
}

module.exports.deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id)
    req.flash('success', 'New testimonial deleted!')
    res.redirect('/admin/testimonials')
}

module.exports.storeTestimonial = async (req, res) => {
    const sTestimonial = new StoredTestimonial({ ...req.body.testimonial })
    const { id } = req.params;
    await sTestimonial.save();
    await Testimonial.findByIdAndDelete(id);
    req.flash('success', 'Testimonial saved to site!')
    res.redirect('/admin/testimonials')
}

module.exports.deleteSTestimonial = async (req, res) => {
    const { id } = req.params;
    await StoredTestimonial.findByIdAndDelete(id)
    req.flash('success', 'Stored testimonial deleted!')
    res.redirect('/admin/testimonials')
}