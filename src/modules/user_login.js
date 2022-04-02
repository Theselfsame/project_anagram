import { usersData } from "./exist_login_list"
import { closeLoginWindow } from './login_tab'
import { logOutBtn } from './login_out'

let currentUser = {
    "login": "",
    "password": "-",
    "easyScore": '-',
    "mediumScore": '-',
    "hardScore": '-',
  };
function loginAction() {
    const nowLogin = document.querySelector('#name').value;
    const nowPass = document.querySelector('#pass').value;
    for (let user of usersData) {
        if (nowLogin == user.login &&  nowPass == user.password) {
            currentUser = user
            loginSuccess()
            setTimeout(closeLoginWindow, 1000)
        }
    }
}

function loginSuccess() {
    document.querySelector('.error-wrapper').innerHTML = `
    <span id='login-ready'>Добро пожаловать, <span id='user-name'>${currentUser.login}!</span></span>
    `
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        input.value = '';           
    }
    setUserBar(currentUser)
    logOutBtn()

}

const setUserBar = async(user = currentUser) => {
    if (!sessionStorage.userNow) {
        sessionStorage.removeItem('userNow')
        sessionStorage.userNow = JSON.stringify(currentUser)
    }
    user = JSON.parse(sessionStorage.userNow)
    let userName = document.createElement('p')
    document.querySelector('.person-logo').classList.add('person-logo-active')
    userName.classList.add('logo-name');
    userName.innerText = user.login;
    document.querySelector('.user-block').append(userName)
    showUserScore(user)
}

const showUserScore = (user = currentUser) => {
    console.log(user)
    document.querySelector('.tooltip-header').innerHTML = 'баллы'
    document.querySelector('.score-light').innerHTML = ''
    document.querySelector('.score-light').innerHTML = `лёгкий: ${user.easyScore}`;
    document.querySelector('.score-medium').innerHTML = '';
    document.querySelector('.score-medium').innerHTML = `средний: ${user.mediumScore}`;
    document.querySelector('.score-hard').innerHTML = '';
    document.querySelector('.score-hard').innerHTML = `сложный: ${user.hardScore}`;
}

export { showUserScore, loginAction, currentUser, setUserBar }