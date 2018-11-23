<template lang="html">
  <div class = "liangChart" style="position:relative;width:100%;">
    <div id="liangEcharts" style = "width:100%;height: 400px" ></div>
    <el-button class="table-btn dz-btn" plain>定制</el-button>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  nane:"Vecharts",
  data(){
    return {
        chartdata: {},
    }
  },
  watch: {
    chartData: function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.chartdata = newVal;  //newVal即是chartData
        this.drawLiang();
    }
  },
  props:['chartData'],

  mounted(){
    // this.drawLiang();
  },
  methods:{
    drawLiang(){
      console.log(this.chartdata)
      let liangChart = echarts.init(document.getElementById('liangEcharts'));
      window.onresize = echarts.init(document.getElementById('liangEcharts')).resize;
      let _this=this
      let color=['rgba(110,180,252,1)', 'rgba(244,173,57,1)', 'rgba(52,182,180,1)']
      let arr=this.chartdata.series
      // this.chartdata.series
      // for(var i=0;i<arr.length;i++){
      //   if(arr[i].xAxisIndex==1){
      //     arr[i].itemStyle.color=
      //   }
      //
      // }

      liangChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: _this.chartdata.legendData
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        grid: {y: 70, y2:30, x2:20},
        color:color,
        xAxis : [
            {
                type : 'category',
                data : _this.chartdata.xAxisData
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : _this.chartdata.xAxisData
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : _this.chartdata.xAxisData
            }

        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{formatter:'{value}'}
            }
        ],
        series:_this.chartdata.series
        // series : [
        //     {
        //         name:'中国--使用量',
        //         type:'bar',
        //         xAxisIndex:1,
        //         // itemStyle: {normal: {color:'rgba(193,35,43,1)', label:{show:true}}},
        //         data:[10, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        //     },


        // ]
      })

    },
  }

}
</script>

<style scoped>
.t-tip{
  position:absolute;
  right: -18px;
  top: 7px;
  z-index: 999;
}
.dz-btn{
  position: absolute;
  right: 140px;
  top: 0px;
  width: 20px!important;
  height: 20px;
  line-height: 3px;
}
</style>
