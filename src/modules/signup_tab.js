const regButton = document.querySelector("#reg")
let mainWindow = document.createElement('div');
mainWindow.classList.add('regWindow')
mainWindow.innerHTML = ''
mainWindow.innerHTML = `
<div class="innerWindow reg-wrapper">
    <p id="reg-header">Регистрация игрока</p>
    <div class="form">
        <label>Введите логин:</label>
        <input type="text" class="textForm" id="name">
    </div>
    <div class="form">
        <label>Введите пароль:</label>
        <input type="text" class="textForm" id="pass">
    </div>
    <div class="form">
        <label>Повторите пароль:</label>
        <input type="text" class="textForm" id="repeatePass">
    </div>
    <div class="error-wrapper"></div>
    <p id="reg-annotation">Примечание: допустимы латинские буквы и цифры. Не более 8 символов.</p>
    <div id="btn-wrapper">
        <button class="btn reg-btn">Регистрация</button>
        <button class="btn exit-btn">Отмена</button>
    </div>
</div>
`
//отображение окна регистрации
function showRegWindow(sendForm) {
    document.querySelector('.container').classList.add('container-hide')
    document.querySelector('#body').append(mainWindow)
    document.querySelector('.exit-btn').addEventListener('click', closeWindow)
    document.querySelector('.reg-btn').addEventListener('click', sendForm)
}
regButton.addEventListener('click', showRegWindow);

//скрытие окна регистрации
function closeWindow() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        input.value = '';           
    }
    document.querySelector('.error-wrapper').innerHTML = '';
    document.querySelector('.regWindow').remove();
    document.querySelector('.container').classList.remove('container-hide')
}

export { showRegWindow, closeWindow }