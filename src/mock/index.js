import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    Session: '@increment',
    Year: +Mock.Random.date('T'),
    Turn: '@cname',
    IsCurrent:'@ctitle'
  }))
}


Mock.setup({
  timeout: '350-600'
})

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)



//使用mockjs模拟数据

Mock.mock('/api/data',"get",List)

export default Mock
