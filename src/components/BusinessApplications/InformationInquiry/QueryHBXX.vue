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
              <el-select v-model="pd.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input" @change="ftReal">
                 <el-option value="I" label="I - 入境"></el-option>
                 <el-option value="O" label="O - 出境"></el-option>
                 <el-option value="A" label="A - 入出境"></el-option>
               </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">口岸：</span>
              <el-select  v-model="pd.port" @change="airportReal" placeholder="请选择" filterable clearable size="small" class="input-input" @visible-change="queryAirport">
                <el-option
                  v-for="item in airport"
                  :key="item.KADM"
                  :label="item.KADM+' - '+item.KAMC"
                  :value="item.KADM">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班状态：</span>
              <el-select v-model="pd.status" placeholder="请选择" filterable clearable size="small" class="input-input">
                 <el-option value="0" label="0 - 计划"></el-option>
                 <el-option value="1" label="1 - 正在预检"></el-option>
                 <el-option value="2" label="2 - 完成预检"></el-option>
                 <el-option value="3" label="3 - 已起飞"></el-option>
                 <el-option value="4" label="4 - 已办理入境"></el-option>
                 <el-option value="5" label="5 - 取消"></el-option>
                 <el-option value="6" label="6 - 已到达"></el-option>
                 <el-option value="7" label="7 - 失效"></el-option>
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

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">起飞机场：</span>
              <el-select placeholder="请选择" v-model="pd.stationfrom" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">到达机场：</span>
              <el-select placeholder="请选择" v-model="pd.stationto" filterable clearable @visible-change="landing" size="small" class="input-input">
                <el-option
                v-for="item in landingName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
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
        style="width: 100%;">
        <el-table-column
          sortable
          prop="fltno"
          label="航班号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="fltDate"
          sortable
          label="航班日期">
        </el-table-column>
        <el-table-column
          label="出入标识"
          width="100px">
          <template slot-scope="scope">
            {{scope.row.flighttype | fifter1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="airwayMessage"
          sortable
          label="航线">
        </el-table-column>
        <el-table-column
          prop="statusName"
          sortable
          label="航班状态"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="checkincount"
          label="值机人数">
        </el-table-column>
        <el-table-column
          prop="boardingcount"
          label="登机人数">
          <el-table-column
          prop="boardingcount"
          label="已登机"
          width="120">
        </el-table-column>
        <el-table-column
          prop="chkNobrd"
          label="未登机"
          width="120">
        </el-table-column>
        </el-table-column>
        <el-table-column
          prop="closetime"
          sortable
          label="关闭报文">
          <template slot-scope="scope">
            {{scope.row.closetime|fifter3}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">座位详情</el-button>
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
      <Seat :flightNumber="flightNumber0" :globalserial="globalserial0"></Seat>
    </el-dialog>
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
      airport:[],
      takeOffName:[],
      landingName:[],
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
      form: {},
      flightNumber0:'',
      globalserial0:''
    }
  },
  mounted() {
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.pd.scheduledeparturetime=formatDate(flightStart,'yyyyMMddhhmm');
    this.pd.schedulearrivetime=formatDate(end,'yyyyMMddhhmm');
    this.queryNationality();
    // this.queryAirport();
  },
  activated(){
    // let time = new Date();
    // let end = new Date();
    // let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.scheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    // this.pd.schedulearrivetime=formatDate(end,'yyyyMMddhhmm');
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
      this.$api.post('/manage-platform/statusUpdate/flight/queryListPagesNew', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    ftReal(){
      this.$set(this.pd,'stationfrom','');
      this.$set(this.pd,'stationto','');
    },
    airportReal(){
      this.$set(this.pd,'stationfrom','');
      this.$set(this.pd,'stationto','');
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
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
      console.log(i);
      this.seatDialogVisible=true;
      this.flightNumber0 = i.flightRecordnum;
      this.globalserial0=i.flightRecordnum;
      // this.$router.push({query:{flightNumber:i.flightRecordnum}})
    },
    takeOff(){//调用起飞机场
      let p={
        "port":this.pd.port,
        "flighttype":this.pd.flighttype,
        "type":0
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){//调用降落机场
      let p={
        "port":this.pd.port,
        "flighttype":this.pd.flighttype,
        "type":1
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.landingName = r.data;
         }
       })
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
      fifter3(val){
        if(val){
          return '是'
        }else{
          return '否'
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
