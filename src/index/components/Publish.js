import axios from "axios";
import { useParams } from "react-router-dom";
import ProductService from 'utils/ProductService';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Publish.css';

import BaseConfig from 'common/BasicConfig';

let ENV = BaseConfig.ENV;

function Publish(props) {
  let history = useHistory();
  let user = props.user;
  useEffect(() => document.title = "商品发布", []);
  let { productId } = useParams();
  const [product, setProduct] = useState({
    id: productId,
    name: null,
    productAbstract: null,
    description: null,
    imgUrl: null,
    price: null
  })
  const [usingUrl, setUsingUrl] = useState(true);
  useEffect(() => {
    if (productId && productId !== '' ) {
      ProductService.getProductDetail(productId).then(res => setProduct(res.data));
    }
  }, [])
  
  // 上传图片，返回图片上传后的url
  function uploadImg(e) {
    e.preventDefault();
    let legalPostfixes = ['jpg', 'png', 'gif']
    let file = document.querySelector('#file').files[0];
    // 限制上传文件大小
    let fileSize = file.size / 1024; // kb
    if (fileSize > 1024) {
      window.alert("上传文件大小不得超过1MB！");
      return;
    }
    let filename = file.name;
    if (filename.indexOf('.') === -1) {
      window.alert("请上传图片格式文件");
      return;
    } 
    let postfix = filename.split('.')[1];
    if (legalPostfixes.indexOf(postfix) === -1) {
      window.alert("请上传图片格式文件");
      return;
    }
    
    // 上传图片
    let formData = new FormData();
    formData.append("file", file);
    if (ENV === 'dev') {
      axios.post('http://localhost:8080/api/upload', formData, {withCredentials: true}).then(res => res.data).then(res => window.alert('上传成功') || setProduct({
        ...product,
        imgUrl: res.data.url
      })).catch(err => window.alert("上传失败"))
    } else {
      axios.post('/api/upload', formData).then(res => res.data).then(res => window.alert('上传成功') || setProduct({
        ...product,
        imgUrl: res.data.url
      })).catch(err => window.alert("上传失败"))
    }
  }

  // 提交表单
  function handleSubmit(e) {
    e.preventDefault();
    let publishForm = product;
    ProductService.editProduct(publishForm).then(res => history.push(`/product/${res.data}`));
  }

  return (
    <div className="p-pub">
      <div className="head">
        <h2>内容编辑</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="edit-item">
          <span>标题：</span>
          <input type="text" name="name" value={product.name ? product.name : ''} 
          onChange={(e) => setProduct({...product, 'name': e.target.value})}/>
        </div>
        <div className="edit-item">
          <span>摘要：</span>
          <input type="text" name="productAbstract" value={product.productAbstract ? product.productAbstract : ''} 
          onChange={(e) => setProduct({...product, 'productAbstract': e.target.value})} />
        </div>
        <div className="edit-item">
          <span>图片：</span>
          <div className="inp-url">
            <input type="radio" name="pic" value="url" checked={usingUrl} onChange={() => setUsingUrl(true)} />图片地址
          </div>
          <div className="inp-file">
            <input type="radio" name="pic" value="file" onChange={() => setUsingUrl(false)} />上传图片
          </div>
          <div style={{display: !usingUrl? "none": "block"}}>
            <input type="text" name="imgUrl" value={product.imgUrl ? product.imgUrl : ''} 
            onChange={(e) => setProduct({...product, 'imgUrl': e.target.value})} />
          </div>
          <div style={{display: usingUrl? "none": "block"}}>
            <input type="file" name="file" id="file" />
            <button className="upload-btn" onClick={uploadImg}>上传</button>
          </div>
        </div>
        <div className="edit-item">
          <span className="desc">正文：</span>
          <textarea name="description" value={product.description ? product.description : ''} 
          rows="10" placeholder={"2-1000个字符"}
          onChange={(e) => setProduct({...product, 'description': e.target.value})} />
        </div>
        <div className="edit-item">
          <span>价格：</span>
          <input className="price" type="text" name="price" value={product.price ? product.price : ''} 
          onChange={(e) => setProduct({...product, 'price': e.target.value})} />元
        </div>
        <input type="submit" value="保存" />
      </form>
    </div>
  );
}

export default Publish;
