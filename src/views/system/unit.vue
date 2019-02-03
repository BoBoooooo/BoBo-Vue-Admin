<template>
  <div
    id="unit"
    class="widget-box">


<el-row>
  <el-col :span="8">

    <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText" style="width:80%;">
</el-input>


     <el-tree
            ref="unittree"
            :data="unitList"
            :props="defaultProps"
            node-key="id"
            highlight-current
              :default-expanded-keys="['00000000-0000-0001-0000-000000000000']"
            @node-click="unitTreeClick"
                          :filter-node-method="filterNode"

            />
  </el-col>
    <el-col :span="16">
         <el-form
        :model="temp"
        class="small-space"
        label-position="left"
        label-width="70px" v-if="temp">
             <el-form-item label="单位名称">
          <el-input
            v-model="temp.unitname"
            class="filter-item"
            placeholder="请输入单位名称"/>
        </el-form-item>
  <el-form-item label="上级单位">
          <el-select
            v-model="temp.parentid"
            placeholder="请选择"
            filterable>
            <el-option
              v-for="item in unitoptions"
              :key="item.id"

              :label="item.unitname"
              :value="item.id"/>
          </el-select>

        </el-form-item>

        <el-form-item label="排序码">
          <el-input
            v-model="temp.rank"
            class="filter-item"
            placeholder="请输入排序码"/>
        </el-form-item>


      </el-form>
    <div
        class="dialog-footer">
         <el-button
          type="success"
          @click="clearObj">新 增</el-button>
        <el-button
          type="primary"
          @click="save">保 存</el-button>
        <el-button v-if="status==='update'" type="danger" @click="Delete">删 除</el-button>

      </div>
    </el-col>

</el-row>

  </div>
</template>

<script>
import {
  GetUnitTree,
  DeleteUnit,
  UnitList,
  GetUnitDetail,
  AddUnit,
  UpdateUnit,
  getObj,
} from '@/api/system/unit';


export default {
  name: 'Unit',
  data() {
    return {
      unitoptions: [],
      filterText: '',

      status: 'create',
      unitList: null,
      temp: null,
      defaultProps: {
        children: 'children',
        label: 'nodeName',
      },
    }
  },

  created() {
    getObj().then((res) => {
      this.temp = res.data
    })
    UnitList().then((res) => {
      this.unitoptions = res.data.list;
    })
    this.fetchUnit()
  },

  watch: {
    filterText(val) {
      this.$nextTick(() => {
        this.$refs.unittree.filter(val);
      })
    },
  },


  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.nodeName.includes(value) !== false;
    },
    clearObj() {
      Object.keys(this.temp).forEach((key) => {
        this.temp[key] = ''
      })
      this.status = 'create'
    },
    fetchUnit() {
      GetUnitTree().then((response) => {
        this.unitList = response.data;
      });
    },
    unitTreeClick(obj) {
      this.status = 'update'
      this.Edit(obj.id)
    },

    Delete() {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DeleteUnit(this.temp.id).then(() => {
            this.fetchUnit()
          })
        })
    },
    Edit(id) {
      GetUnitDetail(id).then((response) => {
        this.temp = response.data;
      });
    },
    save() {
      if (this.status === 'create') {
        AddUnit(this.temp).then(() => {
          this.fetchUnit();
        })
      } else {
        UpdateUnit(this.temp).then(() => {
          this.fetchUnit();
        })
      }
    },
  },
};

</script>

<style scope>
.tree{
  max-height:400px;
  overflow: auto;
}
.dialog-footer{
  text-align: center;
}
</style>
