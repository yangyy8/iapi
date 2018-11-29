<template lang="html">
  <div class="bjqk">
    <div class="top mb-6">
      <el-row type="flex">
        <el-col :span="20" class="br pr-20">
          <el-row :gutter="2" class="pr-20">

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航站：</span>
              <el-select v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="item in airport"
                  v-if="item.JCDM"
                  :key="item.JCDM"
                  :label="item.JCDM+' - '+item.KAMC"
                  :value="item.JCDM">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                class="input-input"
                :editable="false"
                :clearable="false"
                v-model="pd.fltDate"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="选择时间"  >
              </el-date-picker>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
        </el-col>
      </el-row>


    </div>
    <div class="middle">
      <!-- <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15">刷新</el-button>-->
      <el-checkbox v-model="checked">自动刷新</el-checkbox>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="航站"
          sortable
          prop="portName">
          <template slot-scope="scope">
            <div class="tc-b hand" title="查看详情" @click="openKa(scope.row)">{{scope.row.portName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="出境">
          <el-table-column
            label="黑名单"
            sortable
            prop="outBlkList">
          </el-table-column>
          <el-table-column
            label="临控名单"
            sortable
            prop="outTctlList">
          </el-table-column>
          <el-table-column
            label="重点关注名单"
            sortable
            prop="outFocus">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="入境">
          <el-table-column
            label="黑名单"
            sortable
            prop="blkList">
          </el-table-column>
          <el-table-column
            label="临控名单"
            sortable
            prop="tctlList">
          </el-table-column>
          <el-table-column
            label="重点关注名单"
            sortable
            prop="focus">
          </el-table-column>
        </el-table-column>
        <el-table-column
          sortable
          label="合计">
          <template slot-scope="scope">
            <div>{{scope.row.outBlkList+scope.row.outTctlList+scope.row.outFocus+scope.row.blkList+scope.row.tctlList+scope.row.focus}}</div>
          </template>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="口岸柱状图" :visible.sync="kaDialogVisible" width="800px">
      <div slot="footer" class="dialog-">
        <div ref= "echart1" id="echart1" style = "width:760px;height: 400px"></div>
        <el-button type="warning" @click="kaDialogVisible=false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
import echarts from 'echarts'
export default {
  data(){
    return{
      tableData:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{fltDate:''},
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
      checked:true,
      timer:null,
      kaDialogVisible:false,
      barChart:null,
      barData:null,
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
    let end = new Date();
    this.pd.fltDate= formatDate(end, 'yyyyMMdd');
  },
  activated(){

    // this.pd.fltDate= '20181008';

    this.getList(this.CurrentPage,this.pageSize,this.pd);
    if(this.checked){
      let that=this;
      this.timer=setInterval(function(){
        that.getList(that.CurrentPage,that.pageSize,that.pd);
      },180000)
    }

  },
  deactivated(){
　　clearInterval(this.timer)
  },
  watch:{
    checked:function(val){
      console.log(val)
      if(val){
        let that=this;
        this.timer=setInterval(function(){
          that.getList(that.CurrentPage,that.pageSize,that.pd);
        },180000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  beforeDestroy() {
    if(!this.barChart){
      return;
    }
    this.barChart.dispose();
    this.barChart = null;
  },
  methods:{
    pageSizeChange(val) {
      this.pageSize=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      this.getList(this.CurrentPage,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    getList(CurrentPage,showCount,pd){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "totalResult": this.TotalResult,
        "pd": pd
      }
      this.$api.post('/manage-platform/alarmMonitor/queryAlarmInfoPage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
    openKa(data){
      this.kaDialogVisible=true;
      console.log(data)
      console.log(document.getElementById('echart1'),this.$refs.echart1)

      this.barData=[data.blkList,data.tctlList,data.focus,data.outBlkList,data.outTctlList,data.outFocus];

      this.drawBar(this.$refs.echart1);
    },

    drawBar(chart) {
       console.log(chart)
       this.barChart = echarts.init(chart);

       // window.onresize = echarts.init(chart).resize;
       // 折线图初始化
       this.barChart.setOption({
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
         // color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83'],
         xAxis:{
           type : 'category',
           data:["黑名单(入境)","临控名单(入境)","重点关注(入境)","黑名单(出境)","临控名单(出境)","重点关注(出境)"],
           boundaryGap : true,
           axisLine:{
             lineStyle:{
               color:'#169BD5',
               width:3
             }
           },
           axisLabel:{
            interval:0,
            textStyle: {
                color: '#000'
            }
          },

         },
         yAxis: {
           nameTextStyle:{
             color:'#000',
             fontSize:15
           },
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
            },
         },
         legend: {
           show:false,
         },
         series:[{
           type: 'bar',
           barWidth: '50',
           data:this.barData,
           itemStyle: {
            normal: {
                color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                    ];
                    return colorList[params.dataIndex]
                },
              }
            }
         }]
       })
     },
  }
}
</script>

<style scoped>

</style>
