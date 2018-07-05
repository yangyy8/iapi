<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="20" class="br pr-20">
          <div class="title-green ">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input  placeholder="请输入" size="small" class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">性别：</span>
              <el-select  placeholder="请选择"  size="small"  class="input-input">
                <el-option label="男" value="M"></el-option>
                <el-option label="女" value="F"></el-option>
                <el-option label="未知" value="U"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                size="small"
                class="input-input">
              </el-date-picker>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">国籍：</span>
              <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                <el-option>
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">关联人员类别：</span>
              <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">同值机间隔时间:</span>
              <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="success" size="small" @click="queryDialogVisible=true">查询</el-button>

        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-radio-group size="mini" v-model="radio1">
        <el-radio-button label="列表"></el-radio-button>
        <el-radio-button label="图形"></el-radio-button>
    </el-radio-group>
        <!-- <el-button type="primary" size="small" @click="centerDialogVisible=true">列表</el-button>
        <el-button type="primary" size="small">图形</el-button> -->
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="name"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          >

        </el-table-column>
        <el-table-column
          prop="birthDate"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="FlightNo"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="flightDate"
          label="航班日期">
        </el-table-column>
      </el-table>
      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共10页
          </div>
          <div class="">
            每页
            <el-select v-model="value2" placeholder="10" size="mini" class="page-select">
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
            共18条
          </div>
        </div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="查询结果"
      :visible.sync="queryDialogVisible"
      width="1110px"
      >
      <div class="add-dialog">
        <el-table :data="gridData">
          <el-table-column property="name" label="姓名" width="150"></el-table-column>
          <el-table-column property="gender" label="性别" width="200"></el-table-column>
          <el-table-column property="birthDate" label="出生日期"></el-table-column>
          <el-table-column property="nationality" label="国籍" width="200"></el-table-column>
          <el-table-column property="idCard" label="身份证号"></el-table-column>
          <el-table-column property="" label="是否同值机" width="200"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queryDialogVisible = false" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data(){
    return{
      value:'',
      value1: '',
      value2:"",
      radio:"1",
      radio1:"；列表",
      queryDialogVisible:false,
      options:[
        {
          value:1,
          label:"ddd"
        }
      ],
      tableData: [
        {
          "eventserial": "ba754edc095a45b5b73",
          "lastmatchtype": "1",
          "flighttype": 1514563200000,
          "numb": 1546099200000,
          "name": "1",
          "nationality": 1,
          "fltno": "1",
          "createtime": "1",
          "saveflag": "1",
        }
      ],
      gridData:[{

      }],
      multipleSelection: []
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getList(){
      let p={
      	"currentPage":1,
      	"showCount":10,
      	"pd":{}
      };
      this.$api.post('/eamp/nameList/getNameListPage',p,
       r => {
         console.log(r);
         this.tableData=r.Data.ResultList
      })
    }
  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.timeIntervalBetween{
  margin-left: 20px;
}
/* .name{
  padding-left: 29px;
} */
</style>
