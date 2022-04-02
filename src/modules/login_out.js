function logOutBtn() {
    document.querySelector('.nav-login').classList.add('btn-disable')
    const logOut = document.createElement('button')
    logOut.innerHTML= 'выход'
    logOut.classList.add('log-out')
    document.querySelector('.user-block').append(logOut)
    logOut.addEventListener('click', () => {
        sessionStorage.removeItem('userNow');
        location.reload()
    })
}


export { logOutBtn }