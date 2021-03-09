import axios from 'axios';
import BaseConfig from '../common/BasicConfig';

let ENV = BaseConfig.ENV;

const UserService = {
    // 用户登录
    login (loginForm) {
        if (ENV === 'dev') {
            return axios.post('http://localhost:8080/api/login', loginForm, {withCredentials: true}).then(res => res.data);
        } else {
            return axios.post('/api/login', loginForm).then(res => res.data);
        }
    },
    // 退出
    logout () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/logout', {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get('/api/logout').then(res => res.data);
        }
    },
    // 获取当前登录用户信息
    getCurrentUser () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/user', {withCredentials: true}).then(res => res.data)
        } else {
            return axios.get('/api/user').then(res => res.data)
        }
    },
}

export default UserService;