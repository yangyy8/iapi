
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
              <span class="input-text">时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="mb-2">
            <el-row type="flex" class="middle">
                <el-col :span="22" class="pr-20">
                <el-row align="center"   :gutter="2">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="input-text">行属性：</span>
                    <el-select v-model="pd.airrow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                       <el-option text="全部" value="全部" >
                       </el-option>
                     </el-select>
                  </el-col>
                                    <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                                      <span class="input-text">列属性：</span>
                                      <el-select v-model="pd.airdrow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                                         <el-option text="名单校验总量" value="名单校验总量" >
                                         </el-option>
                                         <el-option text="问题类型构成" value="问题类型构成" >
                                         </el-option>
                                       </el-select>
                                    </el-col>
                </el-row>
              </el-col>
              <el-col :span="2" class="down-btn-area">
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
            <div id="myChart" style="width:500px; height:500px;"></div>
          </div>
          <div v-show="page==1">ds
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
          if (this.pd.end != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd.end;
          } else if (this.pd.end == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begin;
        }
      },
      form: {},
      lineChart: null,

    }
  },
  mounted() {
    this.queryNationality();
    this.drawLine();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddHHmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.queryNationality();
      this.drawLine();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddhhmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage, this.pageSize, this.pd);
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
    getList(currentPage, showCount, pd) {
      // this.pd.begin=formatDate(this.pd.begin,"yyyyMMddhhssmm");
      // this.pd.end=formatDate(this.pd.end,"yyyyMMddhhssmm");
      if (dayGap(this.pd.begin, this.pd.end, 0) > 1) {
        this.$alert('只能查询某一天的日期', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };

      this.$api.post("/manage-platform/log_event/queryListPageAll", p,
        r => {
          console.log(r);
          this.tableData = r.data.pd.resultList;
          this.TotalResult = r.data.totalResult;
        })
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
            name:'总数、不准登机人员数量',
            type:'pie',
            radius: ['30%', '50%'],
            center: ['50%', '30%'],   //调整位置
            data:[
                {value:535, name:'总数'},
                {value:310, name:'不准登机人员数量'},
            ]
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
</style>
