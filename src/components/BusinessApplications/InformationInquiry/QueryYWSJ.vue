<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">业务事件类型：</span>
                <el-select v-model="pd.type" placeholder="请选择"  size="small" class="input-input">
                  <el-option value="" label="全部">
                  </el-option>
                  <el-option value="0" label="指令变更">
                  </el-option>
                  <el-option value="1" label="航班备降">
                  </el-option>
                  <el-option value="2" label="业务规则修改">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">创建日期：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.begin1"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.end1"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">姓名：</span>
                <el-input placeholder="请输入内容" v-model="pd.name" size="small" class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">性别：</span>
                <el-select v-model="pd.gender" placeholder="请选择"  size="small" class="input-input">
                  <el-option value="" label="全部">
                  </el-option>
                  <el-option value="U" label="未知">
                  </el-option>
                  <el-option value="M" label="男">
                  </el-option>
                  <el-option value="F" label="女">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.startDateofbirth"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.endDateofbirth"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <QueryNationality  :nationality="pd.nationality" @transNation="getNation"></QueryNationality>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">证件号码：</span>
                <el-input placeholder="请输入内容" v-model="pd.cardnum" size="small" class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flighttype" placeholder="请选择"  size="small" class="input-input">
                  <el-option value="" label="全部">
                  </el-option>
                  <el-option value="I" label="入境">
                  </el-option>
                  <el-option value="O" label="出境">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" v-model="pd.fltno" size="small" class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.begin2"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.end2"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">业务事件编号：</span>
                <el-input placeholder="请输入内容" size="small" v-model='pd.recordnum' class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">反馈状态：</span>
                <el-select v-model="pd.saveflag" placeholder="请选择"  size="small" class="input-input">
                  <el-option value="" label="全部">
                  </el-option>
                  <el-option value="0" label="未处理">
                  </el-option>
                  <el-option value="1" label="已处理">
                  </el-option>
                  <el-option value="2" label="处理中">
                  </el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="mb-15" size="small"  @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="type"
          label="业务事件类型">
        </el-table-column>
        <el-table-column
          prop="creationDate"
          label="创建日期">

        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="dateofbirth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="cardnum"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="flighttype"
          label="出入标识">
        </el-table-column>
        <el-table-column
          prop="fltno"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="flightDate"
          label="航班日期">
        </el-table-column>
        <el-table-column
          prop="cardnum"
          label="业务事件编号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="stateFeedback"
          label="反馈状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="600px"
      >
        <el-form :model="dform" ref="detailsForm">
      <el-row type="flex"  class="mb-15">
        <el-col :span="12">口岸：{{dform.port}}</el-col>
        <el-col :span="12">航班号：{{dform.fltno}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-15">
        <el-col :span="12">航班日期：{{dform.SCHEDULEDEPARTURETIME}}</el-col>
          <el-col :span="12">出入标识：{{dform.FLIGHTTYPE}}</el-col>


      </el-row>
      <el-row type="flex"  class="mb-15">

        <el-col :span="12">事件类型：{{dform.type}}</el-col>
        <el-col :span="12">处理结果：{{dform.lastcheckresult}}</el-col>
      </el-row>
      <el-row type="flex"  class="mb-15">
        <el-col :span="24">处理内容：{{dform.reason}}</el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>

      </div>
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
      pd: {type:"0"},
      dform:{},
      detailsDialogVisible:false,
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
      tableData:[],
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

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods:{
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
        "cdt": pd
      };
      this.$api.post('/eamp/event/queryInstructionChangePage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    details(i){
      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;

    },


  }
}
</script>

<style scoped>
  .ak-tab{

  }
  .ak-tabs{
    display: flex;

  }
  .ak-tab-item{
    background: #399bfe;
    color: #fff;
    font-size: 14px;
    margin-right: 6px;
    border-radius: 5px 5px 0 0;
    padding: 0 16px;
  }
  .ak-checked{
    background: #fff;
    color: #399bfe;
    border: 1px #399bfe solid;
    border-bottom: 1px #fff solid;
    margin-bottom: -1px;
  }
  .ak-tab-pane{
    border: 1px #399bfe solid;
    height: 148px;
    padding: 20px;
    border-radius: 0 5px 5px 5px;
  }
  .akcheck2top{
    background: #f6f7fb;
    /* height: 28px; */
    padding: 6px;
  }
  .middle-btn-g{
    display: flex;
    justify-content: center;
  }
  .middle-btn-g button{
    height: 32px;
    width:107px;
    border: none;
    border-radius: 5px;
    background: none;
    background: linear-gradient( 360deg, rgb(9,171,236) 0%, rgb(0,121,228) 100%);
    color:#fff;
  }
  .akUl{
    height: 103px;
    overflow-y: auto;
  }
  .akUl img{
    height: 15px;
    width: 21px;
    margin-right: 8px;
  }
  .ak-li{
    height: 58px;
    align-items: center;
    padding: 0 30px;

  }
.nameUi,.dataUi{
  float: left;
  margin-left: 20px;
}
.nameUi li,.dataUi li{
  padding: 5px 10px 10px 0px;
  font-weight: bold;
}
.dataUi{
  float: left;
}
.t-input-item{
  display: flex;
  justify-content: flex-start;
  line-height: 32px;
}
.flightDate{
  width:211px;
  height:32px
}

</style>
<style media="screen">
.t-input-item .flightDate input{
  width: 42%!important;
}

.el-table__body{
    table-layout:auto !important;
}

</style>
