import { getUserList } from "./set_score";
import { showUserScore } from "./user_login";

const LOCAL_DATA = 'https://raw.githubusercontent.com/Theselfsame/project_anagram/main/src/data/data.json'

let loginList = []
let usersData;

const getLoginList = (userId) => {
    fetch(LOCAL_DATA)
    .then (
        res => {
            return res.json()
        }
    ).then(
        data => {
            data = data.user
            usersData = data
            data.forEach(element => {
                loginList.push(element.login);
            });
            getUserList(data)
            if (userId) {
                for (let user of data) {
                    if (user.id == userId) {
                        let currentUser = {
                            "login": user.login,
                            "easyScore": user.easyScore,
                            "mediumScore": user.mediumScore,
                            "hardScore": user.hardScore,
                                   "id": user.id
                          };
                          sessionStorage.removeItem('userNow')
                          sessionStorage.userNow = JSON.stringify(currentUser)
                          showUserScore(currentUser)
                    }
                }
            }
        }
    )
    .catch (
        error => {
            console.log(error)
        }
    )
}

export { getLoginList, usersData, loginList }
