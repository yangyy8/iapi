<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green ">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input  placeholder="请输入" size="small" v-model="pd.familyname" class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">性别：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.genderEqual"  class="input-input">
                <el-option label="男" value="M"></el-option>
                <el-option label="女" value="F"></el-option>
                <el-option label="未知" value="U"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startDateofbirth"
               type="date" size="small"
               placeholder="开始时间" align="right" :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endDateofbirth"
                type="date" size="small" align="right"
                placeholder="结束时间"  :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">

                <QueryNationality  :nationality="pd.nationalityEqual" @transNation="getNation"></QueryNationality>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.passportnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期:</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startFlightDepartdate"
               type="date" size="small"
               placeholder="开始时间" align="right" :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endFlightDepartdate"
                type="date" size="small" align="right"
                placeholder="结束时间"  :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model='pd.flighttypeEqual' placeholder="请选择" size="small" class="input-input">
                <el-option value="" label="全部"></el-option>
                  <el-option value="I" label="入境"></el-option>
                    <el-option value="O" label="出境"></el-option>
                    <el-option value="G" label="过境"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">命中人员类别：</span>
              <el-select v-model='pd.eventtype' placeholder="请选择" size="small" class="input-input">
                <el-option value="" label="全部"></el-option>
                  <el-option value="0" label="黑名单"></el-option>
                    <el-option value="1" label="白名单"></el-option>
                    <el-option value="2" label="临控名单"></el-option>
                    <el-option value="3" label="重点关注人员"></el-option>
                    <el-option value="3" label="二次查控"></el-option>
              </el-select>
            </el-col>
          </el-row>

        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        fit
        style="width: 100%;"
      >
        <el-table-column
          prop="NAME"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="GENDERNAME"
          label="性别"

          >

        </el-table-column>
        <el-table-column
          prop="BIRTHDAY"
          label="出生日期"
          >
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍"
          >
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          >
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          >
        </el-table-column>
        <el-table-column
          prop="DEPARTDATESTRING"
          label="航班日期"
          >
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入标识">
        </el-table-column>
        <el-table-column
          prop="NSTRUCT_NEW"
          label="反馈结果">
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="最终命中人员类别" width="150">
        </el-table-column>

        <el-table-column
        fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="queryDialogVisible=true">详情</el-button>
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
import QueryNationality from '../../other/queryNationality'
export default {
  components: {
    QueryNationality
  },
  data(){
    return{
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      queryDialogVisible: false,
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
      tableData: [],
      multipleSelection: [],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      form: {},

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
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
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "saveflag":1,
        "instructNew":"1Z",
        "cdt": pd
      };
      this.$api.post('/eamp/event/queryEventHisListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },

  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
</style>
