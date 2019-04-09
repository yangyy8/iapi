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
        chartdatas: this.chartDatas,
        liangChart:null,
        zuobiao:true,
    }
  },
  watch: {
    // chartDatas:{
    //   handler:function(newVal,oldVal){
    //     console.log(newVal,oldVal)
    //     this.chartdatas = newVal;  //newVal即是chartData
    //     if (!this.liangChart) {
    //       return;
    //     }
    //     this.liangChart.dispose();
    //     this.liangChart = null;
    //     this.drawLiang();
    //   },
    //   deep:true
    // }
    chartDatas:function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.chartdatas = newVal;  //newVal即是chartData
        if(this.chartdatas.censusParamBean.queryType == 0||this.chartdatas.censusParamBean.queryType == 2){
          this.zuobiao = true;
        }else if(this.chartdatas.censusParamBean.queryType == 1){
          this.zuobiao = false;
        }
        if (!this.liangChart) {
          return;
        }
        this.liangChart.dispose();
        this.liangChart = null;

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
      // console.log(this.chartdatas);
      // console.log(this.chartsId);
      this.liangChart = echarts.init(document.getElementById(this.chartsId));
      window.onresize = echarts.init(document.getElementById(this.chartsId)).resize;
      // window.addEventListener("resize",function(){
      // 	 this.liangChart.resize();
      // });
      let _this=this
      let color=['rgba(110,180,252,0.7)', 'rgba(244,173,57,0.7)', 'rgba(52,182,180,0.7)']
      // let arr=_this.chartdatas.series

      _this.liangChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            type:'scroll',
            width:480,
            pageButtonGap:40,
            data: _this.chartdatas.legendData
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                saveAsImage : {show: true},
                // dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
            }
        },
        calculable : true,
        grid: {x:80,y: 70, y2:30, x2:20},
        color:color,
        xAxis : [
            {
                type : 'category',
                boundaryGap: this.zuobiao,
                data : _this.chartdatas.xAxisData
            },
            {
                type : 'category',
                boundaryGap: this.zuobiao,
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                axisPointer: {
                  type: 'none'
                },
                data : _this.chartdatas.xAxisData
            },
            {
                type : 'category',
                boundaryGap: this.zuobiao,
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                axisPointer: {
                  type: 'none'
                },
                data : _this.chartdatas.xAxisData
            },
            {
                type : 'category',
                boundaryGap: this.zuobiao,
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                axisPointer: {
                  type: 'none'
                },
                data : _this.chartdatas.xAxisData
            }

        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{formatter:'{value}'}
            }
        ],
        series:_this.chartdatas.series
      })
      this.liangChart.resize();
    },
  }

}
</script>

<style scoped>

</style>
