<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">事件类型：</span>
                <el-select v-model="pd.type" placeholder="请选择"  filterable clearable  size="small" class="input-input">

                  <el-option value="0" label="0 - 指令变更">
                  </el-option>
                  <el-option value="1" label="1 - 航班备降">
                  </el-option>
                  <el-option value="2" label="2 - 业务规则修改">
                  </el-option>
                  <el-option value="4" label="4 - 报警事件"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">事件产生时间：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.startCreatetime"
                 type="datetime" size="small" value-format="yyyyMMddHHmmss"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.endCreatetime"
                  type="datetime" size="small" align="right" value-format="yyyyMMddHHmmss"
                  placeholder="结束时间"  :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">处理人：</span>
                <el-select v-model="pd.name" placeholder="请选择"  filterable clearable  size="small" class="input-input" @visible-change="handler">
                  <el-option v-for="(item,key) in dealer" :value="key" :label="item" :key="key"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">处理时间：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.startDealtime"
                 type="datetime" size="small" value-format="yyyyMMddHHmmss"
                 placeholder="开始时间" align="right" :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.endDealtime"
                  type="datetime" size="small" align="right" value-format="yyyyMMddHHmmss"
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
          sortable
          label="事件类型">
        </el-table-column>
        <el-table-column
          prop="createtimeStr"
          label="事件产生时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="处理人"
          sortable>
        </el-table-column>
        <el-table-column
          prop="dealtimeStr"
          label="处理时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="content"
          label="事件描述"
          sortable>
        </el-table-column>

        <el-table-column
          width="180"
          label="操作"
          sortable>
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
              <el-input size="small"  :disabled="true" v-model="zform.CNAME" class="yy-input-input"></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">性别：</span>
              <el-input size="small"  :disabled="true" v-model="zform.GENDERNAME" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出生日期：</span>
              <el-input size="small"  :disabled="true" v-model="zform.BIRTHDAYSTR" class="yy-input-input"></el-input>
            </el-col>

          </el-row>
          <el-row type="flex"  class="mb-6">
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">国籍：</span>
              <el-input size="small"  :disabled="true" v-model="zform.NATIONALITYNAME" class="yy-input-input" ></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">证件号码：</span>
              <el-input size="small"  :disabled="true" v-model="zform.PASSPORTNO" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出入标识：</span>
              <el-input size="small"  :disabled="true" v-model="zform.FLIGHTINOUT" class="yy-input-input"></el-input>
            </el-col>

          </el-row>
          <el-row type="flex"  class="mb-6">
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">出生国：</span>
              <el-input size="small"  :disabled="true" v-model="zform.BIRTHCOUNTRYNAME" class="yy-input-input" ></el-input>

            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">居住国：</span>
              <el-input size="small"  :disabled="true" v-model="zform.RESIDENCENAME" class="yy-input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="yy-input-text">护照有效期：</span>
              <el-input size="small"  :disabled="true" v-model="zform.PASSPORTEXPIREDATESTR" class="yy-input-input"></el-input>
            </el-col>
            </el-row>
            <el-row type="flex"  class="mb-6">
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">护照颁发国：</span>
                <el-input size="small"  :disabled="true" v-model="zform.PASSPORTISSUECOUNTRYNAME" class="yy-input-input" ></el-input>

              </el-col>
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">护照签发日期：</span>
                <el-input size="small"  :disabled="true" v-model="zform.PASSPORTISSUEDATESTR" class="yy-input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item">
                <span class="yy-input-text">航班号：</span>
                <el-input size="small"  :disabled="true" v-model="zform.FLTNO" class="yy-input-input"></el-input>
              </el-col>
              </el-row>
              <el-row type="flex"  class="mb-6">
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">航班日期：</span>
                  <el-input size="small"  :disabled="true" v-model="zform.FLIGHTDATESTR" class="yy-input-input" ></el-input>

                </el-col>
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">起飞机场：</span>
                  <el-input size="small"  :disabled="true" v-model="zform.CITYFROMNAME" class="yy-input-input"></el-input>
                </el-col>
                <el-col :span="8" class="input-item">
                  <span class="yy-input-text">预计起飞时间：</span>
                  <el-input size="small"  :disabled="true" v-model="zform.DEPARTDATESTR" class="yy-input-input"></el-input>
                </el-col>
                </el-row>
                <el-row type="flex"  class="mb-6">
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">到达机场：</span>
                    <el-input size="small"  :disabled="true" v-model="zform.CITYTONAME" class="yy-input-input" ></el-input>

                  </el-col>
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">预计降落时间：</span>
                    <el-input size="small"  :disabled="true" v-model="zform.ARRIVDATESTR" class="yy-input-input"></el-input>
                  </el-col>
                  <el-col :span="8" class="input-item">
                    <span class="yy-input-text">原预检结果：</span>
                    <el-input size="small"  :disabled="true" v-model="zform.INSTRUCT_OLD" class="yy-input-input"></el-input>
                  </el-col>
                  </el-row>
                  <el-row type="flex"  class="mb-6">
                    <el-col :span="8" class="input-item">
                      <span class="yy-input-text">最终预检结果：</span>
                      <el-input size="small"  :disabled="true" v-model="zform.INSTRUCT_NEW" class="yy-input-input" ></el-input>

                    </el-col>
                    <el-col :span="8" class="input-item">
                      <span class="yy-input-text">变更原因：</span>
                      <el-input size="small"  :disabled="true" v-model="zform.CHANGE_RESON" class="yy-input-input"></el-input>
                    </el-col>
                    <el-col :span="8" class="input-item">
                      <span class="yy-input-text">审批人：</span>
                      <el-input size="small"  :disabled="true" v-model="zform.APPROVALUSER" class="yy-input-input"></el-input>
                    </el-col>
                    </el-row>
                    <el-row type="flex"  class="mb-6">
                      <el-col :span="8" class="input-item">
                        <span class="yy-input-text">审批时间：</span>
                        <el-input size="small"  :disabled="true" v-model="zform.APPROVALTIME" class="yy-input-input" ></el-input>

                      </el-col>
                      <el-col :span="8" class="input-item">
                        <span class="yy-input-text">操作人：</span>
                        <el-input size="small"  :disabled="true" v-model="zform.NAME" class="yy-input-input" ></el-input>

                      </el-col>
                      <el-col :span="8" class="input-item">
                        <span class="yy-input-text">操作时间：</span>
                        <el-input size="small"  :disabled="true" v-model="zform.CREATETIMESTR" class="yy-input-input" ></el-input>

                      </el-col>
                      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zlbgDialogVisible = false" size="small">关 闭</el-button>
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
            <el-input placeholder="请输入内容" size="small" v-model="hform.portfrom+' - '+hform.stationfromName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>

        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">原计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="hform.portto+' - '+hform.stationtoName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">现计划到达口岸：</span>
              <el-input placeholder="请输入内容" size="small" v-model="hform.changeport+' - '+hform.changeportName" :disabled="true" class="yy-input-input"></el-input>
          </el-col>

        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width: 20%;">事件描述：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="hform.desc" style="width:79%;" :disabled="true" ></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="hbbjDialogVisible = false" size="small">关 闭</el-button>

      </div>
    </el-dialog>

    <el-dialog title="一般性规则修改详情" :visible.sync="ybxgzDialogVisible">

        <el-table
          :data="tableDatay"
          border
          style="width: 100%;">
          <el-table-column
            prop="IODIRSTR"
            label="出入境方向">
          </el-table-column>
          <el-table-column
            prop="PERSONNELTYPESTR"
            label="人员类别">

          </el-table-column>
          <el-table-column
            prop="RULEDESCFATHER"
            label="规则名称">
          </el-table-column>
          <el-table-column
            prop="FIELDNAME"
            label="字段名称">
          </el-table-column>
          <el-table-column
            prop="OPERATORCHARACTERSTR"
            label="运算符">
          </el-table-column>
          <el-table-column
            prop="VALUE"
            label="取值">
          </el-table-column>
          <el-table-column
            prop="CHECKRESULTFATHER"
            label="反馈结果">
          </el-table-column>
          <el-table-column
            prop="RESPONSERESULTFATHER"
            label="反馈结果描述">
          </el-table-column>
          <el-table-column
            prop="STATUSFATHERSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="UPDATEDESC"
            label="修改描述">
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">

          <el-button @click="ybxgzDialogVisible = false" size="small">关 闭</el-button>

        </div>
    </el-dialog>

    <el-dialog title="数据项校验规则详情" :visible.sync="sjxjyDialogVisible">
        <el-table
          :data="tableDatas"
          border
          style="width: 100%;">
          <el-table-column
            prop="IODIRSTR"
            label="出入境方向">
          </el-table-column>
          <el-table-column
            prop="PERSONNELTYPESTR"
            label="人员类别">
          </el-table-column>

          <el-table-column
            prop="FIELDDES"
            label="字段名称">
          </el-table-column>
          <el-table-column
            prop="MAXLENGTH"
            label="最大长度">
          </el-table-column>
          <el-table-column
            prop="MINLENGTH"
            label="最小长度">
          </el-table-column>
          <el-table-column
            prop="CHECKRESULT"
            label="反馈结果">
          </el-table-column>
          <el-table-column
            prop="CHECKREMARK"
            label="反馈结果描述">
          </el-table-column>
          <el-table-column
            prop="INPUTSTR"
            label="限制性">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="CHANGETYPESTR"
            label="修改描述">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">

          <el-button @click="sjxjyDialogVisible = false" size="small">关 闭</el-button>

        </div>
    </el-dialog>


    <el-dialog title="免签规则证件有效期详情" :visible.sync="mqgzDialogVisible">
        <el-table
          :data="tableDatam"
          border
          style="width: 100%;">
          <el-table-column
            prop="IODIRSTR"
            label="出入境方向">
          </el-table-column>
          <el-table-column
            prop="PERSONNELTYPESTR"
            label="人员类别">
          </el-table-column>

          <el-table-column
            prop="RULEDESCFATHER"
            label="规则名称">
          </el-table-column>
          <el-table-column
            prop="FIELDNAME"
            label="字段名称">
          </el-table-column>

          <el-table-column
            prop="OPERATORCHARACTERSTR"
            label="运算符">
          </el-table-column>

          <el-table-column
            prop="VALUE"
            label="取值">
          </el-table-column>
          <el-table-column
            prop="CHECKRESULTFATHER"
            label="反馈结果">
          </el-table-column>
          <el-table-column
            prop="RESPONSERESULTFATHER"
            label="反馈结果描述">
          </el-table-column>
          <el-table-column
            prop="STATUSFATHERSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="UPDATEDESC"
            label="修改描述">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">

          <el-button @click="mqgzDialogVisible = false" size="small">关 闭</el-button>

        </div>
    </el-dialog>

    <el-dialog title="免签国家详情" :visible.sync="mqgjDialogVisible">
        <el-table
          :data="tableDataq"
          border
          style="width: 100%;">
          <el-table-column
            width="200"
            label="已加入国家">
            <template slot-scope="scope">
              <el-row v-for='i in scope.row.RULETBSTRLIST'>
                <el-col :span="24">{{i}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="STATUSSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="CHECKRESULT"
            label="反馈结果">
          </el-table-column>
          <el-table-column
            prop="RESPONSERESULT"
            label="反馈结果描述">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            width="200"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="UPDATEDESC"
            label="修改描述">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">

          <el-button @click="mqgjDialogVisible = false" size="small">关 闭</el-button>

        </div>
    </el-dialog>


    <el-dialog title="免签口岸详情" :visible.sync="mqkaDialogVisible">
        <el-table
          :data="tableDatak"
          border
          style="width: 100%;">
          <el-table-column
            width="200"
            label="已加入口岸">
            <template slot-scope="scope">
              <el-row v-for='i in scope.row.RULETBSTRLIST'>
                <el-col :span="24">{{i}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="STATUSSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="CHECKRESULT"
            label="反馈结果">
          </el-table-column>
          <el-table-column
            prop="RESPONSERESULT"
            label="反馈结果描述">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            width="200"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="UPDATEDESC"
            label="修改描述">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">

          <el-button @click="mqkaDialogVisible = false" size="small">关 闭</el-button>

        </div>
    </el-dialog>

  </div>




</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      dealer:{},
      pd: {},
      dform: {},
      hform: {},
      zform: {},
      detailsDialogVisible: false,
      hbbjDialogVisible: false,
      zlbgDialogVisible: false,
      ybxgzDialogVisible: false,
      sjxjyDialogVisible: false,
      mqgzDialogVisible: false,
      mqgjDialogVisible: false,
      mqkaDialogVisible: false,
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
      tableDatay: [],
      tableDatas:[],
      tableDatak:[],
      tableDataq:[],
      tableDatam:[],
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
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getNation(msg) {
      this.pd.NATIONALITY = msg;
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
      this.$api.post('/manage-platform/eventManagement/queryListPage', p,
        r => {
          console.log(r);
          if (r.success) {
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          }
        })
    },
    details(i) {

      if (i.type == "1") { //航班备降


        this.$api.post('/manage-platform/eventManagement/queryFlightInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.hbbjDialogVisible = true;
              this.hform = r.data;
            }
          });
      } else if (i.type == "0") { //指令变更
        this.$api.post('/manage-platform/eventManagement/queryIapiChangeInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.zlbgDialogVisible = true;
              this.zform = r.data;
            }
          });
      } else if (i.type == "2") { //一般性规则修改
        this.$api.post('/manage-platform/eventManagement/queryRuleOneInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.ybxgzDialogVisible = true;
              this.tableDatay = r.data;
            }
          });
      } else if (i.type == "5") { //数据项校验规则
        // this.tableDatas=[];
        this.$api.post('/manage-platform/eventManagement/queryRuleCheckInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.sjxjyDialogVisible = true;
              this.tableDatas = r.data;
            }
          });
      } else if (i.type == "6") { //免签规则证件有效期
        this.$api.post('/manage-platform/eventManagement/queryPassDateInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.mqgzDialogVisible = true;
              this.tableDatam = r.data;
            }
          });
      } else if (i.type == "7") { //免签国家修改
        this.$api.post('/manage-platform/eventManagement/queryNationalityOrPortInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.mqgjDialogVisible = true;
              this.tableDataq = r.data;
            }
          });
      } else if (i.type == "8") { //免签口岸
        this.$api.post('/manage-platform/eventManagement/queryNationalityOrPortInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.mqkaDialogVisible = true;
              this.tableDatak = r.data;
            }
          });
      } else if(i.type == "4"){

        let ss={
          "event":i.refserial
        }
        this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
         r =>{
           if(r.data== true){
              this.$router.push({name:'alarmProcess',query:{eventserial:i.refserial,type:0}})
           }else if(r.data == false){
             this.$router.push({name:'alarmProcess',query:{eventserial:i.refserial,type:1}})
           }
         })
      }
      else {
        this.detailsDialogVisible = true;
        this.dform = i;
      }
    },
    handler(){
      this.$api.post('/manage-platform/eventManagement/queryEventUser',{},
      r =>{
        if(r.success){
          this.dealer = r.data
        }
      })
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
  height: 148px;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}

.akcheck2top {
  background: #f6f7fb;
  /* height: 28px; */
  padding: 6px;
}

.middle-btn-g {
  display: flex;
  justify-content: center;
}

.middle-btn-g button {
  height: 32px;
  width: 107px;
  border: none;
  border-radius: 5px;
  background: none;
  background: linear-gradient( 360deg, rgb(9, 171, 236) 0%, rgb(0, 121, 228) 100%);
  color: #fff;
}

.akUl {
  height: 103px;
  overflow-y: auto;
}

.akUl img {
  height: 15px;
  width: 21px;
  margin-right: 8px;
}

.ak-li {
  height: 58px;
  align-items: center;
  padding: 0 30px;

}

.nameUi,
.dataUi {
  float: left;
  margin-left: 20px;
}

.nameUi li,
.dataUi li {
  padding: 5px 10px 10px 0px;
  font-weight: bold;
}

.dataUi {
  float: left;
}

.t-input-item {
  display: flex;
  justify-content: flex-start;
  line-height: 32px;
}

.flightDate {
  width: 211px;
  height: 32px
}
</style>
<style media="screen">
.t-input-item .flightDate input {
  width: 42% !important;
}

.el-table__body {
  table-layout: auto !important;
}
</style>
