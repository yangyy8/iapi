
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>

          <el-row align="center"   :gutter="2">

            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text"><font color="red">*</font> 时间范围：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                v-model="pd.begintime" format="yyyy-MM-dd"
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="开始时间"  :picker-options="pickerOptions0" >
              </el-date-picker>
                <span class="septum">-</span>
              <el-date-picker
                 v-model="pd.endtime" format="yyyy-MM-dd"
                 v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="结束时间" :picker-options="pickerOptions1" >
             </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航空公司名称：</span>
              <el-select v-model="pd.airline_company_id" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.CODE+' - '+item.CNAME"
                   :value="item.CODE" >
                 </el-option>
               </el-select>
            </el-col>


          </el-row>
          <el-row align="center"   :gutter="2" class="yy-line">

                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="typerow" placeholder="请选择" size="small" class="input-input">
                     <el-option  label="航空公司名称" value="1" >
                     </el-option>

                   </el-select>
                </el-col>
                <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">列属性：</span>
                  <el-select v-model="pd.aircol" filterable clearable  placeholder="请选择" size="small" class="input-input">
                     <el-option text="航线数量" value="航线数量" >
                     </el-option>
                     <el-option text="载运人员构成" value="载运人员构成" >
                     </el-option>
                   </el-select>
                </el-col> -->
              </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">统计</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="middle">

      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          图表
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
          报表
        </div>
      </div>

      <div class="ak-tab-pane" >
          <div v-show="page==0" >
            <div id="myChart" class="ppie"></div>
            <div id="myChart2" class="ppie"></div>
            <div id="myChart3" class="ppie"></div>
            <div style="clear:both"></div>
          </div>
          <div v-show="page==1">
                       <el-table
                             :data="tableData"
                             :summary-method="getSummaries"
                             show-summary
                             border
                             >
                             <el-table-column
                               prop="airline_company_id"
                               label="航空公司名称" width="200">
                             </el-table-column>
                             <el-table-column
                               prop="linecount"
                               label="航线数量">
                             </el-table-column>
                             <el-table-column
                               prop="fltcount"
                               label="预报航班数量">
                             </el-table-column>
                             <el-table-column
                               prop="boardingcount"
                               label="载运人员数量">
                             </el-table-column>
                             <el-table-column
                               prop="chk_1z"
                               label="不准登机人员数量">
                             </el-table-column>
                                 <el-table-column label="性别构成">
                                   <el-table-column
                                     prop="chk_gender_m"
                                     label="男">
                                   </el-table-column>
                                   <el-table-column
                                     prop="chk_gender_f"
                                     label="女">
                                   </el-table-column>
                              </el-table-column>
                                 <el-table-column label="国籍构成">
                                     <el-table-column
                                       prop="foreign"
                                       label="外国人">
                                     </el-table-column>
                                     <el-table-column
                                       prop="inland"
                                       label="内地居民">
                                     </el-table-column>
                                     <el-table-column
                                       prop="inland"
                                       label="港澳台">
                                     </el-table-column>
                                </el-table-column>


                           </el-table>

          </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {
  formatDate
} from '@/assets/js/date.js'
import {
  dayGap
} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
        begin: '',
        end: '',
        synFlag: '0',
        rzlx: '0'
      },
      nation: [],
      company: [],
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
      page: 0,
      tableData: [],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd.endtime;
          } else if (this.pd.endtime == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begintime;
        }
      },
      form: {},
      typerow:'1',
      lineChart: null,
      sData1:[],
      sData2:[],
      sData3:[],
    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  activated() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  methods: {
    base() {
      this.page = 0;
    },
    batch() {
      this.page = 1;
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
    getSummaries(param) {
        console.log("合计-------------");
         const { columns, data } = param;
         const sums = [];
         columns.forEach((column, index) => {
           if (index === 0) {
             sums[index] = '合计';
             return;
           }
           const values = data.map(item => Number(item[column.property]));
           if (!values.every(value => isNaN(value))) {
             sums[index] = values.reduce((prev, curr) => {
               const value = Number(curr);
               if (!isNaN(value)) {
                 return prev + curr;
               } else {
                 return prev;
               }
             }, 0);
             sums[index] += '';
           } else {
             sums[index] = '';
           }
         });

         return sums;
       },
    getList(currentPage, showCount, pd) {
      // this.pd.begin=formatDate(this.pd.begin,"yyyyMMddhhssmm");
      // this.pd.end=formatDate(this.pd.end,"yyyyMMddhhssmm");
      // const result = this.$validator.verifyAll('timeDemo')
      //  if (result.indexOf(false) > -1) {
      //    return
      //  }

      let p = {
        "begintime": pd.begintime,
        "endtime": pd.endtime,
        "airline_company_id": pd.airline_company_id,
      };

      this.$api.post("/manage-platform/dataStatistics/get_flightCompany", p,
        r => {
          console.log(r);
          this.tableData = r.data;
          let arr=this.tableData;
          var sum1=0,sum01=0;
          var sum2=0,sum02=0;
          var sum3=0,sum03=0,sum003=0;
          for(var i=0;i<arr.length;i++){
            sum1+=parseInt(arr[i].boardingcount);
            sum01+=parseInt(arr[i].chk_1z);
            sum2+=parseInt(arr[i].chk_gender_m);
            sum02+=parseInt(arr[i].chk_gender_f);
            sum3+=parseInt(arr[i].foreign);
            sum03+=parseInt(arr[i].inland);
            sum03+=parseInt(arr[i].gat);
          }
          this.sData1=[{value:sum1, name:'载运人员总数'},{value:sum01, name:'不准登机人员数量'}];
          this.sData2=[{value:sum2, name:'男'},{value:sum02, name:'女'}];
          this.sData3=[{value:sum3, name:'外国人'},{value:sum03, name:'内地居民'},{value:sum003, name:'港澳台'}];
          this.drawLine();this.drawLine2();this.drawLine3();
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form = i;
    },
    drawLine() {
      this.lineChart = echarts.init(document.getElementById('myChart'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'载运人员总数、不准登机人员数量',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '30%'],   //调整位置
                  data:this.sData1
                 }
                ]
          });
    },
    drawLine2() {
      this.lineChart = echarts.init(document.getElementById('myChart2'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart2')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'性别构成',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '30%'],   //调整位置
                  data:this.sData2
                 }
                ]
          });
    },
    drawLine3() {
      this.lineChart = echarts.init(document.getElementById('myChart3'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart3')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'国籍构成',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '30%'],   //调整位置
                  data:this.sData3
                 }
                ]
          });
    },
      }
    }
</script>

<style scoped>
.ak-tab {}

.ak-tabs {
  display: flex;

}

.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.ak-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.ak-tab-pane {
  border: 1px #399bfe solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}
.ppie{width:420px; height:400px; float:left}

</style>
