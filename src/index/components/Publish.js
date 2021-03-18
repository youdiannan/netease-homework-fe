import axios from "axios";
import { useParams } from "react-router-dom";
import ProductService from 'utils/ProductService';
import { useState, useEffect, isValidElement } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Publish.css';
import { Input, Radio, Upload, message, Button } from 'antd';
import BaseConfig from 'common/BasicConfig';
import { UploadOutlined } from '../../../node_modules/@ant-design/icons';
import ResponseStatus from '../../common/ResponseStatus';

let ENV = BaseConfig.ENV;
const { TextArea } = Input;

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

  const [uploadType, setUploadType] = useState("url");
  // 用于控制提示信息显示的状态变量
  const [nameHint, setNameHint] = useState(false);
  const [abstractHint, setAbstractHint] = useState(false);
  const [fullDescHint, setFullDescHint] = useState(false);
  const [imgHint, setImgHint] = useState(false);
  const [priceHint, setPriceHint] = useState(false);

  // 上传文件
  const [file, setFile] = useState();
  

  // didmount
  useEffect(() => {
    if (productId && productId !== '' ) {
      ProductService.getProductDetail(productId).then(res => setProduct(res.data));
    }
  }, [])

  
  // 上传图片，返回图片上传后的url
  function uploadImg(e) {
    e.preventDefault();
    if (!file) {
      message.warn("请选择文件");
      return;
    }
    let legalPostfixes = ['jpg', 'png', 'gif']
    // 限制上传文件大小
    let fileSize = file.size / 1024; // kb
    if (fileSize > 1024) {
      message.warn("上传文件大小不得超过1MB！");
      return;
    }
    let filename = file.name;
    if (filename.indexOf('.') === -1) {
      message.warn("请上传图片格式文件");
      return;
    } 
    let postfix = filename.split('.')[1];
    if (legalPostfixes.indexOf(postfix) === -1) {
      message.warn("请上传图片格式文件");
      return;
    }
    
    // 上传图片
    let formData = new FormData();
    formData.append("file", file);
    if (ENV === 'dev') {
      axios.post('http://localhost:8080/api/upload', formData, {withCredentials: true}).then(res => res.data).
      then(res => {
        if (res.code === ResponseStatus.SUCCESS) {
          message.success('上传成功');
          setProduct({
          ...product,
          imgUrl: res.data.url
          })
        } else {
          message.error(res.message);
        }
      }).catch(err => message.error("上传失败"))
    } else {
      axios.post('/api/upload', formData).then(res => res.data).
      then(res => {
        if (res.code === ResponseStatus.SUCCESS) {
          message.success('上传成功');
          setProduct({
          ...product,
          imgUrl: res.data.url
          })
        } else {
          message.error(res.message);
        }
      }).catch(err => message.error("上传失败"))
    }
  }

  // 提交表单
  function handleSubmit(e) {
    e.preventDefault();
    let publishForm = product;
    // 参数校验
    if(isValid(product)) {
      if (!product.id) {
        ProductService.addProduct(publishForm).then(res => history.push({
          pathname: `/product/${res.data}`,
          state: { buyAble: true }
        }))
      } else {
        ProductService.editProduct(publishForm).then(res => history.push({
          pathname: `/product/${res.data}`,
          state: { buyAble: true }
        }));
      }
    }
  }

  // 参数校验
  function isValid(product) {
    let valid = true;
    // 商品名称
    let name = product.name;
    if (!name || name.length < 2 || name.length > 80) {
      setNameHint(true);
      valid = false;
    } else {
      setNameHint(false);
    }
    
    // 商品摘要
    let abstract = product.productAbstract;
    if (!abstract || abstract.length < 2 || abstract.length > 140) {
      setAbstractHint(true);
      valid = false;
    } else {
      setAbstractHint(false);
    }

    // 图片
    let imgUrl = product.imgUrl;
    if (!imgUrl) {
      setImgHint(true);
      valid = false;
    } else {
      setImgHint(false);
    }

    // 商品详细描述
    let desc = product.description;
    if (!desc || desc.length < 2 || desc.length > 1000) {
      setFullDescHint(true);
      valid = false;
    } else {
      setFullDescHint(false);
    }

    // 商品价格
    let price = product.price;
    let validRegPat = /^\d+(\.\d{1,2})?$/
    if (!price || !validRegPat.test(price)) {
      setPriceHint(true);
      valid = false;
    } else {
      setPriceHint(false);
    }

    return valid;
  }

  return (
    <div className="p-pub">
      <div className="head">
        <h2>内容编辑</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="edit-item">
          <span>标题：</span>
          <Input allowClear value={product.name ? product.name : '' } maxLength={80} placeholder={"2-80个字符"}
          onChange={(e) => setProduct({...product, 'name': e.target.value})}/>
          { nameHint ? <span className="hint">*&nbsp;商品标题长度必须为2-80个字符</span> : null}
        </div>
        <div className="edit-item">
          <span>摘要：</span>
          <Input allowClear value={product.productAbstract ? product.productAbstract : ''} placeholder={"2-140个字符"}
          onChange={(e) => setProduct({...product, 'productAbstract': e.target.value})} />
          { abstractHint ? <span className="hint">*&nbsp;商品摘要长度必须为2-140个字符</span> : null}
        </div>
        <div className="edit-item">
          <span>图片：</span>
          <Radio.Group onChange={(e) => setUploadType(e.target.value)} value={uploadType}>
            <Radio value={"url"}>图片地址</Radio>
            <Radio value={"file"}>上传图片</Radio>
          </Radio.Group>
          <div style={{display: uploadType === "file" ? "none": "block"}}>
            <Input allowClear value={product.imgUrl ? product.imgUrl : ''} 
            onChange={(e) => setProduct({...product, 'imgUrl': e.target.value})} />
          </div>
          <div style={{display: uploadType === "url" ? "none": "block"}}>
            <Upload beforeUpload={file => {
              setFile(file);
              return false;
            }}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            <Button onClick={uploadImg}>上传</Button>
          </div>
          { imgHint ? <span className="hint">*&nbsp;图片不能为空</span> : null}
        </div>
        <div className="edit-item">
          <span className="desc">正文：</span>
          <TextArea value={product.description ? product.description : ''} rows={10} showCount
          placeholder={"2-1000个字符"} onChange={(e) => setProduct({...product, 'description': e.target.value})} />
          { fullDescHint ? <span className="hint">*&nbsp;商品描述信息长度必须为2-1000个字符</span> : null}
        </div>
        <div className="edit-item">
          <span>价格：</span>
          <Input allowClear value={product.price ? product.price : ''} prefix="￥" suffix="元" style={{ width: "15%"}}
          onChange={(e) => setProduct({...product, 'price': e.target.value})} />
          { priceHint ? <span className="hint">*&nbsp;请检查价格是否合法：大于0元且最多包含两位小数</span> : null }
        </div>
        <Button type="primary" onClick={handleSubmit}>保存</Button>
      </form>
    </div>
  );
}

export default Publish;
