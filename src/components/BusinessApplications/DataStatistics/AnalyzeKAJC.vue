
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><font class="yy-color">*</font>  时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begintime" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">机场：</span>
                <el-select v-model="pd.port" filterable clearable placeholder="请选择"  size="small" class="input-input">

                  <el-option
              v-for="item in nation"
              v-if="item.JCDM"
              :key="item.JCDM"
              :label="item.JCDM+' - '+item.KAMC"
              :value="item.JCDM">
            </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flighttype"  filterable clearable  class="input-input"  placeholder="请选择"  size="small">
                  <el-option value="I" label="I - 入境">
                  </el-option>
                  <el-option value="O" label="O - 出境">
                  </el-option>
                  <!-- <el-option value="A" label="A - 入出境">
                  </el-option> -->
                </el-select>
              </el-col>
            <!-- <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">机场：</span>
                <el-select v-model="pd.NATIONS" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col> -->

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">统计</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="mb-2">

            <el-row type="flex" class="middle">
                <el-col :span="22" class="pr-20">

                <el-row align="center"   :gutter="2">

                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="input-text">行属性：</span>
                    <el-select v-model="pd.airrow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                       <el-option text="口岸" value="口岸" >
                       </el-option>
                       <el-option text="机场" value="机场" >
                       </el-option>
                     </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="input-text">列属性：</span>
                    <el-select v-model="pd.aircol" filterable clearable  placeholder="请选择" size="small" class="input-input">
                       <el-option text="航线数量" value="航线数量" >
                       </el-option>
                       <el-option text="载运人员数量" value="载运人员数量" >
                       </el-option>
                     </el-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2" class="down-btn-area">
              </el-col>
            </el-row>
    </div> -->
    <div class="middle">

      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          图表
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
          报表
        </div>
      </div>

      <div class="ak-tab-pane" >
          <div v-show="page==0" >
          <div id="myChart" class="ppie">暂无数据</div>
          <div id="myChart2" class="ppie"></div>
          <div id="myChart3" class="ppie"></div>
          <div style="clear:both"></div>
          </div>
          <div v-show="page==1" @mouseover="mouseHeader">
            <el-row class="mb-15 yr">
              <el-button type="primary" size="small" @click="download()">Excel导出</el-button>
              </el-row>
            <el-table
              :data="tableData"
              border
              show-summary
              max-height="600"
              style="width: 100%;"
              class="mt-10 o-table3"
              @header-click="headerClick"
              >
              <!-- <el-table-column
                prop=""
                label="" width="60">
              </el-table-column> -->
            <el-table-column
              prop="kamc" sortable
              label="口岸/机场" width="150">
            </el-table-column>
            <el-table-column
              prop="linecount"
              label="航线数量" sortable
              >
            </el-table-column>
            <el-table-column
              prop="fltcount" sortable
              label="预报航班数量"
              >
            </el-table-column>
            <el-table-column
              prop="boardingcount" sortable
              label="出入境人员数量"
              >
            </el-table-column>
            <el-table-column
              prop="chk_1z" sortable
              label="不准登机人员数"
              >
            </el-table-column>
                <el-table-column label="性别构成">
            <el-table-column
              prop="chk_gender_m" sortable
              label="男" width="100"
              >
            </el-table-column>
            <el-table-column
              prop="chk_gender_f" sortable
              label="女" width="100"
              >
            </el-table-column>
              </el-table-column>
              <el-table-column label="国家构成">
          <el-table-column
            prop="foreign"
            label="外国人" sortable
            >
          </el-table-column>
          <el-table-column
            prop="inland"
            label="内地居民" sortable
            >
          </el-table-column>
          <el-table-column
            prop="gat"
            label="港澳台" sortable
            >
          </el-table-column>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="50">
              <template slot-scope="scope">
                <el-button type="text"  class="a-btn" title="详情" size="mini" icon="el-icon-tickets" @click="nationDetails(scope.row)"></el-button>
             </template>
            </el-table-column>
          </el-table>
          </div>
        </div>
    </div>
  </div>
  <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="600px">
    <el-button  plain class="table-btn mb-9" size="small" @click="daochu">导出</el-button>
    <el-table
      :data="detailstableData"
      border
      class="o-table3"
      @header-click="headerClick"
      style="width: 100%;">
      <el-table-column
        prop="country"
        label="国籍/地区"
        sortable>
      </el-table-column>
      <el-table-column
        prop="chkcount"
        label="值机数"
        sortable>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailsDialogVisible = false" size="small">返 回</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
import $ from 'jquery'
export default {
  data() {
    return {
      myidChange:'',
      detailstableData:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
      begintime:'',endtime:''
      },
      nation: [],
      company: [],
      addDialogVisible: false,
      detailsDialogVisible: false,
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],
      page: 1,
      tableData: [],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()-1), 'yyyyMMddhhmmss');
            return startT > this.pd.endtime;
          } else if (this.pd.endtime == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begintime;
        }
      },
      form: {},
      lineChart: null,
      sData1:[],
      sData2:[],
      sData3:[]

    }
  },
  mounted() {

    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    time.setDate(1);
    this.pd.begintime= formatDate(time, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  created(){
    let that = this;
    window.sumDetails= that.sumDetails
  },
  activated() {

      this.queryNationality();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  methods: {
    nationDetails(i){
      this.detailsDialogVisible=true;
      this.myidChange=i.myid;
      let p={
        "begintime":this.pd.begintime,
        "endtime":this.pd.endtime,
        "flighttype":this.pd.flighttype,
        "port":i.myid
      }
      this.$api.post('/manage-platform/dataStatistics/get_country_detail',p,
       r =>{
         if(r.success){
           this.detailstableData=r.data
         }
       })
    },
    sumDetails(){
      this.detailsDialogVisible = true;
      this.$api.post('/manage-platform/dataStatistics/get_country_detail',this.pd,
       r =>{
         if(r.success){
           this.detailstableData=r.data;
         }
       })
    },
    daochu(){
      let p={
        "begintime":this.pd.begintime,
        "endtime":this.pd.endtime,
        "flighttype":this.pd.flighttype,
        "port":this.myidChange
      }
      this.$api.post('/manage-platform/dataStatistics/exp_country_detail',p,
       r =>{
          this.downloadM(r,1);
       },e=>{},'','blob')
    },
    headerClick(column,event){
    event.target.title=column.label
  },
    base() {
      this.page = 0;
    },
    batch() {
      this.page = 1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {

            if (this.pd.begintime== null|| this.pd.endtime == null) {
              this.$alert('时间范围不能为空', '提示', {
                confirmButtonText: '确定',
              });
              return false
            };

      let p = {
        "port":pd.port,
        "begintime":pd.begintime,
        "endtime":pd.endtime,
        "flighttype":pd.flighttype
      };

      this.$api.post("/manage-platform/dataStatistics/get_port", p,
        r => {
          console.log(r);
          this.tableData = r.data;
          $('.el-table__footer .has-gutter').find("td").last().children('.cell').append('<button type="text"  class="el-button a-btn el-button--text el-button--mini" title="详情" size="mini" onclick="sumDetails()"><i class="el-icon-tickets"></i></button>')
          let arr=this.tableData;
          var sum1=0,sum01=0;
          var sum2=0,sum02=0;
          var sum3=0,sum03=0,sum003=0;
          for(var i=0;i<arr.length;i++){
            sum1+=parseInt(arr[i].boardingcount);
            sum01+=parseInt(arr[i].chk_1z);
            sum2+=parseInt(arr[i].chk_gender_m);
            sum02+=parseInt(arr[i].chk_gender_f);
            sum3+=parseInt(arr[i].foreign);
            sum03+=parseInt(arr[i].inland);
            sum003+=parseInt(arr[i].gat);
          }
          this.sData1=[{value:sum1, name:'出入境人数'},{value:sum01, name:'不准登机人数'}];
          this.sData2=[{value:sum2, name:'男'},{value:sum02, name:'女'}];
          this.sData3=[{value:sum3, name:'外国人'},{value:sum03, name:'内地居民'},{value:sum003, name:'港澳台'}];
          this.drawLine();this.drawLine2();this.drawLine3();


        })
    },
    download(){
      //var url="http://192.168.99.213:8080/manage-platform/dataStatistics/export_port";
      var url= this.$api.rootUrl+"/manage-platform/dataStatistics/export_port";
      axios({
       method: 'post',
       url: url,
      // url:'http://192.168.99.206:8080/manage-platform/iapi/exportFileIo/0/600',
      // url: this.$api.rootUrl+"/manage-platform/iapi/exportFileIo/0/600",
       data: {
         "begintime":this.pd.begintime,
         "endtime":this.pd.endtime,
         "port":this.pd.port,
         "flighttype":this.pd.flighttype
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data,type) {
        if (!data) {
            return
        }

        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        if(type==1){
          link.setAttribute('download', '航空专题分析，国籍地区分布.xlsx')
        }else{
          link.setAttribute('download', 'kajc'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
        }

        document.body.appendChild(link)
        link.click()
    },
    queryNationality() {   //口岸
      this.$api.post('/manage-platform/codeTable/queryAirportMatch', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form = i;
    },
    drawLine() {
      this.lineChart = echarts.init(document.getElementById('myChart'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart')).resize;
      let that = this;
      this.lineChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          name: '出入境人数、不准登机人数',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '50%'], //调整位置
          data: this.sData1,
        }]
      });
    },
      drawLine2() {
        this.lineChart = echarts.init(document.getElementById('myChart2'), 'light');
        window.onresize = echarts.init(document.getElementById('myChart2')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [{
            name: '性别构成',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '50%'], //调整位置
            data: this.sData2,

          }]
        });
      },
        drawLine3() {

          this.lineChart = echarts.init(document.getElementById('myChart3'), 'light');
          window.onresize = echarts.init(document.getElementById('myChart3')).resize;
          let that = this;

          this.lineChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [{
              name: '国家构成',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '50%'], //调整位置
              data: this.sData3,

            }]
          });
}
      }
    }
</script>

<style scoped>
.ak-tab {}

.ak-tabs {
  display: flex;

}

.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.ak-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.ak-tab-pane {
  border: 1px #399bfe solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}
.ppie{width:420px; height:400px; float:left}
</style>
<style>
.el-table th > .cell {
  padding-right: 15px!important;
}
</style>
