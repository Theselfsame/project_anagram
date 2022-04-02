const getUserList = async (data) => {
    data = await data
    if (document.querySelector('.result-wrapper')) {
        SetScore(data)
    }
}

const SetScore = async(data) => {
    let uselList = []
    for (let user of data) {
        uselList.push(user)
    }
    let topFive = uselList.sort((b, a) => {
        return ((a.easyScore + a.mediumScore + a.hardScore) - (b.easyScore + b.mediumScore + b.hardScore))
    })
    topFive = topFive.slice(0, 5)
    let topEasy = uselList.sort((b, a) => {
        return ((a.easyScore) - (b.easyScore))
    })
    let topMedium = uselList.sort((b, a) => {
        return ((a.mediumScore) - (b.mediumScore))
    })
    let topHard = uselList.sort((b, a) => {
        return ((a.hardScore) - (b.hardScore))
    })
    setTopFive(topFive)
    setEasy (topEasy)
    setMedium (topMedium) 
    setHard (topHard) 
}

function setTopFive(topFive) {
    document.querySelector('.show-topfive').innerHTML = '';
    topFive.forEach(topUser => {
        document.querySelector('.show-topfive').innerHTML += `
            <div class='top-gamer'>
                <p class='user-name'>${topUser.login}:</p>
                <p class ='score-wrapper'>
                <span class='user-score'>Лёгкий: ${topUser.easyScore}</span>
                <span class='user-score'>Средний: ${topUser.mediumScore}</span>
                <span class='user-score'>Сложный: ${topUser.hardScore}</span>
                </p>
            </div>
        `
    });
}

function setEasy (topEasy) {
    document.querySelector('.show-easy').innerHTML = '';
    topEasy.forEach(topEasy => {
        document.querySelector('.show-easy').innerHTML += `
            <div class= 'column-wrapper'>
                <p class='user-name'>${topEasy.login}:</p>
                <p class ='score-wrapper'>
                <span class='user-score'>${topEasy.easyScore}</span>
                </p>
            </div>
        `
    });
}

function setMedium (topMedium) {
    document.querySelector('.show-medium').innerHTML = '';
    topMedium.forEach(topMedium => {
        document.querySelector('.show-medium').innerHTML += `
            <div class= 'column-wrapper'>
                <p class='user-name'>${topMedium.login}:</p>
                <p class ='score-wrapper'>
                <span class='user-score'>${topMedium.mediumScore}</span>
                </p>
            </div>
        `
    });
}

function setHard (topHard) {
    document.querySelector('.show-hard').innerHTML = '';
    topHard.forEach(topHard => {
        document.querySelector('.show-hard').innerHTML += `
            <div class= 'column-wrapper'>
                <p class='user-name'>${topHard.login}:</p>
                <p class ='score-wrapper'>
                <span class='user-score'>${topHard.hardScore}</span>
                </p>
            </div>
        `
    });
}

export { getUserList, SetScore }