currentPage<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="based">
            基础查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;checkList = batchQuery;tableData = batchTableData">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="page=2;checkList = selfQuery;tableData = selfTableData">
            自定义查询
          </div>
        </div>
        <div class="ak-tab-pane" >
          <el-row type="flex" style="height:100%" v-show="page==0">
            <el-col :span="22" class="br flex-c pr-20">
              <div style="display:flex;justify-content: flex-end;width:100%;margin-bottom:15px">
                <el-button type="primary" plain name="button" @click="openList=!openList" size="mini">收起</el-button>
              </div>
              <el-row align="center" :gutter="2">
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">洲：</span>
                  <el-select placeholder="请选择" v-model="cdt.continentsCodeEqual" filterable @visible-change="chau" @change="nationality(cdt.continentsCodeEqual)" size="small"  class="input-input">
                    <el-option
                      v-for="item in chauName"
                      :key="item.code"
                      :value="item.code"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">国籍：</span>
                  <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="small"  class="input-input">
                    <el-option
                      v-for="item in selection"
                      :key="item.code"
                      :value="item.code"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件种类：</span>
                  <el-select placeholder="请选择" v-model="cdt.passporttypeEqual" filterable @visible-change="idType"  size="small"  class="input-input">
                    <el-option
                      v-for="item in idName"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.NAME"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input" @change="f"></el-input>
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
                  <el-select placeholder="请选择" v-model="cdt.genderEqual" size="small"  class="input-input">
                    <el-option label="男" value="M"></el-option>
                    <el-option label="女" value="F"></el-option>
                    <el-option label="未知" value="U"></el-option>
                  </el-select>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startDateofbirth"
                      type="date" size="small"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDateofbirth"
                       type="date" size="small"
                       placeholder="结束日期"
                       value-format="yyyy-MM-dd">
                   </el-date-picker>
                  </div>
                </el-col>
                <div class="" v-show="openList">


                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">航班日期：</span>
                  <div class="input-input t-flex t-date">
                      <el-date-picker
                      v-model="cdt.startFlightDepartdate"
                      type="date" size="small"
                      placeholder="开始日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endFlightDepartdate"
                       type="date" size="small"
                       placeholder="结束日期"
                       value-format="yyyy-MM-dd">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">起飞机场：</span>
                  <el-select placeholder="请选择" v-model="cdt.cityfromEqual" filterable @visible-change="takeOff" size="small" class="input-input">
                    <el-option
                    v-for="item in takeOffName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDepartdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       value-format="yyyy-MM-dd HH-mm">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">到达机场：</span>
                  <el-select placeholder="请选择" v-model="cdt.citytoEqual" filterable @visible-change="landing" size="small" class="input-input">
                    <el-option
                    v-for="item in landingName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endArrivdate"
                       type="datetime" size="small"
                       placeholder="结束日期"
                       value-format="yyyy-MM-dd HH-mm">
                   </el-date-picker>
                  </div>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">出入境：</span>
                  <el-select v-model="cdt.flighttypeEqual" placeholder="请选择"  size="small" class="input-input">
                    <el-option label="入境" value="I"></el-option>
                    <el-option label="出境" value="O"></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">最终预检结果：</span>
                  <el-select v-model="cdt.lastcheckresult" placeholder="请选择"  size="small" class="input-input">
                    <el-option label="允许登机" value="0Z"></el-option>
                    <el-option label="禁止登记" value="1Z"></el-option>
                    <el-option label="再次核对" value="2Z"></el-option>
                    <el-option label="数据错误" value="3Z"></el-option>
                  </el-select>
                </el-col>
                </div>
              </el-row>
              <!-- 保存方案 -->
              <div class="t-save">
                <el-select  filterable v-model="sss"  @visible-change="savePlanShow" @change="planQuery" placeholder="方案选择" size="small" class="mr-15">
                  <el-option
                    v-for="item in saveName"
                    :label="item"
                    :value="item"
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
              <el-dialog
                title="提示"
                :visible.sync="promptDialogVisible"
                width="30%">
                <span>方案名称已存在，请重新命名</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="promptDialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
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
                  <el-button type="primary" plain size="mini" >批量导入</el-button>
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
                      <el-select placeholder="请选择" v-model="cdtList.nationalityEqual" filterable  size="mini"  class="input-inp" @visible-change="nation">
                        <el-option
                          v-for="item in nationName"
                          :key="item.CODE"
                          :value="item.CODE"
                          :label="item.CNAME"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="cdtList.passportnoEqual" size="mini" class="input-inp" @change="f"></el-input>
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
                      <el-select placeholder="请选择" v-model="cdtList.genderEqual" size="mini"  class="input-inp">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                        <el-option label="未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="cdtList.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="cdtList.startFlightDepartdate"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="cdtList.cityfromEqual" filterable @visible-change="takeOff" size="mini" class="input-inp">
                        <el-option
                        v-for="item in takeOffName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="cdtList.citytoEqual" filterable @visible-change="landing" size="mini" class="input-inp">
                        <el-option
                        v-for="item in landingName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
                    </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="2" class="input-item">
                      <!-- <el-button type="primary" plain size="mini" @click="addRow">添加</el-button> -->
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="ak-li boder1 t-ak-li" align="center"  v-for="i in rows">
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
                      <el-select placeholder="请选择" v-model="i.nationalityEqual" filterable  size="mini"  class="input-inp" @visible-change="nation">
                        <el-option
                          v-for="item in nationName"
                          :key="item.CODE"
                          :value="item.CODE"
                          :label="item.CNAME"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="i.passportnoEqual" size="mini" class="input-inp" @change="f"></el-input>
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
                      <el-select placeholder="请选择" v-model="i.genderEqual" size="mini"  class="input-inp">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                        <el-option label="未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="i.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="i.startFlightDepartdate"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="i.cityfromEqual" filterable @visible-change="takeOff" size="mini" class="input-inp">
                        <el-option
                        v-for="item in takeOffName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="i.citytoEqual" filterable @visible-change="landing" size="mini" class="input-inp">
                        <el-option
                        v-for="item in landingName"
                        :key="item.AIRPORT_CODE"
                        :value="item.AIRPORT_CODE"
                        :label="item.AIRPORT_NAME">
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
                      value-format="yyyy-MM-dd HH-mm">
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
                  <el-select  filterable v-model="ppp"  @visible-change="batchSavePlanShow" @change="batchPlanQuery" placeholder="方案选择" size="small" class="mr-15">
                    <el-option
                      v-for="item in batchSaveName"
                      :label="item"
                      :value="item"
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
                <el-dialog
                  title="提示"
                  :visible.sync="batchPromptDialogVisible"
                  width="30%">
                  <span>方案名称已存在，请重新命名</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="batchPromptDialogVisible = false">确 定</el-button>
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
                 <!-- <div class="queryLeftWrapper"> -->
                   <el-col :sm="24" :lg="14" class="queryLeft">
                     <el-row type="flex" align="center" :gutter="10" style="width:100%">
                       <el-col :sm="24" :md="12" :lg="6" class="input-item">
                         <span class="input-text">属性：</span>
                         <el-select placeholder="请选择" v-model="selfCdtList.attribute" filterable @visible-change="attribute" @change="attributeOperator(selfCdtList.attribute)" size="mini">
                           <el-option
                             v-for="item in selfNature"
                             :key="item.name"
                             :value="item.name"
                             :label="item.name"
                           ></el-option>
                         </el-select>
                       </el-col>
                       <el-col :sm="24" :md="12" :lg="4" class="input-item">
                         <el-select placeholder="请选择" v-model="selfCdtList.operator" filterable  size="mini">
                           <el-option
                             v-for="item in operator"
                             :key="item"
                             :value="item"
                             :label="item"
                           ></el-option>
                         </el-select>
                       </el-col>
                       <el-col :sm="24" :md="12" :lg="4" class="input-item">
                         <el-input placeholder="请输入内容" v-model="selfCdtList.type" size="mini"></el-input>
                       </el-col>
                     </el-row>

                     <el-row type="flex" align="center" :gutter="10" style="width:100%" v-for="self in selfRows">
                      <el-col :sm="24" :md="12" :lg="6" class="input-item">
                        <span class="input-text">属性：</span>
                        <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini">
                          <el-option
                            v-for="item in selection"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="4" class="input-item">
                        <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini">
                          <el-option
                            v-for="item in selection"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="4" class="input-item">
                        <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="mini"></el-input>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="7" class="input-item">
                        <span class="input-text">逻辑关系：</span>
                        <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini" class="input-input" style="margin-left:10%">
                          <el-option
                            v-for="item in selection"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :sm="24" :md="12" :lg="2" class="selfButton">
                        <el-button type="warning" plain size="mini" @click="selfDeleteRow(self)">删除</el-button>
                      </el-col>

                     </el-row>
                     <el-row type="flex" justify="start" align="center" :gutter="10" style="width:100%">
                     <el-col :sm="24" :md="12" :lg="8" class="input-item">
                       <span class="input-text">数据排序：</span>
                       <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini">
                         <el-option
                           v-for="item in selection"
                           :key="item.code"
                           :value="item.code"
                           :label="item.name"
                         ></el-option>
                       </el-select>
                     </el-col>
                     </el-row>
                   </el-col>
                 <!-- </div> -->

                  <!-- 右边表达式 -->
                  <el-col :lg="10" class="queryRight">
                    <el-row type="flex" align="center" :gutter="10" style="width:100%">
                      <span class="input-text expression-text">表达式：</span>
                      <el-input type="textarea" class="expression" v-model="selfCdt.AAAAA"></el-input>
                    </el-row>
                  </el-col>
              </el-row>
              <el-row type="flex" style="margin-top:15px">
                  <!-- 保存方案 -->
                  <div class="t-save">
                    <el-select  filterable v-model="fff"  @visible-change="selfSavePlanShow" @change="selfPlanQuery" placeholder="方案选择" size="small" class="mr-15">
                      <el-option
                        v-for="item in selfSaveName"
                        :label="item"
                        :value="item"
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

                  <el-dialog
                    title="提示"
                    :visible.sync="selfPromptDialogVisible"
                    width="30%">
                    <span>方案名称已存在，请重新命名</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="selfPromptDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>
                    <!-- </el-col> -->
                    </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small" @click="selfQueryList(currentPage,showCount,selfCdt)">查询</el-button>
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
        <el-button style="float:right" type="primary" plain @click="openCheckbox = !openCheckbox" size="mini">收起</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkList" class="o-checkbox-g" @change="fn" v-show="openCheckbox">
         <el-checkbox v-for="item in checkItem" :label="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>

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
        >
        <el-table-column
           label="单选">
          <template scope="scope">
            <el-radio v-model="radio" class="radio" :label="scope.row.I_SERIAL">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="I_NAME"
          label="姓名"
          sortable
          v-if="checkList.indexOf(this.checkItem[0].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_34"
          label="性别"
          sortable
          v-if="checkList.indexOf(this.checkItem[1].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_76"
          label="出生日期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[2].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_37"
          label="国籍"
          sortable
          v-if="checkList.indexOf(this.checkItem[3].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_39"
          label="证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[4].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_12"
          label="航班号"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[5].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="filghtDate"
          label="航班日期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[6].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_13"
          label="出入境"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_65"
          label="值机状态"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[8].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_74"
          label="预计起飞时间"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[9].ITEMNAME)>-1">
        </el-table-column>

        <el-table-column
          prop="I_16"
          label="到达机场"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[10].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_75"
          label="预计降落时间"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[11].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_59"
          label="原预检结果"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[12].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_10"
          label="航空公司联系电话"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[13].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_45"
          label="其他证件颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[14].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_46"
          label="其他证件签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[15].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_48"
          label="签证号码"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[16].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_49"
          label="签证有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[17].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="E_EVENTSERIAL"
          label="是否报警"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[18].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_40"
          label="护照有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[19].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_42"
          label="护照签发日期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[20].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_27"
          label="ABO唯一标识"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[21].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_43"
          label="其他证件号码"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[22].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_44"
          label="其他证件有效期"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[23].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_63"
          label="边检回复时间"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[24].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_64"
          label="航班状态"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[25].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_41"
          label="护照颁发国家"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[26].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="I_73"
          label="座位号"
          width="130"
          sortable
          v-if="checkList.indexOf(this.checkItem[27].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="$router.push({name:'alarmProcess'})">详情</el-button>
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
export default {
  data() {
    return {
      dialogVisible: false,//基础查询写入方案名称
      batchDialogVisible:false,//批量查询写入方案名称
      selfDialogVisible:false,//自定义查询写入方案名称
      promptDialogVisible:false,//基础查询 提示Dialog
      batchPromptDialogVisible:false,//批量查询 提示Dialog
      selfPromptDialogVisible:false,//自定义查询 提示Dialog
      openList:true,
      openCheckbox:true,
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数
      page: 0,
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
      selfRows:[
        {

        }
      ],
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
      idName:[],
      saveName:[],//基础查询方案保存
      batchSaveName:[],//批量查询方案保存
      selfSaveName:[],//自定义查询方案保存
      takeOffName:[],
      landingName:[],
      nationalityName:[],
      cdt:{},
      cdtList:{version:0},//批量查询的第一行
      selfCdtList:{},//自定义查询的第一行
      selfNature:[],
      operator:[],
      item:{},
      sss:'',//基础查询
      ppp:'',//批量查询
      fff:'',//自定义查询
      aaa:'',
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
      showConfiglist:[],//展示项数组
      selfCdt:{},//自定义查询表达式信息
      lazyQuery:''//模糊查询
    }
  },
  mounted(){
    // let cdtArr = [];
    // cdtArr.push(this.cdtList);
    // let cdtList = cdtArr.concat(this.rows);
    // console.log(cdtList);
    if(this.page==0){
      this.getList(this.currentPage,this.showCount,this.cdt);
    }else if(this.page==1){
      this.batchQueryList(this.currentPage,this.showCount,this.rows);
    }else if(this.page==2){
      this.selfQueryList(this.currentPage,this.showCount,this.selfCdt);
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
      console.log(`每页 ${val} 条`);
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
      console.log(`当前页: ${val}`);
    },
    //----------------------------分页end------------------------------
    checkRow(row,event){//列表单选操作
      console.log(row,event)
      this.radio=row.I_SERIAL
    },
    //----------------------------基础查询start------------------------------
    getList(currentPage,showCount,cdt){//基础查询 查询调用
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt
      };
      this.$api.post('/eamp/iapi/queryListPage',p,
       r => {
         this.tableData=r.data.resultList;//表格数据
         this.totalResult=r.data.totalResult;//总条数
         this.totalPage = r.data.totalPage;//总页数
      })
    },
    planSave(){//基础查询 方案保存是否重名
      let t = {
        name : this.sss,
        page : this.page
      }
      this.$api.post('/eamp/queryShow/isExistName',t,
        r =>{
          if(r.success){
            if(r.data == false){
              this.$options.methods.savePlan.bind(this)();
              this.dialogVisible = false;
            }else{
              this.promptDialogVisible = true;
            }
          }
        })
    },
    savePlan(){//基础查询 保存方案
        this.$options.methods.showConfiglistArr.bind(this)();
        let s = {
        	"name": this.sss,
        	"page":  this.page,
        	"showConfiglist": this.showConfiglist,
            //查询项
        	"config": this.cdt
        }
        this.$api.post('/eamp/queryShow/save',s,
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
      this.$api.post('/eamp/queryShow/queryNameList',sn,
       r =>{
         console.log(r);
         if(r.success){
           this.saveName = r.data;
         }
       })
    },
    planQuery(){//基础查询 方案渲染
        console.log(this.sss);
        let pq = {
          page : this.page,
          name : this.sss
        }
        this.$api.post('/eamp/queryShow/queryConfigInfo',pq,
        r =>{
          console.log(r);
          if(r.success){
            this.cdt = r.data.config;
            this.showConfiglist = r.data.showConfigList;
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
      this.$api.post('/eamp/iapi/queryIapiBatch',bql,
      r =>{
        if(r.success){
          this.tableData=r.data.resultList;//表格数据
          this.totalResult=r.data.totalResult;//总条数
          this.totalPage = r.data.totalPage;//总页数
        }
      })
    },
    batchPlanSave(){//批量 方案保存是否重名
      let  batch = {
        name : this.ppp,
        page : this.page
      }
      this.$api.post('/eamp/queryShow/isExistName',batch,
       r =>{
         if(r.success){
           if(r.data == false){
             this.$options.methods.batchSavePlan.bind(this)();
             this.batchDialogVisible = false;
           }else{
             this.batchPromptDialogVisible = true;
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
      let checkItem=this.checkItem;
      let that=this;
      var arr = this.checkList;
      for(var i in checkItem){
        var obj={}
        obj.itemName=checkItem[i].ITEMNAME;
        for(var j=0;j<arr.length;j++){
          if(arr[j]==checkItem[i].ITEMNAME){
            obj.isCheck=1;
          }else{
            obj.isCheck=0;
          }
        }
          that.showConfiglist.push(obj)
      }
      console.log(this.showConfiglist);
    },

    batchSavePlan(){//批量查询 保存方案
      this.$options.methods.showConfiglistArr.bind(this)();//展示项数组
      // let cdtArr = [];
      // cdtArr.push(this.cdtList);
      // let configList = cdtArr.concat(this.rows);
      // this.rows.unshift(this.cdtList);//压进去第一行的数据
      let batchS = {
        "name" : this.ppp,
        "page" : this.page,
        "showConfiglist":this.showConfiglist,
        "configList":this.rows
      }
      this.$api.post('/eamp/queryShow/save',batchS,
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
      this.$api.post('/eamp/queryShow/queryNameList',bsp,
       r =>{
         console.log(r);
         if(r.success){
           this.batchSaveName = r.data;
         }
       })
    },

    batchPlanQuery(){//批量查询 方案渲染
      let bpq = {
        page : this.page,
        name : this.ppp
      }
      this.$api.post('/eamp/queryShow/queryConfigInfo',bpq,
      r =>{
        console.log(r);
        if(r.success){
          // let cdtArr = [];
          // cdtArr.push(this.cdtList);
          // let cdtList = cdtArr.concat(rows);
          this.rows = r.data.configList;
          this.showConfiglist = r.data.showConfigList;
        }
      })
    },


    addRow(){//批量查询 添加操作
      this.count++;
      this.modelrow.version=this.count;
      this.rows.push(this.modelrow);
    },
    deleteRow(item){//批量查询 删除操作
      let i=this.rows.indexOf(item)
      this.rows.splice(i,1);
    },
    //----------------------------批量查询end------------------------------


    //----------------------------自定义查询start------------------------------
    selfQueryList(currentPage,showCount,selfCdt){//自定义查询列表
      let sql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":selfCdt
      }
      this.$api.post('/eamp/iapi/customIapiQuery',sql,
       r =>{
         if(r.success){
           this.tableData=r.data.resultList;//表格数据   (待定)
           this.totalResult=r.data.totalResult;//总条数
           this.totalPage = r.data.totalPage;//总页数
         }
       })
    },
    selfPlanSave(){//自定义 方案保存是否重名
      let self = {
        name : this.fff,
        page : this.page
      }
      this.$api.post('/eamp/queryShow/isExistName',self,
       r =>{
         if(r.success){
           if(r.data == false){
             this.$options.methods.selfSavePlan.bind(this)();
             this.selfDialogVisible = false;
           }else{
             this.selfPromptDialogVisible = true;
           }
         }
       })
    },
    selfSavePlan(){//自定义查询 保存方案
      this.$options.methods.showConfiglistArr.bind(this)();//展示项数组
      let selfS = {
        "name" : this.ppp,
        "page" : this.page,
        "showConfiglist":this.showConfiglist,
        "config":this.selfCdt
      }
      this.$api.post('/eamp/queryShow/save',selfS,
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
      this.$api.post('/eamp/queryShow/queryNameList',ssp,
      r =>{
        console.log(r);
        if(r.success){
          this.selfSaveName = r.data;
        }
      })
    },

    selfPlanQuery(){//自定义查询 方案渲染
      let spq = {
        page : this.page,
        name : this.fff
      }
      this.$api.post('/eamp/queryShow/queryConfigInfo',spq,
      r =>{
        if(r.success){
          this.selfCdt = r.data.config;
          this.showConfigList  = r.data.showConfigList;
        }
      })
    },
    selfAddRow(){//自定义查询 添加操作
      this.selfCount++;
      this.selfRows.push(this.selfCount);
    },
    selfDeleteRow(id){//自定义查询 删除操作
      let self = this.selfRows.indexOf(id);
      this.selfRows.splice(self,1);
    },
    attribute(data){
      this.$api.post('/eamp/iapi/getCustomQueryConfig',{},
      r =>{
        if(r.success){
          this.selfNature = r.data;
        }
      })
    },
    attributeOperator(data){
      console.log(data);
    },
    //----------------------------自定义查询end------------------------------

    //----------------------------代表码接口查询start------------------------------
    nation(){ //批量查询国籍
      this.$api.post('/eamp/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationName = r.data;
         };
       })
    },
    nationality(data){//基础查询国籍与洲二级联动
      console.log("data:",data)
      let arr=this.chauName;
      console.log(arr)
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].code == data){
          that.selection=arr[i].countryList;
          console.log(that.selection)
        }
      }
    },
    chau(){//调用洲
      this.$api.post('/eamp/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.chauName = r.data;
         };
       })
    },
    idType(){//调用证件
      this.$api.post('/eamp/codeTable/queryDocCode',{},
       r =>{
         if(r.success){
           this.idName = r.data;
         }
       })
    },
    takeOff(){//调用起飞机场
      this.$api.post('/eamp/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){//调用降落机场
      this.$api.post('/eamp/codeTable/queryAirport',{},
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

    based(){
      this.page = 0;
      this.checkList = this.basedQuery;
      this.tableData = this.basedTableData;
    },
    //----------------------------复用end---------------------------------------


    //----------------------------调试start-------------------------------------
    f(){
      let checkItem=this.checkItem;
      let that=this;
      var arr = this.checkList;
      for(var i in checkItem){
        let obj={}
        obj.itemName=checkItem[i].ITEMNAME;
        for(var j=0;j<arr.length;j++){
          // console.log(obj);
          if(arr[j]==checkItem[i].ITEMNAME){
            obj.isCheck=1;
            console.log(obj);
          }else{
            obj.isCheck=0;
          }
        }
        that.showConfiglist.push(obj)
      }
      console.log(this.showConfiglist);
      // let queryItem = this.cdt;
      // let that=this;
      // for(var m in queryItem){
      //   var objQuery = {}
      //   objQuery.ITEMVALUE = queryItem[m];
      //   that.CONFIGLIST.push(objQuery);
      // }
      // console.log(this.CONFIGLIST);
      // console.log(this.cdt.passportnoEqual);
    },

      // let checkItem=this.checkItem;
      // let that=this;
      // var arr = this.checkList;
      // for(var i in checkItem){
      //   var obj={}
      //   obj.ITEMNAME=checkItem[i].ITEMNAME;
      //
      //   for(var j=0;j<arr.length;j++){
      //     console.log(arr[j],checkItem[i].ITEMNAME)
      //     if(arr[j]==checkItem[i].ITEMNAME ){
      //       obj.ISCHECK=1;
      //     }else{
      //       obj.ISCHECK=0;
      //     }
      //   }
      //   that.showConfiglist.push(obj)
      // }
      // console.log(this.showConfiglist);

    }
    // nationality(){
    //   this.$api.post('/eamp/codeTable/queryContinentsCountry',{},
    //    r => {
    //      console.log(r);
    //      if(r.success){
    //        this.nationalityName = r.data
    //      }
    //    })
    // }

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
</style>
