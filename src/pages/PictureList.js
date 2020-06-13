import React, { useState , useEffect} from "react";
import { Row, Col, Input, message, Upload, Modal, Card} from "antd";
import ImgCrop from 'antd-img-crop';
import axios from 'axios'
import api from '../config/api'
const { Meta } = Card;

const PictureList = (props) => {
    const [fileList, setFileList] = useState([]);
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [picList, setPicList] = useState([])
    const [currPic, setCurrPic] = useState({})
    const [picHost, setPicHost] = useState('http://localhost:7001')
  useEffect(()=>{
    getPicList()
  },[])

  const getPicList = () => {
      axios({
          method:'get',
          url: api.getPicture,
          withCredentials: true
      }).then(res => {
        setPicList(res.data.data)
      })
  }

  const onChange = ({ fileList: newFileList}) => {
    if(fileList.length < newFileList.length) {
        message.success('上传成功！')
        getPicList()
    }
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const beforeUpload= async(file, fileList) => {
    const res = await fileList
  }

  const onRemove = () => {

  }

  const handleOk = () => {
    const temp = {...currPic}
    temp.name = title;
    setCurrPic(temp)
    axios({
        method: 'post',
        url: api.updatePic,
        withCredentials: true,
        data: temp
    }).then(res => {
        if(res.data.status) {
            setVisible(false)
            getPicList()
        }
    })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const hanldePic = (e,obj) => {
    setVisible(true)
    setCurrPic(obj)
  }

  const delPic = (o) => {
    console.log(o)
  }

  return (
    <div>
      <Row gutter={5}>
        <ImgCrop rotate>
            <Upload
                action={api.uploadImg}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                onRemove={onRemove}
            >
            {fileList.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>
      </Row>
      <br/><br/>
      <Row>
      <Modal title="编辑图片"
          visible={visible}
          onOk={handleOk}
        //   confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
            <Input placeholder="图片标题" defaultValue={currPic.name} onChange={e=>setTitle(e.target.value)}/>
            <span>{picHost + currPic.url}</span>
        </Modal>
      </Row>
      <Row gutter={16}>
          {
              picList.map(i => (
                <Col span={6} onClick={e => hanldePic(e,i)}>
                    <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={picHost+i.url} 
                    />
                    }
                    >
                    <Meta title={i.name} description={picHost+i.url} />
                    </Card>
                </Col>
              ))
          }
      </Row>
    </div>
  );
};

export default PictureList;
