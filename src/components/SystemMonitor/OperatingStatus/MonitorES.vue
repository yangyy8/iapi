<template lang="html">
  <div class="fwq">

    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="10" >
          <el-button type="success" size="small" @click="getList(pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>

<div class="middle">
  <div class="yy-title">集群</div>
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
      prop="cluster_name"
      label="名称">
    </el-table-column>

    <el-table-column
      label="集群状态"
      sortable>
      <template slot-scope="scope">
        <span :class="{'yellow':scope.row.status == 'yellow','green':scope.row.status == 'green','red':scope.row.status == 'red'}">{{scope.row.status | fiftersate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="number_of_nodes"
      label="节点数">
    </el-table-column>
    <el-table-column
      prop="active_primary_shards"
      label="主分片数量"
      sortable>
    </el-table-column>
    <el-table-column
      label="副分片数量"
      sortable>
      <template slot-scope="scope">
        {{scope.row.active_shards - scope.row.active_primary_shards}}
      </template>
    </el-table-column>
    <el-table-column
      prop="unassigned_shards"
      label="未分配分片数"
      sortable>
    </el-table-column>
    <!-- <el-table-column
      label="操作">
    <template slot-scope="scope">
      <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.fileSysArr)">详情</el-button>
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
     </template>
    </el-table-column> -->
  </el-table>
</div>
 <div class="middle">
   <div class="yy-title">节点</div>
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
       label="名称">
     </el-table-column>
     <el-table-column
       prop="ip"
       label="IP地址">
     </el-table-column>
     <el-table-column
       label="状态">
       <template slot-scope="scope">
         <span :class="{'red':scope.row.statusName == '异常'}">{{scope.row.statusName}}</span>
       </template>
     </el-table-column>
     <el-table-column
       prop="version"
       label="ES版本"
       sortable>
     </el-table-column>
     <!-- <el-table-column
       label="操作">
     <template slot-scope="scope">
       <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.fileSysArr)">详情</el-button>
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
     </el-table-column> -->
   </el-table>
  </div>

  <div class="middle" v-show="false">
    <div class="yy-title">索引</div>
    <el-table
      :data="tableData2"
      border
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="索引名称">
      </el-table-column>

      <el-table-column
        label="索引状态"
        sortable>
        <template slot-scope="scope">
          <span :class="{'yellow':scope.row.status == 'yellow','green':scope.row.status == 'green','red':scope.row.status == 'red'}">{{scope.row.status | fiftersate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="active_primary_shards"
        label="主分片数量"
        sortable>
      </el-table-column>
      <el-table-column
        label="副分片数量"
        sortable>
        <template slot-scope="scope">
          {{scope.row.active_shards - scope.row.active_primary_shards}}
        </template>
      </el-table-column>
      <el-table-column
        prop="unassigned_shards"
        label="未分配节点数"
        sortable>
      </el-table-column>
      <!-- <el-table-column
        label="操作">
      <template slot-scope="scope">
        <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.fileSysArr)">详情</el-button>
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
       </template>
      </el-table-column> -->
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
    //this.getList();
  },
  activated() {
  //  this.getList();
  },
  methods: {
    getList() {
      this.$api.post('/manage-platform/monitorElastic/queryMonitorElasticSearch',{},
        r => {
          if(r.success){
            this.tableData = [];
            this.tableData.push(r.data);
            this.tableData1 = r.data.data;
            this.tableData2 = r.data.indices;
          }
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.filesytem = i;
    },
  },
  filters: {
    fiftersate(val){
      if(val=="yellow"){
        return "需要检查"
      }else if(val == "green"){
        return "正常"
      }else if(val =="red"){
        return "异常"
      }
    },
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
.yellow{color: #d0bd57}
.green{color:green}
.red{color:red}
</style>
<style media="screen">
.el-table_1_column_9 .cell {
  display: block !important;
}
</style>
