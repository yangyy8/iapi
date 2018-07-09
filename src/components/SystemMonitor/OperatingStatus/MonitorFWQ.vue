<template lang="html">
  <div class="fwq">

    <div class="middle-top mb-2">

    </div>

<div class="middle">
  <div class="title">DMZ区</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;"
  >

            <el-table-column
              prop="index"
              label="序号"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="zone"
              label="类型"
                width="120"
            >
            </el-table-column>

            <el-table-column
              prop="HOSTADDRESS"
              label="IP地址"
                width="120"
            >
            </el-table-column>
            <el-table-column
              prop="CPU"
              label="CPU使用率"
                width="120"
            >
            </el-table-column>
            <el-table-column
              prop="mPercent"
              label="应用内存使用率"
                  width="130"
            >
            </el-table-column>
            <el-table-column
              prop="diskPercent"
              label="磁盘使用率"
                width="100"
            >
            </el-table-column>
            <el-table-column
              prop="netIn"
              label="网络流量（入）"
                width="130"
            >
            </el-table-column>
            <el-table-column
              prop="netOut"
              label="网络流量（出）"
                width="130"
            >
            </el-table-column>
            <el-table-column
              prop="FILESYSTEM"
              label="文件系统"
            >
            </el-table-column>
  </el-table>
</div>
 <div class="middle">
   <div class="title">业务平台区</div>
   <el-table
     :data="tableData1"
     border
     style="width: 100%;"
  >

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
               prop="type"
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
  created(){
    this.getList({});

  },
methods:{

  getList(pd){

    this.$api.post('/eamp/monitorServer/queryMonitorServer',pd,
     r => {
       console.log(r);
       this.tableData=r.data.dmz;

    })
  },
},

  data() {
    return {

    }
  },

}
</script>

<style scoped>
.title {
  line-height: 50px;
  font-size: 18px;
  color: #4CC4A1;
  font-family: 微软雅黑;
}
</style>
