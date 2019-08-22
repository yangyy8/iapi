<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      <!-- <el-button type="warning" size="small" class="mr-20" @click="$router.go(-1)">返回</el-button> -->

      事件编号：{{serial}}
    </div>
    <div class="middle" ref="box0">
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="bjsj-l">
            <img :src="imgURL" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate :value="parseInt($route.query.grade)" disabled class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%" @click="$router.push({name:'DZDA',query:{gender:$route.query.row.gender,personId:page0Data.personId,ename:$route.query.row.name,birth:$route.query.row.birthday,idcard:$route.query.idcard,nationality:page0Data.nationality,passportno:page0Data.passportno,grade:$route.query.grade,type:1,nav2Id:page0Data.passportno+page0Data.nationality,title:page0Data.name+'电子档案'}})">电子档案</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" class="mb-9" style="width:100%" :disabled="!operation_type" @click="openGdTc(page0Data)">事件归档</el-button>
            <el-button type="primary" size="small" style="width:100%" @click="suspected">疑似关联人</el-button>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="page=0">
                风评信息
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1">
                核查信息
              </div>
            </div>
          </div>
          <div class="ak-tab-pane" v-if="page==0">
            <div class="boder1 pb-10">
              <div class="title-green ">
                预报信息
              </div>
              <el-row class="middle-msg-row" :gutter="4">
                <el-col :span="6">
                  <span>姓名：</span>
                  {{page0Data.name}}
                </el-col>
                <el-col :span="6">
                  <span>国籍/地区：</span>
                  {{page0Data.nationalityName}}
                </el-col>
                <el-col :span="6">
                  <span>出入类型：</span>
                  {{page0Data.flightTypeName}}
                </el-col>
                <el-col :span="6">
                  <span>上机地：</span>
                  {{page0Data.origin}}
                </el-col>
                <el-col :span="6">
                  <span>性别：</span>
                  {{page0Data.genderName}}
                </el-col>
                <el-col :span="6">
                  <span>证件类型：</span>
                  {{page0Data.passportTypeName}}
                </el-col>
                <el-col :span="6">
                  <span>航班号：</span>
                  {{page0Data.fltno}}
                </el-col>
                <el-col :span="6">
                  <span>下机地：</span>
                  {{page0Data.destination}}
                </el-col>
                <el-col :span="6">
                  <span>出生日期：</span>
                  {{page0Data.birthday}}
                </el-col>
                <el-col :span="6">
                  <span>证件号码：</span>
                  {{page0Data.passportno}}
                </el-col>
                <el-col :span="6">
                  <span>航班日期：</span>
                  {{page0Data.fltnoDate}}
                </el-col>
                <el-col :span="6">
                  <span>报警时间：</span>
                  {{page0Data.createTime}}
                </el-col>

              </el-row>
              <div class="ak-tip">
                注：
                <span class="tag1"></span><span class="mr-30">生效标签</span>
                <span class="tag0"></span>失效标签
              </div>
              <div class="">
                <el-popover
                  v-for="(x,ind) in box1Data.validList" :key="ind" v-if="x.REMARK&&ind<size.size0"
                  placement="bottom"
                  width="200"
                  trigger="hover"
                  :content="x.REMARK">
                  <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                  <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                </el-popover>
                <el-tag type="warning"  v-for="(x,ind) in box1Data.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==1&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>
                <el-tag type="info"   v-for="(x,ind) in box1Data.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==2&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>

                <el-button type="text" size="small" @click="moreShow=true;size.size0=box1Data.validList.length" v-if="!moreShow&&box1Data.validList!==undefined&&box1Data.validList.length>6">查看更多 ></el-button>
                <el-button type="text" size="small" @click="moreShow=false;size.size0=6" v-if="moreShow">收起<</el-button>

              </div>

            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9" v-for="(a,ind) in box1Data.particularsList" :key="ind" v-if="ind<size.size1">
                  <el-tag type="warning" size="small" v-if="a.operation_type==1">{{a.tag_name}}</el-tag>
                  <el-tag type="info" size="small" v-if="a.operation_type==2">{{a.tag_name}}</el-tag>

                  <div class="gc-box">
                    <span>标签描述：</span>{{a.tag_remar}}
                  </div>
                  <div class="gc-box">
                    <span>过程：</span>
                    <div class="gc-r-box">
                      <div class="step-box" v-for="(x,y) in a.list" :key="y" v-if="y<a.TAGSIZE">
                        <div class="step-time mr-5 tc-333">{{x.CREATETIME.slice(0,10)}}</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">添加人：</span><span class="mr-30">{{x.USERNAME}}</span>
                            <span>添加状态：</span><span class="tc-o">{{x.OPERATION_TYPENAME}}</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            {{x.REMARK}}
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" size="small" class="gc-more" @click="a.TAGSIZE=a.list.length+3" v-if="a.list !== undefined &&a.list.length>2&&a.TAGSIZE==2">查看更多</el-button>
                      <el-button type="text" size="small" class="gc-more" @click="a.TAGSIZE=2" v-if="a.TAGSIZE==a.list.length+3">收起</el-button>

                    </div>
                  </div>
                </div>

                <div class="box1-more">
                  <el-button type="text" @click="size.size1=box1Data.particularsList.length+4" v-if="box1Data.particularsList !== undefined &&box1Data.particularsList.length>3&&size.size1==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size1=3" v-if="size.size1==box1Data.particularsList.length+4">收起 ︿</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box2=!box2">
                命中模型信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2">
                <div class="box2-content mb-9" v-for="(b,ind) in box2Data" :key="ind" v-if="ind<size.size2">
                  <div class="box2-t-box">
                    <span>{{b.modelName}}</span>
                    <el-button type="primary" plain size="small" @click="getModelCaseInfo(b.model_code,b.model_version)">模型相关案例</el-button>
                  </div>
                  <div class="gc-box">
                    <span>风险等级：</span> <el-rate :value="parseInt(b.grade)" disabled class="mt-5"></el-rate>
                  </div>

                  <div class="gc-box">
                    <span>模型描述：</span>{{b.modelDesc}}
                  </div>
                  <div class="gc-box" style="justify-content:space-between">
                    <div class=" msg-t2">
                      <span> 规则名称：</span>
                      <el-tooltip effect="light" :content="b.ruleName" placement="top-start" v-if="b.ruleName">
                        <span>{{b.ruleName}}</span>
                      </el-tooltip>
                    </div>
                    <div class="msg-t2">
                      <span>规则描述：</span>
                      <el-tooltip effect="light" :content="b.ruleDesc" placement="top-start" v-if="b.ruleDesc">
                        <span>{{b.ruleDesc}}</span>
                      </el-tooltip>
                    </div>
                    <div class="msg-t2">
                      <span>规则等级：</span>
                      <el-tooltip effect="light" :content="b.ruleGrade" placement="top-start" v-if="b.ruleGrade">
                        <span>{{b.ruleGrade}}</span>
                      </el-tooltip>
                    </div>

                  </div>
                  <el-table
                    v-if="b.ruleIndexList.length>0"
                    :data="b.ruleIndexList"
                    class="ak-table1 tableCk"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="指标项"
                      prop="indexCode">
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="指标运算"
                      prop="indexYS">
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="指标范围"
                      prop="indexFw">
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="指标值"
                      prop="indexValue">
                    </el-table-column>
                  </el-table>
                </div>

                <div class="box1-more">
                  <el-button type="text" @click="size.size2=box2Data.length+4" v-if="box2Data !== undefined &&box2Data.length>3&&size.size2==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size2=3" v-if="size.size2==box2Data.length+4">收起 ︿</el-button>
                </div>
              </div>
            </div>
            <div class="pb-10 tc-333">
              <div class="title-green hand mt-10" @click="box3=!box3">
                原指标名称信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box3" >
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>自动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="12" v-for="(c1,ind) in box3Data.autoTargetInfo" :key="ind" v-if="ind<size.size301">
                      <!-- <el-tooltip effect="light" :content="c1.TARGET_NAME" placement="top-start" v-if="c1.TARGET_NAME">
                        <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_NAME}}</span>
                      </el-tooltip> -->
                      <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_NAME}}</span>
                      :
                      <el-tooltip effect="light" :content="c1.TARGET_VALUE" placement="top-start" v-if="c1.TARGET_VALUE">
                        <span class="msg-text" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_VALUE}}</span>
                      </el-tooltip>
                      <span class="msg-text":class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}"  v-else>{{c1.TARGET_VALUE}}</span>

                    </el-col>
                  </el-row>

                </div>
                <div class="box1-more">
                  <el-button type="text" @click="size.size301=box3Data.autoTargetInfo.length+17" v-if="box3Data.autoTargetInfo !== undefined &&box3Data.autoTargetInfo.length>16&&size.size301==16">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size301=16" v-if="size.size301==box3Data.autoTargetInfo.length+17">收起 ︿</el-button>
                </div>
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>手动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="12" v-for="(c2,ind) in box3Data.manualTargetInfo" :key="ind"  v-if="ind<size.size302">
                      <!-- <el-tooltip effect="light" :content="c2.TARGET_NAME" placement="top-start" v-if="c2.TARGET_NAME">
                        <span class="msg-t" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}">{{c2.TARGET_NAME}}</span>
                      </el-tooltip> -->
                      <span class="msg-t" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}">{{c2.TARGET_NAME}}</span>
                      :
                      <el-tooltip effect="light" :content="c2.TARGET_VALUE" placement="top-start" v-if="c2.TARGET_VALUE">
                        <span class="msg-text" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}">{{c2.TARGET_VALUE}}</span>
                      </el-tooltip>
                      <span class="msg-text" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}" v-else>{{c2.TARGET_VALUE}}</span>

                    </el-col>

                  </el-row>
                </div>
                <div class="box1-more">
                  <el-button type="text" @click="size.size302=box3Data.manualTargetInfo.length+17" v-if="box3Data.manualTargetInfo !== undefined &&box3Data.manualTargetInfo.length>16&&size.size302==16">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size302=16" v-if="size.size302==box3Data.manualTargetInfo.length+17">收起 ︿</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="ak-tab-pane" v-if="page==1">
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box4=!box4">
                核查策略 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box4" style="position:relative">
                <el-button type="primary" plain size="mini" class="rightBtn" @click="meishaChange">{{meishaText}}</el-button>
                <div class="box2-content mb-9" v-for="(d1,ind) in box4Data.checkTacticsList" :key="ind" v-if="ind<size.size4">
                  <div class="">
                    <div><span class="b-dot"></span>{{d1.modelName}}：</div>
                    <div class="gc-box">
                      <div class="">
                        前期核查策略：
                      </div>
                      <div style="width:90%">
                        {{d1.strategy}}
                      </div>
                    </div>
                    <div class="gc-box">
                      <div class="">
                        见面核查策略：
                      </div>
                      <div style="width:90%">
                        {{d1.strategy_spot}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box1-more">
                  <el-button type="text" @click="size.size4=box4Data.checkTacticsList.length+4" v-if="box4Data.checkTacticsList !== undefined &&box4Data.checkTacticsList.length>3&&size.size4==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size4=3" v-if="size.size4==box4Data.checkTacticsList.length+4">收起 ︿</el-button>
                </div>
                <div class="gc-box">
                  <div class="">
                    自定义内容：
                  </div>
                  <div class="">
                    <div class="" v-for="(d2,ind) in box4Data.listRiskCustom" :key="d2.serial">
                      {{d2.content}} <el-button v-if="operation_type" type="text" class="redx" @click="delListCustom1(d2.serial)">删除</el-button>
                    </div>
                    <div class="" v-for="(x,ind2) in listRiskCustom" :key="ind2">
                      {{x.content}} <el-button type="text" class="redx" @click="delListCustom(ind2)">删除</el-button>
                    </div>
                  </div>
                </div>
                <div class="hc-box">
                  <el-input
                    :disabled="!operation_type"
                    class="mr-10"
                    type="textarea"
                    :rows="3"
                    v-model="addListCustom"
                    placeholder="请输入内容">
                  </el-input>
                  <el-button type="success" size="small" plain @click="addCustomFn" :disabled="!addListCustom">添加</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box5=!box5">
                指标录入 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box5" class="hc-box">
                <el-row align="center" :gutter="5" style="width:100%" class="mr-15">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-for="(d3,ind0) in box4Data.listRiskIndex" :key="d3.serial">
                    <el-tooltip effect="light" :content="d3.index_name" placement="top-end">
                      <span class="input-text">{{d3.index_name}}</span>
                    </el-tooltip>
                    ：
                    <el-input :disabled="!operation_type" placeholder="请输入内容" size="small" class="input-input mr-5" v-model="d3.index_value"></el-input>
                    <i v-if="operation_type" class="el-icon-close redx hand" @click="delRiskIndexInfo(d3.serial)"></i>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-for="(d3,ind1) in checkList" :key="ind1">
                    <el-tooltip effect="light" :content="d3.index_name" placement="top-end">
                      <span class="input-text">{{d3.index_name}}</span>
                    </el-tooltip>：
                    <el-input placeholder="请输入内容" size="small" class="input-input mr-5" v-model="d3.index_value"></el-input>
                    <i class="el-icon-close redx hand" @click="delRiskIndexInfo0(d3.serial,ind1)"></i>
                  </el-col>
                </el-row>
                <el-button type="success" size="small" plain class="mb-6" :disabled="!operation_type" @click="getAddRiskIndexInfo">添加</el-button>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box6=!box6">
                附件 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box6">
                <div class="" v-for="(d4,ind) in box4Data.listRiskUpload" :key="ind">
                  <span class="mr-30">{{d4.upload_name}}</span>
                  <span class="mr-30 tc-999">上传人：{{d4.userName}}</span>
                  <span class="mr-30 tc-999">上传时间：{{d4.createTime}}</span>
                  <el-button v-if="operation_type" type="text" class="redx" @click="delFileInfo(d4.serial)">删除</el-button>
                  <el-button v-if="operation_type" type="text" ><a :href="d4.url_patch" target="_blank" class="green">下载</a></el-button>
                  <!-- <el-button v-if="operation_type" type="text" ><a @click="download(d4.serial)">下载</a></el-button> -->

                </div>
                <div class="" v-if="fileData">
                  <div class="" v-for="(x,ind) in fileData" :key="ind">
                    <span class="mr-30">{{x.name}}</span>
                    <el-button type="text" class="redx" @click="delFile(ind)">删除</el-button>
                  </div>
                </div>
                <label class="file" v-if="operation_type">
                  添加附件
                  <input type="file" name="" multiple="multiple" @change="uploadFile">
                </label>
                <!-- <button type="button" name="button" @click="upload">上传</button> -->
              </div>
            </div>
            <div class="boder1 pb-10">
              <span class="title-green hand mt-10 t-meisha">梅沙事件描述</span>
              <el-button type="primary" size="mini" @click="viewMeisha">查 看</el-button>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box7=!box7">
                <span class="redx">*</span>简要描述 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box7">
                <el-input
                  :disabled="!operation_type"
                  class="mr-10 mb-9"
                  type="textarea"
                  v-model="box4Data.riskDescRecordEntity.remark"
                  :rows="3"
                  placeholder="请输入描述意见">
                </el-input>
                <el-row align="center" :gutter="2">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="redx">*</span><span class="mr-5">核查阶段 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.check_stage" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="1 - 前期核查" value="1"></el-option>
                      <el-option label="2 - 见面核查" value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="redx">*</span><span  class="mr-5">核查结果 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.check_result" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="1 - 排除嫌疑" value="1"></el-option>
                      <el-option label="2 - 未能排除嫌疑" value="2"></el-option>
                      <!-- <el-option label="3 - 推送梅沙" value="3" v-if="box4Data.riskDescRecordEntity.check_stage!=2"></el-option> -->

                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-if="user.dept_code=='B06'">
                    <span  class="mr-5">流转至 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.change_port" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option
                        v-for="(item,ind) in airport"
                        v-if="item.DEPT_CODE"
                        :key="ind"
                        :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                        :value="item.DEPT_CODE">
                      </el-option>
                    </el-select>
                  </el-col>

                </el-row>
              </div>
            </div>
            <div class="boder1 pb-10" v-if="operation_type">
              <div class="hc-btn">
                <el-button type="info" size="small" class="mr-20" @click="detailGoBack">返回</el-button>

                <el-button type="success" size="small" @click="saveRiskDescRecordInfo">确定</el-button>
              </div>

            </div>
            <div class="pb-10">
              <div class="title-green mt-10">
                本次风评记录
              </div>
              <!-- <div class="gc-box f-14" v-for="(d5,ind) in box4Data.listDescRecord" :key="ind" v-if="ind<size.size8">
                <div class="mr-5">{{ind+1}}</div>
                <div class="">
                  <div class="">
                    <span class="mr-30">核查时间：{{d5.createTime}}</span><span>核查人：{{d5.userName}}</span>
                  </div>
                  <div class="">
                    操作类型：{{d5.operation_typeName}}
                  </div>
                  <div class="gc-box">
                    <div>核查过程：</div>
                    <div class="">
                      {{d5.course_typeName}}
                    </div>
                  </div>
                  <div class="">
                    核查阶段：{{d5.check_stageName}}
                  </div>
                  <div class="">
                    核查结果：{{d5.check_resultName}}
                  </div>
                </div>
              </div> -->
              <el-table
                :data="box4Data.listDescRecord"
                class="ak-table1"
                :class="{'ak-t1':size.size8==true,'ak-t2':size.size8==false}"
                style="width: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                  width="70">
                </el-table-column>
                <el-table-column
                  label="核查时间"
                  width="200"
                  prop="createTime">
                </el-table-column>
                <el-table-column
                  label="核查人"
                  width="150"
                  prop="userName">
                </el-table-column>
                <el-table-column
                  label="操作类型"
                  width="150"
                  prop="operation_typeName">
                </el-table-column>
                <!-- <el-table-column
                  label="核查过程"
                  prop="course_typeName">
                </el-table-column> -->
                <el-table-column
                  label="核查阶段"
                  width="150"
                  prop="check_stageName"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  label="核查结果"
                  width="150"
                  prop="check_resultName"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  label="详情"
                  prop="xq"
                  :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>
              <div class="box2-more" v-if="box4Data.listDescRecord.length>5">
                <el-button type="text" @click="size.size8=false" v-if="size.size8">展开更多 ﹀</el-button>
                <el-button type="text" @click="size.size8=true" v-if="!size.size8">收起 ︿</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加指标" :visible.sync="czDialogVisible" width="640px" :show-close="false">
      <el-checkbox-group v-model="checkList" class="mb-20 o-checkbox-g2">
        <el-checkbox v-for="(x,ind) in box5Data" :key="x.TARGET_ID" :label="x">{{x.index_name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czDialogVisible=false" size="small">确认</el-button>
        <!-- <el-button type="warning" @click="czDialogVisible=false" size="small">取消</el-button> -->
      </div>
    </el-dialog>
    <GDTC :gtitle="'事件归档'" :gvisible="gdDialogVisible" :garr="checkeditem" :gtype="'1'" @gclose="gclose"></GDTC>

    <el-dialog title="模型相关案例描述" :visible.sync="modelDialogVisible" width="640px">
      <div class="mb-20" style="line-height:32px;font-size:16px;">
        <div class="" v-for="(x,ind) in modeldec" >
          <p v-if="x.CASE_NARRATION">{{x.CASE_NARRATION}}</p>
          <p v-else>该模型没有案例描述！</p>
        </div>

      </div>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czSave" size="small">确认</el-button>
        <el-button type="warning" @click="czDialogVisible=false" size="small">取消</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="推送梅沙" :visible.sync="pushMaddDialogVisible" width="500px" :before-close="handleClose">
      <el-form :model="pushMform" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">处理人：</span>
            <el-input size="small" v-model="pushMform.userName"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="type" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理类型：</span>

            <el-select placeholder="请选择" v-model="pushMform.type" filterable clearable size="small" class="yy-input-input" @change='typeChange(pushMform.type)'>
              <el-option label="移交台外" value="移交台外"></el-option>
              <el-option label="前台提示信息" value="前台提示信息"></el-option>
              <el-option label="自定义前台提示信息" value="自定义前台提示信息"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" v-if="pushMform.type=='前台提示信息'">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="strategy" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理策略：</span>
            <el-select placeholder="请选择" v-model="pushMform.strategy" filterable clearable size="small" class="yy-input-input">
              <el-option label="正常办理手续后移交后台" value="正常办理手续后移交后台"></el-option>
              <el-option label="请多页采集后移交台外" value="请多页采集后移交台外"></el-option>
              <el-option label="请多页采集后正常放行" value="请多页采集后正常放行"></el-option>
              <el-option label="正常办理手续后移交后台" value="正常办理手续后移交后台"></el-option>
              <el-option label="严把“三关”并核查有无涉恐国轨迹，如无异常正常放行" value="严把“三关”并核查有无涉恐国轨迹，如无异常正常放行"></el-option>
              <el-option label="严把“三关”查验证件真伪，如无异常正常放行" value="严把“三关”查验证件真伪，如无异常正常放行"></el-option>
              <el-option label="请查验出生地是否为新疆或中国" value="请查验出生地是否为新疆或中国"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" v-if="pushMform.type=='自定义前台提示信息'">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="message" data-type="textarea"

            v-validate-easy="[['required'],['maxLength',[100]]]">
            <span class="yy-input-text"><font class="yy-color">*</font>自定义提示信息：</span>
            <el-input type="textarea" placeholder="最多输入100字" :autosize="{ minRows: 3, maxRows: 6}" v-model="pushMform.message" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="fbkadm" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color" v-if="user.dept_code=='B06'">*</font>推送至口岸：</span>
            <el-select placeholder="请选择" v-model="pushMform.fbkadm" filterable clearable size="small" class="yy-input-input" :disabled="user.dept_code!='B06'">
              <el-option label="全国" value="000" v-if="user.dept_code=='B06'"></el-option>
              <el-option :label="portLabel" :value="portValue"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="zdgzrylbdm" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>关注类别：</span>
            <el-select placeholder="请选择" v-model="pushMform.zdgzrylbdm" filterable clearable size="small" class="yy-input-input">
              <el-option label="预警内地重点人员" value="11"></el-option>
              <el-option label="预警外籍涉疆人员" value="12"></el-option>
              <el-option label="预警偷渡人员" value="13"></el-option>
              <el-option label="预警三非人员" value="14"></el-option>
              <el-option label="预警变换身份人员" value="15"></el-option>
              <el-option label="预警黑名单人员" value="16"></el-option>
              <el-option label="预警其他人员" value="17"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="bjfw" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>报警范围：</span>
            <el-select placeholder="请选择" v-model="pushMform.bjfw" filterable clearable size="small" class="yy-input-input">
              <el-option label="入境" value="1"></el-option>
              <el-option label="出境" value="2"></el-option>
              <el-option label="入出境" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="zdgzryclfs" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>处理方式：</span>
            <el-select placeholder="请选择" v-model="pushMform.zdgzryclfs" filterable clearable size="small" class="yy-input-input">
              <el-option label="移交后台" value="1"></el-option>
              <el-option label="重点检查" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="qsgzrq" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>起始关注日期：</span>
              <el-date-picker
              v-model="pushMform.qsgzrq"
              type="date" size="mini"
              placeholder="请选择开始日期"
              class="yy-input-input"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="jsgzrq" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>结束关注日期：</span>
              <el-date-picker
              v-model="pushMform.jsgzrq"
              type="date" size="mini"
              placeholder="请选择开始日期"
              class="yy-input-input"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem()" size="small">确 定</el-button>
        <el-button @click="handleClose" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <div class="gototop">
      <div class="backtop" @click="backtop()">
        <i class="el-icon-upload2"></i>
        返回顶部
      </div>
    </div>
    <el-dialog title="梅沙事件描述详情" :visible.sync="viewMDialogVisible" width="640px">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          事件编号：{{descData.evt_id||'-'}}
        </el-col>
        <el-col :span="12">
          事件类别：{{descData.evt_types||'-'}}
        </el-col>
        <el-col :span="12">
          事件性质：{{descData.evt_char_code||'-'}}
        </el-col>
        <el-col :span="12">
          公文种类：{{descData.docs_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          审批人：{{descData.approver||'-'}}
        </el-col>
        <el-col :span="12">
          处理结果：{{descData.ill_deal_rsn_na||'-'}}
        </el-col>
        <el-col :span="24">
          事件主题：{{descData.evt_theme||'-'}}
        </el-col>
        <el-col :span="24">
          事件描述：{{descData.evt_desc||'-'}}
        </el-col>
      </el-row>
      <div class="title-green mt-10">
        处理意见
      </div>
      <el-row style="line-height:32px;">
        <el-col :span="24">
          {{descData.deal_opinion||'-'}}
        </el-col>
     </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="viewMDialogVisible=false" size="small">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="疑似关联人" :visible.sync="susMDialogVisible" width="1000px" :lock-scroll="false" v-dialogDrag>
      <el-table
        :data="tableDataSus"
        class="ak-table2"
        border
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          label="姓名"
          prop="ENAME">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="性别"
          prop="GENDER_NAME">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="出生日期"
          prop="BIRTHDAY">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="国籍地区"
          prop="NATIONALITY_NAME">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="证件号码"
          prop="PASSPORTNO">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="证件类型"
          prop="INTG_CARDTYPE_NAME">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="航班号"
          prop="FLTNO">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="关联规则"
          prop="TYPE">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import GDTC from './GDTC'
import imgUrl from '../../../assets/img/bp_ap/ph_s.png'
import { formatDate,format } from '@/assets/js/date.js'
export default {
  components:{GDTC},

  data(){
    return{

      tableDataSus:[],
      susMDialogVisible:false,
      viewMDialogVisible:false,
      descData:{},
      ccTimer:null,
      tobox:'box0',
      pushMaddDialogVisible:false,

      pushMform:{
        userName:'',
        qsgzrq:formatDate(new Date(),'yyyyMMdd'),
        jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
      },
      portLabel:'',
      portValue:'',
      meishaSerial:'',

      meishaText:'',
      user:{},
      operation_type:null,
      delIndex:'',
      airport:null,
      page:0,
      page0Data:{},
      moreShow:false,
      box1:true,
      box1Data:{validList:[],particularsList:[]},
      box2:true,
      box2Data:[],
      box3:true,
      box3Data:{autoTargetInfo:[],manualTargetInfo:[]},
      box4:true,
      box4Data:{checkTacticsList:[],listDescRecord:[],listRiskCustom:[],listRiskUpload:[],listRiskIndex:[],riskDescRecordEntity:{}},
      box5:true,
      box5Data:{},
      box6:true,
      box7:true,
      size:{size0:6,size1:3,size2:3,size301:16,size302:16,size4:3,size8:true},
      serial:null,
      fileData:null,
      addListCustom:null,
      listRiskCustom:[],
      czDialogVisible:false,
      checkList:[],
      fuji:true,
      gdDialogVisible:false,
      checkeditem:null,
      modelDialogVisible:false,
      modeldec:null,
      imgURL:imgUrl,
      iapi_id:'',
      nav2IdClose:null,
    }
  },
  mounted(){
    this.queryAirport();
  },
  activated(){
    this.nav2IdClose=this.$route.query.nav2Id;
    this.page0Data={};
    this.imgURL=imgUrl;
    this.getUers();
    if(this.$route.query.yl_two=="否"){
      this.meishaText="推送前台"
    }else if(this.$route.query.yl_two=="是"){
      this.meishaText="撤销推送"
    }
    this.page=this.$route.query.page;
    this.operation_type=this.$route.query.operation_type;
    this.serial=this.$route.query.serial;
    this.delIndex='';
    this.getRiskIapiInfo();
    if(this.page==0){
      this.getHisModelInfo();
      this.getOperationalTargetInfo();
    }else if(this.page==1){
      this.getRiskDescRecordInfo();
      this.checkList=[];
      this.fileData=[];
      this.listRiskCustom=[];
    }
  },
  watch:{
    $route:function(val,old){
      this.page=val.query.page
      this.operation_type=this.$route.query.operation_type;
      this.serial=this.$route.query.serial;
      this.delIndex='';
      if(val.name=='BJSJCK'&&val.query.nav2Id!=old.query.nav2Id){
        console.log("val----",val,old)

        this.getUers();
        this.getRiskIapiInfo();
        if(this.page==0){
          this.getHisModelInfo();
          this.getOperationalTargetInfo();
        }else if(this.page==1){
          this.getRiskDescRecordInfo();
          this.checkList=[];
          this.fileData=[];
          this.listRiskCustom=[];
        }
      }


    },
    page:function(val){
      if(val==0){
        this.getRiskIapiInfo();
        this.getHisModelInfo();
        this.getOperationalTargetInfo();
      }else if(val==1){
        this.getRiskIapiInfo();
        this.getRiskDescRecordInfo();

      }
    }
  },
  methods:{
    tableRowClassName({row, rowIndex}){
      if(row.isHis=='1'){
        return 'warning-row'
      }
    },
    suspected(){//疑似关联人
      this.susMDialogVisible=true;
      this.$api.post('/manage-platform/riskEventWarningController/getSuspectedAssociatedPerson',{iapi_id:this.iapi_id},
       r =>{
         if(r.success){
           this.tableDataSus=r.data.list;
         }
       })
    },
    typeChange(){
      this.$set(this.pushMform,'strategy','');
      this.$set(this.pushMform,'message','');
    },
    handleClose(){
      this.pushMform={
        userName:'',
        qsgzrq:formatDate(new Date(),'yyyyMMdd'),
        jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
      };
      this.pushMaddDialogVisible=false;
    },
    detailGoBack(){
      let p={
        "serial":this.serial,
      }
      this.$api.post('/manage-platform/riskEventWarningController/updateRiskEventStatusInfo',p,
       r =>{
         if(r.success){
           this.$router.go(-1)
         }
       })
    },
    viewMeisha(){
      this.viewMDialogVisible=true;
      let p={
        "gender":this.$route.query.row.gender=="M"?'1':this.$route.query.row.gender=="F"?'2':'',
        "nationality":this.$route.query.row.nationality,
        "passportno":this.$route.query.row.passportno,
        "birth":this.$route.query.row.birthday,
        "ename":this.$route.query.row.name,
        "type":'opinion'
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',p,
        r =>{
          if(r.success){
            this.descData = r.data;
          }
        })
    },
    backtop(x){
      this.tobox;
      let box;
      this.tobox='box0';
      box=this.$refs.box0

      let that=this;
      let t = document.documentElement.scrollTop||document.body.scrollTop;
      let num=t,step=100;
      console.log(box.offsetTop,t);
      this.ccTimer=setInterval(function () {
        num=num+step;
        window.scrollTo(0,num);
        if(num>=box.offsetTop){
          window.scrollTo(0,box.offsetTop);
          clearInterval(that.ccTimer)
        }
      },100)
    },
    meishaChange(){
      if(this.meishaText=="推送前台"){
        if(this.$route.query.row.change_portCode==undefined||this.$route.query.row.change_portCode==''){
          this.portLabel=this.$route.query.row.port_name;
          this.portValue=this.$route.query.row.port_code;
        }else{
          this.portLabel=this.$route.query.row.change_portName;
          this.portValue=this.$route.query.row.change_portCode;
        }
        if(this.user.dept_code!="B06"){
          this.pushMform.fbkadm=this.portValue
        }
        this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
          r => {
            this.pushMform.userName = r.data.name;
          })
        this.pushMaddDialogVisible=true;
        this.V.$reset('demo2')
      }else if(this.meishaText=="撤销推送"){
        let p = {
          "eventSerial": this.$route.query.row.serial
        };
        this.$confirm('您是否确认撤销推送？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/manage-platform/riskEventPushMXController/deleteBJAPIZDGZRYInfo', p,
            r => {
              if (r.success) {
                this.$message({
                  message: '撤销成功！',
                  type: 'success'
                });
                this.meishaText="推送前台";
              } else {
                this.$message.error(r.Message);
              }
            }, e => {
              this.$message.error('失败了');
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤销'
          });
        });
      }
    },
    addItem(){
      this.V.$submit('demo2', (canSumit,data) => {
        if(!canSumit) return
        let p={
          "eventSerial":this.$route.query.row.serial,
          "operation_type":"6",
          "course_type":'4',
          "one":(new Date()).getTime(),
          "gznr":this.pushMform.type=="前台提示信息"?this.pushMform.strategy:this.pushMform.type=="自定义前台提示信息"?this.pushMform.message:"移交台外",

          "fbkadm":this.pushMform.fbkadm,
          "zdgzrylbdm":this.pushMform.zdgzrylbdm,
          "bjfw":this.pushMform.bjfw,
          "zdgzryclfs":this.pushMform.zdgzryclfs,
          "qsgzrq":this.pushMform.qsgzrq,
          "jsgzrq":this.pushMform.jsgzrq

        }
        this.$api.post('/manage-platform/riskEventPushMXController/insertBJAPIZDGZRYInfo',p,
         r =>{
           if(r.success){
             this.$message({
               message: '恭喜你，保存成功！',
               type: 'success'
             });
             this.pushMaddDialogVisible=false;
             this.meishaText="撤销推送";

             this.pushMform={
               userName:'',
               qsgzrq:formatDate(new Date(),'yyyyMMdd'),
               jsgzrq:formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000*3),'yyyyMMdd'),
             };

           }
         })
      })
    },
    getUers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        this.user=r.data;
        // console.log(this.user.dept_code)

      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/riskEventController/getDeptInfo',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    // 预报信息
    getRiskIapiInfo(){
      let p={
        "eventSerial": this.serial
      }
      if(!this.operation_type){
        p.check="check";
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskIapiInfo',p,
       r => {
         if(r.success){

           this.page0Data=r.data;
           this.iapi_id=r.data.iapi_id;

           this.getRiskEventTagInfo(this.page0Data.passportno,this.page0Data.nationality)
           this.getPhotoInf(r.data.passportno,r.data.nationality,r.data.birthday,r.data.name,r.data.genderName,r.data.personId);
         }
      })
    },
    // 当前事件标签及标签详情信息
    getRiskEventTagInfo(passportno,nationality){
      let p={
        "passportno":passportno,
	      "nationality":nationality
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskEventTagInfo',p,
       r => {
         if(r.success){
           var arrAfter=[];
           var arrReal=[];
           for(var i=0;i<r.data.validList.length;i++){
             if(arrAfter.indexOf(r.data.validList[i].TAG_NAME)==-1){
               arrAfter.push(r.data.validList[i].TAG_NAME);
               arrReal.push(r.data.validList[i])
             }
           }
           r.data.validList = arrReal;
           this.box1Data=r.data;
         }
      })
    },
    quchong(arr){
      var hash=[];
      for(var i=0;i<arr.length;i++){
        if(hash.indexOf(arr[i])==-1){
          hash.push(arr[i])
        }
      }
      return hash
    },
    // 命中模型信息
    getHisModelInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getHisModelInfo',p,
       r => {
         this.box2Data=r.data;
      })
    },
    // 获取运算指标信息
    getOperationalTargetInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getOperationalTargetInfo',p,
       r => {
         this.box3Data=r.data
      })
    },
    // page=1
    // 获取简要描述/核查阶段/核查结果/流转及记录过程
    getRiskDescRecordInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskDescRecordInfo',p,
       r => {
         this.box4Data=r.data;
         this.box4Data.riskDescRecordEntity.operation_type=this.operation_type;
      })
    },
    // 添加自定义
    addCustomFn(){
      this.addListCustom={
        content:this.addListCustom,
        // type:1
      }
      this.listRiskCustom.push(this.addListCustom);
      this.addListCustom='';
    },
    // 删除自定义
    delListCustom(ind){
      this.listRiskCustom.splice(ind,1)
    },
    // 删除自定义真的
    delListCustom1(serial){
      let p={
        "serial": serial,
        "userId": this.user.userId
      }
      if(this.delIndex.indexOf("1,")==-1){
        this.delIndex+="1,"
      }

      this.$api.post('/manage-platform/riskEventWarningController/updateRiskCustomInfo ',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    // 指标弹窗
    getAddRiskIndexInfo(){
      console.log("checkList#",this.checkList)
      let p={
        "eventSerial": this.serial
      }
      this.czDialogVisible=true;
      this.$api.post('/manage-platform/riskEventWarningController/getAddRiskIndexInfo',p,
       r => {
         this.box5Data=r.data.listRiskTarget;
         let arr=this.box5Data;
         let that=this;
         for(var i =0;i<arr.length;i++){
           arr[i].index_name=arr[i].TARGET_NAME
         }
      })
    },
    czSave(){
      console.log(this.checkList)
    },
    // 删除指标信息
    delRiskIndexInfo(serial){
      let p={
        "serial": serial,
        "userId": this.user.userId
      }
      if(this.delIndex.indexOf("2,")==-1){
        this.delIndex+="2,"
      }
      this.$api.post('/manage-platform/riskEventWarningController/delRiskIndexInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    delRiskIndexInfo0(serial,ind){
      this.checkList.splice(ind,1)
    },
    // 获取要上传的文件
    uploadFile(event){
      this.fileData=event.target.files;
      this.fileData =[...this.fileData]

      console.log(event);
    },
    // 假删除附件
    delFile(x){
      console.log(this.fileData)

      this.fileData.splice(x,1);

    },
    // 上传附件
    upload(){
      var formData = new FormData();
      let arr=this.fileData;

      for(var i=0;i<arr.length;i++){
        formData.append("file",arr[i]);
      }
      formData.append("eventSerial",this.serial);
      formData.append("userId",this.user.userId);
      let p=formData
      this.$api.post('/manage-platform/riskEventWarningController/upload',p,
       r => {
         if(r.success){
           // this.$message({
           //   message: '恭喜你，上传成功！',
           //   type: 'success'
           // });
           if(this.delIndex.indexOf("3,")==-1){
             this.delIndex+="3,"
           }
           // this.getRiskDescRecordInfo();
           this.fileData=null;
           return true;
         }else {
           this.fileData=null;
           return false;
         }
      },e => {

      },{'Content-Type': 'multipart/form-data'})
    },
    // 删除附件
    delFileInfo(serial){
      let p={
        "serial": serial,
        "delUser": this.user.userId
      }
      if(this.delIndex.indexOf("3,")==-1){
        this.delIndex+="3,"
      }
      this.$api.post('/manage-platform/riskEventWarningController/delFileInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    // 下载
    download(serial){
      let p={
        "serial": serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/download',p,
       r => {

      })
    },
    closeTab(){
      console.log(this.$root.tabList)
      for(var i=0;i<this.$root.tabList.length;i++){
        console.log(this.$root.tabList[i].query.nav2Id,this.nav2IdClose,this.$root.tabList[i].query.nav2Id==this.nav2IdClose)
        if(this.$root.tabList[i].query.nav2Id==this.nav2IdClose){
          console.log('women')
          this.$root.tabList.splice(i,1);
        }
      }
    },
    // 保存校验描述/核查阶段/结果/流转
    saveRiskDescRecordInfo(){
      let hash= (new Date()).getTime();
      console.log(hash)
      if(this.$route.query.status==4){
        this.$message.error('事件已归档！');
        return
      }else if(!this.box4Data.riskDescRecordEntity.remark){
        this.$message.error('请先填写简要描述！');
        return
      }else if(!this.box4Data.riskDescRecordEntity.check_stage){
        this.$message.error('请选择核查阶段！');
        return
      }else if(!this.box4Data.riskDescRecordEntity.check_result){
        this.$message.error('请选择核查结果！');
        return
      }
      console.log(this.fileData);
      console.log(this.fileData!=null)
      if(this.fileData!=null){
        console.log("this.fileData",this.delIndex)
        var formData = new FormData();
        let arr=this.fileData;

        for(var i=0;i<arr.length;i++){
          formData.append("file",arr[i]);
        }
        formData.append("eventSerial",this.serial);
        formData.append("userId",this.user.userId);
        formData.append("one",hash);

        let p=formData
        this.$api.post('/manage-platform/riskEventWarningController/upload',p,
         r => {
           if(r.success){
             if(this.delIndex.indexOf("3,")==-1){
               this.delIndex+="3,"
             }
             if(this.listRiskCustom.length>0&&this.delIndex.indexOf("1,")==-1){
               this.delIndex+="1,"
             }
             if(this.checkList.length>0&&this.delIndex.indexOf("2,")==-1){
               this.delIndex+="2,"
             }
             let p={
               custom:this.listRiskCustom,
               descRecord:this.box4Data.riskDescRecordEntity,
               addIndex:this.checkList,
               userId:this.user.userId,
               eventSerial: this.serial,
               delIndex:this.delIndex,
               one:hash
             };
             this.$api.post('/manage-platform/riskEventWarningController/saveRiskDescRecordInfo',p,
              r => {
                if(r.success){
                  this.$message({
                    message: '恭喜你，保存成功！',
                    type: 'success'
                  });
                  this.delIndex='';
                  this.getRiskDescRecordInfo();
                  this.listRiskCustom=[];
                  this.checkList=[];
                  // this.closeTab()
                }
             })
             this.fileData=null;

           }else {
             this.fileData=null;
             return false;
           }
        },e => {

        },{'Content-Type': 'multipart/form-data'})
        // this.upload();
      }else{
        if(this.listRiskCustom.length>0&&this.delIndex.indexOf("1,")==-1){
          this.delIndex+="1,"
        }
        if(this.checkList.length>0&&this.delIndex.indexOf("2,")==-1){
          this.delIndex+="2,"
        }
        let p={
          custom:this.listRiskCustom,
          descRecord:this.box4Data.riskDescRecordEntity,
          addIndex:this.checkList,
          userId:this.user.userId,
          eventSerial: this.serial,
          delIndex:this.delIndex,
          one:hash
        };
        this.$api.post('/manage-platform/riskEventWarningController/saveRiskDescRecordInfo',p,
         r => {
           if(r.success){
             this.$message({
               message: '恭喜你，保存成功！',
               type: 'success'
             });
             this.delIndex='';
             this.getRiskDescRecordInfo();
             this.listRiskCustom=[];
             this.checkList=[];
             // this.closeTab()
           }
        })
      }



    },
    openGdTc(item){
      this.checkeditem=item;
      this.gdDialogVisible=true;
    },
    gclose(data){
      console.log(data)
      this.gdDialogVisible=data;
    },
    // 模型案例
    getModelCaseInfo(code,ver){
      let p={
        "model_code":code,
	      "model_version":ver

      }
      this.$api.post('/manage-platform/riskEventWarningController/getModelCaseInfo',p,
       r => {
         this.modelDialogVisible=true;
         this.modeldec=r.data
      })
    },
    getPhotoInf(passportno,nationality,birthday,name,gender,personId){
      let p={}
      if(nationality=="CHN"){
        p={
          "type": 'photo',
          "nationality": nationality,
          "passportno": passportno,
          "personId":personId
        }
      }else{
        p={
          "passportno": passportno,
          "nationality": nationality,
          "birthday": birthday,
          "personId":personId,
          "name": name,
          "gender":gender=="男"?'1':gender=="女"?'2':'0',
          "type": 'photo',
        }
      }

      this.$api.post('/manage-platform/riskRecordController/getPhotoInf',p,
       r => {
         console.log(r)
         this.imgURL=r.data.url||imgUrl;
      })
    }
  }
}
</script>

<style scoped>

.gototop{
    position: fixed;
    right:30px;
    bottom: 50px;
    width: 100px;
    line-height: 20px;
    background-color: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.26);
    overflow: hidden;
    color: #666666;

}
.gototop > div {
    font-size: 12px;
    padding: 0 5px 0 8px;

    cursor:pointer;
}
.backtop{
  color: #1a77c4;
  background-color: rgba(37,130,220,0.3);
  line-height: 28px;

}
.tobox{
  padding-left: 8px;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  margin: 8px 0;
}
.yy-input-text {
  width: 25% !important;
}
.middle{
  color: #666666;
}
.bjsj-l{
  border: 1px #dddddd solid;
  border-radius: 3px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.middle-msg-row span{
  display: inline-block;
  width: 107px;
  text-align: right;
}
.middle-msg-row2 .msg-t{

  display: inline-block;
  vertical-align: middle;
  /* max-width: 35%; */
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
  /* text-align: right; */
}
.msg-t2{

  display: inline-block;
  vertical-align: middle;
  width: 33%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
  /* text-align: right; */
}
.middle-msg-row2 .msg-text{
  display: inline-block;
  vertical-align: middle;
  max-width: 65%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.ak-tip{
  font-size: 14px;
  color: #999;
}
.tag1{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(230, 162, 60, 0.9);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
.tag0{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(144, 147, 153, 0.6);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
.box1-more{
  background: #eef9ff;
  text-align: center;
}
.box2-more{
  text-align: center;

}
.box2-t-box{
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.box2-t-box{
  color: #333;
  font-weight: bold;
}
.gc-box{
  display: flex;
}
.hc-box{
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
}
.hc-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 30px;
}
.gc-r-box{
  position: relative;
}
.gc-more{
  position: absolute;
  bottom: 5px;
  left: 30px;
}
.gc-box>span{
  width: 85px;
  text-align: right;
}
.b-dot{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #2a81ce;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 4px;
}
.step-box{
  display: flex;
  /* align-items: center; */
}
.step-icon{
  position: relative;
  padding: 5px 5px 0;
}
.step-dot{
  width: 12px;
  height: 12px;
  background: #35acff;
  border-radius: 50%;
  position: absolute;
  left: 0px;
}
.step-line{
  width: 2px;
  height: 75px;
  background: #35acff;
  position: absolute;
  /* top: 0; */
}
/* .step-line:last-of-type{
  height: 60px;
} */
.step-content{
  /* border-left: 2px solid #35acff; */
  height: 75px;
}
/* .step-content:last-of-type{
  height: 60px;
} */
.file {
    position: relative;
    display: inline-block;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #409EFF;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
}
.rightBtn{
  position: absolute;
  right: 0;
  top:-30px;
}
.input-text{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>
<style media="screen">
.tableCk .warning-row {
  background: #EEE9BF;
}
</style>
