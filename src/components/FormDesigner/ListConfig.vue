
<template>
  <div id="listconfig_container"
       style="width:100%">

    <el-alert :closable="false"
              title="el-table动态配置规则"
              type="warning"
              description="支持如下配置项,拖拽行可以调整显示列顺序,slot自定义功能未完待续"
              show-icon
              style="margin:20px 0" />

    <table class="listconfig_table">
      <thead>
        <th>字段</th>
        <th>标题</th>
        <th>列宽</th>
        <th>最小宽度</th>
        <th>排序</th>
        <th>内容对齐</th>
        <th>表头对齐</th>
        <th>超出隐藏</th>
        <th>作为查询条件</th>
        <th>自定义列</th>
        <th />
      </thead>
      <draggable v-model="config.columnList"
                 :options="{animation:500}"
                 element="tbody">
        <tr v-for="(item, index) in config.columnList"
            :key="index">
          <td>
            <el-select v-model="item.prop"
                       filterable
                       allow-create
                       placeholder="选择字段名">
              <el-option v-for="(subitem, index) in selectList"
                         :key="index"
                         :label="subitem.COLUMN_NAME"
                         :value="subitem.COLUMN_NAME" />
            </el-select>
          </td>
          <td>
            <el-input v-model="item.label"
                      placeholder="列标题" />
          </td>
          <td>
            <el-input v-model="item.width"
                      placeholder="列宽(px)" />
          </td>

          <td>
            <el-input v-model="item.min_width"
                      placeholder="列最小宽度(px)" />
          </td>
          <td>
            <el-select v-model="item.sortable"
                       placeholder="排序">
              <el-option :value="true"
                         label="是" />
              <el-option :value="false"
                         label="否" />
            </el-select>

          </td>

          <td>
            <el-select v-model="item.align"
                       placeholder="内容对齐方式">
              <el-option label="居左"
                         value="left" />
              <el-option label="居中"
                         value="center" />
              <el-option label="居右"
                         value="right" />
            </el-select>
          </td>

          <td>
            <el-select v-model="item.header_align"
                       placeholder="表头对齐方式">
              <el-option label="居左"
                         value="left" />
              <el-option label="居中"
                         value="center" />
              <el-option label="居右"
                         value="right" />
            </el-select>
          </td>

          <td>
            <el-select v-model="item.show_overflow_tooltip"
                       placeholder="超出隐藏">
              <el-option :value="false"
                         label="否" />

              <el-option :value="true"
                         label="是" />
            </el-select>

          </td>
          <td>
            <el-select v-model="item.searchable"
                       placeholder="作为查询条件">
              <el-option :value="false"
                         label="否" />

              <el-option :value="true"
                         label="是" />
            </el-select>

          </td>
          <td>
            <el-input type="input"
                      v-model="item.slotName"
                      placeholder="插槽"></el-input>
          </td>

          <td>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-minus"
                       circle
                       class="inline_button"
                       @click.prevent="removeItem(item)" />
          </td>
        </tr>
      </draggable>
    </table>
    <el-button style="margin:0 auto;display:block;margin-top:10px"
               size="mini"
               type="primary "
               circle
               icon="el-icon-plus"
               @click="addItem" />

  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { getKeyBytableName } from '@/api/system/form';

export default {
  components: {
    Draggable,
  },

  props: ['tablename', 'config'],
  data() {
    return {
      selectList: [],
      finalList: [],
      configObj: {
        // 普通列初始对象
        label: '',
        prop: '',
        prop_more: '',
        align: 'center',
        sortable: true,
        width: '',
        min_width: '100px',
        header_align: 'center',
        show_overflow_tooltip: false,
        searchable: true,
        formatter: '',
      },
      operation: {
        // 操作列对象功能
        label: '操作', // 操作列的行首文字
        width: '200', // 操作列的宽度
        className: '', // 操作列的class名
        data: [
          // 操作列数据
          {
            name: 'edit',
            label: '修改', // 按钮文字
            Fun: 'handleEdit', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            classname: 'show', // 按钮的类名
          },
          {
            name: 'detail',
            label: '详情', // 按钮文字
            Fun: 'handleEdit', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            classname: 'show', // 按钮的类名
          },
          {
            name: 'delete',
            label: '删除', // 按钮文字
            Fun: 'handleDelete', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            classname: 'show', // 按钮的类名
          },
        ],
      },
      true: true,
      false: false,
    };
  },
  watch: {
    tablename: {
      immediate: true,
      handler() {
        getKeyBytableName(this.tablename).then((response) => {
          this.selectList = response.data;
          this.selectList.forEach((item) => {
            item.COLUMN_NAME = item.COLUMN_NAME.toLowerCase();

            /*  如果是初次制作，默认显示所有列
             *  label为数据库字段注释
             *  value为数据库字段名
             */
            if (
              this.config.columnList.length === 0
              || !this.config.columnList
            ) {
              const obj = { ...this.configObj };
              obj.label = item.COLUMN_COMMENT;
              obj.prop = item.COLUMN_NAME.toLowerCase();
              this.config.columnList.push({ ...obj });
            }
          });
        });
      },
    },
  },
  methods: {
    removeItem(item) {
      const index = this.config.columnList.indexOf(item);
      if (index != null) {
        this.config.columnList.splice(index, 1);
      }
    },
    addItem() {
      this.config.columnList.push({ ...this.configObj });
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  width: 100%;
}

th {
  font-size: 14px;
}
.listconfig_table {
  width: 100%;
  overflow-x: auto;
}
</style>
