<template lang="html">
<div class="queryNationality">
  <span class="input-text">国籍：</span>
  <el-select v-model="nationality" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
    <el-option
      v-for="item in nation"
      :key="item.CODE"
      :label="item.CODE+' - '+item.CNAME"
      :value="item.CODE">
    </el-option>
  </el-select>
</div>
</template>

<script>
export default {
  name:"queryNationality",
  props: {
      // nationality: {
      //     type: String,
      //     default: ''
      // }
  },
  data(){
    return{
      nation:[],
      nationality:''
    }
  },
  methods: {
    queryNationality(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nation=r.data;
           this.$emit('transNation',this.nationality)
         }
      })
      // this.nation=[
      //   {
      //     CNAME:"中国",
      //     CODE:"SNH"
      //   }
      // ]
    },
  }
}
</script>

<style scoped>
.queryNationality{
  width: 100%;
  display: flex;
}
</style>
