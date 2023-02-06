'use strict'
import {delay, randomMs, storageGetItem, storageSetItem, defaultInput, inputVerified, geTwoCheck, emailCheck, numberCheck, loadingPopUpInner} from './functions.js'
import { loadingSvg, verifyiedSvg } from './domElements.js'

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
    if(reader.result === storageGetItem('Person')['image']) return
    reader.addEventListener('load', function() {
        window.scrollTo(0, 0)
        document.querySelector('html').style.overflow = 'hidden';
        document.body.style.overflow = 'hidden'
        loadingText.textContent = 'ფაილის დამუშავება'
        delay(400)
        .then(() => {
            blurPopUp.style.zIndex = '99'
            blurPopUp.style.opacity = '1'
            loadingPopUp.style.zIndex = '100'
            loadingPopUp.style.top = '0%'
            loadingPopUp.style.opacity = '1'
        })
        .then(() => delay(randomMs(4500, 3000)))
        .then(() => loadingPopUpInner('ფაილი წარმატებით დამუშავდა', verifyiedSvg))
        .then(() => delay(800))
        .then(() => {
            blurPopUp.style.opacity = '0'
            loadingPopUp.style.opacity = '0'
            loadingPopUp.style.top = '-50%'
        })
        .then(() => delay(400))
        .then(() => {
            blurPopUp.style.zIndex = '-99'
            loadingPopUp.style.top = '-100%'
            document.querySelector('html').style.overflow = 'unset';
            document.body.style.overflow = 'unset'
        })
        .then(() => { 
            loadingPopUpInner('ფაილის დამუშავება', loadingSvg)
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