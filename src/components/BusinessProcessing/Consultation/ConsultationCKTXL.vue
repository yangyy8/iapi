
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
                <span class="input-text">航空公司：</span>
                <el-select v-model="pd.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="applicationMethod">
                  <el-option
                  v-for="item in application"
                  :key="item.AIRLINE_CODE"
                  :value="item.AIRLINE_CODE"
                  :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                  </el-option>
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
            <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd,order,direction)" class="mb-15">查询</el-button>
            <el-button type="primary" plain size="small" @click="reset">重置</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">

        <el-button type="primary" size="small" name="txlgl_add" @click="adds(0,'');">新增</el-button>
        <el-button type="success" size="small" name="txlgl_export" @click="exportT">导出</el-button>

      </el-row>
      <el-table
        ref="sort"
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick"
        @sort-change='sortChange'
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
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
          prop="AIRLINE_CHN_NAME"
          label="航空公司"
          sortable>
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
            <el-button type="text"  class="a-btn" title="编辑" size="mini" icon="el-icon-edit" name="txlgl_edit" @click="adds(1,scope.row)"></el-button>
            <el-button type="text"  class="a-btn" title="删除" icon="el-icon-delete" name="txlgl_del" @click="deleteItem(scope.row)"></el-button>
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
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">咨询来源：</span>
            <el-select v-model="form.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option label="0 - 航空公司" value="0"></el-option>
              <el-option label="1 - 乘客" value="1"></el-option>
              <el-option label="2 - 其他" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">航站：</span>
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
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">航空公司：</span>
            <el-select v-model="form.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="applicationMethod">
              <el-option
              v-for="item in application"
              :key="item.AIRLINE_CODE"
              :value="item.AIRLINE_CODE"
              :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">咨询人：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NAME"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">固定电话：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.TELEPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">移动电话：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CELLPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">传真：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FAX"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">邮箱：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.EMAIL"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">其他：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.OTHER"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="500px">
      <el-form :model="addForm" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">咨询来源：</span>
            <el-select v-model="addForm.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option label="0 - 航空公司" value="0"></el-option>
              <el-option label="1 - 乘客" value="1"></el-option>
              <el-option label="2 - 其他" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">航空公司：</span>
            <el-select v-model="addForm.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="applicationMethod">>
              <el-option
              v-for="item in application"
              :key="item.AIRLINE_CODE"
              :value="item.AIRLINE_CODE"
              :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">航站：</span>
            <el-select v-model="addForm.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="terminal">
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
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">咨询人：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.NAME"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">咨询方式：</span>
            <el-select v-model="addForm.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option label="0 - 移动电话" value="0"></el-option>
              <el-option label="1 - 传真" value="1"></el-option>
              <el-option label="2 - 邮箱" value="2"></el-option>
              <el-option label="3 - 固定电话" value="3"></el-option>
              <el-option label="4 - 其他" value="4"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">固定电话：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.TELEPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">移动电话：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.CELLPHONE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">传真：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.FAX"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">邮箱：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.EMAIL"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">其他：</span>
            <el-input placeholder="请输入内容" size="small" v-model="addForm.OTHER"  class="yy-input-input"></el-input>
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
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      order:'',
      direction:0,
      tp:0,
      addDialogVisible: false,//新增
      editDialogVisible: false,//编辑
      application:[],
      form:{},
      addForm:{},
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
      multipleTable:[],
      checkList:['CONSULTFROM','AIRLINE_CHN_NAME','STATIONFROM','NAME','TELEPHONE','CELLPHONE','FAX','EMAIL','OTHER'],
      propertiesKeyAndName:{
        "CONSULTFROM":'咨询来源',
        "AIRLINE_CHN_NAME":'航空公司',
        "STATIONFROM":'航站',
        "NAME":'咨询人',
        "TELEPHONE":'固定电话',
        "CELLPHONE":'移动电话',
        "FAX":'传真',
        "EMAIL":'邮箱',
        "OTHER":'其他',
      },
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
    exportT(){
      if(this.multipleTable.length!=0){
        let p={
          "exclTitles": this.checkList,
          "propertiesKeyAndName":this.propertiesKeyAndName,
          "resultList":this.multipleTable,
        }
        this.$api.post('/manage-platform/iapiHead/exportGlobalDataIo',p,
         r =>{
           this.downloadM(r)
         },e=>{},'','blob')
      }else if(this.multipleTable.length==0){//全部导出
        let p={
          "exclTitles":this.checkList,
          "cdt":this.pd,
          "CurrentPage":1,
          "pageSize":10
        }
        this.$api.post('/manage-platform/consult/exportFileIo/10000',p,
         r =>{
           this.downloadM(r)
         },e=>{},'','blob')
      }
    },
    downloadM (data,type) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        if(type==1){
          link.setAttribute('download', 'template.xlsx')
        }else{
          link.setAttribute('download', format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
        }
        document.body.appendChild(link)
        link.click()
    },
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
    reset(){
      this.pd={};
      this.$nextTick(()=>{
        let sortArr = this.$refs.sort.$children
        for(var i=0;i<sortArr.length;i++){
          if(sortArr[i].columnConfig&&sortArr[i].columnConfig.order){
            sortArr[i].columnConfig.order = ''
            return false
          }
        }
      })
      this.direction=0;
      this.orders="";
      this.CurrentPage=1;
      this.pageSize=10;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
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
      this.multipleTable = val;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val,this.pd,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize,this.pd,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    adds(n, i) {
      if (n != 0) {//编辑
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.editDialogVisible = true;
      }else {//新增
        this.tp = 0;
        this.addForm={};
        this.addDialogVisible = true;
      }
      this.V.$reset('txl')
    },
    appZhuan(item){
      if(this.application.length!=0){
        for(var i=0;i<this.application.length;i++){
          if(item == this.application[i].AIRLINE_CODE){
            return this.application[i].AIRLINE_CHN_NAME+'-'+this.application[i].AIRLINE_ENG_NAME
          }
        }
      }else{
        return ''
      }
    },
    addItem(formName) {
      // this.V.$submit(scope, (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        // if(!canSumit) return
        let p={};
        var url='';
        if(this.tp==1){
          url = '/manage-platform/consult/editConsultAddress';
          if(this.form.AIRLINE_CODE){
            this.form.AIRLINE_CHN_NAME = this.appZhuan(this.form.AIRLINE_CODE).split('-')[0];
            this.form.AIRLINE_ENG_NAME = this.appZhuan(this.form.AIRLINE_CODE).split('-')[1];
          }else{
            this.form.AIRLINE_CHN_NAME='';
            this.form.AIRLINE_ENG_NAME='';
          }
          p=this.form;
        }else if(this.tp==0){
          url = '/manage-platform/consult/saveConsultAddress';
          // console.log('this.addForm.AIRLINE_CODE',this.addForm.AIRLINE_CODE,this.addForm.AIRLINE_CODE!=undefined)
          if(this.addForm.AIRLINE_CODE){
            console.log('aaaaaaa')
            this.addForm.AIRLINE_CHN_NAME = this.appZhuan(this.addForm.AIRLINE_CODE).split('-')[0];
            this.addForm.AIRLINE_ENG_NAME = this.appZhuan(this.addForm.AIRLINE_CODE).split('-')[1];
          }else{
            console.log('bbbbbbb')
            this.addForm.AIRLINE_CHN_NAME='';
            this.addForm.AIRLINE_ENG_NAME='';
          }
          p=this.addForm;
        }
        this.$api.post(url, p,
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
            this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
          }, e => {
            this.$message.error('失败了');
          })
      // })
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
              this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
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
    getList(currentPage,showCount,pd,order,direction) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
        "order":order,
        "direction":direction
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
