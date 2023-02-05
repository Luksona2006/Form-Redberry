'use strict'
import {delay, randomMs, storageGetItem, storageSetItem, inputWrongSpan, inputVerifiedSpan, defaultInput, inputVerified, geTwoCheck, emailCheck, numberCheck} from './functions.js'

const firstnameInput = document.querySelector('#firstName__input')
const lastNameInput = document.querySelector('#lastName__input')
const aboutTextarea = document.querySelector('#about__textarea')
const emailInput = document.querySelector('#email__input')
const numberInput = document.querySelector('#number__input')
const formSubmit= document.querySelector('#form__submit')

const defaultbtn = document.querySelector('#default__button')
const custombtn = document.querySelector('#custom__button')

// Loading popUp elements

const loadingPopUp = document.querySelector('.loading__popUp')
const loadingText = loadingPopUp.querySelector('p')
const blurPopUp = document.querySelector('.blurPopUp')

// Result from form

const imageResult = document.querySelector('.form__image').firstElementChild;
const nameResult = document.querySelector('#result__name');
const emailResult = document.querySelector('#result__email')
const numberResult= document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

// Storage

if(!localStorage.getItem('Person')) {
    var cvObj = {
        firstname: '',
        lastname: '',
        image: '',
        email: '',
        number: '',
        about: '',
        position: [''],
        employer: [''],
        expDateStart: [''],
        expDateEnd: [''],
        expAbout: [''],
        school: [''],
        quality: [''],
        eduDate: [''],
        eduAbout: ['']
    }

    storageSetItem('Person', cvObj)
} else {
    cvObj = storageGetItem('Person')
    firstnameInput.value = cvObj.firstname;
    lastNameInput.value = cvObj.lastname;
    aboutTextarea.value = cvObj.about;
    emailInput.value = cvObj.email;
    numberInput.value = cvObj.number;

   if(firstnameInput.value !== '' || lastNameInput.value !== '' || aboutTextarea.value !== '' || emailInput.value !== '' || numberInput.value !== '') {
    geTwoCheck(firstnameInput)
    geTwoCheck(lastNameInput)

    if(aboutTextarea.value.length > 0) inputVerified(aboutTextarea)

    emailCheck(emailInput)
    numberCheck(numberInput)
   }

    nameResult.textContent = `${cvObj.firstname} ${cvObj.lastname}`
    aboutResult.textContent = `${cvObj.about}`
    aboutResult.previousElementSibling.textContent = `${cvObj.about === '' ? '' : 'ჩემ შესახებ'}`
    emailResult.textContent = `${cvObj.email}`
    numberResult.textContent = `${cvObj.number}`
    imageResult.src = `${cvObj.image}`
    imageResult.parentElement.style.display = cvObj.image === '' ? 'none' : 'inline-block';
    emailIco.src = `${cvObj.email === '' ? '' : 'images/email_icon.png'}`
    numberIco.src = `${cvObj.number === '' ? '' : 'images/number_icon.png'}`
}

const changeStorage = function(property,element) {
    cvObj = storageGetItem('Person')
    cvObj[`${property}`] = element.value
    storageSetItem('Person', cvObj)
}

// EVENT HANDLERS

custombtn.addEventListener('click', function(e) {
    e.preventDefault();
    defaultbtn.click();
});

defaultbtn.addEventListener('change', function() {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        window.scrollTo(0, 0)
        document.querySelector('html').style.overflow = 'hidden';
        document.body.style.overflow = 'hidden'
        delay(400)
        .then(() => {
            blurPopUp.style.zIndex = '99'
            blurPopUp.style.opacity = '1'
            loadingPopUp.style.zIndex = '100'
            loadingPopUp.style.top = '0%'
            loadingPopUp.style.opacity = '1'
        })
        .then(() => delay(randomMs(4500, 3000)))
        .then(() => loadingPopUp.innerHTML = `
                                            <p>ფაილი წარმატებით დამუშავდა</p>  
                                            <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_109_2)">
                                                <rect width="28" height="28" rx="14" fill="white"/>
                                                <path d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM12 19.59L7.00001 14.59L8.59001 13L12 16.41L19.41 9L21.006 10.586L12 19.59Z" fill="#00BA56"/>
                                                </g>
                                                <rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#00BA56"/>
                                                <defs>
                                                <clipPath id="clip0_109_2">
                                                <rect width="28" height="28" rx="14" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                            `)
        .then(() => delay(800))
        .then(() => {
            blurPopUp.style.opacity = '0'
            loadingPopUp.style.opacity = '0'
            loadingPopUp.style.top = '-50%'
            setTimeout(() => {
                blurPopUp.style.zIndex = '-99'
                document.querySelector('html').style.overflow = 'unset';
                document.body.style.overflow = 'unset'
            }, 400);
        })
        .then(() => {
            cvObj = storageGetItem('Person')
            cvObj.image = reader.result;
            imageResult.parentElement.style.display = 'inline-block'
            imageResult.src = reader.result;
            storageSetItem('Person', cvObj)
        })
    })
    reader.readAsDataURL(this.files[0])
});

[firstnameInput, lastNameInput].forEach(element => {
    element.addEventListener('keyup', function() {
        geTwoCheck(element);
        if(element.value === '') defaultInput(element)
        changeStorage(`${element === firstnameInput ? 'firstname' : 'lastname'}`, this)
        nameResult.textContent = `${firstnameInput.value} ${lastNameInput.value}`
    })
});

aboutTextarea.addEventListener('keyup', function() {
    inputVerified(this)
    if(this.value === '') defaultInput(this)
    changeStorage('about', this)
    aboutResult.previousElementSibling.textContent = `${this.value === '' ? '' : 'ჩემ შესახებ'}`
    aboutResult.textContent = `${this.value}`
    
});

emailInput.addEventListener('keyup', function () {
    emailCheck(this)
    if(this.value === '') defaultInput(this)
    changeStorage('email', this)
    emailIco.src = `${this.value === '' ? '' : 'images/email_icon.png'}`
    emailResult.textContent = `${this.value}`
})

numberInput.addEventListener('keyup', function(){
    numberCheck(this)
    if(this.value === '') defaultInput(this)
    changeStorage('number', this)
    numberIco.src = `${this.value === '' ? '' : 'images/number_icon.png'}`
    numberResult.textContent = `${this.value}`
})

formSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let valid = true;
    geTwoCheck(firstnameInput)
    geTwoCheck(lastNameInput)
    inputVerified(aboutTextarea)
    emailCheck(emailInput)
    numberCheck(numberInput);

    [firstnameInput, lastNameInput, aboutTextarea, emailInput, numberInput].forEach(element => {
        if(element.style.border === '2px solid rgb(239, 80, 80)') valid = false;
    })

    if(valid) window.location.href = "experience.html";
})