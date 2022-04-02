import { loginList } from "./exist_login_list";

//проверка пустой строки
function checkEmptyLine() {
    let flag = true;
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        if (input.value.trim() == '') {
            flag = false
        }
    }
    return flag
}

//проверка символов ввода

function checkSymbols() {
    let flag = true;
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        if (input.value.match(/\W\S/g)) {
            flag = false
        }
    }
    return flag
}

//проверка от 4 до 8 символов

function checkLength() {
    let flag = true;
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        if (input.value.length > 8 || input.value.length < 4) {
            flag = false
        }
    }
    return flag
}

//проверка совпадения ввода пароля

function checkMatchPas() {
    let flag = true;
    let inputs = document.getElementsByTagName('input')
        if (inputs[1].value != inputs[2].value) {
            flag = false
        }
    return flag
}

//проверка повтора логина

 function checkLoginRepeat() {
    let flag = true;
    let input = document.querySelector('#name').value
    for (let login of loginList) {
        if (login == input) {
            flag = false;
        }
    }
    return flag
} 


function chechForm() {
    let flag = true;
    let errorContainer = document.querySelector('.error-wrapper')
    errorContainer.innerHTML = ''
    if (!checkEmptyLine()) {
        errorContainer.innerHTML += `<span class='error-text'>заполните все поля!</span>`;
        flag = false;
    }
    if (!checkSymbols()) {
        errorContainer.innerHTML += `<span class='error-text'>только латинские буквы и цифры, без пробелов!</span>`;
        flag = false;
    }
    if (!checkLength()) {
        errorContainer.innerHTML += `<span class='error-text'>количество символов должно быть от 4 до 8!</span>`;
        flag = false;
    }
    if (!checkMatchPas()) {
        errorContainer.innerHTML += `<span class='error-text'>пароли не совпадают!</span>`;
        flag = false;
    }
    if (!checkLoginRepeat()) {
        errorContainer.innerHTML += `<span class='error-text'>такой ЛОГИН уже существует!</span>`;
        flag = false;
    } 
    return flag;
}


export { chechForm }