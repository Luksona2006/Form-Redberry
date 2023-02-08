'use strict'
import { delay, randomMs, storageGetItem, storageSetItem, minTwoCheck, defaultInput, changeStorage, inputSimpleVerify, loadingPopUpInner } from './functions.js'
import { infoExperienceHtml, infoEducationHtml, lineHtml, deleteBtn, loadingSvg, verifyiedSvg } from './domElements.js'
import { educationTypesObj } from './educationTypesObj.js'

const formSubmit = document.querySelector('#form__submit')
const experienceBlockBtn = document.querySelector('#experienceBlock__add')

let schoolInput = document.getElementsByClassName('school__input')
let qualitySelected = document.getElementsByClassName('quality__selected')
let eduDateEndInput = document.getElementsByClassName('educationDateEnd__input')
let aboutEducationTextarea = document.getElementsByClassName('aboutEducation__textarea')

const selectElement = document.getElementsByClassName('select')
const selectorPopUp = document.getElementsByClassName('selector__popUp')

// Loading popUp elements

const loadingPopUp = document.querySelector('.loading__popUp')
const loadingText = loadingPopUp.querySelector('p')
const blurPopUp = document.querySelector('.blurPopUp')

// Result Elements
const imageResult = document.querySelector('.form__image').firstElementChild;
const nameResult = document.querySelector('#result__name')
const emailResult = document.querySelector('#result__email')
const numberResult = document.querySelector('#result__number')
const aboutResult = document.querySelector('#result__about')

let positionEmployerResult = document.getElementsByClassName('result__position_employer')
let experienceDateResult = document.getElementsByClassName('result__experience_date')
let aboutExperienceResult = document.getElementsByClassName('result__aboutExperience')

let schoolQualityResult = document.getElementsByClassName('result__school_quality')
let eductaionDateResult = document.getElementsByClassName('result__education_date')
let aboutEducationResult = document.getElementsByClassName('result__aboutEducation')

let customArrow = document.getElementsByClassName('custom__arrow')

let formBlock = [...document.querySelectorAll('.form__block')]

const emailIco = emailResult.previousElementSibling;
const numberIco = numberResult.previousElementSibling;

const formHtml = `
                <div class="form__block">
                    <div class="input__div">
                        <label for="school">სასწავლებელი</label>
                        <div class="input__wrapper">
                            <input class="school__input" name="school" type="text" placeholder="სასწავლებელი">
                            <span><img src="" alt=""></span>
                        </div>
                        <span>მინიმუმ 2 სიმბოლო</span>
                    </div>
                    <div class="input__divs">
                        <div class="input__div">
                            <label for="quality">ხარისხი</label>
                            <div class="custom__select">
                                <div class="select">
                                    <span class="quality__selected">აირჩიეთ ხარისხი</span>
                                    <div class="custom__arrow"><img src="images/arrow.png" alt="arrow drop down"></div>
                                </div>           
                                <div class="selector__popUp">
                                    <ul>                                     
                                    </ul>
                                </div>
                            </div>      
                        </div>
                        <div class="input__div">
                            <label for="educationDateEnd">დამთავრების რიცხვი</label>
                            <div class="date__wrapper">
                                <input class="educationDateEnd__input" name="educationDateEnd" type="date">
                                <div><img src="images/date__icon.png" alt="date icon"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input__div">
                        <label for="aboutEducation">აღწერა</label>
                        <textarea name="aboutEducation" class="aboutEducation__textarea" cols="30" rows="5"
                            placeholder="განათლების აღწერა"></textarea>
                    </div>
                    </div>
                <div class="line"></div>`

for (let i = 0; i < storageGetItem('Person')['experiences'].length - 1; i++) {
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', infoExperienceHtml)
}

for (let i = 0; i < storageGetItem('Person')['educations'].length - 1; i++) {
    document.querySelector('form').insertAdjacentHTML('beforeend', formHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', infoEducationHtml)
    formBlock = [...document.querySelectorAll('.form__block')]
}

if (storageGetItem('Person')['educations'].length - 1 > 0) {
    formBlock[formBlock.length - 1].insertAdjacentHTML('beforeend', deleteBtn)
    formBlock[formBlock.length - 1].querySelector('.red__button').addEventListener('click', function (e) {
        e.preventDefault();
        cvObj = storageGetItem('Person');
        cvObj.educations.pop()
        storageSetItem('Person', cvObj);
        window.location.reload();
    })
}

let cvObj = storageGetItem('Person')

for (let i = 0; i < formBlock.length; i++) {
    educationTypesObj.map(element => selectorPopUp[i].querySelector('ul').insertAdjacentHTML('beforeend', `<li class="li">${element.title}</li>`))
    schoolInput[i].value = cvObj.educations[i].institute
    qualitySelected[i].textContent = cvObj.educations[i].degree === '' ? 'აირჩიეთ ხარისხი' : cvObj.educations[i].degree;
    eduDateEndInput[i].value = cvObj.educations[i].due_date
    aboutEducationTextarea[i].value = cvObj.educations[i].description
}

for (let i = 0; i < formBlock.length; i++) {
    if (cvObj.educations[i].institute !== '' || cvObj.educations[i].degree !== '' || cvObj.educations[i].due_date !== '' || cvObj.educations[i].description) {
        minTwoCheck(schoolInput[i]);
        [qualitySelected[i], eduDateEndInput[i], aboutEducationTextarea[i]].forEach(element => {
            inputSimpleVerify(element)
        })
    }
}

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
    positionEmployerResult[i].textContent = `${cvObj.experiences[i].position !== '' || cvObj.experiences[i].employer !== '' ? cvObj.experiences[i].position + ', ' + cvObj.experiences[i].employer : '' } `;
    if (cvObj.experiences[i].start_date !== '' || cvObj.experiences[i].due_date !== '') {
        experienceDateResult[i].textContent = `${cvObj.experiences[i].start_date + ' - ' + cvObj.experiences[i].due_date} `;
    }
    aboutExperienceResult[i].textContent = `${cvObj.experiences[i].description}`;
}

for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    schoolQualityResult[i].textContent = `${cvObj.educations[i].institute !== '' || cvObj.educations[i].degree !== '' ? cvObj.educations[i].institute + ', ' + cvObj.educations[i].degree : ''}`;
    eductaionDateResult[i].textContent = `${cvObj.educations[i].due_date}`;
    aboutEducationResult[i].textContent = `${cvObj.educations[i].description}`;
}

for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    if (storageGetItem('Person')['educations'][i].degree !== '') {
        qualitySelected[i].style.color = '#000000'
    }
}


// EVENT HANDLERS

for (let i = 0; i < formBlock.length; i++) {
    schoolInput[i].addEventListener('keyup', function () {
        minTwoCheck(this);
        if (this.value === '') defaultInput(this)
        changeStorage(`institute`, this, i, 'educations')
        schoolQualityResult[i].textContent = `${schoolInput[i].value}, ${qualitySelected[i].textContent}`
        if (schoolInput[i].value === 'აირჩიეთ ხარისხი' && qualitySelected[i].textContent === '') {
            schoolQualityResult[i].textContent = ''
        }
    });
    selectElement[i].addEventListener('click', function () {
        if(selectorPopUp[i].style.opacity === '0' || selectorPopUp[i].style.opacity === '') {
            selectorPopUp[i].style.zIndex = '10'
            selectorPopUp[i].style.opacity = '1'
            selectorPopUp[i].style.top = '100%'
            customArrow[i].firstElementChild.style.rotate = '180deg'
        } else {
            selectorPopUp[i].style.zIndex = '-10'
            selectorPopUp[i].style.opacity = '0'
            selectorPopUp[i].style.top = '0'
            customArrow[i].firstElementChild.style.rotate = '0deg'
        }
    })

    eduDateEndInput[i].addEventListener('change', function () {
        inputSimpleVerify(this)
        if (this.value === '') defaultInput(this)
        changeStorage('due_date', this, i, 'educations')
        eductaionDateResult[i].textContent = `${this.value}`
    });


    aboutEducationTextarea[i].addEventListener('keyup', function () {
        inputSimpleVerify(this)
        if (this.value === '') defaultInput(this)
        changeStorage('description', this, i, 'educations')
        aboutEducationResult[i].textContent = `${this.value} `
    });
}

experienceBlockBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (formBlock.length > 2) return
    cvObj = storageGetItem('Person');
    cvObj.educations.push(
        {
            institute: "",
            degree: "",
            due_date: "",
            description: ""
        }
    );
    storageSetItem('Person', cvObj)
    window.location.reload();
})

for (let i = 0; i < formBlock.length; i++) {
    selectorPopUp[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('li')) {
            qualitySelected[i].textContent = e.target.textContent
            qualitySelected[i].style.color = '#000000'
            selectorPopUp[i].style.zIndex = '-10'
            selectorPopUp[i].style.opacity = '0'
            selectorPopUp[i].style.top = '0'
            customArrow[i].firstElementChild.style.rotate = '0deg'

            cvObj = storageGetItem('Person')
            cvObj.educations[i].degree = qualitySelected[i].textContent
            storageSetItem('Person', cvObj)

            if (schoolInput[i].value !== '') schoolQualityResult[i].textContent = `${schoolInput[i].value + ', ' + qualitySelected[i].textContent}`
            else schoolQualityResult[i].textContent = `${', ' + qualitySelected[i].textContent}`
            
            inputSimpleVerify(qualitySelected[i])
        }
    })
}


formSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let valid = true;

    for (let i = 0; i < formBlock.length; i++) {
        minTwoCheck(schoolInput[i]);
        [qualitySelected[i], eduDateEndInput[i], aboutEducationTextarea[i]].forEach(element => {
            inputSimpleVerify(element)
        });
    }

    for (let i = 0; i < formBlock.length; i++) {
        [qualitySelected[i], eduDateEndInput[i], schoolInput[i], aboutEducationTextarea[i]].forEach(element => {
            if (element.style.border === '2px solid rgb(239, 80, 80)') valid = false;
        });
    }

    if (valid) {
        window.scrollTo(0, 0)
        document.querySelector('html').style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        delay(400)
            .then(() => {
                blurPopUp.style.zIndex = '99'
                blurPopUp.style.opacity = '1'
                loadingPopUp.style.zIndex = '100'
                loadingPopUp.style.top = '0%'
                loadingPopUp.style.opacity = '1'
            })
            .then(() => delay(randomMs(3000, 2000)))
            .then(() => loadingText.textContent = 'მონაცემების დამუშავება')
            .then(() => delay(randomMs(5000, 3500)))
            .then(() => loadingText.textContent = 'რეზიუმეს ფორმირება')
            .then(() => delay(randomMs(3000, 2000)))
            .then(() => loadingPopUpInner('რეზიუმე წარმატებულად დამზადდა', verifyiedSvg))
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
            .then(() => delay(400))
            .then(() =>
            { 
                history.pushState(null, null, 'index.html');
                window.onpopstate = function () {
                    history.go(1);
                };
                window.location.href = 'finished.html'
            })
    }
})


