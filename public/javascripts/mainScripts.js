let slides = document.querySelectorAll(".mySlides");
let dots = document.querySelectorAll(".dot");
const toTopBtn = document.querySelector("#to-top-btn")
const gImg = document.querySelectorAll(".g-prev-img")
const body = document.querySelector('body')
const mainEl = document.querySelector('main')
const fScreen = document.querySelector('.full-screen-w')
const fScreenImg = document.querySelector('.full-screen-img')
const fScreenBtn = document.querySelector('.close-w-btn')
const textArea = document.querySelector('textarea');
const fields = document.querySelectorAll('input[required]');
const cForm = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');
let validForm = false;
let slideIndex = 0;

toTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
})

function plusSlides(n) {
    slideIndex += n
    nextSlide();
}

function showSlides(n) {
    for (const slide of slides) slide.style.display = "none";
    for (const dot of dots) dot.classList.remove('active');
    slides[n].style.display = "flex";
    dots[n].classList.add('active');
}

function nextSlide() {
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = --slides.length;
    for (const slide of slides) slide.style.display = "none";
    slides[slideIndex].style.display = "block";
}

if (mainEl.classList.contains('gallery')) {
    document.addEventListener("DOMContentLoaded", function () {
        const lazyloadImages = document.querySelectorAll("img.lazy");
        let lazyloadThrottleTimeout;

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                let scrollTop = window.scrollY;
                for (const img of lazyloadImages) {
                    let offset = img.getBoundingClientRect();
                    if (offset.top < (window.innerHeight + scrollTop - 600)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                }
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyload);
    });
}

if (gImg.length) {
    for (let i = 0; i < gImg.length; i++) {
        gImg[i].addEventListener('click', (evt) => {
            body.classList.toggle('b-no-scroll');
            fScreenImg.src = evt.target.src;
            fScreen.style.display = 'block';
        })
    }
}

if (slides.length && dots.length) {
    showSlides(slideIndex);
} else if (slides.length) {
    nextSlide();
}

if (fScreenBtn) {
    fScreenBtn.addEventListener('click', () => {
        body.classList.toggle('b-no-scroll');
        fScreen.style.display = 'none';
    })
}

if (textArea) {
    textArea.addEventListener("keyup", e => {
        e.target.style.height = `auto`;
        let scHeight = e.target.scrollHeight;
        if (scHeight <= 100) scHeight = 100;
        e.target.style.height = `${scHeight}px`
    })
}

if (cForm) {
    cForm.addEventListener('input', () => {
        if (!textArea.checkValidity()) return;
        for (const field of fields) if (!field.checkValidity()) return;
        validForm = true;
        submitBtn.disabled = false;
    })
}