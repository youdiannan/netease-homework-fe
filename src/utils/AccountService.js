import axios from 'axios';
import DOMAIN_NAME from '../common/BasicConfig'

const AccountService = {
    // 查看已购买的商品
    list () {
        return axios.get(DOMAIN_NAME + '/api/account', {withCredentials: true}).then(res => res.data);
    }
}

export default AccountService;