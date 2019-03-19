<template lang="html">
  <div class="fwq">

    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="10" >
          <el-button type="success" size="small" @click="getList()">查询</el-button>
        </el-col>
      </el-row>
    </div>

<div class="middle" @mouseover="mouseHeader">
  <div class="yy-title">节点信息</div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;"
    class="mt-10 o-table3"
    @header-click="headerClick">
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name" sortable
      label="名称">
    </el-table-column>

    <el-table-column
      prop="host"
      label="IP地址"
      sortable>
    </el-table-column>
    <el-table-column
      prop="version"
      label="运行版本"
      sortable>
    </el-table-column>
    <el-table-column
      prop="heapMaxFormat"
      label="内存大小"
      sortable>
    </el-table-column>
    <el-table-column
      prop="heapUsedFormat"
      label="已用内存"
      sortable>
    </el-table-column>
    <el-table-column
      prop="heapUsedPercent"
      label="内存使用率"
      sortable>
    </el-table-column>
    <el-table-column
      prop="cpuPercent"
      label="CPU使用率"
      sortable>
   </el-table-column>
    <el-table-column
     prop="status"
     label="是否运行"
     sortable>
     <template slot-scope="scope">
         <span :class="{'green':scope.row.status=='0','red':scope.row.status=='1'}">{{scope.row.status | fiftersate }}</span>
     </template>
    </el-table-column>
  </el-table>
</div>
 <div class="middle" @mouseover="mouseHeader">
   <div class="yy-title">管道信息</div>
   <el-table
     :data="tableData1"
     border
     style="width: 100%;"
     class="mt-10 o-table3"
     @header-click="headerClick">
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
       prop="nodeName"
       label="所属节点"
       sortable>
     </el-table-column>
     <el-table-column
       prop="typeName"
       label="类型"
       sortable>
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
      title: [],
    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    headerClick(column,event){
      event.target.title=column.label
    },
    getList() {
      this.$api.post('/manage-platform/logstash/queryMonitor',{},
        r => {
          this.tableData = r.data.nodes;
          this.tableData1 = r.data.pipelines;
        })
    },
  },

  filters: {
    fiftersate(val){
      if(val=="0"){
        return "正在运行"
      }else {
        return "未运行"
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
.green{ background: green; padding: 3px 8px; color: #ffffff;}
.red{  background: red;padding: 3px 8px; color: #ffffff;}
</style>
<style media="screen">
.el-table_1_column_9 .cell {
  display: block !important;
}
</style>
