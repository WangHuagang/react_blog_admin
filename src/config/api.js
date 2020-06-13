const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
    postLogin: ipUrl+'login',
    getType: ipUrl+'type',
    addArticle: ipUrl+'addArticle',
    updateArticle: ipUrl+'updateArticle',
    getArticleList: ipUrl+'getArticleList',
    delArticle: ipUrl+'delArticle/',
    getArticleById: ipUrl+'getArticleById/',
    addType: ipUrl+'addType',
    delType: ipUrl+'delType',
    uploadImg: ipUrl+'upload',
    getPicture: ipUrl+'getPicture',
    updatePic: ipUrl+'updatePic',
    delPic: ipUrl+'delPic',
    getCount: ipUrl+'getCount',
}

export default servicePath;