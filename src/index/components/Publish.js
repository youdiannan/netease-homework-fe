import axios from "axios";
import { useParams } from "react-router-dom";
import ProductService from 'utils/ProductService';
import { useState } from 'react';

function Publish() {
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
  if (productId) {
    ProductService.getProductDetail(productId).then(res => setProduct(res.data));
  }

  function uploadImg() {
    let file = document.querySelector('#file').files[0];
    let formData = new FormData();
    formData.append("file", file);
    axios.post('/upload', formData).then(res => setProduct({
      ...product,
      imgUrl: res.data.url
    }))
  }
  return (
    <div className="p-pub">
      <h3>内容编辑</h3>
      <form action="/product" method="POST">
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
          <input type="text" name="" value={product.imgUrl ? product.imgUrl : ''} 
          onChange={(e) => setProduct({...product, 'imgUrl': e.target.value})} />
        </div>
        <div className="edit-item">
          <input type="radio" name="pic" value="url" checked={usingUrl} onChange={() => setUsingUrl(true)} />图片地址
          <input type="radio" name="pic" value="file" onChange={() => setUsingUrl(false)} />上传图片
          <div style={{display: !usingUrl? "none": "block"}}>
            <input type="text" name="imgUrl" value={product.imgUrl ? product.imgUrl : ''} />
          </div>
          <div style={{display: usingUrl? "none": "block"}}>
            <input type="file" name="file" id="file" />
            <button className="upload-btn" onClick={uploadImg}>上传</button>
          </div>
        </div>
        <div className="edit-item">
          <span>价格：</span>
          <input type="text" name="price" value={product.price ? product.price : ''} 
          onChange={(e) => setProduct({...product, 'price': e.target.value})} />
        </div>
        <input type="submit" value="保存" />
      </form>
    </div>
  );
}

export default Publish;
