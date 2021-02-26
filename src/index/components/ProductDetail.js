import { useParams } from "react-router-dom";
import ProductService from "utils/ProductService";
import UserService from "utils/UserService";
import CartService from "utils/CartService";
import { useState, useEffect } from "react";
import UserType from 'common/UserType';

function ProductDetail() {
    let { productId } = useParams();
    const [productDetail, setProductDetail] = useState({});
    let user = {}
    useEffect(() => {
        ProductService.getProductDetail(productId).then(res => setProductDetail(res));
        UserService.getCurrentUser().then(res => user = res.data);
    })
    
    // 添加至购物车
    function handleEditCart() {
        let cartForm = {
            productId: productDetail.id,
            count: productDetail.count
        }
        CartService.addToCart(cartForm);
    }

    return (
        <div class="p-container">
            <div class="img-container">
                <img src={productDetail.imgUrl}></img>
            </div>
            <div class="cnt">
                <h2>{productDetail.name}</h2>
                <div class="price">
                    <span class="unit">￥</span>
                    <span class="value">{productDetail.Price}</span>
                </div>
                <div class="num">
                    <span>购买数量：</span><input type="number" value={productDetail.count} onChange={(e) => setProductDetail({
                        ...productDetail,
                        count: e.target.value
                    })}></input>
                </div>
                <div>
                    {
                        user.userType == UserType.BUYER ? 
                        <BuyerOption bought={productDetail.bought} price={productDetail.price} handleEditCart={handleEditCart}></BuyerOption> :
                        <SellerOption productId={productDetail.id}></SellerOption>
                    }
                </div>
            </div>
        </div>
    )
}

function BuyerOption(props) {
    let handleEditCart = props.handleEditCart;
    return props.bought ?
    (
        <button onClick={handleEditCart}>添加至购物车</button>
    ):
    (
        [
            <button disabled="true" class="disabled">已购买</button>,
            <span>当时购买价格：￥{props.price}</span>
        ]
    )
}

function SellerOption(props) {
    return (
        <a href={`/product/${props.productId}`}>编辑</a>
    )
}

export default ProductDetail;