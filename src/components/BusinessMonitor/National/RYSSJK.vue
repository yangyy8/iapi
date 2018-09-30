<template lang="html">
  <div class="ryssjk">
    <div class="top mb-6">
      <el-row :gutter="2" class="pr-20">
        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航班号：</span>
          <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
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
    <div class="middle mb-6">
      <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==1}" >
          预检人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==2}">
          不准登机人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabId==3}">
          重点人员
        </div>
      </div>
      <div class="middle-tab-content">
        <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15">刷新</el-button>
        <el-checkbox v-model="checked">自动刷新</el-checkbox>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="姓名"
            width="110">
          </el-table-column>
          <el-table-column
            label="性别"
            width="80">
          </el-table-column>
          <el-table-column
            label="出生日期"
            width="80">
          </el-table-column>
          <el-table-column
            label="国籍"
            width="80">
          </el-table-column>
          <el-table-column
            label="出入境类别"
            width="110">
          </el-table-column>
          <el-table-column
            label="旅客类别"
            width="80">
          </el-table-column>
          <el-table-column
            label="值机状态"
            width="120">
          </el-table-column>
          <el-table-column
            label="值机时间"
            width="120">
          </el-table-column>
          <el-table-column
            label="证件种类"
            width="110">
          </el-table-column>
          <el-table-column
            label="证件号码"
            width="110">
          </el-table-column>
          <el-table-column
            label="签证类别">
          </el-table-column>
          <el-table-column
            label="航班号">
          </el-table-column>
          <el-table-column
            label="操作">
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
    <div class="down ry3">
      <div class="title-grey">
        人员监控列表
      </div>
      <el-table
        :data="tableData2"
        style="width: 391px"
        class="table2"
        border>
        <el-table-column
          label="姓名"
          width="110">
        </el-table-column>
        <el-table-column
          label="证件号码"
          width="120">
        </el-table-column>
        <el-table-column
          label="国籍"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain icon="el-icon-delete"></el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-button type="success" size="mini" class="addbtn">添加</el-button>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
      checked:false,
      tabId:1
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
.middle {
  background: none;
  padding: 0;
}
.middle-tab {
  /* width: 252px; */
  display: flex;
}
.middle-tab-item {
  /* width: 33.3%; */
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
.ry3{
  position: relative;
}
.addbtn{
  position: absolute;
  left:423px;
  top:63px
}
</style>
