import '../scss/common.scss'
import '../scss/landing_page.scss'
import '../scss/signUp_and_logIn.scss'
import '../scss/resetCSS.scss'

import { showRegWindow, closeWindow } from '../modules/signup_tab'
import { showLoginWindow, closeLoginWindow } from '../modules/login_tab'
import { sendForm } from '../modules/user_registration'
import { getLoginList } from '../modules/exist_login_list'
import { setUserBar } from '../modules/user_login'
import { preloaderClose } from '../modules/preloader'
import { logOutBtn } from '../modules/login_out'


//preloader

setTimeout(preloaderClose, 1000)

//окно регистрации - включение, выключение, региcтрация

showRegWindow(sendForm);
closeWindow();

// окно авторизации - включение и выключение

showLoginWindow()
closeLoginWindow()

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
