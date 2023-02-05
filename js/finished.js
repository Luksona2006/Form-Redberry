'use strict'
import {storageGetItem} from './functions.js'

const infoExperienceHtml = `
                            <div>
                                <p class="black-16b result__position_employer"></p>
                                <span class="result__experience_date"></span>
                                <p class="black-16 result__aboutExperience"></p>
                            </div>`

const infoEducationHtml = `
                        <div>
                            <p class="black-16b result__school_quality"></p>
                            <span class="result__education_date"></span>
                            <p class="black-16 result__aboutEducation"></p>
                        </div>`

const lineHtml = `<div class="line"></div>`

for(let i = 0; i < storageGetItem('Person')['employer'].length ; i++) {
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', infoExperienceHtml)
}   

for(let i = 0; i < storageGetItem('Person')['school'].length; i++) {
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', infoEducationHtml)
}

// Requst Popup elements
const requestPopUp = document.querySelector('#requestPopUp');
const dontVerify = document.querySelector('#dontVerify');
const verify = document.querySelector('#verify')
const blurPopUp = document.querySelector('.blurPopUp')

// Results
const imageResult = document.querySelector('.form__image').firstElementChild;
const nameResult = document.querySelector('#result__name')
const emailResult = document.querySelector('#result__email')
const numberResult = document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')
const notification = document.querySelector('#notification')
const removeStorage = document.querySelector('.button__back')

let positionEmployerResult = document.getElementsByClassName('result__position_employer')
let experienceDateResult = document.getElementsByClassName('result__experience_date')
let aboutExperienceResult = document.getElementsByClassName('result__aboutExperience')

let schoolQualityResult = document.getElementsByClassName('result__school_quality')
let eductaionDateResult = document.getElementsByClassName('result__education_date')
let aboutEducationResult = document.getElementsByClassName('result__aboutEducation')

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

let cvObj = storageGetItem('Person')

nameResult.textContent = `${ cvObj.firstname } ${ cvObj.lastname } `;
aboutResult.textContent = `${cvObj.about} `;
aboutResult.previousElementSibling.textContent = `ჩემ შესახებ`
emailResult.textContent = `${cvObj.email} `;
numberResult.textContent = `${cvObj.number}`;
imageResult.src = `${ cvObj.image } `;
imageResult.parentElement.style.display = 'inline-block';
emailIco.src = `images/email_icon.png`;
numberIco.src = `images/number_icon.png`;

for (let i = 0; i < storageGetItem('Person')['employer'].length; i++) {
    positionEmployerResult[i].textContent = `${cvObj.position[i] + ', ' + cvObj.employer[i]} `;
    experienceDateResult[i].textContent = `${cvObj.expDateStart[i] + ' - ' + cvObj.expDateEnd[i]} `;
    aboutExperienceResult[i].textContent = `${cvObj.expAbout[i]}`
}

for (let i = 0; i < storageGetItem('Person')['school'].length; i++) {
    schoolQualityResult[i].textContent = `${cvObj.school[i] + ', ' + cvObj.quality[i]}`;
    experienceDateResult[i].textContent = `${cvObj.expDateStart[i] + ' - ' + cvObj.expDateEnd[i]}`;
    eductaionDateResult[i].textContent = `${cvObj.eduDate[i]}`;
    aboutEducationResult[i].textContent = `${cvObj.eduAbout[i]}`;
}

notification.querySelector('img').addEventListener('click', function() {
    notification.style.opacity = '0'
    notification.style.zIndex = '-50'
    setTimeout(() => {
        notification.style.display = 'none'
    },  400)
})

removeStorage.addEventListener('click', function() {
    requestPopUp.style.top = '100px'
    requestPopUp.style.opacity = '1'  
    blurPopUp.style.zIndex = '99'
    blurPopUp.style.opacity = '1'
    document.querySelector('html').style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
})

verify.addEventListener('click', function() {
    localStorage.removeItem('Person')
    setTimeout(() => window.location.href = 'index.html', 500)
})

dontVerify.addEventListener('click', function() {
    requestPopUp.style.opacity = '0'
    requestPopUp.style.top = '-50%'
    blurPopUp.style.opacity = '0'
    setTimeout(() => blurPopUp.style.zIndex = '-99', 400)
    document.querySelector('html').style.overflow = 'unset'
    document.body.style.overflow = 'unset'
})

