<!--证件种类封装-->
<template lang="html">
  <el-select v-model="docCodeModel" filterable @visible-change="queryDocCode" placeholder="请选择"  size="small" class="input-input">
    <el-option
      v-for="item in docCode"
      :key="item.CODE"
      :label="item.CODE+' - '+item.NAME"
      :value="item.CODE">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
      docCodeModel: {
          type: String,
          default: ''
      }
  },
  data(){
    return{
      docCode:[]
    }
  },
  methods: {
    queryDocCode(){
      this.$api.post('/eamp/codeTable/queryDocCode',{},
       r => {
         console.log(r);
         if(r.success){
           this.docCode=r.data;
           this.$emit('transDocCode',this.docCodeModel)
         }
      })
    },
  }
}
</script>
