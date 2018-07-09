<template lang="html">
  <div class="calibrationPerformance">
    <div class="mb-2">
        <el-row type="flex" justify="center" class="middle">
          <el-col :span="6">
            <div>
              <div class="control-item hand" :class="{'control-checked':controlChecked==1}" @click="controlChecked=1">
                  实时监控
              </div>
              <div class="control-item hand" :class="{'control-checked':controlChecked==2}" @click="controlChecked=2">
                  性能分析
              </div>
              <div style='clear:both'></div>
            </div>
          </el-col>
        </el-row>
        <div class="middle">
          <div class="co-tab mb-20">
            <div class="co-tabs">
              <div class="co-tab-item hand" :class="{'co-checked':coCheckId==1}" @click="coCheckId=1">
                图形
              </div>
              <div class="co-tab-item hand" :class="{'co-checked':coCheckId==2}" @click="coCheckId=2">
                列表
              </div>
            </div>
            <div class="co-tab-pane" >
              <el-row type="flex" style="height:100%" v-show="(controlChecked==1) && (coCheckId==1)">
                <div class = "chart" style="width:100%">
                  <div id = "echarts" style = "width: 90%;height: 400px"></div>
                </div>
              </el-row>
              <div v-show="(controlChecked==1) && (coCheckId==2)">
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
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="nationality"
                      label="国籍">
                    </el-table-column>
                    <el-table-column
                      prop="numb"
                      label="证件号码"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="birthDate"
                      label="出生日期">
                    </el-table-column>
                    <el-table-column
                      prop="fltno"
                      label="航班号">
                    </el-table-column>
                    <el-table-column
                      prop="receiveTime"
                      label="报文接收时间">
                    </el-table-column>
                    <el-table-column
                      prop="endTime"
                      label="校验比对结束时间"
                      width='140'>
                    </el-table-column>
                    <el-table-column
                      prop="timeConsuming"
                      label="耗时">
                    </el-table-column>
                    <el-table-column
                      prop="monitorTime"
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
              <el-row type="flex" style="height:100%" v-show="(controlChecked==2) && (coCheckId==1)">
                <div class = "barChart" style="width:1500px">
                  <div id = "barEcharts" style = "width:1500px;height: 400px"></div>
                </div>
              </el-row>

              <div v-show="(controlChecked==2) && (coCheckId==2)">
                <el-row align="center" :gutter="2">
                  <el-col :sm="24" :md="12"  :lg="6" class="input-item">
                    <span class="input-text">分析日期：</span>
                    <el-date-picker
                      size="small"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      class="input-input block">
                    </el-date-picker>
                  </el-col>
                  <el-col :sm="24" :md="12"  :lg="6" class="input-item">
                    <span class="input-text">分析维度：</span>
                    <el-select  placeholder="请选择"  size="small"  class="input-input">
                      <el-option label="按日分析" value="1"></el-option>
                      <el-option label="按周分析" value="0"></el-option>
                      <el-option label="按月分析" value="0"></el-option>
                    </el-select>
                  </el-col>
                </el-row>

                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      prop="number"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="year"
                      label="年份">
                    </el-table-column>
                    <el-table-column
                      prop="statisticalDate"
                      label="统计日期"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="StatisticsNumber"
                      label="统计条数">
                    </el-table-column>
                    <el-table-column
                      prop="averageTime"
                      label="平均耗时">
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
            </div>

          </div>
        </div>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data(){
    return{
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{"LIST_TYPE":"1"},
      value:1,
      controlChecked:1,
      coCheckId:1,
      detailsDialogVisible:false,
      checked:true,
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
      }]
    }
  },
  mounted() {
      this.drawBar();
      this.drawLine();
      this.getList(this.CurrentPage,this.pageSize,this.pd);
  },

  methods:{
    handleSelectionChange(val) {
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };
      this.$api.post('/eamp/nameList/getNameListPage',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    drawLine() {
           let myChart = echarts.init(document.getElementById('echarts'));
           myChart.setOption({
             tooltip:{
               trigger:'axis',
               // formatter:'报文数量：2300',
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
               splitArea : {show : true},
               data:['08:00','08:10','08:20','08:30','08:40','08:50','09:00','09:10','09:20','09:30','09:40','09:50','10:00'],
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
               data:[1000,1500,1700,1900,2000,1750,1900,2100,2250,1900,2100,2700,2500]
             }]
           })

           //图标根据窗口大小自动缩放
           // window.addEventListener("resize", this.myChart.resize);
         },
    drawBar(){
      let myBarChart = echarts.init(document.getElementById('barEcharts'));
      let chartBox=document.getElementsByClassName('barChart')[0];
      function resizeCharts() {//为调整图标尺寸的方法
        myBarChart.style.width=chartBox.style.width+'px'
        myBarChart.style.height=chartBox.style.height+'px'
      }
      myBarChart.setOption({
        xAxis:[{
          type : 'category',
          // boundaryGap : false,
          // splitArea : {show : true},
          data:['20180601','20180603','20180605','20180607','20180609','20180611','20180613'],
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
          barWidth: '60%',
          data:[1000,1500,1700,1900,2000,1750,1900],
          itemStyle:{
              normal:{
                  color:'#D3C9E7'
              }
          },
        }]
      })

      // window.addEventListener("resize", this.myBarChart.resize);
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
</style>
