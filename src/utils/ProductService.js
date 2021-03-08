import axios from 'axios';

const ProductService = {
    // 商品列表
    list () {
        return axios.get("/product", {withCredentials: true}).then(res => res.data);
    },
    // 商品详情
    getProductDetail (productId) {
        return axios.get(`/product/${productId}`, {withCredentials: true}).then(res => res.data);
    },
    // 新增、编辑商品详情
    editProduct (publishForm) {
        return axios.post('/product', publishForm, {withCredentials: true}).then(res => res.data);
    },
    // 删除商品
    delete (productId) {
        return axios.delete(`/product/${productId}`, {withCredentials: true}).then(res => res.data);
    }
}

export default ProductService;