<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <QueryNationality   :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">证件种类：</span>
              <QueryDocCode  :docCodeModel="pd.CARDTYPE" @transDocCode="getDocCode"></QueryDocCode>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" clearable class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">名单状态：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.SYN_STATUS" clearable filterable class="input-input">
                <el-option label="1 - 已发布" value="1"></el-option>
                <el-option label="0 - 未发布" value="0"></el-option>
                <!-- <el-option label="" value="1"></el-option> -->
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME" clearable class="input-input"></el-input>

            </el-col>
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">性別：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="M - 男" value="M"></el-option>
                <el-option label="F - 女" value="F"></el-option>
                <el-option label="U - 未知" value="U"></el-option>

              </el-select>
            </el-col>
            <!--
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
                size="small"
                v-model="pd.BIRTHDATE"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="input-input block">
              </el-date-picker>
            </el-col>
            -->
            <!-- <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO"  class="input-input"></el-input> -->
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="pd.BIRTHDATESTART"
                     type="date" size="small" value-format="yyyyMMdd"
                     placeholder="开始时间" align="right" >
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.BIRTHDATESTARTEND"
                      type="date" size="small" align="right" value-format="yyyyMMdd"
                      placeholder="结束时间" >
                  </el-date-picker>
              </div>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">出入境类型：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.IN_OUT" clearable filterable class="block input-input">
                <el-option label="2 - 全部" value="2"></el-option>
                <el-option label="1 - 出境" value="1"></el-option>
                <el-option label="0 - 入境" value="0"></el-option>
              </el-select>
            </el-col>
            <!--
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">入境口岸：</span>
              <el-select placeholder="请选择"  size="small"  class="input-input">
                <el-option label="北京首都机场" value="1"></el-option>
                <el-option label="上海虹桥机场" value="0"></el-option>
              </el-select>
            </el-col>
            -->
            <!--
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <QueryNationality   :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
            </el-col>
          -->
            <!--
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">入境口岸：</span>
              <el-select v-model="pd.stationfromEqual" filterable @visible-change="queryAirport" placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in Airport"
                   :key="item.AIRPORT_CODE"
                   :label="item.AIRPORT_NAME"
                   :value="item.AIRPORT_CODE" >
                 </el-option>
               </el-select>
            </el-col>
          -->
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">入境口岸：</span>
              <QueryAirport  :airportModel="pd.WHITE_PORT_IN" @transAirport="getInAirport"></QueryAirport>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">出境口岸：</span>
              <!--
              <el-select  placeholder="请选择"  size="small"  class="input-input">
                <el-option label="北京首都机场" value="1"></el-option>
                <el-option label="上海虹桥机场" value="0"></el-option>
              </el-select>
              -->
              <QueryAirport  :airportModel="pd.WHITE_PORT_OUT" @transAirport="getOutAirport"></QueryAirport>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">操作时间：</span>
              <div class="input-input t-flex t-date">
                 <el-date-picker
                   v-model="pd.CREATETIMESTART"
                   type="date" size="small" value-format="yyyyMMdd"
                   placeholder="开始时间" align="right" >
                 </el-date-picker>
                 <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd.CREATETIMEEND"
                    type="date" size="small" align="right" value-format="yyyyMMdd"
                    placeholder="结束时间"  >
                </el-date-picker>
            </div>
            <!--
              <el-date-picker
                size="small"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="input-input block">
              </el-date-picker>
              -->
              <!-- <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO"  class="input-input"></el-input> -->
            </el-col>
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">生效时间：</span>
              <div class="input-input t-flex t-date">
                 <el-date-picker
                   v-model="pd.CTL_BEGINDATE"
                   type="date" size="small" value-format="yyyyMMdd"
                   placeholder="开始时间" align="right" >
                 </el-date-picker>
                 <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd.CTL_EXPIREDATE"
                    type="date" size="small" align="right" value-format="yyyyMMdd"
                    placeholder="结束时间" >
                </el-date-picker>
            </div>
              <!--
              <el-date-picker
                size="small"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="input-input block">
              </el-date-picker>
              -->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15" v-if="getHis">
        <el-button type="primary" size="small" @click="addDialogVisible=true;dialogText='新增';dialogType='add';form={}">新增</el-button>
        <el-button type="success" size="small" @click="uploadDialogVisible=true">批量导入</el-button>
        <!-- <el-upload
          class="upload-demo"
          name="file"
          action="http://localhost:8080/manage-platform/nameList/readExcel"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">批量导入</el-button> -->
        </el-upload>
        <el-button type="info" size="small" @click="dialogType='dels';releaseDialogVisible=true">批量删除</el-button>
        <el-button type="warning" size="small" @click="releaseDialogVisible=true;dialogType='syn'">生效发布</el-button>
        <el-button type="danger" size="small" @click="getHisFn(currentPage,pageSize,pd)">历史资料</el-button>
        <el-button type="success" size="small">模板下载</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width:100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
         fixed
         type="selection">

        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="RECORDNUM"
          label="档号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          sortable
          label="国籍">

        </el-table-column>
        <el-table-column
          prop="CARDTYPE"
          label="证件种类">
        </el-table-column>
        <el-table-column
          prop="CARDNO"
          sortable
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="FAMILYNAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="BIRTHDATE"
          label="出生日期">
        </el-table-column>
        <!-- <el-table-column
          prop="CTL_BEGINDATE"
          label="开始日期">
        </el-table-column> -->
        <el-table-column
          prop="CTL_EXPIREDATE"
          label="失效日期">
        </el-table-column>

        <el-table-column
          label="操作"
          width="240">
          <template slot-scope="scope">
            <div class="flex-r">
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="update(scope.row)" v-if="scope.row.SYN_STATUS==0&&getHis">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deleteItem(scope.row.SERIAL,scope.row.SYN_STATUS)" v-if="getHis">删除</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row.SERIAL)">详情</el-button>
            </div>
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

    <el-dialog :title="dialogText" :visible.sync="addDialogVisible"   width="60%">
      <el-form :model="form" ref="addForm">
        <el-row  class="mb-6" align="center">
          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>国籍：</span>
            <el-select v-model="form.NATIONALITY" filterable @visible-change="queryNationalityAlone" placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="item in nationAlone"
                :key="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          
          </el-col>
          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>证件种类：</span>
            <QueryDocCode  :docCodeModel="form.CARDTYPE" @transDocCode="getDocCodeForm"></QueryDocCode>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>控制类型：</span>
            <el-select v-model="form.PERSON_TYPE" placeholder="请选择"  size="small"  class="input-input">
              <el-option label="外国人" value="0"></el-option>
              <el-option label="中国人" value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.CARDNO"  class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>证件有效期：</span>
            <el-date-picker
              size="small" value-format="yyyyMMdd"
              v-model="form.CARDEXPIREDATE"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FAMILYNAME"  class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>性别：</span>
            <el-select v-model="form.GENDER" placeholder="请选择"  size="small"  class="input-input">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="U"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>出生日期：</span>
            <el-date-picker
              size="small" value-format="yyyyMMdd"
              v-model="form.BIRTHDATE"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>原因严重性：</span>
            <el-select v-model="form.CTL_REASONLEVEL" placeholder="请选择"  size="small"  class="input-input">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>出入境类型：</span>
            <el-select v-model="form.IN_OUT" placeholder="请选择"  size="small"  class="input-input">
              <el-option label="出境" value="1"></el-option>
              <el-option label="入境" value="0"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>生效日期：</span>
            <el-date-picker
              size="small"
              v-model="form.CTL_BEGINDATE" value-format="yyyyMMdd"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text"><span class="redx">*</span>失效日期：</span>
            <el-date-picker
              size="small"
              v-model="form.CTL_EXPIREDATE" value-format="yyyyMMdd"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">入境口岸：</span>
            <QueryAirport  :airportModel="form.WHITE_PORT_IN" @transAirport="getInAirportForm"></QueryAirport>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">出境口岸：</span>
            <QueryAirport  :airportModel="form.WHITE_PORT_OUT" @transAirport="getOutAirportForm"></QueryAirport>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FLTNO" class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="input-text">交控单位：</span>
            <QueryAirport  :airportModel="form.SUBORG_CODE" @change="changeForm(this)" @transAirport="getSuborgCodeForm"></QueryAirport>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">联系方式：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.SUBORG_CONN" class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="input-text">处理依据：</span>
            <el-input placeholder="请输入内容" size="small" class="input-input" v-model="form.CTL_REASON"></el-input>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm','0')" size="small">保存</el-button>
        <el-button type="warning" @click="releaseDialogVisible=true" size="small">保存并发布</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>

      </div>
    </el-dialog>

    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="950px">
      <div class="detail-msg-text">
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>姓名</span>
            {{detailsData.FAMILYNAME}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>性别</span>
            <a v-if="detailsData.GENDER=='M'">男</a>
            <a v-if="detailsData.GENDER=='F'">女</a>
            <a v-if="detailsData.GENDER=='U'">未知</a>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出生日期</span>
            {{detailsData.BIRTHDATE}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>国籍</span>
          {{detailsData.NATIONALITY}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>证件号码</span>
            {{detailsData.CARDNO}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>原因严重性</span>
            {{detailsData.CTL_REASONLEVEL}} <span>级</span>

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出入标识</span>
            <a v-if="detailsData.IN_OUT=='1'">入境</a>
            <a v-if="detailsData.IN_OUT=='0'">出境</a>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>起始控制日期</span>
            {{detailsData.CTL_BEGINDATE}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>终止控制日期</span>
            {{detailsData.CTL_EXPIREDATE}}

          </el-col>

        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班号</span>
          {{detailsData.FLTNO}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>入境口岸</span>
            {{detailsData.WHITE_PORT_IN}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出境口岸</span>
            {{detailsData.WHITE_PORT_OUT}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>交控单位</span>
            {{detailsData.SUBORG_CODE}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>联系电话</span>
            {{detailsData.SUBORG_CONN}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>控制类型</span>
            <a v-if="detailsData.PERSON_TYPE=='0'">外国人</a>
            <a v-if="detailsData.PERSON_TYPE=='1'">中国人</a>

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row mb-20">
          <el-col :sm="24" :md="12" :lg="16" >
            <span>处理依据</span>
          {{detailsData.CTL_REASON}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="5">
            <span>操作人</span>
            {{detailsData.CREATEUSER}}

          </el-col>
          <el-col :span="5">
            <span>审批人</span>
            {{detailsData.APPRVOUSER}}

          </el-col>
          <el-col :span="6">
            <span>操作时间</span>
            {{detailsData.CREATETIME}}

          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="detailsDialogVisible = false" size="small">关闭页面</el-button>
      </span>
    </el-dialog>

    <el-dialog title="生效发布" :visible.sync="releaseDialogVisible"   width="640px">
      <el-form :model="releaseform" ref="releaseForm">
        <el-row type="flex"  class="mb-9" justify="center">
          <!-- <el-col :sm="24" :md="12" :lg="8"  class="input-item"> -->
            <span class="input-text">用户名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="releaseform.user"></el-input>

          <!-- </el-col> -->

        </el-row>
        <el-row type="flex"  class="mb-6" justify="center">
          <!-- <el-col :sm="24" :md="12" :lg="8"  class="input-item"> -->
            <span class="input-text">口令： </span>
            <el-input placeholder="请输入内容" size="small" v-model="releaseform.pwd" type="password"></el-input>
          <!-- </el-col> -->
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('releaseForm','1')" size="small">授权确认</el-button>
        <el-button type="warning" @click="releaseDialogVisible = false" size="small">重置</el-button>

      </div>
    </el-dialog>
    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"   width="640px">
      <el-form :model="releaseform" ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://192.168.99.242:8080/manage-platform/nameList/readExcel/1"
          :file-list="fileList"
          multiple

          :limit="5"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>

      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('releaseForm','1')" size="small">授权确认</el-button>
        <el-button type="warning" @click="uploadDialogVisible = false" size="small">重置</el-button>
      </div> -->
    </el-dialog>
  </div>

</template>

<script>
import QueryNationality from '../../other/queryNationality'
import QueryAirport from '../../other/queryAirport'
import QueryDocCode from '../../other/queryDocCode'
export default {
  components: {QueryNationality,QueryAirport,QueryDocCode},
  data(){
    return{
      nationAlone:[],
      getHis:true,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      isdisable:true,
      detailsData:{},
      pd:{"LIST_TYPE":"1"},
      dialogText:"新增",
      dialogType:"add",
      delId:0,
      nation:[],
      docCode:[],
      addDialogVisible:false,
      detailsDialogVisible:false,
      releaseDialogVisible:false,
      uploadDialogVisible:false,
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
      tableData: [
        {
        }
      ],
      multipleSelection: [],
      form: {
        "synStatus":"0",
    	  "LIST_TYPE":"1",
        NATIONALITY:""
        },
      releaseform:{
        user:"",
        pwd:""
      },
      formLabelWidth: '120px',
      fileList:[]
    }
  },
  mounted(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryNationalityAlone()
  },
  computed:{
    NATIONALITYcode(){
      return this.form.NATIONALITY.split('-')[0]
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length==0){
        this.isdisable=true;
      }else{
        this.isdisable=false;

      }
      console.log(val)
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
    },
    getInAirport(msg){
      this.pd.WHITE_PORT_IN=msg;
    },
    getNationForm(msg){
      this.form.NATIONALITY=msg;
    },
    getInAirportForm(msg){
      this.form.WHITE_PORT_IN=msg;
    },
    changeForm(item){
      this.form.aaa=item.label;
      this.form.bbbb=item.value;
    },
    getOutAirport(msg){
      this.pd.WHITE_PORT_OUT=msg;
    },
    getDocCode(msg){
      this.pd.CARDTYPE=msg;
    },
    getOutAirportForm(msg){
      this.form.WHITE_PORT_OUT=msg;
    },
    getSuborgCodeForm(msg){
      this.form.SUBORG_CODE=msg;
    },
    getDocCodeForm(msg){
      this.form.CARDTYPE=msg;
    },
    getList(currentPage,showCount,pd){
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"pd":pd
      };
      console.log(pd)
      this.$api.post('/manage-platform/nameList/getNameListPage',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nationAlone=r.data;
           this.$emit('transNationAlone',this.NATIONALITY)
         }
      })
    },
    getHisFn(currentPage,showCount,pd){
      this.tableData={};
      this.TotalResult=0;
      this.getHis=false;
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };
      console.log(pd)
      this.$api.post('/manage-platform/nameListHis/getNameListHisPage',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    update(item){
      console.log(item)
      this.addDialogVisible=true;
      this.form=item;
      this.dialogType="update";
      this.dialogText="编辑"
    },


    details(i){
      this.detailsDialogVisible=true;
      console.log(i);
      this.$api.post('/manage-platform/nameList/getNameListData',{serial:i},
       r => {
         console.log(r);
         this.detailsData=r.data;
         // this.tableData=r.Data.ResultList;
      })
    },
    deleteItem(id,synStatus) {
      this.dialogType="del";
      this.delId=id;
      if (synStatus=="1") {
        this.releaseDialogVisible=true;
      }else {
          let p={
            SERIAL:this.delId,
            synStatus:synStatus
          }
          this.$api.post('/manage-platform/nameList/deleteNameList',p,
           r => {
             if(r.success){
               this.$message({
                 message: '删除成功',
                 type: 'success'
               });
               this.releaseDialogVisible=false;
               this.getList(this.CurrentPage,this.pageSize,this.pd);
             }else{
               this.$message.error(r.message);
             }
          })
      }
      },
      queryDocCode(){
        this.$api.post('/manage-platform/codeTable/queryDocCode',{},
         r => {
           console.log(r);
           if(r.success){
             this.docCode=r.data;
             this.$emit('transNation',this.pd.docCode)
           }
        })
      },
      addItem(formName,synStatus){
        // this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //       console.log(valid)
        //       alert('submit!');
        //     } else {
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
        if(synStatus==0 && this.dialogType=="add"){
          this.form.synStatus=synStatus;
          this.form.LIST_TYPE='1';
          this.$api.post('/manage-platform/nameList/addNameList',this.form,
           r => {
             console.log(r);
             if(r.success){
               this.$message({
                 message: '恭喜你，添加成功！',
                 type: 'success'
               });
             }else{
               this.$message.error(r.message);
             }
            this.$refs[formName].resetFields();
            this.addDialogVisible=false;
            this.getList(this.CurrentPage,this.pageSize,this.pd);
          },e=>{
            this.$message.error('失败了');
          })
        }else {
          if(this.dialogType=="add"){
            this.form.synStatus=synStatus;
            this.form.LIST_TYPE='1';
            this.form.AUTHORIZEDUSER=this.releaseform.user;
            this.form.AUTHORIZEDPASSWORD=this.releaseform.pwd;
            this.$api.post('/manage-platform/nameList/addNameList',this.form,
             r => {
               console.log(r);
               if(r.success){
                 this.$message({
                   message: '恭喜你，添加成功！',
                   type: 'success'
                 });
               }else{
                 this.$message.error(r.message);
               }
              this.$refs[formName].resetFields();
              this.addDialogVisible=false;
              this.getList(this.CurrentPage,this.pageSize,this.pd);
            },e=>{
              this.$message.error('失败了');
            })
          }else if(this.dialogType=="update"){
            this.form.LIST_TYPE='1';
            this.form.synStatus=synStatus;
            this.form.AUTHORIZEDUSER=this.releaseform.user;
            this.form.AUTHORIZEDPASSWORD=this.releaseform.pwd;
            this.$api.post('/manage-platform/nameList/updateNameList',this.form,
             r => {
               console.log(r);
               if(r.success){
                 this.$message({
                   message: '恭喜你，添加成功！',
                   type: 'success'
                 });
               }else{
                 this.$message.error(r.message);
               }
              this.$refs[formName].resetFields();
              this.addDialogVisible=false;
              this.releaseDialogVisible=false;
              this.getList(this.CurrentPage,this.pageSize,this.pd);
            },e=>{
              this.$message.error('失败了');
            })
          }else if(this.dialogType=="del"){
              let p={
                LIST_TYPE : "1",
                SERIAL:this.delId,
                AUTHORIZEDUSER:this.releaseform.user,
                AUTHORIZEDPASSWORD:this.releaseform.pwd,
                synStatus:synStatus
              }
              this.$api.post('/manage-platform/nameList/deleteNameList',p,
               r => {
                 if(r.success){
                   this.$message({
                     message: '删除成功',
                     type: 'success'
                   });
                   this.releaseDialogVisible=false;
                   this.getList(this.CurrentPage,this.pageSize,this.pd);


                 }else{
                   this.$message.error(r.message);
                 }
              })
          }else if(this.dialogType=="dels"){
            let arr= this.multipleSelection;
            let arr1=[];
            for(var i in arr){
              arr1.push(arr[i].SERIAL)
            }
            let p={
              pd:{
                AUTHORIZEDUSER:this.releaseform.user,
                AUTHORIZEDPASSWORD:this.releaseform.pwd,
                LIST_TYPE : "1"
              },
              cdtList:arr1

            }
            this.$api.post('/manage-platform/nameList/deleteNameListAll',p,
             r => {
               if(r.success){
                 this.$message({
                   message: '删除成功',
                   type: 'success'
                 });
                 this.releaseDialogVisible=false;
                 this.getList(this.CurrentPage,this.pageSize,this.pd);

               }else{
                 this.$message.error(r.message);
               }
            })
          }else if(this.dialogType=="syn"){
            let arr= this.multipleSelection;
            let arr1=[];
            for(var i in arr){
              arr1.push(arr[i].SERIAL)
            }
            let p={
              pd:{
                AUTHORIZEDUSER:this.releaseform.user,
                AUTHORIZEDPASSWORD:this.releaseform.pwd,
                LIST_TYPE : "1"
              },
              cdtList:arr1
            }
            this.$api.post('/manage-platform/nameList/synNameListAll',p,
             r => {
               if(r.success){
                 this.$message({
                   message: '生效发布成功',
                   type: 'success'
                 });
                 this.getList(this.CurrentPage,this.pageSize,this.pd);
               }else{
                 this.$message.error(r.message);
               }
                this.releaseDialogVisible=false;
            })
          }
        }


      },
      submitUpload() {
       this.$refs.upload.submit();
     },

  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.detail-msg-row{
  color: #999;
  line-height: 32px;
}
.detail-msg-row span{
  color: #333;
  display: inline-block;
  width: 60px;
}
</style>
