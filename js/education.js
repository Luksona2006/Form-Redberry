'use strict'
import { delay, randomMs, storageGetItem, storageSetItem, minTwoCheck, defaultInput, changeStorage, inputSimpleVerify, loadingPopUpInner, personalPageInputs } from './functions.js'
import { infoExperienceHtml, infoEducationHtml, cvInfoExperienceHtml, cvInfoEducationHtml, lineHtml, deleteBtn, verifyiedSvg } from './domElements.js'
import { educationTypesObj } from './educationTypesObj.js'

const formSubmit = document.querySelector('#form__submit')
const experienceBlockBtn = document.querySelector('#experienceBlock__add')

// Inputs
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
let positionEmployerResult = document.getElementsByClassName('result__position_employer')
let experienceDateResult = document.getElementsByClassName('result__experience_date')
let aboutExperienceResult = document.getElementsByClassName('result__aboutExperience')

let schoolQualityResult = document.getElementsByClassName('result__school_quality')
let eductaionDateResult = document.getElementsByClassName('result__education_date')
let aboutEducationResult = document.getElementsByClassName('result__aboutEducation')

let customArrow = document.getElementsByClassName('custom__arrow')

let formBlock = [...document.querySelectorAll('.form__block')] // transforming to array 

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

// Adding as much elements as stored experiences obejects
for (let i = 0; i < storageGetItem('Person')['experiences'].length - 1; i++) {
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#experience__infos').insertAdjacentHTML('beforeend', infoExperienceHtml)
}

// Adding as much elements as stored educations obejects
for (let i = 0; i < storageGetItem('Person')['educations'].length - 1; i++) {
    document.querySelector('form').insertAdjacentHTML('beforeend', formHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', lineHtml)
    document.querySelector('#education__infos').insertAdjacentHTML('beforeend', infoEducationHtml)
    formBlock = [...document.querySelectorAll('.form__block')]
}

// If there are more than 1 form, add to last form delete button, which deletes last form 
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

// Giving inputs their stored value
for (let i = 0; i < formBlock.length; i++) {
    educationTypesObj.map(element => selectorPopUp[i].querySelector('ul').insertAdjacentHTML('beforeend', `<li class="li">${element.title}</li>`))
    schoolInput[i].value = cvObj.educations[i].institute
    qualitySelected[i].textContent = cvObj.educations[i].degree_id === '' ? 'აირჩიეთ ხარისხი' : educationTypesObj.find(obj => obj.id === cvObj.educations[i].degree_id).title;
    eduDateEndInput[i].value = cvObj.educations[i].due_date
    aboutEducationTextarea[i].value = cvObj.educations[i].description
}

// If all inputs isn't empty, then check for validation all of it
for (let i = 0; i < formBlock.length; i++) {
    if (cvObj.educations[i].institute !== '' || cvObj.educations[i].degree_id !== '' || cvObj.educations[i].due_date !== '' || cvObj.educations[i].description) {
        minTwoCheck(schoolInput[i]);
        [qualitySelected[i], eduDateEndInput[i], aboutEducationTextarea[i]].forEach(element => {
            inputSimpleVerify(element)
        })
    }
}

// Displaying values from stored object (data from personal page)
personalPageInputs()

// Displaying values from stored object (data from experience page)
for (let i = 0; i < storageGetItem('Person')['experiences'].length; i++) {
    positionEmployerResult[i].textContent = `${cvObj.experiences[i].position !== '' || cvObj.experiences[i].employer !== '' ? cvObj.experiences[i].position + ', ' + cvObj.experiences[i].employer : ''} `;
    if (cvObj.experiences[i].start_date !== '' || cvObj.experiences[i].due_date !== '') {
        experienceDateResult[i].textContent = `${cvObj.experiences[i].start_date + ' - ' + cvObj.experiences[i].due_date} `;
    }
    aboutExperienceResult[i].textContent = `${cvObj.experiences[i].description}`;
}

// Displaying values from stored object (data from education page)
for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    if (cvObj.educations[i].institute !== '' || cvObj.educations[i].degree_id !== '') {
        schoolQualityResult[i].textContent = cvObj.educations[i].institute + ', ' + `${cvObj.educations[i].degree_id === '' ? '' : educationTypesObj.find(obj => obj.id === cvObj.educations[i].degree_id).title}`
    }
    eductaionDateResult[i].textContent = `${cvObj.educations[i].due_date}`;
    aboutEducationResult[i].textContent = `${cvObj.educations[i].description}`;
}

for (let i = 0; i < storageGetItem('Person')['educations'].length; i++) {
    if (storageGetItem('Person')['educations'][i].degree_id !== '') {
        qualitySelected[i].style.color = '#000000'
    }
}


// EVENT HANDLERS
for (let i = 0; i < formBlock.length; i++) {
    schoolInput[i].addEventListener('keyup', function () {
        minTwoCheck(this);
        if (this.value === '') defaultInput(this)
        changeStorage(`institute`, this, i, 'educations')
        schoolQualityResult[i].textContent = `${schoolInput[i].value}, ${qualitySelected[i].textContent === 'აირჩიეთ ხარისხი' ? '' : qualitySelected[i].textContent}`
        if (qualitySelected[i].textContent === 'აირჩიეთ ხარისხი' && schoolInput[i].value === '') {
            schoolQualityResult[i].textContent = ''
        }
    });
    selectElement[i].addEventListener('click', function () {
        if (selectorPopUp[i].style.opacity === '0' || selectorPopUp[i].style.opacity === '') {
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
            degree_id: "",
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
            cvObj.educations[i].degree_id = educationTypesObj.find(obj => obj.title === qualitySelected[i].textContent).id
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
        // Convery Url to File
        function urltoFile(url, filename, mimetype) {
            return (fetch(url)
                .then(function (res) { return res.arrayBuffer(); })
                .then(function (buf) { return new File([buf], filename, { type: mimetype }) }))
        }
        let fileImage;
        urltoFile(storageGetItem('Person')['image'])
        .then(data => fileImage = data)
            .then(() => {
                // Create new FormData and append key/values
                let dataObj = new FormData()
                dataObj.append('name', storageGetItem('Person')['name'])
                dataObj.append('surname', storageGetItem('Person')['surname'])
                dataObj.append('email', storageGetItem('Person')['email'])
                dataObj.append('phone_number', storageGetItem('Person')['phone_number'].split(' ').join(''))
                dataObj.append('image', fileImage)
                dataObj.append('about_me', storageGetItem('Person')['about_me'])

                storageGetItem('Person')['experiences'].forEach((experience, i) => {
                    const experienceKeys = Object.keys(experience);
                    experienceKeys.forEach(key => dataObj.append(`experiences[${i}][${key}]`, experience[key]))
                })

                storageGetItem('Person')['educations'].forEach((experience, i) => {
                    const experienceKeys = Object.keys(experience);
                    experienceKeys.forEach(key => dataObj.append(`educations[${i}][${key}]`, experience[key]))
                })

                // Post data
                let dataRecieved;
                axios.post("https://resume.redberryinternship.ge/api/cvs", dataObj)
                    .then(response => response)
                    .then(data => dataRecieved = data)
                    .then(() => {
                        localStorage.removeItem('Person') // Removing data
                        dataRecieved = dataRecieved.data // Set dataRecieved value to data
                        document.querySelector('.main__wrapper').style.opacity = '0'
                        setTimeout(() => document.querySelector('.main__wrapper').style.display = 'none', 400)
                        
                        // Creating dom elements to display data 
                        for (let i = 0; i < dataRecieved['experiences'].length; i++) {
                            document.querySelector('#cv__experience_infos').insertAdjacentHTML('beforeend', lineHtml)
                            document.querySelector('#cv__experience_infos').insertAdjacentHTML('beforeend', cvInfoExperienceHtml)
                        }

                        for (let i = 0; i < dataRecieved['educations'].length; i++) {
                            document.querySelector('#cv__education_infos').insertAdjacentHTML('beforeend', lineHtml)
                            document.querySelector('#cv__education_infos').insertAdjacentHTML('beforeend', cvInfoEducationHtml)
                        }

                        // CV Elements
                        const cvWrapper = document.querySelector('.cv__wrapper')
                        const notification = document.querySelector('#notification')
                  
                        const cvName = document.querySelector('#cv__name')
                        const cvAbout = document.querySelector('#cv__about')
                        const cvImage = document.querySelector('#cv__image').firstElementChild;
                        const cvEmail = document.querySelector('#cv__email')
                        const cvNumber = document.querySelector('#cv__number')
                        const cvEmailIco = cvEmail.previousElementSibling;
                        const cvNumberIco = cvNumber.previousElementSibling;

                        let positionEmployerCv = document.getElementsByClassName('cv__position_employer')
                        let experienceDateCv = document.getElementsByClassName('cv__experience_date')
                        let aboutExperienceCv = document.getElementsByClassName('cv__aboutExperience')

                        let schoolQualityCv = document.getElementsByClassName('cv__school_quality')
                        let eductaionDateCv = document.getElementsByClassName('cv__education_date')
                        let aboutEducationCv = document.getElementsByClassName('cv__aboutEducation')

                        // Set data values to elements
                        cvName.textContent = `${dataRecieved.name} ${dataRecieved.surname}`;
                        cvAbout.textContent = `${dataRecieved.about_me}`;
                        cvEmail.textContent = `${dataRecieved.email}`;
                        cvNumber.textContent = `${dataRecieved.phone_number}`;
                        cvImage.src = `https://resume.redberryinternship.ge${dataRecieved.image}`;
                        cvImage.parentElement.style.display = 'inline-block';
                        cvEmailIco.src = 'images/email_icon.png';
                        cvNumberIco.src = 'images/number_icon.png';


                        // Displaying values from data (experiences)
                        for (let i = 0; i < dataRecieved['experiences'].length; i++) {
                            console.log(positionEmployerCv)
                            positionEmployerCv[i].textContent = `${dataRecieved.experiences[i].position + ', ' + dataRecieved.experiences[i].employer} `;
                            experienceDateCv[i].textContent = `${dataRecieved.experiences[i].start_date + ' - ' + dataRecieved.experiences[i].due_date} `;
                            aboutExperienceCv[i].textContent = `${dataRecieved.experiences[i].description}`;
                        }

                        // Displaying values from data (educations)
                        for (let i = 0; i < dataRecieved['educations'].length; i++) {
                            schoolQualityCv[i].textContent = `${dataRecieved.educations[i].institute + ', ' + dataRecieved.educations[i].degree}`;
                            eductaionDateCv[i].textContent = `${dataRecieved.educations[i].due_date}`;
                            aboutEducationCv[i].textContent = `${dataRecieved.educations[i].description}`;
                        }

                        // Notification event handler
                        notification.querySelector('img').addEventListener('click', function () {
                            notification.style.opacity = '0'
                            notification.style.zIndex = '-50'
                            setTimeout(() => {
                                notification.style.display = 'none'
                            }, 400)
                        })

                        // Data manipulation UI
                        delay(400)
                            .then(() => {
                                notification.style.display = 'block'
                                cvWrapper.style.display = 'flex'
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
                                notification.style.opacity = '1'
                                cvWrapper.style.opacity = '1'
                                blurPopUp.style.opacity = '0'
                                loadingPopUp.style.opacity = '0'
                                loadingPopUp.style.top = '-50%'
                                setTimeout(() => {
                                    blurPopUp.style.zIndex = '-99'
                                    loadingPopUp.style.zIndex = '-100'
                                    document.querySelector('html').style.overflow = 'unset';
                                    document.body.style.overflow = 'unset'
                                }, 400);
                            })
                    })
                    .catch(err => console.log(err))
            })

    }
})


