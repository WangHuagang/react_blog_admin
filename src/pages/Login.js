import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin, message} from 'antd'
import '../static/css/Login.css'
import {
    UserOutlined,
  } from "@ant-design/icons";
import api from '../config/api'
import axios from 'axios'


function Login (props) {

    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
        setIsLoading(true)
        if(!userName || !passWord) {
            message.error('用户名或密码不能为空！')
            setIsLoading(false)
            return;
        }
        const params = {
            userName,passWord
        }
        axios({
            method: 'post',
            url: api.postLogin,
            data: params,
            withCredentials: true
        }).then(res => {
            setIsLoading(false)
            if(res.data.data == '登录成功') {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            }else {
                message.error('用户名密码错误！')
            }
        })
        // axios.post(api.postLogin, params, {withCredentials: true}).then(res => {
        //     setIsLoading(false)
        //     if(res.data.data = '登录成功') {
        //         localStorage.setItem('openId', res.data.openId)
        //         props.history.push('/index')
        //     }else {
        //         message.error('用户名密码错误！')
        //     }
        // })
    }
    return (
        <div className='login-div'>
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title='咕噜先森 Blog System' bordered={true} style={{width: 400}}>
                    <Input
                        id='userName'
                        size='laege'
                        placeholder='Enter Your UserName'
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                    <br/><br/>
                    <Input.Password
                        id='password'
                        size='laege'
                        placeholder='Enter Your passWord'
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=> setPassWord(e.target.value)}
                    />
                    <br/><br/>
                    <Button type='primary' size='large' block onClick={checkLogin}>Login In</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;