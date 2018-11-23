<template lang="html">
  <div class = "liangChart" style="position:relative;width:100%;overflow:hidden;">
    <div id="liangEcharts" style = "width:100%;height: 400px" ></div>
    <span>{{legendData[0]}}{{legend[0]}}</span>
    <el-button class="table-btn dz-btn" plain>定制</el-button>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  nane:"Vecharts",
  data(){
    return {
        legend: [],
        seriesv:[]
    }
  },
  watch: {
    legendData: function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.legend = newVal;  //newVal即是chartData
        this.drawLiang();
    },
    series:function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.seriesv = newVal;  //newVal即是chartData
        this.drawLiang();
    }
  },
  // props:['legendData','series'],
  props:{

    legendData:{
        type:Array,
        default:[]
    },
    series:{
      type:Array,
      default:[]
    }
  },

  mounted(){
    this.drawLiang();
  },
  methods:{
    drawLiang(){
      console.log(this.legend)
      let liangChart = echarts.init(document.getElementById('liangEcharts'));
      window.onresize = echarts.init(document.getElementById('liangEcharts')).resize;
      let _this=this
      console.log(_this.legend)

      liangChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:  _this.legend
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
        xAxis : [
            {
                type : 'category',
                data : ['Line','Bar','Scatter','K','Map']
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : ['Line','Bar','Scatter','K','Map']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{formatter:'{value} ms'}
            }
        ],
        series : _this.seriesv
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
