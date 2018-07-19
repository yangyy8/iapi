<template lang="html">
  <div class="listAnalysis">
    <div class="middle middle-top">
      <div class="title-green">
        名单信息
      </div>
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9">刷新</el-button>
      <table class="o-table2" cellspacing="0">
        <tr class="th1">
          <th rowspan="2"  colspan="2">名单类别</th>
          <th colspan="2" align="center">本地数据</th>
          <th colspan="2" align="center">局部数据</th>
        </tr>
        <tr class="th2">
          <td>有效数据</td>
          <td>失效数据</td>
          <td>有效数据</td>
          <td>失效数据</td>
        </tr>
        <tr>
          <td rowspan="4" class="th3">黑名单</td>
          <td>不准入境</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td>失效证件</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td>作废签证</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td>小计</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">白名单</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">临控名单</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">重点关注人员</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">合计</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
          <td>性别</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
       tableLeft:["白名单","黑名单"]
     }
   }

}
</script>

<style scoped>
.o-table2{
  width: 100%;
}
.o-table2 tr{
  height: 40px;
}
.o-table2 td, th{
  border: 1px #eee solid;
  /* height: 32px; */
}
.th1{
  background: #909399;
  color: #fff;
}
.th2{
  background: #d0ebfc;
  color: #3367a3;
}
.th3{
  background: #78a4d1;
  color: #fff;
}
</style>
