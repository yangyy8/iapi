<template lang="html">
  <div class="hbssjk">
    <div class="top mb-6">

      <el-row :gutter="2" class="pr-20">
        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航班号：</span>
          <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航站：</span>
          <el-select placeholder="请选择" filterable clearable size="small" class="input-input">
            <el-option
              v-for="item in airport"
              :key="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
              :value="item.AIRPORT_CODE">
            </el-option>
          </el-select>
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
          <span class="input-text">航班状态：</span>
          <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
            <el-option label="1 - 计划" value="1"></el-option>
            <el-option label="2 - 值机" value="2"></el-option>
            <el-option label="3 - 已起飞" value="3"></el-option>
            <el-option label="4 - 已到达" value="4"></el-option>
            <el-option label="5 - 已入境" value="5"></el-option>
          </el-select>
        </el-col>
        <el-col :sm="24" :md="12"  :lg="8" class="input-item">
          <span class="input-text">报警事件：</span>
          <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
            <el-option label="1 - 白名单" value="1"></el-option>
            <el-option label="2 - 黑名单" value="2"></el-option>
            <el-option label="3 - 临控名单" value="3"></el-option>
            <el-option label="4 - 重点关注人员名单" value="4"></el-option>
          </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
          <span class="input-text">航班日期：</span>
          <div class="input-input t-flex t-date">
            <el-date-picker
             type="datetime" size="small" format="yyyy-MM-dd HH:mm"
             value-format="yyyyMMddHHmm"
             placeholder="开始时间" >
            </el-date-picker>
            <span class="septum">-</span>
            <el-date-picker
              type="datetime" size="small" format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </el-col>

        <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item" style="justify-content: flex-end">
          <el-button type="success" class="mr-20" size="small" >查询</el-button>
          <el-button type="primary"  plain size="small" >重置</el-button>
        </el-col> -->

      </el-row>
    </div>
    <div class="middle t-table">
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15">刷新</el-button>
      <el-checkbox v-model="checked">自动刷新</el-checkbox>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="航班号"
          width="65">
        </el-table-column>
        <el-table-column
          label="出发站"
          width="80">
        </el-table-column>
        <el-table-column
          label="目的站"
          width="80">
        </el-table-column>
        <el-table-column
          label="出入标识"
          width="80">
        </el-table-column>
        <el-table-column
          label="航班日期"
          width="110">
        </el-table-column>
        <el-table-column
          label="航班状态"
          width="80">
        </el-table-column>
        <el-table-column
          label="名单报警"
          width="120">
        </el-table-column>
        <el-table-column
          label="值机时间"
          width="110">
        </el-table-column>
        <el-table-column
          label="计划起降时间"
          width="110">
        </el-table-column>
        <el-table-column
          label="实际起降时间"
          width="110">
        </el-table-column>
        <el-table-column
          label="值机人员详情">
          <el-table-column
            label="中国内地"
            width="80">
          </el-table-column>
          <el-table-column
            label="港澳台"
            width="68">
          </el-table-column>
          <el-table-column
            label="外国人"
            width="68">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="登机人员详情">
          <el-table-column
            label="允许登机">
          </el-table-column>
          <el-table-column
            label="实际登机">
          </el-table-column>
          <el-table-column
            label="非法载运">
          </el-table-column>
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
      tableData:null,
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
      checked:false
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

</style>
