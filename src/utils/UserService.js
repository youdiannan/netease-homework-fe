import axios from 'axios';

const UserService = {
    // 用户登录
    login (loginForm) {
        return axios.post('http://localhost:8080/login', loginForm, {withCredentials: true}).then(res => res.data);
    },
    // 退出
    logout () {
        return axios.get('http://localhost:8080/logout', {withCredentials: true}).then(res => res.data);
    },
    // 获取当前登录用户信息
    getCurrentUser () {
        return axios.get('http://localhost:8080/user', {withCredentials: true}).then(res => res.data)
    },
}

export default UserService;