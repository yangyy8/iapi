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
                <span class="input-text"><i class="t-must">*</i>事件类型：</span>
                <el-select v-model="pd.type" placeholder="请选择"  filterable  size="small" class="input-input" @change="eventType(pd.type)">
                  <el-option value="0" label="指令变更"></el-option>
                  <el-option value="1" label="航班备降"></el-option>
                  <el-option value="-1" label="航班取消"></el-option>
                  <el-option value="2" label="业务规则修改"></el-option>
                  <el-option value="4" label="报警事件"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text"><i class="t-must">*</i>事件产生时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-model="pd.startCreatetime"
                   type="datetime"
                   size="small"
                   value-format="yyyyMMddHHmmss"
                   placeholder="开始时间"
                   :picker-options="pickerOptions">
                  </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                    v-model="pd.endCreatetime"
                    type="datetime"
                    size="small"
                    value-format="yyyyMMddHHmmss"
                    placeholder="结束时间"
                    :picker-options="pickerOptions1">
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
                     type="datetime"
                     size="small"
                     value-format="yyyyMMddHHmmss"
                     placeholder="开始时间"
                     :picker-options="pickerOptions2">
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.endDealtime"
                      type="datetime"
                      size="small"
                      value-format="yyyyMMddHHmmss"
                      placeholder="结束时间"
                      :picker-options="pickerOptions3">
                   </el-date-picker>
                </div>
              </el-col>
              <div class="" >
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0||pd.type==4">
                  <span class="input-text">姓名：</span>
                  <el-input placeholder="请输入内容" v-model="pd.familyname" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0||pd.type==4">
                  <span class="input-text">性别：</span>
                  <el-select placeholder="请选择" v-model="pd.genderEqual" size="small" filterable clearable class="input-input">
                    <el-option label="M - 男" value="M"></el-option>
                    <el-option label="F - 女" value="F"></el-option>
                    <el-option label="U - 未知" value="U"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0||pd.type==4">
                   <span class="input-text">出生日期：</span>
                   <el-date-picker
                   v-model="pd.dateofbirthEqual"
                   type="date"
                   size="small"
                   value-format="yyyyMMdd"
                   placeholder="请选择"
                   class="input-input">
                  </el-date-picker>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0||pd.type==4">
                  <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" v-model="pd.passportnoEqual" size="small" class="input-input"></el-input>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"   class="input-item" v-if="pd.type==0||pd.type==4">
                  <span class="input-text">国籍/地区：</span>
                  <el-select v-model="pd.nationalityEqual" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                    <el-option
                      v-for="item in nation"
                      :key="item.CODE"
                      :label="item.CODE+' - '+item.CNAME"
                      :value="item.CODE">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
                  <span class="input-text">出入标识：</span>
                  <el-select v-model="pd.flighttypeEqual"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">
                    <el-option value="I" label="I - 入境"></el-option>
                    <el-option value="O" label="O - 出境"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
                  <span class="input-text">航班号：</span>
                  <el-input placeholder="请输入内容" v-model="pd.fltnoEqual" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item " v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
                  <span class="input-text">航班日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="pd.startFltdate"
                      type="date" size="small"
                      placeholder="开始日期"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd"
                      :picker-options="pickerOptions6">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="pd.endFltdate"
                       type="date" size="small"
                       placeholder="结束日期"
                       format="yyyy-MM-dd"
                       value-format="yyyyMMdd"
                       :picker-options="pickerOptions7">
                   </el-date-picker>
                  </div>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==1||pd.type==-1">
                  <span class="input-text">计划起飞机场：</span>
                  <el-select placeholder="请选择" v-model="pd.stationfromEqual" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                    <el-option
                    v-for="item in takeOffName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==1||pd.type==-1">
                  <span class="input-text">计划到达机场：</span>
                  <el-select placeholder="请选择" v-model="pd.stationtoEqual" filterable clearable @visible-change="landing" size="small" class="input-input">
                    <el-option
                    v-for="item in landingName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==1||pd.type==-1">
                  <span class="input-text">实际到达机场：</span>
                  <el-select placeholder="请选择" v-model="pd.changeportEqual" filterable clearable @visible-change="landing" size="small" class="input-input">
                    <el-option
                    v-for="item in landingName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==4">
                  <span class="input-text">命中类别：</span>
                  <el-select v-model='pd.eventtype' placeholder="请选择" size="small" filterable clearable class="input-input">
                      <el-option value="1" label="1 - 名单报警事件"></el-option>
                      <el-option value="2" label="2 - 复核报警事件"></el-option>
                      <el-option value="3" label="3 - 关注人员预警事件"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==4">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model='pd.dealresult' placeholder="请选择" size="small" filterable clearable class="input-input">
                      <el-option value="0" label="0 - 不做变更处理"></el-option>
                      <el-option value="1" label="1 - 变更处理"></el-option>
                      <el-option value="2" label="2 - 数据推送"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0">
                  <span class="input-text">原预检指令：</span>
                  <el-select v-model="pd.checkResult"  placeholder="请选择"  filterable clearable  size="small" class="input-input">
                    <el-option value="0Z" label="0Z - 允许打印登机牌"></el-option>
                    <el-option value="1Z" label="1Z - 禁止打印登机牌"></el-option>
                    <el-option value="2Z" label="2Z - 请再次核对"></el-option>
                    <el-option value="4Z" label="4Z - 数据错误"></el-option>
                   </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item" v-if="pd.type==0">
                  <span class="input-text">变更后指令：</span>
                  <el-select v-model="pd.lastcheckresult"  placeholder="请选择"  filterable clearable  size="small" class="input-input">
                    <el-option value="0Z" label="0Z - 允许打印登机牌"></el-option>
                    <el-option value="1Z" label="1Z - 禁止打印登机牌"></el-option>
                    <el-option value="2Z" label="2Z - 请再次核对"></el-option>
                    <el-option value="4Z" label="4Z - 数据错误"></el-option>
                   </el-select>
                </el-col>
              </div>
            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
            <el-button type="success" class="mb-15" size="small"  @click="CurrentPage=1;getList(CurrentPage,pageSize,pd,order,direction)">查询</el-button>
            <el-button type="primary" size="small"  @click="reset" plain>重置</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle" @mouseover="mouseHeader">
      <el-table
        class="o-table3"
        :data="tableData"
        border
        @header-click="headerClick"
        @sort-change='sortChange'
        style="width: 100%;">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="typeStr"
          label="事件类型"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="createtimeStr"
          label="事件产生时间"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="name"
          label="处理人"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="dealtimeStr"
          label="处理时间"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="xm"
          label="姓名"
          sortable='custom'
          v-if="pd.type==0||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="genderStr"
          label="性别"
          sortable='custom'
          v-if="pd.type==0||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="birthdayStr"
          label="出生日期"
          sortable='custom'
          v-if="pd.type==0||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="passportno"
          label="证件号码"
          sortable='custom'
          v-if="pd.type==0||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="nationalityStr"
          label="国籍地区"
          sortable='custom'
          v-if="pd.type==0||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="flighttypeStr"
          label="出入标识"
          sortable='custom'
          v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="fltno"
          label="航班号"
          sortable='custom'
          v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="fltdateStr"
          label="航班日期"
          sortable='custom'
          v-if="pd.type==0||pd.type==1||pd.type==-1||pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="portfromStr"
          label="计划起飞机场"
          sortable='custom'
          v-if="pd.type==1||pd.type==-1">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="stationtoStr"
          label="计划到达机场"
          sortable='custom'
          v-if="pd.type==1||pd.type==-1">
        </el-table-column>
        <el-table-column
         :show-overflow-tooltip="true"
          prop="changeportStr"
          label="实际到达机场"
          sortable='custom'
          v-if="pd.type==1||pd.type==-1">
        </el-table-column>
        <el-table-column
         :show-overflow-tooltip="true"
          prop="eventtypeStr"
          label="命中类别"
          sortable='custom'
          v-if="pd.type==4">
        </el-table-column>
        <el-table-column
         :show-overflow-tooltip="true"
          prop="dealresultStr"
          label="处理结果"
          sortable='custom'
          v-if="pd.type==4">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="checkresult"
          label="原预检指令"
          sortable='custom'
          v-if="pd.type==0">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="lastcheckresult"
          label="变更后指令"
          sortable='custom'
          v-if="pd.type==0">
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip="true"
          prop="content"
          label="事件描述">
        </el-table-column>
        <el-table-column
          width="70"
          label="操作">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="details(scope.row)"></el-button>
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

    <el-dialog
      title="事件文档"
      :visible.sync="queryDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>

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
              <span class="yy-input-text">国籍/地区：</span>
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

    <el-dialog :title="beijiangText" :visible.sync="hbbjDialogVisible">
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
          <el-col :span="12" class="input-item" v-if="jihua">
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
            label="出入境方向">
            <template slot-scope="scope">
              {{scope.row.IODIRSTR | fifterfx}}
            </template>
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
            label="反馈结果">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULTFATHER | fiftecr}}
            </template>
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
          fit
          class="t-t"
          style="width: 100%;"
          >
          <el-table-column
            label="出入境方向"
            width="100">
            <template slot-scope="scope">
              {{scope.row.IODIRSTR | fifterfx}}
            </template>
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
            label="反馈结果">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULT | fiftecr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="CHECKREMARK"
            label="反馈结果描述"
            width="200">
          </el-table-column>
          <el-table-column
            prop="INPUTSTR"
            label="限制性">
          </el-table-column>
          <el-table-column
            prop="CREATETIMESTR"
            label="修改时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="UPDATEDESC"
            label="修改描述"
            width="100">
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
            label="出入境方向">
            <template slot-scope="scope">
              {{scope.row.IODIRSTR | fifterfx}}
            </template>
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
            label="反馈结果">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULTFATHER | fiftecr}}
            </template>
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
              <el-row v-for='(i,index) in scope.row.RULETBSTRLIST' :key="index">
                <el-col :span="24">{{i}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="STATUSSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            label="反馈结果">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULT | fiftecr}}
            </template>
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
              <el-row v-for='(i,index) in scope.row.RULETBSTRLIST' :key="index">
                <el-col :span="24">{{i}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="STATUSSTR"
            label="状态">
          </el-table-column>
          <el-table-column
            label="反馈结果">
            <template slot-scope="scope">
              {{scope.row.CHECKRESUL | fiftecr}}
            </template>
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
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  components: {AlarmProcess},
  data() {
    return {
      //指令变更
      nation:[],
      takeOffName:[],
      takeOffNameReal:[],
      landingName:[],
      landingNameReal:[],
      order:'',
      direction:0,
      beijiangText:'航班备降详情',
      jihua:true,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      dealer:{},
      pd: {
        type:'0',
        startCreatetime:'',
        endCreatetime:'',
      },
      cdt:{},
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
      queryDialogVisible:false,
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
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.endCreatetime != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.pd.endCreatetime;
            }else if(this.pd.endCreatetime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let todayS =  (this.pd.startCreatetime).slice(0,8);
          let currentTime = formatDate(new Date(time.getTime()),'yyyyMMdd');
          let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
          let endTnull = formatDate(new Date(time.getTime()-24*60*60*1000),'yyyyMMddhhmmss');
          if(todayS==currentTime){
            return this.pd.startCreatetime>this.pd.endCreatetime;
          }
          // else if(this.pd.endCreatetime==null){
          //   console.log(this.pd.startCreatetime,endTnull,this.pd.startCreatetime>=endTnull)
          //   return this.pd.startCreatetime>=endTnull
          // }
          else{
            return endT < this.pd.startCreatetime;
          }
        }
      },

      pickerOptions2: {
        // disabledDate: (time) => {
        //     if (this.pd.endDealtime != null) {
        //       let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
        //       return startT > this.pd.endDealtime;
        //     }else if(this.pd.endDealtime == null){
        //       return false
        //     }
        // }
      },
      pickerOptions3: {
        // disabledDate: (time) => {
        //     let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
        //     return endT < this.pd.startDealtime;
        // }
      },
      pickerOptions6: {//航班日期
        // disabledDate: (time) => {
        //     if (this.cdt.endFltdate != null) {
        //       let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
        //       return startT > this.cdt.endFltdate;
        //     }else if(this.cdt.endFltdate == null){
        //       return false
        //     }
        // }
      },
      pickerOptions7: {
        // disabledDate: (time) => {
        //     let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
        //     let a = new Date(this.timePlace(this.cdt.startFltdate));
        //     return endT < formatDate(new Date(a),'yyyyMMddhhmm');
        // }
      },
      nav1Id:null,
      nav2Id:null,
      cdt:{},
    }
  },
  mounted() {
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    let time = new Date();
    let end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
    let begin = new Date(new Date().setHours(0,0,0,0));
    this.pd.startCreatetime=formatDate(begin,'yyyyMMddhhmmss');
    this.pd.endCreatetime=formatDate(end,'yyyyMMddhhmmss');
  },
  activated(){

  },
  methods: {
    reset(){
      let time = new Date();
      let end = new Date();
      let begin = new Date(new Date().setHours(0,0,0,0));
      this.pd={
        type:'0',
        startCreatetime:formatDate(begin,'yyyyMMddhhmmss'),
        endCreatetime:formatDate(end,'yyyyMMddhhmmss'),
      };
      this.order='';
      this.direction=0;
      this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
    },
    eventType(i){
      let time = new Date();
      let end = new Date();
      let begin = new Date(new Date().setHours(0,0,0,0));
      this.pd={
        type:i,
        startCreatetime:formatDate(begin,'yyyyMMddhhmmss'),
        endCreatetime:formatDate(end,'yyyyMMddhhmmss'),
      }
      this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
    },
    takeOff(){//调用起飞机场
      let p={
        "flighttype":this.pd.flighttypeEqual,
        "type":0
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){//调用降落机场
      let p={
        "flighttype":this.pd.flighttypeEqual,
        "type":1
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.landingName = r.data;
         }
       })
    },
    // ================================================指令变更===============================================
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          if (r.success) {
            this.nation = r.data;
          }
        })
    },

    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getNation(msg) {
      this.pd.NATIONALITY = msg;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val, this.pd,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize, this.pd,this.order,this.direction);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd,order,direction) {
      if(this.pd.startCreatetime==''||this.pd.endCreatetime==''||this.pd.startCreatetime==null||this.pd.endCreatetime==null){
        this.$message({
          message: '事件产生时间不能为空',
          type: 'warning'
        });
        return
      }

      // if(dayGap(this.pd.startCreatetime,this.pd.endCreatetime,1)>30){
      //   this.$alert('事件产生时间查询时间间隔不能超过一个月', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // };

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
        "order":order,
        "direction":direction
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
              this.beijiangText='航班备降详情';
              this.jihua = true;
              this.hbbjDialogVisible = true;
              this.hform = r.data;
            }
          });
      } else if(i.type == '-1'){//航班取消
        this.$api.post('/manage-platform/eventManagement/queryFlightInfo', {
            "refserial": i.refserial
          },
          r => {
            if (r.success) {
              this.beijiangText = '航班取消详情';
              this.jihua = false;
              this.hbbjDialogVisible = true;
              this.hform = r.data;
            }
          });
      }
      else if (i.type == "0") { //指令变更
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
              for(var i=0;i<r.data.length;i++){
                if(r.data[i].MAXLENGTH == -1){
                  r.data[i].MAXLENGTH = ''
                }
                if(r.data[i].MINLENGTH == -1){
                  r.data[i].MINLENGTH = ''
                }
              }
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
             this.queryDialogVisible = true;
              this.$router.push({query:{eventserial:i.refserial,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
           }else if(r.data == false){
             this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
               confirmButtonText: '确定',
               type: 'warning'
             })
             // this.$router.push({query:{eventserial:i.refserial,type:1,nav1Id:this.nav1Id}})
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
  },
    filters: {
      fiftecr(val) {
        if (val == "0Z") {
          return "0Z-允许打印登机牌";
        } else if (val == "1Z") {
          return "1Z-禁止打印登机牌";
        } else if (val == "2Z") {
          return "2Z-请再次核对";
        } else if (val == "4Z"){
          return "4Z-数据错误";
        }else {
          return  val;
        }
      },
      fifterfx(val)
      {
        if(val=="全部"){
          return  "入出境";
        }else {
          return  val;
        }
      }
    },
}
</script>

<style scoped>

</style>
<style media="screen">
.t-t .el-table__body-wrapper{
  max-height: 500px;
  overflow: auto;
}
</style>
