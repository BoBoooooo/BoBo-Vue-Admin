
function RandomData(start, end) {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    const num = Math.round(Math.random() * start) + end;

    arr.push(num);
  }
  return arr;
}
// 假数据
const Month = ['2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', '2018/08', '2018/09', '2018/10', '2018/11', '2018/12'];


const six = JSON.parse('[{ "name": "违反廉洁纪律", "value":"104"},{ "name": "违反政治纪律", "value":"3"},{ "name": "违反生活纪律", "value":"7"},{ "name": "违反工作纪律", "value":"125"},{ "name": "违反组织纪律", "value":"24"},{ "name": "违反群众纪律", "value":"6"}]');
const PartyPunish = JSON.parse('[{ "name": "警告", "value":"297"},{ "name": "严重警告", "value":"155"},{ "name": "开除党籍", "value":"42"}]');
const FilingChartData = JSON.parse('[{ "name": "贪污贿赂", "value":"104"},{ "name": "滥用职权", "value":"3"},{ "name": "玩忽职守", "value":"7"},{ "name": "徇私舞弊", "value":"125"},{ "name": "重大责任事故", "value":"24"},{ "name": "行使公权力过程\\n\\n发生的其他犯罪行为", "value":"6"}]');
const ClueSource = JSON.parse('[{ "name": "信访举报", "value":"104"},{ "name": "上级交办", "value":"3"},{ "name": "监督检查中发现", "value":"7"},{ "name": "审查调查中发现", "value":"125"},{ "name": "审计中发现", "value":"24"},{ "name": "巡视巡察中发现", "value":"6"},{ "name": "公检法机关移送", "value":"6"},{ "name": "其他行政执法\\n机关移送", "value":"6"},{ "name": "其他", "value":"1"}]');
const ClueData = RandomData(500, 100)
const FilingData = RandomData(500, 100)
const mapData = [
  { name: '南京市', value: 20057.34, code: '001' },
  { name: '宿迁市', value: 15477.48, code: ' 002' },
  { name: '连云港市', value: 500.1, code: ' 013' },
  { name: '徐州市', value: 6992.6, code: '012' },
  { name: '苏州市', value: 3333.49, code: ' 005' },
  { name: '盐城市', value: 5000.64, code: ' 011' },
  { name: '无锡市', value: 15477.78, code: ' 004' },
  { name: '常州市', value: 8888.97, code: '003' },
  { name: '淮安市', value: 6992.26, code: '009 ' },
  { name: '扬州市', value: 10000.9, code: ' 007' },
  { name: '镇江市', value: 20000.26, code: ' 002' },
  { name: '南通市', value: 5881.84, code: ' 006' },
  { name: '泰州市', value: 13000.01, code: ' 008' },

];


export default {
  six,
  PartyPunish,
  FilingChartData,
  ClueSource,
  ClueData,
  FilingData,
  Month,
  mapData,
}
