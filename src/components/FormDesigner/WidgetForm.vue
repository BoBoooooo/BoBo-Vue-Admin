<template>
  <div class="widget-form-container">
    <el-form
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'">

      <draggable
        v-model="data.list"

        :options="{group:'people', ghostClass: 'ghost'}"
        class="widget-form-list"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >

        <template v-for="(element, index) in data.list">
          <template v-if="element.type == 'grid'">
            <div
              v-if="element && element.key"
              :key="element.key"
              class="widget-grid-container data-grid"
              style="position: relative;">
              <el-row
                :class="{active: selectWidget.key == element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                class="widget-grid "
                type="flex"
                @click.native="handleSelectWidget(index)">
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0">
                  <div style="border: 1px dashed #999;">
                    <draggable
                      v-model="col.list"
                      :options="{group:'people', ghostClass: 'ghost'}"
                      class="widget-form-list"
                      style="padding-bottom: 50px;"
                      filter="widget-grid-container"
                      @end="handleMoveEnd"
                      @add="handleWidgetColAdd($event, element, colIndex)"
                    >
                      <widget-form-item
                        v-for="(el, i) in col.list"
                        v-if="el.key"
                        :key="el.key"
                        :element="el"
                        :select.sync="selectWidget"
                        :index="i"
                        :data="col"/>
                    </draggable>
                  </div>
                </el-col>

              </el-row>
              <el-button
                v-if="selectWidget.key == element.key"
                title="删除"
                style="bottom: -20px;"
                class="widget-action-delete"
                circle
                plain
                type="danger"
                @click.stop="handleWidgetDelete(index)">
                <icon
                  name="regular/trash-alt"
                  style="width: 12px;height: 12px;"/>
              </el-button>
            </div>
          </template>
          <template v-else>
            <widget-form-item
              v-if="element && element.key"
              :key="element.key"
              :element="element"
              :select.sync="selectWidget"
              :index="index"
              :data="data"/>
          </template>
        </template>

      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import icon from 'vue-awesome/components/Icon'
import WidgetFormItem from './WidgetFormItem'
import 'vue-awesome/icons/regular/keyboard'
import 'vue-awesome/icons/regular/trash-alt'
import 'vue-awesome/icons/regular/clone'
import 'vue-awesome/icons/regular/dot-circle'
import 'vue-awesome/icons/regular/check-square'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/regular/calendar-alt'
import 'vue-awesome/icons/regular/clock'
import 'vue-awesome/icons/th'
import 'vue-awesome/icons/sort-numeric-up'
import 'vue-awesome/icons/regular/star'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/regular/caret-square-down'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/regular/image'
import 'vue-awesome/icons/chalkboard'
import 'vue-awesome/icons/upload'

export default {
  components: {
    Draggable,
    WidgetFormItem,
    icon,
  },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select,
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true,
    },
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget(index) {
      console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd(evt) {
      console.log('add', evt)
      console.log('end', evt)
      const { newIndex } = evt
      const { to } = evt
      console.log(to)

      // 为拖拽到容器的元素添加唯一 key
      const key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: `func_${key}`,
        },
        key,
        // 绑定键值
        // model: `${this.data.list[newIndex].type }_${key}`,
        rules: [],
      })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item,
            })),
          },
        })
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({ ...item })),
        })
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex)
      const { newIndex } = $event
      const { oldIndex } = $event
      const { item } = $event

      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      console.log('from', item)

      const key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: `func_${key}`,
        },
        key,
        // 绑定键值
        // model: `${row.columns[colIndex].list[newIndex].type }_${key}`,
        rules: [],
      })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox') {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
              ...item,
            })),
          },
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
  },
}
</script>
