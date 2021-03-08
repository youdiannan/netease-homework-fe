import axios from 'axios';

const UserService = {
    // 用户登录
    login (loginForm) {
        return axios.post('/login', loginForm, {withCredentials: true}).then(res => res.data);
    },
    // 退出
    logout () {
        return axios.get('/logout', {withCredentials: true}).then(res => res.data);
    },
    // 获取当前登录用户信息
    getCurrentUser () {
        return axios.get('/user', {withCredentials: true}).then(res => res.data)
    },
}

export default UserService;