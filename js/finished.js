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

// Displaying values from stored object (data from personal page)
personalPageInputs();

// Displaying values from stored object (data from experience page)
for (let i = 0; i < storageGetItem('Person')['experiences'].length; i++) {
    positionEmployerResult[i].textContent = `${cvObj.experiences[i].position + ', ' + cvObj.experiences[i].employer} `;
    experienceDateResult[i].textContent = `${cvObj.experiences[i].start_date + ' - ' + cvObj.experiences[i].due_date} `;
    aboutExperienceResult[i].textContent = `${cvObj.experiences[i].description}`;
}

// Displaying values from stored object (data from educations page)
for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    schoolQualityResult[i].textContent = `${cvObj.educations[i].institute + ', ' + cvObj.educations[i].degree}`;
    eductaionDateResult[i].textContent = `${cvObj.educations[i].due_date}`;
    aboutEducationResult[i].textContent = `${cvObj.educations[i].description}`;
}

localStorage.removeItem('Person') // Removing data

notification.querySelector('img').addEventListener('click', function() {
    notification.style.opacity = '0'
    notification.style.zIndex = '-50'
    setTimeout(() => {
        notification.style.display = 'none'
    },  400)
})
