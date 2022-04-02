import { getLoginList } from "./exist_login_list"

const LOCAL_DATA = 'https://raw.githubusercontent.com/Theselfsame/project_anagram/main/src/data/data.json'
/* const USER_URL = 'http://localhost:3005/user' */

const savePositionTask = async(userId, result, level) => {
    let settings;
    if (level == 'easyScore') {
        settings = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                easyScore: result
            })
        }
    } 
    if (level == 'mediumScore') {
        settings = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                user : JSON.stringify({
                    mediumScore: result
                })
            }
        }
    }
    if (level == 'hardScore') {
        settings = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hardScore: result
            })
        }
    }
    try {
        const fetchResult = await fetch(LOCAL_DATA, settings);
        const data = await fetchResult.json();
        getLoginList(userId)
        return data;
    } catch (e) {
        console.log(e);
    }
} 

export { savePositionTask }