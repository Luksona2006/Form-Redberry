// Requst Popup elements
const delay = ms => new Promise(resolve => setTimeout(() => resolve(),ms))

const requestPopUp = document.querySelector('#requestPopUp');
const dontVerify = document.querySelector('#dontVerify');
const verify = document.querySelector('#verify')
const blurPopUp = document.querySelector('.blurPopUp')
const removeStorage = document.querySelector('.button__back')

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
    delay(500)
    .then(() => {
        window.location.replace('index.html');
        return false;
    })
})

dontVerify.addEventListener('click', function() {
    requestPopUp.style.opacity = '0'
    requestPopUp.style.top = '-50%'
    blurPopUp.style.opacity = '0'
    setTimeout(() => blurPopUp.style.zIndex = '-99', 400)
    document.querySelector('html').style.overflow = 'unset'
    document.body.style.overflow = 'unset'
})