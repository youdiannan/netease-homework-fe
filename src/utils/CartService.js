import axios from 'axios';
import DOMAIN_NAME from '../common/BasicConfig';


const CartService = {
    // 购物车列表
    // 为了跨域加了个withCredential，待改
    list () {
        return axios.get(DOMAIN_NAME + '/api/cart', {withCredentials: true}).then(res => res.data);
    },
    editCart (cartForm) {
        return axios.post(DOMAIN_NAME + '/api/cart', cartForm, {withCredentials: true}).then(res => res.data);
    },
    // 结算
    checkout () {
        return axios.get(DOMAIN_NAME + '/api/cart/checkout', {withCredentials: true}).then(res => res.data);
    }
}

export default CartService;