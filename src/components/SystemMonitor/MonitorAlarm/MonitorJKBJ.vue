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
                  <el-select v-model="pd.ZONE"  placeholder="请选择"  filterable clearable size="small" class="input-input">

                     <el-option value="0" label="0 - DMZ区">
                     </el-option>
                     <el-option value="1" label="1 - 业务平台区">
                     </el-option>
                     <el-option value="2" label="2 - 整合分发区">
                     </el-option>
                     <el-option value="3" label="3 - 风险评估区">
                     </el-option>
                   </el-select>

                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">报警类型：</span>
                  <el-select v-model="pd.MCLASS"  placeholder="请选择"  filterable clearable size="small" class="input-input" @change="monitor(pd.MCLASS)">
                    <el-option value="SYS" label="SYS - 系统监控" >
                    </el-option>
                    <el-option value="DAT" label="DAT - 数据监控" >
                    </el-option>
                    <el-option value="LOG" label="LOG - 日志监控" >
                    </el-option>
                    <el-option value="PER" label="PER - 性能监控" >
                    </el-option>
                   </el-select>
                </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">监控对象：</span>
                <el-select v-model="pd.MTYPE"  placeholder="请选择"  filterable clearable  size="small" class="input-input">
                  <el-option
                    v-for="(value, key) in object"
                    :key="key"
                    :value="key"
                    :label="key+' - '+value"
                  ></el-option>
                 </el-select>
              </el-col>

              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">处理状态：</span>
                <el-select v-model="pd.STATUS"  placeholder="请选择"  filterable clearable size="small" class="input-input">

                   <el-option value="0" label="0 - 已处理">
                   </el-option>
                   <el-option value="1" label="1 - 未处理">
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
          <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
            <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
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
               label="监控区域" sortable>
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.ZONE | fifter1}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               label="报警类型" sortable>
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.MCLASS | fifter2 }}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
                prop="MTYPE"
               label="监控对象" sortable>
             </el-table-column>
             <el-table-column
               prop="CREATETIME"
               label="报警时间" sortable>
             </el-table-column>
             <el-table-column
               prop="MDESC"
               label="报警内容">
             </el-table-column>
             <el-table-column
               prop="DEALUSER"
               label="处理人" sortable>
             </el-table-column>
             <el-table-column
               prop="DEALTIME"
               label="处理时间" sortable>
             </el-table-column>
             <el-table-column
               label="操作"
               width="180">
               <template slot-scope="scope">
                   <el-button  v-if="scope.row.STATUS!='0'" class="table-btn" size="mini"plain icon="el-icon-edit" @click="pross(scope.row)">处理</el-button>
                   <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
              </template>
             </el-table-column>
   </el-table>
   <div class="middle-foot">
     <div class="page-msg">
       <div class="">
         共{{Math.ceil(TotalResult/pageSize)}}页
       </div>
       <div class="">
         每页
         <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         条
       </div>
       <div class="">
         共{{TotalResult}}条
       </div>
     </div>
     <el-pagination
       background
       @current-change="handleCurrentChange"
       :current-page.sync ="CurrentPage"
       :page-size="pageSize"
       layout="prev, pager, next"
       :total="TotalResult">
     </el-pagination>
   </div>
  </div>
<el-dialog
    title="处理"
    :visible.sync="addDialogVisible"
    width="800px"
    >
      <el-form :model="form" ref="addForm" >
     <el-row type="flex"  class="mb-15">
      <el-col :span="12" class="ppding">监控区域：{{form.ZONE | fifter1}}</el-col>
      <el-col :span="12" class="ppding">报警类型：{{form.MCLASS | fifter2 }}</el-col>
     </el-row>
     <el-row type="flex"  class="mb-15">
     <el-col :span="12" class="ppding">监控对象：{{form.MTYPE}}</el-col>
     <el-col :span="12" class="ppding">报警时间：{{form.CREATETIME}}</el-col>
     </el-row>
       <hr/>
    <el-row type="flex"  class="mb-15">
      <el-col :span="12" class="ppding">处理人：{{this.username}}</el-col>
      <el-col :span="12" class="ppding">处理时间：{{form.DEALTIME | fifter4}}</el-col>
    </el-row>

    <el-row type="flex"  class="mb-15">
     <el-col :span="24" class="ppding" style="vertical-align: top">处理详情：
     <el-input type="textarea" v-model="form.DEALCONTENT" maxlength="250"  placeholder="请输入处理详情(不超过250字)" :autosize="{ minRows: 3, maxRows: 6}" style="width:80%;" ></el-input>
     </el-col>
    </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
<el-button type="primary" @click="adds('addForm')" size="small">提交</el-button>
      <el-button @click="addDialogVisible = false" size="small">取消</el-button>

    </div>
  </el-dialog>

  <el-dialog
    title="详情"
    :visible.sync="detailsDialogVisible"
    width="800px"
    >
      <el-form :model="dform" ref="detailsForm">
     <el-row type="flex"  class="mb-15">
         <el-col :span="8" class="ppding">监控区域：{{dform.ZONE | fifter1}}
         </el-col>
          <el-col :span="8" class="ppding">报警类型：{{dform.MCLASS | fifter2 }}</el-col>
           <el-col :span="8" class="ppding">监控对象：{{dform.MTYPE }}</el-col>
     </el-row>
     <el-row type="flex"  class="mb-15">
         <el-col :span="8" class="ppding">报警时间：{{dform.CREATETIME}}</el-col>
          <el-col :span="8" class="ppding">IP地址：{{dform.IPADDRESS}}</el-col>
           <el-col :span="8" class="ppding">处理状态：{{dform.STATUS | fifter5 }}</el-col>
     </el-row>
     <el-row type="flex"  class="mb-15">
       <el-col :span="24" class="ppding">报警内容：{{dform.MDESC}}</el-col>
     </el-row>
    <hr/>
    <el-row type="flex"  class="mb-15">
        <el-col :span="8" class="ppding">处理人：{{dform.DEALUSER}}</el-col>
        <el-col :span="8" class="ppding">处理时间：{{dform.DEALTIME}}</el-col>

    </el-row>
    <el-row type="flex"  class="mb-15">
     <el-col :span="24" class="ppding">处理详情：{{dform.DEALCONTENT}}
     </el-col>
   </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
    </div>
  </el-dialog>

  </div>
</template>
<script>
import {
  formatDate
} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      addDialogVisible: false,
      detailsDialogVisible: false,
      dform: {},
      form: {},
      userid:"",
      username:"",
      pd: {},
      object:{},
      tableData: [],
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {

      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/monitorAlarm/queryAlarm', p,
        r => {
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
          this.userid=r.data.userid;
          this.username=r.data.username;

        })
    },
    monitor(data) { //监控对象联动

      this.$set(this.pd, 'MTYPE','')
      let p = {
        "VALUE": data
      }

      this.$api.post('/manage-platform/monitorAlarm/queryCondition', p,
        r => {
          if(r.success){
          console.log(r);
          this.object = r.data;
        }
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.dform = i;
    },
    pross(i) {
      if (i.STATUS == "0") {

        this.$alert('该条信息已处理！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return;
      } else {

        this.addDialogVisible = true;
        i.DEALCONTENT="";
        this.form = i;
        // this.form.DEALUSER = "admin";
      }
    },
    adds(formName) {

      let p = {
        "DEALCONTENT": this.form.DEALCONTENT,
        "DEALUSER": this.userid,
        "SERIAL": this.form.SERIAL
      }
      this.$api.post('/manage-platform/monitorAlarm/updateAlarmStatus', p,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '处理成功！',
              type: 'success'
            });
          } else {
            this.$message.error('处理失败');
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        }, e => {
          this.$message.error('处理失败');

        })
    },
  },

  filters: {

    fifter1(val) {
      if (val == 0) {
        return "DMZ区"
      } else if (val == 2) {
        return "整合分发区"
      } else if (val == 1) {
        return "业务平台区"
      } else if (val == 3){
        return "风险评估区"
      }
    },
    fifter2(val) {
      if (val == "SYS") {
        return "系统监控"
      } else if (val == "DAT") {
        return "数据监控"
      } else if (val == "LOG") {
        return "日志监控"
      } else if(val == "PER"){
        return "性能监控"
      }
    },
    fifter4(val) {
      return formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    },
    fifter5(val){
    if(val=="0"){return "已处理";}else if(val=="1"){return "未处理";}

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
.ppding{padding-left:15px;}

</style>
