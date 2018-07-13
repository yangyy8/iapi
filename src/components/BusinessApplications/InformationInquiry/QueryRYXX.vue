currentPage<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="based">
            基础查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;checkList = batchQuery;">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="page=2;checkList = selfQuery;">
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
                    <el-checkbox v-model="checked">模糊查询</el-checkbox>
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
                      placeholder="开始日期">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDateofbirth"
                       type="date" size="small"
                       placeholder="结束日期" clearable="false">
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
                      placeholder="开始日期">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endFlightDepartdate"
                       type="date" size="small"
                       placeholder="结束日期" clearable="false">
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
                      type="date" size="small"
                      placeholder="开始日期">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endDepartdate"
                       type="date" size="small"
                       placeholder="结束日期" clearable="false">
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
                      type="date" size="small"
                      placeholder="开始日期">
                    </el-date-picker>
                    <span class="septum">-</span>
                    <el-date-picker
                       v-model="cdt.endArrivdate"
                       type="date" size="small"
                       placeholder="结束日期" clearable="false">
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
                <el-select  filterable v-model="sss"  @visible-change="savePlanShow" placeholder="方案选择" size="small" class="mr-15">
                  <el-option
                    v-for="item in saveName"
                    :label="item"
                    :value="item"
                    >
                  </el-option>
                </el-select>
                <button type="button" name="button" @click="dialogVisible = true;sss=''">保存方案</button>
              </div>

              <el-dialog
                title="方案名称"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">

                <el-form  class="plan">
                  <el-form-item label="方案名称:" :label-width="formLabelWidth">
                    <el-input v-model="sss" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="planSave">保存</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="提示"
                :visible.sync="promptDialogVisible"
                width="30%">
                <span>方案名称已存在，请重新命名</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="promptDialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="提示"
                :visible.sync="successDialogVisible"
                width="30%">
                <span>保存成功</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="successDialogVisible = false">确 定</el-button>
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
                      <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini"  class="input-inp">
                        <el-option
                          v-for="item in selection"
                          :key="item.code"
                          :value="item.code"
                          :label="item.name"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="mini" class="input-inp" @change="f"></el-input>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班号：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">姓名：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.familyname" size="mini" class="input-inp"></el-input>
                      <!-- <span class="input-text">姓名：</span>
                      <div class="input-input t-fuzzy t-flex">
                        <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                        <el-checkbox v-model="checked">模糊查询</el-checkbox>
                      </div> -->

                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">性别：</span>
                      <el-select placeholder="请选择" v-model="cdt.genderEqual" size="mini"  class="input-inp">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                        <el-option label="未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="cdt.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="cdt.cityfromEqual" filterable @visible-change="takeOff" size="mini" class="input-inp">
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
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="cdt.citytoEqual" filterable @visible-change="landing" size="mini" class="input-inp">
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
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
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
                      <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable  size="mini"  class="input-inp">
                        <el-option
                          v-for="item in selection"
                          :key="item.code"
                          :value="item.code"
                          :label="item.name"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">证件号码：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="mini" class="input-inp" @change="f"></el-input>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班号：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="mini" class="input-inp"></el-input>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">姓名：</span>
                      <el-input placeholder="请输入内容" v-model="cdt.familyname" size="mini" class="input-inp"></el-input>
                      <!-- <span class="input-text">姓名：</span>
                      <div class="input-input t-fuzzy t-flex">
                        <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                        <el-checkbox v-model="checked">模糊查询</el-checkbox>
                      </div> -->

                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">性别：</span>
                      <el-select placeholder="请选择" v-model="cdt.genderEqual" size="mini"  class="input-inp">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                        <el-option label="未知" value="U"></el-option>
                      </el-select>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">出生日期：</span>
                        <el-date-picker
                        v-model="cdt.startDateofbirth"
                        type="date" size="mini"
                        placeholder="选择日期"
                        class="input-inp">
                      </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">航班日期：</span>
                      <el-date-picker
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">起飞机场：</span>
                      <el-select placeholder="请选择" v-model="cdt.cityfromEqual" filterable @visible-change="takeOff" size="mini" class="input-inp">
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
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
                    </el-date-picker>
                    </el-col>

                    <el-col :sm="24" :md="12" :lg="3" class="input-item">
                      <span class="input-text t-input-text">到达机场：</span>
                      <el-select placeholder="请选择" v-model="cdt.citytoEqual" filterable @visible-change="landing" size="mini" class="input-inp">
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
                      v-model="cdt.startDateofbirth"
                      type="date" size="mini"
                      placeholder="选择日期"
                      class="input-inp">
                    </el-date-picker>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="2" class="input-item">
                      <el-button type="warning" plain size="mini" @click="deleteRow(i)">删除</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="2" class="down-btn-area">
                <el-button type="success" class="mb-15" size="small">查询</el-button>
                <el-button type="primary" plain size="small">重置</el-button>
              </el-col>
            </el-row>
            <el-row type="flex" style="height:100%">
              <el-col :span="22" style="margin-top: 15px;">
                <!-- 保存方案 -->
                <div class="t-save">
                  <el-select  filterable v-model="sss"  @visible-change="savePlanShow" placeholder="方案选择" size="small" class="mr-15">
                    <el-option
                      v-for="item in saveName"
                      :label="item"
                      :value="item"
                      >
                    </el-option>
                  </el-select>
                  <button type="button" name="button" @click="dialogVisible = true;sss=''">保存方案</button>
                </div>

                <el-dialog
                  title="方案名称"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose">

                  <el-form  class="plan">
                    <el-form-item label="方案名称:" :label-width="formLabelWidth">
                      <el-input v-model="sss" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="planSave">保存</el-button>
                  </span>
                </el-dialog>

                <el-dialog
                  title="提示"
                  :visible.sync="promptDialogVisible"
                  width="30%">
                  <span>方案名称已存在，请重新命名</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="promptDialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>

                <el-dialog
                  title="提示"
                  :visible.sync="successDialogVisible"
                  width="30%">
                  <span>保存成功</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="successDialogVisible = false">确 定</el-button>
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
                      <el-input type="textarea" class="expression"></el-input>
                    </el-row>
                  </el-col>
              </el-row>
              <el-row type="flex" style="margin-top:15px">
                  <!-- 保存方案 -->
                  <div class="t-save">
                    <el-select  filterable v-model="sss"  @visible-change="savePlanShow" placeholder="方案选择" size="small" class="mr-15">
                      <el-option
                        v-for="item in saveName"
                        :label="item"
                        :value="item"
                        >
                      </el-option>
                    </el-select>
                    <button type="button" name="button" @click="dialogVisible = true;sss=''">保存方案</button>
                  </div>

                  <el-dialog
                    title="方案名称"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">

                    <el-form  class="plan">
                      <el-form-item label="方案名称:" :label-width="formLabelWidth">
                        <el-input v-model="sss" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="planSave">保存</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                    title="提示"
                    :visible.sync="promptDialogVisible"
                    width="30%">
                    <span>方案名称已存在，请重新命名</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="promptDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                    title="提示"
                    :visible.sync="successDialogVisible"
                    width="30%">
                    <span>保存成功</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="successDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>
                    <!-- </el-col> -->
                    </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
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
            共{{totalpage}}页
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
          :page-size="pageSize"
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
      dialogVisible: false,
      promptDialogVisible:false,
      successDialogVisible:false,
      openList:true,
      openCheckbox:true,
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:0,//每页显示的记录数
      totalResult:0,//总条数
      totalpage:1,//总页数
      page: 0,
      rows:[0],
      selfRows:[0],
      count:0,
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
      idName:[],
      saveName:[],
      takeOffName:[],
      landingName:[],
      nationalityName:[],
      cdt:{},
      item:{},
      sss:'',
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
      tableData: [{

      }],
      showConfiglist:[],
    }
  },
  mounted(){
    this.getList(this.currentPage,this.showCount,this.cdt);
  },
  methods: {
    handleCurrentChange(val) {
       this.currentRow = val;
       console.log(val);
     },
    pageSizeChange(val) {
      this.getList(this.currentPage,val,this.cdt);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.showCount,this.cdt);
      console.log(`当前页: ${val}`);
    },
    checkss(item){
      item.listCheck = !item.listCheck;
      console.log(item.listCheck)
    },
    checkRow(row,event){
      console.log(row,event)
      this.radio=row.I_SERIAL
    },
    getList(currentPage,showCount,cdt){
      let p={
      	"currentPage":this.currentPage,
      	"showCount":this.showCount,
      	"cdt":this.cdt
      };

      this.$api.post('/eamp/iapi/queryListpage',p,
       r => {

         this.tableData=r.data.resultList;//表格数据
         this.totalResult=r.data.totalResult;//总条数
         this.totalpage = r.data.totalpage;//总页数

      })
    },
    //方案保存
    planSave(){
      let t = {
        name : this.sss,
        page : this.page
      }
      this.$api.post('/eamp/queryShow/isExistName',t,
        r =>{
          // console.log(r);
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
    // 查询方案名称列表
    savePlanShow(){
      let sn = {
        page : this.page
      }
      this.$api.post('/eamp/queryShow/queryNameList',sn,
       r =>{
         console.log(r);
         if(r.success){
           this.saveName = r.data;
           console.log(this.saveName);
         }
       })
    },
    savePlan(){
       //定义一个数组，
       //声明一个对象，遍历存值，
       //比较，存值
       //展示项
        let checkItem=this.checkItem;
        let that=this;
        var arr = this.checkList;
        for(var i in checkItem){
          var obj={}
          obj.ITEMNAME=checkItem[i].ITEMNAME;
          for(var j=0;j<arr.length;j++){
            console.log(arr[j],checkItem[i].ITEMNAME)
            if(arr[j]==checkItem[i].ITEMNAME ){
              obj.ISCHECK=1;
            }else{
              obj.ISCHECK=0;
            }
          }
          that.showConfiglist.push(obj)
        }
      let s = {
      	"name": this.sss,
      	"page":  this.page,
      	"showConfiglist": this.showConfiglist,
          //查询项
      	"configMap": this.cdt
      }
      this.$api.post('/eamp/queryShow/save',s,
       r =>{
         console.log(r);
         console.log(s);
         if(r.success){
            this.successDialogVisible = true
         }
       })
    },
    nationality(data){
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
    chau(){
      this.$api.post('/eamp/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.chauName = r.data;
         };
       })
    },
    idType(){
      this.$api.post('/eamp/codeTable/queryDocCode',{},
       r =>{
         if(r.success){
           this.idName = r.data;
         }
       })
    },
    takeOff(){
      this.$api.post('/eamp/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){
      this.$api.post('/eamp/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.landingName = r.data;
         }
       })
    },
    addRow(){
      this.count++;
      this.rows.push(this.count);
    },
    selfAddRow(){
      this.selfCount++;
      this.selfRows.push(this.selfCount);
    },
    selfDeleteRow(id){
      let self = this.selfRows.indexOf(id);
      this.selfRows.splice(self,1);
    },
    deleteRow(id){
      let i=this.rows.indexOf(id);
      this.rows.splice(i,1);
    },
    based(){
      this.page = 0;
      this.checkList = this.basedQuery;
    },
    q(){
      // console.log(this.cdt);
    },
    f(){
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
    fn(){
      if(this.page==0){
        this.basedQuery = this.checkList;
      }else if(this.page==1){
        this.batchQuery = this.checkList;
      }else if(this.page==2){
        this.selfQuery = this.checkList;
      }
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
  },

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
