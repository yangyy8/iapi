<template lang="html">
  <div class="fwq">

    <div class="middle-top mb-2">

    </div>

<div class="middle">
  <div class="yy-title">DMZ区</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;"
    @cell-click="qqqq">
            <el-table-column
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="zone"
              label="类型"

            >
            </el-table-column>

            <el-table-column
              prop="HOSTADDRESS"
              label="IP地址"

            >
            </el-table-column>
            <el-table-column
              prop="CPU"
              label="CPU使用率"

            >
            </el-table-column>
            <el-table-column
              prop="mPercent"
              label="应用内存使用率"

            >
            </el-table-column>
            <el-table-column
              prop="diskPercent"
              label="磁盘使用率"

            >
            </el-table-column>
            <el-table-column
              prop="netIn"
              label="网络流量（入）"

            >
            </el-table-column>
            <el-table-column
              prop="netOut"
              label="网络流量（出）"

            >
            </el-table-column>
            <el-table-column
              label="文件系统"
            >
            <template slot-scope="scope">
                <el-row v-for='i in scope.row.FILESYSTEM'>
                <el-col>{{i.avail}}</el-col>
                <el-col>{{i.fileSystem}}</el-col>
                <el-col>{{i.mount}}</el-col>
                <el-col>{{i.size}}</el-col>
                <el-col>{{i.used}}</el-col>
                <el-col>{{i.usedPer}}</el-col>
              </el-row>
            </template>
            </el-table-column>
  </el-table>
</div>
 <div class="middle">
   <div class="yy-title">业务平台区</div>
   <el-table
     :data="tableData1"
     border
     style="width: 100%;">

             <el-table-column
               prop="index"
               label="序号"
               width="50"
             >
             </el-table-column>
             <el-table-column
               prop="type"
               label="类型"
                 width="120"
             >
             </el-table-column>
             <el-table-column
               prop="zone"
               label="模块"
                 width="120"
             >
             </el-table-column>
             <el-table-column
               prop="userate"
               label="CPU使用率"
                 width="90"
             >
             </el-table-column>
             <el-table-column
               prop="apprate"
               label="应用内存使用率"
                 width="130"
             >
             </el-table-column>
             <el-table-column
               prop="cprate"
               label="磁盘使用率"
                 width="100"
             >
             </el-table-column>
             <el-table-column
               prop="networkin"
               label="网络流量（入）"
                 width="130"
             >
             </el-table-column>
             <el-table-column
               prop="networkout"
               label="网络流量（出）"
                 width="130"
             >
             </el-table-column>
             <el-table-column
               prop="filesystem"
               label="文件系统"
             >
             </el-table-column>
   </el-table>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pd: {},
      tableData: [],
      tableData1: [],
      title:[],
      tableTitle:[]
    }
  },
  created() {
    this.getList({});

  },
  // computed:{
  //   ss:function(val){
  //     console.log(JSON.parse(val))
  //     return JSON.parse(val)
  //   }
  // },
  methods: {

    getList(pd) {

      this.$api.post('/eamp/monitorServer/queryMonitorServer', pd,
        r => {
          console.log(r);
          this.tableData = r.data.dmz;
          this.tableData1 = r.data.business;
          // for(var i=0;i<r.data.dmz.length;i++){
          //   this.tableTitle = JSON.parse(r.data.dmz[0].FILESYSTEM);
          //
          // }
          // console.log(this.tableTitle)
        })
    },
    qqqq(row){
      console.log(row.FILESYSTEM);
    },
    ss(val){
      let a=JSON.parse(val)
      console.log(a)
      return a
    }
  },



}
</script>

<style scoped>

</style>
