import { getLoginList } from "./exist_login_list"

const USER_URL = 'http://localhost:3005/user'

const savePositionTask = async(userId, result, level) => {
    console.log(userId)
    console.log(result)
    console.log(level)
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
            body: JSON.stringify({
                mediumScore: result
            })
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
        const fetchResult = await fetch(`${USER_URL}/${userId}`, settings);
        const data = await fetchResult.json();
        getLoginList(userId)
        return data;
    } catch (e) {
        console.log(e);
    }
} 

export { savePositionTask }