<template lang="html">
  <div class="middle">
    <div class="" v-for="(i,ind) in dataArr" :key="ind">
      <div class="map-title">{{i.titleText}}</div>
      <div style="position:relative">
        <el-button class="table-btn dz-btn" plain @click="cancel(i.censusParamBean.version)">取消定制</el-button>
        <Vecharts :chartDatas="i" v-if="i.titleText"></Vecharts>
        <el-table
          :data="i.tableData"
          border
          style="width: 100%;">
          <el-table-column
            :label="data" v-for="(data,key) in i.header" :key="key">
            <template slot-scope="scope">
                {{i.tableData[scope.$index][key]}}
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>

  </div>
</template>

<script>
import Vecharts from './echart'
// import echarts from 'echarts'
export default {
  components:{
    Vecharts
  },
  data(){
    return{
      // header:["A","B","C"],
      // tableData:[
      //   [1, 2, 3],
      //   [4,5,6]
      // ],
      liangChart:null,
      // legendData:[],
      // series:[],
      text:'',
      dataArr:[],
    }
  },
  mounted() {
    this.getStart();
  },
  // activated() {
  //   this.getStart();
  // },
  // getList(p){
  //   alert(1);
  //   this.$api.post('/manage-platform/census/queryCensusByQueryType',p,
  //    r =>{
  //
  //    })
  // },
  methods:{
    getStart(){
      this.$api.post('/manage-platform/census/customIndex',{},
       r =>{
         if(r.success){
           this.dataArr = [];
           for(var i=0;i<r.data.length;i++){
             this.$api.post('/manage-platform/census/queryCensusByQueryType',r.data[i],
              p =>{
                if(p.success){
                  this.dataArr.push(p.data)
                }
              })
           }
           console.log(this.dataArr)
         }
       })
    },
    cancel(item){
      let p={
        'version':item
      }
      this.$api.post('/manage-platform/census/deleteCustom',p,
       r =>{
         this.$message({
           message: '删除成功！',
           type: 'success'
         });
       })
    }
    // drawLiang(){
    //   this.liangChart = echarts.init(document.getElementById('liangEcharts'));
    //   window.onresize = echarts.init(document.getElementById('liangEcharts')).resize;
    //   let that = this;
    //   this.liangChart.setOption({
    //     tooltip : {
    //         trigger: 'axis'
    //     },
    //     legend: {
    //         data:[
    //             'ECharts1 - 2k数据','ECharts1 - 2w数据','ECharts1 - 20w数据','',
    //             'ECharts2 - 2k数据','ECharts2 - 2w数据','ECharts2 - 20w数据'
    //         ]
    //     },
    //     toolbox: {
    //         show : true,
    //         feature : {
    //             mark : {show: true},
    //             dataView : {show: true, readOnly: false},
    //             magicType : {show: true, type: ['line', 'bar']},
    //             restore : {show: true},
    //             saveAsImage : {show: true}
    //         }
    //     },
    //     calculable : true,
    //     grid: {y: 70, y2:30, x2:20},
    //     xAxis : [
    //         {
    //             type : 'category',
    //             data : ['Line','Bar','Scatter','K','Map']
    //         },
    //         {
    //             type : 'category',
    //             axisLine: {show:false},
    //             axisTick: {show:false},
    //             axisLabel: {show:false},
    //             splitArea: {show:false},
    //             splitLine: {show:false},
    //             data : ['Line','Bar','Scatter','K','Map']
    //         }
    //     ],
    //     yAxis : [
    //         {
    //             type : 'value',
    //             axisLabel:{formatter:'{value} ms'}
    //         }
    //     ],
    //     series : [
    //         {
    //             name:'ECharts2 - 2k数据',
    //             type:'bar',
    //             itemStyle: {normal: {color:'rgba(193,35,43,1)', label:{show:true}}},
    //             data:[40,155,95,75, 0]
    //         },
    //         {
    //             name:'ECharts2 - 2w数据',
    //             type:'bar',
    //             itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
    //             data:[100,200,105,100,156]
    //         },
    //         {
    //             name:'ECharts2 - 20w数据',
    //             type:'bar',
    //             itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
    //             data:[906,911,908,778,0]
    //         },
    //         {
    //             name:'ECharts1 - 2k数据',
    //             type:'bar',
    //             xAxisIndex:1,
    //             itemStyle: {normal: {color:'rgba(193,35,43,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
    //             data:[96,224,164,124,0]
    //         },
    //         {
    //             name:'ECharts1 - 2w数据',
    //             type:'bar',
    //             xAxisIndex:1,
    //             itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
    //             data:[491,2035,389,955,347]
    //         },
    //         {
    //             name:'ECharts1 - 20w数据',
    //             type:'bar',
    //             xAxisIndex:1,
    //             itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'+'):'';}}}},
    //             data:[3000,3000,2817,3000,0]
    //         }
    //     ]
    //   })
    // },
  }
}
</script>

<style scoped>
.map-title{
  color: #71CEB2;
  /* font-weight: bold; */
}
.dz-btn{
  position: absolute;
  right: 140px;
  top: 0px;
  height: 20px;
  line-height: 3px;
}
</style>
