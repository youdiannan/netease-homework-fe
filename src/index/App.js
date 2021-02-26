import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Account from './components/Account';
import Cart from './components/Cart';
import Login from './components/Login';
import Publish from './components/Publish';
import { useState, useEffect } from 'react';
import UserService from 'utils/UserService';
import UserType from 'common/UserType';

function App() {
  const [user, setUser] = useState({
    id: null,
    username: null,
    userType: null
  });
  // mount时触发
  useEffect(() => {
    UserService.getCurrentUser().then(res => setUser(res.data));
  }, [])

  function handleLogout(e) {
    e.preventDefault();
    UserService.logout().then(res => setUser({}))
  }
  return (
    <Router>
      <div className="main">
        {/* Header部分 */}
        {
          user ?
            (
              <div className="header">
                <div className="user">
                  {(!user.userType || user.userType == UserType.BUYER) && <span>买家你好，</span> || <span>卖家你好，</span>}
                  <span>{user.username || ''}!</span>
                  {!user.username ? <Link to="/login">[登录]</Link> :
                    <a onClick={handleLogout} href="#">[退出]</a>}
                </div>
                <ul className="nav">
                  <li key="index"><a href="/">首页</a></li>
                  {
                    user.userType == UserType.BUYER ?
                      [
                        <li key="account"><Link to="/account">账务</Link></li>,
                        <li key="cart"><Link to="/cart">购物车</Link></li>
                      ] :
                      <li key="publish"><Link to="/publish">发布</Link></li>
                  }

                </ul>
              </div>
            ) :
            (
              <div className="header">
                <div className="user">
                  <span>请<Link to="/login">[登录]</Link></span>
                </div>
                <ul className="nav">
                  <li><Link to="/">首页</Link></li>
                </ul>
              </div>
            )
        }
        <Switch>
          <Route path="/" exact={true}>
            <ProductList></ProductList>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/detail/:productId">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/cart">
            <Cart></Cart>
          </Route>
          <Route path="/account" exact={true}>
            <Account></Account>
          </Route>
          <Route path="/publish/:productId">
            <Publish></Publish>
          </Route>
          <Route path="/publish" exact={true}>
            <Publish></Publish>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
