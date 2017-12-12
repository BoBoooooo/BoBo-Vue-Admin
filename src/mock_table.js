import Mock from 'mockjs'

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
//使用mockjs模拟数据

Mock.mock('/api/data',"get",List)

