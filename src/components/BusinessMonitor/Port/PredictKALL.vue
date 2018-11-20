<template lang="html">
  <div class="kall">
    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="br pr-20">
            <!-- <div class="title-green ">
              查询条件
            </div> -->
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航站：</span>
                <el-select placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option
                    v-for="item in airport"
                    :key="item.AIRPORT_CODE"
                    :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                    :value="item.AIRPORT_CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">预测间隔：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="1 - 1小时" value="1"></el-option>
                  <el-option label="2 - 2小时" value="2"></el-option>
                  <el-option label="3 - 3小时" value="3"></el-option>
                  <el-option label="4 - 4小时" value="4"></el-option>
                  <el-option label="5 - 5小时" value="5"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="" size="small" >查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle mb-2">
      <div id = "echarts" style = "width: 100%;height: 400px"></div>
    </div>
    <div class="middle">
      <div id = "echarts2" style = "width: 100%;height: 400px"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data(){
    return{
      tableData:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:null,
      airport:null,
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
      lineChart:null,
      lineChart2:null,
      lineData:{x:null,y:null},
      lineData2:{x:null,y:null},

    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
    this.drawLine();
    this.drawLine2();
  },
  methods:{
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    drawLine() {
       this.lineChart = echarts.init(document.getElementById('echarts'));
       window.onresize = echarts.init(document.getElementById('echarts')).resize;
       // 折线图初始化
       this.lineChart.setOption({
         title : {
              text: '航班流量预测图',
          },
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
           data:this.lineData.x,
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
           show:false,
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
           data:this.lineData.y
         }]
       })
     },
    drawLine2() {
      this.lineChart2 = echarts.init(document.getElementById('echarts2'));
      window.onresize = echarts.init(document.getElementById('echarts2')).resize;
      // 折线图初始化
      this.lineChart2.setOption({
        title : {
             text: '人员流量预测图',
         },
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
          data:this.lineData2.x,
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
          show:false,
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
          data:this.lineData2.y
        }]
      })
    },
  }
}
</script>

<style scoped>

</style>
