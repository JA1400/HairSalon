const openMBtn = document.querySelector('#menu-btn')
const closeMBtn = document.querySelector('#side-menu-btn')
const mobileMenu = document.querySelector('.side-menu')
const pageBody = document.querySelector('body')
const pageBlur = document.querySelector('#blur-overlay')

openMBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('side-menu-active')
    pageBody.classList.toggle('b-no-scroll')
    pageBlur.classList.toggle('hidden')
})

closeMBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('side-menu-active')
    pageBody.classList.toggle('b-no-scroll')
    pageBlur.classList.toggle('hidden')
})
