'use strict'
import {storageGetItem, storageSetItem, minTwoCheck, defaultInput, changeStorage, inputSimpleVerify} from './functions.js'
import {infoExperienceHtml, lineHtml, deleteBtn} from './domElements.js'

const formSubmit = document.querySelector('#form__submit')
const experienceBlockBtn = document.querySelector('#experienceBlock__add')

let positionInput = document.getElementsByClassName('position__input')
let employerInput = document.getElementsByClassName('employer__input')
let dateStartInput = document.getElementsByClassName('dateStart__input')
let dateEndInput = document.getElementsByClassName('dateEnd__input')
let aboutExperienceTextarea = document.getElementsByClassName('aboutExperience__textarea')

const imageResult = document.querySelector('.form__image').firstElementChild;
const nameResult = document.querySelector('#result__name')
const emailResult = document.querySelector('#result__email')
const numberResult = document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')

let positionEmployerResult = document.getElementsByClassName('result__position_employer')
let experienceDateResult = document.getElementsByClassName('result__experience_date')
let aboutExperienceResult = document.getElementsByClassName('result__aboutExperience')

let formBlock = [...document.querySelectorAll('.form__block')]

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

const formHtml = `
                    <div class="form__block">
                        <div class="input__div">
                            <label for="position">თანამდებობა</label>
                            <div class="input__wrapper">
                                <input class="position__input" name="position" type="text" placeholder="თანამდებობა">
                                <span><img src="" alt=""></span>
                            </div>
                            <span>მინიმუმ 2 სიმბოლო</span>
                        </div>
                        <div class="input__div">
                            <label for="employer">დამსაქმებელი</label>
                            <div class="input__wrapper">
                                <input class="employer__input" name="employer" type="text" placeholder="დამსაქმებელი">
                                <span><img src="" alt=""></span>
                            </div>
                            <span>მინიმუმ 2 სიმბოლო</span>
                        </div>
                        <div class="input__divs">
                            <div class="input__div">
                                <label for="dateStart">დაწყების თარიღი</label>
                                <input class="dateStart__input" name="dateStart" type="date">
                            </div>
                            <div class="input__div">
                                <label for="dateEnd">დამთავრების თარიღი</label>
                                <input class="dateEnd__input" name="dateEnd" type="date">
                            </div>
                        </div>
                        <div class="input__div">
                            <label for="aboutExperience">აღწერა</label>
                            <textarea name="aboutExperience" class="aboutExperience__textarea" cols="30" rows="5"
                                placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"></textarea>
                        </div>
                    </div>
                    <div class="line"></div>
                    `

// FUNCTIONS


for(let i = 0; i < storageGetItem('Person')['employer'].length - 1; i++) {
    document.querySelector('form').insertAdjacentHTML('beforeend', formHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', infoExperienceHtml)
    formBlock = [...document.querySelectorAll('.form__block')]
}   

if(storageGetItem('Person')['employer'].length - 1 > 0) {
    formBlock[formBlock.length - 1].insertAdjacentHTML('beforeend', deleteBtn)
    formBlock[formBlock.length - 1].querySelector('.red__button').addEventListener('click', function(e) {
        e.preventDefault();
        cvObj = storageGetItem('Person');
        cvObj.position.pop();
        cvObj.employer.pop();
        cvObj.expDateStart.pop();
        cvObj.expDateEnd.pop();
        cvObj.expAbout.pop();
        storageSetItem('Person', cvObj);
        window.location.reload();
    })
}

let cvObj = storageGetItem('Person')

for (let i = 0; i < formBlock.length; i++) {
    positionInput[i].value = cvObj.position[i]
    employerInput[i].value = cvObj.employer[i]
    dateStartInput[i].value = cvObj.expDateStart[i]
    dateEndInput[i].value = cvObj.expDateEnd[i]
    aboutExperienceTextarea[i].value = cvObj.expAbout[i]
}

for (let i = 0; i < formBlock.length; i++) {
    if (cvObj.position[i] !== '' || cvObj.employer[i] !== '' || cvObj.expDateStart[i] !== '' || cvObj.expDateEnd[i] !== '' || cvObj.expAbout[i] !== '') {
        minTwoCheck(positionInput[i]);
        minTwoCheck(employerInput[i]);
        [dateStartInput[i], dateEndInput[i], aboutExperienceTextarea[i]].forEach(element => {
            inputSimpleVerify(element)
        })
    }
}

nameResult.textContent = `${ cvObj.firstname } ${ cvObj.lastname } `;
aboutResult.textContent = `${ cvObj.about } `;
aboutResult.previousElementSibling.textContent = `${ cvObj.about === '' ? '' : 'ჩემ შესახებ' } `;
emailResult.textContent = `${ cvObj.email } `;
numberResult.textContent = `${ cvObj.number } `;
imageResult.src = `${ cvObj.image } `;
imageResult.parentElement.style.display = cvObj.image === '' ? 'none' : 'inline-block';
emailIco.src = `${ cvObj.email === '' ? '' : 'images/email_icon.png' } `;
numberIco.src = `${ cvObj.number === '' ? '' : 'images/number_icon.png' } `;

for (let i = 0; i < formBlock.length; i++) {
    positionEmployerResult[i].textContent = `${ cvObj.position[i] !== '' || cvObj.employer[i] !== '' ? cvObj.position[i] + ', ' + cvObj.employer[i] : '' } `;
    if (storageGetItem('Person')['expDateStart'][i] !== '' || storageGetItem('Person')['expDateEnd'][i] !== '') {
        experienceDateResult[i].textContent = `${cvObj.expDateStart[i] + ' - ' + cvObj.expDateEnd[i]} `;
    }
    aboutExperienceResult[i].textContent = `${ cvObj.expAbout[i] } `;
}


// EVENT HANDLERS

for (let i = 0; i < formBlock.length; i++) {
    [positionInput[i], employerInput[i]].forEach(element => {
        element.addEventListener('keyup', function () {
            minTwoCheck(element);
            if (element.value === '') defaultInput(element)
            changeStorage(`${element === positionInput[i] ? 'position' : 'employer'}`, this, i)
            positionEmployerResult[i].textContent = `${ positionInput[i].value !== '' || employerInput[i].value !== '' ? positionInput[i].value + ', ' + employerInput[i].value : '' } `
        })
    });

    [dateStartInput[i], dateEndInput[i]].forEach(element => {
        element.addEventListener('change', function () {
            inputSimpleVerify(this)
            if (this.value === '') defaultInput(this)
            changeStorage(`${element === dateStartInput[i] ? 'expDateStart' : 'expDateEnd'}`, this, i)
            experienceDateResult[i].textContent = `${dateStartInput[i].value} - ${dateEndInput[i].value}`
            if (dateStartInput[i].value === '' && dateEndInput[i].value === '') {
                experienceDateResult[i].textContent = ''
            }
        });
    });

    aboutExperienceTextarea[i].addEventListener('keyup', function () {
        inputSimpleVerify(this)
        if (this.value === '') defaultInput(this)
        changeStorage('expAbout', this, i)
        aboutExperienceResult[i].textContent = `${ this.value } `
    });
}

experienceBlockBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (formBlock.length > 2) return
    cvObj = storageGetItem('Person');
    cvObj.position.push('');
    cvObj.employer.push('');
    cvObj.expDateStart.push('');
    cvObj.expDateEnd.push('');
    cvObj.expAbout.push('');
    storageSetItem('Person', cvObj)
    window.location.reload();
})

formSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let valid = true;

    for (let i = 0; i < formBlock.length; i++) {
        minTwoCheck(positionInput[i]);
        minTwoCheck(employerInput[i]);
        inputSimpleVerify(aboutExperienceTextarea[i]);

        [dateStartInput[i], dateEndInput[i], aboutExperienceTextarea[i]].forEach(element => {
            inputSimpleVerify(element)
        });
    }

    for (let i = 0; i < formBlock.length; i++) {
        [positionInput[i], employerInput[i], dateStartInput[i], dateEndInput[i], aboutExperienceTextarea[i]].forEach(element => {
            if (element.style.border === '2px solid rgb(239, 80, 80)') valid = false;
        });
    }

    if (valid) window.location.href = "education.html";
})

