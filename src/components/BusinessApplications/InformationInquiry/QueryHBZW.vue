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
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
          <span class="input-text">航班日期：</span>
          <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.STARTTIME"
               type="date" size="small"
               placeholder="开始时间"  :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.ENDTIME"
                type="date" size="small"
                placeholder="结束时间" :picker-options="pickerOptions1">
             </el-date-picker>
             </div>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <QueryNationality  :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.sex"  class="input-input"  placeholder="请选择"  size="small">
                <el-option value="" label="全部">
                </el-option>
                <el-option value="U" label="未知">
                </el-option>
                <el-option value="W" label="男">
                </el-option>
                <el-option value="F" label="女">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">出生日期：</span>
            <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.STARTTIME"
                 type="date" size="small"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.ENDTIME"
                  type="date" size="small"
                  placeholder="结束时间" :picker-options="pickerOptions1">
               </el-date-picker>
               </div>
            </el-col>


          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

        </el-col>

      </el-row>
    </div>



    <div class="middle">
        <span style="width:100px; padding:6px 15px; background:#56A8FE; border:1px solid #56A8FE; color:#ffffff;">列表</span><span style="width:100px; padding:6px 15px;  border:1px solid #56A8FE; ">图表</span>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
                <el-table-column
                  prop="FAMILYNAME"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="GENDER"
                  label="性别">
                </el-table-column>
                <el-table-column
                  prop="BIRTHdate"
                  label="出生日期">
                </el-table-column>
                <el-table-column
                  prop="NATIONALITY"
                  label="国籍">
                </el-table-column>
                <el-table-column
                  prop="CARDNO"
                  label="证件号码">
                </el-table-column>

                <el-table-column
                  prop="cardEXPIREDATE"
                  label="航班号">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="航班日期">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="登记序号">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="座位号">
                </el-table-column>
                <el-table-column
                  prop="cardEXPIREDATE"
                  label="状态">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <div class="flex-r">

                      <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
import QueryNationality from '../../other/queryNationality'
export default {
  components: {
    QueryNationality
  },
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
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
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
    getNation(msg){
      this.pd.NATIONALITY=msg;
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
      this.$api.post('/eamp/nameList/getNameListPage', p,
        r => {
          console.log(r);
          this.tableData = r.Data.ResultList;
          this.TotalResult = r.Data.TotalResult;
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
      this.$api.post('/eamp/nameList/addNameList', this.form,
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
