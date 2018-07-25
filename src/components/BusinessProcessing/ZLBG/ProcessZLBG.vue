<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
                <QueryNationality  :nationality="pd.NATIONALITY" @transNation="getNation"></QueryNationality>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
            </el-col>

          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO" class="input-input"></el-input>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.STARTTIME"
                 type="date" size="small" value-format="yyyyMMdd"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.ENDTIME"
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="结束时间" :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">

              <span class="input-text">姓名：</span>
                <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"   class="input-input"></el-input>
              &nbsp;<el-checkbox v-model="pd.ISBLURRED">模糊查询</el-checkbox>
            </div>
            </el-col>
                  <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.GENDER" placeholder="请选择"  filterable clearable size="small" class="input-input">
                 <el-option value="U" label="U - 未知">
                 </el-option>
                 <el-option value="F" label="F - 男">
                 </el-option>
                 <el-option value="M" label="M - 女">
                 </el-option>
               </el-select>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
              <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
              <el-date-picker
              v-model="pd.STARTBIRTH"
              type="date" size="small" value-format="yyyyMMdd"
              placeholder="开始时间" :picker-options="pickerOptions1">
            </el-date-picker>
               <span class="septum">-</span>
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="结束时间"  :picker-options="pickerOptions1">
           </el-date-picker>
         </div>
            </el-col>
              <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
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
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
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
                  label="证件种类" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.INTG_CARDTYPE | fiftertype}}
                  </template>

                </el-table-column>
                <el-table-column
                  prop="PASSPORTNO"
                  label="证件号码" sortable
                >
                </el-table-column>
                <el-table-column
                  prop="NAME"
                  label="姓名" sortable
                >
                </el-table-column>
                <el-table-column
                  prop="INTG_CHNNAME"
                  label="中文姓名" sortable
                >
                </el-table-column>
                <el-table-column

                  label="性别" sortable
                  width="100"
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
                  label="航班号" sortable
                >
                </el-table-column>
                <el-table-column
                  prop="DEPARTDATE"
                  label="航班日期" sortable
                  >
                </el-table-column>

                <el-table-column
                  label="值机状态" sortable
                  >
                  <template slot-scope="scope">
                    {{scope.row.PASSENGERSTATUS | fifterstate}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="航班状态" sortable
                  >
                  <template slot-scope="scope">
                    {{scope.row.LASTCHECKRESULT | fiftecr}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作" width="180">
                  <template slot-scope="scope">
                    <div class="flex-r">
                      <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="handles(scope.row)">变更</el-button>
                      <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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

    <el-dialog title="批量变更" :visible.sync="batchDialogVisible">
      <el-form :model="map" ref="batchmap">
        <el-row type="flex"  class="mb-6">
          <el-table
            :data="batchtableData"
            border
            style="width: 100%;">
                    <el-table-column
                      prop="NAME"
                      label="姓名" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      label="性别" sortable
                      width="100"
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
                      label="航班号" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="NATIONALITYC"
                      label="国籍" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      label="证件种类" sortable
                    >
                    <template slot-scope="scope">
                        {{scope.row.INTG_CARDTYPE | fiftertype}}
                      </template>

                    </el-table-column>
                    <el-table-column
                      prop="PASSPORTNO"
                      label="证件号码" sortable
                    >
                    </el-table-column>
                    <el-table-column
                      label="当前值机状态" sortable
                    >
                    <template slot-scope="scope">
                      {{scope.row.CHECKRESULT | fiftecr}}
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="CHECKRESULT"
                      label="当前值机状态说明"
                    >
                    </el-table-column>
          </el-table>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:15%">变更后值机状态：</span>
            <el-select v-model="map.INSTRUCT"  placeholder="请选择"  filterable clearable   size="small" style="width:80%">
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
            <span class="yy-input-text" style="width:15%">变更后值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="map.INSTRUCTC" style="width:80%"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:15%">变更说明：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" style="width:80%" v-model="map.CHANGERESON"></el-input>
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
            <span class="yy-input-text">当前值机状态：</span>
            <el-select v-model="form.CHECKRESULT"  placeholder="请选择"    size="small" class="yy-input-input" :disabled="true">
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
            <span class="yy-input-text">值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.CHECKRESULTS" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更后值机状态：</span>
            <el-select v-model="form.INSTRUCT"  placeholder="请选择"  filterable clearable   size="small" style="width:82%">
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
            <span class="yy-input-text" style="width:18%">变更后值机状态说明：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INSTRUCTC" style="width:82%"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更说明：</span>
           <el-input type="textarea" v-model="form.CHANGERESON"  placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" style="width:82%;" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="handlesItem1('handlesForm')" size="small">变更</el-button> -->
        <el-button type="primary" @click="handlessys(1)" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>

      </div>


    </el-dialog>


    <el-dialog  title="操作授权" :visible.sync="AuthDialogVisible"  append-to-body width="500px">

      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
            <span class="yy-input-text">授权账号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="ap.APPROVALUSER" class="yy-input-input"></el-input></el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
              <span class="yy-input-text">授权密码：</span>
              <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.APPROVALPW" class="yy-input-input"></el-input></el-col>

      </el-row>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="Authorization(ap)" size="small">确认授权</el-button>
        <el-button @click="AuthDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>

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

    <div class="hrtitle">预检详情</div>

    <el-row type="flex"  class="mb-6">

      <el-col :span="24" v-for="item in xingq"> &diams; {{item.DATACHECKDETAIL}}</el-col>

    </el-row>


        <div class="hrt">列表信息</div>
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
                  label="原预检结果" sortable
                    width="120"
                  >
                  <template slot-scope="scope">
                    {{scope.row.CHECKRESULT | fiftecr}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="最终预检结果" sortable
                  width="120"
                  >
                  <template slot-scope="scope">
                    {{scope.row.LASTCHECKRESULT | fiftecr}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否报警" sortable
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
import QueryNationality from '../../other/queryNationality'
export default {
  components: {
    QueryNationality
  },
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      CurrentPage1: 1,
      pageSize1: 10,
      TotalResult1: 0,
      ap: {},
      pd: {},
      tp:0,
      nation: [],
      value: '',
      value1: "",
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
      xingq: "无",
      dform: {},
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]

      },

    }
  },
  // mounted() {
  //   this.getList(this.CurrentPage, this.pageSize, this.pd);
  // },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    getNation(msg) {
      this.pd.NATIONALITY = msg;
    },
    batchs() {

      if (this.multipleSelection.length == 0) {
        this.open();
        return;

      }
      this.batchDialogVisible = true;
      this.batchtableData = this.multipleSelection
    },
    open() {
      this.$alert('请选择列表内容！', '提示', {
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
      this.detailgetlist(this.CurrentPage1, val, this.dfrom);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.detailgetlist(val, this.pageSize1, this.dfrom);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
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
      console.log(i);
      this.form = i;
    },
    handlessys(i)
    {
       this.AuthDialogVisible=true;
       this.tp=i;
    },
    Authorization(ap)
    {

       if(this.tp==0){
        this.handlesItem("batchmap",ap);

      }else {
         this.handlesItem1("handlesForm",ap);
       }

    },
    handlesItem(formName,ap) {

      let IAPISERIAL = [];
      let arr = this.multipleSelection;

      for (var i in arr) {
        IAPISERIAL.push(arr[i].SERIAL)
      }

      let p = {
        "IAPISERIAL": IAPISERIAL,
        "CREATEUSER": "杨小",
        "APPROVALUSER": ap.APPROVALUSER,
        "APPROVALPW":ap.APPROVALPW,
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
          this.getList();
        }, e => {
          this.$message.error('失败了');
        })
    },
    handlesItem1(formName,ap) {



      let p = {
        "IAPISERIAL": [this.form.SERIAL],
        "CREATEUSER": "杨小",
        "APPROVALUSER": ap.APPROVALUSER,
        "APPROVALPW":ap.APPROVALPW,
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
          this.getList();
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {

      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;

      this.detailgetlist(0, 10, this.dform);

      let L = {
        "IAPISERIAL": this.dform.SERIAL
      };
      this.$api.post('/manage-platform/iapiUnscolicited/queryPretestDetails', L,
        s => {

          this.xingq = s.data;
        });
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

    }
  },

  filters: {

    fiftersex(val) {
      if (val == "F") {
        return "男"

      } else if (val == "M") {
        return "女"
      } else if (val == "U") {
        return "未知"
      }

    },
    fifterstate(val) {
      if (val == "1") {
        return "已登机";
      }else if (val == "2") {
        return "未登机";
      }  else {
        return "已值机";
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
      if (val == "11") {
        return "外交护照";
      } else if (val == "12") {
        return "公务护照";
      } else if (val == "13") {
        return "因公普通护照";
      } else {
        return "普通护照";
      }
    },

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
