import '../scss/common.scss'
import '../scss/signUp_and_logIn.scss'
import '../scss/resetCSS.scss'
import '../scss/play_page.scss'

import { showRegWindow, closeWindow } from '../modules/signup_tab'
import { setDifficultyBtn } from "../modules/play_action";
import { returnToLanding } from "../modules/landing_return";
import { sendForm } from '../modules/user_registration'
import { showLoginWindow, closeLoginWindow } from '../modules/login_tab'
import { getLoginList } from '../modules/exist_login_list'
import { setUserBar } from '../modules/user_login';
import { preloaderClose } from '../modules/preloader'
import { logOutBtn } from '../modules/login_out'

//preloader

setTimeout(preloaderClose, 1000)

//возврат на landing page
returnToLanding()

//окно регистрации - включение и выключение
showRegWindow(sendForm);
closeWindow();

// окно авторизации - включение и выключение

showLoginWindow()
closeLoginWindow()


//уровень сложности
setDifficultyBtn();

//получение текущего списка пользователей
getLoginList()

//получение данных активированного пользователя из sessionStorage

if (sessionStorage.userNow) {
    const user = JSON.parse(sessionStorage.userNow)
    setUserBar(user)
}
if (sessionStorage.userNow) {
    document.querySelector('.nav-login').classList.add('btn-disable')
    logOutBtn()
}

