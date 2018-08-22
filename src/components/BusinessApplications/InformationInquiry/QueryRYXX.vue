<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
            基础查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="self">
            自定义查询
          </div>
        </div>
        <div class="ak-tab-pane" >
          <el-row type="flex" style="height:100%" v-show="page==0">
            <el-col :span="22" class="br flex-c pr-20">
              <div style="display:flex;justify-content: flex-end;width:100%;margin-bottom:15px">
                <el-button type="primary" plain name="button" @click="openL" size="mini">{{listText}}</el-button>
              </div>
              <el-row align="center" :gutter="2">
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">洲：</span>
                  <el-select placeholder="请选择" v-model="cdt.continentsCodeEqual" filterable clearable @visible-change="chau" @change="nationality(cdt.continentsCodeEqual)" size="small"  class="input-input">
                    <el-option
                      v-for="item in chauName"
                      :key="item.code"
                      :value="item.code"
                      :label="item.code+' - '+item.name"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">国籍/地区：</span>
                  <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable clearable size="small"  class="input-input" @visible-change="baseNation">
                    <el-option
                      v-for="item in selection"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CODE+' - '+item.CNAME"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">姓名：</span>
                  <div class="input-input t-fuzzy t-flex">
                    <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                    <el-checkbox v-model="cdt.isBlurred">模糊查询</el-checkbox>
                  </div>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">性别：</span>
                  <el-select placeholder="请选择" v-model="cdt.genderEqual" size="small" filterable clearable class="input-input">
                    <el-option label="M - 男" value="M"></el-option>
                    <el-option label="F - 女" value="F"></el-option>
                    <el-option label="U - 未知" value="U"></el-option>
                  </el-select>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startDateofbirth"
                      type="date" size="small"
                      placeholder="开始日期"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDateofbirth"
                       type="date" size="small"
                       placeholder="结束日期"
                       value-format="yyyyMMdd">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text"><i class="t-must">*</i>航班日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                      v-model="cdt.startFlightDepartdate"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyyMMddHHmm"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                       v-model="cdt.endFlightDepartdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       format="yyyy-MM-dd HH:mm"
                       value-format="yyyyMMddHHmm"
                       :picker-options="pickerOptions1">
                   </el-date-picker>
                  </div>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">航班号：</span>
                  <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">出入境：</span>
                  <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                    <el-option label="I - 入境" value="I"></el-option>
                    <el-option label="O - 出境" value="O"></el-option>
                    <!-- <el-option label="G - 过境" value="G"></el-option>
                    <el-option label="全部" value=""></el-option> -->
                  </el-select>
                </el-col>
                <!-- 展开收起项 -->
                <div class="" v-show="openList">
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
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
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text"><i class="t-must">*</i>预计起飞时间：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                      v-model="cdt.startDepartdate"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyyMMddHHmm"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                       v-model="cdt.endDepartdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       format="yyyy-MM-dd HH:mm"
                       value-format="yyyyMMddHHmm"
                       :picker-options="pickerOptions3">
                   </el-date-picker>
                  </div>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">值机时间：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startCreatetime"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      value-format="yyyyMMddHHmmss">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endCreatetime"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       value-format="yyyyMMddHHmmss">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="8" class="input-item">
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
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text"><i class="t-must">*</i>预计降落时间：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                      v-model="cdt.startArrivdate"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyyMMddHHmm"
                      :picker-options="pickerOptions4">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                       v-model="cdt.endArrivdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       format="yyyy-MM-dd HH:mm"
                       value-format="yyyyMMddHHmm"
                       :picker-options="pickerOptions5">
                   </el-date-picker>
                  </div>
                </el-col>
                <el-col :sm="24" :md="12" :lg="8" class="input-item">
                  <span class="input-text">最终预检结果：</span>
                  <el-select v-model="cdt.lastcheckresult" placeholder="请选择" filterable clearable size="small" class="input-input">
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
                    <span style="float: left">{{item}}</span>
                    <span style="float: right;margin-left:20px" class="el-icon-circle-close" @click.stop="deleteItem(item)"></span>
                  </el-option>
                </el-select>
                <button type="button" name="button" @click="dialogVisible = true;sss=''">保存方案</button>
              </div>
              <!-- 写入方案名称 -->
              <el-dialog
                title="方案名称"
                :visible.sync="dialogVisible"
                width="30%"
                >
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
              <el-button type="success" class="mb-15" size="small" @click="query">查询</el-button>
              <el-button type="primary" plain size="small" @click="reset">重置</el-button>
            </el-col>
          </el-row>
          <div class="" v-show="page==1">
            <el-row type="flex" style="height:100%">
              <el-col :span="22" class="bd0">
                <div class="akcheck2top boder1">
                  <el-button type="primary" plain size="mini" @click="addRow">添加</el-button>
                  <el-button type="primary" plain size="mini" @click="batchI">批量导入</el-button>
                  <el-button type="primary" plain size="mini" @click="download">下载模板</el-button>
                </div>
                <div class="akUl">
                  <el-table
                    ref="multipleTable"
                    :data="rows"
                    border
                    style="width: 100%;"
                    max-height="140"
                    id="out-table">
                    <el-table-column
                      label="国籍/地区"
                      width="200">
                      <template slot-scope="scope">
                        <el-select placeholder="请选择国籍" v-model="scope.row.nationalityEqual" filterable clearable size="mini" class="input-inp" @visible-change="">
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
                        type="datetime" size="mini"
                        placeholder="请选择航班日期"
                        class="input-inp"
                        value-format="yyyyMMddHHmmss">
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
                    <!-- <el-table-column
                      label="预计起飞时间"
                      width="200">
                      <template slot-scope="scope">
                        <el-date-picker
                        v-model="scope.row.departdate"
                        type="datetime" size="mini"
                        placeholder="请选择预计起飞时间"
                        class="input-inp"
                        value-format="yyyyMMddHHmmss">
                      </el-date-picker>
                     </template>
                    </el-table-column> -->

                    <!-- <el-table-column
                      label="预计降落时间"
                      width="200">
                      <template slot-scope="scope">
                        <el-date-picker
                        v-model="scope.row.arrivdate"
                        type="datetime" size="mini"
                        placeholder="请选择预计降落时间"
                        class="input-inp"
                        value-format="yyyyMMddHHmmss">
                      </el-date-picker>
                     </template>
                    </el-table-column> -->
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
                </div>
              </el-col>
              <el-col :span="2" class="down-btn-area">
                <el-button type="success" class="mb-15" size="small" @click="batchS">查询</el-button>
                <el-button type="primary" plain size="small" @click="batchReset">重置</el-button>
              </el-col>
            </el-row>
            <el-row type="flex" style="height:100%">
              <el-col :span="22" style="margin-top: 15px;">
                <!-- 保存方案 -->
                <div class="t-save">
                  <el-select  filterable clearable v-model="pppp"  @visible-change="batchSavePlanShow" @change="batchPlanQuery" placeholder="方案选择" size="small" class="mr-15">
                    <el-option
                      v-for="item in batchSaveName"
                      :label="item"
                      :value="item"
                      :key="item"
                      >
                      <span style="float: left">{{item}}</span>
                      <span style="float: right;margin-left:20px" class="el-icon-circle-close" @click.stop="batchDeleteItem(item)"></span>
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

          <el-row type="flex" style="height:100%" v-show="page==2">
            <el-col :span="22" class="br" type="flex">
              <el-row type="flex" justify="end">
                <el-col :sm="24" :md="12" :lg="12" class="selfAdd">
                  <el-button type="primary" plain size="mini" @click="selfAddRow" class="selfAdd">添加</el-button>
                </el-col>
              </el-row>
              <el-row align="center" :gutter="2">
                 <!-- 左边查询条件 -->
                   <el-col :sm="24" :lg="14" class="queryLeft">
                     <el-row type="flex" align="center" :gutter="10" style="width:100%">
                       <el-col :sm="24" :md="12" :lg="6" class="input-item">
                         <span class="input-text">属性：</span>
                         <el-select placeholder="请选择" v-model="selfCdtList.attribute" filterable clearable @visible-change="attribute(selfCdtList)" @change="attributeOperator(selfCdtList)" size="mini" @clear="cl(selfCdtList.attribute)">
                           <el-option
                             v-for="item in selfNature"
                             :key="item.name"
                             :value="item.name"
                             :label="item.name"
                           ></el-option>
                         </el-select>
                       </el-col>
                       <el-col :sm="24" :md="12" :lg="3" class="input-item t-operator">
                         <el-select placeholder="请选择" v-model="selfCdtList.operator" filterable clearable @visible-change="attribute2(selfNature,selfCdtList)" size="mini">
                           <el-option
                             v-for="item in operator"
                             :key="item"
                             :value="item"
                             :label="item"
                           ></el-option>
                         </el-select>
                       </el-col>
                       <el-col :sm="24" :md="12" :lg="5" class="input-item">
                         <!-- 输入框 -->
                         <el-input placeholder="请输入内容" v-model="selfCdtList.atype" size="mini" v-show="selfCdtList.type==0"></el-input>
                         <!-- 性别 -->
                         <el-select placeholder="请选择" v-model="selfCdtList.atype" filterable clearable size="mini" v-show="selfCdtList.type==1">
                           <el-option label="M - 男" value="M"></el-option>
                           <el-option label="F - 女" value="F"></el-option>
                           <el-option label="U - 未知" value="U"></el-option>
                         </el-select>
                         <!-- 起飞机场 -->
                         <el-select placeholder="请选择" v-model="selfCdtList.atype" filterable @visible-change="takeOff" size="mini" class="input-input t-width100" v-show="selfCdtList.type==2">
                           <el-option
                           v-for="item in takeOffName"
                           :key="item.AIRPORT_CODE"
                           :value="item.AIRPORT_CODE"
                           :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                           </el-option>
                         </el-select>
                         <!-- 日期 精确到天 -->
                         <el-date-picker
                         v-model="selfCdtList.atype"
                         v-show="selfCdtList.type==3"
                         type="date" size="mini"
                         placeholder="选择日期"
                         class="t-width100"
                         value-format="yyyyMMdd"
                         >
                        </el-date-picker>
                       <!-- 日期 精确到秒 -->
                         <el-date-picker
                         v-model="selfCdtList.atype"
                         v-show="selfCdtList.type==4"
                         type="datetime" size="mini"
                         placeholder="选择日期"
                         class="t-width100"
                         value-format="yyyyMMddHHmmss">
                        </el-date-picker>

                       </el-col>
                     </el-row>

                     <el-row type="flex" align="center" :gutter="10" style="width:100%" v-for="self in selfRows">
                      <el-col :sm="24" :md="12" :lg="6" class="input-item">
                        <span class="input-text">属性：</span>
                        <el-select placeholder="请选择" v-model="self.attribute" @visible-change="attribute(self)" @change="attributeOperator(selfNature)" filterable clearable size="mini">
                          <el-option
                            v-for="item in selfNature"
                            :key="item.name"
                            :value="item.name"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="3" class="input-item t-operator">
                        <el-select placeholder="请选择" v-model="self.operator" filterable clearable @visible-change="attribute2(selfNature,self)" size="mini">
                          <el-option
                            v-for="item in operator"
                            :key="item"
                            :value="item"
                            :label="item"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="5" class="input-item">
                        <!-- 输入框 -->
                        <el-input placeholder="请输入内容" v-model="self.atype" size="mini" v-show="self.type==0"></el-input>
                        <!-- 性别 -->
                        <el-select placeholder="请选择" v-model="self.atype" filterable clearable size="mini" v-show="self.type==1">
                          <el-option label="M - 男" value="M"></el-option>
                          <el-option label="F - 女" value="F"></el-option>
                          <el-option label="U - 未知" value="U"></el-option>
                        </el-select>
                        <!-- 起飞机场 -->
                        <el-select placeholder="请选择" v-model="self.atype" filterable clearable @visible-change="takeOff" size="mini" class="input-input t-width100" v-show="self.type==2">
                          <el-option
                          v-for="item in takeOffName"
                          :key="item.AIRPORT_CODE"
                          :value="item.AIRPORT_CODE"
                          :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                          </el-option>
                        </el-select>
                        <!-- 日期 精确到天 -->
                        <el-date-picker
                        v-model="self.atype"
                        v-show="self.type==3"
                        type="datetime" size="mini"
                        placeholder="选择日期"
                        class="t-width100"
                        value-format="yyyyMMddHHmmss">
                       </el-date-picker>
                      <!-- 日期 精确到秒 -->
                        <el-date-picker
                        v-model="self.atype"
                        v-show="self.type==4"
                        type="datetime" size="mini"
                        placeholder="选择日期"
                        class="t-width100"
                        value-format="yyyyMMddHHmmss">
                       </el-date-picker>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="7" class="input-item">
                        <span class="input-text">逻辑关系：</span>
                        <el-select placeholder="请选择" v-model="self.relation" filterable clearable size="mini" class="input-input" style="margin-left:10%">
                          <el-option label="and" value="and"></el-option>
                          <el-option label="or" value="or"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="2" class="selfButton">
                        <el-button type="warning" plain size="mini" @click="selfDeleteRow(self)">删除</el-button>
                      </el-col>

                     </el-row>
                     <el-row type="flex" justify="start" align="center" :gutter="10" style="width:100%">
                     <el-col :sm="24" :md="12" :lg="8" class="input-item">
                       <span class="input-text">数据排序：</span>
                       <el-select placeholder="请选择" v-model="dataSort" filterable clearable size="mini" @visible-change="order()">
                         <el-option
                           v-for="item in sortSet"
                           :key="item.code"
                           :value="item.code"
                           :label="item.code+' - '+item.name"
                         ></el-option>
                       </el-select>
                     </el-col>
                     </el-row>
                   </el-col>


                  <!-- 右边表达式 -->
                  <el-col :lg="10" class="queryRight">
                    <el-row type="flex" align="center" :gutter="10" style="width:100%">
                      <span class="input-text expression-text">表达式：</span>
                      <el-input type="textarea" class="expression" v-model="aaa"></el-input>
                    </el-row>
                  </el-col>
              </el-row>
              <el-row type="flex" style="margin-top:15px">
                  <!-- 保存方案 -->
                  <div class="t-save">
                    <el-select  filterable v-model="ffff"  @visible-change="selfSavePlanShow" filterable clearable @change="selfPlanQuery" placeholder="方案选择" size="small" class="mr-15">
                      <el-option
                        v-for="item in selfSaveName"
                        :label="item"
                        :value="item"
                        :key="item"
                        >
                        <span style="float: left">{{item}}</span>
                        <span style="float: right;margin-left:20px" class="el-icon-circle-close" @click.stop="selfDeleteItem(item)"></span>
                      </el-option>
                    </el-select>
                    <button type="button" name="button" @click="selfDialogVisible = true;fff=''">保存方案</button>
                  </div>

                  <el-dialog
                    title="方案名称"
                    :visible.sync="selfDialogVisible"
                    width="30%"
                    >
                    <el-form  class="plan">
                      <el-form-item label="方案名称:" :label-width="formLabelWidth">
                        <el-input v-model="fff" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="selfPlanSave">保存</el-button>
                    </span>
                  </el-dialog>
                  </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small" @click="selfS">查询</el-button>
              <el-button type="primary" plain size="small" @click="selfReset">重置</el-button>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="middle-btn-g">
        <button type="button" name="button" class="mr-15" :class="{'pitchOn':bigBase==0}" @click="iapi">IAPI数据</button>
        <button type="button" name="button" :class="{'pitchOn':bigBase==1}"  @click="pnr">PNR数据</button>
      </div>

    </div>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2">
      <div class="title-green">
        <span style="float:left">结果显示项</span>
        <el-button style="float:right" type="primary" plain @click="openCheck" size="mini">{{text}}</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkList" class="o-checkbox-g" @change="fn" v-show="openCheckbox">
         <el-checkbox v-for="item in checkItem" :label="item.ITEMNAME" :key="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>
    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <el-form :model="dform" ref="detailsForm">
        <div class="hrtitle">基本信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件颁发国：</div><div class="t-el-sub">{{dform.PASSPORTISSUECOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dform.PASSPORTEXPIREDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件签发日期：</div><div class="t-el-sub">{{dform.PASSPORTISSUEDATESTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生国：</div><div class="t-el-sub">{{dform.BIRTHCOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">居住国：</div><div class="t-el-sub">{{dform.RESIDENCENAME}}</div></el-col>
        </el-row>
        <div class="hrtitle">航班信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计起飞时间：</div><div class="t-el-sub">{{dform.DEPARTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计到达时间：</div><div class="t-el-sub">{{dform.ARRIVDATESTR}}</div></el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">原预检结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">最终预检结果：</div><div class="t-el-sub">{{dform.LASTCHECKRESULTSTR}}</div></el-col>
          <!-- <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col> -->
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班状态：</div><div class="t-el-sub">{{dform.FLIGHTSTATUSSTR==0?"取消":"起飞"}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班起飞时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEUPSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班取消时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEDOWNSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">降落口岸：</div><div class="t-el-sub">{{dform.PORTSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
        </el-row>
        <div class="hrtitle">其他信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ICS记录编号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR=="FL"?"普通旅客":"中转旅客"}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客状态：</div><div class="t-el-sub">{{dform.PASSENGERSTATUSSTR==0?"已值机":dform.PASSENGERSTATUS==1?"已登机":"未登机"}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否报警：</div><div class="t-el-sub">{{dform.ISEVENT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ABO唯一标识：</div><div class="t-el-sub">{{dform.ABONO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件号码：</div><div class="t-el-sub">{{dform.OTHER_NO}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件有效期：</div><div class="t-el-sub">{{dform.OTHER_EXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件颁发国：</div><div class="t-el-sub">{{dform.OTHER_ISSUECOUNTRYSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件签发日期：</div><div class="t-el-sub">{{dform.OTHERDOCUMENTISSUEDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证号码：</div><div class="t-el-sub">{{dform.VISANO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证有效期：</div><div class="t-el-sub">{{dform.VISAEXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证国家：</div><div class="t-el-sub">{{dform.VISAISSUECOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证签发日期：</div><div class="t-el-sub">{{dform.VISAISSUEDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dform.ORIGINSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地地址：</div><div class="t-el-sub">{{dform.DESTADDRESS}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地城市：</div><div class="t-el-sub">{{dform.DESTCITY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的的所在省：</div><div class="t-el-sub">{{dform.DESTSTATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地国家：</div><div class="t-el-sub">{{dform.DESTCOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地邮编：</div><div class="t-el-sub">{{dform.DESTPOSTALCODE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检接收时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检回复时间：</div><div class="t-el-sub">{{dform.IAPI_RESPONSETIMESTR}}</div></el-col>
        </el-row>
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性名：</div><div class="t-el-sub">{{check.FIELDNAME}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性值：</div><div class="t-el-sub">{{check.FIELDVALUES}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">是否必填：</div><div class="t-el-sub">{{check.INPUT}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最小长度：</div><div class="t-el-sub">{{check.MINLENGTH}}</div></el-col>
          </el-row>

          <el-row type="flex"  class="mb-6">
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
          <el-row type="flex"  class="mb-6">
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
            label="姓名" sortable
          >
          </el-table-column>
          <el-table-column

            label="性别" sortable
            width="80"
          >
          <template slot-scope="scope">
            {{scope.row.GENDER | fiftersex}}
          </template>
          </el-table-column>
          <el-table-column
            prop="DATEOFBIRTH"
            label="出生日期" sortable
            >
          </el-table-column>
          <el-table-column
            prop="NATIONALITYC"
            label="国籍" sortable
          >
          </el-table-column>

          <el-table-column
            prop="PASSPORTNO"
            label="证件号码" sortable
          >
          </el-table-column>

          <el-table-column
            prop="FLTNO"
            label="航班号" sortable
          >
          </el-table-column>
          <el-table-column
            prop="SCHEDULEDEPARTURETIME"
            label="航班日期" sortable
            >
          </el-table-column>

          <el-table-column
            label="预检结果" sortable
              width="120"
            >
            <template slot-scope="scope">
              {{scope.row.CHECKRESULT | fiftecr}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="最终预检结果" sortable
            width="120"
            >
            <template slot-scope="scope">
              {{scope.row.LASTCHECKRESULT | fiftecr}}
            </template>
          </el-table-column> -->
          <el-table-column
            label="报警信息" sortable
            >
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

    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="releaseform" ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="excel"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          action="http://192.168.99.206:8080/manage-platform/iapi/readExcel"
          :on-success="uploadSuccess"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <div class="middle">
      <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({'name':'QueryHBZW'})">航班座位图</el-button>
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({name:'QueryGLRY'})">关联人员查询</el-button> -->
      <el-button  plain class="table-btn mb-9" size="small" @click="getPdf()">导出</el-button>
      <el-button  plain class="table-btn mb-9" size="small" v-print="'#printMe'">打印</el-button>
      <el-table
        ref="singleTable"
        :data="tableData"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @row-click="checkRow"
        @cell-click="getMore"
        id="printMe"
        >
        <el-table-column
          width="100"
           label="单选">
          <template slot-scope="scope">
            <el-radio v-model="radio" class="radio" :label="scope.row.I_SERIAL">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="I_NAME"
          label="姓名"
          sortable
          width="100"
          v-if="checkList.indexOf(checkItem[0].ITEMNAME)>-1"
          >
        </el-table-column>
        <el-table-column
          prop="INTG_CHNNAME"
          label="中文姓名"
          sortable
          width="100"
          v-if="checkList.indexOf(checkItem[1].ITEMNAME)>-1"
          >
        </el-table-column>
        <el-table-column
          prop="I_34"
          label="性别"
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[2].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_76"
          label="出生日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_37"
          label="国籍/地区"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_77"
          label="证件种类"
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_39"
          label="证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_12"
          label="航班号"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="filghtDate"
          label="航班日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_65"
          label="值机状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[9].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_60"
          label="最终预检结果"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_13"
          label="出入标识"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[11].ITEMNAME)>-1">
        </el-table-column>

        <el-table-column
          prop="I_15"
          label="起飞机场"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_74"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_16"
          label="到达机场"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_75"
          label="预计降落时间"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_73"
          label="航班座位号"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_64"
          label="航班状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_40"
          label="证件有效期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_42"
          label="证件签发日期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_41"
          label="证件签发国"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[20].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_48"
          label="签证号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[21].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_49"
          label="签证有效期"
          width="140"
          sortable
          v-if="checkList.indexOf(checkItem[22].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_43"
          label="其他证件号码"
          width="140"
          sortable
          v-if="checkList.indexOf(checkItem[23].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_44"
          label="其他证件有效期"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[24].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_46"
          label="其他证件签发日期"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[25].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_45"
          label="其他证件签发国"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[26].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_10"
          label="航空公司联系电话"
          width="180"
          sortable
          v-if="checkList.indexOf(checkItem[27].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_63"
          label="边检回复日期"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[28].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_27"
          label="ABO唯一标识"
          width="150"
          sortable
          v-if="checkList.indexOf(checkItem[29].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
         </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共{{totalPage}}页
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

          @current-change="handleCurrentChange"
          :page-size="showCount"
          layout="prev, pager, next"
          :total="totalResult">
        </el-pagination>
      </div>
    </div>

    </div>

  </div>

</template>

<script>
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
export default {
  data() {
    return {
      dialogVisible: false,//基础查询写入方案名称
      batchDialogVisible:false,//批量查询写入方案名称
      selfDialogVisible:false,//自定义查询写入方案名称
      detailsDialogVisible:false,//查看详情模态框
      reviewDialogTable:false,//查看历次信息模态框
      uploadDialogVisible:false,
      htmlTitle: '页面导出PDF文件名',
      sortSet:[],
      dataSort:'',

      openList:true,
      openCheckbox:true,
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数
      releaseform:{},


      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数

      batchDialog:false,
      fileName:'',

      page: 0,
      text:'收起',
      listText:'收起',
      dform:{},
      rules:{},
      check:{},
      isCheck:false,
      isName:true,
      isRules:true,
      isCall:false,
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
          endArrivdate:''
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
      selfRows:[
        {
            id:1,
            attribute:'',
            operator:'',
            type:0,
            relation:'',
            atype:''
        }
      ],
      selfModelrow:{
        id:0,
        attribute:'',
        operator:'',
        type:0,
        relation:'',
        atype:''
      },
      selfCleanRow:{
        id:0,
        attribute:'',
        operator:'',
        type:0,
        relation:'',
        atype:''
      },
      count:1,
      formData:{'file':''},
      selfCount:0,
      basedQuery:['I_NAME','INTG_CHNNAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      batchQuery:['I_NAME','INTG_CHNNAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      selfQuery:['I_NAME','INTG_CHNNAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      checkList: ['I_NAME','INTG_CHNNAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      checkItem:[
        {
          ITEMNAME:'I_NAME',
          LABEL:'姓名',
        },
        {
          ITEMNAME:'INTG_CHNNAME',
          LABEL:'中文姓名',
        },
        {
          ITEMNAME:'I_34',
          LABEL:'性别',
        },
        {
          ITEMNAME:'I_76',
          LABEL:'出生日期',
        },
        {
          ITEMNAME:'I_37',
          LABEL:'国籍/地区',
        },
        {
          ITEMNAME:'I_77',
          LABEL:'证件种类',
        },
        {
          ITEMNAME:'I_39',
          LABEL:'证件号码',
        },
        {
          ITEMNAME:'I_12',
          LABEL:'航班号',
        },
        {
          ITEMNAME:'filghtDate',
          LABEL:'航班日期',
        },
        {
          ITEMNAME:'I_65',
          LABEL:'值机状态',
        },
        {
          ITEMNAME:'I_60',
          LABEL:'最终预检结果',
        },
        {
          ITEMNAME:'I_13',
          LABEL:'出入标识',
        },
        {
          ITEMNAME:'I_15',
          LABEL:'起飞机场',
        },
        {
          ITEMNAME:'I_74',
          LABEL:'预计起飞时间',
        },
        {
          ITEMNAME:'I_16',
          LABEL:'到达机场',
        },
        {
          ITEMNAME:'I_75',
          LABEL:'预计降落时间',
        },
        {
          ITEMNAME:'I_73',
          LABEL:'航班座位号',
        },
        {
          ITEMNAME:'I_64',
          LABEL:'航班状态',
        },
        {
          ITEMNAME:'I_40',
          LABEL:'证件有效期',
        },
        {
          ITEMNAME:'I_42',
          LABEL:'证件签发日期',
        },
        {
          ITEMNAME:'I_41',
          LABEL:'证件签发国',
        },
        {
          ITEMNAME:'I_48',
          LABEL:'签证号码',
        },
        {
          ITEMNAME:'I_49',
          LABEL:'签证有效期',
        },
        {
          ITEMNAME:'I_43',
          LABEL:'其他证件号码',
        },
        {
          ITEMNAME:'I_44',
          LABEL:'其他证件有效期',
        },
        {
          ITEMNAME:'I_46',
          LABEL:'其他证件签发日期',
        },
        {
          ITEMNAME:'I_45',
          LABEL:'其他证件签发国',
        },
        {
          ITEMNAME:'I_10',
          LABEL:'航空公司联系电话',
        },
        {
          ITEMNAME:'I_63',
          LABEL:'边检回复日期',
        },
        {
          ITEMNAME:'I_27',
          LABEL:'ABO唯一标识',
        }


        // {
        //   ITEMNAME:'I_59',
        //   LABEL:'原预检结果',
        // },
        // {
        //   ITEMNAME:'E_EVENTSERIAL',
        //   LABEL:'是否报警',
        // },
      ],
      value: 1,
      value6:'',
      chauName:[],
      selection:[],
      nationName:[],
      detailstableData: [],//详情里面的列表
      idName:[],
      saveName:[],//基础查询方案保存
      batchSaveName:[],//批量查询方案保存
      selfSaveName:[],//自定义查询方案保存
      takeOffName:[],
      landingName:[],
      nationalityName:[],
      cdt:{
        isBlurred:false,
        startFlightDepartdate:'',
        endFlightDepartdate:'',
        startDepartdate:'',
        endDepartdate:'',
        startArrivdate:'',
        endArrivdate:''
      },
      historyCdt:{},
      cdtList:{version:0,flag:''},//批量查询的第一行
      selfCdtList:{id:0,type:0,attribute:'',atype:''},//自定义查询的第一行
      selfNature:[],
      operator:[],
      item:{},
      sss:'',//基础查询
      ssss:'',
      ppp:'',//批量查询
      pppp:'',
      fff:'',//自定义查询
      ffff:'',
      eve:'',
      pnrEve:'',
      str:'',
      // aaa:'',
      name:'',
      radio:'',
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
      formLabelWidth:'120px',
      tableData: [],
      basedTableData:[],
      batchTableData:[],
      selfTableData:[],

      basedTableDataPnr:[],
      batchTableDataPnr:[],
      selfTableDataPnr:[],

      historyData:[],
      showConfiglist:[],//展示项数组
      selfCdt:{AAAAA:''},//自定义查询表达式信息
      selfType:0,
      file:'',
      bigBase:0,
      pickerOptions: {
        disabledDate: (time) => {
            if (this.cdt.endFlightDepartdate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.endFlightDepartdate;
            }else if(this.cdt.endFlightDepartdate == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.cdt.startFlightDepartdate;
        }
      },

      pickerOptions2: {
        disabledDate: (time) => {
            if (this.cdt.endDepartdate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.endDepartdate;
            }else if(this.cdt.endDepartdate == null){
              return false
            }
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.cdt.startDepartdate;
        }
      },

      pickerOptions4: {
        disabledDate: (time) => {
            if (this.cdt.endArrivdate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.endArrivdate;
            }else if(this.cdt.endArrivdate == null){
              return false
            }
        }
      },
      pickerOptions5: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.cdt.startArrivdate;
        }
      },
    }
  },
  mounted(){
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.cdt.startFlightDepartdate=formatDate(begin,'yyyyMMddhhmm');
    this.cdt.endFlightDepartdate=formatDate(end,'yyyyMMddhhmm');

    this.cdt.startDepartdate=formatDate(begin,'yyyyMMddhhmm');
    this.cdt.endDepartdate=formatDate(end,'yyyyMMddhhmm');

    this.cdt.startArrivdate=formatDate(begin,'yyyyMMddhhmm');
    this.cdt.endArrivdate=formatDate(end,'yyyyMMddhhmm');
    this.takeOff();
    this.landing();
    this.nation();
    this.currentPage = 1;
  },
  computed:{
    aaa:{
      get:function(){
        let switchOperator='';
        let switchArr='';
        let arr = this.selfRows;
        console.log(this.str);
        if(this.selfCdtList.attribute!=""){
          if(this.selfCdtList.operator=='等于'){
            switchOperator='='
            console.log('('+this.selfCdtList.attribute+switchOperator+this.selfCdtList.atype+')');
          }else if(this.selfCdtList.operator=='小于'){
            switchOperator='<'
          }else if(this.selfCdtList.operator=='大于'){
            switchOperator='>'
          }
          if(this.selfCdtList.attribute==''&&this.selfCdtList.atype==''&&this.selfCdtList.operator==undefined){
            this.str = '';
          }else{
            this.clearTime();
            this.str = '('+this.selfCdtList.attribute+switchOperator+this.selfCdtList.atype+')';
          }

          for(var i=0;i<arr.length;i++){
            if(arr[i].operator=='等于'){
              switchArr='='
            }else if(arr[i].operator=='小于'){
              switchArr='<'
            }else if(arr[i].operator=='大于'){
              switchArr='>'
            }
            if(arr[i].attribute==''&&arr[i].atype==''&&arr[i].operator==''){
              this.str+='';
            }else{
              if(arr[i].atype == null){
                arr[i].atype ='';
              }
              this.str += arr[i].relation+'('+arr[i].attribute+switchArr+arr[i].atype+')';
            }

          };
        }

        this.selfCdt.AAAAA = this.str;
        console.log(this.selfCdt.AAAAA);
        return  this.str;
      },
      set:function(newVal){
        this.aaa2 = newVal;
      }
    }
  },
  filters: {
    discount: function(value) {
      return value.substring(0,16);
    },
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
  methods: {
    //----------------------------分页start------------------------------
    pageSizeChange(val) {//显示条数，调用
      if(this.bigBase == 0){
        if(this.page==0){
          this.getList(this.totalResult,this.currentPage,val,this.cdt);
        }else if(this.page==1){
          this.batchQueryList(this.currentPage,val,this.rows);
        }else if(this.page==2){
          this.selfQueryList(this.currentPage,val,this.selfCdt,this.dataSort);
        }
      }else if(this.bigBase == 1){
        if(this.page==0){
          this.getListPnr(this.totalResult,this.currentPage,val,this.cdt);
        }else if(this.page==1){
          this.batchQueryListPnr(this.currentPage,val,this.rows);
        }else if(this.page==2){
          this.selfQueryListPnr(this.currentPage,val,this.selfCdt,this.dataSort);
        }
      }
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    handleCurrentChange(val) {//显示当前页，调用
      if(this.bigBase == 0){
        if(this.page==0){
          this.getList(this.totalResult,val,this.showCount,this.cdt);
        }else if(this.page==1){
          this.batchQueryList(val,this.showCount,this.rows);
        }else if(this.page==2){
          this.selfQueryList(val,this.showCount,this.selfCdt,this.dataSort);
        }
      }else if(this.bigBase == 1){
        if(this.page==0){
          this.getListPnr(this.totalResult,val,this.showCount,this.cdt);
        }else if(this.page==1){
          this.batchQueryListPnr(val,this.showCount,this.rows);
        }else if(this.page==2){
          this.selfQueryListPnr(val,this.showCount,this.selfCdt,this.dataSort);
        }
      }
    },
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    //----------------------------分页end------------------------------
    checkRow(row,event){//列表单选操作
      // console.log(row,event)
      this.radio=row.I_SERIAL
    },
    //----------------------------基础查询start------------------------------
    getListPnr(totalResult,currentPage,showCount,cdt){//基础查询 pnr
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      if(dayGap(this.cdt.startFlightDepartdate,this.cdt.endFlightDepartdate,0)>30){
        this.$alert('航班日期查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(dayGap(this.cdt.startDepartdate,this.cdt.endDepartdate,0)>30){
        this.$alert('预计起飞时间查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(dayGap(this.cdt.startArrivdate,this.cdt.endArrivdate,0)>30){
        this.$alert('预计降落时间查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let basePnr = 0;
      if(totalResult == 0){
        basePnr = -1
      }else{
        basePnr = totalResult
      }
      let ppnr = {
        "totalResult":basePnr,
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt
      };
      this.$api.post('/manage-platform/pnr/queryListPage',ppnr,
       r =>{
         this.based();
         this.tableData=r.data.resultList;//表格数据
         this.totalResult=r.data.totalResult;//总条数
         this.totalPage = r.data.totalPage;//总页数
         this.currentPage = r.data.currentPage;
         this.basedTableDataPnr = this.tableData;
       })
    },
    getList(totalResult,currentPage,showCount,cdt){//基础查询 查询调用
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      if(dayGap(this.cdt.startFlightDepartdate,this.cdt.endFlightDepartdate,0)>30){
        this.$alert('航班日期查询时间间隔不能超过一个月，如有需要请分多次查询', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(dayGap(this.cdt.startDepartdate,this.cdt.endDepartdate,0)>30){
        this.$alert('预计起飞时间查询时间间隔不能超过一个月，如有需要请分多次查询', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(dayGap(this.cdt.startArrivdate,this.cdt.endArrivdate,0)>30){
        this.$alert('预计降落时间查询时间间隔不能超过一个月，如有需要请分多次查询', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let base = 0;
      if(totalResult == 0){
        base = -1
      }else{
        base = totalResult
      }
      let pl={
        "totalResult":base,
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt
      };
      this.$api.post('/manage-platform/iapi/queryListPage',pl,
       r => {
         this.based();
         this.tableData=r.data.resultList;//表格数据
         this.totalResult=r.data.totalResult;//总条数
         this.totalPage = r.data.totalPage;//总页数
         this.currentPage = r.data.currentPage;
         this.basedTableData = this.tableData;
      })
    },
    iapi(){
      this.bigBase = 0;
      if(this.page == 0){
        this.getList(this.totalResult,this.currentPage,this.showCount,this.cdt);
      }else if(this.page == 1){
        this.batchQueryList(this.currentPage,this.showCount,this.rows);
      }else if(this.page == 2){
        this.selfQueryList(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      }

    },
    pnr(){
      this.bigBase = 1;
      // if(this.page == 0){
      //   this.getListPnr(this.totalResult,this.currentPage,this.showCount,this.cdt);
      // }else if(this.page == 1){
      //   this.batchQueryListPnr(this.currentPage,this.showCount,this.rows);
      // }else if(this.page == 2){
      //   this.selfQueryListPnr(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      // }

    },
    query(){//基础查询判断
      if(this.bigBase == 0){
        this.getList(this.totalResult,this.currentPage,this.showCount,this.cdt);
      }else if(this.bigBase == 1){
        this.getListPnr(this.totalResult,this.currentPage,this.showCount,this.cdt);
      }
    },
    getHistoryList(hcurrentPage,hshowCount,historyCdt){
      let gh = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"pd":historyCdt
      };
      // this.historyBased();
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',gh,
      r =>{
        this.detailstableData = r.data.pdList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    getHistoryListPnr(hcurrentPage,hshowCount,historyCdt){
      let ghl = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"pd":historyCdt
      };
      // this.historyBased();
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',ghl,
      r =>{
        this.detailstableData = r.data.pdList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    getMore(){//历次
      // console.log(row);
      // if(cell.label =='姓名'){
      //   this.reviewDialogTable = true;
      //   this.historyCdt.nationalityEqual = row.I_37CODE;
      //   this.historyCdt.passportnoEqual = row.I_39;
      //   if(this.bigBase == 0){
      //     this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
      //   }else if(this.bigBase == 1){
      //     this.getHistoryListPnr(this.hcurrentPage,this.hshowCount,this.historyCdt);
      //   }
      // }
    },
    planSave(){//基础查询 方案保存是否重名
      if(this.sss==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let tps = {
        name : this.sss,
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/isExistName',tps,
        r =>{
          if(r.success){
            if(r.data == false){
              this.$options.methods.savePlan.bind(this)();
              this.dialogVisible = false;
            }else{
              // this.promptDialogVisible = true;
              this.$alert('方案名称已存在，请重新命名', '提示', {
                confirmButtonText: '确定',
              });
            }
          }
        })
    },
    savePlan(){//基础查询 保存方案
        this.$options.methods.showConfiglistArr.bind(this)();
        let sp = {
        	"name": this.sss,
        	"page":  this.page,
        	"showConfigList": this.showConfiglist,
            //查询项
        	"config": this.cdt
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
    savePlanShow(){// 基础查询方案名称列表
      let sn = {
        page : this.page
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
          page : this.page,
          name : this.ssss
        }
        this.$api.post('/manage-platform/queryShow/queryConfigInfo',pq,
        r =>{
          if(r.success){
            this.cdt = r.data.config;
            let arr = r.data.showConfigList;
            let arr1=[];
            if(arr.length == 0){
              this.checkList = ['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'];
            }else{
              for(var i=0;i<arr.length;i++){
                if(arr[i].isCheck == '1'){
                  arr1.push(arr[i].itemName);
                }
              }
              this.checkList = arr1;
            }
            this.basedQuery = this.checkList;
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
          page:this.page
        };
        this.$api.post('/manage-platform/queryShow/delete',dei,
         r =>{
           if(r.success){
             if(this.ssss==i){
               this.ssss='';
               this.cdt={isBlurred:false};
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
    //----------------------------批量查询start------------------------------
    batchQueryList(currentPage,showCount,rows){//批量查询列表
      let bql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":rows
      }
      this.$api.post('/manage-platform/iapi/queryIapiBatch',bql,
      r =>{
        if(r.success){
          this.based();
          this.tableData=r.data.resultList;//表格数据
          this.totalResult=r.data.totalResult;//总条数
          this.totalPage = r.data.totalPage;//总页数
          this.currentPage = r.data.currentPage;
          this.batchTableData = this.tableData;
        }
      })
    },
    batchQueryListPnr(currentPage,showCount,rows){//批量查询pnr
      let bqlp = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":rows
      }
      this.$api.post('/manage-platform/pnr/queryPnrBatch',bqlp,
      r =>{
        if(r.success){
          this.based();
          this.tableData=r.data.resultList;//表格数据
          this.totalResult=r.data.totalResult;//总条数
          this.totalPage = r.data.totalPage;//总页数
          this.currentPage = r.data.currentPage;
          this.batchTableDataPnr = this.tableData;
        }
      })
    },
    batchS(){
      if(this.bigBase == 0){
        this.batchQueryList(this.currentPage,this.showCount,this.rows);
      }else if(this.bigBase == 1){
        this.batchQueryListPnr(this.currentPage,this.showCount,this.rows);
      }
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
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/isExistName',batch,
       r =>{
         if(r.success){
           if(r.data == false){
             this.$options.methods.batchSavePlan.bind(this)();
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

    batchSavePlan(){//批量查询 保存方案
      this.$options.methods.showConfiglistArr.bind(this)();//展示项数组
      let batchSP = {
        "name" : this.ppp,
        "page" : this.page,
        "showConfigList":this.showConfiglist,
        "configList":this.rows
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
    batchSavePlanShow(){//批量查询方案名称列表

      let bsp = {
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/queryNameList',bsp,
       r =>{
         if(r.success){
           this.batchSaveName = r.data;
         }
       })
    },

    batchPlanQuery(){//批量查询 方案渲染
      let bpq = {
        page : this.page,
        name : this.pppp
      }
      this.$api.post('/manage-platform/queryShow/queryConfigInfo',bpq,
      r =>{
        if(r.success){
          // 查询项渲染
          let arr = r.data.showConfigList;
          let arr1 = [];
          if(r.data.configList.length == 0){
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
              endArrivdate:''
            }]
          }else{
            this.rows = r.data.configList;
          }
          //展示项渲染
          if(arr.length == 0){
            this.checkList = ['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'];
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i].isCheck == '1'){
                arr1.push(arr[i].itemName);
              }
            }
            this.checkList = arr1;
          }
          // this.batchQuery = this.checkList;
        }
      })
    },
    batchDeleteItem(i){
      this.$confirm('方案删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let di = this.saveName.indexOf(i);
        // this.saveName.splice(di,1);
        let dei = {
          name:i,
          page:this.page
        };
        this.$api.post('/manage-platform/queryShow/delete',dei,
         r =>{
           if(r.success){
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

    addRow(){//批量查询 添加操作
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
    },
    deleteRow(item){//批量查询 删除操作
      this.rows.splice(item,1);
    },
    //----------------------------批量查询end------------------------------


    //----------------------------自定义查询start------------------------------
    selfQueryList(currentPage,showCount,selfCdt,dataSort){//自定义查询列表
      this.currentPage = 1;
      let dataSelf = [];
      dataSelf.push(dataSort);
      let sql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":selfCdt.AAAAA,
        "orders":dataSelf
      }
      this.$api.post('/manage-platform/iapi/customIapiQuery',sql,
       r =>{
         if(r.success){
           this.based();
           this.tableData=r.data.resultList;//表格数据   (待定)
           this.totalResult=r.data.totalResult;//总条数
           this.totalPage = r.data.totalPage;//总页数
           this.currentPage = r.data.currentPage;
           this.selfTableData = this.tableData;
         }
       })
    },
    selfQueryListPnr(currentPage,showCount,selfCdt,dataSort){
      this.currentPage = 1;
      console.log(selfCdt.AAAAA);
      let dataSelfPnr = [];
      dataSelfPnr.push(dataSort)
      let sqlp = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":selfCdt.AAAAA,
        "orders":dataSelfPnr
      }
      this.$api.post('/manage-platform/pnr/customPnrQuery',sqlp,
       r =>{
         if(r.success){
           this.based();
           this.tableData=r.data.resultList;//表格数据   (待定)
           this.totalResult=r.data.totalResult;//总条数
           this.totalPage = r.data.totalPage;//总页数
           this.currentPage = r.data.currentPage;
           this.selfTableDataPnr = this.tableData;
         }
       })
    },
    selfS(){
      if(this.bigBase == 0){
        this.selfQueryList(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      }else if(this.bigBase == 1){
        this.selfQueryListPnr(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      }
    },
    selfPlanSave(){//自定义 方案保存是否重名
      if(this.fff==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let selfPS = {
        name : this.fff,
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/isExistName',selfPS,
       r =>{
         if(r.success){
           if(r.data == false){
             this.$options.methods.selfSavePlan.bind(this)();
             this.selfDialogVisible = false;
           }else{
             // this.selfPromptDialogVisible = true;
             this.$alert('方案名称已存在，请重新命名', '提示', {
               confirmButtonText: '确定',
             });
           }
         }
       })
    },
    selfSavePlan(){//自定义查询 保存方案
      this.$options.methods.showConfiglistArr.bind(this)();//展示项数组
      let selfSP = {
        "name" : this.fff,
        "page" : this.page,
        "showConfigList":this.showConfiglist,
        "config":this.selfCdt
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
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/queryNameList',ssp,
      r =>{
        if(r.success){
          this.selfSaveName = r.data;
        }
      })
    },

    selfPlanQuery(){//自定义查询 方案渲染
      let spq = {
        page : this.page,
        name : this.ffff
      }
      this.$api.post('/manage-platform/queryShow/queryConfigInfo',spq,
      r =>{
        if(r.success){
          console.log(r.data.config.AAAAA);
          this.selfCdtList = {id:0,type:0,attribute:'',atype:''};
          this.selfRows=[{id:1,attribute:'',operator:'',type:0,relation:'',atype:''}];
          this.str = r.data.config.AAAAA; //渲染
          // this.aaa.set(r.data.config.AAAAA);
          let arr = r.data.showConfigList;
          let arr1=[];
          if(arr.length == 0){
            this.checkList = ['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'];
          }else{
            for(var i=0;i<arr.length;i++){
              if(arr[i].isCheck == '1'){
                arr1.push(arr[i].itemName);
              }
            }
            this.checkList = arr1;
          }
          this.selfQuery = this.checkList;
          // this.showConfigList  = r.data.showConfigList;
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
          page:this.page
        };
        this.$api.post('/manage-platform/queryShow/delete',dei,
         r =>{
           if(r.success){
             this.selfSavePlanShow();
             this.ffff='';
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
    selfAddRow(){//自定义查询 添加操作
      this.selfCount++;
      this.selfModelrow = {
        id:0,
        attribute:'',
        operator:'',
        type:0,
        relation:'',
        atype:''
      },
      this.selfModelrow.id=this.selfCount;
      this.selfRows.push(this.selfModelrow);
    },
    selfDeleteRow(id){//自定义查询 删除操作
      let self = this.selfRows.indexOf(id);
      this.selfRows.splice(self,1);
    },
    attribute(self){//属性
      this.$set(self,'operator','');
      this.$set(self,'atype','');
      this.$set(self,'operator','');
      this.$set(self,'atype','');
      this.$api.post('/manage-platform/iapi/getCustomQueryConfig',{},
      r =>{
        if(r.success){
          this.selfNature = r.data;
        }
      })
    },
    attribute2(arr,val){

      for(var i in arr){
        if(arr[i].name==val.attribute){
            this.operator=arr[i].operator;
            val.type=arr[i].type;
        }
      }
    },
    attributeOperator(odj){//属性联动

      // console.log(arr);
      // console.log(val);
      // for(var i in arr){
      //   if(arr[i].name==val){
      //       this.selfType=arr[i].type
      //   }
      // }
      // console.log(this.selfType);
    },
    //----------------------------自定义查询end------------------------------

    //----------------------------代表码接口查询start------------------------------
    nation(){ //批量查询国籍
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationName = r.data;
         };
       })
    },
    baseNation(){
      if(this.cdt.continentsCodeEqual==undefined||this.cdt.continentsCodeEqual==''){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
         r => {
           if(r.success){
             this.selection = r.data;
           };
         })
      }
    },
    nationality(data){//基础查询国籍与洲二级联动
      this.$set(this.cdt,'nationalityEqual','');
      let arr=this.chauName;
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].code == data){
          that.selection=arr[i].countryList;
        }
      }
    },

    chau(){//调用洲
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.chauName = r.data;
         };
       })
    },
    idType(){//调用证件
      this.$api.post('/manage-platform/codeTable/queryDocCode',{},
       r =>{
         if(r.success){
           this.idName = r.data;
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
    //----------------------------代表码接口查询end------------------------------

    //----------------------------复用start-------------------------------------
    fn(){//显示项复用
      if(this.page==0){
        // this.basedQuery = this.checkList;
        this.basedTableData = this.tableData;
      }else if(this.page==1){
        // this.batchQuery = this.checkList;
        this.batchTableData = this.tableData;
      }else if(this.page==2){
        // this.selfQuery = this.checkList;
        this.selfTableData = this.tableData;
      }
    },
    // 表格分页初始化
    based(){
      this.tableData = [];
      this.totalResult = 0;
      this.totalPage = 1;
      this.currentPage = 1;
    },
    historyBased(){
      this.historyData = [];
      this.htotalResult = 0;
      this.htotalPage = 1;
      this.hcurrentPage = 1;
    },
    base(){
      this.page=0;
      // this.checkList = this.basedQuery;
      this.based();
      if(this.bigBase == 0){
        this.tableData = this.basedTableData;
      }else if(this.bigBase == 1){
        this.tableData = this.basedTableDataPnr;
      }

      if(this.tableData.length!=0){
        this.handleCurrentChange(this.currentPage)
      }
    },
    batch(){
      this.page=1;
      // this.checkList = this.batchQuery;
      this.based();
      if(this.bigBase == 0){
        this.tableData = this.batchTableData;
      }else if(this.bigBase == 1){
        this.tableData = this.batchTableDataPnr;
      }
      if(this.tableData.length!=0){
        this.handleCurrentChange(this.currentPage)
      }
    },
    self(){
      this.page=2;
      // this.checkList = this.selfQuery;
      this.based();
      if(this.bigBase == 0){
        this.tableData = this.selfTableData;
      }else if(this.bigBase == 1){
        this.tableData = this.selfTableDataPnr;
      }

      if(this.tableData.length!=0){
        this.handleCurrentChange(this.currentPage)
      }
    },
    //----------------------------复用end---------------------------------------


    //----------------------------调试start-------------------------------------
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
    details(i){//基础查询点击详情查看
      this.detailsDialogVisible = true;
      this.historyCdt.NATIONALITY = i.I_37CODE;
      this.historyCdt.PASSPORTNO = i.I_39;
      if(this.bigBase == 0){
        this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
        this.$api.post('/manage-platform/iapi/queryIapiInfo',{serial:i.I_SERIAL},
         r =>{
           if(r.success){
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
      }else if(this.bigBase == 1){
        this.getHistoryListPnr(this.hcurrentPage,this.hshowCount,this.historyCdt);
        this.$api.post('/manage-platform/pnr/queryPnrInfo',{serial:i.I_SERIAL},
         r =>{
           if(r.success){
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
      }

    },
    reviewDetail(){//详情里的查看详情信息

      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:0}})
         }else if(r.data == false){
           this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:1}})
         }
       })
    },
    reviewCallDetail(){//查看PNR预报警详情
      let cc={
        "event":this.pnrEve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',cc,
       r =>{
         if(r.data== true){
            this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:0,isZDGZ:1}})
         }else if(r.data == false){
           this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:1,isZDGZ:1}})
         }
       })
    },
    reset(){
      this.cdt={isBlurred:false};
      this.ssss='';
      this.getList(this.totalResult,this.currentPage,this.showCount,this.cdt);
      if(this.bigBase == 0){
        this.getList(this.totalResult,this.currentPage,this.showCount,this.cdt);
      }else if(this.bigBase == 1){
        this.getListPnr(this.totalResult,this.currentPage,this.showCount,this.cdt);
      }
    },
    batchReset(){
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
      if(this.bigBase == 0){
        this.batchQueryList(this.currentPage,this.showCount,this.rows);
      }else if(this.bigBase == 1){
        this.batchQueryListPnr(this.currentPage,this.showCount,this.rows);
      }
    },
    selfReset(){
      this.selfCdtList = {id:0,type:0,attribute:'',atype:''};
      this.selfRows=[{id:1,attribute:'',operator:'',type:0,relation:'',atype:''}];
      this.str = '';
      this.ffff='';
      if(this.bigBase == 0){
        this.selfQueryList(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      }else if(this.bigBase == 1){
        this.selfQueryListPnr(this.currentPage,this.showCount,this.selfCdt,this.dataSort);
      }
    },
    batchI(){
      if( this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
      this.uploadDialogVisible = true;
      console.log( this.$refs.upload)
    },
    submitUpload() {
      console.log(this.$refs.upload);
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
    dataChange(item){
      let s = item;
      s = s.replace(/-/g,"/");
      s = s.replace(/(\.\d+)?/g,"");
      return new Date(item);
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
       this.rows = response.data.cdtList;
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
   beforeUpload(file){
     console.log(file);
   },
   cl(i){
     this.str="";
   },
   clearTime(){
     console.log(this.selfCdtList.atype);
     if(this.selfCdtList.atype == null){
       this.selfCdtList.atype=''
     }
     console.log(this.selfCdtList.atype);
   },
   download(){
     console.log(this.$api.rootUrl+"/manage-platform/iapi/export/three");
     axios({
      method: 'post',
      // url: 'http://192.168.99.245:8080/manage-platform/iapi/export/three',
      url: this.$api.rootUrl+"/manage-platform/iapi/export/three",
      data: {
          "name": 'Fred',
          "cdtList":this.rows
      },
      responseType: 'blob'
      }).then(response => {
          this.downloadM(response)
      }).catch((error) => {

      });
   },
   downloadM (data) {
       if (!data) {
           return
       }
       let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
       let link = document.createElement('a')
       link.style.display = 'none'
       link.href = url
       link.setAttribute('download', 'template.xls')
       document.body.appendChild(link)
       link.click()
   },
   order(){
     this.$api.post('/manage-platform/iapi/getCustomQueryOrder',{},
     r =>{
       if(r.success){
         this.sortSet = r.data;
       }
     })
   }
   // detailgetlist(currentPage, showCount, r) {
   //   let p = {
   //     "currentPage": currentPage,
   //     "showCount": showCount,
   //     "pd": r
   //   };
   //   this.$api.post('/manage-platform/iapiUnscolicited/queryHistory', p,
   //     r => {
   //       console.log(r);
   //       this.detailstableData = r.data.pdList;
   //       this.TotalResult1 = r.data.totalResult;
   //     });
   //
   // },
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
.t-save{
  display: flex;
  justify-content: flex-end!important;
  width:100%;
}
.t-save button{
  font-size: 14px;
  height: 27px;
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #16A4FD;
  color: #fff;
  margin-top: 2px;
}
.middle-btn-g button {
  height: 32px;
  width: 107px;
  border: none;
  border-radius: 5px;
  background: none;
  /* background: linear-gradient( 360deg, rgb(58, 190, 243) 0%, rgb(34, 149, 251) 100%); */
  background-color: #009cff;
  color: #fff;
}
.pitchOn{
  /* background: linear-gradient( 360deg, rgb(8, 108, 148) 1%, rgb(0, 121, 228) 100%)!important; */
  background-color: #0c4a93!important;
}
.akUl {
  overflow-y: auto;
  overflow-x: scroll;
}

.akUl img {
  height: 15px;
  width: 21px;
  margin-right: 8px;
}

.ak-li {
  width: 3000px;
  height: 58px;
  align-items: center;
  /* padding: 0 30px; */
  /* line-height: 32px; */

}
.t-ak-li{
  margin-top: 6px;
  height: 45px!important;
}
.queryLeft{
  height: 107px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}
.queryRight{
  height:107px;

}
.expression-text{
  width: 15%!important;
}
</style>
<style media="screen">
  .t-save .el-select{
    width: 127px;
  }
 .plan .el-input{
   width:75%!important;
 }
 .el-table .caret-wrapper{
   width: 20px!important;
 }
 .cell{
   display: flex;
   justify-content: space-around;
 }
 .akUl .el-col-2{
   width: 25%;
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
 .hrtitle {
   height: 35px;
   line-height: 35px;
   border: none;
   color: #3F96F2;
   font-size: 16px;
   font-weight: bold;
   border-bottom: 1px solid #3F96F2;
 },
 .hrt {
   height: 35px;
   line-height: 35px;
   border: none;
   color: #3F96F2;
   font-size: 16px;
   font-weight: bold;
   border-top: 1px solid #3F96F2;
 }
 .mb-6 {
   line-height: 20px;
   margin-top: 10px;
 }
 .fileinput-button {
    width: 100px;
    height:39px;
    line-height: 39px;
    text-align: center;
    background-color: #34ADFE;
    color: #fff;
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: 4px;
}

.fileinput-button input{
    position:absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
    font-size: 200px;
}

</style>
