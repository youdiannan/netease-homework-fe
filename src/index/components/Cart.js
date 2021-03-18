import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartService from 'utils/CartService';
import './css/Cart.css';
import { Button, InputNumber, List, message } from 'antd';

function Cart() {
    let history = useHistory();
    const [cart, setCart] = useState({
        userId: null,
        cartItems: [],
        totalPrice: 0
    });
    useEffect(() => CartService.list().then(
        res => {
            setCart(res.data);
            document.title = "购物车"
        }
    ), [])

    function handlePay() {
        if (!cart.cartItems || cart.cartItems.length === 0) {
            message.warning("购物车是空的！", 2);
            return;
        }
        CartService.checkout().then(() => {
            setCart({
                cart,
                cartItems: []
            })
            message.success("结算成功")
        }).catch(err => message.error("结算失败"))
    }

    // 更新购物车
    function handleCountChange(index) {
        return function (v) {
            let newCount = v;
            setCart({
                ...cart,
                cartItems: cart.cartItems.splice(index, 1, {
                    ...cart.cartItems[index],
                    count: newCount
                })
            })
            CartService.editCart({
                ...cart.cartItems[index],
                count: cart.cartItems[index].count
            }).then(() => {
                let newTotalPrice = 0;
                for (let item of cart.cartItems) {
                    newTotalPrice += item.count * item.price;
                }
                if (newCount === 0) {
                    let cartItems = cart.cartItems;
                    let newCartItems = []
                    for (let i = 0; i < cartItems.length; i++) {
                        if ( i !== index ) newCartItems.push(cartItems[i]);
                        setCart({
                            ...cart,
                            cartItems: newCartItems,
                            totalPrice: newTotalPrice
                        })
                    }
                } else {
                    setCart({
                        ...cart,
                        totalPrice: newTotalPrice
                    })
                }
            }).catch(err => {
                console.log(err);
                window.alert("更新失败")
            })
        }
    }

    return (
        <div className="cart">
            <div className="c-head">
                <h2>已添加到购物车的内容</h2>
            </div>
            <List dataSource={cart.cartItems}
                renderItem={
                    (cartItem, index) => (
                        <li key={index} className="item">
                            {/* 商品图片 */}
                            <img src={cartItem.imgUrl} className="p-img" onClick={() => history.push({
                                pathname: `/product/${cartItem.productId}`,
                                state: { buyAble: true }
                            })}></img>
                            <div className="p-container">
                                {/* 商品名 */}
                                <h4>{cartItem.name}</h4>
                                <span className="abstract">{cartItem.productAbstract}</span>
                                <span className="price">单价: <span className="unit">￥</span><span className="value">{cartItem.price}</span></span>
                                <div className="p-cnt">
                                    {/* 修改商品数量 */}
                                    <span>数量：</span>
                                    <InputNumber min={0} onChange={handleCountChange(index)} value={cartItem.count} />
                                </div>
                            </div>
                        </li>
                    )} />
            <div className="cart-total">
                <span className="tot-price">总价：<span className="unit">￥</span><span className="value">{cart.totalPrice ? cart.totalPrice : '0'}</span></span>
                <Button type="primary" onClick={handlePay} style={{marginLeft: "20px"}}>结算</Button>
                <Button onClick={() => history.go(-1)} style={{marginLeft: "10px"}}>退出</Button>
            </div>
        </div>
    )
}



export default Cart;