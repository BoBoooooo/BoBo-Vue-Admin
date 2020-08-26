/*
 * @file: 水印
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-08-06 11:59:13
 */
interface type {
  set?:any; // 水印设置方法
}
const watermark:type = {};

const setWatermark = (name, date) => {
  const id = '1.23452384164.123412416';

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as any);
  }

  // 创建一个画布
  const can = document.createElement('canvas');
  // 设置画布的长宽
  can.width = 500;
  can.height = 500;

  const cans = can.getContext('2d') as any;
  // 旋转角度
  cans.rotate((-15 * Math.PI) / 200);
  cans.font = '18px Arial';
  // 设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(200, 200, 200, 0.20)';
  // 设置文本内容的当前对齐方式
  cans.textAlign = 'left';
  // 设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle';
  // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(date, can.width / 8, can.height / 2);
  cans.fillText(name, can.width / 8.5, can.height / 2.3);

  const div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '46px';
  div.style.left = '180px';
  div.style.position = 'fixed';
  div.style.zIndex = '10000000000';
  div.style.width = `${document.documentElement.clientWidth}px`;
  div.style.height = `${document.documentElement.clientHeight}px`;
  div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`;
  document.body.appendChild(div);
  return id;
};

// 该方法只允许调用一次
watermark.set = (name:string, date:string) => {
  let id = setWatermark(name, date);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(name, date);
    }
  }, 500);
  window.onresize = () => {
    setWatermark(name, date);
  };
};

export default watermark;
