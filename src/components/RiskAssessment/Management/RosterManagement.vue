<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">

      <el-row type="flex">
        <el-col :span="22" class="br pr-20">
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
        <span class="input-text">性别：</span>
        <el-select v-model="pd.GENDER" placeholder="请选择"  filterable clearable size="small" class="input-input">
           <el-option value="U" label="U - 未知">
           </el-option>
           <el-option value="M" label="M - 男">
           </el-option>
           <el-option value="F" label="F - 女">
           </el-option>
         </el-select>
         </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BIRTHDATESTART" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyy-MM-dd"
               placeholder="开始时间" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.BIRTHDATESTARTEND" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyy-MM-dd"
                placeholder="结束时间" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">国籍/地区：</span>
                <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
      <span class="input-text">证件种类：</span>
      <el-select v-model="pd.CARDTYPE" placeholder="请选择"  filterable clearable size="small" class="input-input">
        <el-option
          v-for="item in docCode"
          :key="item.CODE"
          :label="item.CODE+' - '+item.NAME"
          :value="item.CODE">
        </el-option>
      </el-select>
      </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
         <span class="input-text">证件号码：</span>
         <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" class="input-input"></el-input>
      </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
      <span class="input-text">名单类型：</span>
            <el-select v-model="pd.TYPE_CODE" filterable clearable  placeholder="请选择"  size="small" class="input-input">
        <el-option
          v-for="(item,ind) in mdtype"
          :key="ind"
          :label="item.NAME"
          :value="item.SERIAL">
        </el-option>
      </el-select>
      </el-col>
      <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
        <span class="input-text">有效期：</span>
        <div class="input-input t-flex t-date">
         <el-date-picker
         v-model="pd.BEGINDATE" format="yyyy-MM-dd"
         type="date" size="small" value-format="yyyy-MM-dd"
         placeholder="开始时间" >
       </el-date-picker>
         <span class="septum">-</span>
       <el-date-picker
          v-model="pd.EXPIREDATE" format="yyyy-MM-dd"
          type="date" size="small" value-format="yyyy-MM-dd"
          placeholder="结束时间">
      </el-date-picker>
    </div>
      </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
      <span class="input-text">有效状态：</span>
      <el-select v-model="pd.STATUS" placeholder="请选择"  filterable clearable size="small" class="input-input">
       <el-option value="0" label="0 - 无效">
       </el-option>
       <el-option value="1" label="1 - 有效">
       </el-option>
      </el-select>
      </el-col>
      </el-row>
     </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        <el-button type="warning"  size="small" @click="showUpload">批量导入</el-button>
        <el-button type="success" size="small" @click="download">模板下载</el-button>
        <el-button type="info" size="small" @click="batchsdelete">批量删除</el-button>
        <el-button type="warning" size="small" @click="exportdata">批量导出</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
@header-click="headerClick"
        @selection-change="handleSelectionChange">
        <el-table-column
         type="selection"
         width="40">
        </el-table-column>
        <el-table-column
          prop="RISKDICTIONARIES"
          label="姓名" sortable>
        </el-table-column>

         <el-table-column
          label="性别" sortable
          >
          <template slot-scope="scope">
              {{scope.row.GENDER | fiftersex}}
            </template>
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
         prop="CARDTYPENAME" sortable
          label="证件种类">

        </el-table-column>
        <el-table-column
          prop="CARDNO" sortable
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="EXPIREDATE" sortable
          label="有效日期">
        </el-table-column>
        <el-table-column
          sortable
          label="有效状态">

            <template slot-scope="scope">

               <span :class="{'yycolor':scope.row.STATUS==1,'yycolory':scope.row.STATUS==0}">   {{scope.row.STATUS | fiftertt}}</span>

            </template>
        </el-table-column>
        <el-table-column
          prop="CREATEUSERNAME" sortable
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="CREATETIME" sortable
          label="操作时间"  width="170">
        </el-table-column>
        <el-table-column
          label="操作" width="120">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="详情"  icon="el-icon-tickets" @click="details(scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="编辑"   icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text"  class="a-btn"   title="删除"  icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" >
      <el-form :model="form" ref="addForm">
            <el-row type="flex"  class="mb-6">
              <el-col :span="24" class="input-item" style="color:red; padding-left:5%">  <span> 注：必填项组合方式二选一 1、国籍+证件号;2、姓名+性别+出生日期;</span></el-col>
            </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"> 国籍/地区：</span>
            <el-select v-model="form.NATIONALITY" filterable clearable @visible-change="queryNationality" placeholder="请选择"    size="small" class="yy-input-input">
              <el-option
                v-for="item in nation"
                :key="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
                :value="item.CODE">
              </el-option>
            </el-select>

          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text"> 证件种类：</span>
            <el-select v-model="form.CARDTYPE" placeholder="请选择" filterable clearable size="small" class="yy-input-input">
              <el-option
                v-for="item in docCode"
                :key="item.CODE"
                :label="item.CODE+' - '+item.NAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:18%"> 证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDNO"   maxlength="20" class="yy-input-input"></el-input>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:18%"> 姓名：</span>
            <el-input placeholder="请输入内容(长度不超过50)" size="small" v-model="form.FAMILYNAME" maxlength="50"   class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:18%"> 性别：</span>
            <el-select v-model="form.GENDER" placeholder="请选择"  filterable clearable size="small"   class="yy-input-input">
               <el-option value="U" label="U - 未知">
               </el-option>
               <el-option value="M" label="M - 男">
               </el-option>
               <el-option value="F" label="F - 女">
               </el-option>
             </el-select>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:18%"> 出生日期：</span>
            <el-date-picker
               v-model="form.DATEOFBIRTH" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyy-MM-dd"
               placeholder="出生日期" class="yy-input-input">
           </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="EXPIREDATE"
          data-type="select"  v-validate-easy="[['required']]">
            <span class="yy-input-text" style="width:18%"><font class="yy-color">*</font> 有效日期：</span>
            <el-date-picker
               v-model="form.EXPIREDATE" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyy-MM-dd"
               placeholder="请输入有效日期" class="yy-input-input">
           </el-date-picker>
          </el-col>

          <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="TYPE_CODE"
          data-type="select"  v-validate-easy="[['required']]">
            <span class="yy-input-text" style="width:18%"><font class="yy-color">*</font> 名单类型：</span>
             <el-select v-model="form.TYPE_CODE" filterable clearable   placeholder="请选择"  size="small" class="yy-input-input">
         <el-option
           v-for="(item,ind) in mdtype"
           :key="ind"
           :label="item.NAME"
           :value="item.SERIAL">
         </el-option>
       </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text" style="width:12.5%">事件描述：</span>
            <el-input type="textarea"  placeholder="请输入内容" maxlength="600" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.EVENTCOUNT" style="width:84%;"></el-input>

          </el-col>

        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>

      </div>
    </el-dialog>


    <el-dialog title="详情" :visible.sync="detailsDialogVisible" >
      <el-form :model="map" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">国籍/地区：</span>
          <span class="yy-input-input detailinput">  {{mapForm.NATIONALITYNAME}}</span>
            </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text">证件种类：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CARDTYPENAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">证件号码：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CARDNO}}</span>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text">姓名：</span>
          <span class="yy-input-input detailinput">  {{mapForm.RISKDICTIONARIES}}</span>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">性别：</span>
          <span class="yy-input-input detailinput">  {{mapForm.GENDER=="U"?"未知":mapForm.GENDER=="F"?"女":mapForm.GENDER=="M"?"男":""}}</span>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text">出生日期：</span>
          <span class="yy-input-input detailinput">  {{mapForm.DATEOFBIRTH}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">有效日期：</span>
          <span class="yy-input-input detailinput">  {{mapForm.EXPIREDATE}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">名单类型：</span>
          <span class="yy-input-input detailinput">  {{mapForm.TYPENAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="input-text" style="width:12.5%;">事件描述：</span>
          <span class="detailinput" style="width:84% !important;border: 1px solid #eeeeee; background: #F5F7FA;">  {{mapForm.EVENTCOUNT}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">操作人：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATEUSERNAME}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">操作时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATETIME}}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"  width="640px">
      <el-form >
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
        <span style="width:18%;vertical-align: top;"><font class="yy-color">*</font> 名单类型：</span>
         <el-select v-model="typemd" filterable clearable  placeholder="请选择"  size="small" class="yy-input-input">
     <el-option
       v-for="(item,ind) in mdtype"
       :key="ind"
       :label="item.NAME"
       :value="item.SERIAL">
     </el-option>
     </el-select>
   </el-col>
 </el-row>
 <el-row type="flex" class="mb-6">
   <el-col :span="24" class="input-item">
    <span style="width:18%;vertical-align: top;"><font class="yy-color">*</font> EXCEL文件：</span>
        <el-upload
          class="yy-input-input"
          ref="upload"
          :action='actions+"/manage-platform/riskNameList/riskReadExcel/"+typemd'
          :file-list="fileList"
          multiple
          :on-success="upSuccess"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <span slot="tip" class="el-upload__tip">只能上传EXCEL文件</span>
        </el-upload>
      </el-col>
    </el-row>
      </el-form>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      typemd: "",
      pd: {},
      map:{},
      company: [],
      fileList: [],
      docCode: [],
      sertail: "",
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      uploadDialogVisible: false,
      menuDialogVisible: false,
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
      actions: "",
      menudata: [],
      defaultProps: {
        children: 'menuList',
        label: 'name'
      },
      defaultChecked: [],
      nation: [],
      multipleSelection: [],
      mdtype: [],

      form: {},
      mapForm: {},
      Airport: [],
      typecode: ""
    }
  },
  mounted() {
    //  this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
    this.queryType();
    this.queryDocCode();
  },
  activated() {
    //  this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
    this.queryType();
    this.queryDocCode();
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
    open(content) {
      this.$alert(content, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      });
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/riskNameList/getRiskNameListPage', p,
        r => {
          //    console.log("----" + r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    download() {
      window.location.href = this.$api.rootUrl + '/manage-platform/templateFile/riskNameListFile.xlsx'
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },
    queryDocCode() {
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryDmDocCodeAndDmDocCodes', {},
        r => {
          //console.log(r);

          if (r.success) {
            this.docCode = r.data;
          }
        })
    },
    queryType() {
      this.$api.post('/manage-platform/riskNamelistType/getnamelistType', {},
        r => {
          console.log(r);
          if (r.success) {
            this.mdtype = r.data;
          }
        })
    },
    adds(n, i) {
      this.addDialogVisible = true;
      this.V.$reset("demo1");
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form = Object.assign({}, i);
        this.form.FAMILYNAME = i.RISKDICTIONARIES;
        this.dialogText = "编辑";
      } else {

        this.tp = 0;
        this.dialogText = "新增";
      }
    },

    addItem(formName) {
      this.V.$submit('demo1', (canSumit, data) => {
        if ((this.form.NATIONALITY == undefined || this.form.NATIONALITY == "") &&
          (this.form.CARDNO == undefined || this.form.CARDNO == "") &&
          (this.form.FAMILYNAME == undefined || this.form.FAMILYNAME == "") &&
          (this.form.GENDER == undefined || this.form.GENDER == "") &&
          (this.form.DATEOFBIRTH == undefined || this.form.DATEOFBIRTH == "")) {
          this.$message.error('必填项组合方式二选一 1、国籍+证件号;2、姓名+性别+出生日期');
          return;
        }

        if ((this.form.NATIONALITY == undefined || this.form.NATIONALITY == "") &&
          (this.form.CARDNO == undefined || this.form.CARDNO == ""))
          {
console.log("-----1");
          if ((this.form.FAMILYNAME == undefined || this.form.FAMILYNAME == "") ||
            (this.form.GENDER == undefined || this.form.GENDER == "") ||
            (this.form.DATEOFBIRTH == undefined || this.form.DATEOFBIRTH == "")) {

            this.$message.error('姓名+性别+出生日期不能为空！');
            return;
          }

        }

         if ((this.form.FAMILYNAME == undefined || this.form.FAMILYNAME == "") &&
          (this.form.GENDER == undefined || this.form.GENDER == "") &&
          (this.form.DATEOFBIRTH == undefined || this.form.DATEOFBIRTH == ""))
           {

          if ((this.form.NATIONALITY == undefined || this.form.NATIONALITY == "") ||
            (this.form.CARDNO == undefined || this.form.CARDNO == "")) {
            this.$message.error('国籍+证件号不能为空！');
            return;

          }

        }

        // canSumit为true时，则所有该scope的所有表单验证通过
        if (!canSumit) return;



        var url = "/manage-platform/riskNameList/addRiskNameList";
        if (this.tp == 1) {
          url = "/manage-platform/riskNameList/updateRiskNameList";
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
              this.$message.error(r.Message);
            }
            //  this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            this.getList(this.CurrentPage, this.pageSize, this.pd);
            // this.tableData=r.Data.ResultList;
          }, e => {
            this.$message.error('失败了');
          });
      });
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.mapForm = i;
    },
    deletes(i) {
      let p = {
        "id": i.SERIAL
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/riskNameList/updateRiskNameListById', p,
          r => {
            console.log("===" + r);
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

    showUpload() {
      this.uploadDialogVisible = true;
      this.typemd = "";
      this.actions = this.$api.rootUrl;
      console.log(this.$refs.upload)
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }
    },
    upSuccess(r) {
      //console.log(r);
      if (r.success) {
        this.$message({
          message: r.data,
          type: 'success'
        });

      } else {
        this.$message.error(r.message);
      }
      this.uploadDialogVisible = false;
      this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    beforeAvatarUpload(file) {
      console.log(file.type)
      const isEXL = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isEXL) {
        this.$message.error('上传文件只能是 xlsl 格式!');
      }
      return isEXL;
    },

    submitUpload() {
      console.log(this.$refs.upload)

      if (this.typemd == "" || this.typemd == undefined) {

        this.$message({
          message: '请先选择名单类型！',
          type: 'warning'
        });
        return
      }
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$message({
          message: '请先选择文件！',
          type: 'warning'
        });
        return
      }


      this.$refs.upload.submit();
    },
    batchsdelete() {

      if (this.multipleSelection.length == 0) {

        this.open("请选择列表内容！");
        return;

      }

      let p = {
        "ids": this.multipleSelection
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/riskNameList/updateRiskNameLists', p,
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
    exportdata() {
      //console.log("this.multipleSelection.length",this.multipleSelection.length);
      if (this.multipleSelection.length == 0) {
        this.download1();
      } else {
        this.download2();
      }
    },
    download1() {
      //var url="http://192.168.99.242:8081/manage-platform/riskNameList/exportAllData";
      var url = this.$api.rootUrl + "/manage-platform/riskNameList/exportAllData";
      axios({
        method: 'post',
        url: url,
        data: {
          "TYPE_CODE": this.pd.TYPE_CODE,
          "NATIONALITY": this.pd.NATIONALITY,
          "CARDTYPE": this.pd.CARDTYPE,
          "CARDNO": this.pd.CARDNO,
          "RISKDICTIONARIES": this.pd.RISKDICTIONARIES,
          "GENDER": this.pd.GENDER,
          "BIRTHDATESTART": this.pd.BIRTHDATESTART,
          "BIRTHDATESTARTEND": this.pd.BIRTHDATESTARTEND,
          "CREATETIMESTART": this.pd.CREATETIMESTART,
          "CREATETIMEEND": this.pd.CREATETIMEEND,
          "BEGINDATE": this.pd.BEGINDATE,
          "EXPIREDATE": this.pd.EXPIREDATE,
          "STATUS": this.pd.STATUS

        },
        responseType: 'blob'
      }).then(response => {
        this.downloadM(response)
      });
    },

    download2() {
      //var url="http://192.168.99.242:8081/manage-platform/riskNameList/exportAssignData";
      var url = this.$api.rootUrl + "/manage-platform/riskNameList/exportAssignData";
      axios({
        method: 'post',
        url: url,
        data: {
          "ids": this.multipleSelection
        },
        responseType: 'blob'
      }).then(response => {
        this.downloadM(response)
      });
    },
    downloadM(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data.data], {
        type: "application/octet-stream"
      }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'RosterData.xlsx')
      document.body.appendChild(link)
      link.click()
    },
  },
  filters: {

    fiftersex(val) {
      if (val == "U") {

        return "未知"

      } else if (val == "M") {
        return "男"
      } else if (val == "F") {
        return "女";
      }else {
        return "";
      }
    },
    fiftertt(val) {

      if (val == 0) {
        return "无效";
      } else if(val == 1){
        return "有效";
      }

    }
  },
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

.yy-input-input {
  width: 68% !important;
}

.yycolor {
  background: green;
  padding: 3px 8px;
  color: #ffffff;
}

.yycolory {
  background: red;
  padding: 3px 8px;
  color: #ffffff;
}
</style>
