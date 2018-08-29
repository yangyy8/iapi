<template lang="html">
  <div class="listAnalysis">
    <div class="middle middle-top">
      <div class="title-green">
        名单信息
      </div>
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9" @click="getData">刷新</el-button>
      <table class="o-table2" cellspacing="0">
        <tr class="th1">
          <th rowspan="2"  colspan="2">名单类别</th>
          <th colspan="2" align="center">本地数据</th>
          <th colspan="2" align="center">部局数据</th>
        </tr>
        <tr class="th2">
          <td>有效数据</td>
          <td>失效数据</td>
          <td>有效数据</td>
          <td>失效数据</td>
        </tr>
        <tr>
          <td rowspan="4" class="th3">黑名单</td>
          <td class="th4">不准入境</td>
          <td class="tc1">{{tableData.EFFECTIVE_BZRJ}}</td>
          <td class="tc2">{{tableData.INVALID_BZRJ}}</td>
          <td class="tc1">{{tableData.EFFECTIVE_BZRJ_BJ}}</td>
          <td class="tc2">{{tableData.INVALID_BZRJ_BJ}}</td>
        </tr>
        <tr>
          <td class="th4">失效证件</td>
          <td class="tc1">{{tableData.EFFECTIVE_INVALIDCARD}}</td>
          <td class="tc2">{{tableData.INVALID_INVALIDCARD}}</td>
          <td class="tc1">{{tableData.EFFECTIVE_INVALIDCARD_BJ}}</td>
          <td class="tc2">{{tableData.INVALID_INVALIDCARD_BJ}}</td>
        </tr>
        <tr>
          <td class="th4">失效签证</td>
          <td class="tc1">{{tableData.EFFECTIVE_INVALIDVISA}}</td>
          <td class="tc2">{{tableData.INVALID_INVALIDVISA}}</td>
          <td class="tc1">{{tableData.EFFECTIVE_INVALIDVISA_BJ}}</td>
          <td class="tc2">{{tableData.INVALID_INVALIDVISA_BJ}}</td>
        </tr>
        <tr>
          <td class="th4">小计</td>
          <td class="tc1">{{tableData.EFFECTIVE_BLACKNAMELISTCOUNT}}</td>
          <td class="tc2">{{tableData.INVALID_BLACKNAMELISTCOUNT}}</td>
          <td class="tc1">-</td>
          <td class="tc2">-</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">白名单</td>
          <td class="tc1">{{tableData.EFFECTIVE_WHITENAMELIST}}</td>
          <td class="tc2">{{tableData.INVALID_WHITENAMELIST}}</td>
          <td class="tc1">-</td>
          <td class="tc2">-</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">临控名单</td>
          <td class="tc1">{{tableData.EFFECTIVE_TCTLNAMELIST}}</td>
          <td class="tc2">{{tableData.INVALID_TCTLNAMELIST}}</td>
          <td class="tc1">-</td>
          <td class="tc2">-</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">重点关注人员</td>
          <td class="tc1">{{tableData.EFFECTIVE_FOCUSLIST}}</td>
          <td class="tc2">{{tableData.INVALID_FOCUSLIST}}</td>
          <td class="tc1">-</td>
          <td class="tc2">-</td>
        </tr>
        <tr>
          <td colspan="2" class="th3">合计</td>
          <td class="tc1">{{tableData.EFFECTIVE_BDCOUNT}}</td>
          <td class="tc2">{{tableData.INVALID_BDCOUNT}}</td>
          <td class="tc1">{{tableData.EFFECTIVE_COUNT_BJ}}</td>
          <td class="tc2">{{tableData.INVALID_COUNT_BJ}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
       tableData:{}
     }
   },
   mounted(){
     this.getData();
   },
   activated(){
     this.getData();
   },
   methods:{
     getData(){
       this.$api.post('/manage-platform/nameList/getNameListDataAnalysis',{},
        r => {
          console.log(r);
          this.tableData=r.data;
       })
     },
   },


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
  height: 40px;
  padding: 0!important;
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
.th4{
  background: #8db3d8;
  color: #fff;
}
.tc1{
  color: #439227;
}
.tc2{
  color: #fb6d55
}
</style>
