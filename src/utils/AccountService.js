import axios from 'axios';
import BaseConfig from '../common/BasicConfig';

let ENV = BaseConfig.ENV;

const AccountService = {
    // 查看已购买的商品
    list () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/account', {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get('/api/account').then(res => res.data);
        }
    }
}

export default AccountService;