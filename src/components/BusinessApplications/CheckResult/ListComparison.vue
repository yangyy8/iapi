<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.flightNo"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
          <span class="input-text">航班日期：</span>
          <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.planFlyBeginDate"
               type="datetime" size="small" value-format="yyyyMMddHHssmm"
               placeholder="开始时间"  :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.planFlyEndDate"
                type="datetime" size="small" value-format="yyyyMMddHHssmm"
                placeholder="结束时间" :picker-options="pickerOptions1">
             </el-date-picker>
             </div>
          </el-col>

          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.flightType"  class="input-input"  filterable clearable  placeholder="请选择"  size="small">
                <el-option value="I" label="I - 入境">
                </el-option>
                <el-option value="O" label="O - 出境">
                </el-option>
                <el-option value="A" label="A - 全部">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text">起飞机场：</span>

                  <el-select v-model="pd.cityFrom" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in Airport"
                   :key="item.AIRPORT_CODE"
                   :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                   :value="item.AIRPORT_CODE" >
                 </el-option>
               </el-select>
               <!-- <QueryAirport  :airportModel="pd.cityFrom" @transAirport="getInAirport"></QueryAirport> -->
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text">预计起飞时间：</span>
            <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.planFlyBeginTime"
                 type="datetime" size="small" value-format="yyyyMMddHHssmm"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.planFlyEndTime"
                  type="datetime" size="small" value-format="yyyyMMddHHssmm"
                  placeholder="结束时间" :picker-options="pickerOptions1">
               </el-date-picker>
               </div>
            </el-col>

          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">到达机场：</span>
              <el-select v-model="pd.cityTo"  class="input-input" filterable clearable   placeholder="请选择"  size="small">
                <el-option
                  v-for="item in Airport"
                  :key="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                  :value="item.AIRPORT_CODE" >
                </el-option>
              </el-select>
              <!-- <QueryAirport  :airportModel="pd.cityTo" @transAirport="getOutAirport"></QueryAirport> -->
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text">预计到达时间：</span>
            <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.planReachBeginTime"
                 type="datetime" size="small" value-format="yyyyMMddHHssmm"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.planReachEndTime"
                  type="datetime" size="small" value-format="yyyyMMddHHssmm"
                  placeholder="结束时间" :picker-options="pickerOptions1">
               </el-date-picker>
               </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
               <span class="input-text"><font style="color:red">*</font> 比中时间：</span>
             <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.compareBeginDate"
                 type="datetime" size="small"  value-format="yyyyMMddHHssmm"
                 placeholder="开始时间"  :picker-options="pickerOptions0">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.compareEndDate"
                  type="datetime" size="small"  value-format="yyyyMMddHHssmm"
                  placeholder="结束时间" :picker-options="pickerOptions1">
               </el-date-picker>
               </div>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">比中类型：</span>
                <el-select v-model="pd.checkResultType"  filterable clearable  class="input-input" filterable  clearable   placeholder="请选择"  size="small">

                  <el-option value="0" label="0 - 黑名单-不准入境">
                  </el-option>
                  <el-option value="1" label="1 - 黑名单-失效证件">
                  </el-option>
                  <el-option value="2" label="2 - 黑名单-失效签证">
                  </el-option>
                  <el-option value="3" label="3 - 白名单">
                  </el-option>
                  <el-option value="4" label="4 - 临控名单">
                  </el-option>
                </el-select>
              </el-col>

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

        </el-col>

      </el-row>
    </div>

<div class="middle">
  <el-row type="flex" >
      <el-col :span="9"></el-col>
    <el-col :span="6">
      <div class="datacenter">
        <div class="dataleft"><font style="font-size:30px;color:#B2CB65;">{{this.sum}}</font><br><span class="yy-font">预报量</span></div>
          <div class="dataleft dataline">&nbsp;</div>
          <div class="dataleft"><font style="font-size:30px;color:#FF667D;">{{this.num}}</font><br><span class="yy-font">名单比中量</span></div>
      </div>
</el-col>
  <el-col :span="9"></el-col>
  </el-row>
</div>

    <div class="middle">
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="travellerName"
          label="姓名" >
        </el-table-column>
        <el-table-column
          prop="chineseName"
          label="中文姓名" >
        </el-table-column>
        <el-table-column
          prop="genderDesc"
          label="性别" >
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期" sortable>
        </el-table-column>
                <el-table-column
                  prop="nationalityDesc"
                  label="国籍" sortable>
                </el-table-column>

                <el-table-column
                  prop="passportNo"
                  label="证件号码" >
                </el-table-column>
                <!-- <el-table-column
                  prop="passportExpireDate"
                  label="证件有效期" >
                </el-table-column> -->

                <el-table-column
                  prop="personGrade"
                  label="人员类别" >
                </el-table-column>
                <!-- <el-table-column
                  prop="visaNo"
                  label="签证号码" >
                </el-table-column> -->
                <el-table-column
                  prop="flightNo"
                  label="航班号" >
                </el-table-column>
                <el-table-column
                  prop="departDate"
                  label="航班日期" sortable>
                </el-table-column>
                <el-table-column
                  prop="checkResultTypeDesc"
                  label="比中类型" >
                </el-table-column>
                <el-table-column
                  prop="confirmResultDesc"
                  label="最终确认结果" >
                </el-table-column>
                <el-table-column
                  prop="checkResultDesc"
                  label="反馈结果" >
                </el-table-column>
                <!-- <el-table-column
                  prop="compareDesc"
                  label="反馈描述" >
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
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="800px"
      >
        <el-form :model="dform" ref="detailsForm">
      <el-row type="flex"  class="mb-15">
        <el-col :span="8">姓名：{{dform.travellerName}}</el-col>
        <el-col :span="8">性别：{{dform.genderDesc}}</el-col>
        <el-col :span="8">出生日期：{{dform.birthday}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-15">
        <el-col :span="8">国籍：{{dform.nationalityDesc}}</el-col>
        <el-col :span="8">证件号码：{{dform.passportNo}}</el-col>
        <el-col :span="8">证件有效期：{{dform.passportExpireDate}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-15">
        <el-col :span="8">航班号：{{dform.flightNo}}</el-col>
        <el-col :span="8">比中类型：{{dform.checkResultTypeDesc}}</el-col>
        <el-col :span="8">最终确认结果：{{dform.confirmResultDesc}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-15">
        <el-col :span="8">反馈结果：{{dform.checkResultDesc}}</el-col>
        <el-col :span="8">反馈描述：{{dform.thanTypeDesc}}</el-col>
      </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>

  </div>

</template>

<script>
// import QueryAirport from '../../other/queryAirport'
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  // components: {QueryAirport},
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      sum: "0",
      num: "0",
      pd: {     compareBeginDate:"",
        compareEndDate:"",},
      nation: [],
      value: '',
      value1: "",
      Airport: [],
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
      pickerOptions0: {
        disabledDate: (time) => {
            if (this.pd.compareEndDate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.pd.compareEndDate;
            }else if(this.pd.compareEndDate == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.pd.compareBeginDate;
        }
      },
      form: {},
      dform: {},
    }
  },
  mounted() {
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
    // this.getsum();
    // this.getnum();
    this.queryAirport();
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.compareBeginDate=formatDate(begin,'yyyyMMddhhmmss');
    this.pd.compareEndDate=formatDate(end,'yyyyMMddhhmmss');
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // getInAirport(msg){
    //   this.pd.cityFrom=msg;
    // },
    // getOutAirport(msg){
    //   this.pd.cityTo=msg;
    // },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getsum(pd) {
      let p = {
        "cdt": pd
      };
      this.$api.post('/manage-platform/compareReuslt/nameList/totalCounter', p,
        r => {
          console.log(r);
          this.sum = r.data.crCounter;

        })
    },
    getnum() {

      let p = {
        "cdt": {
          "notPass": "1"
        }
      };
      this.$api.post('/manage-platform/compareReuslt/nameList/counter', p,
        r => {
          console.log(r);
          this.num = r.data.crCounter;

        })
    },
    getList(currentPage, showCount, pd) {
            if(dayGap(this.pd.compareBeginDate,this.pd.compareEndDate,1)>30){
              this.$alert('查询时间间隔不能超过一个月', '提示', {
                confirmButtonText: '确定',
              });
              return false
            }

      this.getsum(pd);
      this.getnum();
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/compareReuslt/nameList/query', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryAirport() {
      if (this.Airport.length != 0) {
        return;
      };
      this.$api.post('/manage-platform/codeTable/queryAirport', {},
        r => {
          console.log(r);
          this.Airport = r.data;

        })
    },

    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;
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

.datacenter {
  text-align: center;
}

.dataleft {
  float: left;
  font-size: 22px;
}

.dataline {
  width: 2px;
  background: #cccccc;
  margin-left: 20px;
  margin-right: 20px;
  height: 60px;
}
</style>
