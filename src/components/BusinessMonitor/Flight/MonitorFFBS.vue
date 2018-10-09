<template lang="html">
  <div class="ffbs">
    <div class="mb-2">
      <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==1}" >
          航班关闭
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==2}">
          航班取消
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==3}">
          IAPI
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==4}">
          PNR
        </div>
      </div>
      <el-row type="flex" class="middle">
        <el-col :span="20" class="br pr-20">
          <!-- <div class="title-green ">
            查询条件
          </div> -->
          <el-row align="center" :gutter="2">

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                class="input-input"
                type="date" size="mini" value-format="yyyyMMdd"
                placeholder="选择时间"  >
              </el-date-picker>

            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">非法报送阈值：</span>
              <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>

            </el-col>

          </el-row>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="success" class="mt-26" size="small" >查询</el-button>
          <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="middle t-table mb-6">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="航班号">
        </el-table-column>
        <el-table-column
          label="出入标识">
        </el-table-column>
        <el-table-column
          label="计划起飞时间">
        </el-table-column>
        <el-table-column
          label="计划到达时间">
        </el-table-column>
        <el-table-column
          label="出发站">
        </el-table-column>
        <el-table-column
          label="目的站">
        </el-table-column>
        <el-table-column
          label="航空公司">
        </el-table-column>
        <el-table-column
          label="航班状态">
        </el-table-column>
        <el-table-column
          label="航班关闭报文异常">
        </el-table-column>
      </el-table>
    </div>
    <div class="down mb-2">
      <el-row :gutter="2" class="pr-20">
        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航班日期：</span>
          <el-date-picker
            class="input-input"
            type="date" size="mini" value-format="yyyyMMdd"
            placeholder="选择时间"  >
          </el-date-picker>

        </el-col>
        <el-col :sm="24" :md="12"  :lg="8" class="input-item">
          <span class="input-text">出入标识：</span>
          <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
            <el-option label="I - 入境" value="I"></el-option>
            <el-option label="O - 出境" value="O"></el-option>
            <el-option label="A - 入出境" value="A"></el-option>
          </el-select>
        </el-col>

      </el-row>
    </div>
    <div class="middle t-table">
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15">刷新</el-button>
      <el-checkbox v-model="checked">自动刷新</el-checkbox>
      <el-table
        ref="multipleTable"
        :data="tableData2"
        border
        style="width: 100%;">
        <el-table-column
          label="航班号">
        </el-table-column>
        <el-table-column
          label="出入标识">
        </el-table-column>
        <el-table-column
          label="计划起飞时间">
        </el-table-column>
        <el-table-column
          label="计划到达时间">
        </el-table-column>
        <el-table-column
          label="出发站">
        </el-table-column>
        <el-table-column
          label="目的站">
        </el-table-column>
        <el-table-column
          label="航空公司">
        </el-table-column>
        <el-table-column
          label="航班状态">
        </el-table-column>
        <el-table-column
          label="航班关闭报文次数">
        </el-table-column>
        <el-table-column
          label="航班取消报文次数">
        </el-table-column>
        <el-table-column
          label="IAPI报文次数">
        </el-table-column>
        <el-table-column
          label="PNR报文次数">
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
  data(){
    return{
      tabId:1,
      tableData:null,
      tableData2:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:null,
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
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
  },
  methods:{
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
  }
}
</script>

<style scoped>
.middle-tab {
  /* width: 252px; */
  display: flex;
}
.middle-tab-item {
  /* width: 33.3%; */
  box-sizing: border-box;

  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
  padding: 0 20px;
}
.middle-tab-content{
  background: #fff;
  padding: 15px;
}
</style>
