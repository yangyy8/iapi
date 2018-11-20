
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
              <span class="input-text"><font class="yy-color">*</font> 时间范围：</span>
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

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出发地：</span>
                <el-select v-model="pd.cityfrom" filterable clearable  placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="(item,ind) in gwName"
                    :key="ind"
                    :value="item.citycode"
                    :label="item.citycode+' - '+item.cityname"
                  ></el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">目的地：</span>
                <el-select v-model="pd.cityto" filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="(item,ind) in gnName"
                    :key="ind"
                    :value="item.citycode"
                    :label="item.citycode+' - '+item.cityname"
                  ></el-option>
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">国籍：</span>
                <el-select v-model="pd.country" filterable clearable  placeholder="请选择"  size="small" class="input-input">
                  <el-option
                  v-for="(item,ind)  in nation"
                  :key="ind"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">人员类别：</span>
              <el-select v-model="pd.passengertype" filterable clearable  placeholder="请选择" size="small" class="input-input">
                <el-option label="FL - 普通旅客" value="FL" >
                </el-option>
                <el-option label="DDU - 中转旅客" value="DDU" >
                </el-option>

               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">值机渠道：</span>
              <el-select v-model="pd.vid" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option label="S - 自助" value="S" >
                 </el-option>
                 <el-option label="C - 柜台" value="C" >
                 </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">预检结果：</span>
              <el-select v-model="pd.lastcheckresult" filterable clearable  placeholder="请选择" size="small" class="input-input">
                <el-option value="0Z" label="0Z - 允许打印登机牌">
                </el-option>
                <el-option value="1Z" label="1Z - 禁止打印登机牌">
                </el-option>
                <el-option value="2Z" label="2Z - 请再次核对">
                </el-option>
                <el-option value="4Z" label="4Z - 数据错误">
                </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flighttype"  filterable clearable  class="input-input"  placeholder="请选择"  size="small">

                  <el-option value="I" label="I - 入境">
                  </el-option>
                  <el-option value="O" label="O - 出境">
                  </el-option>
                  <el-option value="A" label="A - 全部">
                  </el-option>
                </el-select>
              </el-col>


          </el-row>
          <el-row align="center"  class="yy-line">

            <el-col  :span="20">
              <span class="input-text" style="width:12%"><font class="yy-color">*</font> 行属性：</span>
              <el-checkbox label="出入境方向" v-model="pd.rowproperty_flttype"></el-checkbox>
              <el-checkbox label="国籍" v-model="pd.rowproperty_country"></el-checkbox>
              <el-checkbox label="出发地" v-model="pd.rowproperty_cityfrom"></el-checkbox>
              <el-checkbox label="目的地" v-model="pd.rowproperty_cityro"></el-checkbox>
              <el-checkbox label="人员类别" v-model="pd.rowproperty_passengertype"></el-checkbox>
              <el-checkbox label="值机渠道" v-model="pd.rowproperty_vid"></el-checkbox>
              <el-checkbox label="预检结果" v-model="pd.rowproperty_lastcheckresult"></el-checkbox>
            </el-col>
           </el-row>
            <el-row align="center" class="yy-line">
              <el-col  :span="20">
                <span class="input-text" style="width:12%"><font class="yy-color">*</font> 列属性：</span>
              <el-checkbox label="人员类别" v-model="pd.colproperty1"></el-checkbox>
              <el-checkbox label="性别构成" v-model="pd.colproperty2"></el-checkbox>
              <el-checkbox label="国家构成" v-model="pd.colproperty3"></el-checkbox>
              <el-checkbox label="值机渠道" v-model="pd.colproperty4"></el-checkbox>
              <el-checkbox label="预检结果" v-model="pd.colproperty5"></el-checkbox>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
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
            <div id="myChart" class="ppie">暂无数据</div>
            <div id="myChart2" class="ppie"></div>
            <div id="myChart3" class="ppie"></div>
            <div id="myChart4" class="ppie"></div>
            <div id="myChart5" class="ppie"></div>
            <div id="myChart6" class="ppie"></div>
            <div style="clear:both"></div>
          </div>

          <div v-show="page==1">
            <el-row class="mb-15 yr">
              <el-button type="primary" size="small" @click="download()">Excel导出</el-button>
              </el-row>
            <el-table
                  :data="tableData"
                  :summary-method="getSummaries"
                  show-summary
                  border
                  >
                  <el-table-column
                    prop=""
                    label="">
                  </el-table-column>
                  <el-table-column
                    prop="flttype"
                    label="入出境方向" v-if='show1'>
                  </el-table-column>
                  <el-table-column
                    prop="cityto"
                    label="目的地" v-if='show2'>
                  </el-table-column>
                  <el-table-column
                    prop="country"
                    label="国籍" v-if='show3'>
                  </el-table-column>
                  <el-table-column
                    prop="fltcount"
                    label="航班数量">
                  </el-table-column>
                  <el-table-column
                    prop="checkincount"
                    label="值机校验数量">
                  </el-table-column>
                    <el-table-column label="人员类别" v-if='show4'>
                      <el-table-column
                        prop="chk_ptype_fl"
                        label="普通旅客">
                      </el-table-column>
                      <el-table-column
                        prop="chk_ptype_ddu"
                        label="中转旅客">
                      </el-table-column>
                     </el-table-column>
                      <el-table-column label="性别构成" v-if='show5'>
                        <el-table-column
                          prop="chk_gender_m"
                          label="男">
                        </el-table-column>
                        <el-table-column
                          prop="chk_gender_f"
                          label="女">
                        </el-table-column>
                   </el-table-column>
                      <el-table-column label="国籍构成" v-if='show6'>
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
                     <el-table-column label="值机渠道" v-if='show7'>
                      <el-table-column
                        prop="chk_s"
                        label="自助">
                      </el-table-column>
                      <el-table-column
                        prop="chk_c"
                        label="柜台">
                      </el-table-column>
                    </el-table-column>
                  <el-table-column label="预检结果" v-if='show8'>
                    <el-table-column
                      prop="chk_0z"
                      label="允许登机">
                    </el-table-column>
                    <el-table-column
                      prop="chk_1z"
                      label="禁止登机">
                    </el-table-column>
                    <el-table-column
                      prop="chk_2z"
                      label="再次检查">
                    </el-table-column>
                    <el-table-column
                      prop="datacheckcount"
                      label="数据错误">
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
        begintime: '',
        endtime: ''
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
      lineChart: null,
      gnName: [],
      gwName: [],
      sData1: [],
      sData2: [],
      sData3: [],
      sData4: [],
      sData5: [],
      sData6: [],
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
      show6: true,
      show7: true,
      show8: true

    }
  },
  mounted() {
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    this.queryNationality();
    this.gn();
    this.gw();
  },
  activated() {
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    this.queryNationality();
    this.gn();
    this.gw();
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
    gw() { //国外城市
      this.$api.post('/manage-platform/dataStatistics/get_city', {},
        r => {
          if (r.success) {
            this.gwName = r.data;
          };
        })
    },
    gn() { //国内城市
      this.$api.post('/manage-platform/dataStatistics/get_city', {},
        r => {
          if (r.success) {
            this.gnName = r.data;
          };
        })
    },
    getSummaries(param) {

      const {
        columns,
        data
      } = param;
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

      const result = this.$validator.verifyAll('timeDemo')
      if (result.indexOf(false) > -1) {
        return
      }

      if (this.pd.begintime == null || this.pd.endtime == null) {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };

      if (this.pd.rowproperty_flttype == undefined && this.pd.rowproperty_country == undefined && this.pd.rowproperty_cityfrom == undefined && this.pd.rowproperty_cityro == undefined && this.pd.rowproperty_passengertype == undefined && this.pd.rowproperty_vid ==
        undefined && this.pd.rowproperty_lastcheckresult == undefined) {
        this.$alert('请选择至少一个行属性', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };

      if (this.pd.colproperty1 == undefined && this.pd.colproperty2 == undefined && this.pd.colproperty3 == undefined && this.pd.colproperty4 == undefined && this.pd.colproperty5 == undefined) {
        this.$alert('请选择至少一个列属性', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };


      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
      this.show6 = false;
      this.show7 = false;
      this.show8 = false;

      if (this.pd.rowproperty_flttype) {
        this.show1 = true;
      }
      if (this.pd.rowproperty_cityro) {
        this.show2 = true;
      }
      if (this.pd.rowproperty_country) {
        this.show3 = true;
      }
      if (this.pd.colproperty1) {
        this.show4 = true;
      }
      if (this.pd.colproperty2) {
        this.show5 = true;
      }
      if (this.pd.colproperty3) {
        this.show6 = true;
      }
      if (this.pd.colproperty4) {
        this.show7 = true;
      }
      if (this.pd.colproperty5) {
        this.show8 = true;
      }

      let p = {

        "begintime": pd.begintime,
        "endtime": pd.endtime,
        "country": pd.country,
        "cityfrom": pd.cityfrom,
        "cityto": pd.cityto,
        "fltno": pd.fltno,
        "flighttype": pd.flighttype,
        "passengertype": pd.passengertype,
        "vid": pd.vid,
        "lastcheckresult": pd.lastcheckresult,
        "rowproperty_country": pd.rowproperty_country,
        "rowproperty_cityto": pd.rowproperty_cityto,
        "rowproperty_fltno": pd.rowproperty_fltno,
        "rowproperty_flttype": pd.rowproperty_flttype,

        "colproperty1": pd.colproperty1,
        "colproperty2": pd.colproperty2,
        "colproperty3": pd.colproperty3,
        "colproperty4": pd.colproperty4,
        "colproperty5": pd.colproperty5,
      };

      this.$api.post("/manage-platform/dataStatistics/get_comp", p,
        r => {
          console.log(r);
          this.tableData = r.data;

          let arr = this.tableData;



          var sum1 = 0,
            sum01 = 0;
          var sum2 = 0,
            sum02 = 0;
          var sum3 = 0,
            sum03 = 0;
          var sum4 = 0,
            sum04 = 0;
          var sum5 = 0,
            sum05 = 0,
            sum005 = 0;
          var sum6 = 0,
            sum06 = 0,
            sum006 = 0,
            sum0006 = 0;

          for (var i = 0; i < arr.length; i++) {
            sum1 += parseInt(arr[i].fltcount);
            sum01 += parseInt(arr[i].checkincount);
            sum2 += parseInt(arr[i].chk_ptype_fl);
            sum02 += parseInt(arr[i].chk_ptype_ddu);
            sum3 += parseInt(arr[i].chk_gender_m);
            sum03 += parseInt(arr[i].chk_gender_f);
            sum4 += parseInt(arr[i].chk_s);
            sum04 += parseInt(arr[i].chk_c);
            sum5 += parseInt(arr[i].foreign);
            sum05 += parseInt(arr[i].inland);
            sum005 += parseInt(arr[i].gat);
            sum6 += parseInt(arr[i].chk_0z);
            sum06 += parseInt(arr[i].chk_1z);
            sum006 += parseInt(arr[i].chk_2z);
            sum0006 += parseInt(arr[i].chk_4z);
          }
          this.sData1 = [{
            value: sum1,
            name: '航班数量'
          }, {
            value: sum01,
            name: '值机校验数量'
          }];
          this.sData2 = [{
            value: sum2,
            name: '普通旅客'
          }, {
            value: sum02,
            name: '中转旅客'
          }];
          this.sData3 = [{
            value: sum3,
            name: '女'
          }, {
            value: sum03,
            name: '男'
          }];
          this.sData4 = [{
            value: sum4,
            name: '自助'
          }, {
            value: sum04,
            name: '柜台'
          }];
          this.sData5 = [{
            value: sum5,
            name: '外国人'
          }, {
            value: sum05,
            name: '内地居民'
          }, {
            value: sum005,
            name: '港澳台'
          }];
          this.sData6 = [{
            value: sum6,
            name: '允许登机'
          }, {
            value: sum06,
            name: '禁止登机'
          }, {
            value: sum006,
            name: '再次检查'
          }, {
            value: sum0006,
            name: '数据错误'
          }];
          //  console.log(this.sData1+"------------"+sum0+"==="+sum00);
          this.drawLine();
          this.drawLine2();
          this.drawLine3();
          this.drawLine4();
          this.drawLine5();
          this.drawLine6();



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
        series: [{
          name: '航班数量、值机校验数量',
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
          name: '旅客类型构成',
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
          name: '性别构成',
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
          name: '值机渠道',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData4
        }]
      });
    },
    drawLine5() {
      this.lineChart = echarts.init(document.getElementById('myChart5'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart5')).resize;
      let that = this;
      this.lineChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          name: '国家构成',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData5
        }]
      });
    },
    drawLine6() {
      this.lineChart = echarts.init(document.getElementById('myChart6'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart6')).resize;
      let that = this;
      this.lineChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          name: '预检结果',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData6
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
</style>
