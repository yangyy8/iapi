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
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><font color="red">*</font> 航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               v-model="pd.startScheduledeparturetime"
               type="datetime" size="small"
               format="yyyy-MM-dd HH:mm"
                value-format="yyyyMMddHHmm"
               placeholder="开始时间" align="right" :picker-options="pickerOptions">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
             v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                v-model="pd.endScheduledeparturetime"
                type="datetime" size="small" align="right"  format="yyyy-MM-dd HH:mm"
                 value-format="yyyyMMddHHmm"
                placeholder="结束时间"  :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">所属航空公司：</span>
              <el-select v-model="pd.airlineCompanyIdEqual" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                   :value="item.AIRLINE_CODE" >
                 </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">实际出发口岸：</span>
              <el-select v-model="pd.stationfromEqual" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in Airport"
                   :key="item.AIRPORT_CODE"
                   :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                   :value="item.AIRPORT_CODE" >
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">计划到达口岸：</span>
              <el-select v-model="pd.stationtoEqual" filterable clearable  placeholder="请选择"   size="small" class="input-input">
                 <el-option
                   v-for="item in Airport"
                   :key="item.AIRPORT_CODE"
                   :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                   :value="item.AIRPORT_CODE">
                 </el-option>
               </el-select>

            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" >
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="fltno"
          label="航班号" width="100" sortable>
        </el-table-column>
        <el-table-column
          prop="flightTime"
          label="航班日期" sortable
          >
        </el-table-column>
        <el-table-column
          prop="airlineCompanyName"
          label="所属航空公司" sortable>
        </el-table-column>
        <el-table-column
          prop="stationfromName"
          label="实际出发口岸" sortable
          >
        </el-table-column>
        <el-table-column
          prop="stationtoName"
          label="计划到达口岸" sortable
        >
        </el-table-column>

        <el-table-column
          prop="changeportName"
          label="备降口岸" sortable
  >
        </el-table-column>
        <el-table-column
          prop="boardingcount"
          label="载运旅客数量" width="130" sortable
  >
        </el-table-column>
        <el-table-column
          width="150"
          label="操作">
          <template slot-scope="scope">
              <el-button class="table-btn" :class="{'gray':scope.row.status!=3}" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">处理</el-button>
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
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" :disabled="true" v-model="form.fltno" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">所属航空公司：</span>
            <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="form.airlineCompanyName" class="yy-input-input"></el-input>
          </el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">航班日期：</span>
            <el-input placeholder="请输入内容" size="small"   :disabled="true" v-model="form.flightTime" class="yy-input-input"></el-input>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">实际出发口岸：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.stationfrom+' - '+form.stationfromName" :disabled="true" class="yy-input-input"></el-input>

          </el-col>

        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">原计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="form.stationto+' - '+form.stationtoName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
  <hr/>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:15%">备降口岸：</span>
            <el-select v-model="form.changeport"  filterable clearable  @visible-change="queryAirport" placeholder="请选择" size="small" style="width:80%;">
               <el-option
                 v-for="item in Airport"
                 :key="item.AIRPORT_CODE"
                 :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                 :value="item.AIRPORT_CODE" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:15%">事件描述：</span>
           <el-input type="textarea" maxlength="250" placeholder="请输入备降事件描述(不能超过250个字)" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.desc" style="width:80%;"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">提 交</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>

      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
// import {formatDate} from '@/assets/js/date.js'

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      datenow:'',
      pd: {  startScheduledeparturetime:'',
        endScheduledeparturetime:'',},
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
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.departdateEnd != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.pd.departdateEnd;
            }else if(this.pd.departdateEnd == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.pd.departdateBegin;
        }
      },
      form: {},
      Airport:[],
    }
  },
  mounted() {
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
    this.queryAirport();

    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 14);
    this.pd.startScheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    this.datenow=formatDate(begin,'yyyy-MM-dd');
    this.pd.endScheduledeparturetime=formatDate(end,'yyyyMMddhhmm');
  },
  activated() {
    // let time = new Date();
    // let end = new Date();
    // let begin =new Date(time - 1000 * 60 * 60 * 24 * 14);
    // this.pd.startScheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    // this.pd.endScheduledeparturetime=formatDate(end,'yyyyMMddhhmm');
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
  // if(pd.startScheduledeparturetime!= undefined){
  //   pd.startScheduledeparturetime= formatDate(pd.startScheduledeparturetime, "yyyy-MM-dd");
  // }
  // if(pd.endScheduledeparturetime!= undefined){
  //   pd.endScheduledeparturetime= formatDate(pd.endScheduledeparturetime, "yyyy-MM-dd");
  // }
  const result = this.$validator.verifyAll('timeDemo')
   if (result.indexOf(false) > -1) {
     return
   }
  if(dayGap(this.pd.startScheduledeparturetime,this.pd.endScheduledeparturetime,0)>14){
    this.$alert('航班日期起始查询日期不得小于'+this.datenow, '提示', {
      confirmButtonText: '确定',
    });
    return false
  }



      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/flight/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryAircompanyList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
    queryAirport() {
      if(this.Airport.length!=0){
        return;
      };
      this.$api.post('/manage-platform/codeTable/queryAirport', {},
        r => {
            this.Airport = r.data;
        })
    },
    addItem(formName) {
      this.$api.post('/manage-platform/statusUpdate/flight/saveChangePort', this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '变更成功！',
              type: 'success'
            });

          } else {
            this.addDialogVisible = false;
            this.$message.error(r.Message);
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.currentPage, this.showCount, this.pd);
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      if(i.status!=3){
        this.$confirm(i.flightMessage, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }else{
        this.addDialogVisible = true;
        this.form = i;
        this.getList(this.currentPage, this.showCount, this.pd)
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
.yy-input-text{width:30%;}
hr {
  height: 2px;
  border: none;
  border-top: 1px solid #73BFF2;
}
.gray{
  background-color: #F4F4F4!important;
  border:1px solid #ccc!important;
  color:#bbb!important;
}
</style>
