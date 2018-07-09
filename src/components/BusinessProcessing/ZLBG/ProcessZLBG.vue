<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">国籍：</span>
              <el-select v-model="pd.NATIONALITY"  class="input-input" @visible-change="queryNationality"  placeholder="请选择"  size="small">
                <el-option
                  v-for="item in nation"
                  :key="item.CODE"
                  :label="item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
            </el-col>

          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO" class="input-input"></el-input>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班日期：</span>
                 <el-date-picker
                 v-model="pd.STARTTIME"
                 type="date" size="small"
                 placeholder="选择日期">
               </el-date-picker>-
               <el-date-picker
                  v-model="pd.ENDTIME"
                  type="date" size="small"
                  placeholder="选择日期" clearable="false">
              </el-date-picker>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"   class="input-input"></el-input>
              &nbsp;<el-checkbox v-model="pd.ISBLURRED">模糊查询</el-checkbox>
            </el-col>
                  <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" >
                 </el-option>
               </el-select>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
              v-model="pd.STARTBIRTH"
              type="date" size="small"
              placeholder="选择日期">
            </el-date-picker>-
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="date" size="small"
               placeholder="选择日期" clearable="false">
           </el-date-picker>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">反馈状态：</span>
              <el-select v-model="pd.CHECKRESULT" placeholder="请选择"   size="small" class="input-input">
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
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
         type="selection"
         width="40">
        </el-table-column>
                <el-table-column
                  prop="NATIONALITY"
                  label="国籍"
                >
                </el-table-column>
                <el-table-column
                  prop="CARDTYPE"
                  label="证件种类"
                >
                </el-table-column>
                <el-table-column
                  prop="PASSPORTNO"
                  label="证件号码"
                >
                </el-table-column>
                <el-table-column
                  prop="NAME"
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="GENDER"
                  label="性别"
                >
                </el-table-column>
                <el-table-column
                  prop="DATEOFBIRTH"
                  label="出生日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="FLTNO"
                  label="航班号"
                >
                </el-table-column>
                <el-table-column
                  prop="SCHEDULEDEPARTURETIME"
                  label="航班日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="FLIGHTSTATUS"
                  label="航班状态"
                  >
                </el-table-column>
                <el-table-column
                  prop="CHECKRESULT"
                  label="值机状态"
                  >
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.SERIAL)">处理</el-button>
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

    <el-dialog title="指令变更" :visible.sync="addDialogVisible">
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
      this.$api.post('/eamp/iapiUnscolicited/search', p,
        r => {
          console.log(r);
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/eamp/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.Success) {
            this.nation = r.Data;
          }
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
