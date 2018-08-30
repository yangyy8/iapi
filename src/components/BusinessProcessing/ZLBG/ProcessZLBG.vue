<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <!-- <QueryNationality  :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality> -->
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nation"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
          </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
        <span class="input-text">证件种类：</span>
        <el-select v-model="pd.PASSPORTTYPE" placeholder="请选择"  filterable clearable size="small" class="input-input">
           <el-option value="T" label="T - 区域证件">
           </el-option>
           <el-option value="P" label="P - 护照">
           </el-option>

         </el-select>
      </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">姓名：</span>
                <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"   class="input-input"></el-input>
              &nbsp;<el-checkbox v-model="pd.ISBLURRED">模糊查询</el-checkbox>
            </div>
            </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择"  filterable clearable size="small" class="input-input">
                 <el-option value="U" label="U - 未知">
                 </el-option>
                 <el-option value="M" label="M - 男">
                 </el-option>
                 <el-option value="F" label="F - 女">
                 </el-option>
               </el-select>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
              <el-date-picker
              v-model="pd.STARTBIRTH"
              type="date" size="small" value-format="yyyyMMddHHmmss"
              placeholder="开始时间" >
            </el-date-picker>
               <span class="septum">-</span>
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="date" size="small" value-format="yyyyMMddHHmmss"
               placeholder="结束时间"  >
           </el-date-picker>
         </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO" class="input-input"></el-input>
              </el-col>
                <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text"><font color="red">*</font> 航班日期：</span>
                  <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                   v-model="pd.STARTTIME"
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    value-format="yyyyMMddHHmm"
                   placeholder="开始时间"  :picker-options="pickerOptions">
                 </el-date-picker>
                   <span class="septum">-</span>
                 <el-date-picker
                 v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                    v-model="pd.ENDTIME"
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                     value-format="yyyyMMddHHmm"
                    placeholder="结束时间" :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
              </el-col>

                <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text">反馈状态：</span>
                <el-select v-model="pd.CHECKRESULT" class="input-input"  filterable clearable placeholder="请选择"   size="small" >

                  <el-option value="0Z" label="0Z - 允许打印登机牌">
                  </el-option>
                  <el-option value="1Z" label="1Z - 禁止打印登机牌">
                  </el-option>
                  <el-option value="2Z" label="2Z - 请再次核对">
                  </el-option>
                  <el-option value="4Z" label="4Z - 数据错误">
                  </el-option>
                 </el-select>

              </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="info" size="small" @click="batchs">批量变更</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
         type="selection"
         width="40">
        </el-table-column>
                <el-table-column
                  prop="NATIONALITYC"
                  label="国籍" sortable
                >
                </el-table-column>
                <el-table-column
                  label="证件种类"
                  width="120"
                >
                <template slot-scope="scope">
                    {{scope.row.PASSPORTTYPE | fiftertype}}
                  </template>

                </el-table-column>
                <el-table-column
                  prop="PASSPORTNO"
                  label="证件号码" sortable
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="NAME"
                  label="姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="INTG_CHNNAME"
                  label="中文姓名"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  label="性别"
                >
                <template slot-scope="scope">
                  {{scope.row.GENDER | fiftersex}}
                </template>
                </el-table-column>
                <el-table-column
                  prop="DATEOFBIRTH"
                  label="出生日期" sortable
                  width="110"
                  >
                </el-table-column>
                <el-table-column
                  prop="FLTNO"
                  label="航班号" sortable
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="DEPARTDATE"
                  label="航班日期" sortable
                  width="120"
                  >
                </el-table-column>

                <el-table-column
                  label="值机状态"
                  width="120"
                  >
                  <template slot-scope="scope">
                    {{scope.row.PASSENGERSTATUS | fifterstate}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="反馈状态"
                  width="120"
                  >
                  <template slot-scope="scope">
                    {{scope.row.LASTCHECKRESULT | fiftecr}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作" width="180">
                  <template slot-scope="scope">
  <span v-if="scope.row.FLIGHTSTATUS==0 || scope.row.FLIGHTSTATUS==1 ">
  <el-button  size="mini" plain icon="el-icon-edit" :disabled="true">变更</el-button>
</span>
<span v-else>
    <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="handles(scope.row)">变更</el-button>
  </span>

                      <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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

    <el-dialog title="批量变更" :visible.sync="batchDialogVisible">
      <el-form :model="map" ref="batchmap">
        <el-row type="flex"  class="mb-6">
          <el-table
            :data="batchtableData"
            border
            style="width: 100%;">
                    <el-table-column
                      prop="NAME"
                      label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                      label="性别"
                      width="50"
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
                      prop="FLTNO"
                      label="航班号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="NATIONALITYC"
                      label="国籍" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      label="证件种类"
                    >
                    <template slot-scope="scope">
                        {{scope.row.PASSPORTTYPE | fiftertype}}
                      </template>

                    </el-table-column>
                    <el-table-column
                      prop="PASSPORTNO"
                      label="证件号码" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="LASTCHECKRESULT"
                      label="当前反馈状态"
                    >
                    </el-table-column>
                    <el-table-column
                      label="反馈状态说明"
                    >
                    <template slot-scope="scope">
                      {{scope.row.LASTCHECKRESULT | fiftecr}}
                    </template>
                    </el-table-column>
          </el-table>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更后反馈状态：</span>
            <el-select v-model="map.INSTRUCT"  placeholder="请选择"  filterable clearable   @change="inschange(map.INSTRUCT,1)"  size="small" style="width:80%">
              <el-option value="0Z" label="0Z - 允许打印登机牌">
              </el-option>
              <el-option value="1Z" label="1Z - 禁止打印登机牌">
              </el-option>
              <el-option value="2Z" label="2Z - 请再次核对">
              </el-option>
              <el-option value="4Z" label="4Z - 数据错误">
              </el-option>
             </el-select>
          </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更状态说明(FreeText)：</span>
            <el-input placeholder="请输入内容" size="small" v-model="map.INSTRUCTC" style="width:80%"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更描述：</span>
           <el-input type="textarea" placeholder="请输入变更描述(不能超过250字)" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" style="width:80%" v-model="map.CHANGERESON"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlessys(0)" size="small">变更</el-button>
        <el-button @click="batchDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>
    <el-dialog title="指令变更" :visible.sync="handlesDialogVisible" width="900px">
      <el-form :model="form" ref="handlesForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NAME" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">性别：</span>
              <el-input placeholder="请输入内容" size="small" v-model="form.GENDER=='U'?'未知':form.GENDER=='M'?'男':'女'" class="yy-input-input" :disabled="true"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">出生日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.DATEOFBIRTH"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">国籍：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITYC" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.PASSPORTNO" class="yy-input-input" :disabled="true"> </el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">签证号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INTG_VISANO" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">当前反馈状态：</span>
            <el-select v-model="form.LASTCHECKRESULT"  placeholder="请选择"    size="small" class="yy-input-input" :disabled="true">
              <el-option value="0Z" label="0Z - 允许打印登机牌">
              </el-option>
              <el-option value="1Z" label="1Z - 禁止打印登机牌">
              </el-option>
              <el-option value="2Z" label="2Z - 请再次核对">
              </el-option>
              <el-option value="4Z" label="4Z - 数据错误">
              </el-option>
             </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">反馈状态说明：</span>
            <el-input placeholder="" size="small"  v-model="form.LASTCHECKRESULTC" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更后反馈状态：</span>
            <el-select v-model="form.INSTRUCT"  placeholder="请选择"  filterable clearable  @change="inschange(form.INSTRUCT,0)"  size="small" style="width:82%">
              <span v-if="form.LASTCHECKRESULT!='0Z'">
              <el-option value="0Z" label="0Z - 允许打印登机牌">
              </el-option>
             </span>
              <span v-if="form.LASTCHECKRESULT!='1Z'">
              <el-option value="1Z" label="1Z - 禁止打印登机牌">
              </el-option>
            </span>
            <span v-if="form.LASTCHECKRESULT!='2Z'">
              <el-option value="2Z" label="2Z - 请再次核对">
              </el-option>
                </span>
              <span v-if="form.LASTCHECKRESULT!='4Z'">
              <el-option value="4Z" label="4Z - 数据错误">
              </el-option>
                </span>
             </el-select>
          </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更状态说明(FreeText)：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INSTRUCTC" style="width:82%"></el-input>
          </el-col>
        </el-row>


        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更描述：</span>
           <el-input type="textarea" v-model="form.CHANGERESON"   placeholder="请输入变更描述(不能超过250字)" maxlength="250"  :autosize="{ minRows: 3, maxRows: 6}" style="width:82%;" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlessys(1)" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>

      </div>

    </el-dialog>

    <el-dialog  title="操作授权" :visible.sync="AuthDialogVisible"  append-to-body width="500px">

      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
            <span class="yy-input-text">授权账号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="ap.APPROVALUSER" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input></el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
              <span class="yy-input-text">授权密码：</span>
              <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.APPROVALPW" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input></el-col>

      </el-row>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="Authorization(ap)" size="small">确认授权</el-button>
        <el-button @click="AuthDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>

  <el-dialog title="详情" :visible.sync="detailsDialogVisible" class="detailDialog">
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

        <div class="hrt">历史值机信息</div>
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
          >
          <template slot-scope="scope">
            {{scope.row.GENDER | fiftersex}}
          </template>
          </el-table-column>
          <el-table-column
            prop="DATEOFBIRTH"
            label="出生日期" sortable
            width="120"
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
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="FLTNO"
            label="航班号" sortable
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="SCHEDULEDEPARTURETIME"
            label="航班日期" sortable
            width="120"
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
            width="120"
            >
            <template slot-scope="scope">
              {{scope.row.STATUS | fifterbj}}
            </template>
          </el-table-column>

        </el-table>
        <div class="middle-foot">
          <div class="page-msg">
            <div class="">
              共{{Math.ceil(TotalResult1/pageSize1)}}页
            </div>
            <div class="">
              每页
              <el-select v-model="pageSize1" @change="pageSizeChange1(pageSize1)" placeholder="10" size="mini" class="page-select">
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
              共{{TotalResult1}}条
            </div>
          </div>
          <el-pagination
            background
            @current-change="handleCurrentChange1"
            :page-size="pageSize1"
            layout="prev, pager, next"
            :total="TotalResult1">
          </el-pagination>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import QueryNationality from '../../other/queryNationality'
import {
  formatDate
} from '@/assets/js/date.js'
import {
  dayGap
} from '@/assets/js/date.js'
export default {
  // components: {
  //   QueryNationality
  // },
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      CurrentPage1: 1,
      pageSize1: 10,
      TotalResult1: 0,
      ap: {},
      pd: {
        STARTTIME: '',
        ENDTIME: ''
      },
      tp: 0,
      nation: [],
      value: '',
      value1: "",

      isCheck: false,
      isName: false,
      isRules: false,
      isCall: false,

      handlesDialogVisible: false,
      detailsDialogVisible: false,
      batchDialogVisible: false,
      AuthDialogVisible: false,
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],

      tableData: [],
      batchtableData: [],
      detailstableData: [],
      multipleSelection: [],
      form: {},
      map: {},
      dform: {},
      rules: {},
      check: {},
      pickerOptions: {
        disabledDate: (time) => {
          if (this.pd.ENDTIME != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmm');
            return startT > this.pd.ENDTIME;
          } else if (this.pd.ENDTIME == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmm');
          return endT < this.pd.STARTTIME;
        }
      },

    }
  },
  mounted() {
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
    let time = new Date();
    let end = new Date();
    let begin = new Date(time - 1000 * 60 * 60 * 24 * 14);
    this.pd.STARTTIME = formatDate(begin, 'yyyyMMddhhmm');
    this.pd.ENDTIME = formatDate(end, 'yyyyMMddhhmm');
  },
  activated() {
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
    let time = new Date();
    let end = new Date();
    let begin = new Date(time - 1000 * 60 * 60 * 24 * 14);
    this.pd.STARTTIME = formatDate(begin, 'yyyyMMddhhmm');
    this.pd.ENDTIME = formatDate(end, 'yyyyMMddhhmm');
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    getNation(msg) {
      this.pd.NATIONALITY = msg;
    },
    batchs() {


      for (var i = 0; i < this.multipleSelection.length; i++) {
        // console.log("----"+i+"===="+this.multipleSelection[i].FLIGHTSTATUS);
        var s = this.multipleSelection[i].FLIGHTSTATUS;
        if (s == 0 || s == 1) {
          this.open("选择的第" + (i + 1) + "条数据是不能变更的，请重新选择！");
          return;
        }
      }

      if (this.multipleSelection.length == 0) {

        this.open("请选择列表内容！");
        return;

      }
      this.map = {};
      this.batchDialogVisible = true;
      this.batchtableData = this.multipleSelection
    },
    open(content) {

      this.$alert(content, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      });
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    pageSizeChange1(val) {
      this.detailgetlist(this.CurrentPage1, val, this.dform);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.detailgetlist(val, this.pageSize1, this.dform);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {

      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }

      if(dayGap(this.pd.STARTTIME,this.pd.ENDTIME,0)>14){
        this.$alert('查询时间间隔不能超过二周', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      this.pd.NAME = getreplace(this.pd.NAME);
      this.pd.PASSPORTNO = getreplace(this.pd.PASSPORTNO);
      this.pd.FLTNO = getreplace(this.pd.FLTNO);
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/iapiUnscolicited/search', p,
        r => {
          console.log(r);
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },
    handles(i) {
      this.handlesDialogVisible = true;
      i.LASTCHECKRESULTC = this.fiftezjsm(i.LASTCHECKRESULT);
      console.log(i);
      this.form = i;
    },
    handlessys(i) {
      this.AuthDialogVisible = true;
      this.ap = {};
      this.tp = i;
    },
    Authorization(ap) {

      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        // console.log(result)
        if (result.indexOf(false) > -1) {
          return
        } else {
          // alert('填写成功')
        }
      }

      if (this.tp == 0) {
        this.handlesItem("batchmap", ap);

      } else {
        this.handlesItem1("handlesForm", ap);
      }

    },
    handlesItem(formName, ap) {

      let IAPISERIAL = [];
      let arr = this.multipleSelection;

      for (var i in arr) {
        IAPISERIAL.push(arr[i].SERIAL)
      }

      let p = {
        "IAPISERIAL": IAPISERIAL,
        "CREATEUSER": "杨小",
        "APPROVALUSER": ap.APPROVALUSER,
        "APPROVALPW": ap.APPROVALPW,
        "INSTRUCT": this.map.INSTRUCT,
        "CHANGERESON": this.map.CHANGERESON
      };
      this.$api.post('/manage-platform/iapiUnscolicited/instructChangeTab', p,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '变更成功！',
              type: 'success'
            });
          } else {
            this.$message.error('变更失败');
          }
          this.$refs[formName].resetFields();
          this.batchDialogVisible = false;
          this.AuthDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        }, e => {
          this.$message.error('失败了');
        })
    },
    handlesItem1(formName, ap) {
      let p = {
        "IAPISERIAL": [this.form.SERIAL],
        "CREATEUSER": "杨小",
        "APPROVALUSER": ap.APPROVALUSER,

        "APPROVALPW": ap.APPROVALPW,
        "INSTRUCT": this.form.INSTRUCT,
        "CHANGERESON": this.form.CHANGERESON
      };
      this.$api.post('/manage-platform/iapiUnscolicited/instructChangeTab', p,
        r => {
          console.log(r);
          if (r.data.success) {
            this.$message({
              message: '变更成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.data.msg);
          }
          this.$refs[formName].resetFields();
          this.handlesDialogVisible = false;
          this.AuthDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.dform = i;
      this.detailgetlist(0, 10, this.dform);
      console.log(i);
      this.$api.post('/manage-platform/iapi/queryIapiInfo', {
          serial: i.SERIAL
        },
        r => {
          if (r.success) {
            this.dform = r.data.IAPI;
            if (r.data.hasOwnProperty('CHECKDATA') == false) {
              this.isCheck = false;
            } else {
              this.isCheck = true;
              this.check = r.data.CHECKDATA;
            }

            if (r.data.hasOwnProperty('RULELIST') == false) {
              this.isRules = false;
            } else {
              this.isRules = true;
              this.rules = r.data.RULELIST;
            }

            if (r.data.hasOwnProperty('EVENT') == false) {
              this.isName = false;
            } else {
              this.isName = true;
              this.eve = r.data.EVENT;
            }

            if (r.data.hasOwnProperty('PNREVENT') == false) {
              this.isCall = false;
            } else {
              this.isCall = true;
              this.pnrEve = r.data.PNREVENT;
            }
          }
        })

    },
    reviewDetail() { //详情里的查看详情信息

      let ss = {
        "event": this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle', ss,
        r => {
          if (r.data == true) {
            this.$router.push({
              name: 'alarmProcess',
              query: {
                eventserial: this.eve,
                type: 0
              }
            })
          } else if (r.data == false) {
            this.$router.push({
              name: 'alarmProcess',
              query: {
                eventserial: this.eve,
                type: 1
              }
            })
          }
        })
    },
    reviewCallDetail() { //查看PNR预报警详情
      let cc = {
        "event": this.pnrEve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle', cc,
        r => {
          if (r.data == true) {
            this.$router.push({
              name: 'alarmProcess',
              query: {
                eventserial: this.eve,
                type: 0,
                isZDGZ: 1
              }
            })
          } else if (r.data == false) {
            this.$router.push({
              name: 'alarmProcess',
              query: {
                eventserial: this.eve,
                type: 1,
                isZDGZ: 1
              }
            })
          }
        })
    },
    detailgetlist(currentPage, showCount, r) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": r
      };
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory', p,
        r => {
          console.log(r);
          this.detailstableData = r.data.pdList;
          this.TotalResult1 = r.data.totalResult;
        });

    },
    inschange(n, i) {
      var content = "";
      if (n == "0Z") {
        content = "OK TO BOARD";
      } else if (n == "1Z") {
        content = "NO BOARD";
      } else if (n == "2Z") {
        content = "CHECK AGAIN";
      } else if (n == "4Z") {
        content = "DATA ENTRY ERROR";
      }
      if (i == 0) {
        this.form.INSTRUCTC = content;
      } else {
        this.map.INSTRUCTC = content;
      }
    },
    fiftezjsm(val) {
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
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },

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
    fifterstate(val) {
      if (val == "0") {
        return "已值机，未登机";
      } else if (val == "1") {
        return "未值机 ，已登机";
      } else if (val == "2") {
        return "已值机，已登机";
      }else {
        return "已值机，未登机";
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
    fiftertype(val) {
      // if (val == "11") {
      //   return "外交护照";
      // } else if (val == "12") {
      //   return "公务护照";
      // } else if (val == "13") {
      //   return "因公普通护照";
      // } else {
      //   return "普通护照";
      // }

      if (val == "T") {
        return "区域证件";
      } else if (val == "P") {
        return "护照";
      }
    },
  }
}

function getreplace(name) {
  if (name == undefined) {
    return "";
  } else {
    return name.replace(/(^\s*)|(\s*$)/g, "").replace(/\s/g, "");
  }
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}

.detail-msg-row {
  color: #999;
  line-height: 32px;
}

.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}

hr {
  height: 2px;
  border: none;
  border-top: 1px solid #73BFF2;
}

.hrtitle {
  height: 35px;
  line-height: 35px;
  border: none;
  color: #3F96F2;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #3F96F2;
}

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
</style>
<style media="screen">
.el-dialog {
  min-width: 730px !important;
}
</style>
