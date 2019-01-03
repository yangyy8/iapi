<template lang="html">
  <div class="ryssjk">
    <!-- <div class="top mb-6">
      <el-row type="flex">
        <el-col :span="22" class="br">
          <el-row :gutter="2" class="pr-20 top-row">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input v-model="pd.fltNo"  placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.ioType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value=""></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                 type="date" size="small"
                 :editable="false"
                 :clearable="false"
                 v-model="pd.fltDateFr"
                 value-format="yyyyMMdd"
                 placeholder="开始时间" >
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                  type="date" size="small"
                  :editable="false"
                  :clearable="false"
                  v-model="pd.fltDateTo"
                  value-format="yyyyMMdd"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航站：</span>
              <el-select  v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="item in airport"
                  v-if="item.JCDM"
                  :key="item.JCDM"
                  :label="item.JCDM+' - '+item.KAMC"
                  :value="item.JCDM">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div> -->
    <div class="middle mb-6">
      <div class="ak-tab">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==0}" @click="checkTab(0)">
            预检人员
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==1}" @click="checkTab(1)">
            不准登机人员
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==2}" @click="checkTab(2)">
            重点关注人员
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==3}" @click="checkTab(3)">
            人员全业务监控
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==4}" @click="checkTab(4)">
            pnr信息监控
          </div>
        </div>
      </div>
      <!-- <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==0}" @click="pd.type=0;getList(CurrentPage,pageSize,pd)">
          预检人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==1}" @click="pd.type=1;getList(CurrentPage,pageSize,pd)">
          不准登机人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==2}" @click="pd.type=2;getList(CurrentPage,pageSize,pd)">
          重点人员
        </div>
      </div> -->
      <div class="ak-tab-pane">
        <el-row type="flex">
          <el-col :span="22" class="br">
            <el-row :gutter="2" class="pr-20 top-row">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input v-model="pd.fltNo"  placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.ioType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value=""></el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="date" size="small"
                   :editable="false"
                   :clearable="false"
                   v-model="pd.fltDateFr"
                   value-format="yyyyMMdd"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="date" size="small"
                    :editable="false"
                    :clearable="false"
                    v-model="pd.fltDateTo"
                    value-format="yyyyMMdd"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航站：</span>
                <el-select  v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option
                    v-for="item in airport"
                    v-if="item.JCDM"
                    :key="item.JCDM"
                    :label="item.JCDM+' - '+item.KAMC"
                    :value="item.JCDM">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
        <!-- <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15" @click="getList(CurrentPage,pageSize,pd)">刷新</el-button> -->
        <el-checkbox v-model="checked">自动刷新</el-checkbox>
        <span class="tc-999 f-14">注：点击每行可查看人员详情</span>
        <el-table
          class="mt-10 o-table3"
          v-show="pd.type==0||pd.type==1||pd.type==2"
          :data="tableData"
          border
          @row-click="rowClick"
          @header-click="headerClick"
          style="width: 100%;">
          <el-table-column
            label="姓名"
            prop="name"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            width="70"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.gender=='F'">女</span>
                <span v-if="scope.row.gender=='M'">男</span>
                <span v-if="scope.row.gender=='U'">未知</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthDay"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="国籍/地区"
            prop="nationalityName"
            sortable
            width="106"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出入标识"
            width="99"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.ioType=='I'">入境</span>
                <span v-if="scope.row.ioType=='O'">出境</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="旅客类别"
            prop="name"
            width="80">
          </el-table-column>
          <el-table-column
            label="值机状态"
            prop="name"
            width="120">
          </el-table-column>
          <el-table-column
            label="值机时间"
            prop="name"
            width="120">
          </el-table-column> -->
          <!-- <el-table-column
            label="证件种类"
            prop="cardTypeName"
            sortable
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column
            label="证件号码"
            prop="passportNo"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="签证种类"
            prop="visaTypeName"
            sortable
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班日期"
            prop="fltDate"
            width="101"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机日期"
            prop="createTime"
            width="101"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出发站"
            prop="cityfrom"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="目的站"
            prop="cityto"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="是否非法载运人员"
            prop="illegalMan"
            width="60">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.illegalMan==0">否</span>
                <span v-if="scope.row.illegalMan==1">是</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="是否重点关注人员"
            prop="focusMan"
            width="60">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.focusMan==0">否</span>
                <span v-if="scope.row.focusMan==1">是</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="是否已办理出入境手续"
            prop="eeflag"
            width="60">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.focusMan==0">否</span>
                <span v-if="scope.row.focusMan==1">是</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="操作">
          </el-table-column> -->
        </el-table>
        <el-table
          class="mt-10 o-table3"
          v-show="pd.type==3"
          :data="tableData"
          border
          @row-click="rowClick"
          @header-click="headerClick"
          style="width: 100%;">
          <el-table-column
            label="订票姓名"
            prop="bkname"
            sortable
            width="105"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票性别"
            prop="bkgender"
            width="65"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.bkgender=='F'">女</span>
                <span v-if="scope.row.bkgender=='M'">男</span>
                <span v-if="scope.row.bkgender=='U'">未知</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="订票证号"
            prop="bkcardnum"
            sortable
            width="105"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票国籍/地区"
            prop="bknationality"
            sortable
            width="106"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票出生日期"
            prop="bkbirthday"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票航班"
            prop="bkfltno"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票航班日期"
            prop="bkfltdate"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订票电子客票号"
            prop="rci"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订单创建时间"
            prop="rcitime"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机姓名"
            prop="chkname"
            sortable
            width="105"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机性别"
            prop="chkgender"
            width="65"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.chkgender=='F'">女</span>
                <span v-if="scope.row.chkgender=='M'">男</span>
                <span v-if="scope.row.chkgender=='U'">未知</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="值机证号"
            prop="chkcardnum"
            sortable
            width="105"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机国籍/地区"
            prop="chknationality"
            sortable
            width="106"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机出生日期"
            prop="chkbirthday"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机航班"
            prop="chkfltno"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机航班日期"
            prop="chkfltdate"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机电子客票号"
            prop="tktnumber"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="值机时间"
            prop="chktime"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="登机时间"
            prop="clstime"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="入出境时间"
            prop="eetime"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
        <el-table
          class="mt-10 o-table3"
          v-show="pd.type==4"
          :data="tableData"
          border
          @row-click="rowClick"
          @header-click="headerClick"
          style="width: 100%;">
          <el-table-column
            label="姓"
            prop="traveller_surname_tkt"
            sortable
            width="70"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="名"
            prop="traveller_given_name_tkt"
            sortable
            width="70"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            width="65"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.gender=='F'">女</span>
                <span v-if="scope.row.gender=='M'">男</span>
                <span v-if="scope.row.gender=='U'">未知</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthdate"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="国籍/地区"
            prop="passportissuecountry"
            sortable
            width="106"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="证号"
            prop="passportno"
            sortable
            width="105"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="电子客票号"
            prop="tktnumber"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="计划起飞时间"
            prop="departdate"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            label="计划到达时间"
            prop="arrivdate"
            sortable
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出发地"
            prop="last_departure_airport"
            sortable
            width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="目的地"
            prop="first_arrival_airport"
            width="100"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="订单时间"
            prop="rcitime"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="座位号"
            prop="specifigseat"
            sortable
            width="106"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="舱位"
            prop="carbinclassdesignator"
            sortable
            width="101"
            :show-overflow-tooltip="true">
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
        <div class="ry3" v-show="pd.type==3">
          <div class="title-grey">
            人员监控列表
          </div>
          <el-table
            :data="tableData2"
            style="width: 481px"
            class="table2"
            border>
            <el-table-column
              label="姓名"
              prop="name"
              width="110">
            </el-table-column>
            <el-table-column
              label="证件号码"
              prop="passno"
              width="200">
            </el-table-column>
            <el-table-column
              label="国籍/地区"
              prop="nationalityName"
              width="110">
            </el-table-column>
            <el-table-column
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button type="text" class="a-btn" icon="el-icon-delete"  title="删除" @click="delMonitorPerson(scope.row.serial)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="success" size="mini" class="addbtn" @click="addDialogVisible=true">添加</el-button>

        </div>
      </div>

    </div>
    <!-- <div class="down ry3">
      <div class="title-grey">
        人员监控列表
      </div>
      <el-table
        :data="tableData2"
        style="width: 481px"
        class="table2"
        border>
        <el-table-column
          label="姓名"
          prop="name"
          width="110">
        </el-table-column>
        <el-table-column
          label="证件号码"
          prop="passno"
          width="200">
        </el-table-column>
        <el-table-column
          label="国籍/地区"
          prop="nationalityName"
          width="110">
        </el-table-column>
        <el-table-column
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" icon="el-icon-delete"  title="删除" @click="delMonitorPerson(scope.row.serial)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="success" size="mini" class="addbtn" @click="addDialogVisible=true">添加</el-button>

    </div> -->
    <el-dialog title="列表追加" :visible.sync="addDialogVisible" width="640px" :before-close="handleClose">
      <el-form :model="addform" ref="addForm" label-width="100px" style="width:520px">
          <el-form-item label="姓名：" prop="name">
            <el-input placeholder="请输入内容" size="small" v-model="addform.name" auto-complete="off" style="display:none"></el-input>
            <el-input placeholder="请输入内容" size="small" v-model="addform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：" prop="passno">
            <el-input placeholder="请输入内容" size="small" v-model="addform.passno" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="国籍/地区：" prop="nationality">
            <!-- <el-input placeholder="请输入内容" size="small" v-model="addform.nationality" auto-complete="off"></el-input> -->
            <el-select v-model="addform.nationality" placeholder="请选择"  size="small" clearable filterable style="width:100%">
              <el-option
                v-for="item in nationAlone"
                :key="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMonitorPerson" size="small">确认</el-button>
        <el-button type="warning" @click="cancelAdd" size="small">取消</el-button>

      </div>
    </el-dialog>

    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <el-form :model="dform" ref="detailsForm">
        <div class="hrtitle">基本信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍/地区：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件颁发国：</div><div class="t-el-sub">{{dform.PASSPORTISSUECOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dform.PASSPORTEXPIREDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件签发日期：</div><div class="t-el-sub">{{dform.PASSPORTISSUEDATESTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生国：</div><div class="t-el-sub">{{dform.BIRTHCOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">居住国：</div><div class="t-el-sub">{{dform.RESIDENCENAME}}</div></el-col>
        </el-row>
        <div class="hrtitle">航班信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计起飞时间：</div><div class="t-el-sub">{{dform.DEPARTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计到达时间：</div><div class="t-el-sub">{{dform.ARRIVDATESTR}}</div></el-col>

        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">原预检结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">最终预检结果：</div><div class="t-el-sub">{{dform.LASTCHECKRESULTSTR}}</div></el-col>
          <!-- <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col> -->
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班状态：</div><div class="t-el-sub">{{dform.FLIGHTSTATUSSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班起飞时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEUPSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班取消时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEDOWNSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">降落口岸：</div><div class="t-el-sub">{{dform.PORTSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
        </el-row>
        <div class="hrtitle">其他信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ICS记录编号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客状态：</div><div class="t-el-sub">{{dform.PASSENGERSTATUSSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否报警：</div><div class="t-el-sub">{{dform.ISEVENT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ABO唯一标识：</div><div class="t-el-sub">{{dform.ABONO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件号码：</div><div class="t-el-sub">{{dform.OTHER_NO}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件有效期：</div><div class="t-el-sub">{{dform.OTHER_EXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件颁发国：</div><div class="t-el-sub">{{dform.OTHER_ISSUECOUNTRYSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件签发日期：</div><div class="t-el-sub">{{dform.OTHERDOCUMENTISSUEDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证号码：</div><div class="t-el-sub">{{dform.VISANO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证有效期：</div><div class="t-el-sub">{{dform.VISAEXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证国家：</div><div class="t-el-sub">{{dform.VISAISSUECOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证签发日期：</div><div class="t-el-sub">{{dform.VISAISSUEDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dform.ORIGINSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地地址：</div><div class="t-el-sub">{{dform.DESTADDRESS}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地城市：</div><div class="t-el-sub">{{dform.DESTCITY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的的所在省：</div><div class="t-el-sub">{{dform.DESTSTATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地国家：</div><div class="t-el-sub">{{dform.DESTCOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地邮编：</div><div class="t-el-sub">{{dform.DESTPOSTALCODE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检接收时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检回复时间：</div><div class="t-el-sub">{{dform.IAPI_RESPONSETIMESTR}}</div></el-col>
        </el-row>
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性名：</div><div class="t-el-sub">{{check.FIELDNAME}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性值：</div><div class="t-el-sub">{{check.FIELDVALUES}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">是否必填：</div><div class="t-el-sub">{{check.INPUT}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最小长度：</div><div class="t-el-sub">{{check.MINLENGTH}}</div></el-col>
          </el-row>

          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最大长度：</div><div class="t-el-sub">{{check.MAXLENGTH}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">正则表达式：</div><div class="t-el-sub">{{check.REGULAR}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">错误描述：</div><div class="t-el-sub">{{check.DETAIL}}</div></el-col>
          </el-row>
        </div>

        <!-- 名单比中详情 -->
        <div class="" v-show="isName">
          <div class="hrtitle">名单比中详情</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">
              <el-button type="primary" plain name="button"  size="mini" @click="reviewDetail">查看评价详情</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 业务规则校验不通过 -->
        <div class="" v-show="isRules">
          <div class="hrtitle">业务规则校验不通过</div>
          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">规则名称：</div><div class="t-el-sub">{{rules.MATCHRRULE}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">返回状态：</div><div class="t-el-sub">{{rules.STATUS}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">错误详情：</div><div class="t-el-sub">{{rules.CHECKREMARK}}</div></el-col>
          </el-row>
        </div>
        <!-- PNR预报警 -->
        <div class="" v-show="isCall">
          <div class="hrtitle">PNR预报警</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">
              <el-button type="primary" plain name="button"  size="mini" @click="reviewCallDetail">查看PNR预报警详情</el-button>
            </el-col>
          </el-row>
        </div>

        <div class="hrtitle" style="margin-bottom:10px">历史值机信息</div>
        <el-table
          :data="detailstableData"
          border
          style="width: 100%;">
          <el-table-column
            prop="NAME"
            label="姓名"
            width="100"
            sortable>
          </el-table-column>
          <el-table-column
            label="性别"
            sortable
            width="80">
          <template slot-scope="scope">
            {{scope.row.GENDER | fiftersex}}
          </template>
          </el-table-column>
          <el-table-column
            prop="DATEOFBIRTH"
            label="出生日期"
            sortable
            width="130">
          </el-table-column>
          <el-table-column
            prop="NATIONALITYC"
            label="国籍/地区"
            sortable>
          </el-table-column>

          <el-table-column
            prop="PASSPORTNO"
            label="证件号码"
            sortable
            width="130">
          </el-table-column>

          <el-table-column
            prop="FLTNO"
            label="航班号"
            width="120"
            sortable>
          </el-table-column>
          <el-table-column
            prop="SCHEDULEDEPARTURETIME"
            label="航班日期"
            sortable
            width="140">
          </el-table-column>

          <el-table-column
            label="预检结果"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULT | fiftecr}}
            </template>
          </el-table-column>
          <el-table-column
            label="报警信息"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.row.STATUS | fifterbj}}
            </template>
          </el-table-column>

        </el-table>
        <div class="middle-foot">
          <div class="page-msg">
            <div class="">
              共{{htotalPage}}页
            </div>
            <div class="">
              每页
              <el-select v-model="hshowCount" @change="hpageSizeChange(hshowCount)" placeholder="10" size="mini" class="page-select">
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
              共{{htotalResult}}条
            </div>
          </div>
          <el-pagination
            background
            @current-change="hhandleCurrentChange"
            :page-size="hshowCount"
            layout="prev, pager, next"
            :total="htotalResult">
          </el-pagination>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="事件文档"
      :visible.sync="queryDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>

    <el-dialog
      title="PNR预报警详情"
      :visible.sync="pnrDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>

  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
export default {
  components: {AlarmProcess},
  data(){
    return{
      tableData:null,
      tableData2:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,

      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数

      pd:{type:'0',fltDateFr:'',fltDateTo:''},
      airport:null,
      nationAlone:null,
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
      checked:true,
      addDialogVisible:false,
      addform:{},

      historyCdt:{},
      queryDialogVisible: false,
      pnrDialogVisible:false,
      detailsDialogVisible:false,
      detailstableData:[],
      dform:{},
      rules:{},
      check:{},
      isCheck:false,
      isName:true,
      isRules:true,
      isCall:false,
      eve:'',
      pnrEve:'',
      nav1Id:null,
      nav2Id:null,
      timer:null
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    let end = new Date();
    let begin = new Date(end - 24*60*60*1000);
    this.pd.fltDateFr= formatDate(begin, 'yyyyMMdd');
    this.pd.fltDateTo= formatDate(end, 'yyyyMMdd');
    this.queryNationalityAlone();
  },
  activated(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    this.getList2();
    this.getList(this.CurrentPage,this.pageSize,this.pd);

    if(this.checked){
      let that=this;
      this.timer=setInterval(function(){
        that.getList(that.CurrentPage,that.pageSize,that.pd);
      },60000)
    }

  },
  deactivated(){
　　clearInterval(this.timer)
  },
  watch:{
    checked:function(val){
      console.log(val)
      if(val){
        let that=this;
        this.timer=setInterval(function(){
          that.getList(that.CurrentPage,that.pageSize,that.pd);
        },60000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  filters: {
    fiftersex(val) {
      if (val == "F") {
        return "女"
      } else if (val == "M") {
        return "男"
      } else if (val == "U") {
        return "未知"
      }
    },
    fiftecr(val) {
      if (val == "0Z") {
        return "允许打印登机牌";
      } else if (val == "1Z") {
        return "禁止打印登机牌";
      } else if (val == "2Z") {
        return "请再次核对";
      } else {
        return "数据错误";
      }
    },
    fifterbj(val) {
      if (val == "1") {
        return "产生报警";
      } else {
        return "未产生报警";
      }
    },
  },
  methods:{
    checkTab(type){
      this.pd.type=type;
      this.tableData=null;
      this.CurrentPage=1;
      this.pageSize=10;
      this.TotalResult=0;
      this.getList(this.CurrentPage,this.pageSize,this.pd);

    },
    pageSizeChange(val) {
      this.pageSize=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      this.getList(this.CurrentPage,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },

    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    getHistoryList(hcurrentPage,hshowCount,historyCdt){
      let gh = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"pd":historyCdt
      };
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',gh,
      r =>{
        this.detailstableData = r.data.pdList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },

    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
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
    cancelAdd(){
      this.$refs['addForm'].resetFields();
      this.addDialogVisible=false;
    },
    handleClose(done) {
      this.$refs['addForm'].resetFields();
      done();
    },
    getList(CurrentPage,showCount,pd){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "totalResult": this.TotalResult,
        "pd": pd
      }
      this.$api.post('/manage-platform/travelerRealTime/queryRealTimePage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
    getList2(){
      this.$api.post('/manage-platform/travelerRealTime/queryMonitorPerson',{},
       r => {
         this.tableData2=r.data;
         this.getList(this.CurrentPage,this.pageSize,this.pd);

      })
    },
    addMonitorPerson(){
      this.$api.post('/manage-platform/travelerRealTime/addMonitorPerson',this.addform,
       r => {
         if(r.success){
           this.$message({
             type: 'success',
             message: '添加成功!'
           });
           this.$refs['addForm'].resetFields();
           this.addDialogVisible=false;
           this.getList2();
         }
      })
    },
    delMonitorPerson(serial){
      this.$confirm('确定删除吗?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.$api.post('/manage-platform/travelerRealTime/delMonitorPerson',{	"serial": serial},
          r => {
            if(r.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList2();
            }
         })

       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

    },
    reviewCallDetail(){//查看PNR预报警详情
      this.pnrDialogVisible = true;
      let cc={
        "event":this.pnrEve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',cc,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.pnrEve,type:0,isZDGZ:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }else if(r.data == false){
           this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
             confirmButtonText: '确定',
             type: 'warning'
           })
           // this.$router.push({query:{eventserial:this.pnrEve,type:1,isZDGZ:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }
       })
    },
    reviewDetail(){//名单比重详情
      this.queryDialogVisible = true;
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.eve,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }else if(r.data == false){
           this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
             confirmButtonText: '确定',
             type: 'warning'
           })
           // this.$router.push({query:{eventserial:this.eve,type:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }
       })
    },
    headerClick(column,event){
      console.log(column,event)
      event.target.title=column.label
    },
    rowClick(item){
      this.historyCdt.NATIONALITY = item.nationality;
      this.historyCdt.PASSPORTNO = item.passportNo;
      this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
      this.$api.post('/manage-platform/iapi/queryIapiInfo',{serial:item.serial},
       r =>{
         if(r.success){
           this.detailsDialogVisible = true;

           this.dform = r.data.IAPI;
           if(r.data.hasOwnProperty('CHECKDATA') == false){
             this.isCheck = false;
           }else{
             this.isCheck = true;
             this.check = r.data.CHECKDATA;
           }

           if(r.data.hasOwnProperty('RULELIST') == false){
             this.isRules = false;
           }else{
             this.isRules = true;
             this.rules = r.data.RULELIST;
           }

           if(r.data.hasOwnProperty('EVENT') == false){
             this.isName = false;
           }else{
             this.isName = true;
             this.eve = r.data.EVENT;
           }

           if(r.data.hasOwnProperty('PNREVENT') == false){
             this.isCall = false;
           }else{
             this.isCall = true;
             this.pnrEve = r.data.PNREVENT;
           }
         }
       })

    },
  }
}
</script>

<style scoped>
/* .middle {
  background: none;
  padding: 0;
} */
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
.ry3{
  position: relative;
}
.addbtn{
  position: absolute;
  left:505px;
  top:63px
}
</style>
