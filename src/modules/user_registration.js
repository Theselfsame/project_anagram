import { chechForm } from "./login_check";
import { closeWindow } from "./signup_tab";
import { getLoginList } from "./exist_login_list";

const USER_URL = 'http://localhost:3005/user'

const sendForm = async() => {
    if(chechForm()) {                                           //проверка на валидность формы
        const userLogin = document.querySelector('#name').value;
        const userPass =document.querySelector('#pass').value
        const data = {
            login: userLogin,
            password: userPass,
            easyScore: 0,
            mediumScore: 0,
            hardScore: 0,
        };
    
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            const response = await fetch(USER_URL, settings);
            const data = await response.json()
            regSuccess()
            setTimeout(closeWindow, 1000)
    
        } catch (error) {
            console.log(error)
        }
    }

}

function regSuccess() {
    document.querySelector('.error-wrapper').innerHTML = `
        <span id='reg-ready'>вы успешно зарегистрировались</span>
    `
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        input.value = '';           
    }
    getLoginList()
}

export { sendForm }