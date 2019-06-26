<template lang="html">
  <div class="eventbjsj">
    <!-- <router-view></router-view> -->

    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="pr-20">
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">证件号：</span>
                <el-input v-model="pd.passportno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input v-model="pd.fltno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">国籍/地区：</span>
                <el-select v-model="pd.nationality" placeholder="请选择" size="small" multiple collapse-tags
                   clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in nationAlone"
                    :key="ind"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-collapse-transition>
            <el-row align="center" :gutter="2" v-if="moreShow" class="top-row">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">姓名：</span>
                <el-input v-model="pd.name" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="date" size="small" format="yyyy-MM-dd"
                   v-model="pd.birthday_start"
                   value-format="yyyyMMdd"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="date" size="small" format="yyyy-MM-dd"
                    v-model="pd.birthday_end"
                    value-format="yyyyMMdd"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                   v-model="pd.fltnoDate_start"
                   value-format="yyyyMMddHHmmss"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    v-model="pd.fltnoDate_end"
                    value-format="yyyyMMddHHmmss"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">证件类型：</span>
                <el-select v-model="pd.passportType" placeholder="请选择" size="small" multiple collapse-tags
                    clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in docCode"
                    :key="ind"
                    :label="item.CODE+' - '+item.NAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">历次风评：</span>
                <div class="input-input t-flex t-date">
                  <el-input-number size="small" v-model="pd.eachEvent_start" :min="0"></el-input-number>
                  <span class="septum">-</span>
                  <el-input-number size="small" v-model="pd.eachEvent_end" :min="0"></el-input-number>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">命中模型：</span>
                <el-select v-model="pd.hit_mode" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in ModelHis"
                    v-if="item.MODEL_CODE"
                    :key="ind"
                    :label="item.MODEL_JC"
                    :value="item.MODEL_CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flightType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">事件来源：</span>
                <el-select v-model="pd.centre_port" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="1 - 中心" value="1"></el-option>
                  <el-option label="2 - 口岸" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">口岸：</span>
                <el-select v-model="pd.port_name" placeholder="请选择" size="small" multiple collapse-tags
                   clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in airport"
                    v-if="item.DEPT_CODE"
                    :key="ind"
                    :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                    :value="item.DEPT_CODE">
                  </el-option>
                </el-select>
              </el-col>
              <!-- <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">当前状态：</span>
                <el-select v-model="pd.status" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="0 - 全部" value="0"></el-option>
                  <el-option label="1 - 未核查" value="1"></el-option>
                  <el-option label="2 - 已核查" value="2"></el-option>
                  <el-option label="3 - 已流转" value="3"></el-option>
                  <el-option label="4 - 已归档" value="4"></el-option>
                </el-select>
              </el-col> -->
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">推送人：</span>
                <el-input v-model="pd.change_people" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">处理人：</span>
                <el-input v-model="pd.processor_people" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">本事件核查次数：</span>
                <el-input v-model="pd.checkNumber" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">是否推送至梅沙：</span>
                <el-select v-model="pd.yl_two" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-col>
            </el-row>
            </el-collapse-transition>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">高级查询 ﹀</el-button>
            <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起 ︿</el-button>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd,orders,direction)">查询</el-button>
            <el-button type="primary" plain size="small"  class="mt-15" @click="reset" v-if="moreShow">重置</el-button>
          </el-col>
        </el-row>
    </div>
    <div class="middle">
      <div class="ak-tab">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type=='0'}" @click="pd.type='0';getList(CurrentPage,pageSize,pd,orders,direction)">
            全部
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type=='1'}" @click="pd.type='1';getList(CurrentPage,pageSize,pd,orders,direction)">
            未核查
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type=='2'}" @click="pd.type='2';getList(CurrentPage,pageSize,pd,orders,direction)">
            已核查
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type=='3'}" @click="pd.type='3';getList(CurrentPage,pageSize,pd,orders,direction)">
            已流转
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type=='4'}" @click="pd.type='4';getList(CurrentPage,pageSize,pd,orders,direction)">
            已归档
          </div>

        </div>
      </div>
      <div class="ak-tab-pane pt-10" @mouseover="mouseHeader">
        <el-button type="primary" class="mr-5" plain size="small" @click="openGdTc('')" :disabled="isdisable" v-if="pd.type!=4&&pd.type!=1">批量归档</el-button>
        <el-button type="primary" plain size="small" @click="openCzTc" :disabled="isdisable" v-if="pd.type!=4&&pd.type!=2">批量事件处理</el-button>
        <el-button type="primary" plain size="small" @click="daochu">导出</el-button>
        <el-table
          class="mt-10 o-table3 t-gutter"
          ref="multipleTable"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          @header-click="headerClick"
          style="width: 100%;">
          <el-table-column
           v-if="pd.type!=4"
           fixed
           width="40"
           type="selection">
          </el-table-column>
          <!-- <el-table-column
            label="事件编号"
            prop="serial"
            sortable="custom"
            width="101">
          </el-table-column> -->
          <el-table-column
            label="姓名"
            prop="name"
            sortable="custom"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出入标识"
            prop="flightTypeName"
            min-width="50">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="genderName"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthday"
            sortable="custom"
            min-width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="国籍地区"
            sortable="custom"
            prop="nationality"
            min-width="50"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.nationalityName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="证件类型"
            prop="passportTypeName"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="证件号"
            prop="passportno"
            sortable="custom"
            min-width="90"
            :show-overflow-tooltip="true">
            <!-- <template slot-scope="scope">
              <span class="tc-b hand" @click="$router.push({name:'DZDA',query:{idcard:scope.row.idcard,nationality:scope.row.nationality,passportno:scope.row.passportno,grade:scope.row.grade,type:1,nav2Id:scope.row.passportno+scope.row.nationality,title:scope.row.name+'电子档案'}})">{{scope.row.passportno}}</span>
            </template> -->
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable="custom"
            min-width="65"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班日期"
            prop="fltnoDate"
            sortable="custom"
            min-width="151"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            label="命中模型"
            prop="hit_mode_gc"
            sortable="custom"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="命中规则"
            prop="hit_rule_name"
            sortable="custom"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="口岸"
            prop="port_name"
            sortable="custom"
            min-width="60"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="事件来源"
            min-width="50"
            sortable="custom"
            prop="centre_port"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="风险等级"
            sortable="custom"
            min-width="120"
            prop="grade">
            <template slot-scope="scope">
              <el-rate :value="scope.row.grade" size="mini" disabled class="mb-9"></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            label="处理人"
            prop="processor_peopleName"
            min-width="60"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="当前状态"
            prop="status"
            sortable="custom"
            min-width="50"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.statusName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="核查次数"
            prop="checknumber"
            sortable="custom"
            min-width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="最新核查结果"
            min-width="50"
            prop="checkResult"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="历次风评"
            sortable="custom"
            min-width="50"
            prop="eachevent">
            <template slot-scope="scope">
              <div>
                <el-popover
                  ref="popover"
                  placement="top"
                  width="400"
                  trigger="click">
                  <el-table :data="eachData" max-height="400" @row-click="clickEach">
                    <el-table-column width="150" property="CREATETIME" label="创建时间"></el-table-column>
                    <el-table-column width="110" property="PORT_NAME" label="口岸名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column width="140" property="PROCESSORRESULT" label="处理结果" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span>{{scope.row.PROCESSORRESULT||'未审核'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-popover>
              </div>

              <div class="tc-b hand"  v-popover:popover title="查看详情" slot="reference" @click="queryEach(scope.row.serial,scope.row.nationality,scope.row.passportno)">{{scope.row.eachevent}}</div>

            </template>
          </el-table-column>
          <el-table-column
            label="是否推送至梅沙"
            min-width="50"
            prop="yl_two"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            min-width="85">
            <template slot-scope="scope">
              <el-button type="text" class="t-btn mr-5" icon="el-icon-view" title="查看" @click="$router.push({name:'BJSJCK',query:{row:scope.row,idcard:scope.row.idcard,serial:scope.row.serial,grade:scope.row.grade,yl_two:scope.row.yl_two,page:0,nav2Id:scope.row.serial,risk:1,title:scope.row.name+'事件查看'}})"></el-button>
              <el-button type="text" class="t-btn mr-5" icon="el-icon-edit-outline" v-if="pd.type!=4" title="处理" @click="handel(scope.row)"></el-button>
              <el-button type="text" class="t-btn mr-5" icon="el-icon-edit-outline" v-if="pd.type==4" title="归档追加" @click="openGdTc(scope.row)"></el-button>
              <el-button type="text" class="t-btn" icon="el-icon-success" v-if="scope.row.yl_two=='否'" title="推送梅沙" @click="pushMeisha(scope.row)"></el-button>
              <el-button type="text" class="t-btn error-btn" icon="el-icon-error" v-if="scope.row.yl_two=='是'" title="撤销推送" @click="cancelMeisha(scope.row)"></el-button>
              <!-- <el-button type="text" class="t-btn" icon="el-icon-success" title="推送梅沙" @click="pushMeisha(scope.row)"></el-button> -->
              <!-- <el-button type="text" class="t-btn" icon="el-icon-error" title="撤销推送" @click="cancelMeisha(scope.row)"></el-button> -->
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
    </div>
    <el-dialog title="批量事件处理" :visible.sync="czDialogVisible" width="780px" :before-close="handleClose">
      <el-form :model="czform" ref="czForm">
        <div class=" boder1 mb-15">
          <div class="f-bold mb-9">
            <span class="redx">*</span>处理结果描述
          </div>
          <el-input
            class="mb-9"
            type="textarea"
            v-model="czform.processor_desc"
            :rows="3"
            placeholder="请输入描述意见">
          </el-input>
        </div>

        <div class="f-bold mb-9">
          处理结果
        </div>
        <el-row align="center" :gutter="2">
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="redx">*</span><span class="mr-5">核查阶段 </span>
            <el-select v-model="czform.check_stage" filterable clearable placeholder="请选择"  size="small" class="input-input">
              <el-option label="1 - 前期核查" value="1"></el-option>
              <el-option label="2 - 见面核查" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="redx">*</span><span class="mr-5">处理结果 </span>
            <el-select v-model="czform.processorResult" filterable clearable placeholder="请选择"  size="small" class="input-input">
              <el-option label="1 - 排除嫌疑" value="1"></el-option>
              <el-option label="2 -  未能排除嫌疑，待进一步核查" value="2"></el-option>
              <!-- <el-option label="3 -  推送梅沙 " value="3"></el-option> -->

            </el-select>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item"  v-show="user.dept_code=='B06'">
            <span class="mr-5">流转至 </span>
            <el-select v-model="czform.change_port" filterable clearable placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="(item,ind) in airport"
                v-if="item.DEPT_CODE"
                :key="ind"
                :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                :value="item.DEPT_CODE">
              </el-option>
            </el-select>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czSave" size="small">确认</el-button>
        <el-button type="warning" @click="czDialogVisible=false" size="small">取消</el-button>

      </div>
    </el-dialog>
    <GDTC :gtitle="'批量归档'" :gvisible="gdDialogVisible" :garr="multipleSelection" :gtype="'1'" @gclose="gclose"></GDTC>
    <GDTC :gtitle="'归档追加'" :gvisible="gdDialogVisible2" :garr="checkeditem" :gtype="'3'" @gclose="gclose"></GDTC>

    <el-dialog title="推送梅沙" :visible.sync="pushMaddDialogVisible" width="500px" :before-close="handleCloseM">
      <el-form :model="pushMform" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">处理人：</span>
            <el-input size="small" v-model="pushMform.userName"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="type" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理类型：</span>
            <el-select placeholder="请选择" v-model="pushMform.type" filterable clearable size="small" class="yy-input-input" @change='typeChange(pushMform.type)'>
              <el-option label="移交台外" value="移交台外"></el-option>
              <el-option label="前台提示信息" value="前台提示信息"></el-option>
              <el-option label="自定义前台提示信息" value="自定义前台提示信息"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="pushMform.type=='前台提示信息'">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="strategy" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理策略：</span>
            <el-select placeholder="请选择" v-model="pushMform.strategy" filterable clearable size="small" class="yy-input-input">
              <el-option label="正常办理手续后移交后台" value="正常办理手续后移交后台"></el-option>
              <el-option label="请多页采集后移交台外" value="请多页采集后移交台外"></el-option>
              <el-option label="请多页采集后正常放行" value="请多页采集后正常放行"></el-option>
              <el-option label="正常办理手续后移交后台" value="正常办理手续后移交后台"></el-option>
              <el-option label="严把“三关”并核查有无涉恐国轨迹，如无异常正常放行" value="严把“三关”并核查有无涉恐国轨迹，如无异常正常放行"></el-option>
              <el-option label="严把“三关”查验证件真伪，如无异常正常放行" value="严把“三关”查验证件真伪，如无异常正常放行"></el-option>
              <el-option label="请查验出生地是否为新疆或中国" value="请查验出生地是否为新疆或中国"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" v-if="pushMform.type=='自定义前台提示信息'">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="message" data-type="textarea"
            v-validate-easy="[['required'],['maxLength',[100]]]">
            <span class="yy-input-text"><font class="yy-color">*</font>自定义提示信息：</span>
            <el-input type="textarea" placeholder="最多输入100字" :autosize="{ minRows: 3, maxRows: 6}" v-model="pushMform.message" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="fbkadm" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color" v-if="user.dept_code=='B06'">*</font>推送至口岸：</span>
            <el-select placeholder="请选择" v-model="pushMform.fbkadm" filterable clearable size="small" class="yy-input-input" :disabled="user.dept_code!='B06'">
              <el-option label="全国" value="000" v-if="user.dept_code=='B06'"></el-option>
              <el-option :label="portLabel" :value="portValue"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="zdgzrylbdm" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>关注类别：</span>
            <el-select placeholder="请选择" v-model="pushMform.zdgzrylbdm" filterable clearable size="small" class="yy-input-input">
              <el-option label="预警内地重点人员" value="11"></el-option>
              <el-option label="预警外籍涉疆人员" value="12"></el-option>
              <el-option label="预警偷渡人员" value="13"></el-option>
              <el-option label="预警三非人员" value="14"></el-option>
              <el-option label="预警变换身份人员" value="15"></el-option>
              <el-option label="预警黑名单人员" value="16"></el-option>
              <el-option label="预警其他人员" value="17"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="bjfw" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>报警范围：</span>
            <el-select placeholder="请选择" v-model="pushMform.bjfw" filterable clearable size="small" class="yy-input-input">
              <el-option label="入境" value="1"></el-option>
              <el-option label="出境" value="2"></el-option>
              <el-option label="入出境" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="zdgzryclfs" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理方式：</span>
            <el-select placeholder="请选择" v-model="pushMform.zdgzryclfs" filterable clearable size="small" class="yy-input-input">
              <el-option label="移交后台" value="1"></el-option>
              <el-option label="重点检查" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="qsgzrq" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>起始关注日期：</span>
              <el-date-picker
              v-model="pushMform.qsgzrq"
              type="date" size="mini"
              placeholder="请选择开始日期"
              class="yy-input-input"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="jsgzrq" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>结束关注日期：</span>
              <el-date-picker
              v-model="pushMform.jsgzrq"
              type="date" size="mini"
              placeholder="请选择开始日期"
              class="yy-input-input"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem()" size="small">确 定</el-button>
        <el-button @click="handleCloseM" size="small">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import GDTC from './GDTC'
import { formatDate,format } from '@/assets/js/date.js'

export default {
  components:{GDTC},
  data(){
    return{
      pushMaddDialogVisible:false,
      pushMform:{
        userName:'',
        qsgzrq:formatDate(new Date(),'yyyyMMdd'),
        jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
      },
      user:{},
      tagData:{},
      moreShow:false,
      page: 0,
      multipleSelection:null,
      tableData:[],
      eachData:[],
      CurrentPage:1,
      pageSize:50,
      orders:[],
      direction:0,
      TotalResult:0,
      pd:{type:'1',fltnoDate_start:'',fltnoDate_end:''},
      airport:null,
      docCode:null,
      nationAlone:null,
      ModelHis:null,
      isdisable:true,
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
        },
        {
          value:50,
          label:"50"
        }
      ],
      options2:[
        {
          value: '1',
          label: '入境',
          children:[
            {
              value: '1',
              label: '允许入境',
              children:[
                {
                  value: '1',
                  label: '排除嫌疑，允许入境',
                },
                {
                  value: '2',
                  label: '暂未排除嫌疑，允许入境',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            },
            {
              value: '2',
              label: '阻止入境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                }
              ]
            }
          ]
        },
        {
          value: '2',
          label: '出境',
          children:[
            {
              value: '3',
              label: '允许出境',
              children:[
                {
                  value: '3',
                  label: '排除嫌疑，允许出境',
                },
                {
                  value: '4',
                  label: '暂未排除嫌疑，允许出境',
                },

              ]
            },
            {
              value: '4',
              label: '阻止出境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            }
          ]
        },
        {
          value: '3',
          label: '过境',
          children:[
            {
              value: '5',
              label: '允许过境',
              children:[
                {
                  value: '5',
                  label: '排除嫌疑，允许过境',
                },
                {
                  value: '6',
                  label: '暂未排除嫌疑，允许过境',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            },
            {
              value: '6',
              label: '阻止过境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                },

              ]
            }
          ]
        }

      ],
      czDialogVisible:false,
      czform:{},
      gdDialogVisible:false,
      gdDialogVisible2:false,
      hash:'',
      checkeditem:null,
      eventSerial:'',
      portLabel:'',
      portValue:'',

    }
  },
  mounted(){
    let begin = new Date();
    // console.log(begin+24*60*60*1000)
    let end = new Date(begin.getTime()+24*60*60*1000);

    this.pd.fltnoDate_start= formatDate(begin, 'yyyyMMdd')+'000000';
    this.pd.fltnoDate_end= formatDate(end, 'yyyyMMdd')+'000000';

    this.queryAirport();
    this.queryNationalityAlone();
    this.queryDocCode();
    this.getRiskModelHisInfo();
    this.getUers();

  },
  activated(){
    // this.hash=(new Date()).getTime();
    // this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
  },
  methods:{
    typeChange(){
      this.$set(this.pushMform,'strategy','');
      this.$set(this.pushMform,'message','');
    },
    handleCloseM(){
      this.pushMform={
        userName:'',
        qsgzrq:formatDate(new Date(),'yyyyMMdd'),
        jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
      };
      this.pushMaddDialogVisible=false;
    },
    daochu(){
        let p={
          "showCount": this.pageSize,
          "currentPage":this.CurrentPage,
          "pd": this.pd,
          "orders":this.orders,
  	      "direction":this.direction
        }
        this.$api.post('/manage-platform/riskEventController/getRiskEventToExcelInfo',p,
         r =>{
           this.downloadM(r);
         },e=>{},'','blob')
    },
    downloadM (data,type) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '风评事件.xlsx')
        document.body.appendChild(link)
        link.click()
    },
    pushMeisha(i){
      this.eventSerial = i.serial;
      console.log('1111',this.user.dept_code);
      if(i.change_portCode==undefined||i.change_portCode==''){
        this.portLabel=i.port_name;
        this.portValue=i.port_code;
      }else{
        this.portLabel=i.change_portName;
        this.portValue=i.change_portCode;
      }
      if(this.user.dept_code!="B06"){
        this.pushMform.fbkadm=this.portValue
      }
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
        r => {
          this.pushMform.userName = r.data.name;
        })
        this.pushMaddDialogVisible=true;
        this.V.$reset('demo2')
    },
    addItem(){//推送梅沙
      this.V.$submit('demo2', (canSumit,data) => {
        if(!canSumit) return
        let p={
          "eventSerial":this.eventSerial,
          "operation_type":"6",
          "course_type":'4',
          "one":(new Date()).getTime(),
          "gznr":this.pushMform.type=="前台提示信息"?this.pushMform.strategy:this.pushMform.type=="自定义前台提示信息"?this.pushMform.message:"移交台外",
          "fbkadm":this.pushMform.fbkadm,
          "zdgzrylbdm":this.pushMform.zdgzrylbdm,
          "bjfw":this.pushMform.bjfw,
          "zdgzryclfs":this.pushMform.zdgzryclfs,
          "qsgzrq":this.pushMform.qsgzrq,
          "jsgzrq":this.pushMform.jsgzrq
        }
        this.$api.post('/manage-platform/riskEventPushMXController/insertBJAPIZDGZRYInfo',p,
         r =>{
           if(r.success){
             this.$message({
               message: '恭喜你，保存成功！',
               type: 'success'
             });
             this.pushMaddDialogVisible=false;
             this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
             this.pushMform={
               userName:'',
               qsgzrq:formatDate(new Date(),'yyyyMMdd'),
               jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
             };
           }
         })
      })

    },
    cancelMeisha(i){
      let p = {
        "eventSerial": i.serial
      };
      this.$confirm('您是否确认撤销推送？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/riskEventPushMXController/deleteBJAPIZDGZRYInfo', p,
          r => {
            if (r.success) {
              this.$message({
                message: '撤销成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销'
        });
      });
    },
    handel(i){//处理
      let p={
        "serial":i.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskEventStatusInfo',p,
        r =>{
          if(r.success){
            this.$router.push({name:'BJSJCK',query:{row:i,idcard:i.idcard,serial:i.serial,grade:i.grade,status:i.status,yl_two:i.yl_two,page:0,operation_type:1,risk:1,nav2Id:i.serial+1,title:i.name+'事件处理'}})
          }
          // else{
          //   this.$message.error(r.data.message);
          // }
        })
    },
    headerClick(column,event){
      console.log(column,event)
      event.target.title=column.label
    },
    getUers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        console.log(r)
        this.user=r.data;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection",val)
      if(this.multipleSelection.length==0){
        this.isdisable=true;
      }else{
        this.isdisable=false;
      }
    },
    pageSizeChange(val) {
      this.pageSize=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`当前页: ${val}`);
    },
    sortChange(data){

      // if(data.prop=="name"){
      //   this.orders=[data.prop,"ename"];
      // }else{
        this.orders=[data.prop];
      // }
      if(data.order=='descending'){
        this.direction=0
      }else{
        this.direction=1
      }
      console.log(this.orders,this.direction)
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    handleClose(done) {
      // this.czform={};
      done();
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=50;
      this.pd={type:'1'};
      let begin = new Date();
      // console.log(begin+24*60*60*1000)
      let end = new Date(begin.getTime()+24*60*60*1000);

      this.pd.fltnoDate_start= formatDate(begin, 'yyyyMMdd')+'000000';
      this.pd.fltnoDate_end= formatDate(end, 'yyyyMMdd')+'000000';
      this.orders=[];
      this.direction=0;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);

    },
    queryAirport(){
      this.$api.post('/manage-platform/riskEventController/getDeptInfo',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },

    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryDocCode(){
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryDmDocCodeAndDmDocCodes',{},
       r => {
         if(r.success){
           this.docCode=r.data;
         }
      })
    },
    getRiskModelHisInfo(){
      this.$api.post('/manage-platform/riskEventController/getRiskModelHisInfo',{},
       r => {
         if(r.success){
           this.ModelHis=r.data;
         }
      })
    },
    getList(CurrentPage,showCount,pd,orders,direction){
      if(this.pd.fltnoDate_start||this.pd.fltnoDate_end){
        if(!(this.pd.fltnoDate_end&&this.pd.fltnoDate_start)){
          this.$message.error('请输入完整的航班日期区间！');
          return
        }
      }
      if(this.pd.birthday_start||this.pd.birthday_end){
        if(!(this.pd.birthday_end&&this.pd.birthday_start)){
          this.$message.error('请输入完整的出生日期区间！');
          return
        }
      }
      if(this.pd.eachEvent_start||this.pd.eachEvent_end){
        if(!(this.pd.eachEvent_end&&this.pd.eachEvent_start)){
          this.$message.error('请输入完整的历次风评区间！');
          return
        }
      }
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "pd": pd,
        "orders":orders,
	      "direction":direction
      }
      this.$api.post('/manage-platform/riskEventController/queryRiskEventInfo',p,
       r => {
         console.log(r)
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    queryEach(serial,nationality,passportno){
      let p={
        "pd": {
          "serial":serial,
      		"nationality":nationality,
      		"passportno":passportno
        }
      }
      this.$api.post('/manage-platform/riskEventController/queryEachRiskEventInfo',p,
       r => {
         this.eachData=r.data
      })
    },
    clickEach(row,event,column){
      if(!row.PROCESSORRESULT){
        return
      }
      this.$router.push({name:'BJCLCX',query:{serial:row.SERIAL,grade:row.GRADE,nav2Id:row.SERIAL+2,title:'已归档查询'}})
    },
    openCzTc(){
      this.czform={};
      this.czDialogVisible=true
    },
    czSave(){

      if(!this.czform.processor_desc){
        this.$message.error('请先填写处理结果描述！');
        return
      }else if(!this.czform.check_stage){
        this.$message.error('请选择核查阶段！');
        return
      }else if(!this.czform.processorResult){
        this.$message.error('请选择处理结果！');
        return
      }
      let arr1=this.multipleSelection;
      let p={
        list:[]
      };
      let that=this;
      for(var i=0;i<arr1.length;i++){
        let a={
          "processorResult":that.czform.processorResult,
    			"change_port":that.czform.change_port,
    			"processor_desc":that.czform.processor_desc,
        	"processor_people":this.user.userId,
          "check_stage":that.czform.check_stage,
    			"serial":arr1[i].serial
        }
        p.list.push(a)
      }

      this.$api.post('/manage-platform/riskEventController/updateBatchDisposeEventInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，操作成功！',
             type: 'success'
           });
           this.czDialogVisible=false;
           this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);


         }
      })
    },
    openGdTc(item){
      console.log(item)
      if(item){
        this.checkeditem=item;
        this.gdDialogVisible2=true
      }else{
        this.gdDialogVisible=true;
      }
    },
    gclose(data){
      console.log(data)
      this.gdDialogVisible=data;
      this.gdDialogVisible2=data;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);


    }
  }
}
</script>

<style scoped>
.cellClass{
  height: 32px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.yy-input-text {
  width: 25% !important;
}
</style>
