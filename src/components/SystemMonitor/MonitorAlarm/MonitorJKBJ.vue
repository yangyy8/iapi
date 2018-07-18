<template lang="html">
  <div class="sjk">
      <div class="middle-top mb-2">
        <el-row type="flex" class="middle">

            <el-col :span="22" class="br pr-20">
            <div class="title-green">
              查询条件
            </div>
              <el-row align="center"   :gutter="2" >
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">监控区域：</span>
                  <el-select v-model="pd.ZONE"  placeholder="请选择" size="small" class="input-input">
                     <el-option value="" label="全部">
                     </el-option>
                     <el-option value="0" label="DMZ区">
                     </el-option>
                     <el-option value="1" label="业务平台区">
                     </el-option>
                     <el-option value="2" label="整合分发区">
                     </el-option>
                     <el-option value="3" label="风险评估区">
                     </el-option>
                   </el-select>

                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">报警类型：</span>
                  <el-select v-model="pd.MTYPE"  placeholder="请选择" size="small" class="input-input" @change="monitor(pd.MTYPE)">
                    <el-option value="SYS" label="系统监控" >
                    </el-option>
                    <el-option value="DAT" label="数据监控" >
                    </el-option>
                    <el-option value="LOG" label="日志监控" >
                    </el-option>
                    <el-option value="PER" label="性能监控" >
                    </el-option>
                   </el-select>
                </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">监控对象：</span>
                <el-select v-model="pd.MCLASS"  placeholder="请选择" size="small" class="input-input">
                  <el-option
                    v-for="(value, key) in object"
                    :key="key"
                    :value="key"
                    :label="value"
                  ></el-option>
                 </el-select>
              </el-col>

              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">处理状态：</span>
                <el-select v-model="pd.STATUS"  placeholder="请选择" size="small" class="input-input">
                   <el-option value="" label="全部">
                   </el-option>
                   <el-option value="1" label="未处理">
                   </el-option>
                   <el-option value="0" label="已处理">
                   </el-option>
                 </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">报警时间：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.STARTTIME"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.ENDTIME"
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="结束时间" :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
            <el-button type="success" size="small" @click="getlist(pd)">查询</el-button>
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
      prop="instanceName"
      label="监控对象">
    </el-table-column>
             <el-table-column
               label="监控区域">
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.zone | fifter1}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="MTYPE"
               label="报警类型">
             </el-table-column>
             <el-table-column
               prop="createtime"
               label="报警时间">
             </el-table-column>
             <el-table-column
               prop="CONTENT"
               label="报警内容">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="处理人">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="处理时间">
             </el-table-column>
             <el-table-column
               label="操作">
               <template slot-scope="scope">
                 <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="pross(scope.row)">处理</el-button>
                   <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
                 </div>
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
      tableData2: []
    }
  },
  mounted() {
    this.getlist(this.pd);
  },
  methods: {
    getlist(pd) {

      this.$api.post('/eamp/monitorAlarm/queryAlarm', pd,
        r => {
          console.log(r);

          this.tableData = r.data.pdList;
        })
    },
    monitor(data) { //监控对象联动
      // let arr = this.chauName;
      // let that = this;
      // for (var i = 0; i < arr.length; i++) {
      //   if (arr[i].code == data) {
      //     that.object = arr[i].countryList;
      //   }
      // }

      let p = {
          "VALUE": data
        }

      this.$api.post('/eamp/monitorAlarm/queryCondition', p,
          r => {
            console.log(r);
            this.object = r.data;
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
      } else {
        return ""
      }
      // return val*2
    }
  }

}
</script>

<style scoped>
.right {
  border-left: 2px solid #DFF1FD;
  height: 100%;
  padding-left: 10px;
}

.left {
  padding-right: 10px;
}
</style>
