<template lang="html">
  <div class="listAlarm">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary"  icon="el-icon-refresh" size="small" @click="refreshFn">刷新</el-button>
        </el-col>
        <el-col :span="12">
          <el-row align="center"  :gutter="2" type="flex" justify="space-between">
            <el-col  :sm="24" :md="12" :lg="10"  class="input-item">
              <span class="input-text">报警类型：</span>
              <el-select v-model="pd.lastmatchType" placeholder="请选择" filterable clearable size="small" class="input-input">
               <el-option
                 v-for="item in options1"
                 :key="item.value"
                 :label="item.value+' - '+item.label"
                 :value="item.value">
               </el-option>
             </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="10"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd,orders,direction)">查询</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <div class="middle" @mouseover="mouseHeader">
      <div class="title-green">
        甄别信息列表
      </div>
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        @header-click="headerClick"
        style="width: 100%;"
        class="o-table3">
        <el-table-column
          prop="eventSerial"
          label="事件编号"
          width="180"
          sortable="custom"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="alarmType"
          label="报警类别"
          width="160"
          :show-overflow-tooltip="true">

        </el-table-column>
        <el-table-column
          prop="name"
          label="人员姓名"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="INTG_CHNNAME"
          label="中文姓名"
          sortable="custom"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.intgchnname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nationality"
          width="110"
          label="国籍/地区"
          sortable="custom"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.nationality}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="passportno"
          label="证件号码"
          sortable="custom"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="flightType"
          label="出入标识"
          width="110"
          sortable="custom"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="fltno"
          width="90"
          label="航班号"
          sortable="custom"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="createtime"
          width="160"
          label="报警时间"
          sortable="custom"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          width="110"
          label="当前状态"
          prop="SAVEFLAG"
          sortable="custom"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未甄别</span>
            <span v-if="scope.row.status==1">已归档</span>
            <span v-if="scope.row.status==2">处理中</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="70">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" icon="el-icon-edit-outline" title="报警处理" name="mdbjcl_alarm_process" @click="$router.push({name:'alarmProcess',query:{eventserial:scope.row.eventSerial,AlarmType:scope.row.alarmTypeNum}})"></el-button>
            <!-- <el-button class="table-btn" icon="el-icon-edit" size="mini" plain @click="$router.push({name:'alarmProcess',query:{eventserial:scope.row.eventSerial,AlarmType:scope.row.alarmTypeNum}})">报警处理</el-button> -->
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
    <audio src="../../../assets/music.mp3" id="music"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      orders:[],
      direction:0,
      pd:{
        lastmatchType:"",
        flighttype:""

      },
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
      options1: [
        {
          value: "0",
          label: '白名单'
        },
        {
          value: "1",
          label: '临时禁止登机名单'
        },
        {
          value: "2",
          label: '黑名单 - 不准入境'
        },
        {
          value: "3",
          label: '黑名单 - 失效证件'
        },
        {
          value: "4",
          label: '黑名单 - 失效签证'
        }

      ],
      value: '',
      tableData: [],
      timer:null
    }

  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated(){
    var audio= document.getElementById('music');
    // var aa=audio.play();
    // console.log('audio',audio,aa);

    this.btnctlFn(this.$root.checkItem);
    // this.CurrentPage=1,
    // this.pageSize=10,
    // this.TotalResult=0,
    // this.pd={
    //   lastmatchType:"",
    //   flighttype:""
    // },
    this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    let _this=this;
    this.timer=setInterval(function(){
      _this.getList(_this.CurrentPage,_this.pageSize,_this.pd,_this.orders,_this.direction);
      if(_this.tableData.length!=0){
        // console.log('111111')
        setTimeout(function(){
          audio.play();
        },50000)
      }
    },5000)
  },
  deactivated(){
　　clearInterval(this.timer)
  },
  methods: {
    refreshFn(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={
        lastmatchType:"",
        flighttype:""

      },
      this.orders=[];
      this.direction=0;
      this.tableData=[];
      this.TotalResult=0;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    getList(CurrentPage,showCount,pd,orders,direction){
      let p={
        "currentPage":CurrentPage,
        "showCount":showCount,
        "pd":pd,
        "orders":orders,
        "direction":direction
      };

      this.$api.post('/manage-platform/alarmEvents/getEventsInfo',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
         this.$nextTick(()=>{
           this.btnctlFn(this.$root.checkItem);
         })
      })
    },
    pageSizeChange(val) {
      this.pageSize=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`当前页: ${val}`);
    },
    sortChange(data){
      console.log(data)
      this.orders=[data.prop];
      if(data.order=='descending'){
        this.direction=0
      }else{
        this.direction=1
      }
      console.log(this.orders,this.direction)
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
  },

}
</script>

<style scoped>

  .top-right{
    text-align: right;
    font-size: 14px;
  }
  .middle{
    border-top: 3px rgb(75, 195, 160) solid;
  }



</style>
