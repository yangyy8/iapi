<template lang="html">
  <div class = "liangChart" style="width:100%;">
    <div :id="chartsId" style = "width:100%;height: 400px" ></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name:"Vecharts",
  data(){
    return {
        chartdata: this.chartDatas,
    }
  },
  watch: {
    chartDatas:function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.chartdata = newVal;  //newVal即是chartData
        this.drawLiang();
    }
  },
  props:{
    'chartDatas':{
      type:Object,
      default:{titleText:"kk"}
    },
    'chartsId':{
      type:Number,
      default:0
    }
  },
  mounted(){
    this.drawLiang();
  },
  methods:{
    drawLiang(){
      console.log(this.chartdata)
      let liangChart = echarts.init(document.getElementById(this.chartsId));
      window.onresize = echarts.init(document.getElementById(this.chartsId)).resize;
      let _this=this
      let color=['rgba(110,180,252,1)', 'rgba(244,173,57,1)', 'rgba(52,182,180,1)']
      let arr=this.chartdata.series

      liangChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            type:'scroll',
            width:480,
            pageButtonGap:40,
            data: _this.chartdata.legendData
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true},
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
            }
        },
        calculable : true,
        grid: {x:40,y: 70, y2:30, x2:20},
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
      })

    },
  }

}
</script>

<style scoped>

</style>
