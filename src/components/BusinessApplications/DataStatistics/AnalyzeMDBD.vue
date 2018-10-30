
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>

          <el-row align="center"   :gutter="2">

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><font color='red'>*</font> 时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begintime" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">国籍：</span>
                <el-select v-model="pd.country" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出发地：</span>
                <el-select v-model="pd.cityfrom" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">目的地：</span>
                <el-select v-model="pd.cityto" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flttype"  filterable clearable  class="input-input"  placeholder="请选择"  size="small">

                  <el-option value="I" label="I - 入境">
                  </el-option>
                  <el-option value="O" label="O - 出境">
                  </el-option>
                  <el-option value="A" label="A - 全部">
                  </el-option>
                </el-select>
              </el-col>

          </el-row>
          <el-row align="center"   :gutter="2" class="yy-line">

            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">行属性：</span>
              <el-checkbox label="国籍" v-model="pd.rowproperty_country"></el-checkbox>
              <el-checkbox label="目的地" v-model="pd.rowproperty_cityto"></el-checkbox>
              <el-checkbox label="航班" v-model="pd.rowproperty_fltno"></el-checkbox>
              <el-checkbox label="出入境方向" v-model="pd.rowproperty_flttype"></el-checkbox>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">列属性：</span>
              <el-checkbox label="DMZ比中" v-model="pd.colproperty1"></el-checkbox>
              <el-checkbox label="业务平台比中" v-model="pd.colproperty2"></el-checkbox>
              <el-checkbox label="处理结果" v-model="pd.colproperty3"></el-checkbox>
              <el-checkbox label="甄别结果" v-model="pd.colproperty4"></el-checkbox>
            </el-col>

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
            <div id="myChart4" class="ppie"></div>
            <div style="clear:both"></div>
          </div>
          <div v-show="page==1">
            <el-table
              :data="tableData"
              border
              :summary-method="getSummaries"
              show-summary
              >
            <el-table-column
              prop="flttype"
              label="入出境方向" width="100" >

            </el-table-column>
            <el-table-column
              prop="country"
              label="国籍"
              >
            </el-table-column>
            <el-table-column label="DMZ比中" v-if='showdmz'>
                <el-table-column
                  prop="blkin"
                  label="黑名单" >
                </el-table-column>
                <el-table-column
                  prop="blkinsxzj"
                  label="失效证" >
                </el-table-column>
                <el-table-column
                  prop="visablkin"
                  label="失效签证" >
                </el-table-column>
                <el-table-column
                  prop="tctlin"
                  label="临控名单" >
                </el-table-column>
                <el-table-column
                  prop="whtin"
                  label="白名单" >
                </el-table-column>
            </el-table-column>
            <el-table-column label="业务平台比中" v-if='showyw'>
                <el-table-column
                  prop="plt_blkin"
                  label="黑名单" >
                </el-table-column>
                <el-table-column
                  prop="plt_blkinsxzj"
                  label="失效证" >
                </el-table-column>
                <el-table-column
                  prop="plt_visablkin"
                  label="失效签证" >
                </el-table-column>
                <el-table-column
                  prop="focus"
                  label="重点关注" >
                </el-table-column>
            </el-table-column>
            <el-table-column label="处理结果" v-if='showcljg'>
                <el-table-column
                  prop="Chk_0z"
                  label="允许值机" >
                </el-table-column>
                <el-table-column
                  prop="Chk_1z"
                  label="禁止登机" >
                </el-table-column>
                <el-table-column
                  prop="Chk_2z"
                  label="再次检查" >
                </el-table-column>
                <el-table-column
                  prop="Chk_4z"
                  label="数据错误" >
                </el-table-column>
            </el-table-column>
            <el-table-column label="甄别结果" v-if='showzbjg'>
                <el-table-column
                  prop="confirm"
                  label="确认" >
                </el-table-column>
                <el-table-column
                  prop="cancel"
                  label="排除" >
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
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMdd');
            return startT > this.pd.endtime;
          } else if (this.pd.endtime == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMdd');
          return endT < this.pd.begintime;
        }
      },
      form: {},
      lineChart: null,
      showdmz: true,
      showyw: true,
      showcljg: true,
      showzbjg: true,
      sData1:[],
      sData2:[],
      sData3:[],
      sData4:[],

    }
  },
  mounted() {
    this.queryNationality();

    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    console.log(begintime+"--"+endtime);
    //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.queryNationality();

    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    //  this.getList(this.CurrentPage, this.pageSize, this.pd);
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

      let p = {
        // "currentPage": currentPage,
        // "showCount": showCount,
        // "cdt": pd
        "begintime": pd.begintime,
        "endtime": pd.endtime,
        "country": pd.country,
        "cityfrom": pd.cityfrom,
        "cityto": pd.cityto,
        "fltno": pd.fltno,
        "flttype": pd.flttype,

        "rowproperty_country": pd.rowproperty_country,
        "rowproperty_cityto": pd.rowproperty_cityto,
        "rowproperty_fltno": pd.rowproperty_fltno,
        "rowproperty_flttype": pd.rowproperty_flttype,

        "colproperty1": pd.colproperty1,
        "colproperty2": pd.colproperty2,
        "colproperty3": pd.colproperty3,
        "colproperty4": pd.colproperty4,


      };
      var url = "/manage-platform/dataStatistics/get_namelistcmp_fix";
      if (pd.colproperty2) {
        url = "/manage-platform/dataStatistics/get_namelistcmp_dynamic";
        this.showdmz = false;
        this.showyw = false;
        this.showcljg = false;
        this.showzbjg = false;
      } else if (pd.colproperty1 || pd.colproperty2 || pd.colproperty3 || pd.colproperty4) {
        url = "/manage-platform/dataStatistics/get_namelistcmp_dynamic_noplt";
        this.showdmz = false;
        this.showyw = false;
        this.showcljg = false;
        this.showzbjg = false;
      }else {
        this.showdmz = true;
        this.showyw = true;
        this.showcljg = true;
        this.showzbjg = true;
      }

      if (pd.colproperty1) {
        this.showdmz = true;
      }
      if (pd.colproperty2) {
        this.showyw = true;
      }
      if (pd.colproperty3) {
        this.showcljg = true;
      }
      if (pd.colproperty4) {
        this.showzbjg = true;
      }

      this.$api.post(url, p,
        r => {
          this.tableData = r.data;
          console.log(r.data + "------------------");
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
            let arr=this.tableData;
            var sum1=0,sum01=0;
            var sum2=0,sum02=0;
            var sum3=0,sum03=0;
            var sum4=0,sum04=0;
            var sum5=0,sum05=0,sum005=0;
            for(var i=0;i<arr.length;i++){
              sum1+=parseInt(arr[i].checkincount);
              sum01+=parseInt(arr[i].chk_1z);
              sum2+=parseInt(arr[i].chk_ptype_fl);
              sum02+=parseInt(arr[i].chk_ptype_ddu);
              sum3+=parseInt(arr[i].chk_gender_m);
              sum03+=parseInt(arr[i].chk_gender_f);
              sum4+=parseInt(arr[i].chk_s);
              sum04+=parseInt(arr[i].chk_c);
              sum5+=parseInt(arr[i].foreign);
              sum05+=parseInt(arr[i].inland);
              sum005+=parseInt(arr[i].gat);

            }
            this.sData1=[{value:sum1, name:'总数'},{value:sum01, name:'不准登机人员数量'}];
            this.sData2=[{value:sum2, name:'普通旅客'},{value:sum02, name:'中转旅客'}];
            this.sData3=[{value:sum3, name:'男'},{value:sum03, name:'女'}];
            this.sData4=[{value:sum4, name:'自助'},{value:sum04, name:'柜台'}];
            this.sData5=[{value:sum5, name:'外国人'},{value:sum05, name:'内地居民'},{value:sum005, name:'港澳台'}];
          //  console.log(this.sData1+"------------"+sum0+"==="+sum00);
            this.drawLine();this.drawLine2();this.drawLine3();this.drawLine4();this.drawLine5();



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
        series: [{
          name: 'DMZ比中',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData1
        }]
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
        series: [{
          name: '业务平台比中',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData2
        }]
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
        series: [{
          name: '处理结果',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData3
        }]
      });
    },
    drawLine4() {

      this.lineChart = echarts.init(document.getElementById('myChart4'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart4')).resize;
      let that = this;

      this.lineChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          name: '甄别结果',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData4
        }]
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
.ppie{width:420px; height:300px; float:left; }

</style>
