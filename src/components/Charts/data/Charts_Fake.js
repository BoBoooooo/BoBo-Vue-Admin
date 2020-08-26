/* eslint-disable camelcase */
/* eslint-disable max-len */
/*
 * @file: 图标假数据
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 */

function RandomData(start, end) {
  const arr = [];
  for (let i = 0; i < 12; i += 1) {
    const num = Math.round(Math.random() * start) + end;

    arr.push(num);
  }
  return arr;
}

function RandomDataSingle(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// 假数据
const Month = ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', '2019/10', '2019/11', '2019/12'];


const data_six = ['违反廉洁纪律', '违反政治纪律', '违反生活纪律', '违反工作纪律', '违反组织纪律', '违反群众纪律'];
const data_PartyPunish = ['警告', '严重警告', '开除党籍'];
const data_FilingChartData = ['贪污贿赂', '滥用职权', '玩忽职守', '徇私舞弊', '重大责任事故', '行使公权力过程\n发生的其他犯罪行为'];
const data_ClueSource = ['信访举报', '上级交办', '监督检查中发现', '审查调查中发现', '审计中发现', '巡视巡察中发现', '公检法机关移送', '其他行政执法\n机关移送', '其他'];

const six = [];
const PartyPunish = [];
const FilingChartData = [];
const ClueSource = [];

for (const value of data_six) {
  six.push({
    name: value,
    value: RandomDataSingle(10, 300),
  });
}

for (const value of data_PartyPunish) {
  PartyPunish.push({
    name: value,
    value: RandomDataSingle(10, 300),
  });
}


for (const value of data_FilingChartData) {
  FilingChartData.push({
    name: value,
    value: RandomDataSingle(10, 300),
  });
}


for (const value of data_ClueSource) {
  ClueSource.push({
    name: value,
    value: RandomDataSingle(10, 300),
  });
}


const FilingData = Month.map(item => ({
  name: item,
  value: RandomDataSingle(1, 100),
}));
const mapData = [
  { name: '成都市', value: 0, code: '001' },
  { name: '自贡市', value: 0, code: ' 002' },
  { name: '攀枝花市', value: 0, code: ' 013' },
  { name: '泸州市', value: 0, code: ' 014' },
  { name: '德阳市', value: 0, code: '012' },
  { name: '绵阳市', value: 0, code: ' 005' },
  { name: '广元市', value: 0, code: ' 011' },
  { name: '内江市', value: 0, code: ' 004' },
  { name: '遂宁市', value: 0, code: ' 004' },
  { name: '乐山市', value: 0, code: '003' },
  { name: '南充市', value: 0, code: '009 ' },
  { name: '眉山市', value: 0, code: ' 007' },
  { name: '宜宾市', value: 0, code: ' 002' },
  { name: '广安市', value: 0, code: ' 006' },
  { name: '达州市', value: 0, code: ' 008' },
  { name: '雅安市', value: 0, code: ' 008' },
  { name: '巴中市', value: 0, code: ' 008' },
  { name: '资阳市', value: 0, code: ' 008' },
  { name: '阿坝藏族羌族自治州', value: 0, code: ' 008' },
  { name: '甘孜藏族自治州', value: 0, code: ' 008' },
  { name: '凉山彝族自治州', value: 0, code: ' 008' },
];
for (const data of mapData) {
  data.value = RandomDataSingle(0, 500);
}

export default {
  six,
  PartyPunish,
  FilingChartData,
  ClueSource,
  FilingData,
  Month,
  mapData,
};
