/*
 * @file: 按需引入echarts
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年03月07 12:30:13
 */
import echarts from 'echarts/lib/echarts';

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/visualMap';

export default echarts;
