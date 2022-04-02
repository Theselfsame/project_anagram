import { savePositionTask } from "./save_score";

const WORDS_API = 'http://localhost:8080/api/words/words';
const WORD_FROM_DATA = 'http://localhost:3005/words'

//переменные счетчика ответов

let count;
let wrong;
let gameLevel;

//Запуск игры - кнопка старт

function startBtn(level) {
    gameLevel = level
    document.querySelector('#play-wrapper').innerHTML= '';
    document.querySelector('#play-wrapper').innerHTML= `
    <button class='start-btn'>старт!</button>
    `;
    document.querySelector('.start-btn').addEventListener('click', () => {
        startGame()
        setWordList(level)
            count = 0;
            wrong = 0;
            timeAction()
    })
} 

//отображение содержимого игрового блока

function startGame() {
    document.querySelector('#play-wrapper').innerHTML= '';
    document.querySelector('#play-wrapper').innerHTML= `
    <p id="task-text">Выберите один из предложенных вариантов анаграмм к заданному слову.</p>
                <div class="firstword-wrapper word-wrapper">
                    <span class="word-given">
                    </span>
                </div>
                <div class="anagram-wrapper">
                    <button class="anagram-btn"><span class="anagram choose-btn-1" data-num="1"></span></button>
                    <button class="anagram-btn"><span class="anagram choose-btn-2" data-num="2"></span></button>
                    <button class="anagram-btn"><span class="anagram choose-btn-3" data-num="3"></span></button>
                    <button class="anagram-btn"><span class="anagram choose-btn-4" data-num="4"></span></button>
                </div>
    `;
}

/* выбор уровня сложности */

function setDifficultyBtn () {
    document.querySelector('.btn-light').addEventListener('click', () => {
        startBtn('easy')
    })
    document.querySelector('.btn-medium').addEventListener('click', () => {
        startBtn('medium')
    })
    document.querySelector('.btn-hard').addEventListener('click', () => {
        startBtn('hard')
    })
}


const getWord = async () => {
    try {
        const res = await fetch('http://localhost:3005/words')
        return res.json();
    } catch (err) {
        throw new Error(`You got an error: ${err}`)
    }
}

// переменная списка слов

let wordList = [];

// запись полученного списка слов

const setWordList = async (difficulty) => {
    const currentWordList = await getWord();
    wordList = currentWordList[`${difficulty}`];
    setCurrentWord(wordList)
}

//классы анаграмм

class Anagram {
    constructor(word) {
        this.word = word;
    }
    trueWord() {
            let newWord = this.word.split('').sort(() => Math.random() - 0.5).join('')
            if (newWord == this.word) {
                return newWord.split('').reverse().join('')
            } else {
                return newWord
            }
    }
    wrongWord() {
        const lettersList = 'йцукенгшщзхфывапролджэячсмитьбюъ'
        let sortedWord = this.word.split('') 
            sortedWord.sort(() => Math.random() - 0.5)
            let sortNum = Math.floor(Math.random() * (lettersList.length - 0) + 0)
            if (sortedWord[0] != lettersList[sortNum]) {
                sortedWord[0] = lettersList[sortNum]
            } else if (sortedWord[0] == lettersList[sortNum]) {
                sortedWord[0] = lettersList[sortNum + 1]
            }
            sortedWord.sort(() => Math.random() - 0.5)
        return sortedWord.join(''); 
    }
}


//запись слова загадки и четырёх анаграмм

let trueButtonNum;

const setCurrentWord = (listOfWords, flag = false) => {
    document.querySelector('.word-given').innerHTML ='';     
    let currentWordNum = Math.floor(Math.random() * (listOfWords.length - 0) + 0);   //случайный номер слова в массиве слов
    const currentWord = `${listOfWords[currentWordNum]}`                                 //запись в переменную слова по номеру массива
    document.querySelector('.word-given').innerHTML = currentWord;                       //запись Заданного слова в html
    let anagram = new Anagram(currentWord)                                               // объект класса Anagram
    let [trueWord, wrong1, wrong2, wrong3] =
        [`${anagram.trueWord()}`, `${anagram.wrongWord()}`,`${anagram.wrongWord()}`,`${anagram.wrongWord()}`]
    let [one, two, three, four] = [0,1,2,3].sort(() => Math.random() - 0.5)               //запись номеров кнопок в переменные - В случайном порядке 
    let buttonList = document.querySelectorAll('.anagram')
   
    buttonList.forEach((item) => {
        item.innerHTML ='';
    })
    trueButtonNum = buttonList[one].dataset.num;   //номер правильной кнопки по датасету

    buttonList[one].innerHTML = `${trueWord}`    
    buttonList[two].innerHTML = `${wrong1}`
    buttonList[three].innerHTML = `${wrong2}`
    buttonList[four].innerHTML = `${wrong3}`

        activateBtn(trueButtonNum)
}       

//кнопки выбора варианта ответа

function activateBtn(trueButtonNum = trueButtonNum) {
    document.querySelectorAll('.anagram').forEach((btn) => {
        btn.parentElement.onclick = function start() {
            if (btn.dataset.num == trueButtonNum) {
                count++
                btn.parentElement.style.backgroundColor= 'lightgreen'
                setTimeout(()=> {btn.parentElement.style.backgroundColor= '#4C676A'}, 100)
                setCurrentWord(wordList, true)
            } else {
                wrong += 2;
                btn.parentElement.style.backgroundColor= 'lightcoral'
                setTimeout(()=> {btn.parentElement.style.backgroundColor= '#4C676A'}, 100)
                setCurrentWord(wordList, true)
            }
        }
    })
}

/* счетчик игры */

function timeAction() {
    let timer = 20;
    let timeAlert = document.createElement('p')
    timeAlert.classList.add('timer')

    document.querySelector('#play-wrapper').append(timeAlert)
    setTimeout(stopGame, 20000)
    setInterval(()=> {
        timeAlert.innerText ='';
        timeAlert.innerText = `время: ${timer}`
        timer--;
        if (timer < 0) {
            timer = 0;
        }
    }, 1000)
}

let result;

function stopGame() {
    if (count - wrong <= 0) {
        result = 0;
    } else {
        result = (count - wrong)           //данные для записи в счет
    }
    document.querySelector('#play-wrapper').innerHTML= '';
    document.querySelector('#play-wrapper').innerHTML= `
    <h2 class='result'>Количество набранных очков: ${result} </h2>
    <button class='start-btn'>старт!</button>
    `;
    if (sessionStorage.userNow) {
        let user = JSON.parse(sessionStorage.userNow)
        let score = user[`${gameLevel}Score`]
        let level = `${gameLevel}Score`;
        let userId = user.id
        if (result > score) {
            savePositionTask(userId, result, level)
        }
    }

    document.querySelector('.start-btn').addEventListener('click', () => {
        startGame()
        setWordList(gameLevel)
            count = 0;
            wrong = 0;
            timeAction()
    })
}

export { setDifficultyBtn }