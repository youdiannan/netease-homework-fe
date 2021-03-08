import axios from 'axios';

const CartService = {
    // 购物车列表
    list () {
        return axios.get('/cart', {withCredentials: true}).then(res => res.data);
    },
    editCart (cartForm) {
        return axios.post('/cart', cartForm, {withCredentials: true}).then(res => res.data);
    },
    // 结算
    checkout () {
        return axios.get('/cart/checkout', {withCredentials: true}).then(res => res.data);
    }
}

export default CartService;