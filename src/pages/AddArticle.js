import React, { useState , useEffect} from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from 'axios'
import api from '../config/api'
const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(()=>{
    getTypeInfo()
    //编辑时获取文章内容
    const id = props.match.params.id;
    if(id) {
      setArticleId(id)
      getArticleById(id)
    }
  },[])

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });

  const changeContent = (e) => {
      setArticleContent(e.target.value)
      let html = marked(e.target.value)
      setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
      setIntroducemd(e.target.value)
      let html = marked(e.target.value)
      setIntroducehtml(html)
  }

  const getTypeInfo = ()=> {
    axios({
      method: 'get',
      url: api.getType,
      withCredentials: true
    }).then(res=>{
      if(res.data.data==='没有登录') {
        localStorage.removeItem('openId')
        props.history.push('/')
      }else {
        setTypeInfo(res.data.data)
      }
    })
  }

  const selectTypeHandle = (value) => {
    setSelectType(value)
  }

  const saveArticle = () => {
    if(!selectedType) {
      message.error('请选择文章类型!')
      return;
    }
    if(!articleTitle) {
      message.error('请输入文章标题')
      return;
    }
    if(!articleContent) {
      message.error('请输入文章内容')
      return;
    }
    if(!introducemd) {
      message.error('请输入文章简介')
      return;
    }
    if(!showDate) {
      message.error('请选择发布日期')
      return;
    }
    const params = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      // addTime: (new Date(showDate.replace('-','/')).getTime())/1000 
      addTime: showDate
    }
    console.log('2',showDate)
    if(articleId === 0) {
      //新增
      params.view_count = 0
      axios({
        method: 'post',
        url: api.addArticle,
        data: params,
        withCredentials: true
      }).then(res=>{
        setArticleId(res.data.insertId)
        if(res.data.isSuccess) {
          message.success('文章添加成功！')
        }else {
          message.error('文章添加失败!')
        }
      })
    }else {
      params.id = articleId
      axios({
        method: 'post',
        url: api.updateArticle,
        data: params,
        withCredentials: true
      }).then(res=>{
        if(res.data.status) {
          message.success('文章保存成功！')
        }else {
          message.error('文章保存失败!')
        }
      })
    }
  }

  const getArticleById = (id) => {
    axios(api.getArticleById+id, {withCredentials: true}).then(res => {
      let article = res.data.data[0]
      setArticleTitle(article.title)
      setArticleContent(article.article_content)
      let html = marked(article.article_content)
      setMarkdownContent(html)
      setIntroducemd(article.introduce)
      let htmlIn = marked(article.introduce)
      setIntroducehtml(htmlIn)
      setShowDate(article.addTime)
      setSelectType(article.typeId)
      console.log('1',selectedType)
    })
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input value={articleTitle} placeholder="博客标题" size="large" onChange={e=>{setArticleTitle(e.target.value)}}/>
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandle}>
                {
                  typeInfo.map((i,index)=> {
                    return (
                      <Option key={index} value={i.id}>{i.typeName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={30}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div className="show-html" 
                dangerouslySetInnerHTML={{__html:markdownContent}}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <TextArea rows={4} placeholder="文章简介" onChange={changeIntroduce} value={introducemd}></TextArea>
              <br />
              <br />
              <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
            </Col>
            <Col span={18}>
              <div className="date-select">
                <DatePicker placeholder="发布日期" size="large" defaultValue={showDate} onChange={(date,dateString)=>{setShowDate(dateString)}}></DatePicker>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
