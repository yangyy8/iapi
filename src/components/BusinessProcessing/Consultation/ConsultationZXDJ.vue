<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <span class="title-green">
            咨询来源
          </span>&nbsp;|&nbsp;
          <span>时间：{{currentDate}}</span>
          <el-row align="center" :gutter="2" style="margin-top:10px">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询来源：</span>
              <el-select v-model="entity.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="0 - 航空公司" value="0"></el-option>
                <el-option label="1 - 乘客" value="1"></el-option>
                <el-option label="2 - 其他" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航站：</span>
              <el-select v-model="entity.TERMINAL" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询人：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTNAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询方式：</span>
              <el-select v-model="entity.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="input-input"  @change="">
                <el-option label="0 - 移动电话" value="0"></el-option>
                <el-option label="1 - 传真" value="1"></el-option>
                <el-option label="2 - 邮箱" value="2"></el-option>
                <el-option label="3 - 固定电话" value="3"></el-option>
                <el-option label="4 - 其他" value="4"></el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item" v-show="entity.CONSULTFROMTYPE=='0'">
              <span class="input-text">移动电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.PHONE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item" v-show="entity.CONSULTFROMTYPE=='1'">
              <span class="input-text">传真：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTFAX"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item" v-show="entity.CONSULTFROMTYPE=='2'">
              <span class="input-text">邮箱：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTEMAIL"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item" v-show="entity.CONSULTFROMTYPE=='3'">
              <span class="input-text">固定电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.INCOMINGPHONE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item" v-show="entity.CONSULTFROMTYPE=='4'">
              <span class="input-text">其他：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CONSULTFROMOTHERREMARK"  class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc">
            <el-button type="success" size="small" @click="addToBook">添加至通讯录</el-button>
          </el-row>
      </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row type="flex" class="middle" style="padding-top:0px!important">
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

          <el-row align="center" :gutter="2" style="margin-top:10px" v-show="CONSULTTYPE==0">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
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
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO"  class="input-input" v-verify.change.blur ="{regs:'required',submit:'timeDemo'}"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                v-model="pd.DEPARTDATE"
                type="datetime" size="small"
                placeholder="航班日期"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyyMMddHHmm">
            </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:35px;" v-show="CONSULTTYPE==0">
          <el-button type="success" class="mb-15" size="small"  @click="getList(CurrentPage,pageSize,pd);">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        v-show="CONSULTTYPE==0">
        <el-table-column
          prop="INTG_CHNNAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="PASSPORTEXPIREDATE"
          label="证件有效期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入境类型">
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="DEPARTDATE"
          label="计划起飞时间"
          width="140">
        </el-table-column>
        <el-table-column
          prop="VISANO"
          label="签证号码">
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类">
        </el-table-column>
        <el-table-column
          prop="LASTCHECKRESULT"
          label="反馈状态">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right">
          <template slot-scope="scope">
            <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-delete" v-if="scope.row.CONSULTSERIAL" @click="reviewTohis(scope.row)">回复</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="entryDetails(scope.row)" v-else>录入</el-button> -->
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="entryDetails(scope.row)">录入</el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot" v-show="CONSULTTYPE==0">
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
          v-show="CONSULTTYPE==0">
        </el-pagination>
      </div>
      <el-row align="center" :gutter="2" type="flex" v-show="CONSULTTYPE==1">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea" v-model="businessDETAILS" maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入描述(不能超过300字)"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc" v-show="CONSULTTYPE==1">
        <el-button type="primary" size="small" @click="businessSave">{{businessText}}</el-button>
        <el-button type="primary" size="small" @click="businessDETAILS=''" style="margin-left:20px!important">清空</el-button>
      </el-row>

      <el-row align="center" :gutter="2" type="flex" v-show="CONSULTTYPE==2">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea" v-model="otherDETAILS" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入描述(不能超过300字)"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc" v-show="CONSULTTYPE==2">
        <el-button type="primary" size="small" @click="otherSave">{{otherText}}</el-button>
        <el-button type="primary" size="small" @click="otherDETAILS=''" style="margin-left:20px!important">清空</el-button>
      </el-row>
    </div>

    <el-dialog :title="detailText"  :visible.sync="detailsDialogVisible" width="400px;">
      <!-- <el-form :model="dform" ref="detailsForm"> -->
        <el-row :gutter="2">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text tt-width">问题详情：</span>
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

      entity:{},
      takeOffName:[],
      pd: {},
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
    this.currentDate=formatDate(new Date(),'yyyy-MM-dd');
  },
  activated() {
    this.currentDate=formatDate(new Date(),'yyyy-MM-dd');
  },
  methods: {
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
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
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
    // method(item){
    //
    //   for(var i=0;i<item.length;i++){
    //     if(item[i]=='0'){
    //       this.phone = '0'
    //     }else if(item.indexOf('0') == -1){
    //       this.phone = '5'
    //     }
    //     if(item[i]=='1'){
    //       this.fix = '1'
    //     }else if(item.indexOf('1') == -1){
    //       this.fix = '5'
    //     }
    //     if(item[i]=='2'){
    //       this.email ='2'
    //     }else if(item.indexOf('2') == -1){
    //       this.email ='5'
    //     }
    //     if(item[i]=='3'){
    //       this.fixP ='3'
    //     }else if(item.indexOf('3') == -1){
    //       this.fixP ='5'
    //     }
    //     if(item[i]=='4'){
    //       this.other = '4'
    //     }else if(item.indexOf('4') == -1){
    //       this.other = '5'
    //     }
    //   }
    // },
    addToBook(){//添加至通讯录
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
    },
    baseNation(){//国籍
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.selection = r.data;
         };
       })
    },
    guestSave(){
      this.detailsRow.CONSULTTYPE = this.CONSULTTYPE;//类型
      this.detailsRow.DETAILS = this.DETAILS;//详情
      this.detailsRow.IAPISERIAL = this.detailsRow.SERIAL;//通讯录一批
      this.detailsRow.CONSULTFROM = this.entity.CONSULTFROM;
      this.detailsRow.TERMINAL = this.entity.TERMINAL;
      this.detailsRow.CONSULTNAME = this.entity.CONSULTNAME;
      this.detailsRow.INCOMINGPHONE = this.entity.INCOMINGPHONE;
      this.detailsRow.PHONE = this.entity.PHONE;
      this.detailsRow.CONSULTFAX = this.entity.CONSULTFAX;
      this.detailsRow.CONSULTEMAIL= this.entity.CONSULTEMAIL;
      this.detailsRow.CONSULTFROMOTHERREMARK = this.entity.CONSULTFROMOTHERREMARK;
      this.$api.post('/manage-platform/consult/saveConsult',this.detailsRow,
        r => {
          if(r.success){
            console.log(r);
            this.$message({
              message: '恭喜你，保存成功',
              type: 'success'
            });
            this.detailsRow.serial = r.data.serial;
            this.enterText = '回复';
            this.detailText = '回复';
            // this.getList(this.CurrentPage, this.pageSize, this.pd)
            // this.detailsDialogVisible = false;
            // setTimeout(function(){for(var i=0;i<this.tableData.length;i++){
            //   if(this.tableData[i].SERIAL == this.detailsRow.IAPISERIAL){
            //     this.$set(this.tableData[i],'DETAILS',this.DETAILS);
            //     this.$set(this.tableData[i],'serial',r.data.serial);
            //     // this.tableData[i].DETAILS = this.DETAILS;
            //     // this.tableData[i].serial = r.data.serial;
            //     console.log(this.tableData[i]);
            //     return
            //   }
            // }},100)
          }
        })
        if(this.enterText == '回复'){
          this.detailsDialogVisible = false;
          this.$router.push({name:'ConsultationZXHG',query:{review:this.detailsRow1,details:this.detailsRow.DETAILS,serial:this.detailsRow.serial,flag:this.CONSULTTYPE}})
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
    reviewTohis(row){//列表回复
      console.log(this.tableData);
      console.log(row);
      this.$router.push({name:'ConsultationZXHG',query:{review:row,details:row.DETAILS,serial:row.serial,flag:this.CONSULTTYPE}})
    },
    businessSave(){
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
    },
    otherSave(){
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
</style>
