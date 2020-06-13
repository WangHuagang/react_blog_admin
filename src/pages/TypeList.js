import React, { useState , useEffect} from "react";
import { Row, Col, Input, message, Tag} from "antd";
import { AudioOutlined } from '@ant-design/icons';
import axios from 'axios'
import api from '../config/api'
const { Search } = Input;

const TypeList = (props) => {
  const [typeList, setTypeList] = useState([])
  useEffect(()=>{
    getTypeList()
  },[])

  const getTypeList = ()=> {
    axios({
        method:'get',
        url: api.getType,
        withCredentials: true
    }).then(res => {
        setTypeList(res.data.data)
    })
  }
  const add = (value)=>{
    axios({
        method: 'post',
        url: api.addType,
        data: {typeName: value},
        withCredentials: true,
    }).then(res => {
        if(res.data.isInsert) {
            message.success('文章类型新增成功!');
            getTypeList()
        }else  message.error('文章类型新增失败!')
    })
  }

  const close = ((e,d) => {
    axios({
        method:'post',
        url: api.delType,
        data: {id: d.id},
        withCredentials: true
    }).then(res => {
        if(res.data.isDel) {
            message.success('文章类型删除成功！')
            getTypeList()
        }else {
            e.preventDefault();
            message.error('文章类型删除失败！')
        }
    })
  })

  return (
    <div>
      <Row gutter={5}>
        <Col span={12}>
        <Search
            placeholder="类型名称"
            enterButton="新增"
            size="large"
            onSearch={ value => add(value) }
            />
        </Col>
      </Row>
      <br/><br/>
      <Row>
        <Col span={24}>
            {
                typeList.map((i,idx) => {
                    return (
                        <Tag color="#2db7f5" key={idx} closable onClose={(e)=> close(e,i)}>
                            {i.typeName}
                        </Tag>
                    )
                })
            }
        </Col>
      </Row>
    </div>
  );
};

export default TypeList;
