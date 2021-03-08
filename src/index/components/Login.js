import md5 from 'js-md5';
import UserService from "utils/UserService";
import { useState, useEffect } from 'react';
import ResponseStatus from 'common/ResponseStatus'
import { useHistory } from 'react-router-dom';
import './css/Login.css'

function Login() {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => document.title = "登录", []);

  function handleSubmit(e) {
    e.preventDefault();
    let loginForm = {};
    loginForm["username"] = username;
    loginForm["password"] = md5(password).toLowerCase();
    if (!username || !password) {
      window.alert("用户名或密码不能为空！");
      return;
    }
    
    UserService.login(loginForm).then(res => {
      if (res.status == ResponseStatus.ERROR) {
        window.alert("登录失败!请检查用户名或密码")
        setPassword('')
      }
      window.location.href = '/';
    }).catch(res => {
      window.alert("未知错误");
    })
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <span>用户名:</span>
          <input type="form-item" value={username} name="username" onChange={e => setUsername(e.target.value)}></input>
        </div>
        <div className="form-item">
          <span>密码:</span>
          <input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)}></input>
        </div>
        <input className="sub-btn" type="submit" value="登录"></input>
      </form>
    </div>
  );
}

export default Login;
