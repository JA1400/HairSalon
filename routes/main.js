const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const main = require('../controllers/main');


router.get('/', main.redirectHome);

router.get('/home', catchAsync(main.viewHome));

router.get('/services', catchAsync(main.viewServices));

router.get('/about', catchAsync(main.viewAbout));

router.get('/gallery', catchAsync(main.viewGallery));

router.get('/testimonials', catchAsync(main.viewTestimonial));

router.get('/contact', catchAsync(main.viewContact));

module.exports = router;
