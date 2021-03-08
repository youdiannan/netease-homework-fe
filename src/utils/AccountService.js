import axios from 'axios';

const AccountService = {
    // 查看已购买的商品
    list () {
        return axios.get('/account', {withCredentials: true}).then(res => res.data);
    }
}

export default AccountService;