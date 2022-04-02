import { loginAction } from "./user_login";

const loginButton = document.querySelector('.nav-login')
let mainloginWindow = document.createElement('div');
mainloginWindow.classList.add('regWindow')
mainloginWindow.innerHTML = `
<div class="innerWindow reg-wrapper">
    <p id="reg-header">Авторизация игрока</p>
    <div class="form">
        <label>Введите логин:</label>
        <input type="text" class="textForm" id="name">
    </div>
    <div class="form">
        <label>Введите пароль:</label>
        <input type="text" class="textForm" id="pass">
    </div>
    <div class="error-wrapper"></div>
    <div id="btn-wrapper">
        <button class="btn login-btn">Вход</button>
        <button class="btn exit-btn">Отмена</button>
    </div>
</div>
`
//отображение окна регистрации
function showLoginWindow() {
    
    document.querySelector('.container').classList.add('container-hide')
    document.querySelector('#body').append(mainloginWindow)
    document.querySelector('.login-btn').addEventListener('click', loginAction)
    document.querySelector('.exit-btn').addEventListener('click', closeLoginWindow)
}
loginButton.addEventListener('click', showLoginWindow);

//скрытие окна регистрации
function closeLoginWindow() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        input.value = '';           
    }
    document.querySelector('.error-wrapper').innerHTML = '';
    document.querySelector('.regWindow').remove();
    document.querySelector('.container').classList.remove('container-hide')
}

export { showLoginWindow, closeLoginWindow }