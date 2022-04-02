import { getUserList } from "./set_score";
import { showUserScore } from "./user_login";

const USER_URL = 'http://localhost:3005/user';

let loginList = []
let usersData;

const getLoginList = (userId) => {
    fetch(USER_URL)
    .then (
        res => {
            return res.json()
        }
    ).then(
        data => {
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
