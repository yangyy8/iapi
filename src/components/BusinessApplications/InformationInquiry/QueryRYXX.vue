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
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
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
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">国籍：</span>
                  <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable clearable size="small"  class="input-input">
                    <el-option
                      v-for="item in selection"
                      :key="item.code"
                      :value="item.code"
                      :label="item.code+' - '+item.name"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件种类：</span>
                  <el-select placeholder="请选择" v-model="cdt.passporttypeEqual" filterable clearable @visible-change="idType"  size="small"  class="input-input">
                    <el-option
                      v-for="item in idName"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CODE+' - '+item.NAME"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">航班号：</span>
                  <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">姓名：</span>
                  <div class="input-input t-fuzzy t-flex">
                    <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                    <el-checkbox v-model="lazyQuery">模糊查询</el-checkbox>
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
                <!-- 展开收起项 -->
                <div class="" v-show="openList">
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">航班日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startFlightDepartdate"
                      type="date" size="small"
                      placeholder="开始日期"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endFlightDepartdate"
                       type="date" size="small"
                       placeholder="结束日期"
                       value-format="yyyyMMdd">
                   </el-date-picker>
                  </div>
                </el-col>

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
                  <span class="input-text ">预计起飞时间：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startDepartdate"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      value-format="yyyyMMdd HHmmss">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDepartdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       value-format="yyyyMMdd HHmmss">
                   </el-date-picker>
                  </div>
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
                  <span class="input-text">预计降落时间：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startArrivdate"
                      type="datetime" size="small"
                      placeholder="开始日期"
                      value-format="yyyyMMdd HHmmss">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endArrivdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       value-format="yyyyMMdd HHmmss">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">出入境：</span>
                  <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                    <el-option label="I - 入境" value="I"></el-option>
                    <el-option label="O - 出境" value="O"></el-option>
                    <el-option label="G - 过境" value="G"></el-option>
                    <el-option label="全部" value=""></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">最终预检结果：</span>
                  <el-select v-model="cdt.lastcheckresult" placeholder="请选择" filterable clearable size="small" class="input-input">
                    <el-option label="0Z - 允许登机" value="0Z"></el-option>
                    <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                    <el-option label="2Z - 再次核对" value="2Z"></el-option>
                    <el-option label="3Z - 数据错误" value="3Z"></el-option>
                  </el-select>
                </el-col>
                </div>
              </el-row>
              <!-- 保存方案 -->
              <div class="t-save">
                <el-select  filterable v-model="ssss"  @visible-change="savePlanShow" @change="planQuery" placeholder="方案选择" size="small" class="mr-15" filterable clearable>
                  <el-option
                    v-for="item in saveName"
                    :label="item+' - '+item"
                    :value="item"
                    :key="item"
                    >
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
              <!-- 提示，方案已存在 -->
              <!-- <el-dialog
                title="提示"
                :visible.sync="promptDialogVisible"
                width="30%">
                <span>方案名称已存在，请重新命名</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="promptDialogVisible = false">确 定</el-button>
                </span>
              </el-dialog> -->
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small" @click="getList(currentPage,showCount,cdt)">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>
          <div class="" v-show="page==1">
            <el-row type="flex" style="height:100%">
              <el-col :span="22" class="bd0">
                <div class="akcheck2top boder1">
                  <el-button type="primary" plain size="mini" @click="batchDialog = true">批量导入</el-button>
                  <el-button type="primary" plain size="mini">下载模板</el-button>
                  <el-button type="primary" plain size="mini" @click="addRow">添加</el-button>
                </div>
                <div class="akUl">
                  <el-row type="flex" class="ak-li boder1 t-ak-li" align="center">
                    <!-- <img src="../../../assets/img/hook.png" alt="">

                    <el-col :span="7" class="input-item mr-20">
                      <span class="input-text">处理结果：</span>
                      <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                        <el-option>
                        </el-option>
                      </el-select>
                    </el-col>
                    <span> +</span>
                    <el-col :sm="24" :md="12" :lg="6" class="input-item mr-15">
                      <span class="input-text">处理人：</span>
                      <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                    </el-col> -->
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">国籍：</span>
                      <el-select placeholder="请选择" v-model="cdtList.nationalityEqual" filterable clearable size="mini"  class="input-inp" @visible-change="nation">
                        <el-option
                          v-for="item in nationName"
                          :key="item.CODE"
                          :value="item.CODE"
                          :label="item.CODE+' - '+item.CNAME"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="cdtList.passportnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班号：</span>
                      <el-input placeholder="请输入内容" v-model="cdtList.fltnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">姓名：</span>
                      <el-input placeholder="请输入内容" v-model="cdtList.familyname" size="mini" class="input-inp"></el-input>
                      <!-- <span class="input-text">姓名：</span>
                      <div class="input-input t-fuzzy t-flex">
                        <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                        <el-checkbox v-model="lazyQuery">模糊查询</el-checkbox>
                      </div> -->

                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">性别：</span>
                      <el-select placeholder="请选择" v-model="cdtList.genderEqual" size="mini"  class="input-inp" filterable clearable>
                        <el-option label="M - 男" value="M"></el-option>
                        <el-option label="F - 女" value="F"></el-option>
                        <el-option label="U - 未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="cdtList.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp"
                        value-format="yyyyMMdd">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="cdtList.startFlightDepartdate"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="cdtList.cityfromEqual" filterable clearable @visible-change="takeOff" size="mini" class="input-inp">
                        <el-option
                        v-for="item in takeOffName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item" style="margin-left:10px">
                      <span class="input-text t-input-text">预计起飞时间：</span>
                      <el-date-picker
                      v-model="cdtList.startDepartdate"
                      type="datetime" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd HHmm">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="cdtList.citytoEqual" filterable clearable @visible-change="landing" size="mini" class="input-inp">
                        <el-option
                        v-for="item in landingName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item" style="margin-left:10px">
                      <span class="input-text t-input-text">预计降落时间：</span>
                      <el-date-picker
                      v-model="cdtList.endArrivdate"
                      type="datetime" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd HHmmss">
                    </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="2" class="input-item">
                      <!-- <el-button type="primary" plain size="mini" @click="addRow">添加</el-button> -->
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="ak-li boder1 t-ak-li" align="center"  v-for="i in rows" :key="i.version">
                    <!-- <img src="../../../assets/img/hook.png" alt="">

                    <el-col :span="7" class="input-item mr-20">
                      <span class="input-text">处理结果：</span>
                      <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                        <el-option>
                        </el-option>
                      </el-select>
                    </el-col>
                    <span> +</span>
                    <el-col :sm="24" :md="12" :lg="6" class="input-item mr-15">
                      <span class="input-text">处理人：</span>
                      <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                    </el-col> -->
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">国籍：</span>
                      <el-select placeholder="请选择" v-model="i.nationalityEqual" filterable clearable size="mini"  class="input-inp" @visible-change="nation">
                        <el-option
                          v-for="item in nationName"
                          :key="item.CODE"
                          :value="item.CODE"
                          :label="item.CODE+' - '+item.CNAME"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="i.passportnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班号：</span>
                      <el-input placeholder="请输入内容" v-model="i.fltnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">姓名：</span>
                      <el-input placeholder="请输入内容" v-model="i.familyname" size="mini" class="input-inp"></el-input>
                      <!-- <span class="input-text">姓名：</span>
                      <div class="input-input t-fuzzy t-flex">
                        <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                        <el-checkbox v-model="lazyQuery">模糊查询</el-checkbox>
                      </div> -->

                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">性别：</span>
                      <el-select placeholder="请选择" v-model="i.genderEqual" size="mini" filterable clearable class="input-inp">
                        <el-option label="M - 男" value="M"></el-option>
                        <el-option label="F - 女" value="F"></el-option>
                        <el-option label="U - 未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="i.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp"
                        value-format="yyyyMMdd">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="i.startFlightDepartdate"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="i.cityfromEqual" filterable clearable @visible-change="takeOff" size="mini" class="input-inp">
                        <el-option
                        v-for="item in takeOffName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item" style="margin-left:10px">
                      <span class="input-text t-input-text">预计起飞时间：</span>
                      <el-date-picker
                      v-model="i.startDepartdate"
                      type="datetime" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd HHmmss">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="i.citytoEqual" filterable clearable @visible-change="landing" size="mini" class="input-inp">
                        <el-option
                        v-for="item in landingName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item" style="margin-left:10px">
                      <span class="input-text t-input-text">预计降落时间：</span>
                      <el-date-picker
                      v-model="i.endArrivdate"
                      type="datetime" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyyMMdd HHmmss">
                    </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="2" class="input-item">
                      <el-button type="warning" plain size="mini" @click="deleteRow(i)">删除</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="2" class="down-btn-area">
                <el-button type="success" class="mb-15" size="small" @click="batchQueryList(currentPage,showCount,rows)">查询</el-button>
                <el-button type="primary" plain size="small">重置</el-button>
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
                <!-- 方案名称提示语（已存在） -->
                <!-- <el-dialog
                  title="提示"
                  :visible.sync="batchPromptDialogVisible"
                  width="30%">
                  <span>方案名称已存在，请重新命名</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="batchPromptDialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog> -->
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
                 <!-- <div class="queryLeftWrapper"> -->
                   <el-col :sm="24" :lg="14" class="queryLeft">
                     <el-row type="flex" align="center" :gutter="10" style="width:100%">
                       <el-col :sm="24" :md="12" :lg="6" class="input-item">
                         <span class="input-text">属性：</span>
                         <el-select placeholder="请选择" v-model="selfCdtList.attribute" filterable clearable @visible-change="attribute" @change="attributeOperator(selfCdtList)" size="mini">
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
                         value-format="yyyyMMdd">
                        </el-date-picker>
                       <!-- 日期 精确到秒 -->
                         <el-date-picker
                         v-model="selfCdtList.atype"
                         v-show="selfCdtList.type==4"
                         type="datetime" size="mini"
                         placeholder="选择日期"
                         class="t-width100"
                         value-format="yyyyMMdd HHmmss">
                        </el-date-picker>

                       </el-col>
                     </el-row>

                     <el-row type="flex" align="center" :gutter="10" style="width:100%" v-for="self in selfRows">
                      <el-col :sm="24" :md="12" :lg="6" class="input-item">
                        <span class="input-text">属性：</span>
                        <el-select placeholder="请选择" v-model="self.attribute" @visible-change="attribute" @change="attributeOperator(selfNature)" filterable clearable size="mini">
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
                        type="date" size="mini"
                        placeholder="选择日期"

                        class="t-width100"
                        value-format="yyyyMMdd">
                       </el-date-picker>
                      <!-- 日期 精确到秒 -->
                        <el-date-picker
                        v-model="self.atype"
                        v-show="self.type==4"
                        type="datetime" size="mini"
                        placeholder="选择日期"
                        class="t-width100"
                        value-format="yyyyMMdd HHmmss">
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
                       <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable clearable size="mini">
                         <el-option
                           v-for="item in selection"
                           :key="item.code"
                           :value="item.code"
                           :label="item.code+' - '+item.name"
                         ></el-option>
                       </el-select>
                     </el-col>
                     </el-row>
                   </el-col>
                 <!-- </div> -->

                  <!-- 右边表达式 -->
                  <el-col :lg="10" class="queryRight">
                    <!-- <el-row type="flex" align="center" :gutter="10" style="width:100%">
                      <el-button type="primary" plain size="mini" @click="join" class="selfAdd">生成表达式</el-button>
                    </el-row> -->
                    <el-row type="flex" align="center" :gutter="10" style="width:100%">
                      <span class="input-text expression-text">表达式：</span>
                      <el-input type="textarea" class="expression" v-model="aaa"></el-input>
                    </el-row>
                  </el-col>
              </el-row>
              <el-row type="flex" style="margin-top:15px">
                  <!-- 保存方案 -->
                  <div class="t-save">
                    <el-select  filterable v-model="ffff"  @visible-change="selfSavePlanShow" @change="selfPlanQuery" placeholder="方案选择" size="small" class="mr-15">
                      <el-option
                        v-for="item in selfSaveName"
                        :label="item"
                        :value="item"
                        :key="item"
                        >
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

                  <!-- <el-dialog
                    title="提示"
                    :visible.sync="selfPromptDialogVisible"
                    width="30%">
                    <span>方案名称已存在，请重新命名</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="selfPromptDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog> -->
                    <!-- </el-col> -->
                    </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small" @click="selfQueryList(currentPage,showCount,selfCdt.AAAAA)">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="middle-btn-g">
        <button type="button" name="button" class="mr-15">IAPI数据</button>
        <button type="button" name="button">PNR数据</button>
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
          <el-col :span="6">姓名：{{dform.CNAME}}</el-col>
          <el-col :span="6">性别：{{dform.GENDERNAME=="F"?"男":dform.GENDER=="F"?"女":"未知"}}</el-col>
          <el-col :span="6">出生日期：{{dform.BIRTHDAYSTR}}</el-col>
          <el-col :span="6">国籍：{{dform.NATIONALITYNAME}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6">证件号码：{{dform.PASSPORTNO}}</el-col>
          <el-col :span="6">出入境类型：{{dform.FLIGHTINOUT}}</el-col>
          <el-col :span="6">出生国：{{dform.BIRTHCOUNTRYNAME}}</el-col>
          <el-col :span="6">居住国：{{dform.RESIDENCENAME}}</el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6">护照有效期：{{dform.PASSPORTEXPIREDATESTR}}</el-col>
          <el-col :span="6">护照颁发国：{{dform.PASSPORTISSUECOUNTRYNAME}}</el-col>
          <el-col :span="6">护照签发期：{{dform.PASSPORTISSUEDATESTR}}</el-col>
        </el-row>
        <div class="hrtitle">航班信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">航班号：{{dform.FLTNO}}</el-col>
          <el-col :span="8">航班日期：{{dform.FLIGHTDATESTR}}</el-col>
          <el-col :span="8">起飞机场：{{dform.CITYFROMNAME}}</el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">预计起飞时间：{{dform.DEPARTDATESTR}}</el-col>
          <el-col :span="8">到达机场：{{dform.CITYTONAME}}</el-col>
          <el-col :span="8">预计到达时间：{{dform.ARRIVDATESTR}}</el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">原预检结果：{{dform.CHECKRESULTNAME}}</el-col>
          <el-col :span="8">最终预检结果：{{dform.LASTCHECKRESULTSTR}}</el-col>
          <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">航班状态：{{dform.FLIGHTSTATUSSTR==0?"取消":"起飞"}}</el-col>
          <el-col :span="8">登机/航班取消时间：{{dform.LASTUPDATETIMESTR}}</el-col>
          <el-col :span="8">口岸：{{dform.PORTSTR}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">备降口岸：{{dform.CHANGEPORTSTR}}</el-col>
          <el-col :span="8">航空公司联系电话：{{dform.AIRLINEPHONESTR}}</el-col>
        </el-row>
        <div class="hrtitle">其他信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">航空公司传真：{{dform.AIRLINEFAX}}</el-col>
          <el-col :span="8">航信发送报文时间：{{dform.GAPP_RECEIVETIMESTR}}</el-col>
          <el-col :span="8">航信接受报文时间：{{dform.GAPP_SENDTIMESTR}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="9">流水号：{{dform.TID}}</el-col>
          <el-col :span="8">ICS记录编号：{{dform.RECORDLOCATER}}</el-col>
          <el-col :span="7">旅客中间名：{{dform.MIDDLENAME}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">旅客类型：{{dform.PASSENGERTYPESTR=="FL"?"普通旅客":"中转旅客"}}</el-col>
          <el-col :span="8">旅客值机方式：{{dform.VIDSTR}}</el-col>
          <el-col :span="8">旅客状态：{{dform.PASSENGERSTATUSSTR==0?"已值机":dform.PASSENGERSTATUS==1?"已登机":"未登机"}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">是否报警：{{dform.ISEVENT}}</el-col>
          <el-col :span="8">ABO唯一标识：{{dform.ABONO}}</el-col>
          <el-col :span="8">其他证件号码：{{dform.OTHER_NO}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">其他证件有效期：{{dform.OTHER_EXPIREDATESTR}}</el-col>
          <el-col :span="8">其他证件颁发国：{{dform.OTHER_ISSUECOUNTRYSTR}}</el-col>
          <el-col :span="8">其他证件签发日期：{{dform.OTHERDOCUMENTISSUEDATESTR}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">签证号码：{{dform.VISANO}}</el-col>
          <el-col :span="8">签证有效期：{{dform.VISAEXPIREDATESTR}}</el-col>
          <el-col :span="8">签证国家：{{dform.VISAISSUECOUNTRYSTR}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">签证签发日期：{{dform.VISAISSUEDATESTR}}</el-col>
          <el-col :span="8">起飞城市：{{dform.ORIGINSTR}}</el-col>
          <el-col :span="8">目的地地址：{{dform.DESTADDRESS}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">目的地城市：{{dform.DESTCITY}}</el-col>
          <el-col :span="8">目的的所在省：{{dform.DESTSTATEC}}</el-col>
          <el-col :span="8">目的地国家：{{dform.DESTCOUNTRYSTR}}</el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8">目的地邮编：{{dform.DESTPOSTALCODE}}</el-col>
          <el-col :span="8">边检接收时间：{{dform.IAPI_RECEIVETIMESTR}}</el-col>
          <el-col :span="8">边检回复时间：{{dform.IAPI_RESPONSETIMESTR}}</el-col>
        </el-row>
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">属性名：{{check.FIELDNAME}}</el-col>
            <el-col :span="6">属性值：{{check.FIELDVALUES}}</el-col>
            <el-col :span="6">是否必填：{{check.INPUT}}</el-col>
            <el-col :span="6">最小长度：{{check.MINLENGTH}}</el-col>
          </el-row>

          <el-row type="flex"  class="mb-6">
            <el-col :span="6">最大长度：{{check.MAXLENGTH}}</el-col>
            <el-col :span="6">正则表达式：{{check.REGULAR}}</el-col>
            <el-col :span="12">错误描述：{{check.DETAIL}}</el-col>
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
            <el-col :span="6">规则名称：{{rules.MATCHRRULE}}</el-col>
            <el-col :span="6">返回状态：{{rules.STATUS}}</el-col>
            <el-col :span="12">错误详情：{{rules.CHECKREMARK}}</el-col>
          </el-row>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>

      </div>

    </el-dialog>

    <el-dialog title="查看信息" :visible.sync="reviewDialogTable">
      <el-table :data="historyData">
        <el-table-column
          prop="I_NAME"
          label="姓名"
          sortable
          width="100"
          v-if="checkList.indexOf(checkItem[0].ITEMNAME)>-1"
          >
        </el-table-column>
        <el-table-column
          prop="I_34"
          label="性别"
          sortable
          v-if="checkList.indexOf(checkItem[1].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_76"
          label="出生日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[2].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_37"
          label="国籍"
          sortable
          v-if="checkList.indexOf(checkItem[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_39"
          label="证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_12"
          label="航班号"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="filghtDate"
          label="航班日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_13"
          label="出入境"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_65"
          label="值机状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_74"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[9].ITEMNAME)>-1">
        </el-table-column>

        <el-table-column
          prop="I_16"
          label="到达机场"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_75"
          label="预计降落时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[11].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_59"
          label="原预检结果"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_10"
          label="航空公司联系电话"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_45"
          label="其他证件颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_46"
          label="其他证件签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_48"
          label="签证号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_49"
          label="签证有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="E_EVENTSERIAL"
          label="是否报警"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_40"
          label="护照有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_42"
          label="护照签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[20].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_27"
          label="ABO唯一标识"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[21].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_43"
          label="其他证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[22].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_44"
          label="其他证件有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[23].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_63"
          label="边检回复时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[24].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_64"
          label="航班状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[25].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_41"
          label="护照颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[26].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_73"
          label="座位号"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[27].ITEMNAME)>-1">
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
    </el-dialog>

    <el-dialog title="批量导入" :visible.sync="batchDialog">
        <el-row type="flex" justify="center" :gutter="10">
          <el-col :span="15" class="input-item">
            <span class="input-text">文件名称：</span>
            <el-input v-model="fileName"></el-input>
          </el-col>
          <el-col :span="5">
            <span class="fileinput-button">
                <span>选择文件</span>
                <input type="file" id="myfile" @change="choose($event)">
            </span>
          </el-col>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchImport($event)">导 入</el-button>
        <el-button type="primary" @click="batchDialog = false">取 消</el-button>
      </span>

    </el-dialog>


    <div class="middle">
      <el-button  plain class="table-btn mb-9" size="small">显示窗位图</el-button>
      <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({name:'QueryGLRY'})">关联人员查询</el-button>
      <el-button  plain class="table-btn mb-9" size="small">导出列表信息</el-button>
      <el-button  plain class="table-btn mb-9" size="small">打印</el-button>
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        style="width: 100%;"
        highlight-current-row
        @row-click="checkRow"
        @cell-click="getMore"
        >
        <el-table-column
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
          prop="I_34"
          label="性别"
          sortable
          v-if="checkList.indexOf(checkItem[1].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_76"
          label="出生日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[2].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_37"
          label="国籍"
          sortable
          v-if="checkList.indexOf(checkItem[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_39"
          label="证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_12"
          label="航班号"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="filghtDate"
          label="航班日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_13"
          label="出入境"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_65"
          label="值机状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_74"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[9].ITEMNAME)>-1">
        </el-table-column>

        <el-table-column
          prop="I_16"
          label="到达机场"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_75"
          label="预计降落时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[11].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_59"
          label="原预检结果"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_10"
          label="航空公司联系电话"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_45"
          label="其他证件颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_46"
          label="其他证件签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_48"
          label="签证号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_49"
          label="签证有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="E_EVENTSERIAL"
          label="是否报警"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_40"
          label="护照有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_42"
          label="护照签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[20].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_27"
          label="ABO唯一标识"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[21].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_43"
          label="其他证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[22].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_44"
          label="其他证件有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[23].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_63"
          label="边检回复时间"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[24].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_64"
          label="航班状态"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[25].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_41"
          label="护照颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[26].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_73"
          label="座位号"
          width="130"
          sortable
          v-if="checkList.indexOf(checkItem[27].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="details(scope.row.I_SERIAL)">详情</el-button>
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
          :current-page.sync = "cp"
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
export default {
  data() {
    return {
      dialogVisible: false,//基础查询写入方案名称
      batchDialogVisible:false,//批量查询写入方案名称
      selfDialogVisible:false,//自定义查询写入方案名称
      detailsDialogVisible:false,//查看详情模态框
      reviewDialogTable:false,//查看历次信息模态框

      openList:true,
      openCheckbox:true,
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数

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
      rows:[
        {
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
      selfCount:0,
      basedQuery:['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      batchQuery:['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      selfQuery:['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      checkList: ['I_NAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_13','I_65','I_59'],
      checkItem:[
        {
          ITEMNAME:'I_NAME',
          LABEL:'姓名',
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
          LABEL:'国籍',
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
          ITEMNAME:'I_13',
          LABEL:'出入境',
        },
        {
          ITEMNAME:'I_65',
          LABEL:'值机状态',
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
          ITEMNAME:'I_59',
          LABEL:'原预检结果',
        },
        {
          ITEMNAME:'I_10',
          LABEL:'航空公司联系电话',
        },
        {
          ITEMNAME:'I_45',
          LABEL:'其他证件颁发国家',
        },
        {
          ITEMNAME:'I_46',
          LABEL:'其他证件签发日期',
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
          ITEMNAME:'E_EVENTSERIAL',
          LABEL:'是否报警',
        },
        {
          ITEMNAME:'I_40',
          LABEL:'护照有效期',
        },
        {
          ITEMNAME:'I_42',
          LABEL:'护照签发日期',
        },
        {
          ITEMNAME:'I_27',
          LABEL:'ABO唯一标识',
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
          ITEMNAME:'I_63',
          LABEL:'边检回复时间',
        },
        {
          ITEMNAME:'I_64',
          LABEL:'航班状态',
        },
        {
          ITEMNAME:'I_41',
          LABEL:'护照颁发国家',
        },
        {
          ITEMNAME:'I_73',
          LABEL:'座位号',
        }
      ],
      value: 1,
      value6:'',
      chauName:[],
      selection:[],
      nationName:[],
      detailstableData: [],//详情里面的列表
      xingq: "无",
      idName:[],
      saveName:[],//基础查询方案保存
      batchSaveName:[],//批量查询方案保存
      selfSaveName:[],//自定义查询方案保存
      takeOffName:[],
      landingName:[],
      nationalityName:[],
      cdt:{
        flighttypeEqual:''
      },
      historyCdt:{
        "nationalityEqual":'',
        "passportnoEqual":''
      },
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
      historyData:[],
      showConfiglist:[],//展示项数组
      selfCdt:{AAAAA:''},//自定义查询表达式信息
      lazyQuery:'',//模糊查询
      selfType:0,
      file:''
    }
  },
  mounted(){
    console.log(this.selfRows.length);
    this.currentPage = 1;
    this.getList(this.currentPage,this.showCount,this.cdt);
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
  methods: {
    //----------------------------分页start------------------------------
    pageSizeChange(val) {//显示条数，调用
      // let cdtArr = [];
      // cdtArr.push(this.cdtList);
      // let cdtList = cdtArr.concat(this.rows);
      if(this.page==0){
        this.getList(this.currentPage,val,this.cdt);
      }else if(this.page==1){
        this.batchQueryList(this.currentPage,val,this.rows);
      }else if(this.page==2){
        this.selfQueryList(this.currentPage,val,this.selfCdt);
      }


      // console.log(`每页 ${val} 条`);
    },
    hpageSizeChange(val){
        this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    handleCurrentChange(val) {//显示当前页，调用
      // let cdtArr = [];
      // cdtArr.push(this.cdtList);
      // let cdtList = cdtArr.concat(this.rows);
      if(this.page==0){
        this.getList(val,this.showCount,this.cdt);
      }else if(this.page==1){
        this.batchQueryList(val,this.showCount,this.rows);
      }else if(this.page==2){
        this.selfQueryList(val,this.showCount,this.selfCdt);
      }

      // console.log(`当前页: ${val}`);
    },
    hhandleCurrentChange(val){
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    //----------------------------分页end------------------------------
    checkRow(row,event){//列表单选操作
      // console.log(row,event)
      this.radio=row.I_SERIAL
    },
    //----------------------------基础查询start------------------------------
    getList(currentPage,showCount,cdt){//基础查询 查询调用
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt
      };
      this.$api.post('/manage-platform/iapi/queryListPage',p,
       r => {
         this.based();
         this.tableData=r.data.resultList;//表格数据
         this.totalResult=r.data.totalResult;//总条数
         this.totalPage = r.data.totalPage;//总页数
         this.currentPage = r.data.currentPage;
      })
    },
    getHistoryList(hcurrentPage,hshowCount,historyCdt){
      let gh = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"cdt":historyCdt
      }
      this.$api.post('/manage-platform/iapi/queryIapiHistory',gh,
      r =>{
        this.historyData = r.data.resultList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    planSave(){//基础查询 方案保存是否重名
      if(this.sss==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let t = {
        name : this.sss,
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/isExistName',t,
        r =>{
          if(r.success){
            if(r.data == false){
                console.log(1111);
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
        let s = {
        	"name": this.sss,
        	"page":  this.page,
        	"showConfigList": this.showConfiglist,
            //查询项
        	"config": this.cdt
        }
        this.$api.post('/manage-platform/queryShow/save',s,
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
            for(var i=0;i<arr.length;i++){
              if(arr[i].isCheck == '1'){
                arr1.push(arr[i].itemName);
              }
            }
            this.checkList = arr1;
            this.basedQuery = this.checkList;
          }
        })
    },
    //----------------------------批量查询start------------------------------
    batchQueryList(currentPage,showCount,rows){//批量查询列表

      let cdtArr = [];
      cdtArr.push(this.cdtList);
      let cdtList = cdtArr.concat(rows);
      let bql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":cdtList
      }
      this.$api.post('/manage-platform/iapi/queryIapiBatch',bql,
      r =>{
        if(r.success){
          this.based();
          this.tableData=r.data.resultList;//表格数据
          this.totalResult=r.data.totalResult;//总条数
          this.totalPage = r.data.totalPage;//总页数
          this.currentPage = r.data.currentPage;
        }
      })
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
      let cdtArr = [];
      cdtArr.push(this.cdtList);
      let configList = cdtArr.concat(this.rows);
      // this.rows.unshift(this.cdtList);//压进去第一行的数据
      let batchS = {
        "name" : this.ppp,
        "page" : this.page,
        "showConfigList":this.showConfiglist,
        "configList":configList
      }
      this.$api.post('/manage-platform/queryShow/save',batchS,
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
          let arrConfig = r.data.configList;
          for(var i=0;i<arrConfig.length;i++){
            this.cdtList = arrConfig[0];
          }
          this.rows = arrConfig.slice(1);
          //展示项渲染
          let arr = r.data.showConfigList;
          let arr1 = [];
          for(var i=0;i<arr.length;i++){
            if(arr[i].isCheck == '1'){
              arr1.push(arr[i].itemName);
            }
          }
          this.checkList = arr1;
          this.batchQuery = this.checkList;
        }
      })
    },


    addRow(){//批量查询 添加操作
      this.count++;
      this.modelrow.version=this.count;
      this.rows.push(this.modelrow);
      this.modelrow = this.cleanRow;
    },
    deleteRow(item){//批量查询 删除操作
      let i=this.rows.indexOf(item)
      this.rows.splice(i,1);
    },
    //----------------------------批量查询end------------------------------


    //----------------------------自定义查询start------------------------------
    selfQueryList(currentPage,showCount,selfCdt){//自定义查询列表
      this.currentPage = 1;
      console.log(selfCdt.AAAAA);
      let sql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":selfCdt.AAAAA
      }
      this.$api.post('/manage-platform/iapi/customIapiQuery',sql,
       r =>{
         if(r.success){
           this.based();
           this.tableData=r.data.resultList;//表格数据   (待定)
           this.totalResult=r.data.totalResult;//总条数
           this.totalPage = r.data.totalPage;//总页数
           this.currentPage = r.data.currentPage;
         }
       })
    },
    selfPlanSave(){//自定义 方案保存是否重名
      if(this.fff==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let self = {
        name : this.fff,
        page : this.page
      }
      this.$api.post('/manage-platform/queryShow/isExistName',self,
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
      let selfS = {
        "name" : this.fff,
        "page" : this.page,
        "showConfigList":this.showConfiglist,
        "config":this.selfCdt
      }
      this.$api.post('/manage-platform/queryShow/save',selfS,
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
          for(var i=0;i<arr.length;i++){
            if(arr[i].isCheck == '1'){
              arr1.push(arr[i].itemName);
            }
          }
          this.checkList = arr1;
          this.selfQuery = this.checkList;
          // this.showConfigList  = r.data.showConfigList;
        }
      })
    },
    selfAddRow(){//自定义查询 添加操作
      this.selfCount++;
      this.selfModelrow.id=this.selfCount;
      this.selfRows.push(this.selfModelrow);
      this.selfModelrow = this.selfCleanRow;
    },
    selfDeleteRow(id){//自定义查询 删除操作
      let self = this.selfRows.indexOf(id);
      this.selfRows.splice(self,1);
    },
    attribute(){//属性
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
    join(){//拼接表达式
      console.log(this.selfCdtList.attribute);
      let str = '';
      let arr = this.selfRows;
      let switchOperator = '';
      if(this.selfCdtList.operator=='等于'){
        switchOperator='='
      }else if(this.selfCdtList.operator=='小于'){
        switchOperator='<'
      }else if(this.selfCdtList.operator=='大于'){
        switchOperator='>'
      }
      if(this.selfCdtList.attribute==undefined){
        this.$message({
          message: '请填写属性1111！',
          type: 'success'
        });
        return false
      }else if(this.selfCdtList.operator==undefined){
        this.$message({
          message: '请填写比较逻辑1！',
          type: 'success'
        });
        return false
      }else if(this.selfCdtList.atype==undefined){
        this.$message({
          message: '请填写属性内容1！',
          type: 'success'
        });
        return false
      }else{
        str ='('+this.selfCdtList.attribute+switchOperator+this.selfCdtList.atype+')';
      }

      for(var i=0;i<arr.length;i++){
        if(arr[i].operator=='等于'){
          switchOperator='='
        }else if(arr[i].operator=='小于'){
          switchOperator='<'
        }else if(arr[i].operator=='大于'){
          switchOperator='>'
        }
        if(arr[i].attribute==''){
          this.$message({
            message: '请填写属性！',
            type: 'success'
          });
        }else if(arr[i].operator==''){
          this.$message({
            message: '请填写比较逻辑！',
            type: 'success'
          });
        }else if(arr[i].atype==''){
          this.$message({
            message: '请填写属性内容！',
            type: 'success'
          });
        }else if(arr[i].relation==''){
          this.$message({
            message: '请填写逻辑关系！',
            type: 'success'
          });
        }else{
          str += arr[i].relation+'('+arr[i].attribute+switchOperator+arr[i].atype+')';
        }
      };
      this.selfCdt.AAAAA=str;
      console.log(this.selfCdt.AAAAA);
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
    nationality(data){//基础查询国籍与洲二级联动
      this.xx(this.cdt.nationalityEqual)
      let arr=this.chauName;
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].code == data){
          // that.cdt.nationalityEqual = '';
          that.selection=arr[i].countryList;
        }
      }
    },
    xx(xx){
      xx=null;
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
        this.basedQuery = this.checkList;
        this.basedTableData = this.tableData;
      }else if(this.page==1){
        this.batchQuery = this.checkList;
        this.batchTableData = this.tableData;
      }else if(this.page==2){
        this.selfQuery = this.checkList;
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
    base(){
      this.page=0;
      this.checkList = this.basedQuery;
      // this.currentPage = 1;
      this.getList(this.currentPage,this.showCount,this.cdt);
    },
    batch(){
      this.page=1;
      this.checkList = this.batchQuery;
      // this.currentPage = 1;
      this.batchQueryList(this.currentPage,this.showCount,this.rows);
    },
    self(){
      this.page=2;
      this.checkList = this.selfQuery;
      // this.currentPage = 1;
      this.selfQueryList(this.currentPage,this.showCount,this.selfCdt);
    },
    //----------------------------复用end---------------------------------------


    //----------------------------调试start-------------------------------------
    // f(){
    //   let checkItem=this.checkItem;
    //   let that=this;
    //   var arr = this.checkList;
    //   for(var i in checkItem){
    //     let obj={isCheck:0}
    //     obj.itemName=checkItem[i].ITEMNAME;
    //     for(var j=0;j<arr.length;j++){
    //       if(arr[j]==checkItem[i].ITEMNAME){
    //         obj.isCheck=1;
    //       }
    //     }
    //     that.showConfiglist.push(obj);
    //   }
    // },
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
    details(serial){
      this.detailsDialogVisible = true;
      this.$api.post('/manage-platform/iapi/queryIapiInfo',{serial},
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
    },
    reviewDetail(){

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
    getMore(row,cell){
      console.log(row);
      if(cell.property =='I_NAME'){
        this.reviewDialogTable = true;
        this.historyCdt.nationalityEqual = row.I_37CODE;
        this.historyCdt.passportnoEqual = row.I_39;
        this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
      }
    },
    choose(event){
      console
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    batchImport(event){
      // event.preventDefault();//取消默认行为
      let formData = new FormData();
      formData.file = this.file;
      // formData.append("file", this.file);
      // let config = {
      //   headers: {
      //       'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
      //   }
      // };
      // let bi = {
        // "template":'three',
        // "excel":formData
      // }
      this.$api.post('/manage-platform/iapi/readExcel',formData,
       r =>{
         if(r.success){
           this.batchDialog = false;
           this.rows = r.data.feildAndValueList;
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
  background: linear-gradient( 360deg, rgb(9, 171, 236) 0%, rgb(0, 121, 228) 100%);
  color: #fff;
}

.akUl {
  height: 110px;
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
   width: 70%!important;
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
