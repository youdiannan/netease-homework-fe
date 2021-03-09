import axios from 'axios';
import BaseConfig from '../common/BasicConfig';

let ENV = BaseConfig.ENV;


const CartService = {
    // 购物车列表
    // 为了跨域加了个withCredential，待改
    list () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/cart', {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get('/api/cart').then(res => res.data);
        }
    },
    editCart (cartForm) {
        if (ENV === 'dev') {
            return axios.post('http://localhost:8080/api/cart', cartForm, {withCredentials: true}).then(res => res.data);
        } else {
            return axios.post('/api/cart', cartForm).then(res => res.data);
        }
    },
    // 结算
    checkout () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/cart/checkout', {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get('/api/cart/checkout').then(res => res.data);
        }
    }
}

export default CartService;