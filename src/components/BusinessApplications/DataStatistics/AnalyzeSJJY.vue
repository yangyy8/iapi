
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
            <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航空公司名称：</span>
              <el-select v-model="pd.airline_company_id" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.CODE+' - '+item.CNAME"
                   :value="item.CODE" >
                 </el-option>
               </el-select>
            </el-col> -->


          </el-row>
          <!-- <el-row type="flex" class="middle">

                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="typerow" placeholder="请选择" size="small" class="input-input">
                     <el-option  label="航空公司名称" value="1" >
                     </el-option>
                   </el-select>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">列属性：</span>
                  <el-select v-model="pd.aircol" filterable clearable  placeholder="请选择" size="small" class="input-input">
                     <el-option text="航线数量" value="航线数量" >
                     </el-option>
                     <el-option text="载运人员构成" value="载运人员构成" >
                     </el-option>
                   </el-select>
                </el-col>
              </el-row> -->
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
            <div id="myChart" class="ppie">暂无数据</div>
            <div id="myChart2" class="ppie"></div>
            <!-- <div id="myChart3" class="ppie"></div> -->
            <div style="clear:both"></div>
          </div>
          <div v-show="page==1">
            <el-row class="mb-15 yr">
              <el-button type="primary" size="small" @click="download(0)">Excel导出</el-button>
              </el-row>
                       <el-table
                             :data="tableData"
                             :summary-method="getSummaries"
                             show-summary
                             border
                             class="mt-10 o-table3"
                             @header-click="headerClick"
                             >
                             <el-table-column
                               prop=""
                               label="" >
                             </el-table-column>
                             <el-table-column
                               prop="totalcount"
                               label="校验总量" sortable>
                             </el-table-column>
                             <el-table-column
                               prop="errcount"
                               label="异常数" sortable>
                             </el-table-column>

                                 <el-table-column label="问题类型">
                                   <el-table-column
                                     prop="rst_1"
                                     label="缺失" sortable>
                                     <template slot-scope="scope">
                                      <a class="bluecolor"  @click="details(1)" > {{scope.row.rst_1}} </a>
                                    </template>
                                   </el-table-column>
                                   <el-table-column
                                     prop="rst_2"
                                     label="长度不符合" sortable>
                                     <template slot-scope="scope">
                                      <a class="bluecolor"  @click="details(2)" > {{scope.row.rst_2}} </a>
                                    </template>
                                   </el-table-column>
                                   <el-table-column
                                     prop="rst_3"
                                     label="格式错误" sortable>
                                     <template slot-scope="scope">
                                      <a class="bluecolor"  @click="details(3)" > {{scope.row.rst_3}} </a>
                                     </template>
                                   </el-table-column>
                                   <el-table-column
                                     prop="rst_4"
                                     label="不符合当前时间" sortable>
                                     <template slot-scope="scope">
                                      <a class="bluecolor"  @click="details(4)" > {{scope.row.rst_4}} </a>
                                     </template>
                                   </el-table-column>
                              </el-table-column>
                           </el-table>

          </div>
        </div>
    </div>
  </div>

  <el-dialog :title="dialogtitle" :visible.sync="detailsDialogVisible">
    <el-row class="mb-15 yr">
      <el-button type="primary" size="small" @click="download(1)">Excel导出</el-button>
      </el-row>
    <el-table
      :data="tableData1"
      border
      style="width: 100%;"
      class="mt-10 o-table3"
      @sort-change="sortChange"
      @header-click="headerClick">
      <el-table-column
        prop="fltno"
        label="航班号" sortable>
      </el-table-column>
      <el-table-column
        prop="scheduledeparturetime"
        label="计划起飞时间" sortable>
      </el-table-column>
      <el-table-column
        prop="country"
        label="国籍" sortable>

      </el-table-column>
      <el-table-column
        prop="passportno"
        label="证件号码" sortable>

      </el-table-column>
      <el-table-column
        prop="thanfieldname"
        label="比对字段名" sortable>
      </el-table-column>
      <el-table-column
        prop="thantype"
        label="错误类型" sortable>
      </el-table-column>
      <!-- <template slot-scope="scope">
        <span v-if="scope.row.thantype=='1'">必录项缺失</span>
        <span v-if="scope.row.thantype=='2'">长度不符合</span>
        <span v-if="scope.row.thantype=='3'">格式错误</span>
        <span v-if="scope.row.thantype=='4'">不符合当前时间</span>
      </template> -->
      <el-table-column
        prop="thanfieldvalue"
        label="字段值" sortable>
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
        :current-page.sync ="CurrentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="TotalResult">
      </el-pagination>
    </div>

   </el-dialog>

  </div>
</template>
<script>
import echarts from 'echarts'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
      begintime:'',endtime:''
      },
      order:'',
      direction:0,
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
      tableData1:[],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()-1), 'yyyyMMddhhmmss');
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
      dialogtitle:'详情',
      mapForm:{},
      thantype:1,
    }
  },
  mounted() {
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    time.setDate(1);
    this.pd.begintime = formatDate(time, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  activated() {
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  methods: {
    headerClick(column,event){
    event.target.title=column.label
  },
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
    //  this.getList(this.CurrentPage, val, this.pd);
     this.details(this.thantype,);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //this.getList(val, this.pageSize, this.pd);
    this.details(this.thantype);
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
       sortChange(column, prop, order){
         column.order=='ascending'?this.direction=1:this.direction=0;
         this.order=column.prop;
         this.details(this.thantype);
       },
    getList(currentPage, showCount, pd,order,direction) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }

             if (this.pd.begintime== null|| this.pd.endtime == null) {
               this.$alert('时间范围不能为空', '提示', {
                 confirmButtonText: '确定',
               });
               return false
             };

      let p = {
        "begintime": pd.begintime,
        "endtime": pd.endtime,
      };

      this.$api.post("/manage-platform/dataStatistics/get_datacheck", p,
        r => {
          console.log(r);
          this.tableData = r.data;
          let arr=this.tableData;
          var sum1=0,sum01=0;
          var sum2=0,sum02=0,sum002=0,sum0002=0;
        //  var sum3=0,sum03=0,sum003=0;
          for(var i=0;i<arr.length;i++){
            sum1+=parseInt(arr[i].totalcount);
            sum01+=parseInt(arr[i].errcount);
            sum2+=parseInt(arr[i].rst_1);
            sum02+=parseInt(arr[i].rst_2);
            sum002+=parseInt(arr[i].rst_3);
            sum0002+=parseInt(arr[i].rst_4);
            // sum3+=parseInt(arr[i].foreign);
            // sum03+=parseInt(arr[i].inland);
            // sum03+=parseInt(arr[i].gat);
          }
          this.sData1=[{value:sum1, name:'校验总数'},{value:sum01, name:'异常数'}];
          this.sData2=[{value:sum2, name:'缺失'},{value:sum02, name:'长度不符合'},{value:sum002, name:'格式错误'},{value:sum0002, name:'不符合当前时间'}];
        //  this.sData3=[{value:sum3, name:'外国人'},{value:sum03, name:'内地居民'},{value:sum003, name:'港澳台'}];
          this.drawLine();this.drawLine2();
          //this.drawLine3();
        })
    },
    download(n){

         var url="";
            let p={};
        if(n==0){
         url= this.$api.rootUrl+"/manage-platform/dataStatistics/export_datacheck";
          p={
            "begintime":this.pd.begintime,
            "endtime":this.pd.endtime
          }
       }else if(n==1) {
         url=this.$api.rootUrl+"/manage-platform/dataStatistics/expdatackdetail";
           p={
             "begintime":this.pd.begintime,
             "endtime":this.pd.endtime,
             "thantype":this.thantype,
           }
       }
      axios({
       method: 'post',
       url: url,
       data: p,
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data) {
        if (!data) {
            return
        }

        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'sjjy'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
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
    details(t) {
    console.log('-----',t);
    if(t==1){
      this.dialogtitle="必录项缺失详情";
    }else if(t==2){
      this.dialogtitle="长度不符合详情";
    }else if(t==3){
      this.dialogtitle="格式错误详情";
    }else if(t==4){
      this.dialogtitle="不符合当前时间详情";
    }
      this.pd.thantype=t;
      this.thantype=t;
      this.pd.order=this.order;
      this.pd.direction=this.direction;
      let p = {
        "currentPage":this.currentPage,
        "showCount": this.pageSize,
        "cdt": this.pd

      };
      var url = "/manage-platform/dataStatistics/getdatackdetail";
      this.$api.post(url, p,
        r => {
          if(r.success){
          this.tableData1 = r.data.resultList;
          this.TotalResult = r.data.totalResult;

          }
        })
      this.detailsDialogVisible = true;

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
                  name:'总数、异常数',
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
                  name:'问题类型',
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
                  name:'国家构成',
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
.bluecolor{color: blue; cursor: pointer;}
</style>
<style>
.el-table th > .cell {
  padding-right: 15px!important;
}
</style>
