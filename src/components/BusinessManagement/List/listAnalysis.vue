<template lang="html">
  <div class="listAnalysis">
    <div class="middle middle-top">
      <div class="title-green">
        名单信息
      </div>
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9">刷新</el-button>
      <el-table
        border
        class="o-th2"
        :data="tableData3"
        style="width: 100%">
        <el-table-column label="名单类别" prop="left">

        </el-table-column>
        <el-table-column
          prop="date"
          label="本地数据"
          width="565">
          <el-table-column
            label="有效数据">
          </el-table-column>
          <el-table-column
            label="失效数据">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="date"
          label="部局数据"
          width="565">
          <el-table-column
            label="有效数据">
          </el-table-column>
          <el-table-column
            label="失效数据">
          </el-table-column>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
       tableLeft:["白名单","黑名单"],
       tableData3: [{
         left: '白名单',
         date: '2016-05-03',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-02',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-04',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-01',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-08',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-06',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }, {
         left: '白名单',

         date: '2016-05-07',
         name: '王小虎',
         province: '上海',
         city: '普陀区',
         address: '上海市普陀区金沙江路 1518 弄',
         zip: 200333
       }]
     }
   }

}
</script>

<style scoped>
</style>
