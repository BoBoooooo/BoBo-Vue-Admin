<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item
        v-if="data.type!='grid'"
        label="标题">
        <el-input v-model="data.name"/>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('width')>=0"
        label="宽度">
        <el-input v-model="data.options.width"/>
      </el-form-item>

      <el-form-item
        v-if="Object.keys(data.options).indexOf('size')>=0"
        label="大小">
        宽度：<el-input
          v-model.number="data.options.size.width"
          style="width: 90px;"
          type="number"/>
        高度：<el-input
          v-model.number="data.options.size.height"
          style="width: 90px;"
          type="number"/>
      </el-form-item>

      <el-form-item
        v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')"
        label="占位内容">
        <el-input v-model="data.options.placeholder"/>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('inline')>=0"
        label="布局方式">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('showInput')>=0"
        label="显示输入框">
        <el-switch v-model="data.options.showInput" />
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('min')>=0"
        label="最小值">
        <el-input-number
          v-model="data.options.min"
          :min="0"
          :max="100"
          :step="1"/>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('max')>=0"
        label="最大值">
        <el-input-number
          v-model="data.options.max"
          :min="0"
          :max="100"
          :step="1"/>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('step')>=0"
        label="步长">
        <el-input-number
          v-model="data.options.step"
          :min="0"
          :max="100"
          :step="1"/>
      </el-form-item>
      <el-form-item
        v-if="data.type=='select'"
        label="是否多选">
        <el-switch
          v-model="data.options.multiple"
          @change="handleSelectMuliple"/>
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('allowHalf')>=0"
        label="允许半选">
        <el-switch
          v-model="data.options.allowHalf"
        />
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('showAlpha')>=0"
        label="支持透明度选择">
        <el-switch
          v-model="data.options.showAlpha"
        />
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('showLabel')>=0"
        label="是否显示标签">
        <el-switch
          v-model="data.options.showLabel"
        />
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('options')>=0"
        label="选项">
        <el-radio-group
          v-model="data.options.remote"
          size="mini"
          style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input
              v-model="data.options.remoteFunc"
              size="mini"
              style="">
              <template slot="prepend">远端方法</template>
            </el-input>
            <el-input
              v-model="data.options.props.value"
              size="mini"
              style="">
              <template slot="prepend">值</template>
            </el-input>
            <el-input
              v-model="data.options.props.label"
              size="mini"
              style="">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                element="ul"
              >
                <li
                  v-for="(item, index) in data.options.options"
                  :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input
                      :style="{'width': data.options.showLabel? '90px': '190px' }"
                      v-model="item.value"
                      size="mini"/>
                    <el-input
                      v-if="data.options.showLabel"
                      v-model="item.label"
                      style="width:100px;"
                      size="mini"/>
                      <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i
                    class="drag-item"
                    style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" /></i>
                  <el-button
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px;margin-left: 5px;"
                    @click="handleOptionsRemove(index)"/>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable
                :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                element="ul"
              >
                <li
                  v-for="(item, index) in data.options.options"
                  :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input
                      :style="{'width': data.options.showLabel? '90px': '190px' }"
                      v-model="item.value"
                      size="mini"/>
                    <el-input
                      v-if="data.options.showLabel"
                      v-model="item.label"
                      style="width:100px;"
                      size="mini"/>
                  </el-checkbox>
                  <i
                    class="drag-item"
                    style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" /></i>
                  <el-button
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px;margin-left: 5px;"
                    @click="handleOptionsRemove(index)"/>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button
              type="text"
              @click="handleAddOption">添加选项</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item
        v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type == 'textarea' || data.type == 'input' || data.type=='rate' || data.type=='color' || data.type=='switch')"
        label="默认值">
        <el-input
          v-if="data.type=='textarea'"
          :rows="5"
          v-model="data.options.defaultValue"
          type="textarea"/>
        <el-input
          v-if="data.type=='input'"
          v-model="data.options.defaultValue"/>
        <el-rate
          v-if="data.type == 'rate'"
          :max="data.options.max"
          :allow-half="data.options.allowHalf"
          v-model="data.options.defaultValue"
          style="display:inline-block;vertical-align: middle;"/>
        <el-button
          v-if="data.type == 'rate'"
          type="text"
          style="display:inline-block;vertical-align: middle;margin-left: 10px;"
          @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        />
        <el-switch
          v-if="data.type=='switch'"
          v-model="data.options.defaultValue"/>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item
          v-if="data.type == 'date'"
          label="显示类型">
          <el-select v-model="data.options.type">
            <el-option value="year"/>
            <el-option value="month"/>
            <el-option value="date"/>
            <el-option value="dates"/>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"/>
            <el-option value="datetimerange"/>
            <el-option value="daterange"/>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="data.type == 'time'"
          label="是否为范围选择">
          <el-switch
            v-model="data.options.isRange"
          />
        </el-form-item>
        <el-form-item
          v-if="data.type == 'date'"
          label="是否获取时间戳">
          <el-switch
            v-model="data.options.timestamp"
          />
        </el-form-item>
        <el-form-item
          v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')"
          label="占位内容">
          <el-input v-model="data.options.placeholder"/>
        </el-form-item>
        <el-form-item
          v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'"
          label="开始时间占位内容">
          <el-input v-model="data.options.startPlaceholder"/>
        </el-form-item>
        <el-form-item
          v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'"
          label="结束时间占位内容">
          <el-input v-model="data.options.endPlaceholder"/>
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="data.options.format"/>
        </el-form-item>
        <el-form-item
          v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0"
          label="默认值">
          <el-time-picker
            v-if="!data.options.isRange"
            key="1"
            v-model="data.options.defaultValue"
            :arrow-control="data.options.arrowControl"
            :value-format="data.options.format"
            style="width: 100%;"
          />
          <el-time-picker
            v-if="data.options.isRange"
            key="2"
            v-model="data.options.defaultValue"
            :arrow-control="data.options.arrowControl"
            :value-format="data.options.format"
            style="width: 100%;"
            is-range
          />
        </el-form-item>
      </template>

      <template v-if="data.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="data.options.defaultType">
            <el-option
              value="String"
              label="字符"/>
            <el-option
              value="Object"
              label="对象"/>
            <el-option
              value="Array"
              label="数组"/>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input
            v-model.number="data.options.gutter"
            type="number"/>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable
            :list="data.columns"
            :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            element="ul"
          >
            <li
              v-for="(item, index) in data.columns"
              :key="index" >
              <i
                class="drag-item"
                style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" /></i>
              <el-input
                v-model.number="item.span"
                placeholder="栅格值"
                size="mini"
                style="width: 100px;"
                type="number"/>

              <el-button
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px;margin-left: 5px;"
                @click="handleOptionsRemove(index)"/>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button
              type="text"
              @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option
              value="start"
              label="左对齐"/>
            <el-option
              value="end"
              label="右对齐"/>
            <el-option
              value="center"
              label="居中"/>
            <el-option
              value="space-around"
              label="两侧间隔相等"/>
            <el-option
              value="space-between"
              label="两端对齐"/>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option
              value="top"
              label="顶部对齐"/>
            <el-option
              value="middle"
              label="居中"/>
            <el-option
              value="bottom"
              label="底部对齐"/>
          </el-select>
        </el-form-item>
      </template>


      <template v-if="data.type != 'grid'">

        <el-form-item label="数据绑定Key">
          <el-input v-model="data.model"/>
        </el-form-item>
        <el-form-item label="操作属性">
          <el-checkbox
            v-if="Object.keys(data.options).indexOf('readonly')>=0"
            v-model="data.options.readonly">完全只读</el-checkbox>
          <el-checkbox
            v-if="Object.keys(data.options).indexOf('disabled')>=0"
            v-model="data.options.disabled">禁用</el-checkbox>
          <el-checkbox
            v-if="Object.keys(data.options).indexOf('editable')>=0"
            v-model="data.options.editable">文本框可输入</el-checkbox>
          <el-checkbox
            v-if="Object.keys(data.options).indexOf('clearable')>=0"
            v-model="data.options.clearable">显示清除按钮</el-checkbox>
          <el-checkbox
            v-if="Object.keys(data.options).indexOf('arrowControl')>=0"
            v-model="data.options.arrowControl">使用箭头进行时间选择</el-checkbox>
        </el-form-item>
        <el-form-item label="校验">
          <div>
            <el-checkbox v-model="data.options.required">必填</el-checkbox>
          </div>
          <el-select
            v-if="Object.keys(data.options).indexOf('dataType')>=0"
            v-model="data.options.dataType"
            size="mini" >
            <el-option
              value="string"
              label="字符串"/>
            <el-option
              value="number"
              label="数字"/>
            <el-option
              value="boolean"
              label="布尔值"/>
            <el-option
              value="integer"
              label="整数"/>
            <el-option
              value="float"
              label="浮点数"/>
            <el-option
              value="url"
              label="URL地址"/>
            <el-option
              value="email"
              label="邮箱地址"/>
            <el-option
              value="hex"
              label="十六进制"/>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input
              v-model.lazy="data.options.pattern"
              size="mini"
              style=" width: 240px;"
              placeholder="填写正则表达式"/>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import icon from 'vue-awesome/components/Icon'
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

export default {
  components: {
    Draggable,
    icon,
  },
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null,
      },
    }
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    },
  },
  watch: {
    'data.options.isRange': function (val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else if (Object.keys(this.data.options).indexOf('defaultValue') >= 0) { this.data.options.defaultValue = '' }
      }
    },
    'data.options.required': function (val) {
      if (val) {
        this.validator.required = { required: true, message: `${this.data.name}必须填写` }
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },
    'data.options.dataType': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = { type: val, message: `${this.data.name}格式不正确` }
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    'data.options.pattern': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = { pattern: eval(val), message: `${this.data.name}格式不匹配` }
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
  },
  methods: {
    handleOptionsRemove(index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项',
        })
      } else {
        this.data.options.options.push({
          value: '新选项',
        })
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: '',
        list: [],
      })
    },
    generateRule() {
      this.data.rules = []
      Object.keys(this.validator).forEach((key) => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }
      } else if (this.data.options.defaultValue.length > 0) {
        this.data.options.defaultValue = this.data.options.defaultValue[0]
      } else {
        this.data.options.defaultValue = ''
      }
    },
  },
}
</script>
