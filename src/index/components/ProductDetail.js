import { useParams, useHistory } from "react-router-dom";
import ProductService from "utils/ProductService";
import CartService from "utils/CartService";
import { useState, useEffect } from "react";
import UserType from 'common/UserType';
import './css/ProductDetail.css';

function ProductDetail(props) {
    let history = useHistory();
    let buyAble = history.location.state.buyAble;
    let user = props.user;
    let { productId } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [count, setCount] = useState(0); // 购买数量
    useEffect(() => {
        document.title = "商品详情";
        ProductService.getProductDetail(productId).then(res => setProductDetail(res.data));
    }, [])
    // 添加至购物车
    function handleEditCart() {
        let cartForm = {
            productId,
            ...productDetail,
            description: null,
            count: count
        }
        CartService.editCart(cartForm).then(res => console.log(res) || window.alert("添加成功"))
        .catch(err => console.log(err) || window.alert("添加失败"));
    }

    // 两个内部的子组件
    function BuyerOption() {
        return [
            buyAble ? 
            <button className="cart-btn" onClick={handleEditCart}>添加至购物车</button> : 
            <button disabled={true}>不可购买</button>
            ,
            productDetail.traded ? 
            <div key="old-price">已购买<br />当时购买价格：
                <ul>
                    {
                        productDetail.oldPriceList.map((price, index) => 
                            <li key={index}>￥{price}</li>
                        )
                    }
                </ul>
            </div> : null
        ]
    }
    
    function SellerOption() {
        return (
            <a href={`/publish/${productId}`}>编辑</a>
        )
    }

    return (
        <div className="p-container">
            <div className="wrapper">

                <div className="img-container">
                    <img src={productDetail.imgUrl}></img>
                </div>
                <div className="cnt">
                    <h2>{productDetail.name}</h2>
                    <span className="abstract">{productDetail.productAbstract}</span>
                    <div className="price">
                        <span className="unit">￥</span>
                        <span className="value">{productDetail.price}</span>
                    </div>
                    <div className="num">
                        <span>购买数量：</span><input type="number" value={count} onChange={(e) => {
                            // 简单的参数校验
                            let newCount = e.target.value;
                            if (newCount < 0) {
                                newCount = 0;
                            }
                            setCount(newCount)}
                            }></input>
                    </div>
                    <div>
                        {
                            user ? user.userType === UserType.BUYER ?
                                <BuyerOption></BuyerOption> :
                                <SellerOption></SellerOption> : ''
                        }
                    </div>
                </div>
            </div>
            <div className="full-desc">
                <div className="desc-title">
                    <h2>详细信息</h2>
                </div>
                <div className="detail">{productDetail.description}</div>
            </div>
        </div>
    )
}



export default ProductDetail;