import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartService from 'utils/CartService';
import './css/Cart.css';

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
        CartService.checkout().then(() => {
            setCart({
                cart,
                cartItems: []
            })
            window.alert("结算成功")
        })
    }

    // 更新购物车
    function handleCountChange(index) {
        return function (e) {
            let newCount = e.target.value;
            if (newCount < 0) newCount = 0;
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
                setCart({
                    ...cart,
                    totalPrice: newTotalPrice
                })
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
            <ul>
                {
                    cart.cartItems && cart.cartItems.map((cartItem, index) => (
                        <li key={index} className="item">
                            {/* 商品图片 */}
                            <img src={cartItem.imgUrl} className="p-img"  onClick={() => history.push({
                            pathname: `/product/${cartItem.productId}`,
                            state: { buyAble: true }
                        })}></img>
                            <div className="p-container">
                                {/* 商品名 */}
                                <h4>{cartItem.name}</h4>
                                <span className="abstract">{cartItem.productAbstract}</span>
                                <span className="price">单价: ￥{cartItem.price}</span>
                                <div className="p-cnt">
                                    {/* 修改商品数量 */}
                                    <span>数量：</span>
                                    <input type="number" onChange={handleCountChange(index)} value={cartItem.count} />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className="cart-total">
                <span className="tot-price">总价：￥{cart.totalPrice}</span>
                <br />
                <button className="pay-btn" onClick={handlePay}>结算</button>
            </div>
            <button className="quit" onClick={() => history.go(-1)}>退出</button>
        </div>
    )
}



export default Cart;