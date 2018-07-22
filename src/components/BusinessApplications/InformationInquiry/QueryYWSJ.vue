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
                <span class="input-text">事件类型：</span>
                <el-select v-model="pd.type" placeholder="请选择"  size="small" class="input-input">
                  <el-option value="" label="全部">
                  </el-option>
                  <el-option value="0" label="指令变更">
                  </el-option>
                  <el-option value="1" label="航班备降">
                  </el-option>
                  <el-option value="2" label="业务规则修改">
                  </el-option>
                  <el-option value="4" label="报警事件"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">事件产生时间：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.startCreatetime"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.endCreatetime"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">处理人：</span>
                <el-input placeholder="请输入内容" v-model="pd.dealuser" size="small" class="input-input"></el-input>
              </el-col>


              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">处理时间：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.startDealtime"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.endDealtime"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
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
          prop="typeStr"
          label="事件类型">
        </el-table-column>
        <el-table-column
          prop="createtimeStr"
          label="事件产生时间">

        </el-table-column>
        <el-table-column
          prop="username"
          label="处理人">
        </el-table-column>
        <el-table-column
          prop="dealtimeStr"
          label="处理时间">
        </el-table-column>
        <el-table-column
          prop="content"
          label="事件描述">
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
      title="指令变更详情"
      :visible.sync="zlbgDialogVisible"
      >
        <el-form :model="zform" ref="zlbgForm">
          <el-row type="flex"  class="mb-6">
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.CNAME" class="yy-input-input" ></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">性别：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.GENDERNAME" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出生日期：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.BIRTHDAYSTR" class="yy-input-input"></el-input>
            </el-col>

          </el-row>
          <el-row type="flex"  class="mb-6">
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">国籍：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.NATIONALITYNAME" class="yy-input-input" ></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.PASSPORTNO" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出入标识：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.FLIGHTINOUT" class="yy-input-input"></el-input>
            </el-col>

          </el-row>
          <el-row type="flex"  class="mb-6">
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出生国：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.BIRTHCOUNTRYNAME" class="yy-input-input" ></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">居住国：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.RESIDENCENAME" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">护照有效期：</span>
              <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.PASSPORTEXPIREDATESTR" class="yy-input-input"></el-input>
            </el-col>
            </el-row>
            <el-row type="flex"  class="mb-6">
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">护照颁发国：</span>
                <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.PASSPORTISSUECOUNTRYNAME" class="yy-input-input" ></el-input>

              </el-col>
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">护照签发日期：</span>
                <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.PASSPORTISSUEDATESTR" class="yy-input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.FLTNO" class="yy-input-input"></el-input>
              </el-col>
              </el-row>
              <el-row type="flex"  class="mb-6">
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">航班日期：</span>
                  <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.FLIGHTDATESTR" class="yy-input-input" ></el-input>

                </el-col>
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">起飞机场：</span>
                  <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.CITYFROMNAME" class="yy-input-input"></el-input>
                </el-col>
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">预计起飞时间：</span>
                  <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.DEPARTDATESTR" class="yy-input-input"></el-input>
                </el-col>
                </el-row>
                <el-row type="flex"  class="mb-6">
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">到达机场：</span>
                    <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.CITYTONAME" class="yy-input-input" ></el-input>

                  </el-col>
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">预计降落时间：</span>
                    <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.ARRIVDATESTR" class="yy-input-input"></el-input>
                  </el-col>
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">原预检结果：</span>
                    <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.INSTRUCT_OLD" class="yy-input-input"></el-input>
                  </el-col>
                  </el-row>
                  <el-row type="flex"  class="mb-6">
                    <el-col :span="8" class="input-item">
                      <span class="yy-input-text">最终预检结果：</span>
                      <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.INSTRUCT_NEW" class="yy-input-input" ></el-input>

                    </el-col>
                    <el-col :span="8" class="input-item">
                      <span class="yy-input-text">变更原因：</span>
                      <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.CHANGE_RESON" class="yy-input-input"></el-input>
                    </el-col>

                    </el-row>
                    <el-row type="flex"  class="mb-6">
                      <el-col :span="8" class="input-item">
                        <span class="yy-input-text">审批时间：</span>
                        <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.APPROVALTIME" class="yy-input-input" ></el-input>

                      </el-col>
                      <el-col :span="8" class="input-item">
                        <span class="yy-input-text">审批人名字：</span>
                        <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="zform.USERNAME" class="yy-input-input"></el-input>
                      </el-col>

                      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="zlbgDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>

    <el-dialog title="航班备降详情" :visible.sync="hbbjDialogVisible">
      <el-form :model="hform" ref="hbbjForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="hform.fltno" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">所属航空公司：</span>
            <el-input placeholder="请输入内容" size="small"  :disabled="true" v-model="hform.applicationSender" class="yy-input-input"></el-input>
          </el-col>


        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">航班日期：</span>
            <el-input placeholder="请输入内容" size="small"   :disabled="true" v-model="hform.flightTime" class="yy-input-input"></el-input>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">实际出发口岸：</span>
            <el-input placeholder="请输入内容" size="small" v-model="hform.stationfrom+' - '+hform.stationfromName" :disabled="true" class="yy-input-input"></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">原计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="hform.stationto+' - '+hform.stationtoName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text" style="width:15%">现计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="hform.stationto+' - '+hform.stationtoName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:15%">事件描述：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="hform.desc" style="width:80%;" :disabled="true" ></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="hbbjDialogVisible = false" size="small">取 消</el-button>

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
      pd: {},
      dform:{},
      hform:{},
      zform:{},
      detailsDialogVisible:false,
      hbbjDialogVisible:false,
      zlbgDialogVisible:false,
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
      this.$api.post('/eamp/eventManagement/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    details(i){
     console.log("----"+i.refserial);
    if(i.type=="1"){
      this.hbbjDialogVisible=true;

      this.$api.post('/eamp/eventManagement/queryFlightInfo', {"refserial":i.refserial},
        r => {
          this.hform = r.data;
        });
    }else if(i.type=="0"){
      this.zlbgDialogVisible=true;
      this.$api.post('/eamp/eventManagement/queryIapiChangeInfo', {"refserial":i.refserial},
        r => {
          this.zform = r.data;
        });
    }

    else{

      this.detailsDialogVisible = true;

      this.dform = i;
    }

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
