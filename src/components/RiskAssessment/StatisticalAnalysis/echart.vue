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

</style>
