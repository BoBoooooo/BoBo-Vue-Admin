/*
 * @file: 让ts识别vue文件,声明第三方模块
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年06月22 16:26:22
 */
declare module '*.vue' {
    import { defineComponent } from 'vue';

    const component: ReturnType<typeof defineComponent>;
    export default component;
}

declare module 'vuedraggable';
declare module 'jsoneditor';
declare module 'animate.css';
declare module 'v-contextmenu';
