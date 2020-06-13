import React, {useState,useEffect} from 'react'
import {List, Row, Col, Modal, message, Button, Table, Tag, Space} from 'antd'
import axios from 'axios'
import api from '../config/api'
import '../static/css/ArticleList.css'
const {confirm} = Modal

const ArticleList = (props) => {
    const [list, setList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(1)
    const columns = [
        {
          title: '文章标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '文章类别',
          dataIndex: 'typeName',
          key: 'typeName',
        },
        {
          title: '添加时间',
          dataIndex: 'addTime',
          key: 'addTime',
          render: text => text
        },
        {
          title: '浏览量',
          dataIndex: 'view_count',
          key: 'view_count'
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="small">
              <Button type='primary' onClick={()=>updateArticle(record.id)}>修改</Button>
              <Button onClick={()=>delArticle(record.id)}>删除</Button>
            </Space>
          ),
        },
      ];
      const paginationProps = {
        page: currentPage,
        onChange : (page) => handleTableChange(page),
        total: total,
        pageSize: 5
      }

    useEffect(()=>{
        getList()
    },[])

    const handleTableChange = (page) => {

    }

    const getList = () => {
        axios({
            method: 'get',
            url: api.getArticleList,
            withCredentials: true
        }).then(res=>{
            setList(res.data.data)
            setTotal(res.data.data.length)
        })
    }

    const delArticle = (id) => {
        confirm({
            title: '提示',
            content: '确定要删除这篇博客文章吗？',
            onOk(){
                axios(api.delArticle+id, {withCredentials: true}).then(res=>{
                    message.success('文章删除成功！')
                    getList()
                })
            },
            onCancel(){
                message.success('取消了删除！')
            }
        })
    }

    const updateArticle = (id)=> {
        props.history.push('/index/add/'+id)
    }
    return (
        <div>
            <Table columns={columns} dataSource={list} pagination={paginationProps} total={total}/>
        </div>
    )
}

export default ArticleList

