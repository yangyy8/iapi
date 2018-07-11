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
                <QueryNationality   :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
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
                 type="datetime" size="small"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.ENDTIME"
                  type="datetime" size="small"
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
              type="datetime" size="small"
              placeholder="开始时间" :picker-options="pickerOptions1">
            </el-date-picker>
               <span class="septum">-</span>
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="datetime" size="small"
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
                      <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="handles(scope.row)">处理</el-button>
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

    <el-dialog title="指令变更" :visible.sync="handlesDialogVisible">
      <el-form :model="form" ref="addForm">
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
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITY" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.WHITE_PORT" class="yy-input-input" :disabled="true"></el-input>
          </el-col>


        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CTL_BEGINDATE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">变更后值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CTL_EXPIREDATE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="23" class="input-item">
            <span class="yy-input-text">变更说明：</span>
            <el-input placeholder="请输入内容" size="small" class="long-input" v-model="form.SUBORG_NAME" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>


  </div>

</template>

<script>
  import QueryNationality from '../../other/queryNationality'
export default {
  components: {QueryNationality},
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
            form: {},

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

hr{ height:2px;border:none;border-top:2px dotted #185598;}
</style>
