import axios from 'axios';

const CartService = {
    // 购物车列表
    list () {
        return axios.get('http://localhost:8080/cart', {withCredentials: true}).then(res => res.data);
    },
    editCart (cartForm) {
        return axios.post('http://localhost:8080/cart', cartForm, {withCredentials: true}).then(res => res.data);
    },
    // 结算
    checkout () {
        return axios.get('http://localhost:8080/cart/checkout', {withCredentials: true}).then(res => res.data);
    }
}

export default CartService;