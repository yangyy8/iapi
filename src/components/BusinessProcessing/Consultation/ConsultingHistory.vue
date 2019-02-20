
<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">咨询来源：</span>
                <el-select v-model="cdt.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option label="0 - 航空公司" value="0"></el-option>
                  <el-option label="1 - 乘客" value="1"></el-option>
                  <el-option label="2 - 其他" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">问题类型：</span>
                <el-select v-model="cdt.CONSULTTYPE" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option label="0 - 旅客校验" value="0"></el-option>
                  <el-option label="1 - 业务咨询" value="1"></el-option>
                  <el-option label="2 - 其他" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">咨询时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker

                   v-model="cdt.STARTTIME"
                   type="datetime"
                   size="small"
                   value-format="yyyyMMddHHmmss"
                   placeholder="开始时间"
                   :picker-options="pickerOptions">
                  </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker

                    v-model="cdt.ENDTIME"
                    type="datetime"
                    size="small"
                    value-format="yyyyMMddHHmmss"
                    placeholder="结束时间"
                    :picker-options="pickerOptions1">
                  </el-date-picker>

                </div>

              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">咨询人：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.CONSULTNAME"  class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航站：</span>
                <el-select v-model="cdt.TERMINAL" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                  <el-option
                  v-for="item in takeOffName"
                  :key="item.AIRPORT_CODE"
                  :value="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">咨询方式：</span>
                <el-select v-model="cdt.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option label="0 - 移动电话" value="0"></el-option>
                  <el-option label="1 - 传真" value="1"></el-option>
                  <el-option label="2 - 邮箱" value="2"></el-option>
                  <el-option label="3 - 固定电话" value="3"></el-option>
                  <el-option label="4 - 其他" value="4"></el-option>
                </el-select>
              </el-col>

              <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-show="cdt.CONSULTFROMTYPE=='0'">
                <span class="input-text">电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.PHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-show="cdt.CONSULTFROMTYPE=='1'">
                <span class="input-text">传真：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.CONSULTFAX"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-show="cdt.CONSULTFROMTYPE=='2'">
                <span class="input-text">邮箱：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.CONSULTEMAIL"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-show="cdt.CONSULTFROMTYPE=='3'">
                <span class="input-text">固定电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.INCOMINGPHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-show="cdt.CONSULTFROMTYPE=='4'">
                <span class="input-text">其他：</span>
                <el-input placeholder="请输入内容" size="small" v-model="cdt.CONSULTFROMOTHERREMARK"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
            <el-button type="success" class="mb-15" size="small"  @click="getList(CurrentPage,pageSize,cdt)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick">
        <el-table-column
          prop="CONSULTFROM"
          label="咨询来源"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.CONSULTFROM | fifter3}}
          </template>
        </el-table-column>
        <el-table-column
          prop="TERMINAL"
          label="航站"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CONSULTNAME"
          label="咨询人"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="被咨询人"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CONSULTFROMTYPE"
          label="咨询方式"
          sortable>
          <template slot-scope="scope">
            {{scope.row.CONSULTFROMTYPE|fifter2}}
          </template>
        </el-table-column>
        <el-table-column
          prop="CREATETIMESTR"
          label="咨询时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CONSULTTYPE"
          label="问题类型"
          sortable>
          <template slot-scope="scope">
            {{scope.row.CONSULTTYPE|fifter1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="CONSULTFROMTYPE"
          label="联系方式"
          sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.CONSULTFROMTYPE == 0">{{scope.row.PHONE}}</span>
            <span v-else-if="scope.row.CONSULTFROMTYPE == 1">{{scope.row.CONSULTFAX}}</span>
            <span v-else-if="scope.row.CONSULTFROMTYPE == 2">{{scope.row.CONSULTEMAIL}}</span>
            <span v-else-if="scope.row.CONSULTFROMTYPE == 3">{{scope.row.INCOMINGPHONE}}</span>
            <span v-else="scope.row.CONSULTFROMTYPE == 4">{{scope.row.CONSULTFROMOTHERREMARK}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"  class="a-btn"  title="详情"  icon="el-icon-tickets" @click="details(scope.row)"></el-button>
            <el-button type="text"  class="a-btn"  title="回复"  icon="el-icon-edit-outline" :class="{'gray':scope.row.CONSULTSTATUS==0}"  @click="review(scope.row)"></el-button>
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
    <el-dialog title="查看详情"  :visible.sync="detailsDialogVisible" width="400px;">
      <el-table
        :data="tableDataD"
        border
        style="width: 100%;"
        class="o-table3"
        v-if="wenType==0"
        @header-click="headerClick">
        <el-table-column
          prop="NAME"
          label="姓名"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CARDNUM"
          label="证件号码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="EXPIREDATESTR"
          label="证件有效期"
          width="160"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍/地区"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别"
          sortable>
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期"
          width="160"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入境类型"
          width="120"
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
          width="160"
          sortable>
        </el-table-column>
        <el-table-column
          prop="VISANUMBER"
          label="签证号码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类"
          sortable>
        </el-table-column>
        <el-table-column
          prop="INSTRUCT_OLD"
          label="反馈状态"
          sortable>
        </el-table-column>
      </el-table>
      <el-row :gutter="2">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text tt-width">问题详情：</span>
          <el-input type="textarea" class="height80" v-model="DETAILS" :disabled="true"></el-input>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      wenType:0,
      cdt:{
        STARTTIME:'',
        ENDTIME:''
      },
      DETAILS:'',
      takeOffName:[],
      detailsDialogVisible:false,

      pd: {
        startCreatetime:'',
        endCreatetime:'',
        startDealtime:'',
        endDealtime:''
      },
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
      tableDataD:[],
      pickerOptions: {
        disabledDate: (time) => {
            if (this.cdt.ENDTIME != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.cdt.ENDTIME;
            }else if(this.cdt.ENDTIME == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.cdt.STARTTIME;
        }
      },
    }
  },
  mounted() {
    // let time = new Date();
    // let end = new Date();
    // let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.cdt.STARTTIME=formatDate(begin,'yyyyMMddhhmmss');
    // this.cdt.ENDTIME=formatDate(end,'yyyyMMddhhmmss');
  },
  activated(){
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  filters: {
    fifter1(val) {
      if (val == "0") {
        return "旅客校验";
      } else if(val == "1"){
        return "业务咨询";
      }else if(val == '2'){
        return "其他"
      }
    },
    fifter3(val) {
      if (val == "0") {
        return "航空公司";
      } else if(val == "1"){
        return "乘客";
      }else if(val == '2'){
        return "其他"
      }
    },
    fifter2(val){
      if (val == "0") {
        return "移动电话";
      } else if(val == "1"){
        return "传真";
      }else if(val == '2'){
        return "邮箱"
      }else if(val == '3'){
        return "固定电话"
      }else if(val == '4'){
        return "其他"
      }
    }
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

      if(dayGap(this.cdt.STARTTIME,this.cdt.ENDTIME,1)>30){
        this.$alert('事件产生时间查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/consult/queryConsultHistory', p,
        r => {
          console.log(r);
          if (r.success) {
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          }
        })
    },
    review(i){
      if(i.CONSULTTYPE!=0){
        this.$router.push({name:'ConsultationZXHG',query:{serial:i.SERIAL,details:i.DETAILS,flag:i.CONSULTTYPE}})
      }else if(i.CONSULTTYPE == 0){
        this.$router.push({name:'ConsultationZXHG',query:{review:i,details:i.DETAILS,serial:i.SERIAL,flag:i.CONSULTTYPE}})
      }
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    details(row){
      this.tableDataD=[];
      this.wenType = row.CONSULTTYPE;
      this.detailsDialogVisible = true;
      let p={
        'serial':row.SERIAL
      }
      this.$api.post('/manage-platform/consult/queryConsultBySerial',p,
       r =>{
         this.tableDataD.push(r.data);
         this.DETAILS = r.data.DETAILS
       })
    }
  }
}
</script>

<style scoped>
.tt-width{
  width: 9%!important;
}
.gray{
  background-color: #F4F4F4!important;
  border:1px solid #ccc!important;
  color:#bbb!important;
}
</style>
