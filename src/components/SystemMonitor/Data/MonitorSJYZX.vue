<template lang="html">
  <div class="listAnalysis">
    <div class="middle middle-top">


      <el-table
        border
        class="yy-th-data"
        :data="tableData3"
        style="width: 100%">
        <el-table-column label="" prop="left">

        </el-table-column>
        <el-table-column
          prop="date"
          label="内存数据"
          >

        </el-table-column>
        <el-table-column
          prop="date"
          label="业务平台"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="是否一致"
          width="80">
        </el-table-column>
        <el-table-column
          prop="date"
          label="同步时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          width="100">
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data() {
     return {

       tableData3: [{
         left: '入境黑名单',
         date: '',

       }, {
         left: '出境黑名单',
         date: '',

       }, {
         left: '失效签证',

         date: '',

       }, {
         left: '入境白名单',

         date: '',

       }, {
         left: '出境白名单',

         date: '',

       }, {
         left: '入境临空名单',

         date: '',

       }, {
         left: '出境临空名单',

         date: '',

       }, {
         left: '数据项校验',

         date: '',

       }, {
         left: '业务规则',

         date: '',

       }]
     }
   }

}
</script>

<style scoped>

</style>
