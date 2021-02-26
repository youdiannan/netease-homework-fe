import { useState, useEffect } from 'react';
import CartService from 'utils/CartService';

function Cart() {
    console.log('cart')
    let cartData = [];
    useEffect(() => CartService.list().then(
        res => {
            cartData = res.data;
            document.title = "购物车"
        }
    ), [])
    let cartItems = cartData.map(item => <CartItem item={item} />);
    return (
        <div className="cart">
            <ul>
                {cartItems}
            </ul>
        </div>
    )
}

function CartItem(props) {
    let item = props.item;
    const [productCount, setProductCount] = useState(item.count);
    // 更新购物车
    function handleCountChange(e) {
        let newCount = e.target.value;
        if (newCount < 0) newCount = 0;
        setProductCount(newCount);
        CartService.editCart({
            ...item,
            count: productCount
        }).catch(err => {
            console.log(err);
            window.alert("更新失败")
        })
    }
    return (
        <li className="item">
            {/* 商品图片 */}
            <img src={item.imgUrl} className="p-img"></img>
            <div className="p-container">
                {/* 商品名 */}
                <span>{item.productName}</span>
                <span>单价: {item.price}</span>
                <div className="p-cnt">
                    {/* 修改商品数量 */}
                    <span>数量：</span>
                    <input type="number" onChange={handleCountChange}>{productCount}</input>
                </div>
            </div>
        </li>
    )
}

export default Cart;