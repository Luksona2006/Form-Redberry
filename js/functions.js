export const delay = ms => new Promise(resolve => setTimeout(() => resolve(),ms))

export const randomMs = (max,min) => Math.floor((Math.random() * max) + min);

export const storageGetItem = function (Name) {
    return JSON.parse(localStorage.getItem(`${Name}`))
}

export const storageSetItem = function (Name, Item) {
    return localStorage.setItem(`${Name}`, JSON.stringify(Item))
}

let cvObj = JSON.parse(localStorage.getItem('Person'))

export const changeStorage = function (property, element, index, type = '') {
    if (type !== '') {
        cvObj = storageGetItem('Person')
        cvObj[type][index][property] = element.value
        storageSetItem('Person', cvObj)
    } else {
        cvObj = storageGetItem('Person')
        cvObj[property] = element.value
        storageSetItem('Person', cvObj)
    }
};

export const inputWrongSpan = function (input) {
    if (input.closest('.input__div').querySelector('span').classList.contains('verified__span')) input.closest('.input__div').querySelector('span').classList.replace('verified__span', 'wrong__span')
    else input.closest('.input__div').querySelector('span').classList.add('wrong__span');
    input.closest('.input__div').querySelector('img').src = 'images/wrong.png';
    input.closest('.input__div').querySelector('label').style.color = '#E52F2F';
    input.style.border = '2px solid #EF5050';
}

export const inputVerifiedSpan = function (input) {
    if (input.closest('.input__div').querySelector('span').classList.contains('wrong__span')) input.closest('.input__div').querySelector('span').classList.replace('wrong__span', 'verified__span')
    else input.closest('.input__div').querySelector('span').classList.add('verified__span');
    input.closest('.input__div').querySelector('img').src = 'images/verified.png'
    input.closest('.input__div').querySelector('label').style.color = '#000000'
    input.style.border = '2px solid #98E37E'
}

export const defaultInput = function (input) {
    if (input.closest('.input__div').querySelector('span')) {
        input.closest('.input__div').querySelector('span').classList.remove(`${input.closest('.input__div').querySelector('span').classList.contains('wrong__span') ? 'wrong__span' : 'verified__span'}`);
        input.closest('.input__div').querySelector('span').lastChild.src = '';
    }
    if(input.classList.contains('quality__selected')) input.value = '????????????????????? ?????????????????????'
    else input.value = ''
    input.closest('.input__div').querySelector('label').style.color = '#000000'
    input.style.border = '2px solid #BCBCBC';   
    
};

export const inputSimpleVerify = function (input) {
    if(input.classList.contains('quality__selected')) {
        if(input.textContent === '????????????????????? ?????????????????????') {
            input.closest('.select').style.border = '2px solid #EF5050'
            input.closest('.input__div').querySelector('label').style.color = '#EF5050';
        } else {
            input.closest('.select').style.border = '2px solid #98E37E'
            input.closest('.input__div').querySelector('label').style.color = '#000000'
        } 
    }else {
        if (input.value !== '') {
            input.style.border = '2px solid #98E37E'
            input.closest('.input__div').querySelector('label').style.color = '#000000'
        } else {
            input.style.border = '2px solid #EF5050'
            input.closest('.input__div').querySelector('label').style.color = '#EF5050';
        }
    }
};

export const minTwoCheck = function (input) {
    if (input.value.length < 2) inputWrongSpan(input)
    else inputVerifiedSpan(input)
};


export const inputVerified = function (input) {
    if(input.value !== '') input.style.border = '2px solid #98E37E'
}

export const geTwoCheck = function (element) {
    if(element.value.length >= 2 && /^[???-???]+$/.test(element.value)) {
        inputVerifiedSpan(element)
    } else {
        inputWrongSpan(element)
    }

};

export const emailCheck = function(element) {
    if(/^\w+@redberry.ge$/.test(element.value)) {
        inputVerifiedSpan(element)
    } else {
        inputWrongSpan(element)
    }
}

export const numberCheck = function(element) {
    if(/^(\+?995)?\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(element.value)) {
        inputVerifiedSpan(element)
    } else {
        inputWrongSpan(element)
    }
}

const loadingPopUp = document.querySelector('.loading__popUp')

export const loadingPopUpInner = function(paragraph, svg) {
    loadingPopUp.innerHTML = `<p>${paragraph}</p>
                              ${svg}`
}

export const personalPageInputs = function() {
    const emailResult = document.querySelector('#result__email')
    const numberResult = document.querySelector('#result__number')
    const emailIco = emailResult.previousElementSibling;
    const numberIco = numberResult.previousElementSibling;
    const imageResult = document.querySelector('.form__image').firstElementChild;
    const nameResult = document.querySelector('#result__name')
    const aboutResult = document.querySelector('#result__about')

    nameResult.textContent = `${cvObj.name} ${cvObj.surname}`
    aboutResult.textContent = `${cvObj.about_me}`
    aboutResult.previousElementSibling.textContent = `${cvObj.about_me === '' ? '' : '????????? ?????????????????????'}`
    emailResult.textContent = `${cvObj.email}`
    numberResult.textContent = `${cvObj.phone_number}`
    imageResult.src = `${cvObj.image}`
    imageResult.parentElement.style.display = cvObj.image === '' ? 'none' : 'inline-block';
    emailIco.src = `${cvObj.email === '' ? '' : 'images/email_icon.png'}`
    numberIco.src = `${cvObj.phone_number === '' ? '' : 'images/number_icon.png'}`
}