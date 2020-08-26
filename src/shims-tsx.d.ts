/*
 * @file: 用于定义全局声明
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年06月16 15:11:01
 */
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
