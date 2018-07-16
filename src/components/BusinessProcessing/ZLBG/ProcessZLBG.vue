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
                <QueryNationality  :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
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
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">

              <span class="input-text">姓名：</span>
                <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"   class="input-input"></el-input>
              &nbsp;<el-checkbox v-model="pd.ISBLURRED">模糊查询</el-checkbox>
            </div>
            </el-col>
                  <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择" size="small" class="input-input">
                 <el-option value="U" label="未知">
                 </el-option>
                 <el-option value="M" label="男">
                 </el-option>
                 <el-option value="F" label="女">
                 </el-option>
               </el-select>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
              <el-date-picker
              v-model="pd.STARTBIRTH"
              type="date" size="small" value-format="yyyyMMdd"
              placeholder="开始时间" :picker-options="pickerOptions1">
            </el-date-picker>
               <span class="septum">-</span>
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="结束时间"  :picker-options="pickerOptions1">
           </el-date-picker>
         </div>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">反馈状态：</span>
              <el-select v-model="pd.CHECKRESULT" class="input-input" placeholder="请选择"   size="small" >

                <el-option value="0Z" label="0Z-允许打印登机牌">
                </el-option>
                <el-option value="1Z" label="1Z-禁止打印登机牌">
                </el-option>
                <el-option value="2Z" label="2Z-请再次核对">
                </el-option>
                <el-option value="4Z" label="4Z-数据错误">
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
      <el-row class="mb-15">

        <el-button type="info" size="small" @click="batchs">批量变更</el-button>
        </el-row>
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
                  prop="NATIONALITYC"
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
                  width="50"
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
                  prop="DEPARTDATE"
                  label="航班日期"
                  >
                </el-table-column>

                <el-table-column
                  prop="PASSENGERSTATUS"
                  label="值机状态"
                  >
                </el-table-column>
                <el-table-column
                  label="操作" width="180">
                  <template slot-scope="scope">
                    <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="handles(scope.row)">变更</el-button>
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

    <el-dialog title="批量变更" :visible.sync="batchDialogVisible">
      <el-form :model="map" ref="batchmap">
        <el-row type="flex"  class="mb-6">
          <el-table
            :data="batchtableData"
            border
            style="width: 100%;">
                    <el-table-column
                      prop="NAME"
                      label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="GENDER"
                      label="性别"
                      width="50"
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
                      prop="NATIONALITYC"
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
                      prop="CHECKRESULT"
                      label="当前值机状态"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="CHECKRESULT"
                      label="当前值机状态说明"
                    >
                    </el-table-column>
          </el-table>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态：</span>
            <el-select v-model="form.INSTRUCT"  placeholder="请选择"   size="small" class="yy-input-input">
              <el-option value="0Z" label="0Z">
              </el-option>
              <el-option value="1Z" label="1Z">
              </el-option>
              <el-option value="2Z" label="2Z">
              </el-option>
              <el-option value="4Z" label="4Z">
              </el-option>
             </el-select>

          </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INSTRUCTC" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更说明：</span>

          </el-col>
          <el-col :span="14" style="margin-left:-25%;">

           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.CHANGERESON"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlesItem(0,'handlesForm')" size="small">变更</el-button>
        <el-button @click="batchDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>


    <el-dialog title="指令变更" :visible.sync="handlesDialogVisible">
      <el-form :model="form" ref="handlesForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NAME" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">性别：</span>
              <el-input placeholder="请输入内容" size="small" v-model="form.GENDER" class="yy-input-input" :disabled="true"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">出生日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.DATEOFBIRTH"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">国籍：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITY" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDTYPE" class="yy-input-input" :disabled="true"> </el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">签证号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDNO" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">当前值机状态：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CHECKRESULT" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CHECKRESULTS" class="yy-input-input" :disabled="true"></el-input>
          </el-col>


        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态：</span>
            <el-select v-model="form.INSTRUCT"  placeholder="请选择"   size="small" class="yy-input-input">
              <el-option value="0Z" label="0Z">
              </el-option>
              <el-option value="1Z" label="1Z">
              </el-option>
              <el-option value="2Z" label="2Z">
              </el-option>
              <el-option value="4Z" label="4Z">
              </el-option>
             </el-select>

          </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INSTRUCTC" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更说明：</span>

          </el-col>
          <el-col :span="14" style="margin-left:-25%;">

           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.CHANGERESON"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlesItem(1,'handlesForm')" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>

  <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
    <el-form :model="dform" ref="detailsForm">
      <div class="hrtitle">基本信息</div>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NAME}}</el-col>
        <el-col :span="6">国籍：{{dform.NAME}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NAME}}</el-col>
        <el-col :span="6">国籍：{{dform.NAME}}</el-col>
      </el-row>
      <div class="hrtitle">航班信息</div>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NAME}}</el-col>
        <el-col :span="6">国籍：{{dform.NAME}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NAME}}</el-col>
        <el-col :span="6">国籍：{{dform.NAME}}</el-col>
      </el-row>
      <div class="hrtitle">其他信息</div>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NAME}}</el-col>
        <el-col :span="6">国籍：{{dform.NATIONALITY}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="6">姓名：{{dform.NAME}}</el-col>
        <el-col :span="6">性别：{{dform.NAME}}</el-col>
        <el-col :span="6">出生日期：{{dform.NATIONALITY}}</el-col>
        <el-col :span="6">国籍：{{dform.PASSPORTNO}}</el-col>
      </el-row>

      <el-table
        :data="detailstableData"
        border
        style="width: 100%;">
                <el-table-column
                  prop="NAME"
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="GENDER"
                  label="性别"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  prop="DATEOFBIRTH"
                  label="出生日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="NATIONALITYC"
                  label="国籍"
                >
                </el-table-column>

                <el-table-column
                  prop="PASSPORTNO"
                  label="证件号码"
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
                  prop="CHECKRESULT"
                  label="原预检结果"
                    width="120"
                  >
                </el-table-column>
                <el-table-column
                  prop="LASTCHECKRESULT"
                  label="最终预检结果"
                  width="120"
                  >
                </el-table-column>
                <el-table-column
                  prop="STATUS"
                  label="是否报警"
                  >
                </el-table-column>

      </el-table>

    </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>

    </div>
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
      handlesDialogVisible: false,
      detailsDialogVisible: false,
      batchDialogVisible: false,
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
      batchtableData: [],
      detailstableData: [],
      multipleSelection: [],
      form: {},
      map: {},
      dform: {},
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

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
    },
    batchs() {

      if (this.multipleSelection.length == 0) {
        this.open();
        return;

      }
      this.batchDialogVisible = true;
      this.batchtableData = this.multipleSelection
    },
    open() {
      this.$alert('请选择列表内容！', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      });
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
    handles(i) {
      this.handlesDialogVisible = true;
      console.log(i);
      this.form = i;
    },
    handlesItem(n, formName) {
      // if (this.form.INSTRUCT != "") {
      //   this.$message.error('变更后值机状态不能为空！');
      //   return
      // }

      this.$api.post('/eamp/iapiUnscolicited/instructChangeTab', this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '变更成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }
          this.$refs[formName].resetFields();
          if (n == 1) {
            this.handlesDialogVisible = false;
          } else {
            this.batchDialogVisible = false;
          }
          this.getList();
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {

      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;
      let p = {
        "PASSPORTNO": this.dform.PASSPORTNO,
        "NATIONALITY": this.dform.NATIONALITY
      };
      this.$api.post('/eamp/iapiUnscolicited/queryHistory', p,
        r => {
          console.log(r);
          this.detailstableData = r.data.pdList;
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

hr {
  height: 2px;
  border: none;
  border-top: 1px solid #73BFF2;
}

.hrtitle {
  height: 35px;
  line-height: 35px;
  border: none;
  color: #3F96F2;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #3F96F2;
}

.mb-6 {
  line-height: 20px;
  margin-top: 10px;
}
</style>
