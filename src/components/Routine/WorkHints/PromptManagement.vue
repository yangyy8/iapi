<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2" type="flex" justify="center">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">登记人姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.REGISTRATIONNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">登记人账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.REGISTRATIONACCOUNT"  class="input-input"></el-input>
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
        <el-button type="primary" size="small" @click="adds(0,'');form={promptedStr:[]};">新增</el-button>
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
          prop="REGISTRATIONNAME"
          label="登记人姓名"
          sortable>
        </el-table-column>
        <el-table-column
          prop="REGISTRATIONACCOUNT"
          label="登记人账号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="VALIDITYSTR"
          label="有效期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CONTENT"
          label="提示内容"
          sortable>
        </el-table-column>
        <el-table-column
          label="发送范围">
          <template slot-scope="scope">
            {{scope.row.promptedStr|sendRange}}
         </template>
          </el-table-column>
        <el-table-column
          label="操作" width="80">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="REGISTRATIONNAME" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>登记人姓名：</span>
            <el-input placeholder="请输入姓名" size="small" v-model="form.REGISTRATIONNAME"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="REGISTRATIONACCOUNT" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>登记人账号：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.REGISTRATIONACCOUNT"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="VALIDITYSTR" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>有效期：</span>
              <el-date-picker
              v-model="form.VALIDITYSTR"
              type="date" size="mini"
              placeholder="请选择日期"
              class="yy-input-input"
              value-format="yyyyMMdd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="promptedStr" data-type="multiple"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>范围：</span>
            <el-select v-model="form.promptedStr" filterable clearable placeholder="请选择" size="small" class="width-input"  multiple @visible-change="range" @change="rangeReal(form.promptedStr)">
              <el-option
               v-for="item in promptRange"
               :key="item.SERIAL"
               :value="item.SERIAL"
               :label="item.NAME">
              </el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="CONTENT" data-type="textarea"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>提示内容：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.CONTENT" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      nation: [],
      company: [],
      promptRange:[],
      pro:[],

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      sendDialogVisible:false,

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
      dform: {},
      pickerOptions: {
        disabledDate: (time) => {
           return time.getTime() < Date.now();
        }
      },
    }
  },
  mounted() {
    this.range()
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {

    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    headerClick(column,event){
      event.target.title=column.label
    },
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
      this.$api.post('/manage-platform/promptManage/queryPromptList', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    adds(n, i) {
      this.addDialogVisible = true;
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.form.VALIDITYSTR=formatDate(new Date(this.form.VALIDITYSTR),'yyyyMMdd');
        this.dialogText="编辑";
        this.range()
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
      this.V.$reset('demo2')
    },



    addItem(formName) {
      this.V.$submit('demo2', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        this.form.promptedArr = this.pro;
        var url = '/manage-platform/promptManage/savePromptEntity';
        if(this.tp==1){
          console.log(this.promptRange);
          console.log(this.form.promptedStr);
          this.rangeReal(this.form.promptedStr)
          this.form.promptedArr = this.pro;
          delete this.form.prompted;
          // this.form.promptedArr = this.form.prompted
          url = '/manage-platform/promptManage/editPrompt';
        }
        this.$api.post(url, this.form,
          r => {
            console.log(r);
            if (r.success) {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
            } else {
              this.$message.error('保存失败！');
            }
            this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            this.getList(this.CurrentPage, this.pageSize, this.pd);
            // this.tableData=r.Data.ResultList;
          }, e => {
            this.$message.error('失败了');
          })
      })
    },

    deletes(i) {
      let p = {
        "serial": i.SERIAL
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/promptManage/deletePrompt', p,
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
    range(){
      this.$api.post('/manage-platform//watch/queryUserAll',{},
        r => {
          this.promptRange=r.data;
        })
    },
    rangeReal(val){
      let arr=[];
      let arr1 = this.promptRange;
      for(var i=0;i<val.length;i++){
        for(var j=0;j<arr1.length;j++){
          if(val[i] == arr1[j].SERIAL){
            arr.push(arr1[j]);
          }else if(val[i] == arr1[j].NAME){
            arr.push(arr1[j]);
          }
        }
      }
      this.pro = arr;
    }
  },
  filters: {
    fiftertype(val) {
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
      }
    },
    sendRange(val){
      if(val){
        var str = val.join(' ');
        return str
      }
    },
  }
}

function checkRate(nubmer) {　　
  var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  　　　　
  if (!re.test(nubmer)) {　　　　
    return false;　　
  }
  return true;
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

.yy-input-text {
  width: 25% !important;
}
.width-ts{
  width: 20.3%!important;
}
.width-input{
  width:58%!important;
}
</style>
