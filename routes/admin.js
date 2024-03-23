const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateService, validateContact, validateTestimonial, validateInquiry } = require('../utils/validateModel');
const { isLoggedIn } = require('../middleware');
const service = require('../controllers/services');
const inquiry = require('../controllers/inquiries');
const testimonial = require('../controllers/testimonials');
const image = require('../controllers/images');
const multer = require('../multer/index')

router.route('/services')
    .get(isLoggedIn, catchAsync(service.servicesIndex))
    .post(isLoggedIn, validateService, catchAsync(service.newService));

router.route('/services/:id')
    .put(isLoggedIn, validateService, catchAsync(service.updateService))
    .delete(isLoggedIn, catchAsync(service.deleteService));

router.put('/contact', isLoggedIn, validateContact, catchAsync(service.updateContact));

/********************************************************************/

router.route('/inquiries')
    .get(isLoggedIn, catchAsync(inquiry.inquiryIndex))
    .post(validateInquiry, catchAsync(inquiry.postInquiry));

router.delete('/inquiries/:id', isLoggedIn, catchAsync(inquiry.deleteInquiry));

/********************************************************************/

router.get('/testimonials', isLoggedIn, catchAsync(testimonial.testimonialIndex));

router.delete('/testimonials/:id', isLoggedIn, catchAsync(testimonial.deleteTestimonial));

router.route('/testimonials/stored/:id')
    .post(isLoggedIn, validateTestimonial, catchAsync(testimonial.storeTestimonial))
    .delete(isLoggedIn, catchAsync(testimonial.deleteSTestimonial));

/********************************************************************/

router.route('/gallery')
    .get(isLoggedIn, catchAsync(image.imageIndex))
    .post(isLoggedIn, multer.single('image'), catchAsync(image.saveImage));

router.delete('/gallery/:id', isLoggedIn, catchAsync(image.deleteImage))


module.exports = router;