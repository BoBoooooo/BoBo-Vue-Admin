
/**
 * 初始化vue
 */
// const vm = new Vue({
//   el: '#container_chart',
//   data: {
//     bread: '正在查看：2017年 全省数据',
//     six: [], // 六大违纪
//     PartyPunish: [],
//     FilingChartData: [],
//     ClueSource: [],
//     ClueData: [],
//     FilingData: [],
//     Month: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12'],
//   },
//   methods: {
//     GetLegand(data) {
//       const arr = [];
//       for (const k in data) {
//         const obj = data[k];
//         arr.push(obj.name);
//       }
//       return arr;
//     },
//   },
// });


// let chart1;
// let chart2;
// let chart3;
// let chart4;
// let chart5;
// let chart6;


// // 地图
// function map() {
//   chart1 = echarts.init(document.getElementById('map'), 'wonderland');
//   $.getJSON('/Assets/CaseAnalysis/jiangsu.json', (data) => {
//     echarts.registerMap('jiangsu', data);
//     chart1.setOption({
//       series: [{
//         type: 'map',
//         map: 'jiangsu',
//         data: mapData,
//         selectedMode: 'single',
//         zoom: 1.2,
//         label: {
//           normal: {
//             show: true,
//           },
//           emphasis: {
//             show: true,
//           },
//         },
//         itemStyle: {
//           normal: {
//             areaColor: '#323c48',
//             borderColor: '#111',
//           },
//           emphasis: {// 鼠标移入高亮显颜色
//             areaColor: '#f46d43',
//           },
//         },

//       }],

//       visualMap: {
//         show: false,
//         min: 0,
//         max: 50000,
//         realtime: false,
//         calculable: true,
//         inRange: {
//           color: ['lightskyblue', 'yellow', 'orangered'],
//         },
//         left: 'right',
//         top: 'top',
//       },
//     }, true);
//   });
//   chart1.on('click', (params) => {
//     RefreshChart(params.data.code);

//   });

// }

// // 职务违法犯罪
// function ChartFiling() {
//   chart2 = echarts.init(document.getElementById('ChartFiling'), 'wonderland');
//   const option4 = {
//     title: {
//       text: '贪污受贿',
//       subtext: '104人',
//       left: '29%',
//       top: '40%',
//       textAlign: 'center',

//       textStyle: {
//         fontSize: 14,
//       },
//     },
//     tooltip: {
//       trigger: 'item',
//       formatter: '{a} <br/>{b} : {c} ({d}%)',
//     },


//     legend: {
//       type: 'scroll',
//       orient: 'vertical',
//       show: true,
//       right: 0,
//       top: 35,
//       bottom: 20,
//       textStyle: {
//         fontSize: 12,
//       },
//       formatter(name) {
//         console.log(name);
//         let value = '';
//         for (const k in FilingChartData) {
//           const obj = FilingChartData[k];
//           if (obj.name == name) {
//             value = obj.value;
//             break;
//           }
//         }
//         if (name == '行使公权力过程中发生的其他犯罪行为') {
//           name = '行使公权力过程中' + '\n' + '发生的其他犯罪行为' + '\n';
//         }
//         return `${name} : ${value}人`;
//       },
//       data: ['贪污贿赂', '滥用职权', '玩忽职守', '徇私舞弊', '重大责任事故', '行使公权力过程中发生的其他犯罪行为'],
//     },


//     series: [
//       {
//         name: '',
//         type: 'pie',
//         radius: ['50%', '80%'],
//         center: ['30%', '50%'],
//         data: FilingChartData,
//         label: {
//           normal: {
//             textStyle: {
//               fontWeight: 'normal',
//               fontSize: 16,
//             },
//             show: false,

//           },
//         },
//         labelLine: {
//           normal: {
//             show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
//           },
//         },

//         itemStyle: {
//           normal: {
//             borderWidth: 3,
//             borderColor: '#fff',

//           },

//         },
//       },
//     ],
//   };
//   chart2.setOption(option4, true);


// }


// // 违反六大纪律
// function ChartSix() {
//   chart3 = echarts.init(document.getElementById('ChartSix'), 'wonderland');
//   const option4 = {
//     title: {
//       text: '违反政治纪律',
//       subtext: '3人',
//       left: '29%',
//       top: '40%',
//       x: 'center',
//       textAlign: 'center',

//       textStyle: {
//         align: 'center',
//         fontSize: 14,
//       },
//     },
//     tooltip: {
//       trigger: 'item',
//       formatter: '{a} <br/>{b} : {c} ({d}%)',
//     },
//     grid: {

//       top: '50px',

//       left: '5px',

//       right: '5px',

//       bottom: '50px',


//       width: 'auto', // 图例宽度

//       height: '100%', // 图例高度

//     },

//     legend: {
//       type: 'scroll',
//       orient: 'vertical',
//       show: true,
//       right: 0,
//       top: 35,
//       bottom: 20,
//       textStyle: {
//         fontSize: 12,
//       },
//       formatter(name) {
//         console.log(name);
//         let value = '';
//         for (const k in six) {
//           const obj = six[k];
//           if (obj.name == name)
//           {
//             value = obj.value;
//             break;
//           }
//         }
//         return `${name} : ${value}人`;
//       },
//       data: ['违反政治纪律', '违反廉洁纪律', '违反群众纪律', '违反工作纪律', '违反组织纪律', '违反生活纪律'],
//     },


//     series: [
//       {
//         name: '',
//         type: 'pie',
//         radius: ['50%', '80%'],
//         center: ['30%', '50%'],
//         data: six,
//         label: {
//           normal: {
//             textStyle: {
//               fontWeight: 'normal',
//               fontSize: 16,
//             },
//             show: false,

//           },
//         },
//         labelLine: {
//           normal: {
//             show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
//           },
//         },

//         itemStyle: {
//           normal: {
//             borderWidth: 3,
//             borderColor: '#fff',

//           },

//         },
//       },
//     ],
//   };
//   chart3.setOption(option4, true);


// }

// // 四种形态
// function ChartPartyPunish() {
//   chart4 = echarts.init(document.getElementById('ChartPartyPunish'), 'wonderland');
//   option3 = {
//     title: {
//       text: '警告',
//       subtext: '297人',
//       left: '34%',
//       top: '40%',
//       x: 'center',
//       textAlign: 'center',

//       textStyle: {
//         fontSize: 14,
//       },
//     },
//     tooltip: {
//       trigger: 'item',
//       formatter: '{a} <br/>{b} : {c} ({d}%)',
//     },
//     grid: {

//       top: '50px',

//       left: '5px',

//       right: '5px',

//       bottom: '50px',

//       backgroundColor: '#fff',

//       width: 'auto', // 图例宽度

//       height: '100%', // 图例高度

//     },

//     legend: {
//       type: 'scroll',
//       orient: 'vertical',
//       show: true,
//       width: 'auto',
//       right: 0,
//       top: 35,
//       bottom: 20,
//       textStyle: {
//         fontSize: 12,
//       },
//       formatter(name) {
//         console.log(name);
//         let value = '';
//         for (const k in PartyPunish) {
//           const obj = PartyPunish[k];
//           if (obj.name == name) {
//             value = obj.value;
//             break;
//           }
//         }
//         return `${name} : ${value}人`;
//       },
//       data: ['警告', '严重警告', '开除党籍'],
//     },

//     series: [
//       {
//         name: '',
//         type: 'pie',
//         radius: ['50%', '80%'],
//         center: ['35%', '50%'],
//         data: PartyPunish,
//         label: {
//           normal: {
//             textStyle: {
//               fontWeight: 'normal',
//               fontSize: 16,
//             },
//             show: false,

//           },
//         },
//         labelLine: {
//           normal: {
//             show: false,
//           },
//         },
//         itemStyle: {

//           normal: {
//             borderWidth: 3,
//             borderColor: '#fff',
//           },
//         },
//       },
//     ],
//   };
//   chart4.setOption(option3, true);

// }

// // 线索案件趋势图

// function LineClueFiling() {
//   chart5 = echarts.init(document.getElementById('LineClueFiling'), 'wonderland');
//   const option4 = {
//     color: ['#FF7744', '#87CEFA'],
//     tooltip: {
//       trigger: 'axis',
//     },
//     grid: {
//       containLabel: true,
//     },
//     legend: {
//       data: ['案件', '线索'],
//     },
//     xAxis: [{
//       type: 'category',
//       boundaryGap: false,

//       axisTick: {
//         alignWithLabel: true,
//       },
//       axisLabel: { // 坐标轴刻度标签的相关设置。
//         interval: 0, // 横轴信息全部显示
//         rotate: -30, // -30度角倾斜显示
//       },
//       data: vm.Month,
//     }],
//     yAxis: [{
//       type: 'value',
//       name: '人数',
//       position: 'left',
//       // axisLabel: {
//       //    formatter: '{value} '
//       // }
//     }],
//     series: [{
//       name: '线索',
//       type: 'line',
//       stack: '线索总量',
//       areaStyle: { normal: {} },

//       label: {
//         normal: {
//           show: true,
//           position: 'top',
//         },
//       },
//       lineStyle: {
//         normal: {
//           width: 1,
//           shadowColor: 'rgba(0,0,0,0.4)',
//           shadowBlur: 2,
//           shadowOffsetY: 2,
//         },
//       },
//       data: ClueData,
//     }, {
//       name: '案件',
//       type: 'line',
//       stack: '案件总量',
//       label: {
//         normal: {
//           show: true,
//           position: 'top',
//         },
//       },
//       areaStyle: { normal: {} },

//       lineStyle: {
//         normal: {
//           width: 1,
//           shadowColor: 'rgba(0,0,0,0.4)',
//           shadowBlur: 2,
//           shadowOffsetY: 2,
//         },
//       },
//       data: FilingData,
//     }],
//   };
//   chart5.setOption(option4, true);

// }


// // 线索来源
// function ChartClueSource() {
//   chart6 = echarts.init(document.getElementById('ChartClueSource'), 'wonderland');
//   const option4 = {
//     title: {
//       text: '信访举报',
//       subtext: '104人',
//       left: '29%',
//       top: '40%',
//       x: 'center',
//       textAlign: 'center',

//       textStyle: {
//         align: 'center',
//         fontSize: 14,
//       },
//       subtextStyle: {
//         align: 'center',
//         fontSize: 14,
//       },
//     },
//     tooltip: {
//       trigger: 'item',
//       formatter: '{a} <br/>{b} : {c} ({d}%)',
//     },


//     legend: {
//       type: 'scroll',
//       orient: 'vertical',
//       show: true,
//       right: 0,
//       top: 35,
//       width: '50px',

//       bottom: 20,
//       textStyle: {
//         fontSize: 12,
//       },
//       formatter(name) {
//         console.log(name);
//         let value = '';
//         for (const k in ClueSource) {
//           const obj = ClueSource[k];
//           if (obj.name == name) {
//             value = obj.value;
//             break;
//           }
//         }
//         return `${name} : ${value}人`;
//       },
//       data: ['信访举报', '上级交办', '监督检查中发现', '审查调查中发现', '审计中发现', '巡视巡察中发现', '公检法机关移送', '其他行政执法机关移送', '其他'],
//     },


//     series: [
//       {
//         name: '',
//         type: 'pie',
//         radius: ['50%', '80%'],
//         center: ['30%', '50%'],
//         data: ClueSource,
//         label: {
//           normal: {
//             textStyle: {
//               fontWeight: 'normal',
//               fontSize: 16,
//             },
//             show: false,

//           },
//         },
//         labelLine: {
//           normal: {
//             show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
//           },
//         },

//         itemStyle: {

//           borderWidth: 3,
//           borderColor: '#fff',


//         },
//       },
//     ],
//   };
//   chart6.setOption(option4, true);

// }

// // 党政纪处分情况   柱状图 原来的
// function PartyAndGovenPunish() {
//   chart7 = echarts.init(document.getElementById('PartyAndGovenPunish'), 'wonderland');
//   const option4 = {
//     color: ['#33CCFF',
//       '#7744FF	'],
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow',
//       },
//     },
//     // legend: {
//     //    data: ['党纪处分']
//     // },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true,
//     },
//     xAxis: {
//       type: 'category',
//       data: vm.Month,

//     },
//     yAxis: {
//       type: 'value',

//     },
//     series: [
//       {
//         name: '党纪处分',
//         type: 'bar',
//         data: PartyPunish,
//         itemStyle: {
//           shadowColor: 'rgba(0,0,0,0.4)',
//           shadowBlur: 2,
//           shadowOffsetY: -2,

//         },
//       },
//       // {
//       //    name: '政纪处分',
//       //    type: 'bar',
//       //    data: GovenPunish,
//       //    itemStyle: {
//       //        shadowColor: 'rgba(0,0,0,0.4)',
//       //        shadowBlur: 2,
//       //        shadowOffsetY: -2

//       //    }
//       // },
//     ],
//   };
//   chart7.setOption(option4, true);

// }




// 假数据
const Month = ['2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', '2018/08', '2018/09', '2018/10', '2018/11', '2018/12'];


const six = JSON.parse('[{ "name": "违反廉洁纪律", "value":"104"},{ "name": "违反政治纪律", "value":"3"},{ "name": "违反生活纪律", "value":"7"},{ "name": "违反工作纪律", "value":"125"},{ "name": "违反组织纪律", "value":"24"},{ "name": "违反群众纪律", "value":"6"}]');
const PartyPunish = JSON.parse('[{ "name": "警告", "value":"297"},{ "name": "严重警告", "value":"155"},{ "name": "开除党籍", "value":"42"}]');
const FilingChartData = JSON.parse('[{ "name": "贪污贿赂", "value":"104"},{ "name": "滥用职权", "value":"3"},{ "name": "玩忽职守", "value":"7"},{ "name": "徇私舞弊", "value":"125"},{ "name": "重大责任事故", "value":"24"},{ "name": "行使公权力过程发生的其他犯罪行为", "value":"6"}]');
const ClueSource = JSON.parse('[{ "name": "信访举报", "value":"104"},{ "name": "上级交办", "value":"3"},{ "name": "监督检查中发现", "value":"7"},{ "name": "审查调查中发现", "value":"125"},{ "name": "审计中发现", "value":"24"},{ "name": "巡视巡察中发现", "value":"6"},{ "name": "公检法机关移送", "value":"6"},{ "name": "其他行政执法机关移送", "value":"6"},{ "name": "其他", "value":"1"}]');
const ClueData = RandomData(500, 100);
const FilingData = RandomData(500, 100);
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




function RandomData(start, end) {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    const num = Math.round(Math.random() * start) + end;

    arr.push(num);
  }
  return arr;
}


export default {
  six,
  PartyPunish,
  FilingChartData,
  ClueSource,
  ClueData,
  FilingData,
  Month,
}


