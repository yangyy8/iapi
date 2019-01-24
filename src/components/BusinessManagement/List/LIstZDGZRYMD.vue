<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件种类：</span>
              <el-select v-model="pd.CARDTYPE"  filterable clearable  placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in docCode"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.NAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" clearable class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" size="small" max="35" v-model="pd.FAMILYNAME" clearable class="input-input"></el-input>
              <el-checkbox v-model="pd.NAMELIKE" true-label="1" false-label="0">模糊查询</el-checkbox>
              </div>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">性別：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="M - 男" value="M"></el-option>
                <el-option label="F - 女" value="F"></el-option>
                <el-option label="U - 未知" value="U"></el-option>

              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="pd.DATEOFBIRTHSTART"
                     type="date" size="small" value-format="yyyyMMdd"
                     placeholder="开始时间" align="right" >
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.DATEOFBIRTHEND"
                      type="date" size="small" align="right" value-format="yyyyMMdd"
                      placeholder="结束时间"  >
                  </el-date-picker>
              </div>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.IN_OUT" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">关注开始时间：</span>
              <el-date-picker
                class="input-input"
                v-model="pd.BEGINDATE"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="开始时间" align="right" >
              </el-date-picker>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">关注结束时间：</span>
              <el-date-picker
                  class="input-input"
                  v-model="pd.ENDDATE"
                  type="date" size="small" align="right" value-format="yyyyMMdd"
                  placeholder="结束时间"  >
              </el-date-picker>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
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
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small" v-if="!backShow" class="mb-15" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>

          <el-button type="success" size="small" v-if="backShow" class="mb-15" @click="CurrentPage=1;getHisFn(CurrentPage,pageSize,pd)">查询</el-button>
          <el-button type="primary" class="mb-15" plain size="small" @click="reset">重置</el-button>
          <el-button type="warning" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)" v-if="backShow">返回</el-button>

        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15" v-if="!backShow">
        <el-button type="primary" size="small" @click="addServe()">新增</el-button>
        <el-button type="success" size="small" @click="showUpload">批量导入</el-button>
        <el-button type="warning" size="small" @click="deleteItems()" :disabled="isdisable">批量删除</el-button>
        <!-- <el-button type="warning" size="small" @click="releaseDialogVisible=true">生效发布</el-button> -->
        <el-button type="info" size="small" @click="getHisFn(CurrentPage,pageSize,pd)">历史资料</el-button>
        <el-button type="success" size="small" @click="download">模板下载</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width:100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
         fixed
         width="40"
         type="selection">

        </el-table-column>
        <!-- <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column> -->
        <el-table-column
          prop="RECORDNUM"
          label="档号"
          sortable
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          sortable
          label="国籍/地区"
          :show-overflow-tooltip="true">

        </el-table-column>
        <el-table-column
          prop="CARDTYPENAME"
          sortable
          label="证件种类"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="CARDNO"
          sortable
          label="证件号码"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="FAMILYNAME"
          sortable
          label="姓名"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          width="80"
          sortable
          label="性别"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.GENDER=='M'">男</span>
            <span v-if="scope.row.GENDER=='F'">女</span>
            <span v-if="scope.row.GENDER=='U'">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          sortable
          label="出生日期"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          sortable
          label="开始日期"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="ENDDATE"
          sortable
          label="失效日期"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" icon="el-icon-edit" title="编辑" @click="update(scope.row)" :disabled="backShow"></el-button>
            <el-button type="text" class="a-btn" icon="el-icon-delete"  title="删除" @click="deleteItem(scope.row.SERIAL)" :disabled="backShow"></el-button>
            <el-button type="text" class="a-btn" icon="el-icon-tickets"  title="详情" @click="details(scope.row)"></el-button>

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

    <el-dialog :title="dialogText" :visible.sync="addDialogVisible"   width="60%">
      <el-form :model="form" ref="addForm">
        <el-row  class="mb-6" align="center">

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="FAMILYNAME" data-type="input"
            v-validate-easy="[['required'],['cname']]">
            <span class="input-text"><span class="redx">*</span>姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FAMILYNAME" clearable class="input-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="GENDER" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>性别：</span>
            <el-select v-model="form.GENDER" placeholder="请选择"  size="small" clearable filterable class="input-input">
              <el-option label="M - 男" value="M"></el-option>
              <el-option label="F - 女" value="F"></el-option>
              <el-option label="U - 未知" value="U"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item my-form-group" data-scope="demo3" data-name="BIRTHDATE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>出生日期：</span>
            <el-date-picker
              size="small" value-format="yyyy-MM-dd"
              v-model="form.DATEOFBIRTH"
              type="date"
              range-separator="-"
              start-placeholder="出生日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item my-form-group" data-scope="demo3" data-name="NATIONALITY" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>国籍/地区：</span>
            <el-select v-model="form.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="item in nationAlone"
                :key="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="CARDTYPE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>证件种类：</span>
            <el-select v-model="form.CARDTYPE"  filterable clearable  placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="item in docCode"
                :key="item.CODE"
                :label="item.CODE+' - '+item.NAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="CARDNO" data-type="input"
            v-validate-easy="[['required'],['maxLength',[35]]]">
            <span class="input-text"><span class="redx">*</span>证件号码：</span>
            <el-input placeholder="请输入内容" size="small" max="35" v-model="form.CARDNO" clearable class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="VISANO" data-type="input"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>签证号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.VISANO" clearable class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="IN_OUT" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>出入境标识：</span>
            <el-select v-model="form.IN_OUT" placeholder="请选择" clearable filterable size="small"  class="input-input">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <el-option label="A - 入出境" value="A"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="BEGINDATE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>关注开始时间：</span>
            <el-date-picker
              size="small"
              v-model="form.BEGINDATE" value-format="yyyy-MM-dd"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="ENDDATE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>关注终止时间：</span>
            <el-date-picker
              size="small"
              v-model="form.ENDDATE" value-format="yyyy-MM-dd"
              type="date"
              range-separator="-"
              start-placeholder="开始日期"
              class="input-input block">
            </el-date-picker>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="other" data-name="FLTNO" data-type="input"
            v-validate-easy="[['maxLength',[7]]]">
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" clearable v-model="form.FLTNO" class="input-input"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo3" data-name="REASON" data-type="select"
            v-validate-easy="[['required']]">
            <span class="input-text"><span class="redx">*</span>出入事由：</span>
            <el-select v-model="form.REASON"  filterable clearable  placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="item in inOutReason"
                :key="item.CODE"
                :label="item.CODE+' - '+item.NAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="other" data-name="REPORTUNITNAME" data-type="input"
            v-validate-easy="[['maxLength',[35]]]">
            <span class="input-text">报列单位：</span>
            <el-input placeholder="请输入内容" size="small" class="input-input" v-model="form.REPORTUNITNAME"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="other" data-name="TEL" data-type="input"
            v-validate-easy="[['maxLength',[25]]]">
            <span class="input-text">联系电话：</span>
            <el-input placeholder="请输入内容" size="small" max="25" class="input-input" v-model="form.TEL"></el-input>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">关注类别：</span>
            <el-select v-model="form.TYPE" clearable filterable placeholder="请选择"  size="small"  class="input-input">
              <el-option label="1 - 风评高风险人员" value="1"></el-option>
              <el-option label="2 - 特殊关注对象" value="2"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">关注范围：</span>
            <el-select v-model="form.SCOPE"  filterable clearable  @change="changeForm(this)" placeholder="请选择"  size="small" class="input-input">
              <el-option
                v-for="item in airport"
                :key="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                :value="item.AIRPORT_CODE">
              </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="input-item">
            <span class="input-text">处理依据：</span>
            <el-select v-model="form.DEALTYPE" placeholder="请选择" clearable filterable size="small"  class="input-input">
              <el-option label="1 - 允许登机" value="1"></el-option>
              <el-option label="2 - 不准登机" value="2"></el-option>
            </el-select>
          </el-col>

          <el-col :span="24" class="input-item my-form-group" data-scope="other" data-name="CONTENT" data-type="input"
            v-validate-easy="[['maxLength',[1300]]]">
            <span style="line-height:32px;width:110px;text-align:right">关注内容：</span>
            <el-input placeholder="请输入内容" size="small" class="input-input" v-model="form.CONTENT"></el-input>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('add')" size="small">保存</el-button>
        <!-- <el-button type="warning" @click="releaseDialogVisible=true" size="small">保存并发布</el-button> -->
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
            <span>姓名：</span>
            {{detailsData.FAMILYNAME}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>性别：</span>
            <a v-if="detailsData.GENDER=='M'">男</a>
            <a v-if="detailsData.GENDER=='F'">女</a>
            <a v-if="detailsData.GENDER=='U'">未知</a>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出生日期：</span>
            {{detailsData.DATEOFBIRTH}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>国籍/地区：</span>
          {{detailsData.NATIONALITYNAME}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>证件号码：</span>
            {{detailsData.CARDNO}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>签证号码：</span>
            {{detailsData.VISANO}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出入标识：</span>
            <a v-if="detailsData.IN_OUT=='I'">入境</a>
            <a v-if="detailsData.IN_OUT=='O'">出境</a>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>开始时间：</span>
            {{detailsData.BEGINDATE}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>终止时间：</span>
            {{detailsData.ENDDATE}}

          </el-col>

        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班号：</span>
          {{detailsData.FLTNO}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出入事由：</span>
            {{detailsData.REASONNAME}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>关注范围：</span>
            {{detailsData.SCOPENAME}}
          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>报列单位：</span>
            {{detailsData.REPORTUNITNAME}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>联系电话：</span>
            {{detailsData.TEL}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>关注类别：</span>
            <a v-if="detailsData.TYPE=='1'">风评高风险人员</a>
            <a v-if="detailsData.TYPE=='2'">特殊关注对象</a>

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row mb-20">
          <el-col :sm="24" :md="12" :lg="16" >
            <span>关注内容：</span>
          {{detailsData.CONTENT}}

          </el-col>
        </el-row>
        <el-row type="flex" class="detail-msg-row">
          <el-col :span="5">
            <span>操作人：</span>
            {{detailsData.CREATEUSER}}

          </el-col>
          <!-- <el-col :span="5">
            <span>审批人</span>
            {{detailsData.DATEOFBIRTH}}

          </el-col> -->
          <el-col :span="6">
            <span>操作时间：</span>
            {{detailsData.CREATETIME}}

          </el-col>
          <!-- <el-col :span="6" :lg="30">
            <span>更新操作时间</span>
            {{detailsData.UPDATETIME}}

          </el-col> -->
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('releaseForm')" size="small">授权确认</el-button>
        <el-button type="warning" @click="releaseDialogVisible = false" size="small">重置</el-button>

      </div> -->
    </el-dialog>
    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"  width="640px">
      <el-form :model="releaseform" ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action='$api.rootUrl+"/manage-platform/nameListFocusList/readExcel"'
          :file-list="fileList"
          multiple
          :on-success="upSuccess"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传EXCEL文件</div>

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
export default {
  data(){
    return{
      airport:[],
      backShow:false,
      fileList:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      isdisable:true,
      detailsData:{},
      pd:{NAMELIKE:'0'},
      dialogText:"新增",
      dialogType:"add",
      delId:0,
      nation:[],
      docCode:[],
      inOutReason:[],
      nationAlone:[],
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
      tableData: [],
      multipleSelection: [],
      form: {
        "synStatus":"0",
        },
      releaseform:{
        user:"",
        pwd:""
      },
      formLabelWidth: '120px'
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryNationalityAlone();
    this.queryDocCode();
    this.queryInOutReason();
    this.queryAirport();
  },
  activated(){
    // this.backShow=false;
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    download(){
      window.location.href=this.$api.rootUrl+'/manage-platform/templateFile/nameListFocusListFile.xlsx'
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={NAMELIKE:'0'};
      if(this.backShow){

        this.getHisFn(this.CurrentPage,this.pageSize,this.pd);

      }else{
        this.getList(this.CurrentPage,this.pageSize,this.pd);

      }

    },
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
      if(this.backShow){
        this.getHisFn(this.CurrentPage,val,this.pd);

      }else{
        this.getList(this.CurrentPage,val,this.pd);
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if(this.backShow){
        this.getHisFn(val,this.pageSize,this.pd);
      }else{
        this.getList(val,this.pageSize,this.pd);

      }
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd){
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"pd":pd
      };
      console.log(pd)

        this.$api.post('/manage-platform/nameListFocusList/getNameListFocusListPage',p,
         r => {
           console.log(r);
           this.tableData=r.data.resultList;
           this.TotalResult=r.data.totalResult;
           this.backShow=false;

        })

    },
    getHisFn(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };
      console.log(pd)
      this.$api.post('/manage-platform/nameListHis/getNameListFocusListHisPage',p,
       r => {
         console.log(r);
         this.backShow=true;
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    update(item){
      this.addDialogVisible=true;
      this.form=Object.assign({}, item);
      // this.form=item;
      this.form.PERSON_TYPE+='';
      this.form.IN_OUT+='';
      this.dialogType="update";
      this.dialogText="编辑"
      this.V.$reset('demo3')
      this.V.$reset('other');

    },
    addServe(){
      this.form={};
      this.addDialogVisible=true;
      this.dialogType="add"
      this.dialogText="新增";
      this.V.$reset('demo3')
      this.V.$reset('other');


    },

    details(i){
      this.detailsDialogVisible=true;
      this.detailsData=i;
    },
    deleteItem(id) {
      let p={
        SERIAL:id
      }
      this.$confirm('您是否确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/manage-platform/nameListFocusList/updateCheck',p,
           r => {
             if(r.success){
               this.$message({
                 message: '删除成功',
                 type: 'success'
               });
               this.releaseDialogVisible=false;
               this.getList(this.CurrentPage,this.pageSize,this.pd);
             }
          })
        }).catch(() => {

        });

      },
      deleteItems(){
          let arr= this.multipleSelection;
          let arr1=[];
          for(var i in arr){
            arr1.push(arr[i].SERIAL)
          }
          let p={
            pd:{
            },
            cdtList:arr1
          }
          this.$confirm('您是否确定删除该记录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.post('/manage-platform/nameListFocusList/updateCheckAll',p,
               r => {
                 if(r.success){
                   this.$message({
                     message: '删除成功',
                     type: 'success'
                   });
                   this.releaseDialogVisible=false;
                   this.getList(this.CurrentPage,this.pageSize,this.pd);
                 }
              })
            })

      },
      queryDocCode(){
        this.$api.post('/manage-platform/codeTable/queryDocCode',{},
         r => {
           console.log(r);
           if(r.success){
             this.docCode=r.data;
           }
        })
      },

      queryInOutReason(){
        this.$api.post('/manage-platform/codeTable/queryInOutReason',{},
         r => {
           console.log(r);
           if(r.success){
             this.inOutReason=r.data;
           }
        })
      },

      queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         console.log(r);
         if(r.success){
           this.airport=r.data;
           // this.$emit('transAirport',this.airportModel)
         }
      })
    },
    addItem(formName){
      this.V.$submit('demo3', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        // 只有验证全部通过才会执行
        console.log('验证通过的数据'+data)
        if(this.dialogType=="add"){
          this.$api.post('/manage-platform/nameListFocusList/addNameListFocusList',this.form,
           r => {
             console.log(r);
             if(r.success){
               this.$message({
                 message: '恭喜你，添加成功！',
                 type: 'success'
               });
             }
            this.addDialogVisible=false;
            this.getList(this.CurrentPage,this.pageSize,this.pd);
            this.$refs[formName].resetFields();

          })
        }else if(this.dialogType=="update"){
          this.$api.post('/manage-platform/nameListFocusList/updateNameListFocusList',this.form,
           r => {
             console.log(r);
             if(r.success){
               this.$message({
                 message: '恭喜你，修改成功！',
                 type: 'success'
               });

             }
            this.addDialogVisible=false;
            this.getList(this.CurrentPage,this.pageSize,this.pd);
            this.$refs[formName].resetFields();

          })
        }
      })
    },
    beforeAvatarUpload(file){
      console.log(file.type)
      const isEXL = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isEXL) {
        this.$message.error('上传文件只能是 xlsl 格式!');
      }
      return isEXL ;
    },
    showUpload(){
      this.uploadDialogVisible=true;
      console.log( this.$refs.upload)
      if( this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
    },
    submitUpload() {
      if(this.$refs.upload.uploadFiles.length==0){
        this.$message({
         message: '请先选择文件！',
         type: 'warning'
       });
        return
      }
      this.$refs.upload.submit();
    },
    upSuccess(r){
      console.log(r);
      if(r.success){
        this.$message({
          message: r.data,
          type: 'success'
        });
       this.uploadDialogVisible=false ;
       this.getList(this.CurrentPage,this.pageSize,this.pd);
      }
    }

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
  width: 90px;
}
</style>
