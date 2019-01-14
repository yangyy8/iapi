<template lang="html">
  <div class="">
    <!-- 查询条件 -->
    <div class="ak-tab-pane">
      <div class="">
        <el-row type="flex" style="height:100%">
          <el-col :span="22" class="bd0">
            <div class="akcheck2top boder1">
              <el-button type="primary" plain size="mini" @click="addRow">添加</el-button>
              <el-button type="primary" plain size="mini" @click="batchI">批量导入</el-button>
              <el-button type="primary" plain size="mini" @click="download">下载模板</el-button>
            </div>
            <div class="akUl">
              <!-- iapi查询条件 -->
              <el-table
                ref="multipleTable"
                :data="rows"
                border
                style="width: 100%;"
                max-height="140"
                id="out-table"
                v-if="bigBase==5">
                <el-table-column
                  label="国籍/地区"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择国籍" v-model="scope.row.nationalityEqual" filterable clearable size="mini" class="input-inp" @visible-change="nation">
                      <el-option
                        v-for="item in nationName"
                        :key="item.CODE"
                        :value="item.CODE"
                        :label="item.CODE+' - '+item.CNAME"
                      ></el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="证件号码"
                  width="200">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入证件号码" v-model="scope.row.passportnoEqual" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>

                <el-table-column
                  label="姓名"
                  width="150">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入姓名" v-model="scope.row.familyname" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>
                <el-table-column
                  label="性别"
                  width="130">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择性别" v-model="scope.row.genderEqual" size="mini"  class="input-inp" filterable clearable>
                      <el-option label="M - 男" value="M"></el-option>
                      <el-option label="F - 女" value="F"></el-option>
                      <el-option label="U - 未知" value="U"></el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="出生日期"
                  width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.dateofbirth"
                    type="date" size="mini"
                    placeholder="请选择出生日期"
                    class="input-inp"
                    value-format="yyyyMMdd">
                  </el-date-picker>
                 </template>
                </el-table-column>
                <el-table-column
                  label="航班号"
                  width="150">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入航班号" v-model="scope.row.fltnoEqual" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>
                <el-table-column
                  label="航班日期"
                  width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.flightDepartdate"
                    type="date" size="mini"
                    placeholder="请选择航班日期"
                    class="input-inp"
                    value-format="yyyyMMdd">
                  </el-date-picker>
                 </template>
                </el-table-column>
                <el-table-column
                  label="起飞机场"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择起飞机场" v-model="scope.row.cityfromEqual" filterable clearable @visible-change="takeOff" size="mini" class="input-inp">
                      <el-option
                      v-for="item in takeOffName"
                      :key="item.AIRPORT_CODE"
                      :value="item.AIRPORT_CODE"
                      :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                      </el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="到达机场"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择到达机场" v-model="scope.row.citytoEqual" filterable clearable @visible-change="landing" size="mini" class="input-inp">
                      <el-option
                      v-for="item in landingName"
                      :key="item.AIRPORT_CODE"
                      :value="item.AIRPORT_CODE"
                      :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                      </el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120"
                  fixed="right">
                  <template slot-scope="scope">
                    <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deleteRow(scope.$index)">删除</el-button>
                    </div>
                 </template>
                </el-table-column>
              </el-table>
              <!-- pnr查询条件 -->
              <el-table
                ref="multipleTable"
                :data="rowsPnr"
                border
                style="width: 100%;"
                max-height="140"
                id="out-tablePnr"
                v-if="bigBase==6">
                <el-table-column
                  label="国籍/地区"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择国籍" v-model="scope.row.nationalityEqual" filterable clearable size="mini" class="input-inp" @visible-change="nation">
                      <el-option
                        v-for="item in nationNamePnr"
                        :key="item.CODE"
                        :value="item.CODE"
                        :label="item.CODE+' - '+item.CNAME"
                      ></el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="证件号码"
                  width="200">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入证件号码" v-model="scope.row.passportnoEqual" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>

                <el-table-column
                  label="姓名"
                  width="150">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入姓名" v-model="scope.row.familyname" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>
                <el-table-column
                  label="性别"
                  width="130">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择性别" v-model="scope.row.genderEqual" size="mini"  class="input-inp" filterable clearable>
                      <el-option label="M - 男" value="M"></el-option>
                      <el-option label="F - 女" value="F"></el-option>
                      <el-option label="U - 未知" value="U"></el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="出生日期"
                  width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.dateofbirth"
                    type="date" size="mini"
                    placeholder="请选择出生日期"
                    class="input-inp"
                    value-format="yyyyMMdd">
                  </el-date-picker>
                 </template>
                </el-table-column>
                <el-table-column
                  label="航班号"
                  width="150">
                  <template slot-scope="scope">
                    <el-input placeholder="请输入航班号" v-model="scope.row.fltnoEqual" size="mini" class="input-inp"></el-input>
                 </template>
                </el-table-column>
                <el-table-column
                  label="航班日期"
                  width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.flightDepartdate"
                    type="date" size="mini"
                    placeholder="请选择航班日期"
                    class="input-inp"
                    value-format="yyyyMMdd">
                  </el-date-picker>
                 </template>
                </el-table-column>
                <el-table-column
                  label="起飞机场"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择起飞机场" v-model="scope.row.cityfromEqual" filterable clearable @visible-change="takeOff" size="mini" class="input-inp">
                      <el-option
                      v-for="item in takeOffNamePnr"
                      :key="item.AIRPORT_CODE"
                      :value="item.AIRPORT_CODE"
                      :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                      </el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="到达机场"
                  width="200">
                  <template slot-scope="scope">
                    <el-select placeholder="请选择到达机场" v-model="scope.row.citytoEqual" filterable clearable @visible-change="landing" size="mini" class="input-inp">
                      <el-option
                      v-for="item in landingNamePnr"
                      :key="item.AIRPORT_CODE"
                      :value="item.AIRPORT_CODE"
                      :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                      </el-option>
                    </el-select>
                 </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120"
                  fixed="right">
                  <template slot-scope="scope">
                    <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deleteRowPnr(scope.$index)">删除</el-button>
                    </div>
                 </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="mb-15" size="small" @click="batchSearch">查询</el-button>
            <el-button type="primary" plain size="small" @click="batchReset">重置</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" style="height:100%">
          <el-col :span="22" style="margin-top: 15px;">
            <!-- 保存方案 -->
            <div class="t-save">
              <el-select  v-if="bigBase==5" filterable clearable v-model="pppp"  @visible-change="batchSavePlanShow" @change="batchPlanQuery(pppp)" placeholder="方案选择" size="small" class="mr-15">
                <el-option
                  v-for="item in batchSaveName"
                  :label="item"
                  :value="item"
                  :key="item"
                  >
                  <span class="planItem">{{item}}</span>
                  <span class="planDelete el-icon-circle-close" @click.stop="batchDeleteItem(item)"></span>
                </el-option>
              </el-select>
              <el-select  v-if="bigBase==6" filterable clearable v-model="rrrr"  @visible-change="batchSavePlanShow" @change="batchPlanQuery(rrrr)" placeholder="方案选择" size="small" class="mr-15">
                <el-option
                  v-for="item in batchSaveNamePnr"
                  :label="item"
                  :value="item"
                  :key="item">
                  <span class="planItem">{{item}}</span>
                  <span class="planDelete el-icon-circle-close" @click.stop="batchDeleteItem(item)"></span>
                </el-option>
              </el-select>
              <button type="button" name="button" @click="batchDialogVisible = true;ppp=''">保存方案</button>
            </div>
            <!-- 写入方案名称 -->
            <el-dialog
              title="方案名称"
              :visible.sync="batchDialogVisible"
              width="30%">
              <el-form  class="plan">
                <el-form-item label="方案名称:" :label-width="formLabelWidth">
                  <el-input v-model="ppp" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="batchPlanSave">保存</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="middle-btn-g middle">
      <button type="button" name="button" class="mr-15" :class="{'pitchOn':bigBase==5}" @click="bigBase=5">IAPI数据</button>
      <button type="button" name="button" :class="{'pitchOn':bigBase==6}"  @click="bigBase=6;">PNR数据</button>
    </div>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2" v-if="bigBase==5">
      <div class="title-green">
        <span style="float:left">结果显示项</span>
        <el-button style="float:right" type="primary" plain @click="openCheck" size="mini">{{text}}</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkList" class="o-checkbox-g" v-show="openCheckbox">
         <el-checkbox v-for="item in checkItem" :label="item.ITEMNAME" :key="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2" v-if="bigBase==6">
      <div class="title-green">
        <span style="float:left">结果显示项</span>
        <el-button style="float:right" type="primary" plain @click="openCheck" size="mini">{{textPnr}}</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkListPnr" class="o-checkbox-g" v-show="openCheckboxPnr">
         <el-checkbox v-for="item in checkItemPnr" :label="item.ITEMNAME" :key="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>
    <!-- 表格 -->
    <div class="middle">
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="seat">航班座位图</el-button> -->
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({name:'QueryGLRY'})">关联人员查询</el-button> -->
      <el-button  plain class="table-btn mb-9" size="small" @click="tableDown">导出</el-button>
      <el-button  plain class="table-btn mb-9" size="small" v-print="'#printMe'">打印</el-button>
      <!-- iapi表格 -->
      <el-table
        ref="singleTable"
        class="tableRy"
        :data="tableData"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @selection-change="handleSelectionChange"
        id="printMe"
        v-if="bigBase==5">
        <el-table-column
          label="多选"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="iapiName"
          label="姓名"
          sortable
          width="130"
          v-if="checkList.indexOf(checkItem[0].ITEMNAME)>-1">
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
          prop="FLTDATE"
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
          width="100"
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
          prop="ORIGINNAME"
          label="最初上机地"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[29].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="DESTINATIONNAME"
          label="最终下机地"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[30].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNRFLAG"
          label="是否订票"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[31].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="CHKFLAG"
          label="是否值机"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[32].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="EEFLAG"
          label="出入境手续"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[33].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="CLSFLAG"
          label="航班是否关闭"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[34].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" title="详情" icon="el-icon-tickets" @click="detailsIapi(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot" v-if="bigBase==5">
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
      <!-- pnr表格 -->
      <el-table
        ref="singleTablePnr"
        class="tableRy"
        :data="tableDataPnr"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @selection-change="handleSelectionChange"
        id="printMe"
        v-if="bigBase==6">
        <el-table-column
          label="多选"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="pnrName"
          label="姓名"
          sortable
          width="130"
          v-if="checkListPnr.indexOf(checkItemPnr[0].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_GENDER"
          label="性别"
          width="100"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[1].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="pnrBirthdayName"
          label="出生日期"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[2].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="pnrNationaName"
          label="国籍/地区"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_PASSPORTNO"
          label="证件号码"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTNO"
          label="航班号"
          width="100"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTDATE1"
          label="航班日期"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTTYPE"
          label="出入标识"
          width="100"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="pnrCityfromName"
          label="起飞机场"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="pnrCitytoName"
          label="到达机场"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[9].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_DEPARTDATESTR"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_ARRIVDATESTR"
          label="预计到达时间"
          width="180"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[11].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="TKTNUMBER"
          label="电子客票号"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_CARDEXPIREDATESTR"
          label="证件有效期截止日期"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_RCITIME_STR"
          label="订票时间"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="pnrCardName"
          label="证件种类"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PASSPORTISSUECOUNTRYNAME"
          label="证件签发国"
          width="150"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_RCI"
          label="旅客订票号"
          width="130"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_SPECIFIGSEAT"
          label="座位号"
          width="140"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_CARBINCLASSDESIGNATOR"
          label="舱位"
          width="140"
          sortable
          v-if="checkListPnr.indexOf(checkItemPnr[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" title="详情" icon="el-icon-tickets" @click="detailsPnr(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot" v-if="bigBase==6">
        <div class="page-msg">
          <div class="">
            第{{currentPagePnr}}页
          </div>
          <div class="">
            每页
            <el-select v-model="showCountPnr" @change="pageSizeChange(showCountPnr)" placeholder="10" size="mini" class="page-select">
              <el-option
                v-for="item in optionsPnr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            条
          </div>
          <div class="">
            共{{totalResultPnr}}条
          </div>
        </div>
        <el-pagination
          background
          :current-page.sync ="currentPagePnr"
          @current-change="handleCurrentChange"

          :page-size="showCountPnr"
          prev-text="上一页"
          next-text="下一页"
          layout="prev,next"
          >
        </el-pagination>
      </div>
    </div>
    <!-- :action="$api.rootUrl+'/manage-platform/iapi/readExcel'" -->
    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="releaseform" ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="excel"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

          action="http://192.168.99.248:8080/manage-platform/iapi/readExcel"
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
    <!-- pnr详情 -->
    <el-dialog title="查看详情" :visible.sync="detailsPnrDialogVisible">
      <Detail :detailType="1" :pnrType="6" :SERIALPnr="SERIALPnr0" :PNR_TIDPnr="PNR_TIDPnr0" :PNR_TKTNUMBERPnr="PNR_TKTNUMBERPnr0"></Detail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsPnrDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- iapi详情 -->
    <!-- <el-dialog title="查看详情" :visible.sync="detailsIapiDialogVisible">
      <DetailIapi  :SERIAL="SERIAL0" :PASSPORTNO="PASSPORTNO0" :iapiNationaName="iapiNationaName0"></DetailIapi>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsIapiDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog> -->

    <el-dialog title="查看详情" :visible.sync="detailsIapiDialogVisible">
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
          <el-col :span="8" class="t-el-content"><div class="t-el-text">出入境手续：</div><div class="t-el-sub">{{dform.EEFLAG==1?'是':'否'}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否订票：</div><div class="t-el-sub">{{dform.PNRFLAG==1?'是':'否'}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否值机：</div><div class="t-el-sub">{{dform.CHKFLAG==1?'是':'否'}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班是否关闭：</div><div class="t-el-sub">{{dform.CLSFLAG==1?'是':'否'}}</div></el-col>
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
        <el-button @click="detailsIapiDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import Seat from '../../other/seat'
import Detail from './DetailRYXX'
import DetailIapi from './DetailsIapi'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  components: {AlarmProcess},
  components: {Seat},
  components: {Detail},
  // components: {DetailIapi},
  data(){
    return{
      //导出
      batchTableList:[],
      batchTableListPnr:[],

      text:'收起',
      openCheckbox:true,
      textPnr:'收起',
      openCheckboxPnr:true,
      //iapi详情
      detailsIapiDialogVisible:false,
      iapiNationaName0:'',
      PASSPORTNO0:'',
      SERIAL0:'',

      dform:{},
      check:{},
      rules:{},
      eve:'',
      isCheck:false,
      isName:true,
      isRules:true,
      detailstableData:[],
      queryDialogVisible:false,
      historyCdt:{},
      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数
      nav1Id:null,
      nav2Id:null,


      //pnr详情
      detailsPnrDialogVisible:false,
      SERIALPnr0:'',
      PNR_TIDPnr0:'',
      PNR_TKTNUMBERPnr0:'',
      //iapi查询条件
      uploadDialogVisible:false,
      releaseform:{},
      rows:[
        {
          version:1,
          nationalityEqual:'',
          nationalityNameEqual:'',
          passportnoEqual:'',
          fltnoEqual:'',
          familyname:'',
          genderEqual:'',
          startDateofbirth:'',
          startFlightDepartdate:'',
          cityfromEqual:'',
          startDepartdate:'',
          citytoEqual:'',
          endArrivdate:'',
          cityfromNameEqual:'',
          citytoNameEqual:''
        }
      ],
      modelrow:{
        version:0,
        nationalityEqual:'',
        passportnoEqual:'',
        fltnoEqual:'',
        familyname:'',
        genderEqual:'',
        startDateofbirth:'',
        startFlightDepartdate:'',
        cityfromEqual:'',
        startDepartdate:'',
        citytoEqual:'',
        endArrivdate:''
      },
      cleanRow:{
        version:0,
        nationalityEqual:'',
        passportnoEqual:'',
        fltnoEqual:'',
        familyname:'',
        genderEqual:'',
        startDateofbirth:'',
        startFlightDepartdate:'',
        cityfromEqual:'',
        startDepartdate:'',
        citytoEqual:'',
        endArrivdate:''
      },
      count:1,
      nationName:[],//国籍
      takeOffName:[],
      landingName:[],
      bigBase:5,
      //pnr查询条件
      rowsPnr:[{
        version:1,
        nationalityEqual:'',
        nationalityNameEqual:'',
        passportnoEqual:'',
        fltnoEqual:'',
        familyname:'',
        genderEqual:'',
        startDateofbirth:'',
        startFlightDepartdate:'',
        cityfromEqual:'',
        startDepartdate:'',
        citytoEqual:'',
        endArrivdate:'',
        cityfromNameEqual:'',
        citytoNameEqual:''
      }],
      countPnr:1,
      nationNamePnr:[],//国籍
      takeOffNamePnr:[],
      landingNamePnr:[],
      //方案保存iapi
      pppp:'',//方案渲染
      batchSaveName:[],//方案名称集合
      batchDialogVisible:false,
      ppp:'',//方案名称渲染
      formLabelWidth:'120px',
      //方案保存pnr
      rrrr:'',//方案渲染
      batchSaveNamePnr:[],//方案名称集合
      //iapi表格数据
      tableData:[],
      radio:'',
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数
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
      //pnr表格数据
      tableDataPnr:[],
      radioPnr:'',
      currentPagePnr:1,//当前页数
      pageSizePnr:10, //每页显示个数选择器的选项设置
      showCountPnr:10,//每页显示的记录数
      totalResultPnr:0,//总条数
      totalPagePnr:1,//总页数
      optionsPnr:[
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
      //展示项
      checkList: ['iapiName','INTG_CHNNAME','GENDER','iapiBirthdayName','iapiNationaName','iapiCardName','PASSPORTNO','FLTNO','FLTDATE','CHECKRESULT','FLIGHTTYPE','iapiCityfromName'],
      checkListPnr: ['pnrName','PNR_GENDER','pnrBirthdayName','pnrNationaName','PNR_PASSPORTNO','PNR_FLTNO','PNR_FLTDATE1','PNR_FLTTYPE','pnrCityfromName','pnrCitytoName','PNR_DEPARTDATESTR','PNR_ARRIVDATESTR'],
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
          ITEMNAME:'FLTDATE',
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
          ITEMNAME:'ORIGINNAME',
          LABEL:'最初上机地',
        },
        {
          ITEMNAME:'DESTINATIONNAME',
          LABEL:'最终下机地',
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
        }
      ],
      checkItemPnr:[
        {
          ITEMNAME:'pnrName',
          LABEL:'姓名',
        },
        {
          ITEMNAME:'PNR_GENDER',
          LABEL:'性别',
        },
        {
          ITEMNAME:'pnrBirthdayName',
          LABEL:'出生日期',
        },
        {
          ITEMNAME:'pnrNationaName',
          LABEL:'国籍/地区',
        },
        {
          ITEMNAME:'PNR_PASSPORTNO',
          LABEL:'证件号码',
        },
        {
          ITEMNAME:'PNR_FLTNO',
          LABEL:'航班号',
        },
        {
          ITEMNAME:'PNR_FLTDATE1',
          LABEL:'航班日期',
        },
        {
          ITEMNAME:'PNR_FLTTYPE',
          LABEL:'出入标识',
        },
        // {
        //   ITEMNAME:'I_15',
        //   LABEL:'起飞城市',
        // },
        // {
        //   ITEMNAME:'I_74',
        //   LABEL:'到达城市',
        // },
        {
          ITEMNAME:'pnrCityfromName',
          LABEL:'起飞机场',
        },
        {
          ITEMNAME:'pnrCitytoName',
          LABEL:'到达机场',
        },
        {
          ITEMNAME:'PNR_DEPARTDATESTR',
          LABEL:'预计起飞时间',
        },
        {
          ITEMNAME:'PNR_ARRIVDATESTR',
          LABEL:'预计到达时间',
        },
        {
          ITEMNAME:'TKTNUMBER',
          LABEL:'电子客票号',
        },
        {
          ITEMNAME:'PNR_CARDEXPIREDATESTR',
          LABEL:'证件有效期截止日期',
        },
        {
          ITEMNAME:'PNR_RCITIME_STR',
          LABEL:'订票时间',
        },
        {
          ITEMNAME:'pnrCardName',
          LABEL:'证件种类',
        },
        {
          ITEMNAME:'PASSPORTISSUECOUNTRYNAME',
          LABEL:'证件签发国',
        },
        {
          ITEMNAME:'PNR_RCI',
          LABEL:'旅客订票号',
        },
        {
          ITEMNAME:'PNR_SPECIFIGSEAT',
          LABEL:'座位号',
        },
        {
          ITEMNAME:'PNR_CARBINCLASSDESIGNATOR',
          LABEL:'舱位',
        },
      ],
      showConfiglist:[],//展示项数组
      showConfiglistPnr:[],
    }
  },
  mounted(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    document.getElementsByClassName('btn-next')[0].disabled=true;
  },
  activated(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  filters:{
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
    //------------------------------------------------全局代码项-------------------------------------------------
    handleSelectionChange(val){
      if(this.bigBase==5){
        this.batchTableList = val;
      }else if(this.bigBase==6){
        this.batchTableListPnr = val;
      }
    },
    detailsPnr(i){
      this.SERIALPnr0 = i.SERIAL;
      this.PNR_TIDPnr0 = i.PNR_TID;
      this.PNR_TKTNUMBERPnr0 = i.PNR_TKTNUMBER;
      this.detailsPnrDialogVisible = true;
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
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    reviewDetail(){//详情里的查看详情信息
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
         }
       })
    },
    detailsIapi(i){
      this.historyCdt.NATIONALITY = i.NATIONALITY;
      this.historyCdt.PASSPORTNO = i.PASSPORTNO;
      this.historyCdt.nationalityEqual = i.NATIONALITY;
      this.historyCdt.passportnoEqual = i.PASSPORTNO;
      this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
      let p={
        'serial':i.CHK_SERIAL
      }
      this.$api.post('/manage-platform/iapi/queryIapiInfo',p,
       r =>{
         if(r.success){
           this.detailsIapiDialogVisible = true;
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
         }
       })
    },
    // detailsIapi(i){
    //   this.iapiNationaName0 = i.iapiNationaName;
    //   this.PASSPORTNO0 = i.PASSPORTNO;
    //   this.SERIAL0 = i.SERIAL;
    //   this.detailsIapiDialogVisible = true;
    // },
    nation(){ //批量查询国籍
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           if(this.bigBase==5){
             this.nationName = r.data;
           }else if(this.bigBase==6){
             this.nationNamePnr = r.data;
           }
         };
       })
    },
    takeOff(){//调用起飞机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           if(this.bigBase==5){
             this.takeOffName = r.data;
           }else if(this.bigBase==6){
             this.takeOffNamePnr = r.data;
           }
         }
       })
    },
    landing(){//调用降落机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           if(this.bigBase==5){
             this.landingName = r.data;
           }else if(this.bigBase==6){
             this.landingNamePnr = r.data;
           }
         }
       })
    },
    openCheck(){
      if(this.bigBase==5){
        this.openCheckbox = !this.openCheckbox
        if(this.openCheckbox == true){
          this.text = '收起';
        }else {
          this.text = '展开';
        }
      }else if(this.bigBase==6){
        this.openCheckboxPnr = !this.openCheckboxPnr
        if(this.openCheckboxPnr == true){
          this.textPnr = '收起';
        }else {
          this.textPnr = '展开';
        }
      }

    },
    //============================================查询项代码===============================================
    pageSizeChange(val) {//iapi显示条数，调用
      if(this.bigBase==5){
        this.batchQueryList(this.currentPage,val,this.rows);
      }else if(this.bigBase==6){
        this.batchQueryListPnr(this.currentPagePnr,val,this.rowsPnr)
      }
    },
    handleCurrentChange(val) {//显示当前页，调用
      if(this.bigBase==5){
        this.batchQueryList(val,this.showCount,this.rows);
      }else if(this.bigBase==6){
        this.batchQueryListPnr(val,this.showCountPnr,this.rowsPnr);
      }
    },
    batchSearch(){
      if(this.bigBase==5){
        this.batchQueryList(this.currentPage,this.showCount,this.rows)
      }else if(this.bigBase==6){
        this.batchQueryListPnr(this.currentPagePnr,this.showCountPnr,this.rowsPnr);
      }
    },
    batchQueryList(currentPage,showCount,rows){//iapi查询列表
      let bql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":rows
      }
      this.$api.post('/manage-platform/iapiHead/queryIapiBatch',bql,
      r =>{
        if(r.success){
          if(r.data.nextState==0){
            console.log(document.getElementsByClassName('btn-next')[0])
            document.getElementsByClassName('btn-next')[0].disabled=true;
          }else{
            document.getElementsByClassName('btn-next')[0].disabled=false;
          }
          this.tableData=r.data.resultList;//表格数据
          this.currentPage = r.data.currentPage;
          this.$api.post('/manage-platform/iapiHead/queryIapiBatchCount',bql,
           r =>{
             if(r.success){
               this.totalResult = r.data;
             }
           })
        }
      })
    },
    batchQueryListPnr(currentPage,showCount,rows){//批量查询pnr
      let bqlp = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":rows
      }
      this.$api.post('/manage-platform/iapiHead/queryPnrBatch',bqlp,
      r =>{
        if(r.success){
          if(r.data.nextState==0){
            console.log(document.getElementsByClassName('btn-next')[0])
            document.getElementsByClassName('btn-next')[0].disabled=true;
          }else{
            document.getElementsByClassName('btn-next')[0].disabled=false;
          }
          this.tableDataPnr=r.data.resultList;//表格数据
          this.currentPagePnr = r.data.currentPage;
          this.$api.post('/manage-platform/iapiHead/queryPnrBatchCount',bqlp,
           r =>{
             if(r.success){
               this.totalResultPnr = r.data;
             }
           })
        }
      })
    },

    download(){//导出查询条件列表
      // console.log(format(new Date(),'yyyy-MM-dd hh:mm:ss'));
      // console.log(this.$api.rootUrl+"/manage-platform/iapi/export/three");
      if(this.bigBase==5){//导出iapi
        axios({
         method: 'post',
         // url: 'http://192.168.99.248:8080/manage-platform/iapi/export/three',
         url: this.$api.rootUrl+"/manage-platform/iapi/export/three",
         data: {
             "name": 'Fred',
             "cdtList":this.rows
         },
         responseType: 'blob'
         }).then(response => {
             this.downloadM(response,1)
         }).catch((error) => {

         });
      }else if(this.bigBase==6){//导出pnr
        axios({
         method: 'post',
         // url: 'http://192.168.99.248:8080/manage-platform/iapi/export/three',
         url: this.$api.rootUrl+"/manage-platform/iapi/export/three",
         data: {
             "name": 'Fred',
             "cdtList":this.rowsPnr
         },
         responseType: 'blob'
         }).then(response => {
             this.downloadM(response,1)
         }).catch((error) => {

         });
      }
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
    tableDown(){
      if(this.bigBase==5){//导出iapi查询列表
        if(this.batchTableList.length==0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportFileIo/5/iapi/600',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportFileIo/5/iapi/600",
           data: {
               "exclTitles": this.checkList,
               "cdtList":this.rows
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }else if(this.batchTableList.length!=0){
          alert(666);
          console.log(this.batchTableList);
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCheckColDataIo/5',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCheckColDataIo/5",
           data: {
               "exclTitles": this.checkList,
               "resultList":this.batchTableList
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }

      }else if(this.bigBase==6){//导出pnr查询列表
        if(this.batchTableListPnr.length==0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportFileIo/6/pnr/600',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportFileIo/6/pnr/600",
           data: {
               "exclTitles": this.checkListPnr,
               "cdtList":this.rowsPnr
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }else if(this.batchTableListPnr.length!=0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCheckColDataIo/6',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCheckColDataIo/6",
           data: {
               "exclTitles": this.checkListPnr,
               "resultList":this.batchTableListPnr
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }

      }

    },
    addRow(){//批量查询 添加操作
      if(this.bigBase==5){
        this.count++;
        this.modelrow = {
          version:0,
          nationalityEqual:'',
          passportnoEqual:'',
          fltnoEqual:'',
          familyname:'',
          genderEqual:'',
          startDateofbirth:'',
          startFlightDepartdate:'',
          cityfromEqual:'',
          startDepartdate:'',
          citytoEqual:'',
          endArrivdate:''
        };
        this.modelrow.version=this.count;
        this.rows.push(this.modelrow);
      }else if(this.bigBase==6){
        this.countPnr++;
        this.modelrow = {
          version:0,
          nationalityEqual:'',
          passportnoEqual:'',
          fltnoEqual:'',
          familyname:'',
          genderEqual:'',
          startDateofbirth:'',
          startFlightDepartdate:'',
          cityfromEqual:'',
          startDepartdate:'',
          citytoEqual:'',
          endArrivdate:''
        };
        this.modelrow.version=this.countPnr;
        this.rowsPnr.push(this.modelrow);
      }
    },
    deleteRow(item){//批量查询 删除操作
      this.rows.splice(item,1);
    },
    deleteRowPnr(item){
      this.rowsPnr.splice(item,1);
    },
    batchReset(){
      if(this.bigBase == 5){
        this.rows = [{
          version:1,
          nationalityEqual:'',
          passportnoEqual:'',
          fltnoEqual:'',
          familyname:'',
          genderEqual:'',
          startDateofbirth:'',
          startFlightDepartdate:'',
          cityfromEqual:'',
          startDepartdate:'',
          citytoEqual:'',
          endArrivdate:''
        }];
        this.pppp='';
        this.batchQueryList(this.currentPage,this.showCount,this.rows);
      }else if(this.bigBase == 6){
        this.rowsPnr = [{
          version:1,
          nationalityEqual:'',
          passportnoEqual:'',
          fltnoEqual:'',
          familyname:'',
          genderEqual:'',
          startDateofbirth:'',
          startFlightDepartdate:'',
          cityfromEqual:'',
          startDepartdate:'',
          citytoEqual:'',
          endArrivdate:''
        }];
        this.rrrr='';
        this.batchQueryListPnr(this.currentPagePnr,this.showCountPnr,this.rowsPnr);
      }
    },
    batchI(){
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
    uploadSuccess(response, file, fileList){//查询条件批量导入
      console.log(response);
      if(response.success){
        this.uploadDialogVisible=false;
        if(this.bigBase==5){
          this.rows = response.data.cdtList;
        }else if(this.bigBase==6){
          this.rowsPnr = response.data.cdtList;
        }
        this.$refs.upload.clearFiles();
        this.$message({
          duration:3000,
          message: '恭喜你，导入成功！',
          type: 'success'
        });
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
    //==============================方案保存=======================================================
    batchSavePlanShow(){//批量查询方案名称列表
      let bsp = {
        page : this.bigBase
      }
      this.$api.post('/manage-platform/queryShow/queryNameList',bsp,
       r =>{
         if(r.success){
           if(this.bigBase==5){
             this.batchSaveName = r.data;
           }else if(this.bigBase==6){
             this.batchSaveNamePnr = r.data
           }
         }
       })
    },
    batchPlanQuery(name){//批量查询 方案渲染
      let bpq = {
        page : this.bigBase,
        name : name
      }
      this.$api.post('/manage-platform/queryShow/queryConfigInfo',bpq,
      r =>{
        if(r.success){
          // 查询项渲染
          let arr = r.data.showConfigList;
          let arr1 = [];
          if(r.data.configList.length == 0){
            if(this.bigBase==5){
              this.rows=[{
                version:1,
                nationalityEqual:'',
                nationalityNameEqual:'',
                passportnoEqual:'',
                fltnoEqual:'',
                familyname:'',
                genderEqual:'',
                startDateofbirth:'',
                startFlightDepartdate:'',
                cityfromEqual:'',
                startDepartdate:'',
                citytoEqual:'',
                endArrivdate:'',
                cityfromNameEqual:'',
                citytoNameEqual:''
              }]
            }else if(this.bigBase==6){
              this.rowsPnr=[{
                version:1,
                nationalityEqual:'',
                nationalityNameEqual:'',
                passportnoEqual:'',
                fltnoEqual:'',
                familyname:'',
                genderEqual:'',
                startDateofbirth:'',
                startFlightDepartdate:'',
                cityfromEqual:'',
                startDepartdate:'',
                citytoEqual:'',
                endArrivdate:'',
                cityfromNameEqual:'',
                citytoNameEqual:''
              }]
            }
          }else{
            if(this.bigBase==5){
              this.rows = r.data.configList;
            }else if(this.bigBase==6){
              this.rowsPnr = r.data.configList;
            }
          }
          //展示项渲染
          if(arr.length == 0){
            if(this.bigBase==5){
              this.checkList = ['iapiName','INTG_CHNNAME','GENDER','iapiBirthdayName','iapiNationaName','iapiCardName','PASSPORTNO','FLTNO','FLTDATE','CHECKRESULT','FLIGHTTYPE','iapiCityfromName'];
            }else if(this.bigBase==6){
              this.checkListPnr = ['pnrName','PNR_GENDER','pnrBirthdayName','pnrNationaName','PNR_PASSPORTNO','PNR_FLTNO','PNR_FLTDATE1','PNR_FLTTYPE','pnrCityfromName','pnrCitytoName','PNR_DEPARTDATESTR','PNR_ARRIVDATESTR'];
            }
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i].isCheck == '1'){
                arr1.push(arr[i].itemName);
              }
            }
            if(this.bigBase==5){
              this.checkList = arr1;
            }else if(this.bigBase==6){
              this.checkListPnr = arr1;
            }
          }
        }
      })
    },
    batchDeleteItem(i){//删除方案
      this.$confirm('方案删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let di = this.saveName.indexOf(i);
        // this.saveName.splice(di,1);
        let dei = {
          name:i,
          page:this.bigBase
        };
        this.$api.post('/manage-platform/queryShow/delete',dei,
         r =>{
           if(r.success){
             if(this.bigBase==5){
               if(this.pppp==i){
                 this.pppp='';
                 this.rows = [{
                   version:1,
                   nationalityEqual:'',
                   passportnoEqual:'',
                   fltnoEqual:'',
                   familyname:'',
                   genderEqual:'',
                   startDateofbirth:'',
                   startFlightDepartdate:'',
                   cityfromEqual:'',
                   startDepartdate:'',
                   citytoEqual:'',
                   endArrivdate:''
                 }];
               }else{
                 this.batchSavePlanShow();
               }
             }else if(this.bigBase==6){
               if(this.rrrr==i){
                 this.rrrr='';
                 this.rowsPnr = [{
                   version:1,
                   nationalityEqual:'',
                   passportnoEqual:'',
                   fltnoEqual:'',
                   familyname:'',
                   genderEqual:'',
                   startDateofbirth:'',
                   startFlightDepartdate:'',
                   cityfromEqual:'',
                   startDepartdate:'',
                   citytoEqual:'',
                   endArrivdate:''
                 }];
               }else{
                 this.batchSavePlanShow();
               }
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
    batchPlanSave(){//批量 方案保存是否重名
      if(this.ppp==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let  batch = {
        name : this.ppp,
        page : this.bigBase
      }
      this.$api.post('/manage-platform/queryShow/isExistName',batch,
       r =>{
         if(r.success){
           if(r.data == false){
             this.showConfiglistArr();//展示项数组
             if(this.bigBase==5){
               this.batchSavePlan(this.showConfiglist,this.rows);
             }else if(this.bigBase==6){
               this.batchSavePlan(this.showConfiglistPnr,this.rowsPnr);
             }
             this.batchDialogVisible = false;
           }else{
             // this.batchPromptDialogVisible = true;
             this.$alert('方案名称已存在，请重新命名', '提示', {
               confirmButtonText: '确定',
             });
           }
         }
       })
    },
    batchSavePlan(item,row){//批量查询 保存方案
      let batchSP = {
        "name" : this.ppp,
        "page" : this.bigBase,
        "showConfigList":item,
        "configList":row
      }
      this.$api.post('/manage-platform/queryShow/save',batchSP,
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
      if(this.bigBase==5){
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
      }else if(this.bigBase==6){
        this.showConfiglistPnr=[];
        let checkItemPnr=this.checkItemPnr;
        let that = this;
        var arrPnr = this.checkListPnr;
        for(var p in checkItemPnr){
          var objPnr={isCheck:0}
          objPnr.itemName=checkItemPnr[p].ITEMNAME;
          for(var n=0;n<arrPnr.length;n++){
            if(arrPnr[n] == checkItemPnr[p].ITEMNAME){
              objPnr.isCheck=1;
            }
          }
          that.showConfiglistPnr.push(objPnr);
        }
      }
    },
  }
}
</script>

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
