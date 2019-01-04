
/**
 * 初始化vue
 */


var vm = new Vue({
    el: "#container_chart",
    data: {
        area: "0",
        date:"2019",
        bread: "",
        six: [], 
        PartyPunish: [],
        FilingChartData: [],
        ClueSource: [],
        QuShiData: {
            Case: [],
            Clue:[]
        },
        Month: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', '2019/10', '2019/11', '2019/12']
    },
    methods: {
        areaName: function () {

            for (var k in mapData) {
                var obj = mapData[k];
                if (obj.code == this.area) {
                    return obj.name;
                }
            }
        },
        GetLegand: function (data) {
            var arr = [];
            for (var k in data) {
                var obj = data[k];
                if (obj.name != "" && obj.name != undefined) {
                arr.push(obj.name);

                }
            }
            return arr;
        },
        GetTitle: function (data) {
            var arr = [];


            for (var k in data) {
                var obj = data[k];
                if (obj.name != "" && obj.name != undefined) 
                    {
                arr.push(obj.value);

                    }
            }
            var max = arr.max();
            console.log(max);
            var maxname = "";
            for (var k in data) {
                var obj = data[k];
                if (obj.value == max) {
                    maxname = obj.name;
                }
            }
            var obj = {
                name: maxname,
                value: max
            }
            console.log(obj);
            return obj
        }
    },
  
    watch: {
        date: {
            handler: function (val) {
                this.bread = "正在查看：" + this.date + "年 " + this.areaName() + "数据";

                this.Month = [];
                for (var i = 0; i < 12; i++) {
                    var num = i + 1;
                    num = num < '10' ? '0' + num : num;

                   
                    this.Month.push(this.date + "/" + num);
                }

                ////假数据暂时
                //if (val == "2019") {
                //    this.QuShiData.Case = [1538];
                //    this.QuShiData.Clue = [962];
                //}
                //else
                //{
                //    this.QuShiData.Case = [0];
                //    this.QuShiData.Clue = [0];

                //}
                RefreshChart();
            }
        },
        area: {
            handler: function (val) {
                this.bread = "正在查看：" + this.date + "年 " + this.areaName()+ "数据";

                RefreshChart();
            }
        },
        QuShiData: {
            handler: function (val) {
                var arr = [];
                var arr2 = [];
                var obj = val;
                for (var i = 0; i < 12; i++) {
                    var flag = 0; 
                    var flag2 = 0; 

                    for (var k in obj.Case) {
                        if (k.name == this.Month[i]) {
                            arr.push(parseInt(k.value));
                            flag = 1;
                        }
                        
                    }
                    for (var k in obj.Clue) {
                        if (k.name == this.Month[i]) {
                            arr2.push(parseInt(k.value));
                            flag2 = 1;
                        }

                    }



                    if (flag = 0) {
                        arr.push(0);
                        arr2.push(0);

                    }

                }


            }
        }

    },
    created: function(){
        this.area = "0";

    

        this.bread = "正在查看：" + this.date + "年 " + "全省";

    }
});
var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;


//地图
function map() {
     chart1 = echarts.init(document.getElementById('map'), 'wonderland');
        $.getJSON('/Assets/CaseAnalysis/jiangsu.json', function (data) {
            echarts.registerMap('jiangsu', data);
            chart1.setOption({
                series: [{
                    type: 'map',
                    map: 'jiangsu',
                    data: mapData,
                    selectedMode: 'single',
                    zoom:1.2,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {//鼠标移入高亮显颜色
                            areaColor: '#f46d43'
                        }
                    },
                
                }],
        
                visualMap: {
                    show:false,
                    min: 0,
                    max: 50000,
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    },
                    left: "right",
                    top:"top"
                },
            },true);
        });
        chart1.on('click', function (params) {
            vm.area = params.data.code;
            RefreshChart();
        
        });

    }

//职务违法犯罪
function ChartFiling() {
     chart2 = echarts.init(document.getElementById('ChartFiling'), 'wonderland');
    var option4 = {
        title: {
            text: vm.GetTitle(vm.FilingChartData).name,
            subtext: vm.GetTitle(vm.FilingChartData).value,
            left:"29%",
            top: "40%",
            textAlign: 'center',

            textStyle: {
                fontSize:14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    

        legend: {
            type: 'scroll',
            orient: 'vertical',
            show: true,
            right: 0,
            top: 35,
            bottom: 20,
            textStyle: {
                fontSize: 12
            },
            formatter: function (name) {
                var value = "";
                for (var k in vm.FilingChartData) {
                    var obj = vm.FilingChartData[k];
                    if (obj.name == name) {
                        value = obj.value;
                        break;
                    }
                }
                if (name.length > 8) {

                    name = name.substring(0, 8) + "\n" + name.substring(8, name.length);
                }
                return name + " : " + value + "人";
            },
            data: vm.GetLegand(vm.FilingChartData),
        },



        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['30%', '50%'],
                data: vm.FilingChartData,
                label: {
                    normal: {
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                        show: false

                    }
                },
                labelLine: {
                    normal: {
                        show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                    }
                },

                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: '#fff',

                    },

                }
            }
        ]
    };
    chart2.setOption(option4,true);


}


//违反六大纪律
function ChartSix() {
     chart3 = echarts.init(document.getElementById('ChartSix'), 'wonderland');
  var  option4 = {
      title: {
          text: vm.GetTitle(vm.six).name,
          subtext: vm.GetTitle(vm.six).value,
          left: "29%",
          top: "40%",
          x: "center",
          textAlign: 'center',

          textStyle: {
              align:"center",
              fontSize: 14
          }
      },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {

            top: "50px",

            left: "5px",

            right: "5px",

            bottom: "50px",


            width: "auto", //图例宽度

            height: "100%", //图例高度

        },

        legend: {
            type: 'scroll',
            orient: 'vertical',
            show: true,
            right: 0,
            top: 35,
            bottom: 20,
            textStyle: {
                fontSize:12
            },
            formatter: function (name) {
                var value = "";
                for (var k in vm.six) {
                    var obj = vm.six[k];
                    if (obj.name == name)
                    {
                        value = obj.value;
                        break;
                    }
                }
                return name +" : "+ value+"人";
            },
            data: vm.GetLegand(vm.six),
        },



        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['30%', '50%'],
                data: vm.six,
                label: {
                    normal: {
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                        show: false   

                    }
                },
                labelLine: {
                    normal: {
                        show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                    }
                },
              
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: '#fff',

                    },
                 
                }
            }
        ]
    };
    chart3.setOption(option4,true);


}

//党纪处分
function ChartPartyPunish() {
    chart4 = echarts.init(document.getElementById('ChartPartyPunish'), 'wonderland');
    option3 = {
        title: {
            text: vm.GetTitle(vm.PartyPunish).name,
            subtext: vm.GetTitle(vm.PartyPunish).value,
            left: "34%",
            top: "40%",
            x: "center",
            textAlign: 'center',

            textStyle: {
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {

            top: "50px",

            left: "5px",

            right: "5px",

            bottom: "50px",

            backgroundColor: '#fff',

            width: "auto", //图例宽度

            height: "100%", //图例高度

        },

        legend: {
            type: 'scroll',
            orient: 'vertical',
            show: true,
            width:"auto",
            right: 0,
            top: 35,
            bottom: 20,
            textStyle: {
                fontSize: 12
            },
            formatter: function (name) {
                var value = "";
                for (var k in vm.PartyPunish) {
                    var obj = vm.PartyPunish[k];
                    if (obj.name == name) {
                        value = obj.value;
                        break;
                    }
                }
                return name + " : " + value + "人";
            },
            data: vm.GetLegand(vm.PartyPunish),
        },

        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['35%', '50%'],
                data: vm.PartyPunish,
                label: {
                    normal: {
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                                                show: false   

                    }
                },
                labelLine: {
                    normal: {
                        show: false 
                    }
                },
                itemStyle: {
               
                    normal: {
                        borderWidth: 3,
                        borderColor: '#fff',
                    }
                }
            }
        ]
    };
    chart4.setOption(option3,true);

}

//线索案件趋势图

function LineClueFiling() {
     chart5 = echarts.init(document.getElementById('LineClueFiling'), 'wonderland');
    var option4 = {
        color: ["#FF7744","#87CEFA"],
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            containLabel: true
        },
        legend: {
            data: ['当月登记案件', '当月登记线索'],
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,

            axisTick: {
                alignWithLabel: true
            },
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//横轴信息全部显示  
                rotate: -30,//-30度角倾斜显示 
            },
            data: vm.Month
        }],
        yAxis: [{
            type: 'value',
            name: '人数',
            position: 'left',
            //axisLabel: {
            //    formatter: '{value} '
            //}
        }],
        series: [{
            name: '当月登记线索',
            type: 'line',
            stack: '线索总量',
            areaStyle: { normal: {} },

            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowBlur: 2,
                    shadowOffsetY: 2
                }
            },
            data: vm.QuShiData.Clue,
        }, {
                name: '当月登记案件',
            type: 'line',
            stack: '案件总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            areaStyle: { normal: {} },

            lineStyle: {
                normal: {
                    width: 1,
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowBlur: 2,
                    shadowOffsetY: 2
                }
            },
            data: vm.QuShiData.Case,
        }]
    };
    chart5.setOption(option4, true);

}


//线索来源
function ChartClueSource() {
    console.log(vm.ClueSource);
    chart6 = echarts.init(document.getElementById('ChartClueSource'), 'wonderland');
    var option4 = {
        title: {
            text: vm.GetTitle(vm.ClueSource).name,
            subtext: vm.GetTitle(vm.ClueSource).value,
            left: "29%",
            top: "40%",
            x: "center",
            textAlign: 'center',

            textStyle: {
                align: "center",
                fontSize: 14
            },
              subtextStyle: {
                align: "center",
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },


        legend: {
            type: 'scroll',
            orient: 'vertical',
            show: true,
            right: 0,
            top: 35,
            width: "50px",

            bottom: 20,
            textStyle: {
                fontSize: 12
            },
            formatter: function (name) {
                var value = "";
                for (var k in vm.ClueSource) {
                    var obj = vm.ClueSource[k];
                    if (obj.name == name) {
                        value = obj.value;
                        break;
                    }
                }
                return name + " : " + value + "人";
            },
            data: vm.GetLegand(vm.ClueSource),
        },



        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['30%', '50%'],
                data: vm.ClueSource,
                label: {
                    normal: {
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                        show: false

                    }
                },
                labelLine: {
                    normal: {
                        show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                    }
                },
         
                itemStyle: {
 
                    borderWidth: 3,
                    borderColor: '#fff',

              
                }
            }
        ]
    };
    chart6.setOption(option4,true);

}

//党政纪处分情况   柱状图 原来的
function PartyAndGovenPunish() {
     chart7 = echarts.init(document.getElementById('PartyAndGovenPunish'), 'wonderland');
    var option4 = {
        color: ["#33CCFF",
            "#7744FF	"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        //legend: {
        //    data: ['党纪处分']
        //},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12']

        },
        yAxis: {
            type: 'value',

        },
        series: [
            {
                name: '党纪处分',
                type: 'bar',
                data: vm.PartyPunish,
                itemStyle: {
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowBlur: 2,
                        shadowOffsetY: -2
                    
                }
            },
            //{
            //    name: '政纪处分',
            //    type: 'bar',
            //    data: GovenPunish,
            //    itemStyle: {
            //        shadowColor: 'rgba(0,0,0,0.4)',
            //        shadowBlur: 2,
            //        shadowOffsetY: -2

            //    }
            //},
        ]
    };
    chart7.setOption(option4, true);

}



var mapData = [
    { name: '南京市', value: 20057.34,code:"001"},
    { name: '宿迁市', value: 15477.48, code:"010"},
    { name: '连云港市', value: 500.1, code:"013"},
    { name: '徐州市', value: 6992.6, code:"012"},
    { name: '苏州市', value: 3333.49, code:"005"},
    { name: '盐城市', value: 5000.64, code:"011"},
    { name: '无锡市', value: 15477.78, code:"004"},
    { name: '常州市', value: 8888.97, code:"003"},
    { name: '淮安市', value: 6992.26, code:"009 "},
    { name: '扬州市', value: 10000.9, code:"007"},
    { name: '镇江市', value: 20000.26, code:"002"},
    { name: '南通市', value: 5881.84, code:"006"},
    { name: '泰州市', value: 13000.01, code:"008"},
    { name: '全省', value: 13000.01, code: "0" },
    { name: '省本级', value: 13000.01, code: "016" },

];

function RefreshChart(){
    request("GetSixIllegalBehavior","six",ChartSix);
    //request("GetLawBehavior", "FilingChartData", ChartFiling);
    request("GetPunishBehavior", "PartyPunish", ChartPartyPunish);
    //LineClueFiling(); //暂时
    request("GetClueCaseCount", "QuShiData", LineClueFiling);
    request("GetClueSource", "ClueSource", ChartClueSource);
}

function RandomData(start, end) {
    var arr = [];
    for (var i = 0; i < 12; i++) {
        var num = Math.round(Math.random() * start) + end;

        arr.push(num);
    }
    return arr;
}


$(function () {
    map();
    RefreshChart();

    window.onresize = function () {
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
        chart6.resize();
    }
});

Array.prototype.max = function () {
    return Math.max.apply({}, this)
};


/**
 * @summary 封装一个请求方法
 * @param {any} url 路径
 * @param {any} response  绑定的chart data
 * @param {any} func  回调刷新chart
 */

function request(url, response, callback) {
    $.ajax({
        url: "/CaseAnalysis/CaseAnalysis/" + url,
        type: "post",
        data: {
            area: vm.area,
            date: vm.date
        },
        success: function (data) {
            var temp = JSON.parse(data);
            console.log(temp);
           vm[response] = JSON.parse(JSON.stringify(temp));
            callback();

        }
    });
}


/*
   six: [],
        PartyPunish: [],
        FilingChartData: [],
        ClueSource: [],
*/