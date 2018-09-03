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
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltno"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               v-model="pd.scheduledeparturetime"
               type="datetime" size="small"
               placeholder="开始时间"
               format="yyyy-MM-dd HH:mm"
               value-format="yyyyMMddHHmm"
               :picker-options="pickerOptions">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                v-model="pd.schedulearrivetime"
                type="datetime" size="small"
                placeholder="结束时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyyMMddHHmm"
                :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input">

                 <el-option value="I" label="I - 入境">
                 </el-option>
                 <el-option value="O" label="O - 出境">
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班状态：</span>
              <el-select v-model="pd.status" placeholder="请选择" filterable clearable size="small" class="input-input">
                 <el-option value="0" label="0 - 计划">
                 </el-option>
                 <el-option value="1" label="1 - 正在预检">
                 </el-option>
                 <el-option value="2" label="2 - 完成预检">
                 </el-option>
                 <el-option value="3" label="3 - 已起飞">
                 </el-option>
                 <el-option value="4" label="4 - 已办理入境">
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">所属航空公司：</span>
              <el-select v-model="pd.airlineCompanyId" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="(item,ind) in company"
                  :key="ind"
                  :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                  :value="item.AIRLINE_CODE" >
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
          label="航班号" width="80px">

        </el-table-column>
        <el-table-column
          label="航班日期"
          >
          <template slot-scope="scope">
              {{scope.row.departuretime}}
            </template>
        </el-table-column>
        <el-table-column
          label="出入标识" width="100px">
          <template slot-scope="scope">
              {{scope.row.flighttype | fifter1}}
            </template>

        </el-table-column>
        <el-table-column

          label="计划起飞时间"
          >

          <template slot-scope="scope">
              {{scope.row.departuretime}}
            </template>
        </el-table-column>
        <el-table-column

          label="计划到达时间"
        >
        <template slot-scope="scope">
            {{scope.row.arrivetime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="stationfrom"
          label="出发航站"
  >
        </el-table-column>
        <el-table-column
          prop="stationto"
          label="到达航站"
  >
        </el-table-column>
        <el-table-column
          prop="airlineCompanyId"
          label="航空公司"
  >
        </el-table-column>
        <el-table-column
          label="航班状态"  width="100px"
  >  <template slot-scope="scope">
        {{scope.row.status | fifter2}}
      </template>
        </el-table-column>

        <!-- <el-table-column
          prop="BIRTHdate"
          label="值机状态"
  >
        </el-table-column> -->

        <el-table-column
          label="操作">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
    <el-dialog
      title="座位详情"
      :visible.sync="seatDialogVisible"
      width="1220px"
      >
      <Seat></Seat>
    </el-dialog>



    <!-- <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="950px">
      <div class="detail-msg-text">
      <el-form :model="form" ref="addForm">
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span class="yy-input-text">姓名：</span>
          <span class="yy-input-input detailinput">  {{form.familyname}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">性别：</span>
          <span class="yy-input-input detailinput">  {{form.gender=='F'?"女":form.gender=='M'?"男":"未知"}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">出生日期：</span>
          <span class="yy-input-input detailinput">  {{form.birthday}}</span>
          </el-col>
        </el-row>

        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span class="yy-input-text">国籍：</span>
          <span class="yy-input-input detailinput">  {{form.birthcountry}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">证件号码：</span>
          <span class="yy-input-input detailinput">  {{form.passportno}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">出入标识：</span>
          <span class="yy-input-input detailinput">  {{form.flighttype}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="8">
            <span class="yy-input-text">航班号：</span>
          <span class="yy-input-input detailinput">  {{form.fltno}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">航班日期：</span>
          <span class="yy-input-input detailinput">  {{form.scheduledeparturetime}}</span>
          </el-col>
          <el-col :span="8">
            <span class="yy-input-text">事件类型：</span>

          </el-col>
        </el-row>

      </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="detailsDialogVisible = false" size="small">取消</el-button>
      </span>
    </el-dialog> -->
  </div>

</template>

<script>
import Seat from '../../other/seat'
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  components: {Seat},
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
        schedulearrivetime:'',
        scheduledeparturetime:''
      },
      nation: [],
      company:[],
      addDialogVisible: false,
      detailsDialogVisible: false,
      seatDialogVisible:false,
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
            if (this.pd.schedulearrivetime != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.pd.schedulearrivetime;
            }else if(this.pd.schedulearrivetime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.pd.scheduledeparturetime;
        }
      },
      form: { },
    }
  },
  mounted() {
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.scheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    this.pd.schedulearrivetime=formatDate(end,'yyyyMMddhhmm');
    this.queryNationality();
  },
  activated(){
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.scheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    this.pd.schedulearrivetime=formatDate(end,'yyyyMMddhhmm');
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
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      if(dayGap(this.pd.scheduledeparturetime,this.pd.schedulearrivetime,0)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/flight/queryListPages', p,
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
    addItem(formName) {
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       console.log(valid)
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      this.$api.post('/manage-platform/nameList/addNameList', this.form,
        r => {
          console.log(r);
          if (r.Success) {
            this.$message({
              message: '恭喜你，添加成功！',
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
      this.seatDialogVisible=true;
      // this.detailsDialogVisible = true;
      // let p = {
      //   "flightRecordnum": i,
      //
      // };
      // this.$api.post('/manage-platform/statusUpdate/flight/queryTbFlightEntityById', p,
      //   r => {
      //     console.log(r);

      //     this.form = r.data;
      //   })

      this.$router.push({query:{flightNumber:i.fltno,departdateBegin:i.departuretime}})

    },

  },

    filters: {

      fifter1(val) {
        if (val == "I") {
          return "入境";
        } else if(val == "O"){
          return "出境";
        }
      },
      fifter2(val) {
        if (val == "0") {
          return "计划";
        } else if(val == "1"){
          return "正在预检";
        }
        else if(val == "2"){
          return "完成预检";
        }
        else if(val == "3"){
          return "已起飞";
        }
        else if(val == "4"){
          return "已办理入境";
        }
        else if(val == "5"){
          return "取消";
        }
        else if(val == "6"){
          return "已到达";
        }
      },
      filterdate(n)
      {
        if(n=="" || n==null){
          return n;
        }else {
            return n.substring(0,n.length-3);
        }

      }

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
