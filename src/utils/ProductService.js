import axios from 'axios';
import DOMAIN_NAME from '../common/BasicConfig';

const ProductService = {
    // 商品列表
    list () {
        return axios.get(DOMAIN_NAME + "/api/product", {withCredentials: true}).then(res => res.data);
    },
    // 商品详情
    getProductDetail (productId) {
        return axios.get(DOMAIN_NAME + `/api/product/${productId}`, {withCredentials: true}).then(res => res.data);
    },
    // 新增、编辑商品详情
    editProduct (publishForm) {
        return axios.post(DOMAIN_NAME + '/api/product', publishForm, {withCredentials: true}).then(res => res.data);
    },
    // 删除商品
    delete (productId) {
        return axios.delete(DOMAIN_NAME + `/api/product/${productId}`, {withCredentials: true}).then(res => res.data);
    }
}

export default ProductService;