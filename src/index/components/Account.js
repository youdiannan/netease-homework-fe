import AccountService from 'utils/AccountService';
import { useEffect } from 'react';


function Account() {
    console.log('account')
    let accountData = []
    useEffect(() => AccountService.list().then(res => accountData = res.data))
    let accountItems = accountData.map(item => <AccountItem item={item} />)
    return (
        <div className="account">
            <ul>
                {accountItems}
            </ul>
        </div>
    )
}

function AccountItem(props) {
    let item = props.item;
    return (
        <li className="item">
            {/* 商品图片 */}
            <img src={item.imgUrl} className="p-img"></img>
            <div className="p-container">
                {/* 商品名 */}
                <span>{item.productName}</span>
                <span>单价: {item.price}</span>
                <div className="p-cnt">
                    <span>数量：{item.count}</span>
                </div>
            </div>
        </li>
    )
}

export default Account;