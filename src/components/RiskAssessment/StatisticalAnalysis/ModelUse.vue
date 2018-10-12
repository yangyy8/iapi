<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-10">

      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="pd.DATEOFBIRTHSTART"
                     type="date" size="small" value-format="yyyyMMdd"
                     placeholder="开始时间" align="right" >
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.DATEOFBIRTHEND"
                      type="date" size="small" align="right" value-format="yyyyMMdd"
                      placeholder="结束时间"  >
                  </el-date-picker>
              </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">中心/口岸：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable multiple placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">模型：</span>
              <el-input placeholder="请输入内容" size="small" multiple v-verify.input.blur="{regs:'required|max:35',submit:'demo'}" v-model="pd.CARDNO" clearable class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">类型：</span>
              <div class="input-input t-flex t-date">
                <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="tt-input">
                  <el-option
                    v-for="item in nationAlone"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
                <span class="septum" v-if="isActive">-</span>
                <el-select v-if="isActive" v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="tt-input">
                  <el-option
                    v-for="item in nationAlone"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item" style="position:relative">
              <span class="input-text">量选择：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.IN_OUT" multiple clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
              <span class="el-icon-info t-tip"></span>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item" style="position:relative">
              <span class="input-text">率选择：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.IN_OUT" multiple clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
              <span class="el-icon-info t-tip"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small"  class="mt-15" @click="CurrentPage=1">查询</el-button>
          <el-button type="primary" class="mt-15" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <div class="map-title">北京首都国际机场</div>
      <span class="tubiao hand borderL" :class="{'checked':page==0}" @click="page=0">量</span><span class="tubiao hand borderR" :class="{'checked':page==1}" @click="qq">率</span>
      <div class="" v-show="page==0">
        <div class = "liangChart" style="width:100%;overflow:hidden">
          <div id = "liangEcharts" style = "width:100%;height: 400px"></div>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          >
          <el-table-column
            :label="data" v-for="(data,key) in header">
            <template scope="scope">
                {{tableData[scope.$index][key]}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-show="page==1">
        <div class = "lvChart" style="width:100%;overflow:hidden">
          <div id = "lvEcharts" style = "width:100%;height: 400px"></div>
        </div>
        <el-table
          :data="LtableData"
          border
          style="width: 100%;"
          >
          <el-table-column
            :label="data" v-for="(data,key) in Lheader">
            <template scope="scope">
                {{LtableData[scope.$index][key]}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data(){
    return{
      header:["A","B","C"],
      tableData:[
        [1, 2, 3],
        [4,5,6]
      ],
      Lheader:["L","O","V","E"],
      LtableData:[
        ["a","b","c","4"],
        [4,5,6,7]
      ],
      isActive:true,
      page:0,
      airport:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{NAMELIKE:'0'},
      nationAlone:[],
      colorDialogVisible:false,
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
      liangChart:null,
      lvChart:null
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryNationalityAlone();
    this.queryAirport();
    this.drawLiang();
  },
  activated(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    qq(){
      this.page=1;
      this.drawLv();
    },
    colorSet(){
      this.colorDialogVisible = true;
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={NAMELIKE:'0'};
      // this.getList(this.CurrentPage,this.pageSize,this.pd);
    },
    getList(currentPage,showCount,pd){
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"pd":pd
      };
      console.log(pd)

        this.$api.post('/manage-platform/nameListFocusList/getNameListFocusListPage',p,
         r => {
           console.log(r);
           // this.tableData=r.data.resultList;
           this.TotalResult=r.data.totalResult;
        })

    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         console.log(r);
         if(r.success){
           this.airport=r.data;
           // this.$emit('transAirport',this.airportModel)
         }
      })
    },
    drawLiang(){
      this.liangChart = echarts.init(document.getElementById('liangEcharts'));
      window.onresize = echarts.init(document.getElementById('liangEcharts')).resize;
      let that = this;
      this.liangChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:[
                'ECharts1 - 2k数据','ECharts1 - 2w数据','ECharts1 - 20w数据','',
                'ECharts2 - 2k数据','ECharts2 - 2w数据','ECharts2 - 20w数据'
            ]
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
        series : [
            {
                name:'ECharts2 - 2k数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(193,35,43,1)', label:{show:true}}},
                data:[40,155,95,75, 0]
            },
            {
                name:'ECharts2 - 2w数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
                data:[100,200,105,100,156]
            },
            {
                name:'ECharts2 - 20w数据',
                type:'bar',
                itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
                data:[906,911,908,778,0]
            },
            {
                name:'ECharts1 - 2k数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(193,35,43,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
                data:[96,224,164,124,0]
            },
            {
                name:'ECharts1 - 2w数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
                data:[491,2035,389,955,347]
            },
            {
                name:'ECharts1 - 20w数据',
                type:'bar',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'+'):'';}}}},
                data:[3000,3000,2817,3000,0]
            }
        ]
      })
    },
    drawLv(){
      this.lvChart = echarts.init(document.getElementById('lvEcharts'));
      window.onresize = echarts.init(document.getElementById('lvEcharts')).resize;
      let that = this;
      this.lvChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:[
                'ECharts1 - 2k数据','ECharts1 - 2w数据','ECharts1 - 20w数据','',
                'ECharts2 - 2k数据','ECharts2 - 2w数据','ECharts2 - 20w数据'
            ]
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
        series : [
            {
                name:'ECharts2 - 2k数据',
                type:'line',
                itemStyle: {normal: {color:'rgba(193,35,43,1)', label:{show:true}}},
                data:[40,155,95,75, 0]
            },
            {
                name:'ECharts2 - 2w数据',
                type:'line',
                itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
                data:[100,200,105,100,156]
            },
            {
                name:'ECharts2 - 20w数据',
                type:'line',
                itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
                data:[906,911,908,778,0]
            },
            {
                name:'ECharts1 - 2k数据',
                type:'line',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(193,35,43,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
                data:[96,224,164,124,0]
            },
            {
                name:'ECharts1 - 2w数据',
                type:'line',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
                data:[491,2035,389,955,347]
            },
            {
                name:'ECharts1 - 20w数据',
                type:'line',
                xAxisIndex:1,
                itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'+'):'';}}}},
                data:[3000,3000,2817,3000,0]
            }
        ]
      })
    }
  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.line-h{
  line-height: 30px
}
.t-input-input{
  width: 60%!important;
}
.pd-6{
  padding-bottom: 6px!important
}
.bb{
  border-bottom: 1px solid #ccc;
}
.tt-input-text{
  width: 24%!important;
}
.wrapper{
  padding-left:3%;
}
.tt-input{
  width: 47%!important;
}
.mb-10{
  margin-bottom: 10px!important;
}
.map-title{
  color: #71CEB2;
  /* font-weight: bold; */
}
.checked{
  background:#56A8FE; color:#ffffff;
}
.tubiao{
  width:100px; padding:6px 15px;
  border:1px solid #56A8FE;
}
.borderL{
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.borderR{
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.t-tip{
  position:absolute;
  right: -18px;
  top: 7px;
}
</style>
