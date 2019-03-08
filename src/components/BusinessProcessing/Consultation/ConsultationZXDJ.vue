<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <span class="title-green">
            咨询来源
          </span>&nbsp;|&nbsp;
          <span>时间：{{currentDate}}</span>
          <el-row align="center" :gutter="2" style="margin-top:10px">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item" data-scope="txl" data-name="CONSULTFROM" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询来源：</span>
              <el-select v-model="entity.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="0 - 航空公司" value="0"></el-option>
                <el-option label="1 - 乘客" value="1"></el-option>
                <el-option label="2 - 其他" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" data-scope="txl" data-name="AIRLINE_CODE" data-type="select"
            v-validate-easy="[['required']]" v-if="entity.CONSULTFROM=='0'">
              <span class="input-text"><i class="t-must">*</i>航空公司：</span>
              <el-select v-model="entity.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="applicationMethod">
                <el-option
                v-for="item in application"
                :key="item.AIRLINE_CODE"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROM == '0'||entity.CONSULTFROM == ''||entity.CONSULTFROM == undefined"
            data-scope="txl" data-name="TERMINAL" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>航站：</span>
              <el-select v-model="entity.TERMINAL" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_NAME"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group"
            data-scope="txl" data-name="CONSULTNAME" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询人：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTNAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group"
            data-scope="txl" data-name="CONSULTFROMTYPE" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询方式：</span>
              <el-select v-model="entity.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="0 - 移动电话" value="0"></el-option>
                <el-option label="1 - 传真" value="1"></el-option>
                <el-option label="2 - 邮箱" value="2"></el-option>
                <el-option label="3 - 固定电话" value="3"></el-option>
                <el-option label="4 - 其他" value="4"></el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROMTYPE=='0'"
            data-scope="txl" data-name="PHONE" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>移动电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.PHONE"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROMTYPE=='1'"
            data-scope="txl" data-name="CONSULTFAX" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>传真：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTFAX"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROMTYPE=='2'"
            data-scope="txl" data-name="CONSULTEMAIL" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>邮箱：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTEMAIL"  class="input-input" maxlength="50"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROMTYPE=='3'"
            data-scope="txl" data-name="INCOMINGPHONE" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>固定电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.INCOMINGPHONE"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="entity.CONSULTFROMTYPE=='4'"
            data-scope="txl" data-name="CONSULTFROMOTHERREMARK" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>其他：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTFROMOTHERREMARK"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
          <!-- <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc"> -->
            <el-button type="success" size="small" class="mb-15" @click="addToBook">添加至通讯录</el-button>
            <el-button type="primary" size="small" plain @click="entity = {}">重置</el-button>
          <!-- </el-row> -->
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row type="flex"  style="padding-top:0px!important">
        <el-col :span="22" class="pr-20" :class="{'br':CONSULTTYPE==0}">
          <span class="title-green">
            咨询问题
          </span>&nbsp;|&nbsp;
          <div style="display:inline-block" class="problem-type">
            <span>问题类型</span>
            <el-radio-group v-model="CONSULTTYPE">
              <el-radio :label="0">旅客校验</el-radio>
              <el-radio :label="1">业务咨询</el-radio>
              <el-radio :label="2">其他</el-radio>
            </el-radio-group>
          </div>

          <el-row align="center" :gutter="2" style="margin-top:10px" v-if="CONSULTTYPE==0">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="baseNation">
                <el-option
                  v-for="item in selection"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                v-model="pd.DEPARTDATE"
                type="date" size="small"
                placeholder="航班日期"
                format="yyyy-MM-dd"
                class="input-input"
                value-format="yyyyMMdd">
            </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:35px;" v-if="CONSULTTYPE==0">
          <el-button type="success" class="mb-15" size="small"  @click="getList(CurrentPage,pageSize,pd);">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        class="o-table3"
        border
        style="width: 100%;"
        @header-click="headerClick"
        v-if="CONSULTTYPE==0">
        <el-table-column
          prop="INTG_CHNNAME"
          label="姓名"
          sortable>
          <template slot-scope="scope">
            {{(scope.row.INTG_CHNNAME==''||scope.row.INTG_CHNNAME==undefined)?scope.row.PNAME:scope.row.INTG_CHNNAME}}
          </template>
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="PASSPORTEXPIREDATESTR"
          label="证件有效期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍/地区"
          sortable>
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别"
          sortable>
        </el-table-column>
        <el-table-column
          prop="BIRTHDAYSTR"
          label="出生日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入境类型"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="DEPARTDATESTR"
          label="计划起飞时间"
          width="140"
          sortable>
        </el-table-column>
        <el-table-column
          prop="VISANO"
          label="签证号码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类"
          sortable>
        </el-table-column>
        <el-table-column
          prop="LASTCHECKRESULT"
          label="反馈状态"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="70"
          fixed="right">
          <template slot-scope="scope">
            <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-delete" v-if="scope.row.CONSULTSERIAL" @click="reviewTohis(scope.row)">回复</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="entryDetails(scope.row)" v-else>录入</el-button> -->
            <el-button type="text"  class="a-btn"  title="录入"  icon="el-icon-edit" @click="entryDetails(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot" v-if="CONSULTTYPE==0">
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
          :total="TotalResult"
          v-if="CONSULTTYPE==0">
        </el-pagination>
      </div>
      <el-row align="center" :gutter="2" type="flex" v-if="CONSULTTYPE==1">
        <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="DETAILS" data-type="textarea"
        v-validate-easy="[['required']]">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea" v-model="businessDETAILS" maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入描述(不能超过300字)"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc" v-show="CONSULTTYPE==1">
        <el-button type="primary" size="small" @click="businessSave">{{businessText}}</el-button>
        <el-button type="primary" size="small" @click="businessDETAILS=''" style="margin-left:20px!important">清空</el-button>
      </el-row>

      <el-row align="center" :gutter="2" type="flex" v-if="CONSULTTYPE==2">
        <el-col :span="24" class="input-item my-form-group" data-scope="txl" data-name="DETAILS" data-type="textarea"
        v-validate-easy="[['required']]">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea" v-model="otherDETAILS" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入描述(不能超过300字)"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc" v-show="CONSULTTYPE==2">
        <el-button type="primary" size="small" @click="otherSave">{{otherText}}</el-button>
        <el-button type="primary" size="small" @click="otherDETAILS=''" style="margin-left:20px!important">清空</el-button>
      </el-row>
    </div>

    <el-dialog :title="detailText"  :visible.sync="detailsDialogVisible" width="400px;" class="oneD" :before-close="handleClose">
      <!-- <el-form :model="dform" ref="detailsForm"> -->
        <el-row :gutter="2" class="middle">
          <el-col :span="24" class="input-item my-form-group" data-scope="oneDetail" data-name="DETAILS" data-type="textarea"
          v-validate-easy="[['required']]">
            <span class="yy-input-text tt-width"><i class="t-must">*</i>问题详情：</span>
            <el-input type="textarea" class="height80" v-model="DETAILS" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入描述(不能超过300字)"></el-input>
          </el-col>
        </el-row>
      <!-- </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="guestSave">{{enterText}}</el-button>
        <el-button type="primary" size="small" @click="DETAILS=''" style="margin-left:20px!important">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      application:[],
      entity:{},
      takeOffName:[],
      pd: {
        DEPARTDATE:''
      },
      selection:[],
      CONSULTTYPE:0,//咨询问题类型
      detailsRow:{},//旅客校验录入详情本行数据
      detailsRow1:{},
      detailsTotal:{},//旅客校验录入详情总传参
      DETAILS:'',
      businessText:'保存',
      businessDETAILS:'',
      otherDETAILS:'',
      otherText:'保存',
      enterText:'保存',
      detailText:'录入详情',
      currentDate:"",

      phone:'5',
      fix:'5',
      email:'5',
      fixP:'5',
      other:'5',

      nation: [],
      company: [],
      value: '',
      value1: "",
      addedDialogVisible:false,
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
      dform: {},
    }
  },
  mounted() {
    this.baseNation();
    this.pd.DEPARTDATE = formatDate(new Date(),'yyyyMMdd');
    this.currentDate=formatDate(new Date(),'yyyy-MM-dd');
  },
  activated() {
    this.currentDate=formatDate(new Date(),'yyyy-MM-dd');
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
    handleClose(done){
      done();
      this.V.$reset('oneDetail');
    },
     added(){
       this.addedDialogVisible = true;
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
      this.$api.post('/manage-platform/consult/queryConsultIapiInfo', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
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
    addToBook(){//添加至通讯录
      this.V.$submit('txl', (canSumit,data) => {
        if(!canSumit) return
        var obj={};
        obj.CONSULTFROM = this.entity.CONSULTFROM;
        obj.STATIONFROM = this.entity.TERMINAL;
        obj.NAME = this.entity.CONSULTNAME;
        obj.TELEPHONE = this.entity.INCOMINGPHONE;
        obj.CELLPHONE = this.entity.PHONE;
        obj.FAX = this.entity.CONSULTFAX;
        obj.EMAIL= this.entity.CONSULTEMAIL;
        obj.OTHER = this.entity.CONSULTFROMOTHERREMARK;
        this.$api.post('/manage-platform/consult/saveConsultAddress',obj,
          r => {
            console.log(r);
            if(r.success){
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
            }
          })
      })
    },
    baseNation(){//国籍
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.selection = r.data;
         };
       })
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
    guestSave(){
      if(this.enterText == '回复'){
        this.detailsDialogVisible = false;
        this.$router.push({name:'ConsultationZXHG',query:{review:this.detailsRow,details:this.detailsRow.DETAILS,serial:this.detailsRow.serial,flag:this.CONSULTTYPE}})
      }else{
          this.V.$submit('oneDetail', (canSumit,data) => {
            // canSumit为true时，则所有该scope的所有表单验证通过
            if(!canSumit) return
            if(this.entity.CONSULTFROM == '0'||this.entity.CONSULTFROM == ''||this.entity.CONSULTFROM == undefined){
              this.detailsRow.TERMINAL = this.entity.TERMINAL;
            }else{
              this.detailsRow.TERMINAL = '';
            }
           this.detailsRow.CONSULTTYPE = this.CONSULTTYPE;//类型
           this.detailsRow.DETAILS = this.DETAILS;//详情

           this.detailsRow.IAPISERIAL = this.detailsRow.SERIAL;//通讯录一批
           if(this.detailsRow.INTG_CHNNAME){
             this.detailsRow.NAME = this.detailsRow.INTG_CHNNAME;//姓名
           }else if(this.detailsRow.PNAME){
             this.detailsRow.NAME = this.detailsRow.PNAME;//姓名
           }
           this.detailsRow.CARDNUM = this.detailsRow.PASSPORTNO;//证件号码
           this.detailsRow.EXPIREDATE = this.detailsRow.PASSPORTEXPIREDATESTR;//证件有效期
           this.detailsRow.DATEOFBIRTH = this.detailsRow.BIRTHDAYSTR;//出生日期
           this.detailsRow.VISANUMBER = this.detailsRow.VISANO;//签证号码
           this.detailsRow.INSTRUCT_OLD = this.detailsRow.LASTCHECKRESULT;//反馈状态

           this.detailsRow.CONSULTFROMTYPE = this.entity.CONSULTFROMTYPE;
           this.detailsRow.CONSULTFROM = this.entity.CONSULTFROM;
           this.detailsRow.CONSULTNAME = this.entity.CONSULTNAME;
           this.detailsRow.INCOMINGPHONE = this.entity.INCOMINGPHONE;
           this.detailsRow.PHONE = this.entity.PHONE;
           this.detailsRow.CONSULTFAX = this.entity.CONSULTFAX;
           this.detailsRow.CONSULTEMAIL= this.entity.CONSULTEMAIL;
           this.detailsRow.CONSULTFROMOTHERREMARK = this.entity.CONSULTFROMOTHERREMARK;
           this.detailsRow.AIRLINE_CODE = this.entity.AIRLINE_CODE;
           if(this.entity.AIRLINE_CODE!=''){
             this.detailsRow.AIRLINE_CHN_NAME = this.appZhuan(this.entity.AIRLINE_CODE).split('-')[0];
             this.detailsRow.AIRLINE_ENG_NAME = this.appZhuan(this.entity.AIRLINE_CODE).split('-')[1];
           }else{
             this.detailsRow.AIRLINE_CHN_NAME='';
             this.detailsRow.AIRLINE_ENG_NAME='';
           }
           this.$api.post('/manage-platform/consult/saveConsult',this.detailsRow,
             r => {
               if(r.success){
                 console.log(r);
                 this.$message({
                   message: '恭喜你，保存成功',
                   type: 'success'
                 });
                 this.entity={}
                 this.detailsRow.serial = r.data.serial;
                 this.enterText = '回复';
                 this.detailText = '回复';
               }
             })
          })
      }
    },
    entryDetails(row){//列表录入详情
       this.enterText = '保存';
       this.detailText = '录入详情';
       this.DETAILS="";
       this.detailsDialogVisible = true;
       this.detailsRow = row;
       this.detailsRow1 = row;
    },
    // reviewTohis(row){//列表回复
    //   console.log(this.tableData);
    //   console.log(row);
    //   this.$router.push({name:'ConsultationZXHG',query:{review:row,details:row.DETAILS,serial:row.serial,flag:this.CONSULTTYPE}})
    // },
    businessSave(){
      this.V.$submit('txl', (canSumit,data) => {
        if(!canSumit) return
        var enti = {};
        var enti = this.entity;
        enti.CONSULTTYPE = this.CONSULTTYPE;
        enti.DETAILS = this.businessDETAILS;
        if(this.businessText == "保存"){
          this.$api.post('/manage-platform/consult/saveConsult',enti,
           r =>{
             if(r.success){
               console.log(r);
               this.$message({
                 message: '恭喜你，保存成功',
                 type: 'success'
               });
               enti.serial = r.data.serial;
               this.businessText = "回复"

             }
           })
        }else if(this.businessText == "回复"){
          this.businessDETAILS="";
          this.$router.push({name:'ConsultationZXHG',query:{serial:enti.serial,details:enti.DETAILS,flag:enti.CONSULTTYPE}})
        }
      })
    },
    otherSave(){
      this.V.$submit('txl', (canSumit,data) => {
        if(!canSumit) return
        var enti = {};
        var enti = this.entity;
        enti.CONSULTTYPE = this.CONSULTTYPE;
        enti.DETAILS = this.otherDETAILS;
        if(this.otherText == "保存"){
          this.$api.post('/manage-platform/consult/saveConsult',enti,
           r =>{
             if(r.success){
               console.log(r);
               this.$message({
                 message: '恭喜你，保存成功',
                 type: 'success'
               });
               enti.serial = r.data.serial;
               this.otherText = '回复';
             }
           })
        }else if(this.otherText == "回复"){
          this.otherDETAILS="";
          this.$router.push({name:'ConsultationZXHG',query:{serial:enti.serial,details:enti.DETAILS,flag:enti.CONSULTTYPE}})
        }
      })
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
.width-lef{
  width: 5%!important;
}
.tt-width{
  width: 15%!important;
}
.height80{
  height: 80px;
}
</style>
<style media="screen">
  .problem-type .el-radio{
    margin-left: 30px!important;
  }
  .oneD .el-dialog__body{
    max-height: 600px;
    overflow-y: visible!important;
  }
  /* .example-error{
    padding: 10px!important;
  } */
</style>
