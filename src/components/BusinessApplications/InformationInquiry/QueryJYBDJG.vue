<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
          <span class="input-text">开始结束时间：</span>
          <el-date-picker
             v-model="HBRQ"
             type="daterange"
             align="right"
             unlink-panels
             range-separator="-"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
              class="input-input block"
             :picker-options="pickerOptions2" size="small">
           </el-date-picker>
          </el-col>


          <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">比对类型：</span>
              <el-select v-model="pd.NATIONALITY"  class="input-input" @visible-change="queryNationality" multiple placeholder="请选择"  size="small">
                <el-option
                  v-for="item in nation"
                  :key="item.CODE"
                  :label="item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
                <span class="input-text">不通过原因：</span>
                <el-select v-model="pd.NATIONALITY"  class="input-input" @visible-change="queryNationality" multiple placeholder="请选择"  size="small">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">出发口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" class="input-input"></el-input>
            </el-col>

          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" class="input-input"></el-input>
            </el-col>


            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"   class="input-input"></el-input>

            </el-col>
                      <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班类型：</span>
              <el-select v-model="sex" placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" >
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
    <div class="middle" @mouseover="mouseHeader">

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
                  label="国籍/地区"
                  width="100">

                </el-table-column>
                <el-table-column
                  prop="CARDTYPE"
                  label="证件种类"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="CARDNO"
                  label="证件号码"
                  width="175">
                </el-table-column>
                <el-table-column
                  prop="FAMILYNAME"
                  label="姓名"
                  width="135">
                </el-table-column>
                <el-table-column
                  prop="GENDER"
                  label="性别"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="BIRTHdate"
                  label="出生日期"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="RECORDNUMBER"
                  label="航班号"
                  width="190">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="航班日期"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="航班状态"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="值机状态"
                  width="110">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <div class="flex-r">

                      <el-button  type="text"  class="a-btn"  title="删除"  icon="el-icon-tickets" @click="details(scope.row.SERIAL)"></el-button>
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
            <span class="input-text">国籍/地区：</span>
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
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      sex: '',

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
      this.$api.post('/manage-platform/nameList/getNameListPage', p,
        r => {
          console.log(r);
          this.tableData = r.Data.ResultList;
          this.TotalResult = r.Data.TotalResult;
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
