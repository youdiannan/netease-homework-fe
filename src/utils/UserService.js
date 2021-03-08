import axios from 'axios';
import DOMAIN_NAME from '../common/BasicConfig';

const UserService = {
    // 用户登录
    login (loginForm) {
        return axios.post(DOMAIN_NAME + '/api/login', loginForm, {withCredentials: true}).then(res => res.data);
    },
    // 退出
    logout () {
        return axios.get(DOMAIN_NAME + '/api/logout', {withCredentials: true}).then(res => res.data);
    },
    // 获取当前登录用户信息
    getCurrentUser () {
        return axios.get(DOMAIN_NAME + '/api/user', {withCredentials: true}).then(res => res.data)
    },
}

export default UserService;