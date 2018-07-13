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
              <span class="input-text">角色：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.rolename"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">部门：</span>
              <el-select v-model="pd.deptId" filterable @visible-change="queryNationality" placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in company"
                   :key="item.AIRLINE_CODE"
                   :label="item.AIRLINE_CHN_NAME"
                   :value="item.AIRLINE_CODE" >
                 </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">状态：</span>
              <el-select v-model="pd.status" filterable @visible-change="queryAirport" placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in Airport"
                   :key="item.AIRPORT_CODE"
                   :label="item.AIRPORT_NAME"
                   :value="item.AIRPORT_CODE" >
                 </el-option>
               </el-select>
            </el-col>


          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">

        <el-button type="primary" size="small" @click="adds">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="roleName"
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="flightTime"
          label="部门"
          >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <div class="">
              {{scope.row.status | fifterstatus}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="350">
          <template slot-scope="scope">
            <div class="flex-r">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="details(scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-warning" @click="details(scope.row)">菜单权限</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="details(scope.row)">编辑</el-button>
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


    <el-dialog title="航班处理" :visible.sync="addDialogVisible">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="form.fltno" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">所属航空公司：</span>
            <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="form.airlineCompanyId" class="yy-input-input"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">航班日期：</span>
            <el-input placeholder="请输入内容" size="small"   :disabled="true" v-model="form.flightTime" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">实际出发口岸：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.stationfromName" :disabled="true" class="yy-input-input"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">原计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="form.stationtoName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">现计划到达口岸：</span>
            <el-select v-model="form.portCode" filterable  @visible-change="queryAirport" placeholder="请选择" size="small" class="yy-input-input">
               <el-option
                 v-for="item in Airport"
                 :key="item.AIRPORT_CODE"
                 :label="item.AIRPORT_NAME"
                 :value="item.AIRPORT_CODE" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">事件描述：</span>

          </el-col>
          <el-col :span="14" style="margin-left:-20%">
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.desc"></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">变更</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>

      </div>
    </el-dialog>
  </div>
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
      company: [],
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
      Airport: [],
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
        "cdt": pd
      };
      this.$api.post('/eamp/roleSys/select', p,
        r => {
          console.log("----"+r);
          this.tableData = r.data.roleList;
          // this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/eamp/codeTable/queryAircompanyList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
    queryAirport() {

      if (this.Airport.length != 0) {
        return;
      };
      this.$api.post('/eamp/codeTable/queryAirport', {},
        r => {
          console.log(r);
          this.Airport = r.data;

        })
    },
    addItem(formName) {
      this.$api.post('/eamp/statusUpdate/flight/saveChangePort', this.form,
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
          this.addDialogVisible = false;
          this.getList();
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.addDialogVisible = true;
      console.log(i);
      this.form = i;
    },
    filters: {

      fifterstatus(val) {
        if (val == 1) {
          return "停用"

        }else {
            return "启用"
        }
        // return val*2
      }
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
