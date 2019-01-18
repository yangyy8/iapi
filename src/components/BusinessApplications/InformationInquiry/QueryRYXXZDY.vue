<template lang="html">
  <div class="">
    <!-- 查询条件 -->
    <div class="ak-tab-pane">
      <el-row type="flex" style="height:100%">
        <el-col :span="22" class="br" type="flex">
          <el-row type="flex" justify="start">
            <el-col :sm="24" :md="12" :lg="12" class="selfAdd">
              <el-button type="primary" plain size="mini" @click="selfAddRow" class="selfAdd">添加</el-button>
            </el-col>
          </el-row>
          <!-- iapi查询条件 -->
          <el-row align="center" :gutter="2" v-if="bigBase==7">
             <!-- 左边查询条件 -->
             <el-col :sm="24" :lg="14" class="queryLeft">
               <el-table
                 ref="multipleTable"
                 :data="selfRows"
                 border
                 style="width: 100%;"
                 max-height="140">
                 <el-table-column
                   label="属性"
                   width="150">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择属性" v-model="scope.row.attribute" filterable clearable size="mini" class="input-inp" @visible-change="attribute(scope.row)" @change="attributeOperator(scope.row)" @click="clearItem(scope.row)">
                       <el-option
                         v-for="item in selfNature"
                         :key="item.code"
                         :value="item.code"
                         :label="item.name"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="操作符"
                   width="120">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.operator" filterable clearable class="input-inp" @visible-change="attribute2(selfNature,scope.row)" size="mini">
                       <el-option
                         v-for="item in operator"
                         :key="item"
                         :value="item"
                         :label="item"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>

                 <el-table-column
                   label="值"
                   width="200">
                   <template slot-scope="scope">
                     <!-- 输入框 -->
                     <el-input placeholder="请输入值" v-model="scope.row.atype" size="mini" v-show="scope.row.type==0" class="input-inp"></el-input>
                     <!-- 性别 -->
                     <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==1" class="input-inp">
                       <el-option label="M - 男" value="M"></el-option>
                       <el-option label="F - 女" value="F"></el-option>
                       <el-option label="U - 未知" value="U"></el-option>
                     </el-select>
                     <!-- 起飞机场 -->
                     <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="takeOff" size="mini" class="input-inp" v-show="scope.row.type==2">
                       <el-option
                       v-for="item in takeOffName"
                       :key="item.AIRPORT_CODE"
                       :value="item.AIRPORT_CODE"
                       :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                       </el-option>
                     </el-select>
                     <!-- 日期 精确到天 -->
                     <el-date-picker
                     v-model="scope.row.atype"
                     v-show="scope.row.type==30||scope.row.type==31||scope.row.type==32"
                     type="date" size="mini"
                     placeholder="选择日期"
                     value-format="yyyyMMdd"
                     class="input-inp">
                    </el-date-picker>
                   <!-- 日期 精确到秒 -->
                     <el-date-picker
                     v-model="scope.row.atype"
                     v-show="scope.row.type==4"
                     type="datetime" size="mini"
                     placeholder="选择日期"
                     value-format="yyyyMMddHHmmss"
                     class="input-inp">
                    </el-date-picker>
                    <!-- 证类接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="paper" size="mini" class="input-inp" v-show="scope.row.type==5">
                      <el-option
                      v-for="item in paperName"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CODE+' - '+item.NAME">
                      </el-option>
                    </el-select>
                    <!-- 出入境 -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==6" class="input-inp">
                      <el-option label="I - 入境" value="I"></el-option>
                      <el-option label="O - 出境" value="O"></el-option>
                    </el-select>
                    <!-- 值机状态 -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==7" class="input-inp">
                      <el-option label="0Z - 允许登机" value="0Z"></el-option>
                      <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                      <el-option label="2Z - 再次核对" value="2Z"></el-option>
                      <el-option label="2Z - 数据错误" value="4Z"></el-option>
                    </el-select>

                    <!-- 航空公司接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="airline" size="mini" class="input-inp" v-show="scope.row.type==8">
                      <el-option
                      v-for="item in airlineName"
                      :key="item.AIRLINE_CODE"
                      :value="item.AIRLINE_CODE"
                      :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                      </el-option>
                    </el-select>
                    <!--  -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==9" class="input-inp">
                      <el-option label="0 - 否" value="0"></el-option>
                      <el-option label="1 - 是" value="1"></el-option>
                    </el-select>

                  </template>
                 </el-table-column>
                 <el-table-column
                   label="逻辑关系"
                   width="110">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.relation" filterable clearable size="mini" class="input-inp" :disabled="scope.row.isA">
                       <el-option label="and" value="and"></el-option>
                       <el-option label="or" value="or"></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="排序方式"
                   width="150">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.dataSort" filterable clearable size="mini" @visible-change="order">
                       <el-option
                         v-for="item in sortSet"
                         :key="item.code"
                         :value="item.code"
                         :label="item.name"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="操作"
                   width="120"
                   fixed="right">
                   <template slot-scope="scope">
                      <el-button class="table-btn" plain size="mini" icon="el-icon-delete" @click="selfDeleteRow(scope.$index,scope.row)">删除</el-button>
                  </template>
                 </el-table-column>
               </el-table>
             </el-col>


              <!-- 右边表达式 -->
              <el-col :lg="10" class="queryRight">
                <el-row type="flex" align="center" :gutter="10" style="width:100%">
                  <span class="input-text expression-text">表达式：</span>
                  <el-input type="textarea" class="expression" v-model="aaa" @input="ii()"></el-input>
                </el-row>
              </el-col>
          </el-row>
          <!-- pnr查询条件 -->
          <el-row align="center" :gutter="2" v-if="bigBase==8">
             <!-- 左边查询条件 -->
             <el-col :sm="24" :lg="14" class="queryLeft">
               <el-table
                 ref="multipleTable"
                 :data="selfRowsPnr"
                 border
                 style="width: 100%;"
                 max-height="140">
                 <el-table-column
                   label="属性"
                   width="150">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择属性" v-model="scope.row.attribute" filterable clearable size="mini" class="input-inp" @visible-change="attribute(scope.row)" @change="attributeOperator(scope.row)">
                       <el-option
                         v-for="item in selfNaturePnr"
                         :key="item.code"
                         :value="item.code"
                         :label="item.name"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="操作符"
                   width="120">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.operator" filterable clearable class="input-inp" @visible-change="attribute2(selfNaturePnr,scope.row)" size="mini" @change="defaultDate(scope.row)">
                       <el-option
                         v-for="item in operatorPnr"
                         :key="item"
                         :value="item"
                         :label="item"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>

                 <el-table-column
                   label="值"
                   width="200">
                   <template slot-scope="scope">
                     <!-- 输入框 -->
                     <el-input placeholder="请输入值" v-model="scope.row.atype" size="mini" v-show="scope.row.type==0" class="input-inp"></el-input>
                     <!-- 性别 -->
                     <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==1" class="input-inp">
                       <el-option label="M - 男" value="M"></el-option>
                       <el-option label="F - 女" value="F"></el-option>
                       <el-option label="U - 未知" value="U"></el-option>
                     </el-select>
                     <!-- 起飞机场 -->
                     <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="takeOff" size="mini" class="input-inp" v-show="scope.row.type==2">
                       <el-option
                       v-for="item in takeOffNamePnr"
                       :key="item.AIRPORT_CODE"
                       :value="item.AIRPORT_CODE"
                       :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                       </el-option>
                     </el-select>
                     <!-- 日期 精确到天 -->
                     <el-date-picker
                     v-model="scope.row.atype"
                     v-show="scope.row.type==30||scope.row.type==31||scope.row.type==32||scope.row.type==33||scope.row.type==34"
                     type="date" size="mini"
                     placeholder="选择日期"
                     value-format="yyyyMMdd"

                     class="input-inp">
                    </el-date-picker>
                    <!-- 日期 精确到秒 -->
                     <el-date-picker
                     v-model="scope.row.atype"
                     v-show="scope.row.type==4"
                     type="datetime" size="mini"
                     placeholder="选择日期"
                     value-format="yyyyMMddHHmmss"
                     class="input-inp">
                    </el-date-picker>
                    <!-- 证类接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="paper" size="mini" class="input-inp" v-show="scope.row.type==5">
                      <el-option
                      v-for="item in paperNamePnr"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CODE+' - '+item.NAME">
                      </el-option>
                    </el-select>
                    <!-- 出入境 -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==6" class="input-inp">
                      <el-option label="I - 入境" value="I"></el-option>
                      <el-option label="O - 出境" value="O"></el-option>
                    </el-select>
                    <!-- 值机状态 -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==7" class="input-inp">
                      <el-option label="0Z - 允许登机" value="0Z"></el-option>
                      <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                      <el-option label="2Z - 再次核对" value="2Z"></el-option>
                      <el-option label="2Z - 数据错误" value="4Z"></el-option>
                    </el-select>

                    <!-- 航空公司接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="airline" size="mini" class="input-inp" v-show="scope.row.type==8">
                      <el-option
                      v-for="item in airlineNamePnr"
                      :key="item.AIRLINE_CODE"
                      :value="item.AIRLINE_CODE"
                      :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                      </el-option>
                    </el-select>
                    <!--  -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==9||scope.row.type==10" class="input-inp">
                      <el-option label="0 - 否" value="0"></el-option>
                      <el-option label="1 - 是" value="1"></el-option>
                    </el-select>
                    <!-- 输入框数字校验 -->
                    <el-input placeholder="请输入值" v-model="scope.row.atype" size="mini" v-show="scope.row.type==11" class="input-inp"></el-input>
                    <!--下拉框请选择 -->
                    <el-select placeholder="请选择值" v-model="scope.row.atype" filterable clearable size="mini" v-show="scope.row.type==12" class="input-inp">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="1 - 是" value="1"></el-option>
                    </el-select>
                    <!-- 客票金额接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="ticket" size="mini" class="input-inp" v-show="scope.row.type==13">
                      <el-option
                      v-for="item in ticketAmountPnr"
                      :key="item.code"
                      :value="item.code"
                      :label="item.code+' - '+item.value">
                      </el-option>
                    </el-select>
                    <!-- 变更旅客接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="passenger" size="mini" class="input-inp" v-show="scope.row.type==14">
                      <el-option
                      v-for="item in passengerPnr"
                      :key="item.code"
                      :value="item.code"
                      :label="item.code+' - '+item.value">
                      </el-option>
                    </el-select>
                    <!-- 变更状态接口获取值 -->
                    <el-select placeholder="请选择" v-model="scope.row.atype" filterable clearable @visible-change="changeState" size="mini" class="input-inp" v-show="scope.row.type==15">
                      <el-option
                      v-for="item in changeStatePnr"
                      :key="item.code"
                      :value="item.code"
                      :label="item.code+' - '+item.value">
                      </el-option>
                    </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="逻辑关系"
                   width="110">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.relation" filterable clearable size="mini" class="input-inp" :disabled="scope.row.isA">
                       <el-option label="and" value="and"></el-option>
                       <el-option label="or" value="or"></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="排序方式"
                   width="150">
                   <template slot-scope="scope">
                     <el-select placeholder="请选择" v-model="scope.row.dataSort" filterable clearable size="mini" @visible-change="order()">
                       <el-option
                         v-for="item in sortSetPnr"
                         :key="item.code"
                         :value="item.code"
                         :label="item.name"
                       ></el-option>
                     </el-select>
                  </template>
                 </el-table-column>
                 <el-table-column
                   label="操作"
                   width="120"
                   fixed="right">
                   <template slot-scope="scope">
                      <el-button class="table-btn" plain size="mini" icon="el-icon-delete" @click="selfDeleteRowPnr(scope.$index,scope.row)">删除</el-button>
                  </template>
                 </el-table-column>
               </el-table>
             </el-col>


              <!-- 右边表达式 -->
              <el-col :lg="10" class="queryRight">
                <el-row type="flex" align="center" :gutter="10" style="width:100%">
                  <span class="input-text expression-text">表达式：</span>
                  <el-input type="textarea" class="expression" v-model="bbb" @input="ii()"></el-input>
                </el-row>
              </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" class="mb-15" size="small" @click="selfS">查询</el-button>
          <el-button type="primary" plain size="small" @click="selfReset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 方案保存 -->
      <el-row type="flex" style="height:100%">
        <el-col :span="22">
          <div class="t-save">
            <el-select  filterable v-model="ffff" v-if="bigBase==7" @visible-change="selfSavePlanShow" filterable clearable @change="selfPlanQuery(ffff)" placeholder="方案选择" size="small" class="mr-15">
              <el-option
                v-for="item in selfSaveName"
                :label="item"
                :value="item"
                :key="item"
                >
                <span class="planItem">{{item}}</span>
                <span class="planDelete el-icon-circle-close" @click.stop="selfDeleteItem(item)"></span>
              </el-option>
            </el-select>
            <el-select  filterable v-model="nnnn" v-if="bigBase==8" @visible-change="selfSavePlanShow" filterable clearable @change="selfPlanQuery(nnnn)" placeholder="方案选择" size="small" class="mr-15">
              <el-option
                v-for="item in selfSaveNamePnr"
                :label="item"
                :value="item"
                :key="item"
                >
                <span class="planItem">{{item}}</span>
                <span class="planDelete el-icon-circle-close" @click.stop="selfDeleteItem(item)"></span>
              </el-option>
            </el-select>
            <button type="button" name="button" @click="selfDialogVisible = true;fff=''">保存方案</button>
          </div>

          <el-dialog
            title="方案名称"
            :visible.sync="selfDialogVisible"
            width="30%">
            <el-form  class="plan">
              <el-form-item label="方案名称:" :label-width="formLabelWidth">
                <el-input v-model="fff" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="selfPlanSave">保存</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
    <div class="middle-btn-g middle relative">
      <div class="dingwei">
        <span class="input-text">展示项：</span>
        <el-select placeholder="请选择" v-model="checkList" v-if="bigBase==7" multiple filterable clearable  collapse-tags size="small"  class="input-input">
          <el-option
            v-for="item in showConfig"
            :key="item.code"
            :value="item.code"
            :label="item.name">
            </el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="checkListPnr" v-if="bigBase==8" multiple filterable clearable  collapse-tags size="small"  class="input-input" @visible-change="showArr">
          <el-option
            v-for="item in showConfigPnr"
            :key="item.code"
            :value="item.code"
            :label="item.name">
            </el-option>
        </el-select>
      </div>
      <button type="button" name="button" class="mr-15" :class="{'pitchOn':bigBase==7}" @click="bigBase=7">IAPI数据</button>
      <button type="button" name="button" :class="{'pitchOn':bigBase==8}"  @click="bigBase=8;showArr()">PNR数据</button>
    </div>
    <!-- 表格 -->
    <div class="middle">
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="seat">航班座位图</el-button> -->
      <el-button  plain class="table-btn mb-9" size="small" @click="tableDown">导出</el-button>
      <el-button  plain class="table-btn mb-9" size="small" v-print="'#printMe'">打印</el-button>
      <!-- iapi表格 -->
      <el-table
        ref="singleTable"
        class="tableRy o-table3"
        :data="tableData"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @header-click="headerClick"
        id="printMe"
        v-if="bigBase==7">
        <el-table-column
          label="多选"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          sortable
           v-for="item in tableHead"
           :label="item.label"
           :prop="item.code">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" title="详情" icon="el-icon-tickets" @click="detailsIapi(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot" v-if="bigBase==7">
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
          <div class="" class="loadingtext">
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
        class="tableRy o-table3"
        :data="tableDataPnr"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @header-click="headerClick"
        id="printMe"
        v-if="bigBase==8">
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
          v-if="checkListPnrHc.indexOf('pnrName')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_GENDER"
          label="性别"
          width="100"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_GENDER')>-1">
        </el-table-column>
        <el-table-column
          prop="pnrBirthdayName"
          label="出生日期"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('pnrBirthdayName')>-1">
        </el-table-column>
        <el-table-column
          prop="pnrNationaName"
          label="国籍/地区"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('pnrNationaName')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_PASSPORTNO"
          label="证件号码"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_PASSPORTNO')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_CARDEXPIREDATESTR"
          label="证件有效期截止日期"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_CARDEXPIREDATESTR')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTNO"
          label="航班号"
          width="100"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_FLTNO')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTDATE1"
          label="航班日期"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_FLTDATE1')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_FLTTYPE"
          label="出入标识"
          width="100"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_FLTTYPE')>-1">
        </el-table-column>
        <el-table-column
          prop="pnrCityfromName"
          label="起飞机场"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('pnrCityfromName')>-1">
        </el-table-column>
        <el-table-column
          prop="pnrCitytoName"
          label="到达机场"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('pnrCitytoName')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_DEPARTDATESTR"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_DEPARTDATESTR')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_ARRIVDATESTR"
          label="预计到达时间"
          width="180"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_ARRIVDATESTR')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_TKTNUMBER"
          label="电子客票号"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_TKTNUMBER')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_RCI"
          label="旅客订票号"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_RCI')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_RCIDATE"
          label="订票时间"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_RCIDATE')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_SPECIFIGSEAT"
          label="座位号"
          width="150"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_SPECIFIGSEAT')>-1">
        </el-table-column>
        <el-table-column
          prop="PNR_CARBINCLASSDESIGNATOR"
          label="舱位"
          width="130"
          sortable
          v-if="checkListPnrHc.indexOf('PNR_CARBINCLASSDESIGNATOR')>-1">
        </el-table-column>
        <!-- 二 -->
        <el-table-column
          prop="tifgr2_Other_names"
          label="旅客其他姓名"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr2_Other_names')>-1">
        </el-table-column>
        <el-table-column
          prop="tifgr2_T_A_by_Infant_Indicator"
          label="携带婴儿标志"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr2_T_A_by_Infant_Indicator')>-1">
        </el-table-column>
        <el-table-column
          prop="orglv2_Travel_Agent_Identification"
          label="代理人IATA ID号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('orglv2_Travel_Agent_Identification')>-1">
        </el-table-column>
        <el-table-column
          prop="orglv2_In_House_Identification"
          label="系统内部分配给代理的ID号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('orglv2_In_House_Identification')>-1">
        </el-table-column>
        <el-table-column
          prop="orglv2_Location_identification"
          label="发送请求的代理所在城市"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('orglv2_Location_identification')>-1">
        </el-table-column>
        <el-table-column
          prop="orglv2_Company_Identification"
          label="PNR报文发送方"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('orglv2_Company_Identification')>-1">
        </el-table-column>
        <el-table-column
          prop="addlv2_Country_Coded"
          label="订票人住址所在国家"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('addlv2_Country_Coded')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_addlv2_Country_Coded==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.addlv2_Country_Coded">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.addlv2_Country_Coded[0]}}<span v-if="scope.row.is_addlv2_Country_Coded==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="addlv2_City_Name"
          label="订票人住址所在城市"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('addlv2_City_Name')>-1">
          <template slot-scope="scope">
            <!-- 带 * nameIsEqual=1-->
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_addlv2_City_Name==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.addlv2_City_Name">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.addlv2_City_Name[0]}}<span v-if="scope.row.is_addlv2_City_Name==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="addlv2_STREET_AND_NUMBER"
          label="订票人住址所在街道"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('addlv2_STREET_AND_NUMBER')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_addlv2_STREET_AND_NUMBER==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.addlv2_STREET_AND_NUMBER">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.addlv2_STREET_AND_NUMBER[0]}}<span v-if="scope.row.is_addlv2_STREET_AND_NUMBER==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="iftlv2_content"
          label="订票人联系方式"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('iftlv2_content')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_iftlv2_content==0"
              popper-class="maxWidth">
              <div>
                <el-row type="flex" class="detailFat" v-for="i in scope.row.iftlv2_content">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.iftlv2_content[0]}}<span v-if="scope.row.is_iftlv2_content==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="foplv4_PAYMENT_TYPE"
          label="订票人付款方式"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('foplv4_PAYMENT_TYPE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_foplv4_PAYMENT_TYPE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.foplv4_PAYMENT_TYPE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.foplv4_PAYMENT_TYPE[0]}}<span v-if="scope.row.is_foplv4_PAYMENT_TYPE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="foplv4_AccountNumber"
          label="订票人付款帐号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('foplv4_AccountNumber')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_foplv4_AccountNumber==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.foplv4_AccountNumber">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.foplv4_AccountNumber[0]}}<span v-if="scope.row.is_foplv4_AccountNumber==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="msglv2_GR9SERIAL"
          label="订票人是否同时预定租车、酒店服务"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('msglv2_GR9SERIAL')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_msglv2_GR9SERIAL==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.msglv2_GR9SERIAL">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.msglv2_GR9SERIAL[0]}}<span v-if="scope.row.is_msglv2_GR9SERIAL==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="iftlv3_content"
          label="旅客联系方式"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('iftlv3_content')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_iftlv3_content==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.iftlv3_content">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.iftlv3_content[0]}}<span v-if="scope.row.is_iftlv3_content==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tifgr2other_tifcount"
          label="订单旅客数量"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr2other_tifcount')>-1">
        </el-table-column>
        <el-table-column
          prop="tbdgr7_NUMBEROFPIECES"
          label="旅客行李数量"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tbdgr7_NUMBEROFPIECES')>-1">
        </el-table-column>
        <el-table-column
          prop="tbddetailgr7_BAG_LICENSE_PLATE"
          label="旅客行李条码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tbddetailgr7_BAG_LICENSE_PLATE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tbddetailgr7_BAG_LICENSE_PLATE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tbddetailgr7_BAG_LICENSE_PLATE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tbddetailgr7_BAG_LICENSE_PLATE[0]}}<span v-if="scope.row.is_tbddetailgr7_BAG_LICENSE_PLATE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM"
          label="旅客行李连续条码数量"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM[0]}}<span v-if="scope.row.is_tbddetailgr7_CONSECUTIVE_TAGS_SERIAL_NUM==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tbddetailgr7_PLACE_OF_DESTINATION"
          label="旅客行李目的地"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tbddetailgr7_PLACE_OF_DESTINATION')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tbddetailgr7_PLACE_OF_DESTINATION==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tbddetailgr7_PLACE_OF_DESTINATION">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tbddetailgr7_PLACE_OF_DESTINATION[0]}}<span v-if="scope.row.is_tbddetailgr7_PLACE_OF_DESTINATION==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ebddetaillv3_QUANTITY"
          label="旅客超重行李件数"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ebddetaillv3_QUANTITY')>-1">
        </el-table-column>
        <el-table-column
          prop="ftilv2_Frequent_T_Idenification"
          label="常客ID号码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ftilv2_Frequent_T_Idenification')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ftilv2_Frequent_T_Idenification==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ftilv2_Frequent_T_Idenification">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ftilv2_Frequent_T_Idenification[0]}}<span v-if="scope.row.is_ftilv2_Frequent_T_Idenification==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ftilv2_Membership_Level"
          label="常客级别"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ftilv2_Membership_Level')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ftilv2_Membership_Level==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ftilv2_Membership_Level">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ftilv2_Membership_Level[0]}}<span v-if="scope.row.is_ftilv2_Membership_Level==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="monlv4_Monetary_amount_type"
          label="客票金额类型"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('monlv4_Monetary_amount_type')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_monlv4_Monetary_amount_type==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.monlv4_Monetary_amount_type">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.monlv4_Monetary_amount_type[0]}}<span v-if="scope.row.is_monlv4_Monetary_amount_type==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="monlv4_Amount"
          label="客票金额"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('monlv4_Amount')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_monlv4_Amount==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.monlv4_Amount">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.monlv4_Amount[0]}}<span v-if="scope.row.is_monlv4_Amount==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="monlv4_Currency"
          label="客票货币类型代码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('monlv4_Currency')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_monlv4_Currency==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.monlv4_Currency">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.monlv4_Currency[0]}}<span v-if="scope.row.is_monlv4_Currency==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="txdlv4_Tax_Amount"
          label="税金额"
          width="120"
          sortable
          v-if="checkListPnrHc.indexOf('txdlv4_Tax_Amount')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_txdlv4_Tax_Amount==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.txdlv4_Tax_Amount">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.txdlv4_Tax_Amount[0]}}<span v-if="scope.row.is_txdlv4_Tax_Amount==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="txdlv4_Currency"
          label="税货币类型代码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('txdlv4_Currency')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_txdlv4_Currency==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.txdlv4_Currency">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.txdlv4_Currency[0]}}<span v-if="scope.row.is_txdlv4_Currency==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="txdlv4_Tax_Type"
          label="税类型"
          width="120"
          sortable
          v-if="checkListPnrHc.indexOf('txdlv4_Tax_Type')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_txdlv4_Tax_Type==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.txdlv4_Tax_Type">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.txdlv4_Tax_Type[0]}}<span v-if="scope.row.is_txdlv4_Tax_Type==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ssrlv3_FREETXT_is"
          label="旅客有无特殊需求"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv3_FREETXT_is')>-1">
        </el-table-column>
        <el-table-column
          prop="ssrlv3_SPECIAL_REQUIREMENT_TYPE"
          label="旅客特殊需求类型"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv3_SPECIAL_REQUIREMENT_TYPE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ssrlv3_SPECIAL_REQUIREMENT_TYPE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ssrlv3_SPECIAL_REQUIREMENT_TYPE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ssrlv3_SPECIAL_REQUIREMENT_TYPE[0]}}<span v-if="scope.row.is_ssrlv3_SPECIAL_REQUIREMENT_TYPE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ssrlv3_FREETXT"
          label="旅客特殊需求描述"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv3_FREETXT')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ssrlv3_FREETXT==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ssrlv3_FREETXT">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ssrlv3_FREETXT[0]}}<span v-if="scope.row.is_ssrlv3_FREETXT==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ssrlv2_FREETXT_is"
          label="订单有无特殊需求"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv2_FREETXT_is')>-1">
        </el-table-column>
        <el-table-column
          prop="ssrlv2_SPECIAL_REQUIREMENT_TYPE"
          label="订单特殊需求类型"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv2_SPECIAL_REQUIREMENT_TYPE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ssrlv2_SPECIAL_REQUIREMENT_TYPE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ssrlv2_SPECIAL_REQUIREMENT_TYPE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ssrlv2_SPECIAL_REQUIREMENT_TYPE[0]}}<span v-if="scope.row.is_ssrlv2_SPECIAL_REQUIREMENT_TYPE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ssrlv2_FREETXT"
          label="订单特殊需求描述"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('ssrlv2_FREETXT')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_ssrlv2_FREETXT==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.ssrlv2_FREETXT">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.ssrlv2_FREETXT[0]}}<span v-if="scope.row.is_ssrlv2_FREETXT==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr5_TYPE_OF_AIRCRAFT"
          label="航班飞机型号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr5_TYPE_OF_AIRCRAFT')>-1">
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_Passenger_type"
          label="变更旅客类型"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_Passenger_type')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_Passenger_type==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_Passenger_type">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_Passenger_type[0]}}<span v-if="scope.row.is_tifchangegr11_Passenger_type==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="CHANGE_NAME"
          label="变更旅客姓名"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('CHANGE_NAME')>-1">
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_OTHER_NAMES"
          label="变更旅客其他姓名"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_OTHER_NAMES')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_OTHER_NAMES==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_OTHER_NAMES">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_OTHER_NAMES[0]}}<span v-if="scope.row.is_tifchangegr11_OTHER_NAMES==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_TRAVELLER_A_BY_INFANT_ID"
          label="变更旅客携带婴儿标志"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_TRAVELLER_A_BY_INFANT_ID')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_TRAVELLER_A_BY_INFANT_ID==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_TRAVELLER_A_BY_INFANT_ID">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_TRAVELLER_A_BY_INFANT_ID[0]}}<span v-if="scope.row.is_tifchangegr11_TRAVELLER_A_BY_INFANT_ID==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_SPECIAL_REQUIREMENT_TYPE"
          label="变更旅客特殊需求类型"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_SPECIAL_REQUIREMENT_TYPE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_SPECIAL_REQUIREMENT_TYPE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_SPECIAL_REQUIREMENT_TYPE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_SPECIAL_REQUIREMENT_TYPE[0]}}<span v-if="scope.row.is_tifchangegr11_SPECIAL_REQUIREMENT_TYPE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_ssrfreetxt"
          label="变更旅客特殊需求描述"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_ssrfreetxt')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_ssrfreetxt==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_ssrfreetxt">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_ssrfreetxt[0]}}<span v-if="scope.row.is_tifchangegr11_ssrfreetxt==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tifchangegr11_Status_Code"
          label="变更状态代码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifchangegr11_Status_Code')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tifchangegr11_Status_Code==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tifchangegr11_Status_Code">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tifchangegr11_Status_Code[0]}}<span v-if="scope.row.is_tifchangegr11_Status_Code==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tbdgr11_NUMBEROFPIECES"
          label="变更行李数量"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tbdgr11_NUMBEROFPIECES')>-1">
        </el-table-column>
        <el-table-column
          prop="tvlgr12_MARKETING_FLIGHT_NUMBER"
          label="变更航班号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_MARKETING_FLIGHT_NUMBER')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_MARKETING_FLIGHT_NUMBER==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_MARKETING_FLIGHT_NUMBER">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_MARKETING_FLIGHT_NUMBER[0]}}<span v-if="scope.row.is_tvlgr12_MARKETING_FLIGHT_NUMBER==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr12_MARKETING_AIRLINE_CODE"
          label="变更航空公司"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_MARKETING_AIRLINE_CODE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_MARKETING_AIRLINE_CODE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_MARKETING_AIRLINE_CODE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_MARKETING_AIRLINE_CODE[0]}}<span v-if="scope.row.is_tvlgr12_MARKETING_AIRLINE_CODE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr12_DEPARTURE_DATE"
          label="变更起飞时间"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_DEPARTURE_DATE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_DEPARTURE_DATE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_DEPARTURE_DATE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_DEPARTURE_DATE[0]}}<span v-if="scope.row.is_tvlgr12_DEPARTURE_DATE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr12_ARRIVAL_DATE"
          label="变更到达时间"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_ARRIVAL_DATE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_ARRIVAL_DATE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_ARRIVAL_DATE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_ARRIVAL_DATE[0]}}<span v-if="scope.row.is_tvlgr12_ARRIVAL_DATE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr12_THE_LAST_DEPARTURE_AIRPORT"
          label="变更起飞机场"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_THE_LAST_DEPARTURE_AIRPORT')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_THE_LAST_DEPARTURE_AIRPORT==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_THE_LAST_DEPARTURE_AIRPORT">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_THE_LAST_DEPARTURE_AIRPORT[0]}}<span v-if="scope.row.is_tvlgr12_THE_LAST_DEPARTURE_AIRPORT==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="tvlgr12_THE_FIRST_ARRIVAL_AIRPORT"
          label="变更降落机场"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tvlgr12_THE_FIRST_ARRIVAL_AIRPORT')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_tvlgr12_THE_FIRST_ARRIVAL_AIRPORT==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.tvlgr12_THE_FIRST_ARRIVAL_AIRPORT">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.tvlgr12_THE_FIRST_ARRIVAL_AIRPORT[0]}}<span v-if="scope.row.is_tvlgr12_THE_FIRST_ARRIVAL_AIRPORT==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="abigr10_TRAVEL_AGENT_IDENTIFICATION"
          label="变更操作者的ID信息"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('abigr10_TRAVEL_AGENT_IDENTIFICATION')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_abigr10_TRAVEL_AGENT_IDENTIFICATION==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.abigr10_TRAVEL_AGENT_IDENTIFICATION">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.abigr10_TRAVEL_AGENT_IDENTIFICATION[0]}}<span v-if="scope.row.is_abigr10_TRAVEL_AGENT_IDENTIFICATION==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="abigr10_PLACE"
          label="变更者的城市代码"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('abigr10_PLACE')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_abigr10_PLACE==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.abigr10_PLACE">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.abigr10_PLACE[0]}}<span v-if="scope.row.is_abigr10_PLACE==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="abigr10_COMPANY_IDENTIFICATION"
          label="变更者的所属航司或GDS"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('abigr10_COMPANY_IDENTIFICATION')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_abigr10_COMPANY_IDENTIFICATION==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.abigr10_COMPANY_IDENTIFICATION">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.abigr10_COMPANY_IDENTIFICATION[0]}}<span v-if="scope.row.is_abigr10_COMPANY_IDENTIFICATION==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="eqngr8_NUMBER_OF_UNITS"
          label="分离的人数"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('eqngr8_NUMBER_OF_UNITS')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_eqngr8_NUMBER_OF_UNITS==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.eqngr8_NUMBER_OF_UNITS">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.eqngr8_NUMBER_OF_UNITS[0]}}<span v-if="scope.row.is_eqngr8_NUMBER_OF_UNITS==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="rcigr8_COMPANY_IDENTIFICATION"
          label="分离后的编号所属的航空公司"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('rcigr8_COMPANY_IDENTIFICATION')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_rcigr8_COMPANY_IDENTIFICATION==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.rcigr8_COMPANY_IDENTIFICATION">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.rcigr8_COMPANY_IDENTIFICATION[0]}}<span v-if="scope.row.is_rcigr8_COMPANY_IDENTIFICATION==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="rcigr8_RESERVATION_CONTROL_NUMBER"
          label="分离后的记录编号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('rcigr8_RESERVATION_CONTROL_NUMBER')>-1">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.is_rcigr8_RESERVATION_CONTROL_NUMBER==0"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="i in scope.row.rcigr8_RESERVATION_CONTROL_NUMBER">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.rcigr8_RESERVATION_CONTROL_NUMBER[0]}}<span v-if="scope.row.is_rcigr8_RESERVATION_CONTROL_NUMBER==1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="datgr6_FIRST_DATE"
          label="航班check-in时间"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('datgr6_FIRST_DATE')>-1">
        </el-table-column>
        <el-table-column
          prop="tifgr7_Other_names"
          label="值机旅客其他姓名"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr7_Other_names')>-1">
        </el-table-column>
        <el-table-column
          prop="tifgr7_T_A_by_Infant_Indicator"
          label="值机旅客携带婴儿标志"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr7_T_A_by_Infant_Indicator')>-1">
        </el-table-column>
        <el-table-column
          prop="tifgr7_boardingsequence"
          label="旅客的登机序号"
          width="140"
          sortable
          v-if="checkListPnrHc.indexOf('tifgr7_boardingsequence')>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" title="详情" icon="el-icon-tickets" @click="detailsPnr(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot" v-if="bigBase==8">
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
    <!-- pnr详情 -->
    <el-dialog title="查看详情" :visible.sync="detailsSelfDialogVisible">
      <Detail :detailType="1" :pnrType="8" :SERIALSelf="SERIALSelf0" :PNR_TIDSelf="PNR_TIDSelf0" :PNR_TKTNUMBERSelf="PNR_TKTNUMBERSelf0"></Detail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsSelfDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!-- iapi详情 -->
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
    <el-dialog
      title="事件文档"
      :visible.sync="queryDialogVisible"
      width="1220px">
      <AlarmProcess></AlarmProcess>
    </el-dialog>
  </div>
</template>

<script>
import Seat from '../../other/seat'
import Detail from './DetailRYXX'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  components: {AlarmProcess,Seat,Detail},
  data(){
    return{
      // iapi详情
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
      SERIALSelf0:'',
      PNR_TIDSelf0:'',
      PNR_TKTNUMBERSelf0:'',
      detailsSelfDialogVisible:false,
      //iapi查询条件
      selfNature:[],//属性
      operator:[],//操作符
      takeOffName:[],
      paperName:[],//证件种类
      airlineName:[],//航空公司
      sortSet:[],//排序
      selfCdt:{AAAAA:''},//自定义查询表达式信息
      str:'',
      str1:'',
      typeG:0,
      selfD:{},
      selfRows:[
        {
            id:1,
            attribute:'FLTDATE',
            operator:'大于等于',
            type:31,
            relation:'',
            atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),
            dataSort:'',
            isA:true
        },
        {
            id:2,
            attribute:'FLTDATE',
            operator:'小于等于',
            type:31,
            relation:'and',
            atype:formatDate(new Date(),'yyyyMMdd'),
            dataSort:'',
            isA:false
        },
      ],
      //pnr查询条件
      selfNaturePnr:[],//属性
      operatorPnr:[],//操作符
      takeOffNamePnr:[],
      paperNamePnr:[],//证件种类
      airlineNamePnr:[],//航空公司
      sortSetPnr:[],//排序
      selfCdtPnr:{AAAAA:''},//自定义查询表达式信息
      ticketAmountPnr:[],
      passengerPnr:[],
      changeStatePnr:[],
      strPnr:'',
      strPnr1:'',
      typePnrG:0,
      selfPnrD:{},
      selfRowsPnr:[
        {
            id:1,
            attribute:'PNR_FLTDATE1',
            operator:'大于等于',
            type:31,
            relation:'',
            atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),
            dataSort:'',
            isA:true
        },
        {
            id:2,
            attribute:'PNR_FLTDATE1',
            operator:'小于等于',
            type:31,
            relation:'and',
            atype:formatDate(new Date(),'yyyyMMdd'),
            dataSort:'',
            isA:false
        },
      ],
      selfModelrow:{
        id:0,
        attribute:'',
        operator:'',
        type:0,
        relation:'',
        atype:'',
        dataSort:'',
        isA:false,
      },
      selfCleanRow:{
        id:0,
        attribute:'',
        operator:'',
        type:0,
        relation:'',
        atype:'',
        dataSort:''
      },
      selfCount:0,
      selfCountPnr:0,
      bigBase:7,
      //iapi展示项数组
      checkList:['iapiName','INTG_CHNNAME','GENDER','iapiBirthdayName','iapiNationaName','PASSPORTNO','FLTNO','FLTDATE','FLIGHTTYPE'],
      showConfig:[],
      itemHis:'',
      showConfiglist:[],
      //pnr展示
      checkListPnr:['pnrName','PNR_GENDER','pnrBirthdayName','pnrNationaName','PNR_PASSPORTNO','PNR_CARDEXPIREDATESTR','PNR_FLTNO','PNR_FLTDATE1','PNR_FLTTYPE','pnrCityfromName','pnrCitytoName','PNR_DEPARTDATESTR','PNR_ARRIVDATESTR','PNR_TKTNUMBER','PNR_RCI','PNR_RCIDATE','PNR_SPECIFIGSEAT'],
      checkListPnrHc:['pnrName','PNR_GENDER','pnrBirthdayName','pnrNationaName','PNR_PASSPORTNO','PNR_CARDEXPIREDATESTR','PNR_FLTNO','PNR_FLTDATE1','PNR_FLTTYPE','pnrCityfromName','pnrCitytoName','PNR_DEPARTDATESTR','PNR_ARRIVDATESTR','PNR_TKTNUMBER','PNR_RCI','PNR_RCIDATE','PNR_SPECIFIGSEAT'],
      showConfigPnr:[],
      showConfiglistPnr:[],
      //iapi表格数据
      tableData:[],
      tableHead:[
        {
          code:'iapiName',
          label:'姓名'
        },
        {
          code:'INTG_CHNNAME',
          label:'中文姓名'
        },
        {
          code:'GENDER',
          label:'性别'
        },
        {
          code:'iapiBirthdayName',
          label:'出生日期'
        },
        {
          code:'iapiNationaName',
          label:'国籍/地区'
        },
        {
          code:'PASSPORTNO',
          label:'证件号码'
        },
        {
          code:'FLTNO',
          label:'航班号'
        },
        {
          code:'FLTDATE',
          label:'航班日期'
        },
        {
          code:'FLIGHTTYPE',
          label:'出入标识'
        },
      ],
      tableHeadHc:[],
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
      //方案保存iapi
      ffff:'',//方案渲染
      selfSaveName:[],//方案名称集合
      selfDialogVisible:false,
      fff:'',//方案名称
      formLabelWidth:'120px',
      //方案保存pnr
      nnnn:'',//方案渲染
      selfSaveNamePnr:[],//方案名称集合
    }
  },
  mounted(){
    this.showArr();
    this.a();
    this.b();
    this.operator = ["等于", "大于", "大于等于", "小于", "小于等于"]
    document.getElementsByClassName('btn-next')[0].disabled=true;
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  activated(){
    this.showArr();
    this.a();
    this.b();
    this.operator = ["等于", "大于", "大于等于", "小于", "小于等于"]
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  computed:{
    aaa:{
      get:function(){
        let switchArr='';
        let arr = this.selfRows;
        console.log(this.selfRows[0].attribute);
        if(this.selfRows[0].attribute!=''){
            this.str='';
            for(var i=0;i<arr.length;i++){
              if(arr[i].operator=='等于'){
                switchArr='='
              }else if(arr[i].operator=='小于'){
                switchArr='<'
              }else if(arr[i].operator=='大于'){
                switchArr='>'
              }else if(arr[i].operator=='大于等于'){
                switchArr='>='
              }else if(arr[i].operator=='小于等于'){
                switchArr='<='
              }else if(arr[i].operator=='不包含'){
                switchArr='<>'
              }else if(arr[i].operator=='模糊'){
                switchArr='like'
              }
              if(arr[i].attribute==''){
                 this.str+='';
              }else{
                if(arr[i].atype == null){
                  arr[i].atype ='';
                }
                if(i == 0){
                  this.str += '('+this.nameChange(arr[i].attribute,this.selfNature)+switchArr+arr[i].atype+')'
                }else{
                    this.str += arr[i].relation+'('+this.nameChange(arr[i].attribute,this.selfNature)+switchArr+arr[i].atype+')';
                }
            };
          }
        }

      this.selfCdt.AAAAA = this.str;
      console.log(this.selfCdt.AAAAA);
      return  this.str;
      },
      set:function(newVal){
        this.aaa2 = newVal;
      }
    },
    bbb:{
      get:function(){
        let switchArr='';
        let arr = this.selfRowsPnr;
        console.log(this.selfRowsPnr[0].attribute);
        if(this.selfRowsPnr[0].attribute!=''){
            this.strPnr='';
            for(var i=0;i<arr.length;i++){
              if(arr[i].operator=='等于'){
                switchArr='='
              }else if(arr[i].operator=='小于'){
                switchArr='<'
              }else if(arr[i].operator=='大于'){
                switchArr='>'
              }else if(arr[i].operator=='大于等于'){
                switchArr='>='
              }else if(arr[i].operator=='小于等于'){
                switchArr='<='
              }else if(arr[i].operator=='不包含'){
                switchArr='<>'
              }else if(arr[i].operator=='模糊'){
                switchArr='like'
              }
              if(arr[i].attribute==''){
                 this.strPnr+='';
              }else{
                if(arr[i].atype == null){
                  arr[i].atype ='';
                }
                if(i == 0){
                  this.strPnr += '('+this.nameChange(arr[i].attribute,this.selfNaturePnr)+switchArr+arr[i].atype+')'
                }else{
                    this.strPnr += arr[i].relation+'('+this.nameChange(arr[i].attribute,this.selfNaturePnr)+switchArr+arr[i].atype+')';
                }
            };
          }
        }

      this.selfCdtPnr.AAAAA = this.strPnr;
      console.log(this.selfCdtPnr.AAAAA);
      return  this.strPnr;
      },
      set:function(newVal){
        this.aaa3 = newVal;
      }
    }
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
    //==========================================================全局代码=========================================================
    headerClick(column,event){
      console.log(column,event)
      event.target.title=column.label
    },
    handleSelectionChange(val){
      if(this.bigBase==7){
        this.selfTableList = val;
      }else if(this.bigBase==8){
        this.selfTableListPnr = val;
      }
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
    detailsPnr(i){
      this.SERIALSelf0 = i.SERIAL;
      this.PNR_TIDSelf0 = i.PNR_TID;
      this.PNR_TKTNUMBERSelf0 = i.PNR_TKTNUMBER;
      this.detailsSelfDialogVisible = true;
    },
    nameChange(item,arr){
      for(var i=0;i<arr.length;i++){
        if(item == arr[i].code){
          return arr[i].name
        }
      }
    },
    selfAddRow(){//自定义查询 添加操作
      if(this.bigBase==7){
        this.selfCount++;
        if(this.selfRows.length==0){
          this.selfModelrow = {
            id:0,
            attribute:'',
            operator:'',
            type:0,
            relation:'',
            atype:'',
            dataSort:'',
            isA:true
          }
        }else{
          this.selfModelrow = {
            id:0,
            attribute:'',
            operator:'',
            type:0,
            relation:'',
            atype:'',
            dataSort:'',
            isA:false
          }
        }
        this.selfModelrow.id=this.selfCount;
        this.selfRows.push(this.selfModelrow);
      }else if(this.bigBase==8){
        this.selfCountPnr++;
        if(this.selfRowsPnr.length==0){
          this.selfModelrow = {
            id:0,
            attribute:'',
            operator:'',
            type:0,
            relation:'',
            atype:'',
            dataSort:'',
            isA:true
          }
        }else{
          this.selfModelrow = {
            id:0,
            attribute:'',
            operator:'',
            type:0,
            relation:'',
            atype:'',
            dataSort:'',
            isA:false
          }
        }
        this.selfModelrow.id=this.selfCountPnr;
        this.selfRowsPnr.push(this.selfModelrow);
      }
    },
    takeOff(){//调用起飞机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           if(this.bigBase==7){
             this.takeOffName = r.data;
           }else if(this.bigBase==8){
             this.takeOffNamePnr = r.data;
           }
         }
       })
    },
    paper(){//证类接口
      this.$api.post('/manage-platform/codeTable/queryDocCode',{},
       r =>{
         if(r.success){
           if(this.bigBase==7){
             this.paperName = r.data;
           }else if(this.bigBase==8){
             this.paperNamePnr = r.data;
           }
         }
       })
    },
    airline(){
      this.$api.post('/manage-platform/codeTable/queryAircompanyList',{},
       r =>{
         if(r.success){
           if(this.bigBase==7){
             this.airlineName = r.data;
           }else if(this.bigBase==8){
             this.airlineNamePnr = r.data;
           }
         }
       })
    },
    //=============================================================查询项===============================================================
    //===================================iapi=========================
    a(){
      this.$api.post('/manage-platform/iapiHead/getIapiCustomQueryConfig',{},
      r =>{
        if(r.success){
          this.selfNature = r.data;
        }
      })
    },
    b(){
      this.$api.post('/manage-platform/iapiHead/getPnrCustomQueryConfig',{},
       r =>{
         if(r.success){
           this.selfNaturePnr = r.data;
         }
       })
    },
    attribute(self){//属性
      this.$set(self,'operator','');
      this.$set(self,'atype','');
      this.$set(self,'operator','');
      this.$set(self,'relation','');
      if(this.bigBase==7){
        this.$api.post('/manage-platform/iapiHead/getIapiCustomQueryConfig',{},
        r =>{
          if(r.success){
            this.selfNature = r.data;
          }
        })
      }else if(this.bigBase==8){
        this.$api.post('/manage-platform/iapiHead/getPnrCustomQueryConfig',{},
         r =>{
           if(r.success){
             this.selfNaturePnr = r.data;
           }
         })
      }
    },
    attributeOperator(item){//属性联动
      if(item.attribute==''||item.attribute==undefined){
        this.$set(item,'operator','');
        this.$set(item,'atype','');
        this.$set(item,'operator','');
        this.$set(item,'relation','');
      }
      if(item.attribute!=''){
        if(this.bigBase==7){
          if(this.checkList.indexOf(item.attribute)<0){//数组去重
            this.checkList.push(item.attribute);
          }
        }else if(this.bigBase==8){
          if(this.checkListPnr.indexOf(item.attribute)<0){
            this.checkListPnr.push(item.attribute);
          }
        }
      }else if(item.attribute==''){

      }
    },
    clearItem(item){
      console.log(item);
    },
    attribute2(arr,val){
      for(var i in arr){
        if(arr[i].code==val.attribute){
            val.type=arr[i].type;
            if(this.bigBase==7){
              this.operator=arr[i].operator;
            }else if(this.bigBase==8){
              this.operatorPnr=arr[i].operator;
            }
        }
      }
    },
    defaultDate(val){
      if(val.type==31){
        if(val.operator=='小于'||val.operator=='小于等于'||val.operator=='等于'){
          let end=new Date();
          val.atype=formatDate(end,'yyyyMMdd');
        }else if(val.operator=='大于'||val.operator=='大于等于'){
          let time=new Date();
          let begin = new Date(time - 1000 * 60 * 60 * 24 * 7);
          val.atype=formatDate(begin,'yyyyMMdd');
        }
      }
    },
    order(){//排序
      if(this.bigBase==7){
        this.$api.post('/manage-platform/iapiHead/getIapiCustomQueryOrder',{},
        r =>{
          if(r.success){
            this.sortSet = r.data;
          }
        })
      }else if(this.bigBase==8){
        this.$api.post('/manage-platform/iapiHead/getPnrCustomQueryOrder',{},
         r =>{
           if(r.success){
             this.sortSetPnr = r.data;
           }
         })
      }
    },
    repeatLong(val,arr){
      let count=0;
        for(var i=0;i<arr.length;i++){
          if(val == arr[i].attribute){
            count++
          }
        }
        return count
    },
    selfDeleteRow(id,row){//自定义查询 删除操作
      let count = this.repeatLong(row.attribute,this.selfRows);
      for(var i in this.checkList){
        if(row.attribute == this.checkList[i]&&count<=1){
          this.checkList.splice(i,1);
        }
      }
      this.selfRows.splice(id,1);
      if(this.selfRows.length==1){
        this.selfRows[0].isA = true;
        this.selfRows[0].relation = '';
      }
    },
    //====================================pnr====================================
    selfDeleteRowPnr(id,row){
      let countPnr = this.repeatLong(row.attribute,this.selfRowsPnr);
      for(var i in this.checkListPnr){
        if(row.attribute == this.checkListPnr[i]&&countPnr<=1){
          this.checkListPnr.splice(i,1);
        }
      }
      this.selfRowsPnr.splice(id,1);
      if(this.selfRowsPnr.length==1){
        this.selfRowsPnr[0].isA = true;
        this.selfRowsPnr[0].relation = '';
      }
    },
    ticket(){
      this.$api.post('/manage-platform/codeTable/queryMonetaryAmountType',{},
       r =>{
         if(r.success){
           this.ticketAmountPnr = r.data;
         }
       })
    },
    passenger(){
      this.$api.post('/manage-platform/codeTable/queryChangePassengerType',{},
       r =>{
         if(r.success){
           this.passengerPnr = r.data;
         }
       })
    },
    changeState(){
      this.$api.post('/manage-platform/codeTable/queryChangegrStatusCode',{},
       r =>{
         if(r.success){
           this.changeStatePnr = r.data;
         }
       })
    },

    ii(){
      if(this.bigBase==7){
        console.log(this.aaa2);
        this.typeG = 1;
        this.str1 = this.aaa2;
      }else if(this.bigBase==8){
        console.log(aaa3);
        console.log(bbb);
        this.typePnrG = 1;
        this.strPnr1 = this.aaa3;
      }
    },
    //===========================================展示项==========================================
    showArr(){
      if(this.bigBase==7){
        this.$api.post('/manage-platform/iapiHead/getIapiCustomQueryConfig',{},
        r =>{
          if(r.success){
            this.showConfig = r.data;
          }
        })
      }else if(this.bigBase==8){
        this.$api.post('/manage-platform/iapiHead/getPnrCustomQueryConfig',{},
        r =>{
          if(r.success){
            this.showConfigPnr = r.data;
          }
        })
      }

    },
    showTableConfig(){//iapi表头数据组装
      this.tableHeadHc=[];
      let arr = this.checkList;
      let that = this;
      let checkItem = this.showConfig;

      for(var i=0;i<arr.length;i++){
        var a='';
        var obj={};
        for(var j=0;j<checkItem.length;j++){
          if(arr[i]==checkItem[j].code){
            a=j
            obj.label = checkItem[j].name;
            obj.code = checkItem[j].code;
          }
        }
        that.tableHeadHc.splice(a,0,obj);
      }
      this.tableHead = this.tableHeadHc;
    },
    showConfiglistArr(){//方案的展示项数据组装
      if(this.bigBase==7){
        this.showConfiglist=[];
        let checkItem = this.showConfig;
        let that = this;
        var arr = this.checkList;
        for(var i in checkItem){
          var obj={isCheck:0}
          obj.itemName=checkItem[i].code;
          for(var j=0;j<arr.length;j++){
            if(arr[j]==checkItem[i].code){
              obj.isCheck=1;
            }
          }
          that.showConfiglist.push(obj);
        }
      }else if(this.bigBase==8){
        this.showConfiglistPnr=[];
        let checkItem = this.showConfigPnr;
        let that = this;
        var arr = this.checkListPnr;
        for(var i in checkItem){
          var obj={isCheck:0}
          obj.itemName=checkItem[i].code;
          for(var j=0;j<arr.length;j++){
            if(arr[j]==checkItem[i].code){
              obj.isCheck=1;
            }
          }
          that.showConfiglistPnr.push(obj);
        }
      }
    },
    //============================================查询=================================================
    selfQueryList(currentPage,showCount){//自定义查询列表
      this.showTableConfig();
      let dataSelf = [];
      for(var i=0;i<this.selfRows.length;i++){
        dataSelf.push(this.selfRows[i].dataSort);
      }
      let sql = {
        "currentPage":currentPage,
      	"showCount":showCount,
        "orders":dataSelf,//排序
      }
      if(this.typeG == 0){
        sql.cdt = this.str;
        this.selfD.cdt = this.str;//导出自定义表格数据的传参
      }else if(this.typeG == 1){
        sql.cdt = this.str1;
        this.selfD.cdt = this.str1;
        this.typeG = 0;
      }
      this.$api.post('/manage-platform/iapiHead/customIapiQuery',sql,
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
           this.$api.post2('/manage-platform/iapiHead/customIapiQueryCount',sql,
            r =>{
              if(r.success){
                this.totalResult = r.data;
              }
            })
         }
       })
    },
    selfQueryListPnr(currentPage,showCount){
      this.checkListPnrHc=Object.assign([], this.checkListPnr);
      let dataSelfPnr = [];
      for(var i=0;i<this.selfRowsPnr.length;i++){
        dataSelfPnr.push(this.selfRowsPnr[i].dataSort);
      }
      let sqlp = {
        "currentPage":currentPage,
      	"showCount":showCount,
        "orders":dataSelfPnr,
        "pd":{'queryColList':this.checkListPnr},
      }
      if(this.typePnrG == 0){
        sqlp.cdt = this.strPnr
        this.selfPnrD.cdt = this.strPnr;//导出自定义表格数据的传参
      }else if(this.typePnrG == 1){
        sqlp.cdt = this.strPnr1;
        this.selfPnrD.cdt = this.strPnr1;
        this.typePnrG = 0;
      }
      this.$api.post('/manage-platform/iapiHead/customPnrQuery',sqlp,
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
           let twoArr = r.data.resultList;
           let that = this;
           let arrTable=[];
           if(r.data.pd.isTwoInface){
             for(var i=0;i<twoArr.length;i++){
               let p={
                 'SERIAL':twoArr[i].SERIAL,
                 'PNR_TID':twoArr[i].PNR_TID,
                 'PNR_TKTNUMBER':twoArr[i].PNR_TKTNUMBER,
                 'PNR_FLTNO':twoArr[i].PNR_FLTNO,
                 'PNR_TRAVELLER_SURNAME_TIF':twoArr[i].PNR_TRAVELLER_SURNAME_TIF,
                 'PNR_TRAVELLER_GIVEN_NAME_TIF':twoArr[i].PNR_TRAVELLER_GIVEN_NAME_TIF,
                 'GR1SERIAL':twoArr[i].GR1SERIAL,
                 'GR2SERIAL':twoArr[i].GR2SERIAL,
                 'queryWhere':r.data.pd.queryWhere,
                 'queryChildWhere':r.data.pd.queryChildWhere,
                 'queryColList':r.data.pd.queryColList,
                 'resultChildList':twoArr[i]
               }
               var obj={};
               that.$api.post('/manage-platform/iapiHead/customPnrColData',p,
                r =>{
                  if(r.success){
                    obj = r.data;
                    arrTable.push(obj);
                  }
                })
             }
             this.tableDataPnr = arrTable;
           }
           this.$api.post2('/manage-platform/iapiHead/customPnrQueryCount',sqlp,
            r =>{
              if(r.success){
                this.totalResultPnr = r.data;
              }
            })
         }
       })
    },
    pageSizeChange(val){//显示条数
      if(this.bigBase==7){
        this.selfQueryList(this.currentPage,val)
      }else if(this.bigBase==8){
        this.selfQueryListPnr(this.currentPagePnr,val);
      }

    },
    handleCurrentChange(val){//显示当前页
      if(this.bigBase==7){
        this.selfQueryList(val,this.showCount);
      }else if(this.bigBase==8){
        this.selfQueryListPnr(val,this.showCountPnr);
      }
    },
    selfS(){
      if(this.bigBase == 7){
        this.selfQueryList(this.currentPage,this.showCount);
      }else if(this.bigBase == 8){
        this.selfQueryListPnr(this.currentPagePnr,this.showCountPnr);
      }
    },
    selfReset(){
      if(this.bigBase == 7){
        this.selfRows=[
          {id:1,attribute:'FLTDATE',operator:'大于等于',type:31,relation:'',atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),dataSort:'',isA:true},
          {id:2,attribute:'FLTDATE',operator:'小于等于',type:31,relation:'and',atype:formatDate(new Date(),'yyyyMMdd'),dataSort:'',isA:false},
        ];
        this.str = '';
        this.ffff='';
        this.selfQueryList(this.currentPage,this.showCount);
      }else if(this.bigBase == 8){
        this.selfRowsPnr=[
          {id:1,attribute:'PNR_FLTDATE1',operator:'大于等于',type:31,relation:'',atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),dataSort:'',isA:true},
          {id:2,attribute:'PNR_FLTDATE1',operator:'小于等于',type:31,relation:'and',atype:formatDate(new Date(),'yyyyMMdd'),dataSort:'',isA:false},
        ];
        this.strPnr = '';
        this.nnnn='';
        this.selfQueryListPnr(this.currentPagePnr,this.showCountPnr);
      }
    },
    checkRow(row){//列表单选操作
      if(this.bigBase==7){
        this.radio=row.I_SERIAL
      }else if(this.bigBase==8){
        this.radioPnr=row.I_SERIAL
      }
    },
    tableDown(){
      if(this.bigBase==7){
        if(this.selfTableList==0){
          this.selfD.exclTitles = this.checkList;
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCustomFileIo/7/600',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCustomFileIo/7/600",
           data: this.selfD,
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }else if(this.selfTableList!=0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCheckColDataIo/7',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCheckColDataIo/7",
           data: {
             'exclTitles':this.checkList,
             'resultList':this.selfTableList
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }

      }else if(this.bigBase==8){
        if(this.selfTableListPnr.length!=0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCheckColDataIo/8',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCheckColDataIo/8",
           data: {
             'exclTitles':this.checkList,
             'resultList':this.selfTableListPnr
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }else if(this.selfTableListPnr.length==0){
          axios({
           method: 'post',
           // url: 'http://192.168.99.248:8080/manage-platform/iapiHead/exportCustomPnrFileIo',
           url: this.$api.rootUrl+"/manage-platform/iapiHead/exportCustomPnrFileIo",
           data: {
             'exclTitles':this.checkList,
             'resultList':this.tableDataPnr
           },
           responseType: 'blob'
           }).then(response => {
               this.downloadM(response)
           });
        }
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
    //==============================================方案保存========================================================
    selfPlanSave(){//自定义 方案保存是否重名
      if(this.fff==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let selfPS = {
        name : this.fff,
        page : this.bigBase
      }
      this.$api.post('/manage-platform/queryShow/isExistName',selfPS,
       r =>{
         if(r.success){
           this.showConfiglistArr();//展示项数组
           if(r.data == false){
             if(this.bigBase==7){
               this.selfSavePlan(this.showConfiglist,this.selfCdt);
             }else if(this.bigBase==8){
               this.selfSavePlan(this.showConfiglistPnr,this.selfCdtPnr);
             }
             this.selfDialogVisible = false;
           }else{
             this.$alert('方案名称已存在，请重新命名', '提示', {
               confirmButtonText: '确定',
             });
           }
         }
       })
    },
    selfSavePlan(item,row){//自定义查询 保存方案
      let selfSP = {
        "name" : this.fff,
        "page" : this.bigBase,
        "showConfigList":item,
        "config":row
      }
      this.$api.post('/manage-platform/queryShow/save',selfSP,
      r =>{
        if(r.success){
          if(r.success){
            this.$message({
              message: '恭喜你，保存成功！',
              type: 'success'
            });
          }
        }
      })
    },
    selfSavePlanShow(){//自定义查询方案名称列表
      let ssp = {
        page : this.bigBase
      }
      this.$api.post('/manage-platform/queryShow/queryNameList',ssp,
      r =>{
        if(r.success){
          if(this.bigBase==7){
            this.selfSaveName = r.data;
          }else if(this.bigBase==8){
            this.selfSaveNamePnr = r.data;
          }
        }
      })
    },
    selfPlanQuery(name){//自定义查询 方案渲染
      let spq = {
        page : this.bigBase,
        name : name
      }
      this.$api.post('/manage-platform/queryShow/queryConfigInfo',spq,
      r =>{
        if(r.success){
          let arr = r.data.showConfigList;
          let arr1=[];
          if(this.bigBase==7){
            this.selfRows=[
              {id:1,attribute:'FLTDATE',operator:'大于等于',type:31,relation:'',atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),dataSort:'',isA:true},
              {id:2,attribute:'FLTDATE',operator:'小于等于',type:31,relation:'and',atype:formatDate(new Date(),'yyyyMMdd'),dataSort:'',isA:false},
            ];
            this.str = r.data.config.AAAAA; //渲染
          }else if(this.bigBase==8){
            this.selfRowsPnr=[
              {id:1,attribute:'PNR_FLTDATE1',operator:'大于等于',type:31,relation:'',atype:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 7),'yyyyMMdd'),dataSort:'',isA:true},
              {id:2,attribute:'PNR_FLTDATE1',operator:'小于等于',type:31,relation:'and',atype:formatDate(new Date(),'yyyyMMdd'),dataSort:'',isA:false},
            ];
            this.strPnr = r.data.config.AAAAA;
          }
          if(arr.length == 0){
            if(this.bigBase==7){
              this.checkList = ['iapiName','INTG_CHNNAME','GENDER','iapiBirthdayName','iapiNationaName','PASSPORTNO','FLTNO','FLTDATE','FLIGHTTYPE'];
            }else if(this.bigBase==8){
              this.checkListPnr = ['pnrName','PNR_GENDER','pnrBirthdayName','pnrNationaName','PNR_PASSPORTNO','PNR_CARDEXPIREDATESTR','PNR_FLTNO','PNR_FLTDATE1','PNR_FLTTYPE','pnrCityfromName','pnrCitytoName','PNR_DEPARTDATESTR','PNR_ARRIVDATESTR','PNR_TKTNUMBER','PNR_RCI','PNR_RCIDATE','PNR_SPECIFIGSEAT']
            }
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i].isCheck == '1'){
                arr1.push(arr[i].itemName);
              }
            }
            if(this.bigBase==7){
              this.checkList = arr1;
            }else if(this.bigBase==8){
              this.checkListPnr = arr1;
            }
          }
        }
      })
    },
    selfDeleteItem(i){
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
             if(this.bigBase==7){
               if(this.ffff==i){
                 this.ffff='';
                 this.str = '';
                 this.selfSavePlanShow();
               }else{
                 this.selfSavePlanShow();
               }
             }else if(this.bigBase==8){
               if(this.nnnn==i){
                 this.nnnn='';
                 this.strPnr = '';
                 this.selfSavePlanShow();
               }else{
                 this.selfSavePlanShow();
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
  },
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
   height: 135px;
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
