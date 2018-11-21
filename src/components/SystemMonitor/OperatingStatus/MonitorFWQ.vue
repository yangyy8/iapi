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
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="类型">
    </el-table-column>

    <el-table-column
      prop="HOSTADDRESS"
      label="IP地址"
      sortable>
    </el-table-column>
    <el-table-column
      prop="CPU"
      label="CPU使用率(%)"
      sortable>
    </el-table-column>
    <el-table-column
      prop="mPercent"
      label="内存使用率(%)"
      sortable>
    </el-table-column>
    <el-table-column
      prop="diskPercent"
      label="磁盘使用率(%)"
      sortable>
    </el-table-column>
    <el-table-column
      prop="netIn"
      label="网络流量（入）(%)"
      sortable>
    </el-table-column>
    <el-table-column
      prop="netOut"
      label="网络流量（出）(%)"
      sortable>
   </el-table-column>
    <el-table-column
     label="状态" width="80">
     <template slot-scope="scope">
       <div class="yycolor" id='yy1'>
         {{scope.row.netStat | fiftersate }}
       </div>
     </template>
    </el-table-column>
    <el-table-column
      label="文件系统"
    >
    <template slot-scope="scope">
   <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.fileSysArr)">详情</el-button>
      <!-- <el-row   v-if="scope.row.fileSysArr!=null">
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
      </el-row> -->
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
       type="index"
       label="序号"
       width="50">
     </el-table-column>
     <el-table-column
       prop="name"
       label="类型">
     </el-table-column>
     <el-table-column
       prop="HOSTADDRESS"
       label="IP地址"
       sortable>
     </el-table-column>
     <el-table-column
       prop="CPU"
       label="CPU使用率(%)"
       sortable>
     </el-table-column>
     <el-table-column
       prop="mPercent"
       label="内存使用率(%)"
       sortable>
     </el-table-column>
     <el-table-column
       prop="diskPercent"
       label="磁盘使用率(%)"
       sortable>
     </el-table-column>
     <el-table-column
       prop="netIn"
       label="网络流量（入）(%)"
       sortable>
     </el-table-column>
     <el-table-column
       prop="netOut"
       label="网络流量（出）(%)"
       sortable>
     </el-table-column>
     <el-table-column
      label="状态" width="80">
      <template slot-scope="scope">
        <div class="yycolor" id='yy2'>
          {{scope.row.netStat | fiftersate }}
        </div>
      </template>
     </el-table-column>
     <el-table-column
       label="文件系统"
     >
     <template slot-scope="scope">
          <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.fileSysArr)">详情</el-button>
<!--
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
       </el-row> -->
       </template>
     </el-table-column>
   </el-table>

    </div>

    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      >

      <el-row  v-if="filesytem!=null" class="filearr">

      <el-col :span="4" class="fileline">文件系统名称</el-col>
      <el-col :span="4" class="fileline">挂载位置</el-col>
      <el-col :span="4" class="fileline">该系统空间大小</el-col>
      <el-col :span="4" class="fileline">已经使用的空间</el-col>
        <el-col :span="4" class="fileline">剩余可用空间</el-col>
      <el-col :span="4">使用率</el-col>
     </el-row>
     <el-row v-else class="filearrk">
     <el-col :span="24">暂无数据</el-col>
    </el-row>
      <el-row v-for='(i,index) in filesytem' :key="index" class="filearr1">

        <el-col :span="4" >{{i.fileSystem}}</el-col>
        <el-col :span="4" >{{i.mount}}</el-col>
        <el-col :span="4" >{{i.size}}</el-col>
        <el-col :span="4" >{{i.used}}</el-col>
          <el-col :span="4" >{{i.avail}}</el-col>
        <el-col :span="4">{{i.usedPer}}</el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">

        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pd: {},
      tableData: [],
      tableData1: [],
      tableData2: [],
      filesytem: "",
      title: [],
      tableTitle: [],
      detailsDialogVisible: false,
    }
  },
  mounted() {
    this.getList();
  },
  created() {
    this.getList();
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
    details(i) {
      this.detailsDialogVisible = true;
      this.filesytem = i;
    },


  },


  filters: {

    fifter2(val) {
      if (val == "172.16.1.101" || val == "172.16.1.102" || val == "172.16.1.103") {
        return "网站应用服务器"
      } else if (val == "172.16.1.104" || val == "172.16.1.105") {
        return "负载均衡服务器"
      } else if (val == "172.16.1.106") {
        return "后台任务服务器"
      } else if (val == "172.16.1.107") {
        return "监控运维服务器"
      } else if (val == "172.16.1.108" || val == "172.16.1.109" || val == "172.16.1.110") {
        return "整合分发服务器"
      } else if (val == "172.16.1.111" || val == "172.16.1.112") {
        return "队列服务器"
      }else if(val!=""){
          return "其他服务器"
      }
    },
    fiftersate(val){
      if(val=="0"){

        return "正常"
      }else {

        return "异常"
      }
    }

  }

}
</script>

<style scoped>
.filesystems {
  width: 600px;

  display: flex;
  flex-direction: column;
}

.filesystems ul {
  list-style: none;
}

.filesystems ul li {
  float: left;
  width: 100px;
}

.filearr {
  background: #858585;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
}

.filearr1 {
  text-align: center;
  line-height: 30px;
}

.filearrk {
  text-align: center;
  color: red;
  line-height: 50px;
  font-size: 18px;
}

.fileline {
  border-right: 1px solid #ffffff;
}
.yycolor{ width: 60px; height: 30px; background: #00FF00; line-height: 30px;}
.yycolory{ width: 60px; height: 30px; background: #FF0000; line-height: 30px;}
</style>
<style media="screen">
.el-table_1_column_9 .cell {
  display: block !important;
}
</style>
