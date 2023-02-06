'use strict'
import { delay, randomMs, storageGetItem, storageSetItem, defaultInput, inputVerified, geTwoCheck, emailCheck, numberCheck, loadingPopUpInner, changeStorage } from './functions.js'
import { loadingSvg, verifyiedSvg } from './domElements.js'

const firstnameInput = document.querySelector('#firstName__input')
const lastNameInput = document.querySelector('#lastName__input')
const aboutTextarea = document.querySelector('#about__textarea')
const emailInput = document.querySelector('#email__input')
const numberInput = document.querySelector('#number__input')
const formSubmit = document.querySelector('#form__submit')

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
const numberResult = document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')

const imageLabel = document.querySelector('#image__label')

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

// Storage

if (!localStorage.getItem('Person')) {
    var cvObj = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        experiences: [
            {
                position: "",
                employer: "",
                start_date: "",
                due_date: "",
                description: ""
            }
        ],
        educations: [
            {
                institute: "",
                degree: "",
                due_date: "",
                description: ""
            }
        ],
        image: "",
        about_me: ""
    }

    storageSetItem('Person', cvObj)
} else {
    cvObj = storageGetItem('Person')
    firstnameInput.value = cvObj.name.slice(0, cvObj.name.indexOf(' '));
    lastNameInput.value = cvObj.name.slice(cvObj.name.indexOf(' ') + 1);
    aboutTextarea.value = cvObj.about_me;
    emailInput.value = cvObj.email;
    numberInput.value = cvObj.phone_number;

    if (firstnameInput.value !== '' || lastNameInput.value !== '' || aboutTextarea.value !== '' || emailInput.value !== '' || numberInput.value !== '' || storageGetItem('Person')['image'] !== '') {
        geTwoCheck(firstnameInput);
        geTwoCheck(lastNameInput);
        
        if(storageGetItem('Person')['image'] === '') imageLabel.style.color = '#E52F2F'
        
        if (aboutTextarea.value.length > 0) inputVerified(aboutTextarea);

        emailCheck(emailInput);
        numberCheck(numberInput);
    }

    nameResult.textContent = `${cvObj.name}`
    aboutResult.textContent = `${cvObj.about_me}`
    aboutResult.previousElementSibling.textContent = `${cvObj.about_me === '' ? '' : 'ჩემ შესახებ'}`
    emailResult.textContent = `${cvObj.email}`
    numberResult.textContent = `${cvObj.phone_number}`
    imageResult.src = `${cvObj.image}`
    imageResult.parentElement.style.display = cvObj.image === '' ? 'none' : 'inline-block';
    emailIco.src = `${cvObj.email === '' ? '' : 'images/email_icon.png'}`
    numberIco.src = `${cvObj.phone_number === '' ? '' : 'images/number_icon.png'}`
}

// EVENT HANDLERS

custombtn.addEventListener('click', function (e) {
    e.preventDefault();
    defaultbtn.click();
});

defaultbtn.addEventListener('change', function () {
    const reader = new FileReader();
    if (reader.result === storageGetItem('Person')['image']) return
    reader.addEventListener('load', function () {
        imageLabel.style.color = '#000000'
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
    element.addEventListener('keyup', function () {
        geTwoCheck(element);
        cvObj = storageGetItem('Person')

        let personName = cvObj.name.split(' ');
        if (element === firstnameInput) personName[0] = firstnameInput.value;
        else personName[1] = lastNameInput.value;
        cvObj.name = personName.join(' ')

        storageSetItem('Person', cvObj)
        nameResult.textContent = `${firstnameInput.value} ${lastNameInput.value}`
    })
});

aboutTextarea.addEventListener('keyup', function () {
    inputVerified(this)
    if (this.value === '') defaultInput(this)
    changeStorage('about_me', this)
    aboutResult.previousElementSibling.textContent = `${this.value === '' ? '' : 'ჩემ შესახებ'}`
    aboutResult.textContent = `${this.value}`

});

emailInput.addEventListener('keyup', function () {
    emailCheck(this)
    if (this.value === '') defaultInput(this)
    changeStorage('email', this)
    emailIco.src = `${this.value === '' ? '' : 'images/email_icon.png'}`
    emailResult.textContent = `${this.value}`
})

numberInput.addEventListener('keyup', function () {
    numberCheck(this)
    if (this.value === '') defaultInput(this)
    changeStorage('phone_number', this)
    numberIco.src = `${this.value === '' ? '' : 'images/number_icon.png'}`
    numberResult.textContent = `${this.value}`
})

formSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let valid = true;
    geTwoCheck(firstnameInput);
    geTwoCheck(lastNameInput);
    inputVerified(aboutTextarea);
    emailCheck(emailInput);
    numberCheck(numberInput);

    if(storageGetItem('Person')['image'] === '') {
        imageLabel.style.color = '#E52F2F'
        valid = false;
    };

    [firstnameInput, lastNameInput, aboutTextarea, emailInput, numberInput].forEach(element => {
        if (element.style.border === '2px solid rgb(239, 80, 80)') valid = false;
    })

    if (valid) window.location.href = "experience.html";
})