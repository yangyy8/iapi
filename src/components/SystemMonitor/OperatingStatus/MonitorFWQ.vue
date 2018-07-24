<template lang="html">
  <div class="fwq">

    <div class="middle-top mb-2">

    </div>

<div class="middle">
  <div class="yy-title">DMZ区</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;">
            <el-table-column
              type="index"
              label="序号"
              width="50"

            >
            </el-table-column>
            <el-table-column
              prop="zone"
              label="类型"
              sortable
            >
            </el-table-column>

            <el-table-column
              prop="HOSTADDRESS"
              label="IP地址"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="CPU"
              label="CPU使用率"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="mPercent"
              label="应用内存使用率"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="diskPercent"
              label="磁盘使用率"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="netIn"
              label="网络流量（入）"
            sortable
            >
            </el-table-column>
            <el-table-column
              prop="netOut"
              label="网络流量（出）"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="文件系统"
              width="630"
            >
            <template slot-scope="scope">

              <el-row   v-if="scope.row.fileSysArr!=null">
              <el-col :span="4">avail</el-col>
              <el-col :span="4">fileSystem</el-col>
              <el-col :span="4">mount</el-col>
              <el-col :span="4">size</el-col>
              <el-col :span="4">used</el-col>
              <el-col :span="4">usedPer</el-col>
             </el-row>
              <el-row v-for='i in scope.row.fileSysArr'>
                <el-col :span="4">{{i.avail}}</el-col>
                <el-col :span="4">{{i.fileSystem}}</el-col>
                <el-col :span="4">{{i.mount}}</el-col>
                <el-col :span="4">{{i.size}}</el-col>
                <el-col :span="4">{{i.used}}</el-col>
                <el-col :span="4">{{i.usedPer}}</el-col>
              </el-row>

              <!-- <div class="filesystems"  v-if="scope.row.fileSysArr!=null">
                 <ul>
                   <li>avail</li>
                   <li>fileSystem</li>
                   <li>mount</li>
                   <li>size</li>
                   <li>used</li>
                   <li>usedPer</li>
                 </ul>
              </div>
              <div  class="filesystems"  v-for='i in scope.row.fileSysArr'>
                 <ul>
                   <li>{{i.avail}}</li>
                   <li>{{i.fileSystem}}</li>
                   <li>{{i.mount}}</li>
                   <li>{{i.size}}</li>
                   <li>{{i.used}}</li>
                   <li>{{i.usedPer}}</li>
                 </ul>
              </div> -->

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
               sortable
             >
             </el-table-column>
             <el-table-column
               prop="zone"
               label="模块"
              sortable
             >
             </el-table-column>
             <el-table-column
               prop="userate"
               label="CPU使用率"
              sortable
             >
             </el-table-column>
             <el-table-column
               prop="apprate"
               label="应用内存使用率"
                sortable
             >
             </el-table-column>
             <el-table-column
               prop="cprate"
               label="磁盘使用率"
              sortable
             >
             </el-table-column>
             <el-table-column
               prop="networkin"
               label="网络流量（入）"
              sortable
             >
             </el-table-column>
             <el-table-column
               prop="networkout"
               label="网络流量（出）"
              sortable
             >
             </el-table-column>
             <el-table-column
               label="文件系统"
             >
             <template slot-scope="scope">

               <el-row  v-if="scope.row.fileSysArr!=null">
               <el-col :span="4">avail</el-col>
               <el-col :span="4">fileSystem</el-col>
               <el-col :span="4">mount</el-col>
               <el-col :span="4">size</el-col>
               <el-col :span="4">used</el-col>
               <el-col :span="4">usedPer</el-col>
              </el-row>
               <el-row v-for='i in scope.row.fileSysArr'>
                 <el-col :span="4">{{i.avail}}</el-col>
                 <el-col :span="4">{{i.fileSystem}}</el-col>
                 <el-col :span="4">{{i.mount}}</el-col>
                 <el-col :span="4">{{i.size}}</el-col>
                 <el-col :span="4">{{i.used}}</el-col>
                 <el-col :span="4">{{i.usedPer}}</el-col>
               </el-row>
               </template>
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

      this.$api.post('/manage-platform/monitorServer/queryMonitorServer', pd,
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


  },




}

</script>

<style scoped>
.filesystems{
  width: 600px;
  display: flex;
  flex-direction: column;}
.filesystems ul{list-style: none;}
.filesystems ul li{ float: left;width: 100px; }

</style>
<style media="screen">
  .el-table_1_column_9 .cell{
    display: block!important;
  }
</style>
