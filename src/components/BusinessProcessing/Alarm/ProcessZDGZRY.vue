<template lang="html">
  <div class="listAlarm">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary"  icon="el-icon-refresh" size="small" @click="refreshFn">刷新</el-button>
        </el-col>
        <el-col :span="12" class="top-right">

         出入境类别:
         <el-select v-model="pd.flighttype" placeholder="请选择" clearable filterable size="small">
           <el-option label="I - 入境" value="I"></el-option>
           <el-option label="O - 出境" value="O"></el-option>

         </el-select>
        <el-button type="warning" icon="el-icon-zoom-in" size="small" @click="getList(currentPage,pageSize,pd)">筛选</el-button>
        </el-col>

      </el-row>

    </div>
    <div class="middle">
      <div class="title-green">
        甄别信息列表
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="eventSerial"
          label="事件编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="alarmType"
          label="报警类别"
          width="160">

        </el-table-column>
        <el-table-column
          prop="flightType"
          label="出入类别"
          width="130">
          <template slot-scope="scope">
            <span v-if="scope.row.flightType=='O'">出境</span>
            <span v-if="scope.row.flightType=='I'">入境</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="passportno"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="人员姓名">
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="fltno"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="报警时间">
        </el-table-column>
        <el-table-column
          label="当前状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未甄别</span>
            <span v-if="scope.row.status==1">已归档</span>
            <span v-if="scope.row.status==2">处理中</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="$router.push({name:'alarmProcess',query:{eventserial:scope.row.eventSerial,isZDGZ:1}})">报警处理</el-button>
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
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{
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
          label: '临控名单'
        },
        {
          value: "2",
          label: '不准入境黑名单'
        },
        {
          value: "3",
          label: '入境失效证件'
        },
        {
          value: "4",
          label: '失效签证'
        },
        {
          value: "5",
          label: '不准出境名单'
        },

      ],
      value: '',
      tableData: [
        {
          "eventserial": "ba754edc095a45b5b73",
    			"lastmatchType": "1",
    			"flighttype": 1514563200000,
    			"numb": 1546099200000,
    			"name": "1",
    			"nationality": 1,
    			"fltno": "1",
          "createtime": "1",
			    "saveflag": "1",
        }
      ]
    }

  },
  mounted(){
    this.getList(this.currentPage,this.pageSize,this.pd);
  },
  methods: {
    refreshFn(){
      this.currentPage=1;
      this.pageSize=10;
      this.pd={
        flighttype:""
      },
      this.getList(this.currentPage,this.pageSize,this.pd);
    },
    getList(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };

      this.$api.post('/manage-platform/pnrAlarmEvent/getPnrAlarmEventPassInfo',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    pageSizeChange(val) {
      this.getList(this.currentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
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
