import axios from 'axios';
import BaseConfig from '../common/BasicConfig';

let ENV = BaseConfig.ENV;

const ProductService = {
    // 商品列表
    list () {
        if (ENV === 'dev') {
            return axios.get('http://localhost:8080/api/product', {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get('/api/product').then(res => res.data);
        }
    },
    // 商品详情
    getProductDetail (productId) {
        if (ENV === 'dev') {
            return axios.get(`http://localhost:8080/api/product/${productId}`, {withCredentials: true}).then(res => res.data);
        } else {
            return axios.get(`/api/product/${productId}`).then(res => res.data);
        }
    },
    // 新增、编辑商品详情
    editProduct (publishForm) {
        if (ENV === 'dev') {
            return axios.post('http://localhost:8080/api/product', publishForm, {withCredentials: true}).then(res => res.data);
        } else {
            return axios.post('/api/product', publishForm).then(res => res.data);
        }
    },
    // 删除商品
    delete (productId) {
        if (ENV === 'dev') {
            return axios.delete(`http://localhost:8080/api/product/${productId}`, {withCredentials: true}).then(res => res.data);
        } else {
            return axios.delete(`/api/product/${productId}`).then(res => res.data);
        }
    }
}

export default ProductService;