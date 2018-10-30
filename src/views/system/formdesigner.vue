<template>
  <div class="app-container" ref="container" id="formdesigner">
<making-form preview generate-json ref="form" >
    <template slot="action">
      <el-button @click="test">保存</el-button>
    </template>
</making-form>
  </div>
</template>

<script>
import {MakingForm} from 'form-making'

export default {
  name:"formdesigner",
  data(){
    return {

    }
  },
  methods:{
      test(){
        this.$refs.form.getJSON().then(data=>{
            console.log(data)
        })
      }
  },
  components:{
MakingForm
  }
}
</script>
