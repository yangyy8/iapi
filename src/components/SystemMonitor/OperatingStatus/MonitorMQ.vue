<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
       <el-row type="flex" class="middle">
         <el-col :span="20" class="br">
           <div class="title-green">
             查询条件
           </div>
           <el-row align="center" type="flex" justify="center"   :gutter="2" class="pr-20">
             <el-col  :span="8"  class="input-item">
               <span class="input-text">监控区域：</span>
               <el-select v-model="pd.zone"  class="input-input"  filterable clearable  placeholder="请选择"  size="small">
                 <el-option value="0"  label="0 - DMZ区"></el-option>
                 <el-option value="1"  label="1 - 业务平台区"></el-option>
               </el-select>
             </el-col>
           </el-row>
         </el-col>
         <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
           <el-button type="success" size="small" @click="getList(pd)">查询</el-button>
         </el-col>
       </el-row>
   </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >

                <el-table-column
                  label="区域" sortable width="150"
                >
                <template slot-scope="scope">
                  <div class="">
                    {{scope.row.zone | fifter1}}
                  </div>
                </template>
                </el-table-column>
                <el-table-column
                  prop="ipAddress"
                  label="服务器地址" sortable width="150"
                >
                </el-table-column>
                <el-table-column
                  label="节点状态" width="120" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.nodeStatus | fifter2}}
                </template>
                </el-table-column>
                <el-table-column
                  prop="queueNum" sortable
                  label="队列数" width="100"
                >
                </el-table-column>

                <!-- <el-table-column
                  label="队列状态" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.queueStatus | fifter2}}
                </template>
                </el-table-column> -->
                <!-- <el-table-column
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
                </el-table-column> -->
                <el-table-column
                  label="详情"
                >
                    <template slot-scope="scope">
                       <!-- <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="details(scope.row.serial)"></el-button> -->
                              <el-row  v-if="scope.row.subMqList!=null" style="color:blue; border-bottom:1px solid #eeeeee;line-height:30px;">
                              <el-col :span="8">队列名称</el-col>
                              <el-col :span="10">队列英文名称</el-col>
                              <el-col :span="3">队列数</el-col>
                              <el-col :span="3">队列状态</el-col>
                             </el-row>
                              <el-row v-for='i in scope.row.subMqList' :key="i.queueName" style=" border-bottom:1px solid #eeeeee; line-height:25px;">
                                <el-col :span="8" style="text-align:left">{{i.queueName}}</el-col>
                                <el-col :span="10" style="text-align:left">{{i.queueEnName}}</el-col>
                                <el-col :span="3">{{i.queueNum}}</el-col>
                                <el-col :span="3">{{i.queueStatus | fifter2}}</el-col>
                              </el-row>


                    </template>

                </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      >
            <el-table
              :data="tableData1"
              border
              style="width: 100%;"
              >
                <el-table-column
                  prop="queueName"
                  label="队列名称"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="queueEnName"
                  label="队列英文名称"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="queueNum"
                  label="队列数"
                  sortable
                >
                </el-table-column>
                <el-table-column
                 label="队列状态"
                 sortable
               >
               <template slot-scope="scope">
                   {{scope.row.queueStatus | fifter2}}
               </template>
               </el-table-column>
            </el-table>
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
      mtableData1ap: [],
      detailsDialogVisible: false,
      num:0
    }
  },
  created() {
  //  this.getList({});
  },
  methods: {
    getList(pd) {
      this.$api.post('/manage-platform/monitorMQ/queryMonitorMQ', pd,
        r => {
          console.log(r);
          this.tableData = r.data;
        });

        //   let p={
        //     "type":"MQWarningNumber"
        //   }
        // this.$api.post('/manage-platform/monitorConfig/queryConfigByMTYPE', p,
        //   r => {
        //     console.log(r);
        //     this.num = r.data.CVALUE;
        //   });

    },
    details(i) {
      // console.log('---' + i);
      this.detailsDialogVisible = true;
      let p = ({
        "SERIAL": i
      });
      this.$api.post('/manage-platform/monitorMQ/queryQueueDetail', p,
        r => {
          console.log("=====" + r);
          this.tableData1 = r.data;
        })
    },
    filearr(i) {

      let p = ({
        "SERIAL": i
      });
      this.$api.post('/manage-platform/monitorMQ/queryQueueDetail', p,
        r => {

          return r.data;
        })
        return  [];
    }
  },
  filters: {
    fifter1(val) {
      if (val == 0) {
        return "DMZ区"
      } else {

        return "业务平台区"
      }
      // return val*2
    },
    fifter2(val) {
      if (val == "running") {
        return "正常";
      } else if (val == "true") {
        return "正常";
      } else {
        return "异常";
      }
    }
  }
}
</script>
<style scoped>

</style>
