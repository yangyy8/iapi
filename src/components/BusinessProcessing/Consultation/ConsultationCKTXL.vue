
<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">咨询来源：</span>
                <el-select v-model="pd.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option label="0 - 航空公司" value="0"></el-option>
                  <el-option label="1 - 乘客" value="1"></el-option>
                  <el-option label="2 - 其他" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">航站：</span>
                <el-select v-model="pd.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                  <el-option
                  v-for="item in takeOffName"
                  :key="item.AIRPORT_CODE"
                  :value="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                  </el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">咨询人：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">固定电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.TELEPHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">移动电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.CELLPHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">传真：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.FAX"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">邮箱：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.EMAIL"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">其他：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.OTHER"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
            <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');">新增</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="CONSULTFROM"
          label="咨询来源"
          sortable>
          <template slot-scope="scope">
            {{scope.row.CONSULTFROM|fifterFrom}}
          </template>
        </el-table-column>
        <el-table-column
          prop="STATIONFROM"
          label="航站"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="咨询人"
          sortable>
        </el-table-column>
        <el-table-column
          prop="TELEPHONE"
          label="固定电话"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CELLPHONE"
          label="移动电话"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FAX"
          label="传真"
          sortable>
        </el-table-column>
        <el-table-column
          prop="EMAIL"
          label="邮箱"
          sortable>
        </el-table-column>
        <el-table-column
          prop="OTHER"
          label="其他"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="50">
          <template slot-scope="scope">
            <el-button type="text"  class="a-btn" title="编辑" size="mini" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
            <el-button type="text"  class="a-btn" title="删除" icon="el-icon-delete" @click="deleteItem(scope.row)"></el-button>
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
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="500px">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6" v-if="form.STATIONFROM">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="STATIONFROM" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航站：</span>
            <el-select v-model="form.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="terminal">
              <el-option
              v-for="item in takeOffName"
              :key="item.AIRPORT_CODE"
              :value="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="NAME" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>咨询人：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.NAME"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.TELEPHONE">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="TELEPHONE" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>固定电话：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.TELEPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CELLPHONE">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="CELLPHONE" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>移动电话：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.CELLPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.FAX">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="FAX" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>传真：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.FAX"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.EMAIL">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="EMAIL" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>邮箱：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.EMAIL"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.OTHER">
          <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="OTHER" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>其他：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.OTHER"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm','txl')" size="small">保 存</el-button>
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="500px">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="CONSULTFROM" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>咨询来源：</span>
            <el-select v-model="form.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option label="0 - 航空公司" value="0"></el-option>
              <el-option label="1 - 乘客" value="1"></el-option>
              <el-option label="2 - 其他" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROM=='0'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="AIRLINE_CODE" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航空公司：</span>
            <el-select v-model="form.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="applicationMethod">>
              <el-option
              v-for="item in application"
              :key="item.AIRLINE_CODE"
              :value="item.AIRLINE_CODE"
              :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROM == '0'||form.CONSULTFROM == ''||form.CONSULTFROM == undefined">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="STATIONFROM" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航站：</span>
            <el-select v-model="form.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="terminal">
              <el-option
              v-for="item in takeOffName"
              :key="item.AIRPORT_CODE"
              :value="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="NAME" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>咨询人：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.NAME"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="CONSULTFROMTYPE" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>咨询方式：</span>
            <el-select v-model="form.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option label="0 - 移动电话" value="0"></el-option>
              <el-option label="1 - 传真" value="1"></el-option>
              <el-option label="2 - 邮箱" value="2"></el-option>
              <el-option label="3 - 固定电话" value="3"></el-option>
              <el-option label="4 - 其他" value="4"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROMTYPE=='3'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="TELEPHONE" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>固定电话：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.TELEPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROMTYPE=='0'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="CELLPHONE" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>移动电话：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.CELLPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROMTYPE=='1'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="FAX" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>传真：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.FAX"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROMTYPE=='2'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="EMAIL" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>邮箱：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.EMAIL"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="form.CONSULTFROMTYPE=='4'">
          <el-col :span="24" class="input-item my-form-group" data-scope="addtxl" data-name="OTHER" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>其他：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.OTHER"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm','addtxl')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      tp:0,
      addDialogVisible: false,//新增
      editDialogVisible: false,//编辑
      application:[],
      form:{},
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      dealer:{},
      pd:{},
      takeOffName:[],
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
    }
  },
  mounted() {
    this.terminal();
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated() {
    this.terminal();
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    applicationMethod(){
      this.$api.post('/manage-platform/codeTable/queryAircompanyList',{},
       r =>{
         if(r.success){
           this.application = r.data;
         }
       })
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    adds(n, i) {
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.editDialogVisible = true;
      }else {
        this.tp = 0;
        this.form={};
        this.addDialogVisible = true;
      }
      this.V.$reset('txl')
    },
    addItem(formName,scope) {
      this.V.$submit(scope, (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        var url='';
        if(this.tp==1){
          url = '/manage-platform/consult/editConsultAddress';
        }else if(this.tp==0){
          url = '/manage-platform/consult/saveConsultAddress';
        }
        this.$api.post(url, this.form,
          r => {
            if (r.success) {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.V.$reset('txl')
            } else {
              this.$message.error('保存失败！');
            }
            this.$refs[formName].resetFields();
            if(this.tp==0){
              this.addDialogVisible = false;
            }else if(this.tp==1){
              this.editDialogVisible = false;
            }
            this.getList(this.CurrentPage, this.pageSize, this.pd);
          }, e => {
            this.$message.error('失败了');
          })
      })
    },

    deleteItem(i){
      let p = {
        "serial": i.SERIAL
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/consult/deleteConsultAddress', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.pd);
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList(currentPage,showCount,pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/consult/queryConsultAddressList',p,
        r => {
          console.log(r);
          if (r.success) {
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          }
        })
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
  },
  filters: {
    fifterFrom(val) {
      if (val == "0") {
        return "航空公司";
      } else if(val == '1'){
        return "乘客";
      } else if(val == '2'){
        return "其他"
      }
    },
  }
}
</script>

<style scoped>
.yy-input-text {
  width: 25% !important;
}
</style>
