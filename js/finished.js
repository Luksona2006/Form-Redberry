'use strict'
import {storageGetItem} from './functions.js'
import {infoExperienceHtml, infoEducationHtml, lineHtml} from './domElements.js'

for(let i = 0; i < storageGetItem('Person')['experiences'].length ; i++) {
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', infoExperienceHtml)
}   

for(let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', infoEducationHtml)
}

// Results
const imageResult = document.querySelector('.form__image').firstElementChild;
const nameResult = document.querySelector('#result__name')
const emailResult = document.querySelector('#result__email')
const numberResult = document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')
const notification = document.querySelector('#notification')

let positionEmployerResult = document.getElementsByClassName('result__position_employer')
let experienceDateResult = document.getElementsByClassName('result__experience_date')
let aboutExperienceResult = document.getElementsByClassName('result__aboutExperience')

let schoolQualityResult = document.getElementsByClassName('result__school_quality')
let eductaionDateResult = document.getElementsByClassName('result__education_date')
let aboutEducationResult = document.getElementsByClassName('result__aboutEducation')

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

let cvObj = storageGetItem('Person')

nameResult.textContent = `${cvObj.name} ${cvObj.surname}`
aboutResult.textContent = `${cvObj.about_me}`
aboutResult.previousElementSibling.textContent = 'ჩემ შესახებ'
emailResult.textContent = `${cvObj.email}`
numberResult.textContent = `${cvObj.phone_number}`
imageResult.src = `${cvObj.image}`
imageResult.parentElement.style.display = 'inline-block';
emailIco.src = `images/email_icon.png`
numberIco.src = `images/number_icon.png`

for (let i = 0; i < storageGetItem('Person')['experiences'].length; i++) {
    positionEmployerResult[i].textContent = `${cvObj.experiences[i].position + ', ' + cvObj.experiences[i].employer} `;
    experienceDateResult[i].textContent = `${cvObj.experiences[i].start_date + ' - ' + cvObj.experiences[i].due_date} `;
    aboutExperienceResult[i].textContent = `${cvObj.experiences[i].description}`;
}

for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    schoolQualityResult[i].textContent = `${cvObj.educations[i].institute + ', ' + cvObj.educations[i].degree}`;
    eductaionDateResult[i].textContent = `${cvObj.educations[i].due_date}`;
    aboutEducationResult[i].textContent = `${cvObj.educations[i].description}`;
}

localStorage.removeItem('Person')

notification.querySelector('img').addEventListener('click', function() {
    notification.style.opacity = '0'
    notification.style.zIndex = '-50'
    setTimeout(() => {
        notification.style.display = 'none'
    },  400)
})
