<template lang="html">
  <div class="">
    <div class="">
    <div class="ak-tab-pane">
      <el-row type="flex" style="height:100%">
        <el-col :span="22" class="br flex-c pr-20">
          <div style="display:flex;justify-content: flex-end;width:100%;margin-bottom:15px">
            <el-button type="primary" plain name="button" @click="openL" size="mini">{{listText}}</el-button>
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-button type="success" size="small" plain @click="getmodel">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" size="small" plain @click="seeModel">点击查看</el-button>
            </el-col>
            <el-dialog title="国籍选择" :visible.sync="modelDialogVisible" width="640px" :before-close="cancelModel">
              <el-input
                placeholder="输入模型关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                class="filter-tree"
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="CODE"
                :filter-node-method="filterNode"
                :props="defaultProps"
                :default-checked-keys='keys'>
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getCheckedNodes" size="small">确认</el-button>
                <el-button type="primary" @click="resetModel" size="small" plain>重置</el-button>
                <el-button type="warning" @click="cancelModel" size="small">取消</el-button>
              </div>
            </el-dialog>

            <el-dialog title="国籍选择" :visible.sync="seeModelDialogVisible" width="800px">
              <div class="" v-show="modelCheck">
                <span class="redx">您还未选择国籍</span>
              </div>
              <el-row align="center" style="width:100%">
                <!-- <h4 style="margin-top:0px!important">选中的模型</h4> -->
                <span v-for="(item,ind) in dutyName" :key="ind" style="width:25%;margin-bottom: 7px;display:inline-block;line-height: 20px;">{{item.CNAME}}</span>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="seeModelDialogVisible = false" size="small">取 消</el-button>
              </div>
            </el-dialog>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">姓名：</span>
              <div class="input-input t-fuzzy t-flex">
                <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                <el-checkbox v-model="cdt.isBlurred">模糊查询</el-checkbox>
              </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">性别：</span>
              <el-select placeholder="请选择" v-model="cdt.genderEqual" size="small" filterable clearable class="input-input">
                <el-option label="M - 男" value="M"></el-option>
                <el-option label="F - 女" value="F"></el-option>
                <el-option label="U - 未知" value="U"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">出生日期：</span>
                <el-date-picker
                v-model="cdt.dateofbirthEqual"
                type="date" size="small"
                placeholder="开始日期"
                value-format="yyyyMMdd"
                class="input-input">
              </el-date-picker>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <!-- <el-option label="全部" value=""></el-option> -->
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">机场：</span>
              <el-select v-model="cdt.portEqual" placeholder="请选择" filterable clearable size="small" class="input-input" @visible-change="portMethod">
                <el-option
                v-for="item in airport"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">订票号：</span>
              <el-input placeholder="请输入内容" v-model="cdt.pnrRciEqual" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">航空公司：</span>
              <el-select v-model="cdt.applicationsenderidEqual" placeholder="请选择" filterable clearable size="small" class="input-input" @visible-change="applicationMethod">
                <el-option
                v-for="item in application"
                :key="item.AIRLINE_CODE"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="small" class="input-input"></el-input>
            </el-col>


            <!-- <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker
                  v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                  v-model="cdt.startFltdate"
                  type="date" size="small"
                  placeholder="开始日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                   v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                   v-model="cdt.endFltdate"
                   type="date" size="small"
                   placeholder="结束日期"
                   format="yyyy-MM-dd"
                   value-format="yyyyMMdd"
                   :picker-options="pickerOptions1">
               </el-date-picker>
              </div>
            </el-col> -->

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker

                  v-model="cdt.startFltdate"
                  type="date" size="small"
                  placeholder="开始日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker

                   v-model="cdt.endFltdate"
                   type="date" size="small"
                   placeholder="结束日期"
                   format="yyyy-MM-dd"
                   value-format="yyyyMMdd"
                   :picker-options="pickerOptions1">
               </el-date-picker>
              </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">值机时间：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker
                  v-model="cdt.startIapiReceivetime"
                  type="date" size="small"
                  placeholder="开始日期"
                  value-format="yyyyMMdd">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                   v-model="cdt.endIapiReceivetime"
                   type="date" size="small"
                   placeholder="结束日期"
                   value-format="yyyyMMdd">
               </el-date-picker>
              </div>
            </el-col>

            <!-- 展开收起项 -->
            <div class="" v-show="openList">
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">起飞机场：</span>
              <el-select placeholder="请选择" v-model="cdt.cityfromEqual" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">到达机场：</span>
              <el-select placeholder="请选择" v-model="cdt.citytoEqual" filterable clearable @visible-change="landing" size="small" class="input-input">
                <el-option
                v-for="item in landingName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">校验结果：</span>
              <el-select v-model="cdt.checkresultEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="0Z - 允许登机" value="0Z"></el-option>
                <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                <el-option label="2Z - 再次核对" value="2Z"></el-option>
                <el-option label="4Z - 数据错误" value="4Z"></el-option>
              </el-select>
            </el-col>
            </div>
          </el-row>
          <!-- 保存方案 -->
          <div class="t-save">
            <el-select  filterable v-model="ssss"  @focus="savePlanShow" @change="planQuery" placeholder="方案选择" size="small" class="mr-15" filterable clearable>
              <el-option
                v-for="item in saveName"
                :label="item"
                :value="item"
                :key="item">
                <span class="planItem">{{item}}</span>
                <span class="planDelete el-icon-circle-close" @click.stop="deleteItem(item)"></span>
              </el-option>
            </el-select>
            <button type="button" name="button" @click="dialogVisible = true;sss=''">保存方案</button>
          </div>
          <!-- 写入方案名称 -->
          <el-dialog
            title="方案名称"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form  class="plan">
              <el-form-item label="方案名称:" :label-width="formLabelWidth">
                <el-input v-model="sss" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="planSave">保存</el-button>
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" class="mb-15" size="small" @click="searchZH()">查询</el-button>
          <el-button type="primary" class="mb-15" plain size="small" @click="reset">重置</el-button>
          <el-button type="primary" size="small"  @click="batchImport">批量导入</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- :action="$api.rootUrl+'/manage-platform/iapi/readExcel'" -->
  <el-dialog title="导入文件" :visible.sync="uploadDialogVisible"   width="640px"
  :before-close="handleClose">
    <el-form :model="releaseform" ref="releaseForm">
      <el-upload
        class="upload-demo"
        ref="upload"
        name="excel"
        :multiple="false"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        action="http://192.168.99.248:8080/manage-platform/iapiHead/readNationalAndPassportnoExcel"

        :on-success="uploadSuccess"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelUpload" size="small">取 消</el-button>
    </div>
  </el-dialog>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2 mt-20">
      <div class="title-green">
        <span style="float:left">结果显示项</span>
        <el-button style="float:right" type="primary" plain @click="openCheck" size="mini">{{text}}</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkList" class="o-checkbox-g" v-show="openCheckbox">
         <el-checkbox v-for="item in checkItem" :label="item.ITEMNAME" :key="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>

    <!-- 表格 -->
    <div class="middle">
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="seat">航班座位图</el-button> -->
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({name:'QueryGLRY'})">关联人员查询</el-button> -->
      <el-button  plain class="table-btn mb-9" size="small" @click="exportZH">导出</el-button>
      <el-button  plain class="table-btn mb-9" size="small" v-print="'#printMe'">打印</el-button>
      <el-table
        ref="singleTable"
        class="tableRy"
        :data="tableData"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @row-click="checkRow"
        id="printMe">
        <el-table-column
           width="70"
           label="单选">
          <template slot-scope="scope">
            <el-radio v-model="radio" class="radio" :label="scope.row.I_SERIAL">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="iapiName"
          label="姓名"
          sortable
          width="130"
          v-if="checkList.indexOf(checkItem[0].ITEMNAME)>-1">
          <template slot-scope="scope">
            <!-- 带 * nameIsEqual=true-->
            <template v-if="scope.row.nameIsEqual == true">
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="scope.row.pnrName"
                :disabled="!scope.row.nameIsEqual">
                <span slot="reference">{{scope.row.iapiName}}<span v-if="scope.row.nameIsEqual">*</span></span>
              </el-popover>
            </template>
            <!--不带 * nameIsEqual=false-->
            <!-- <template v-else-if="scope.row.nameIsEqual == false">
              {{scope.row.iapiName}}
            </template> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="INTG_CHNNAME"
          label="中文姓名"
          sortable
          width="100"
          v-if="checkList.indexOf(checkItem[1].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别"
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[2].ITEMNAME)>-1">
          <template slot-scope="scope">
            {{scope.row.GENDER|fiftersex}}
          </template>
        </el-table-column>
        <el-table-column
          prop="iapiBirthdayName"
          label="出生日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="iapiNationaName"
          label="国籍/地区"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="iapiCardName"
          label="证件种类"
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="FLTDATESTR"
          label="航班日期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="CHECKRESULT"
          label="校验结果"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[9].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入标识"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="iapiCityfromName"
          label="起飞机场"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[11].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="departdateStr"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="iapiCitytoName"
          label="到达机场"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="arrivdateStr"
          label="预计降落时间"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_SPECIFIGSEAT"
          label="航班座位号"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="flightStatusName"
          label="航班状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PASSPORTEXPIREDATE"
          label="证件有效期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PASSPORTISSUEDATE"
          label="证件签发日期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PASSPORTISSUECOUNTRYNAME"
          label="证件签发国"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="VISANO"
          label="签证号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[20].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="VISAEXPIREDATE"
          label="签证有效期"
          width="140"
          sortable
          v-if="checkList.indexOf(checkItem[21].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="OTHER_NO"
          label="其他证件号码"
          width="140"
          sortable
          v-if="checkList.indexOf(checkItem[22].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="OTHER_EXPIREDATE"
          label="其他证件有效期"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[23].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="OTHERDOCUMENTISSUEDATE"
          label="其他证件签发日期"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[24].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="OTHER_ISSUECOUNTRYNAME"
          label="其他证件签发国"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[25].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="AIRLINEPHONE"
          label="航空公司联系电话"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[26].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="IAPI_RESPONSETIMESTR"
          label="边检回复日期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[27].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="ABONO"
          label="ABO唯一标识"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[28].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="TKTNUMBER"
          label="电子客票号"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[29].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="ORIGINNAME"
          label="最初上机地"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[30].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="DESTINATIONNAME"
          label="最终下机地"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[31].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_CARBINCLASSDESIGNATOR"
          label="舱位"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[32].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_RCI"
          label="旅客订票号"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[33].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="APPLICATIONSENDERIDNAME"
          label="航空公司"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[34].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PORTNAME"
          label="机场"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[35].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="IAPI_RECEIVETIMESTR"
          label="值机时间"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[36].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNRFLAG"
          label="是否订票"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[37].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="CHKFLAG"
          label="是否值机"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[38].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="EEFLAG"
          label="出入境手续"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[39].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="CLSFLAG"
          label="航班是否关闭"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[40].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="500">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="$router.push({name:'QueryGLRY',query:{row:scope.row,page:1,isRoute:true}})">同值机</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="$router.push({name:'QueryGLRY',query:{row:scope.row,page:0,isRoute:true}})">同订票</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="$router.push({name:'QueryGLRY',query:{row:scope.row,page:4,isRoute:true}})">临近</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="seat(scope.row)">航班座位</el-button>
         </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            第{{currentPage}}页
          </div>
          <div class="">
            每页
            <el-select v-model="showCount" @change="pageSizeChange(showCount)" placeholder="10" size="mini" class="page-select">
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
            共{{totalResult}}条
          </div>
        </div>
        <el-pagination
          background
          :current-page.sync ="currentPage"
          @current-change="handleCurrentChange"

          :page-size="showCount"
          prev-text="上一页"
          next-text="下一页"
          layout="prev,next"
          >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="座位详情"
      :visible.sync="seatDialogVisible"
      width="1220px"
      >
      <Seat :flightNumber="flightNumber0" :globalserial="globalserial0"></Seat>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <el-form :model="dform" ref="detailsForm">
        <div class="t-hrtitle">值机信息</div>
        <div class="hrtitle-child">基本信息</div>
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
        <div class="hrtitle-child">航班信息</div>
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
        <div class="hrtitle-child">其他信息</div>
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
        <!-- 订票信息 -->

        <div class="t-hrtitle">订票信息</div>
        <div class="hrtitle-child">基本信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dpform.pnrName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dpform.PNR_GENDER}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dpform.pnrBirthdayName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍：</div><div class="t-el-sub">{{dpform.pnrNationaName}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dpform.PNR_PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期截止日期：</div><div class="t-el-sub">{{dpform.PASSPORTEXPIREDATE}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dpform.FLTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dpform.PNR_FLTDATE1}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入标识：</div><div class="t-el-sub">{{dpform.PNR_FLTTYPE}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dpform.originName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">到达城市：</div><div class="t-el-sub">{{dpform.destinationName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dpform.pnrCityfromName}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dpform.pnrCitytoName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">计划起飞时间：</div><div class="t-el-sub">{{dpform.departdateStr}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">计划到达时间：</div><div class="t-el-sub">{{dpform.arrivdateStr}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">电子客票号：</div><div class="t-el-sub">{{dpform.TKTNUMBER}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客订票号：</div><div class="t-el-sub">{{dpform.PNR_RCI}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">代理所在城市：</div><div class="t-el-sub">{{dpform.LOCATION_IDENTIFICATION_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">代理人IATAID号或虚拟IATA号：</div><div class="t-el-sub">{{dpform.TRAVEL_AGENT_IDENTIFICATION}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订票时间：</div><div class="t-el-sub">{{dpform.PNR_RCITIME_STR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客登机序号：</div><div class="t-el-sub">{{dpform.BOARDINGSEQUENCE}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">座位号：</div><div class="t-el-sub">{{dpform.PNR_SPECIFIGSEAT}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">座位所属：</div><div class="t-el-sub">{{dpform.PNR_CARBINCLASSDESIGNATOR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">PNR报文发送方：</div><div class="t-el-sub">{{dpform.pnrFsf}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客其他姓名：</div><div class="t-el-sub">{{dpform.otherName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">携带婴儿标志：</div><div class="t-el-sub">{{dpform.baby==1?'是':'否'}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订单旅客数量：</div><div class="t-el-sub">{{dpform.tifSum}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">乘机人行李数量：</div><div class="t-el-sub">{{dpform.NUMBEROFPIECES}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班飞机型号：</div><div class="t-el-sub">{{dpform.MAXLENGTH}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订座系统分配给某个代理或Office的ID号：</div><div class="t-el-sub">{{dpform.IN_HOUSE_IDENTIFICATION}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box1=!box1">订票人住址<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in addList" v-if="box1">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">城市：</div><div class="t-el-sub">{{i.CITY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国家：</div><div class="t-el-sub">{{i.COUNTRY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">街道号和街道名称：</div><div class="t-el-sub">{{i.STREET_AND_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box2=!box2">订票人联系方式<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in lftList" v-if="box2">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">订票人联系方式：</div><div class="t-el-sub">{{i.CONTENT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box3=!box3">非航空服务（汽车，旅馆）<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in msgList" v-if="box3">
          <div class="" v-for="j in i.tvlLv3List" style="width: 100%;">
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务的类型：</div><div class="t-el-sub">{{i.RESPONSE_TYPE}}</div></el-col>
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务提供者姓名：</div><div class="t-el-sub">{{j.PLACE_NAME}}</div></el-col>
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务提供者地址：</div><div class="t-el-sub">{{j.PRODUCT_IDENTIFICATION}}</div></el-col>
          </div>
        </el-row>
        <div class="hrtitle-child" @click="box4=!box4">订单特殊需求<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in ssrList" v-if="box4">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订票人特殊请求类型：</div><div class="t-el-sub">{{i.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
          <el-col :span="18" class="t-el-content"><div class="t-el-text">订票人特殊请求描述：</div><div class="t-el-sub">{{i.FREETXT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box5=!box5">分离旅客信息<i class="el-icon-d-caret"></i></div>
        <el-row class="t-detail" v-for="i in eqnList" v-if="box5">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">分离的人数：</div><div class="t-el-sub">{{i.eqnCount}}</div></el-col>
          <el-row type="flex"  v-for="j in i.rciList" style="width:100%">
            <el-col :span="12" class="t-el-content"><div class="t-el-text">记录分离后的编号所属的航空公司代码：</div><div class="t-el-sub">{{j.COMPANY_IDENTIFICATION}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">分离后的记录编号：</div><div class="t-el-sub">{{j.RESERVATION_CONTROL_NUMBER}}</div></el-col>
          </el-row>
        </el-row>
        <div class="hrtitle-child" @click="box6=!box6">旅客联系方式<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in lftListTwo" v-if="box6">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">旅客联系方式：</div><div class="t-el-sub">{{i.CONTENT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box7=!box7">旅客住址<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in addListTwo" v-if="box7">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">城市：</div><div class="t-el-sub">{{i.CITY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国家：</div><div class="t-el-sub">{{i.COUNTRY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">街道号和街道名称：</div><div class="t-el-sub">{{i.STREET_AND_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box8=!box8">常旅客信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in ftiListTwo" v-if="box8">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">常旅客ID：</div><div class="t-el-sub">{{i.FREQUENT_T_IDENIFICATION}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">常旅客登机：</div><div class="t-el-sub">{{i.MEMBERSHIP_LEVEL}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box9=!box9">旅客特殊需求<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in ssrListTwo" v-if="box9">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客特殊服务请求类型：</div><div class="t-el-sub">{{i.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
          <el-col :span="18" class="t-el-content"><div class="t-el-text">旅客特殊服务内容：</div><div class="t-el-sub">{{i.FREETXT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box10=!box10">订票人机票更改记录<i class="el-icon-d-caret"></i></div>
        <el-row class="t-detail" v-for="i in messageThr" v-if="box10">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更操作者的ID信息：</div><div class="t-el-sub">{{i.abi.TRAVEL_AGENT_IDENTIFICATION}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更者的城市代码：</div><div class="t-el-sub">{{i.abi.PLACE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更者的所属航司或GDS：</div><div class="t-el-sub">{{i.abi.COMPANY_IDENTIFICATION}}</div></el-col>
          <el-col style="width:100%" v-for="j in i.hisGr11List">
            <div class="t-detail">
              <el-row>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{j.hisGr11.NAME_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客姓名：</div><div class="t-el-sub">{{j.hisGr11.NAME_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">其他姓名：</div><div class="t-el-sub">{{j.hisGr11.OTHER_NAMES}}</div></el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">携带不占座婴儿标识：</div><div class="t-el-sub">{{j.hisGr11.TRAVELLER_A_BY_INFANT_ID}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">特殊服务类型：</div><div class="t-el-sub">{{j.hisGr11.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">行李数量：</div><div class="t-el-sub">{{j.tbdGr11Count.SUM}}</div></el-col>
              </el-row>
            </div>
            <el-row type="flex" class="t-detail">
              <el-col :span="24" class="t-el-content"><div class="t-el-text">特殊需求描述：</div><div class="t-el-sub">{{j.hisGr11.SSRFREETXT}}</div></el-col>
            </el-row>

            <div class="t-detail" v-for="it in j.tvlList">
              <div class="t-detail" style="color: #3F96F2;">航班信息</div>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{it.FLIGHT_NUMBER}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司：</div><div class="t-el-sub">{{it.OPERATING_AIRLINE_CODE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞时间：</div><div class="t-el-sub">{{it.DEPARTURE}}</div></el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">到达时间：</div><div class="t-el-sub">{{it.ARRIVAL}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{it.LAST_DEPARTURE_AIRPORT_NAME}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">降落机场：</div><div class="t-el-sub">{{it.FIRST_ARRIVAL_AIRPORT_NAME}}</div></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="hrtitle-child" @click="box11=!box11">订票人付款信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in fopList" v-if="box11">
          <el-col :span="12" class="t-el-content"><div class="t-el-text">订票人付款方式：</div><div class="t-el-sub">{{i.PAYMENT_TYPE}}</div></el-col>
          <el-col :span="12" class="t-el-content"><div class="t-el-text">订票人付款账号：</div><div class="t-el-sub">{{i.ACCOUNT_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box12=!box12">票价信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in monList" v-if="box12">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">客票金额类型：</div><div class="t-el-sub">{{i.MONETARY_AMOUNT_TYPE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">金额：</div><div class="t-el-sub">{{i.AMOUNT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">货币代码：</div><div class="t-el-sub">{{i.CURRENCY}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box13=!box13">票税信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in txdList" v-if="box13">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">税金额：</div><div class="t-el-sub">{{i.TAX_AMOUNT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">货币类型：</div><div class="t-el-sub">{{i.CURRENCY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">税类型：</div><div class="t-el-sub">{{i.TAX_TYPE}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box14=!box14">旅客行李情况<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="i in messageFive" v-if="box14">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人行李条码：</div><div class="t-el-sub">{{i.BAG_LICENSE_PLATE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人连续条码数量：</div><div class="t-el-sub">{{i.CONSECUTIVE_TAGS_SERIAL_NUM}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人行李目的地：</div><div class="t-el-sub">{{i.PLACE_OF_DESTINATION_NAME}}</div></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Seat from '../../other/seat'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  components: {AlarmProcess},
  components: {Seat},
  data(){
    return{
      listText:'收起',
      text:'收起',
      openList:true,
      openCheckbox:true,
      //方案
      ssss:'',//保存方案渲染
      sss:'',//方案名称渲染
      saveName:[],//保存方案数组
      formLabelWidth:'120px',
      dialogVisible:false,
      //表格数据
      tableData:[],
      radio:'',//表格单选按钮
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数
      releaseform:{},
      seatDialogVisible:false,
      flightNumber0:'',
      globalserial0:'',
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
      //详情
      dform:{},
      dpform:{},
      detailsDialogVisible:false,
      addList:[],
      eqnList:[],
      lftList:[],
      msgList:[],
      ssrList:[],

      addListTwo:[],
      lftListTwo:[],
      ftiListTwo:[],
      ssrListTwo:[],

      messageThr:[],

      fopList:[],
      monList:[],
      txdList:[],

      messageFive:[],

      box1:false,
      box2:false,
      box3:false,
      box4:false,
      box5:false,
      box6:false,
      box7:false,
      box8:false,
      box9:false,
      box10:false,
      box11:false,
      box12:false,
      box13:false,
      box14:false,
      box15:false,
      //查询条件
      cdt:{
        isBlurred:false,
        startFltdate:'',
        endFltdate:'',
      },
      airport:[],
      takeOffName:[],
      landingName:[],
      application:[],
      modelDialogVisible:false,
      seeModelDialogVisible:false,
      //批量导入
      uploadDialogVisible:false,
      releaseform:{},
      cdt1:{},
      batchFlag:0,

      modelCheck:false,
      filterText:'',
      treeData: [],
      defaultProps: {
        children: 'countryList',
        label: 'CNAME',
      },
      keys:[],
      keysExample:[],
      keyCode:[],
      dutyName:[],
      flagCZ:0,
      flagQX:0,
      //展示项
      checkList: ['iapiName','GENDER','iapiBirthdayName','iapiNationaName','PASSPORTNO','FLTNO','FLTDATESTR','filghtDate','FLIGHTTYPE','iapiCityfromName','iapiCitytoName','APPLICATIONSENDERIDNAME','PORTNAME'],
      checkItem:[
        {
          ITEMNAME:'iapiName',
          LABEL:'姓名',
        },
        {
          ITEMNAME:'INTG_CHNNAME',
          LABEL:'中文姓名',
        },
        {
          ITEMNAME:'GENDER',
          LABEL:'性别',
        },
        {
          ITEMNAME:'iapiBirthdayName',
          LABEL:'出生日期',
        },
        {
          ITEMNAME:'iapiNationaName',
          LABEL:'国籍/地区',
        },
        {
          ITEMNAME:'iapiCardName',
          LABEL:'证件种类',
        },
        {
          ITEMNAME:'PASSPORTNO',
          LABEL:'证件号码',
        },
        {
          ITEMNAME:'FLTNO',
          LABEL:'航班号',
        },
        {
          ITEMNAME:'FLTDATESTR',
          LABEL:'航班日期',
        },
        {
          ITEMNAME:'CHECKRESULT',
          LABEL:'校验结果',
        },
        {
          ITEMNAME:'FLIGHTTYPE',
          LABEL:'出入标识',
        },
        {
          ITEMNAME:'iapiCityfromName',
          LABEL:'起飞机场',
        },
        {
          ITEMNAME:'departdateStr',
          LABEL:'预计起飞时间',
        },
        {
          ITEMNAME:'iapiCitytoName',
          LABEL:'到达机场',
        },
        {
          ITEMNAME:'arrivdateStr',
          LABEL:'预计降落时间',
        },
        {
          ITEMNAME:'PNR_SPECIFIGSEAT',
          LABEL:'航班座位号',
        },
        {
          ITEMNAME:'flightStatusName',
          LABEL:'航班状态',
        },
        {
          ITEMNAME:'PASSPORTEXPIREDATE',
          LABEL:'证件有效期',
        },
        {
          ITEMNAME:'PASSPORTISSUEDATE',
          LABEL:'证件签发日期',
        },
        {
          ITEMNAME:'PASSPORTISSUECOUNTRYNAME',
          LABEL:'证件签发国',
        },
        {
          ITEMNAME:'VISANO',
          LABEL:'签证号码',
        },
        {
          ITEMNAME:'VISAEXPIREDATE',
          LABEL:'签证有效期',
        },
        {
          ITEMNAME:'OTHER_NO',
          LABEL:'其他证件号码',
        },
        {
          ITEMNAME:'OTHER_EXPIREDATE',
          LABEL:'其他证件有效期',
        },
        {
          ITEMNAME:'OTHERDOCUMENTISSUEDATE',
          LABEL:'其他证件签发日期',
        },
        {
          ITEMNAME:'OTHER_ISSUECOUNTRYNAME',
          LABEL:'其他证件签发国',
        },
        {
          ITEMNAME:'AIRLINEPHONE',
          LABEL:'航空公司联系电话',
        },

        {
          ITEMNAME:'IAPI_RESPONSETIMESTR',
          LABEL:'边检回复日期',
        },
        {
          ITEMNAME:'ABONO',
          LABEL:'ABO唯一标识',
        },
        {
          ITEMNAME:'TKTNUMBER',
          LABEL:'电子客票号',
        },
        {
          ITEMNAME:'ORIGINNAME',
          LABEL:'最初上机地',
        },
        {
          ITEMNAME:'DESTINATIONNAME',
          LABEL:'最终下机地',
        },
        {
          ITEMNAME:'PNR_CARBINCLASSDESIGNATOR',
          LABEL:'舱位',
        },
        {
          ITEMNAME:'PNR_RCI',
          LABEL:'旅客订票号',
        },
        {
          ITEMNAME:'APPLICATIONSENDERIDNAME',
          LABEL:'航空公司',
        },
        {
          ITEMNAME:'PORTNAME',
          LABEL:'机场',
        },
        {
          ITEMNAME:'IAPI_RECEIVETIMESTR',
          LABEL:'值机时间',
        },
        {
          ITEMNAME:'PNRFLAG',
          LABEL:'是否订票',
        },
        {
          ITEMNAME:'CHKFLAG',
          LABEL:'是否值机',
        },
        {
          ITEMNAME:'EEFLAG',
          LABEL:'出入境手续',
        },
        {
          ITEMNAME:'CLSFLAG',
          LABEL:'航班是否关闭',
        },
      ],
      nav1Id:null,
      nav2Id:null,
      showConfiglist:[],//展示项数组
      pickerOptions: {
        disabledDate: (time) => {
            if (this.cdt.endFltdate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.endFltdate;
            }else if(this.cdt.endFltdate == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.cdt.startFltdate;
        }
      },
      pd:{},
    }
  },
  watch:{
     filterText(val) {
       this.$refs.tree.filter(val);
     }
  },
  mounted(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    let flightStart = new Date(new Date().setHours(0,0,0,0));
    // this.cdt.startFltdate=formatDate(flightStart,'yyyyMMdd');
    // this.cdt.endFltdate=formatDate(end,'yyyyMMdd');
    this.takeOff();
    this.landing();
    document.getElementsByClassName('btn-next')[0].disabled=true;
  },
  activated(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
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
  },
  methods:{
    //============================洲国籍======================================================================
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getmodel(){//点击选择
      this.filterText='';
      this.modelDialogVisible=true;
      if(this.flagCZ==1&&this.flagQX==1){
        this.keys = this.keysExample
        this.$refs.tree.setCheckedKeys(this.keys);
        console.log(this.keys);
      }
      this.flagCZ = 0;
      this.flagQX = 0;
      // if(this.cdt.nationalityList == undefined||this.cdt.nationalityList.length==0){
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.treeData=r.data;
         }
      })
      this.keys = this.$refs.tree.getCheckedKeys(true);
      this.$refs.tree.setCheckedKeys(this.keys);
      // }
    },
    resetModel(){//重置
      this.flagCZ=1;
      if(this.cdt.nationalityList == undefined||this.cdt.nationalityList.length==0){//没有值的时候
        this.historyModel = [];
        this.keysExample = [];
      }else{
        this.historyModel = this.$refs.tree.getCheckedNodes(true,true);;//存入清空前的值
        this.keysExample = this.$refs.tree.getCheckedKeys(true);//先存值再清空
      }
      this.$refs.tree.setCheckedKeys([]);
    },
    cancelModel(){//取消
      this.flagQX=1;
      if(this.flagCZ == 1){
        this.cdt.nationalityList=this.historyModel;
      }
      this.modelDialogVisible=false
    },
    seeModel(){
      this.seeModelDialogVisible = true;
      this.dutyName = this.cdt.nationalityList;
      if(this.dutyName == undefined || this.dutyName.length == 0){
        this.modelCheck = true
      }else{
        this.modelCheck = false
      }
    },
    getCheckedNodes() {//确认
      this.cdt.nationalityList=this.$refs.tree.getCheckedNodes(true,true);
      this.keys = this.$refs.tree.getCheckedKeys(true);//先存值再清空
      this.modelDialogVisible=false;
    },
    seat(i){
      this.seatDialogVisible = true;
      this.flightNumber0 = i.FLTNO;
      this.globalserial0=i.SERIAL;
    },
    openCheck(){
      this.openCheckbox = !this.openCheckbox
      if(this.openCheckbox == true){
        this.text = '收起';
      }else {
        this.text = '展开';
      }
    },
    openL(){
      this.openList = !this.openList;
      if(this.openList == true){
        this.listText = '收起';
      }else if(this.openList == false){
        console.log(this.openList);
        this.listText = '展开';
      }
    },
    checkRow(row){//列表单选操作
      console.log(row);
      this.radio=row.I_SERIAL
    },
    //==============================================批量导入=====================================================
    batchImport(){
      if(this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
      this.uploadDialogVisible = true;
      console.log( this.$refs.upload)
    },
    handleClose(){
      this.cancelUpload();
    },
    cancelUpload(){
      this.$refs.upload.clearFiles();
      this.uploadDialogVisible=false;
    },
    uploadSuccess(response, file, fileList){
      console.log(response);
      if(response.success){
        this.uploadDialogVisible=false;
        this.cdt1.nationalAndPassportnoList = response.data;
        this.$refs.upload.clearFiles();
        this.$message({
          duration:3000,
          message: '恭喜你，导入成功！',
          type: 'success'
        });
        this.batchFlag = 1;
      }else{
        this.$message({
          duration:3000,
          message: response.message,
          type: 'warning'
        });
      }
    },
    handleExceed(files, fileList){
      if(files.length!=0){
        this.$message({
          message: '只能上传一个文件！',
          type: 'warning'
        });
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
     // this.uploadDialogVisible=false;
    },
    //==============================================详情=========================================================
    details(i){
      this.detailsDialogVisible = true;
      let p={
        'SERIAL':i.SERIAL,
        'CHK_SERIAL':i.CHK_SERIAL,
        'PNR_TID':i.PNR_TID,
        'PNR_TKTNUMBER':i.PNR_TKTNUMBER,
        'PNR_TRAVELLER_SURNAME_TIF':i.PNR_TRAVELLER_SURNAME_TIF,
        'PNR_TRAVELLER_GIVEN_NAME_TIF':i.PNR_TRAVELLER_GIVEN_NAME_TIF
      }
      this.$api.post('/manage-platform/iapiHead/queryIapiHeadInfo',p,
       r =>{
         if(r.success){
           if(r.data.IAPINULL == 0){
             this.dform = r.data.IAPI;
             this.dpform = r.data.pnrBasis;
           }
           this.dpform = r.data.pnrBasis;
           if(r.data.pnrTif){
             this.$api.post('/manage-platform/pnr/queryPnrGr1InfoNew',r.data.pnrTif,
              r =>{
                this.addList = r.data.addList;//订票人住址
                this.lftList = r.data.lftList;//订票人联系方式
                this.msgList = r.data.msgList;//服务
                this.ssrList = r.data.ssrList;//订单特殊需求
                this.eqnList = r.data.eqnList;//分离旅客信息
                this.dpform.pnrFsf = r.data.COMPANY_IDENTIFICATION;//pnr发送方
                this.dpform.tifSum = r.data.tifSum;//订单旅客数量
                this.dpform.LOCATION_IDENTIFICATION_NAME = r.data.orgInfo.LOCATION_IDENTIFICATION_NAME;//代理所在城市
                this.dpform.TRAVEL_AGENT_IDENTIFICATION = r.data.orgInfo.TRAVEL_AGENT_IDENTIFICATION;//代理人IATAID号或虚拟IATA号
                this.dpform.IN_HOUSE_IDENTIFICATION = r.data.orgInfo.IN_HOUSE_IDENTIFICATION;//订座系统分配给某个代理或Office的ID号
              })
              this.$api.post('/manage-platform/pnr/queryPassengersLv3Gr2New',r.data.pnrTif,
              r =>{
                this.addListTwo = r.data.addList;//旅客住址
                this.lftListTwo = r.data.lftList;//旅客联系方式
                this.ftiListTwo = r.data.ftiList;//常旅客信息
                this.ssrListTwo = r.data.ssrList;//旅客特殊需求
                this.dpform.otherName = r.data.tif.OTHER_NAMES;//旅客其他姓名
                this.dpform.baby = r.data.tif.T_A_BY_INFANT_INDICATOR;//携带婴儿标志
              })
              let p={
                "showCount": 10,
              	"currentPage": 1,
              	"pd": r.data.pnrTif
              }
              this.$api.post('/manage-platform/pnr/queryHisGr10ListPageNew',p,
               r =>{
                  this.messageThr = r.data.resultList;
               })
              this.$api.post('/manage-platform/pnr/queryTikcetsGr3New',r.data.pnrTif,
                r =>{
                  this.fopList = r.data.fopList;//付款方式
                  this.monList = r.data.monList;//票价信息
                  this.txdList = r.data.txdList;//票税信息
                })
              this.$api.post('/manage-platform/pnr/queryTbdGr7InfoNew',r.data.pnrTif,
               r =>{
                 this.messageFive = r.data.tbdDetailsList;
                 this.dpform.NUMBEROFPIECES = r.data.NUMBEROFPIECES;//乘机人行李数
                 this.dpform.TYPE_OF_AIRCRAFT = r.data.TYPE_OF_AIRCRAFT;//航班飞机型号
                 this.dpform.BOARDINGSEQUENCE = r.data.BOARDINGSEQUENCE;//旅客登机序号
               })
           }
         }
       })

    },
    //------------------------------------------------全局代码项-------------------------------------------------
    applicationMethod(){
      this.$api.post('/manage-platform/codeTable/queryAircompanyList',{},
       r =>{
         if(r.success){
           this.application = r.data;
         }
       })
    },
    portMethod(){//机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.airport = r.data;
         }
       })
    },
    takeOff(){//调用起飞机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){//调用降落机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.landingName = r.data;
         }
       })
    },
    //-------------------------------------保存方案-------------------------------------------
    savePlanShow(){// 基础查询方案名称列表
      let sn = {
        page : 4
      }
      this.$api.post('/manage-platform/queryShow/queryNameList',sn,
       r =>{
         if(r.success){
           this.saveName = r.data;
         }
       })
    },
    planQuery(){//基础查询 方案渲染
        let pq = {
          page : 4,
          name : this.ssss
        }
        this.$api.post('/manage-platform/queryShow/queryConfigInfo',pq,
        r =>{
          if(r.success){
            this.cdt = r.data.cIapiHeadBean;
            if(this.cdt.nationalityList.length!=0){
              this.keyCode=[];
              for(var i=0;i<this.cdt.nationalityList.length;i++){
                this.keyCode.push(this.cdt.nationalityList[i].CODE);
              }
              this.keys = this.keyCode
              this.$refs.tree.setCheckedKeys(this.keys);
            }
            let arr = r.data.showConfigList;
            let arr1=[];
            if(arr.length == 0){
              this.checkList = ['iapiName','GENDER','iapiBirthdayName','iapiNationaName','PASSPORTNO','FLTNO','FLTDATESTR','filghtDate','FLIGHTTYPE','iapiCityfromName','iapiCitytoName','APPLICATIONSENDERIDNAME','PORTNAME'];
            }else{
              for(var i=0;i<arr.length;i++){
                if(arr[i].isCheck == '1'){
                  arr1.push(arr[i].itemName);
                }
              }
              this.checkList = arr1;
            }
          }
        })
    },
    deleteItem(i){
      this.$confirm('方案删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let di = this.saveName.indexOf(i);
        // this.saveName.splice(di,1);
        let dei = {
          name:i,
          page:4
        };
        this.$api.post('/manage-platform/queryShow/delete',dei,
         r =>{
           if(r.success){
             if(this.ssss==i){
               this.ssss='';
               this.cdt={isBlurred:false,startFltdate:'',endFltdate:'',};
               this.savePlanShow();
             }else{
               this.savePlanShow();
             }
             this.$message({
               type: 'success',
               message: '操作成功!'
             });
           }
         })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    planSave(){//基础查询 方案保存是否重名或是否已存在
      if(this.sss==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let tps = {
        name : this.sss,
        page : 4
      }
      this.$api.post('/manage-platform/queryShow/isExistName',tps,
        r =>{
          if(r.success){
            if(r.data == false){//不存在，可保存
              this.savePlan();
              this.dialogVisible = false;
            }else{
              this.$alert('方案名称已存在，请重新命名', '提示', {
                confirmButtonText: '确定',
              });
            }
          }
        })
    },
    savePlan(){//方案保存
        this.showConfiglistArr();//保存展示项
        let sp = {
        	"name": this.sss,
        	"page":  4,
        	"showConfigList": this.showConfiglist,
        	"cIapiHeadBean": this.cdt//查询项
        }
        this.$api.post('/manage-platform/queryShow/save',sp,
         r =>{
           if(r.success){
             this.$message({
               message: '恭喜你，保存成功！',
               type: 'success'
             });
           }
         })
    },
    // 组装展示项数组
    showConfiglistArr(){
      //定义一个数组，
      //声明一个对象，遍历存值，
      //比较，存值
      //展示项
      this.showConfiglist=[];
      let checkItem=this.checkItem;
      let that=this;
      var arr = this.checkList;
      for(var i in checkItem){
        var obj={isCheck:0}
        obj.itemName=checkItem[i].ITEMNAME;
        for(var j=0;j<arr.length;j++){
          if(arr[j]==checkItem[i].ITEMNAME){
            obj.isCheck=1;
          }
        }
          that.showConfiglist.push(obj);
      }
    },
    //==============查询===========================
    totalPageM(currentPage,showCount,cdt,num){//总条数
      let p={
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt,
        "direction":num
      }
      this.$api.post('/manage-platform/iapiHead/queryListPageCount',p,
       r =>{
         if(r.success){
           this.totalResult = r.data
         }
       })
    },
    getList(currentPage,showCount,cdt,num){//基础查询 查询调用
      // const result = this.$validator.verifyAll('timeDemo')
      //  if (result.indexOf(false) > -1) {
      //    return
      //  }
      // if(dayGap(this.cdt.startFltdate,this.cdt.endFltdate,0)>30){
      //   this.$alert('航班日期查询时间间隔不能超过一个月，如有需要请分多次查询', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // }
      let pl={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt,
        "direction":num
      };
      this.$api.post('/manage-platform/iapiHead/queryListPage',pl,
       r => {
         if(r.success){
           if(r.data.nextState==0){
             console.log(document.getElementsByClassName('btn-next')[0])
             document.getElementsByClassName('btn-next')[0].disabled=true;
           }else{
             document.getElementsByClassName('btn-next')[0].disabled=false;
           }

           this.tableData=r.data.resultList;//表格数据
           this.currentPage = r.data.currentPage;

           if(num == 1){
             this.totalPageM(this.currentPage,this.showCount,this.cdt1,1);
           }else{
             this.totalPageM(this.currentPage,this.showCount,this.cdt);
           }
         }
      })
    },
    searchZH(){
      if(this.batchFlag == 1){//批量导入
        for(var i in this.cdt){
          if(this.cdt[i]!=''){
            this.$confirm('已批量导入查询条件，请点击重置后，再输入查询项查询', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        }
        this.getList(this.currentPage,this.showCount,this.cdt1,1);
      }else if(this.batchFlag == 0){
        this.getList(this.currentPage,this.showCount,this.cdt);
      }
    },
    reset(){
      this.cdt={isBlurred:false};
      this.ssss='';
      this.tableData=[];

      if(this.batchFlag == 1){
        this.batchFlag = 0;
        this.$message({
          message: '重置成功',
          type: 'success'
        });
      }
    },
    pageSizeChange(val) {//显示条数，调用
      this.getList(this.currentPage,val,this.cdt);
    },
    handleCurrentChange(val){
      this.getList(val,this.showCount,this.cdt);
    },
    //===========================打印导出================================
    exportZH(){
      if(this.batchFlag == 1){//批量导入之后的导出
        this.tableDown(1)
      }else if(this.batchFlag == 0){
        this.tableDown()
      }
    },
    tableDown(num){
      axios({
       method: 'post',
       url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportFileIo/4/iapiHead/600',
       // url: this.$api.rootUrl+"/manage-platform/iapiHead/exportFileIo/600",
       data: {
           "exclTitles": this.checkList,
           "cdt":this.cdt,
           "direction":num,
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data,type) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        if(type==1){
          link.setAttribute('download', 'template.xlsx')
        }else{
          link.setAttribute('download', format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
        }
        document.body.appendChild(link)
        link.click()
    },
  },
}
</script>

<style scoped>

</style>
<style media="screen">
  .t-save .el-select{
    width: 127px;
  }
 .plan .el-input{
   width:75%!important;
 }
 .tableRy .caret-wrapper{
   width: 20px!important;
 }
 .expression .el-textarea__inner{
   height: 105px;
   overflow-y: auto;
 }
 .akUl button{
   margin-left: 10px!important;
 }
 .akUl .el-input--mini .el-input__icon{
   line-height: 32px!important;
 }
 .input-inp{
   width: 100%!important;
 }
 .t-input-text{
   width: 38%!important;
 }
 .selfButton{
   padding-left: 10px!important;
 }
 .t-width100{
   width: 100%!important;
 }
 .t-operator .el-input--suffix .el-input__inner{
   padding-right: 22px!important;
 }
.selfAdd{
  margin-bottom: 5px;
}
</style>
