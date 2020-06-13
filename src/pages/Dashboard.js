import React, {useState,useEffect} from 'react'
import {Statistic, Row, Col,Card} from 'antd'
import axios from 'axios'
import api from '../config/api'
import ArticleType from './charts/ArticleType'
import '../static/css/Dashboard.css'

const Dashboard = (props) => {
    const [statistics,setStatistics] = useState({})
    useEffect(()=>{
        getCount()
    },[])

    const getCount = () => {
        axios({
            method: 'get',
            url: api.getCount,
            withCredentials: true
        }).then(res=>{
            setStatistics(res.data)
        })
    }
    return (
        <div>

            <div className="site-card-wrapper">
                <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="博客文章" valueStyle={{ color: '#3f8600' }} value={statistics.articleCount} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card >
                        <Statistic title="文章类型" valueStyle={{ color: '#cf1322' }} value={statistics.typeCount} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="博客图库" valueStyle={{ color: '#1890ff' }} value={statistics.pictureCount} />
                    </Card>
                </Col>
                </Row>

                <Row>
                        <div class='chart'>
                            <ArticleType></ArticleType>
                        </div>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard

