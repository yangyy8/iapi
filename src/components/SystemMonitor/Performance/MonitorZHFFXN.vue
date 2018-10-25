<template lang="html">
  <div class="calibrationPerformance">
    <div class="mb-2">
        <el-row type="flex" justify="center" class="middle">
          <el-col :span="6">
            <div>
              <div class="control-item hand" :class="{'control-checked':controlChecked==1}" @click="real">
                  实时监控
              </div>
              <div class="control-item hand" :class="{'control-checked':controlChecked==2}" @click="historyq">
                  性能分析
              </div>
              <div style='clear:both'></div>
            </div>
          </el-col>
        </el-row>
        <div class="middle">
          <div class="co-tab mb-20">
            <div class="co-tabs">
              <div class="co-tab-item hand" :class="{'co-checked':coCheckId==1}" @click="judgeChart">
                图形
              </div>
              <div class="co-tab-item hand" :class="{'co-checked':coCheckId==2}" @click="judgeList">
                列表
              </div>
              <div class="" style="margin-bottom: -6px;" v-show="controlChecked==2">
                <el-row align="center" :gutter="2">
                  <el-col :sm="24" :md="12"  :lg="15" class="input-item">
                    <span class="input-text">分析日期：</span>
                    <div class="input-input t-flex t-date">
                        <el-date-picker
                        v-model="cdt.begin"
                        type="datetime" size="mini"
                        placeholder="开始日期"
                        value-format="yyyyMMddHHmmss"
                        >
                      </el-date-picker>
                      <span class="septum">-</span>
                      <el-date-picker
                         v-model="cdt.end"
                         type="datetime" size="mini"
                         placeholder="结束日期"
                         value-format="yyyyMMddHHmmss"
                         >
                     </el-date-picker>
                    </div>
                  </el-col>
                  <el-col :sm="24" :md="12"  :lg="7" class="input-item">
                    <span class="input-text">分析维度：</span>
                    <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="cdt.type" filterable clearable>
                      <el-option label="按5分钟分析" value="5"></el-option>
                      <el-option label="按小时分析" value="0"></el-option>
                      <el-option label="按天分析" value="1"></el-option>
                      <el-option label="按周分析" value="2"></el-option>
                      <el-option label="按月分析" value="3"></el-option>
                      <!-- <el-option label="按季度分析" value="4"></el-option> -->

                    </el-select>
                  </el-col>
                  <el-col :sm="24" :md="12"  :lg="2" class="input-item">
                    <el-button type="success" size="mini" class="ml-10" @click="search">查询</el-button>
                  </el-col>
                </el-row>
              </div>

            </div>
            <div class="co-tab-pane" >
              <el-row type="flex" style="height:100%" v-if="(controlChecked==1) && (coCheckId==1)">
                <div class = "chart" style="width:100%">
                  <div id = "echarts" style = "width: 100%;height: 400px"></div>
                </div>
              </el-row>
              <div v-if="(controlChecked==1) && (coCheckId==2)">
                <el-row type="flex" justify="end">
                  <el-checkbox v-model="checked">自动刷新</el-checkbox>
                </el-row>

                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      prop="number"
                      type="index"
                      label="序号"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="birthcountry"
                      label="国籍">
                    </el-table-column>
                    <el-table-column
                      prop="passportno"
                      label="证件号码"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="familyname"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="birthday"
                      label="出生日期">
                    </el-table-column>
                    <el-table-column
                      prop="flightRecordnum "
                      label="航班号">
                    </el-table-column>
                    <el-table-column
                      prop="begintime "
                      label="报文接收时间">
                    </el-table-column>
                    <el-table-column
                      label="校验比对结束时间"
                      width='200'>
                      <template  slot-scope="scope">
                        <span>{{scope.row.endtime|discount}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="average"
                      label="耗时">
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="监控时间">
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
              <el-row type="flex" style="height:100%" v-if="(controlChecked==2) && (coCheckId==1)">
                <div class = "barChart" style="width:100%;overflow:hidden">
                  <div id = "barEcharts" style = "width:100%;height: 400px"></div>
                </div>
              </el-row>

              <div v-show="(controlChecked==2) && (coCheckId==2)">
                  <el-table
                    :data="htableData"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="index"
                      prop="number"
                      label="序号"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="year"
                      label="年份">
                    </el-table-column>
                    <el-table-column
                      prop="createtimeStr"
                      label="统计日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="tcount"
                      label="统计条数">
                    </el-table-column>
                    <el-table-column
                      prop="consumetime"
                      label="平均耗时">
                    </el-table-column>
                  </el-table>
                  <div class="middle-foot">
                    <div class="page-msg">
                      <div class="">
                        共{{Math.ceil(hTotalResult/hpageSize)}}页
                      </div>
                      <div class="">
                        每页
                        <el-select v-model="hpageSize" @change="pageSizeChange(hpageSize)" placeholder="10" size="mini" class="page-select">
                          <el-option
                            v-for="item in hoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        条
                      </div>
                      <div class="">
                        共{{hTotalResult}}条
                      </div>
                    </div>
                    <el-pagination
                      background
                      @current-change="hhandleCurrentChange"
                      :page-size="hpageSize"
                      layout="prev, pager, next"
                      :total="hTotalResult">
                    </el-pagination>
                  </div>

              </div>
            </div>

          </div>
        </div>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {formatDate} from '@/assets/js/date.js'
export default {
  data(){
    return{
      // 实时分页
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      // 历史分页
      hCurrentPage:1,
      hpageSize:10,
      hTotalResult:0,

      value:1,
      controlChecked:1,
      coCheckId:1,
      detailsDialogVisible:false,
      checked:true,
      // 实时显示条数
      options:[
        {
          value:10,
          label:"10"
        },
        {
          value:20,
          label:"20"
        },
        {
          value:30,
          label:"30"
        }
      ],
      // 历史显示条数
      hoptions:[
        {
          value:10,
          label:"10"
        },
        {
          value:20,
          label:"20"
        },
        {
          value:30,
          label:"30"
        }
      ],
      // 实时表格
      tableData:[{
        'number':'1',
        'nationality':'1',
        'numb':'1',
        'name':'1',
        'gender':'1',
        'birthDate':'1',
        'fltno':'1',
        'endTime':'1',
        'timeConsuming':'1',
        'monitorTime':'1',
      }],
      // 历史表格
      htableData:[{
        'number':'1',
        'year':'1',
        'createtimeStr':'1',
        'tcount':'1',
        'consumetime':'1',
      }],
      cdt:{
        type:'5',
        begin:'',
        end:''
      },  //历史监控传参
      pd:{},// 实时空信息
      pdc:{},//实时表格传折线处信息
      lineX:[],
      lineY:[],
      barX:[],
      barY:[],
      realX:'',
      lineChart:null,
      barChart:null
    }
  },
  mounted() {
      let begin=new Date();
      let  end=new Date();
      let aaaa = new Date(begin.setMonth((new Date().getMonth()-1)));
      let bbbb = new Date();
      this.cdt.begin=formatDate(aaaa,'yyyyMMddhhmmss');
      this.cdt.end=formatDate(bbbb,'yyyyMMddhhmmss');
      this.checkRealTime();
      this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated() {
      // let begin=new Date();
      // let  end=new Date();
      // let aaaa = new Date(begin.setMonth((new Date().getMonth()-1)));
      // let bbbb = new Date();
      // this.cdt.begin=formatDate(aaaa,'yyyyMMddhhmmss');
      // this.cdt.end=formatDate(bbbb,'yyyyMMddhhmmss');
      this.checkRealTime();
      this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  beforeDestroy() {
    if (!this.lineChart) {
      return;
    }
    if(!this.barChart){
      return;
    }
    this.lineChart.dispose();
    this.barChart.dispose();
    this.lineChart = null;
    this.barChart = null;
  },
  filters: {
    discount: function(value) {
      if(value!=null){
        return value.substring(0,19) ;
      }
    }
  },
  methods:{
    handleSelectionChange(val) {
    },
    // 实时监控分页
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    // 历史监控分页
    hpageSizeChange(val) {
      this.hgetList(this.hCurrentPage,val,this.cdt);
      console.log(`每页 ${val} 条`);
    },

    hhandleCurrentChange(val) {
      this.hgetList(val,this.hpageSize,this.cdt);
      console.log(`当前页: ${val}`);
    },
    // 实时监控表格/分页
    getList(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "cdt":pd
      };
      this.$api.post('/manage-platform/conformity/queryListPageReal',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    //历史监控表格/分页
    hgetList(hcurrentPage,hshowCount,cdt){

      let p={
        "currentPage":hcurrentPage,
        "showCount":hshowCount,
        "cdt":cdt
      }
      this.$api.post('/manage-platform/conformity/queryMatchListPageHisOther',p,
       r => {
         console.log(r);
         this.htableData=r.data.pd.resultList;
         this.hTotalResult=r.data.totalResult;
      })
    },
    drawLine() {
           this.lineChart = echarts.init(document.getElementById('echarts'));
           window.onresize = echarts.init(document.getElementById('echarts')).resize;
           let that = this;
           // 折线图初始化
           this.lineChart.setOption({
             tooltip:{
               trigger:'axis',
               formatter:{
                 "报文数量":2300,
                 "平均性能":2000
               },
               axisPointer:{
                 type:'line',
                 lineStyle:{
                   color:'#169BD5',
                   width:3
                 }
               }
             },
             xAxis:[{
               type : 'category',
               boundaryGap : false,
               data:this.lineX,
               axisLine:{
                 lineStyle:{
                   color:'#169BD5',
                   width:3
                 }
               },
               axisLabel:{
                  textStyle: {
                      color: '#000'
                  }
                }

             }],
             yAxis:[{
               axisLine:{
                 lineStyle:{
                   color:'#169BD5',
                   width:3
                 }
               },
               axisLabel:{
                  textStyle: {
                      color: '#000'
                  }
                }
             }],
             legend: {
               selectedMode:false,//取消图例上的点击事件
               data: ['时效平均值']//要与series中的name一致
             },
             series:[{
               itemStyle: {
                   normal: {
                       color:'#D3C9E7',
                       areaStyle:'#D3C9E7',
                       lineStyle: {
                           color: '#D3C9E7'//控制折线颜色
                       }
                   }
               },
               name:'时效平均值',
               smooth:true,
               type:'line',
               coordinateSystem:'cartesian2d',
               symbol:'emptyCircle',
               symbolSize:10,
               data:this.lineY
             }]
           })
           // 点击折点渲染表格
           this.lineChart.on('click', function (params) {
             // 让表格出现
             that.pdc.realX = params.name
             that.controlChecked=1;
             that.coCheckId=2;
             // 表格数据渲染
             that.getList(that.CurrentPage,that.pageSize,that.pdc);
           });
         },

    drawBar(){
      this.barChart = echarts.init(document.getElementById('barEcharts'));
      window.onresize = echarts.init(document.getElementById('barEcharts')).resize;
      let that = this;
      //初始化柱状图
      this.barChart.setOption({
        tooltip:{
          trigger:'axis',
          formatter:function(params){
            for(var i=0;i<params.length;i++){
              return "报文数量:" + "2300"+"</br>"+"平均性能:" + params[i].data
            }
          },
          axisPointer:{
            type:'line',
            lineStyle:{
              color:'#169BD5',
              width:3
            }
          }
        },
        xAxis:[{
          type : 'category',
          data:this.barX,
          boundaryGap : true,
          axisLine:{
            lineStyle:{
              color:'#169BD5',
              width:3
            }
          },
          axisLabel:{
             textStyle: {
                 color: '#000'
             }
           }

        }],
        yAxis:[{
          axisLine:{
            lineStyle:{
              color:'#169BD5',
              width:3
            }
          },
          axisLabel:{
             textStyle: {
                 color: '#000'
             }
           }
        }],
        series:[{
          type:'bar',
          barWidth: '30',
          data:this.barY,
          itemStyle:{
              normal:{
                  color:'#D3C9E7'
              }
          },
        }]
      })
      //点击柱状图渲染表格
      // myBarChart.on('click',function(params){
      //   // 让表格出现
      //   that.controlChecked=2;
      //   that.coCheckId=2;
      //   // 表格数据渲染
      //   this.hgetList(this.hCurrentPage,this.hpageSize,this.cdt);
      // })
    },
    // 校验比对实时监控折线图
    checkRealTime(){
      let p={
        "currentPage":1,
	      "showCount":10,
        "cdt":this.pd //空数据
      }
      this.$api.post('/manage-platform/conformity/queryListPage',p,
      r =>{
        this.lineX = r.data.pd.X;
        this.lineY = r.data.pd.Y;
        this.drawLine()
      })
    },
    //校验比对历史监控柱状图
    checkHistoryTime(){
      let t={
        "currentPage":1,
        "showCount":10,
        "cdt":this.cdt
      }
      this.$api.post('/manage-platform/conformity/queryListPageHisMin',t,
      r =>{
        this.barX = r.data.pd.X;
        this.barY = r.data.pd.Y;
        this.drawBar();
      })
    },
    real(){//重新点回实时监控时
      this.controlChecked=1;
      if(this.coCheckId == 1){//如果当前显示图表
        this.checkRealTime();
      }else if(this.coCheckId == 2){//如果当前显示列表
        this.getList(this.CurrentPage,this.pageSize,this.pd);
      }
    },
    historyq(){//重新点回性能分析时
      this.controlChecked=2;
      if(this.coCheckId == 1){//如果当前显示图表
        this.checkHistoryTime();
      }else if(this.coCheckId == 2){//如果当前显示列表
        this.hgetList(this.hCurrentPage,this.hpageSize,this.cdt);
      }
    },
    judgeChart(){
      this.coCheckId=1;
      if(this.controlChecked == 1){//判断实时图
        this.checkRealTime();
        // this.getList(this.CurrentPage,this.pageSize,this.pd);
      }else if(this.controlChecked == 2){//判断历史表
        this.checkHistoryTime();
        // this.hgetList(this.hCurrentPage,this.hpageSize,this.cdt);
      }
    },
    judgeList(){
      this.coCheckId=2;
      if(this.controlChecked == 1){//判断实时图
        this.getList(this.CurrentPage,this.pageSize,this.pd);
      }else if(this.controlChecked == 2){//判断历史图
        this.hgetList(this.hCurrentPage,this.hpageSize,this.cdt);
      }
    },
    search(){
      if(this.coCheckId==1){
        this.checkHistoryTime();
      }else if(this.coCheckId==2){
        this.hgetList(this.hCurrentPage,this.hpageSize,this.cdt);
      }
    }
  },

}
</script>

<style scoped>
.control-item{
  width: 140px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  float: left;
  border:1px solid #169BD5;
  background-color: #fff;
  color: #399BFE;
}
.control-checked{
  background-color: #169BD5;
  color: #fff;
}
.calibrationPerformance{
  background-color: #fff;
}

.co-tabs {
  display: flex;

}

.co-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.co-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.co-tab-pane {
  border: 1px #399bfe solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}

</style>
<style media="screen">
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #409EFF!important;
  border-color: #409EFF!important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #409EFF!important;
}
</style>
