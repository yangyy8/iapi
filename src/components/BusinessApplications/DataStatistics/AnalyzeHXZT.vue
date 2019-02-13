
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


          </el-row>

          <el-row align="center"   :gutter="2" class="yy-line">

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text"> <span class="spang">境内</span> 城市：</span>
                <el-select placeholder="请选择" v-model="pd.cityto" filterable clearable size="small"  class="input-input">
                  <el-option
                    v-for="(item,ind) in gnName"
                    :key="ind"
                    :value="item.citycode"
                    :label="item.citycode+' - '+item.cityname"
                  ></el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">机场：</span>
                <el-select placeholder="请选择" v-model="pd.portto" filterable clearable size="small"  class="input-input">
                  <el-option
              v-for="item in airportn"
              v-if="item.JCDM"
              :key="item.JCDM"
              :label="item.JCDM+' - '+item.KAMC"
              :value="item.JCDM">
            </el-option>
                </el-select>
            </el-col>
           <font class="yy-color">  （注：城市、机场二选一）</font>
         </el-row>

         <el-row align="center"   :gutter="2" class="yy-line">
                       <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                           <span class="input-text"><span class="spang">境外</span>  &emsp;洲：</span>
                           <el-select placeholder="请选择" v-model="pd.continentfrom" filterable clearable size="small"  class="input-input">
                             <el-option
                               v-for="(item,ind) in zhouName"
                               :key="ind"
                               :value="item.code"
                               :label="item.code+' - '+item.name"
                             ></el-option>
                           </el-select>
                       </el-col>
                       <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                           <span class="input-text">国家：</span>
                           <el-select placeholder="请选择" v-model="pd.countryfrom" filterable clearable size="small"  class="input-input">
                             <el-option
                               v-for="(item,ind)  in nation"
                               :key="ind"
                               :label="item.CODE+' - '+item.CNAME"
                               :value="item.CODE">
                             </el-option>
                           </el-select>
                       </el-col>
           <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
               <span class="input-text">城市：</span>
               <el-select placeholder="请选择" v-model="pd.cityfrom" filterable clearable size="small"  class="input-input">
                 <el-option
                   v-for="(item,ind) in gwName"
                   :key="ind"
                   :value="item.citycode"
                   :label="item.citycode+' - '+item.cityname"
                 ></el-option>
               </el-select>
           </el-col>
           <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
               <span class="input-text">机场：</span>
               <el-select placeholder="请选择" v-model="pd.portfrom" filterable clearable size="small"  class="input-input">
                 <el-option
                  v-for="item in airportw"
                  :key="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                  :value="item.AIRPORT_CODE">
                </el-option>
               </el-select>
           </el-col>
           <font class="yy-color">（注：洲、国家、城市、机场四选一）</font>
        </el-row>
          <el-row align="center"   :gutter="2" class="yy-line">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">行属性：</span>
              <el-select v-model="typerow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option label="洲" value="continent" >
                 </el-option>
                 <el-option label="国家" value="country" >
                 </el-option>
                 <el-option label="城市" value="city" >
                 </el-option>
                 <el-option label="口岸" value="port" >
                 </el-option>
               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">统计</el-button>
        </el-col>
      </el-row>
    </div>
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
          <div v-show="page==1">
            <el-row class="mb-15 yr">
              <el-button type="primary" size="small" @click="download()">Excel导出</el-button>
              </el-row>
            <el-table
                  :data="tableData"
                  :summary-method="getSummaries"
                  show-summary
                  border
                  max-height="600"
                  style="width: 100%;"
                  class="mt-10 o-table3"
                  @header-click="headerClick"
                  >
                  <el-table-column
                    prop="continent" sortable
                    label="洲" v-if='showz'>
                  </el-table-column>
                  <el-table-column
                    prop="country" sortable
                    label="国家" v-if='showg'>
                  </el-table-column>
                  <el-table-column
                    prop="city" sortable
                    label="城市" v-if='showc'>
                  </el-table-column>
                  <el-table-column
                    prop="port" sortable
                    label="口岸" v-if='showk'>
                  </el-table-column>
                  <el-table-column
                    prop="flt_count" sortable
                    label="预报航班数量">
                  </el-table-column>
                  <el-table-column
                    prop="boardingcount" sortable
                    label="载运人员总量">
                  </el-table-column>
                  <el-table-column
                    prop="fus_flt_count" sortable
                    label="重点航线航班数">
                  </el-table-column>
                  <el-table-column
                    prop="fus_boardingcount" sortable
                    label="重点航线载运人员量">
                  </el-table-column>
                  <el-table-column
                    prop="chk_1z" sortable
                    label="不准登机人员数量">
                  </el-table-column>
                      <el-table-column label="性别构成">
                        <el-table-column
                          prop="chk_gender_m" sortable
                          label="男">
                        </el-table-column>
                        <el-table-column
                          prop="chk_gender_f" sortable
                          label="女">
                        </el-table-column>
                   </el-table-column>
                   <el-table-column label="国家构成">
                     <el-table-column
                       prop="foreign" sortable
                       label="外国人">
                     </el-table-column>
                     <el-table-column
                       prop="inland" sortable
                       label="内地居民">
                     </el-table-column>
                     <el-table-column
                       prop="gat" sortable
                       label="港澳台">
                     </el-table-column>
                 </el-table-column>
                </el-table>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
      begintime:'',endtime:''
      },
      nation: [],
      company: [],
      airportn:[],
      airportw:[],
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
      page: 0,
      tableData: [],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
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
      zhouName: [],
      gwName: [],
      gnName: [],
      typerow: 'continent',
      sData1:[],
      sData2:[],
      sData3:[],
      showz:true,
      showg:true,
      showk:true,
      showc:true,
    }
  },
  mounted() {
    this.queryNationality();
    this.zhou();
    this.gw();
    this.gn();
    this.gwart();
    this.gnart();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  activated() {
    this.queryNationality();
    this.zhou();
    this.gw();
    this.gn();
    this.gwart();
    this.gnart();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  methods: {
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

        "begintime":pd.begintime,
        "endtime":pd.endtime,
        "continentfrom":pd.continentfrom,
        "countryfrom":pd.countryfrom,
        "cityfrom":pd.cityfrom,
        "cityto":pd.cityto,
        "portto":pd.portto,
        "portfrom":pd.portfrom,
      };

      var url = "/manage-platform/dataStatistics/get_fltline_bycontinent";
      this.showz=true;
      this.showg=false;
      this.showc=false;
      this.showk=false;
      if (this.typerow == "country") {

        url="/manage-platform/dataStatistics/get_fltline_bycountry";
        this.showz=false;
        this.showg=true;
        this.showc=false;
        this.showk=false;
      } else if (this.typerow == "city") {
        url="/manage-platform/dataStatistics/get_fltline_bycity";
        this.showz=false;
        this.showg=false;
        this.showc=true;
        this.showk=false;
      } else if (this.typerow == "port") {
        url="/manage-platform/dataStatistics/get_fltline_byport";
        this.showz=false;
        this.showg=false;
        this.showc=false;
        this.showk=true;
      }

      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data;

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
          this.sData1=[{value:sum1, name:'总数'},{value:sum01, name:'不准登机人数'}];
          this.sData2=[{value:sum2, name:'男'},{value:sum02, name:'女'}];
          this.sData3=[{value:sum3, name:'外国人'},{value:sum03, name:'内地居民'},{value:sum003, name:'港澳台'}];
          this.drawLine();this.drawLine2();this.drawLine3();
        })
    },

    download(){
    //  var url="http://192.168.99.213:8080/manage-platform/dataStatistics/export_fltline";
      var url= this.$api.rootUrl+"/manage-platform/dataStatistics/export_fltline";

      axios({
       method: 'post',
       url: url,
      // url:'http://192.168.99.206:8080/manage-platform/iapi/exportFileIo/0/600',
      // url: this.$api.rootUrl+"/manage-platform/iapi/exportFileIo/0/600",
       data: {
         "begintime":this.pd.begintime,
         "endtime":this.pd.endtime,
         "continentfrom":this.pd.continentfrom,
         "countryfrom":this.pd.countryfrom,
         "cityfrom":this.pd.cityfrom,
         "cityto":this.pd.cityto,
         "rowproperty":this.typerow,
         "portto":this.pd.portto,
         "portfrom":this.pd.portfrom,
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data) {
        if (!data) {
            return
        }

        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'hxzt'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
    },

    zhou() { //调用洲
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry', {},
        r => {
          if (r.success) {
            this.zhouName = r.data;
          };
        })
    },
    gw() { //国外
      this.$api.post('/manage-platform/dataStatistics/get_city_frn', {},
        r => {
          if (r.success) {
            this.gwName = r.data;
          };
        })
    },
    gn() { //国内
      this.$api.post('/manage-platform/dataStatistics/get_city', {},
        r => {
          if (r.success) {
            this.gnName = r.data;
          };
        })
    },
    gwart() { //国外机场
      this.$api.post('/manage-platform/codeTable/queryAirport', {},
        r => {
          if (r.success) {
            this.airportw = r.data;
          };
        })
    },
    gnart() { //国内机场
      this.$api.post('/manage-platform/codeTable/queryAirportMatch', {},
        r => {
          if (r.success) {
            this.airportn = r.data;
          };
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
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
          name: '总数、不准登机人数',
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
.spang{margin-right:30px; background:#EE8E48; padding:3px 8px; border:1px solid #cccccc; border-radius:5px;color:#ffffff }
</style>
<style>
.el-table th > .cell {
  padding-right: 15px!important;
}
</style>
