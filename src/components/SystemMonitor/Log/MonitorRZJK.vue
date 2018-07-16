<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="20" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">监控区域：</span>
              <el-select v-model="pd.syn_flag" placeholder="请选择" size="small" class="input-input">
                <el-option value="1" label="DMZ区" >
                </el-option>
                 <el-option value="" label="业务平台区" >
                 </el-option>

               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">日志类型：</span>
              <el-select v-model="pd.type" placeholder="请选择" size="small" class="input-input">
                <el-option value="0" label="系统日志" >
                </el-option>
                <el-option value="1" label="错误日志" >
                </el-option>
                <el-option value="2" label="操作日志" >
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">生成时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

        </el-col>

      </el-row>
    </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;">


        <el-table-column
          prop="SYN_FLAG"
          label="监控区域">

        </el-table-column>
        <el-table-column
          prop="LOGGER_NAME"
          label="日志类型"
          >
        </el-table-column>
        <el-table-column
          prop="TIMESTMP"
          label="生成时间">
        </el-table-column>
        <el-table-column
          prop="LEVEL_STRING"
          label="日志内容"
          >
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="flex-r">

              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.SERIAL)">详情</el-button>
            </div>

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
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>


    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="950px">
      <div class="detail-msg-text">
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span>姓名</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>性别</span>
            男

          </el-col>
          <el-col :span="8">
            <span>出生日期</span>
            2000年10月10日

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span>国籍</span>/
            张某某

          </el-col>
          <el-col :span="8">
            <span>证件号码</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>签证号码</span>
            张某某

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span>出入标识</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>第二证号</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>第二国籍</span>
            张某某

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span>航班号</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>出发地</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>目的地</span>
            张某某

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row mb-20">
          <el-col :span="8">
            <span>报警类型</span>
            张某某

          </el-col>
          <el-col :span="8">
            <span>报警时间</span>
            张某某

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="5">
            <span>操作人</span>
            张某某

          </el-col>
          <el-col :span="5">
            <span>审批人</span>
            张某某

          </el-col>
          <el-col :span="6">
            <span>操作时间</span>
            张某某

          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="detailsDialogVisible = false" size="small">关闭页面</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      nation: [],
      value: '',
      value1: "",
      addDialogVisible: false,
      detailsDialogVisible: false,
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
      tableData: [],
      multipleSelection: [],

      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
          form: {},

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
      var url="eamp/log_event/queryListPage";
      if(pd.type=="1"){
        url="eamp/log_event/querylistPageExpretion";
      }
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.Data.ResultList;
          this.TotalResult = r.Data.TotalResult;
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.$api.post('/eamp/nameList/getNameListData', i,
        r => {
          console.log(r);
          // this.tableData=r.Data.ResultList;
        })
    },

  }
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}

.detail-msg-row {
  color: #999;
  line-height: 32px;
}

.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}
</style>
