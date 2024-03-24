const btns = document.querySelectorAll('.open-delete-form');
const deleteBtns = document.querySelectorAll('.open-d-form');
const dform = document.querySelector('#delete-form');
const aform = document.querySelector('#add-form');

const cancelBtn = document.querySelector('.cancel-delete');
const cEditBtn = document.querySelector('#c-edit-btn');
const contactBtns = document.querySelectorAll('.c-btns');
const updateSBtns = document.querySelectorAll('.s-check-btn');
const editSBtns = document.querySelectorAll('.s-pen-btn');
const openABtn = document.querySelector('#open-a-btn');
const AFormCancelBtn = document.querySelector('#a-form-cancel');

const bOverlay = document.querySelector('#blur-overlay');
const textArea = document.querySelectorAll('.description');
const tAreas = document.querySelectorAll('textarea');
const singleService = document.querySelectorAll('.service-group');
const cInFields = document.querySelectorAll('.contact-field');
const formAction = '?_method=DELETE'

const queueTDelBtn = document.querySelectorAll('#delete-testi');
const queueTAddBtn = document.querySelectorAll('#add-testi');
const storedTDelBtn = document.querySelectorAll('#delete-s-testi');
const storeTForm = document.querySelector('#testi-move-form');
const cancelSTBtn = document.querySelector('.cancel-move');
const testiEntries = document.querySelectorAll('.testi-entries');
const editQTBtn = document.querySelectorAll('#edit-testi');
const qTFields = document.querySelectorAll('.q-testi-fields');

const imgPrev = document.querySelector('#img-prev');
const imgInput = document.querySelector('#img-file');
const uploadBtn = document.querySelector('#upload-btn');
const loadAnim = document.querySelector('#load-screen');

const imageForm = document.querySelector('#img-upload-form');

const currentPath = window.location.pathname;
let navBarHeight = null;

if (currentPath !== '/admin/login') {
    navBarHeight = document.querySelector('nav').clientHeight;
}

const btnToggle = (btn) => {
    if (btn.disabled) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

const fieldToggle = (infield) => {
    if (infield.disabled) {
        infield.disabled = false;
    } else {
        infield.disabled = true;
    }
}


const delayItem = (itemOne, itemTwo) => {
    setTimeout(() => {
        itemOne.classList.toggle('hidden')
        itemTwo.classList.toggle('hidden')
    }, 200)
}

const createImageE = (parent, file) => {
    let image = document.createElement("img");
    image.src = URL.createObjectURL(file[0]);
    image.alt = image.title = file[0].name;
    image.classList.add('preview-img');
    image.setAttribute('loading', 'lazy')
    parent.appendChild(image)
}


const assignSBtns = () => {
    for (let i = 0; i < singleService.length; i++) {
        let inputFields = document.querySelectorAll(`.input-${i}`)
        editSBtns[i].addEventListener('click', () => {
            updateSBtns[i].classList.toggle('hidden-btn');
            btnToggle(updateSBtns[i]);
            btnToggle(deleteBtns[i]);
            for (const field of inputFields) fieldToggle(field);
        })

        deleteBtns[i].addEventListener('click', (e) => {
            formPositioner(dform);
            let formString = `/admin/services/${e.currentTarget.value}${formAction}`;
            dform.action = formString;
            delayItem(dform, bOverlay);
        })
    }

    openABtn.addEventListener('click', () => {
        formPositioner(aform);
        delayItem(aform, bOverlay);
    })
}

const assignCBtns = () => {
    cEditBtn.addEventListener('click', () => {
        for (let i = 0; i < contactBtns.length; i++) {
            contactBtns[i].classList.toggle('hidden-btn')
            btnToggle(contactBtns[i]);
            fieldToggle(cInFields[i]);
        }
    })

    contactBtns[0].addEventListener('click', () => {
        for (let i = 0; i < contactBtns.length; i++) {
            contactBtns[i].classList.toggle('hidden-btn')
            btnToggle(contactBtns[i]);
            fieldToggle(cInFields[i]);
        }
    })

}

const assignQTestimonialBtns = () => {
    if (window.location.pathname !== "/admin/testimonials") throw error;
    if (queueTDelBtn.length) {
        for (let i = 0; i < queueTDelBtn.length; i++) {
            queueTDelBtn[i].addEventListener('click', (e) => {
                formPositioner(dform);
                let formString = `/admin/testimonials/${e.currentTarget.value}${formAction}`;
                dform.action = formString;
                delayItem(dform, bOverlay);
            });
        }
    }

    cancelBtn.addEventListener('click', () => {
        delayItem(dform, bOverlay);
    })


    for (let i = 0; i < storedTDelBtn.length; i++) {
        storedTDelBtn[i].addEventListener('click', (e) => {
            formPositioner(dform)
            let formString = `/admin/testimonials/stored/${e.currentTarget.value}${formAction}`;
            dform.action = formString;
            delayItem(dform, bOverlay);
        })
    }

    for (let i = 0; i < editQTBtn.length; i++) {
        editQTBtn[i].addEventListener('click', () => {

            let inputFields = document.querySelectorAll(`.input-${i}`);
            for (const field of inputFields) fieldToggle(field);

            btnToggle(queueTAddBtn[i]);
            if (!queueTAddBtn[i].disabled) {
                editQTBtn[i].textContent = 'Cancel';
                return;
            }
            editQTBtn[i].textContent = 'Edit';
        })
    }
}

const otherBtns = () => {
    AFormCancelBtn.addEventListener('click', () => {
        delayItem(aform, bOverlay);
    })

    cancelBtn.addEventListener('click', () => {
        delayItem(dform, bOverlay);
    })
}

const assignGBtns = () => {
    imgInput.addEventListener('change', (e) => {
        let files = imgInput.files;
        if (!files.length) return;
        uploadBtn.disabled = false;
        imgPrev.removeChild(document.querySelector('#img-prev img'));
        createImageE(imgPrev, files);
    })

    cancelBtn.addEventListener('click', () => {
        delayItem(dform, bOverlay);
    })

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', (e) => {
            formPositioner(dform);
            let formString = `/admin/gallery/${e.currentTarget.value}${formAction}`;
            dform.action = formString;
            delayItem(dform, bOverlay);
        })
    }

    uploadBtn.addEventListener('click', () => {
        delayItem(bOverlay, loadAnim);
    })
}

const dynamicTextArea = () => {
    for (let tA of textArea) {

        tA.style.height = `auto`;
        let scHeight = tA.scrollHeight;
        tA.style.height = `${scHeight}px`;

        tA.addEventListener("keyup", e => {
            e.target.style.height = `auto`
            let scHeight = e.target.scrollHeight;
            e.target.style.height = `${scHeight}px`
        })
    }
}

const iosFix = () => {
    uploadBtn.addEventListener('click', (e) => {
        setTimeout(() => {
            imageForm.submit()
        }, 200)
    })
}

const formPositioner = (form) => {
    form.style.top = `${(window.screen.height / 2) + window.scrollY - navBarHeight}px`
}

try {
    assignSBtns();
    assignCBtns();
    otherBtns();
    dynamicTextArea();
} catch (error) {

}

try {
    assignQTestimonialBtns()
    dynamicTextArea();
} catch (error) {

}

try {
    assignGBtns()
    iosFix()
} catch (error) {

}

for (const tA of tAreas) {
    tA.addEventListener('keydown', (e) => {
        if (e.key == 'Enter' && !e.shiftKey || e.key == 'Enter' && e.shiftKey) {
            e.preventDefault();
            return false;
        }
    })
}