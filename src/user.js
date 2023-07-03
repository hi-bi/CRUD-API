import {randomUUID} from 'crypto';

export const users = [];
export const apiUsers = '/api/users';

const newUserUUID = function () {
    return randomUUID();
};

export const putUser = function (user) {
    const updatedUser = users.find(item => item.id = user.uuid);

    if (updatedUser) {


    }

    return result;
};  


export const getUser = function (uuid) {
    const result = users.filter(item => item.id = uuid);

    return result;
};

export const newUser = function (user) {
        
    user.uuid = newUserUUID();
    users.push(user);

    return user;

};

export function checkUserData (user) {
    
    let check = {};

    if (user.username) {
        if (typeof user.username === 'string') {
            if (user.username.length === 0 ){
                check.error_username = 'Username is empty!'
            }

        } else {
            check.error_username = 'Wrong username type!'
        }
    } else {
        check.error_username = 'No username!'
    }

    if (user.age) {
        if (Number.isInteger(user.age)) {
            if (user.age <= 0 && user.age > 120) {
                check.error_age = 'Check age value!'
            }

        } else {
            check.error_age = 'Wrong age type!'
        }
    } else {
        check.error_age = 'No age!'
    }

    if (user.hobbies) {
        if (Array.isArray(user.hobbies) ) {
      
            if (user.hobbies.every(item => typeof item === "string")) {
            } else {
                check.error_hobbies = 'Check hobbies value type!'
            }
        } else {
            check.error_hobbies = 'Wrong hobbies type!'
        }
      } else {
        check.error_hobbies = 'No hobbies!'
      }

    return check;
}

export const getApiUsersUUID = function (url) {

    const uuid = url.replace(apiUsers+'/', '');
    if (isUUD(uuid)) {
        return uuid;
    } else {
        return '';
    }

};

const isUUD = function (arg) {

    const checkUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const result = checkUUID.test(arg);

    return result;
};

