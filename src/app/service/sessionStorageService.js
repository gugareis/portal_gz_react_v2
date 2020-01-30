export const user = '_user'
export default class SessionStorageService {
    static addItem (key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    }
    static getItem(key){
        return sessionStorage.getItem(key);
    }
    static removeItem(){
        sessionStorage.removeItem(user);
    }
}