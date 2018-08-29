<template lang="html">
  <div class="zlbg">

    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >

                <el-table-column
                  label="区域" sortable
                >
                <template slot-scope="scope">
                  <div class="">
                    {{scope.row.zone | fifter1}}
                  </div>
                </template>
                </el-table-column>
                <el-table-column
                  prop="ipAddress"
                  label="服务器地址" sortable
                >
                </el-table-column>
                <el-table-column
                  label="节点状态"
                >
                <template slot-scope="scope">

                    {{scope.row.nodeStatus | fifter2}}

                </template>
                </el-table-column>
                <!-- <el-table-column
                  label="队列状态" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.queueStatus | fifter2}}
                </template>
                </el-table-column> -->

                <el-table-column
                  prop="queueNum1"
                  label="队列名称"
                >
                </el-table-column>
                <el-table-column
                 label="队列状态"
               >
               <template slot-scope="scope">
                   {{scope.row.queueStatus | fifter2}}
               </template>
               </el-table-column>
                <el-table-column
                  prop="queueNum3"
                  label="队列深度"
                >
                </el-table-column>



                <el-table-column
                  label="操作"
                >
                    <template slot-scope="scope">
                       <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
      tableData: []
    }
  },
  created() {
    this.getList({});
  },
  methods: {
    getList(pd) {
      this.$api.post('/manage-platform/monitorMQ/queryMonitorMQ', pd,
        r => {
          console.log(r);
          this.tableData = r.data;

        })
    },
  },
  filters: {

    fifter1(val) {
      if (val == 0) {
        return "DMZ区"
      } else if (val == 1) {
        return "整合分发区"
      } else if (val == 2) {
        return "业务平台区"
      }else {
          return "DMZ区"
      }
      // return val*2
    },
    fifter2(val){
      if(val=="true"){
        return  "正常";
      }else {
      return   "异常";
      }
    }
  }

}
</script>

<style scoped>

</style>
