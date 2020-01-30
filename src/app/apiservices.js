import axios from 'axios'

const username = `${process.env.REACT_APP_USER_NAME}`
const userpassword = `${process.env.REACT_APP_USER_PASSWORD}`
const httpClient = axios.create (
    {
        baseURL : `${process.env.REACT_APP_USER_URL}`,
        headers : { 
            authorization: 'Basic ' + window.btoa(username + ":" + userpassword)
        }
    }
)

class ApiService {
    constructor (apiurl){
        this.apiurl = apiurl;
    }
    post(url,objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.post(requestUrl,objeto);
    }
    put(url,objeto){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.put(requestUrl,objeto);
    }
    delete(url){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.post(requestUrl);
    }
    get(url){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.get(requestUrl);
    }
}
export default ApiService