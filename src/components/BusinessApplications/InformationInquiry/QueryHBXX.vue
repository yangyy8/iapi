<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltno"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.scheduledeparturetime"
               type="datetime" size="small"
               placeholder="开始时间"  :picker-options="pickerOptions1"
               value-format="yyyyMMdd">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.schedulearrivetime"
                type="datetime" size="small"
                placeholder="结束时间" :picker-options="pickerOptions1"
                value-format="yyyyMMdd">
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input">
                 <el-option value="" label="全部">
                 </el-option>
                 <el-option value="I" label="I - 入境">
                 </el-option>
                 <el-option value="O" label="O - 出境">
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班状态：</span>
              <el-select v-model="pd.status" placeholder="请选择" filterable clearable size="small" class="input-input">
                 <el-option value="" label="全部">
                 </el-option>
                 <el-option value="0" label="0 - 计划">
                 </el-option>
                 <el-option value="1" label="1 - 正在预检">
                 </el-option>
                 <el-option value="2" label="2 - 完成预检">
                 </el-option>
                 <el-option value="3" label="3 - 已起飞">
                 </el-option>
                 <el-option value="4" label="4 - 已办理入境">
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航空公司三位码：</span>
              <el-select v-model="pd.airlineCompanyIdEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>

            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" >
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

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
          prop="fltno"
          label="航班号">

        </el-table-column>
        <el-table-column
          prop="departuretime"
          label="航班日期"
          >
        </el-table-column>
        <el-table-column
          prop="flighttype"
          label="出入标识">
        </el-table-column>
        <el-table-column
          prop="flightTime"
          label="计划起飞时间"
          >
        </el-table-column>
        <el-table-column
          prop="SCHEDULEARRIVETIME"
          label="计划到达时间"
        >
        </el-table-column>
        <el-table-column
          prop="stationfromName"
          label="出发航站"
  >
        </el-table-column>
        <el-table-column
          prop="stationtoName"
          label="到达航站"
  >
        </el-table-column>
        <el-table-column
          prop="airlineCompanyIdEqual"
          label="航空公司"
  >
        </el-table-column>
        <el-table-column
          prop="status"
          label="航班状态"
  >
        </el-table-column>

        <!-- <el-table-column
          prop="BIRTHdate"
          label="值机状态"
  >
        </el-table-column> -->

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



    <el-dialog title="新增" :visible.sync="addDialogVisible">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="input-text">国籍：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITY"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="input-text">证件种类：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDTYPE"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDNO"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FAMILYNAME"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="input-text">性别：</span>
            <div class="el-input">
              <el-radio v-model="form.GENDER" label="M">男</el-radio>
              <el-radio v-model="form.GENDER" label="F">女</el-radio>
              <el-radio v-model="form.GENDER" label="U">未知</el-radio>
            </div>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="input-text">出生日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.BIRTHDATE"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITY"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="input-text">入境口岸：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.WHITE_PORT"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="input-text">出境口岸：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITY"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="input-text">起始日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CTL_BEGINDATE"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="input-text">终止日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CTL_EXPIREDATE"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="23" class="input-item">
            <span class="input-text">处理依据：</span>
            <el-input placeholder="请输入内容" size="small" class="long-input" v-model="form.CTL_REASON"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="23" class="input-item">
            <span class="input-text">批准机关：</span>
            <el-input placeholder="请输入内容" size="small" class="long-input" v-model="form.SUBORG_NAME"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保存</el-button>
        <el-button type="warning" @click="addDialogVisible = false" size="small">保存并转发</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>

      </div>
    </el-dialog>

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
      options: [{
        value: '0',
        label: '未知'
      }, {
        value: 'PEK - 北京首都国际机场',
        label: 'PEK - 北京首都国际机场'
      }, {
        value: 'SHA - 上海虹桥国际机场',
        label: 'SHA - 上海虹桥国际机场'
      }],
      sex: '',
      JHDDKA: '',
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
      HBRQ: '',
      CSRQ: '',


      form: {
        "NATIONALITY": "CHN",
        "CARDTYPE": "1",
        "CARDNO": "11000",
        "FAMILYNAME": "张三丰",
        "GENDER": "M",
        "BIRTHDATE": "20100110",
        "WHITE_PORT": "首都机场",
        "CTL_BEGINDATE": "20180505",
        "CTL_EXPIREDATE": "20180626",
        "CTL_REASON": "白名单",
        "SUBORG_NAME": "批准机关",
        "synStatus": "0",
        "LIST_TYPE": "1",
        "IN_OUT": "0"
      },
      formLabelWidth: '120px'
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
      this.$api.post('/manage-platform/statusUpdate/flight/queryListPages', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalPage;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.Success) {
            this.nation = r.Data;
          }
        })
    },
    addItem(formName) {
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       console.log(valid)
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      this.$api.post('/manage-platform/nameList/addNameList', this.form,
        r => {
          console.log(r);
          if (r.Success) {
            this.$message({
              message: '恭喜你，添加成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList();
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.$api.post('/manage-platform/nameList/getNameListData', i,
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
