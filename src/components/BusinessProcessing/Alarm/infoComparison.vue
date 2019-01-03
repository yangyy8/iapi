<template lang="html">
  <div class="infoComparison">
    <el-row type="flex">
      <el-col :span="16" class="mr-2">
        <div class="middle middle-top mb-2">
          <div class="title-green">
            信息比对
          </div>

<!-- // 0不准入境名单查询 1失效证件 2失效签证 3白名单 4临空名单 5重点关注
// BZRJyfbywtList   invalidCardList  invalidVisaList WnameListList  LKNameListList -->
          <table class="o-th1" cellspacing="0" v-if="$route.query.NameListType==0">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>
              <td>{{tableData.BZRJyfbywtList.XM}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.BZRJyfbywtList.XBDM}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.BZRJyfbywtList.CSRQ}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.BZRJyfbywtList.ZJHM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationality}}</td>
              <td>{{tableData.BZRJyfbywtList.GJDQDMDESC}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
          </table>
          <table class="o-th1" cellspacing="0" v-if="$route.query.NameListType==1">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>
              <td>{{tableData.invalidCardList.NAME}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.invalidCardList.GENDER}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.invalidCardList.dateOfBirthDesc}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.invalidCardList.CARDNUM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationality}}</td>
              <td>{{tableData.invalidCardList.GJDQDMDESC}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
          </table>
          <table class="o-th1" cellspacing="0" v-if="$route.query.NameListType==2">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>签证号码</td>
              <td>{{travellerInfo.visaNo}}</td>
              <td>{{tableData.invalidVisaList.VISANO}}</td>
              <td>
                <img v-if="compareResult.visaNo==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.visaNo==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>签证类型</td>
              <td>{{travellerInfo.visaType}}</td>
              <td>{{tableData.invalidVisaList.VISATYPE}}</td>
              <td>
                <img v-if="compareResult.visaType==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.visaType==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.invalidVisaList.CARDNUM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>
              <td>{{tableData.invalidVisaList.NAME}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.invalidVisaList.GENDER}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.invalidVisaList.dateOfBirthDesc}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationality}}</td>
              <td>{{tableData.invalidVisaList.GJDQDMDESC}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
          </table>
          <table class="o-th1" cellspacing="0" v-if="$route.query.NameListType==3">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>
              <td>{{tableData.WnameListList.NAME}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.WnameListList.GENDER}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.WnameListList.dateOfBirthDesc}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.WnameListList.CARDNUM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationality}}</td>
              <td>{{tableData.WnameListList.GJDQDMDESC}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
          </table>
          <table class="o-th1" cellspacing="0" v-if="$route.query.NameListType==4">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>
              <td>{{tableData.LKNameListList.NAME}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.LKNameListList.GENDER}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.LKNameListList.dateOfBirthDesc}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.LKNameListList.CARDNUM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationality}}</td>
              <td>{{tableData.LKNameListList.GJDQDMDESC}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
          </table>
          <table class="o-th1" cellspacing="0" v-if="$route.query.isZDGZ==1">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{travellerInfo.pname}}</td>

              <td>{{tableData.NameListFocusEntity.NAME}}</td>
              <td>
                <img v-if="compareResult.pname==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.pname==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>{{travellerInfo.sex}}</td>
              <td>{{tableData.NameListFocusEntity.gender}}</td>
              <td>
                <img v-if="compareResult.sex==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.sex==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{travellerInfo.birthday}}</td>
              <td>{{tableData.NameListFocusEntity.dateOfBirthDesc}}</td>
              <td>
                <img v-if="compareResult.birthday==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.birthday==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>国籍/地区</td>
              <td>{{travellerInfo.nationalityDesc}}</td>
              <td>{{tableData.NameListFocusEntity.nationalityDesc}}</td>
              <td>
                <img v-if="compareResult.nationality==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.nationality==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.NameListFocusEntity.cardno}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr>
            <!-- <tr>
              <td>签证号码</td>
              <td>{{travellerInfo.cnum}}</td>
              <td>{{tableData.NameListFocusEntity.CARDNUM}}</td>
              <td>
                <img v-if="compareResult.cnum==1" src="../../../assets/img/hook.png" alt="">
                <img v-if="compareResult.cnum==0"src="../../../assets/img/cross.png" alt="">
              </td>
            </tr> -->
          </table>
        </div>
        <div class="middle height2 mb-6">
          <div class="title-green">
            名单补充信息
          </div>
          <div class=""  v-if="$route.query.NameListType==0">
            <el-row  class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">档号：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.JKDWDH" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">起控日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.QSKZRQ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">止控日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.ZZKZRQ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">交控单位：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.JKDWMC" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">在控性质：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.DXLBDM" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item  mb-9">
                <span class="input-text">法律依据：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.FLYJ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">职业身份：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.SF" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">联系办法：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.LXBF" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item  mb-9">
                <span class="input-text">主要问题：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.ZYWT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item  mb-9">
                <span class="input-text">境内住址：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.JNZZ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item  mb-9">
                <span class="input-text">境外住址：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.JWZZ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item  mb-9">
                <span class="input-text">体貌特征：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.TMTZ" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">备注：</span>
                <el-input placeholder="请输入内容" v-model="tableData.BZRJyfbywtList.BZ" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class=""  v-if="$route.query.NameListType==1">
            <el-row class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">发证日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.CARDISSUEDATE" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容"  v-model="tableData.invalidCardList.CARDEXPIREDATE" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <!-- <el-col :span="8" class="input-item mb-9">
                <span class="input-text">撤销日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.CARDEXPIREDATE" size="small" :disabled="true" class="input-input"></el-input>
              </el-col> -->
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">失效原因：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.REASON" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">宣布机关：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.DEALUNIT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">交控档号：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.RECORDNUM" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <!-- <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">遗失地点：</span>
                <el-input placeholder="请输入内容" v-model="{{tableData.invalidCardList.cardEXPIREDATE}}" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col> -->
              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">备注：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidCardList.CONTENT" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class=""  v-if="$route.query.NameListType==2">
            <el-row class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">发证日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.CARDISSUEDATE" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.CARDEXPIREDATE" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <!-- <el-col :span="8" class="input-item mb-9">
                <span class="input-text">撤销日期：</span>
                <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
              </el-col> -->
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">失效原因：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.REASON" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">宣布机关：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.DEALUNIT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">交控档号：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.RECORDNUM" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">备注：</span>
                <el-input placeholder="请输入内容" v-model="tableData.invalidVisaList.CONTENT" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class=""  v-if="$route.query.NameListType==3">
            <el-row class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">入境口岸：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.WHITE_PORT_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">出境口岸：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.WHITE_PORT_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">出入境标识：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.IN_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='I'">
                <span class="input-text">生效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.CTL_BEGINDATE_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='I'">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.CTL_EXPIREDATE_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='O'">
                <span class="input-text">生效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.CTL_BEGINDATE_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='O'">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.CTL_EXPIREDATE_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">批准机关：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.SUBORG_NAME" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">原因描述：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList.CTL_REASON" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>

              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">备注：</span>
                <el-input placeholder="请输入内容" v-model="tableData.WnameListList. CONENT" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class=""  v-if="$route.query.NameListType==4">
            <el-row class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">入境口岸：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.WHITE_PORT_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">出境口岸：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.WHITE_PORT_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">出入境标识：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.IN_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='I'">
                <span class="input-text">生效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.CTL_BEGINDATE_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='I'">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.CTL_EXPIREDATE_IN" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='O'">
                <span class="input-text">生效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.CTL_BEGINDATE_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9" v-if="travellerInfo.flightType=='O'">
                <span class="input-text">失效日期：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.CTL_EXPIREDATE_OUT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">批准机关：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.DEALUNIT" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">原因描述：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList.CTL_REASON" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>

              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">备注：</span>
                <el-input placeholder="请输入内容" v-model="tableData.LKNameListList. CONENT" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class=""  v-if="$route.query.isZDGZ==1">
            <el-row class="mb-9">
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">人员编号：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.recordnum" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">联系方式：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.tel" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">出入事由：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.reason" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">生效时间：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.begindate" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">失效时间：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.enddate" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">关注类别：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.type" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">处理要求：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.dealtype" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>
              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">关注范围：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.scope" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="8" class="input-item mb-9">
                <span class="input-text">报列单位：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.reportunit" size="small" :disabled="true" class="input-input"></el-input>
              </el-col>

              <el-col :span="24" class="input-item mb-9">
                <span class="input-text2">关注内容：</span>
                <el-input placeholder="请输入内容" v-model="tableData.NameListFocusEntity.content" size="small" :disabled="true" class="input-input2"></el-input>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="down">
          <div class="down1">
            <div class="title-grey">
              判断结果
            </div>
            <div class="radio-g">
              <el-radio-group v-model="distinguishResult" class="radio-g-area" :disabled="isdisabled||$route.query.status==1">
                <el-radio :label="1">是名单人员</el-radio>
                <el-radio :label="2">不是名单人员</el-radio>
                <el-radio :label="3">不确定</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="down1" v-if="$route.query.NameListType==3">
            <div class="title-grey">
              是否符合口岸条件
            </div>
            <div class="radio-g">
              <el-radio-group v-model="martchPort" class="radio-g-area" :disabled="isdisabled||$route.query.status==1">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="down2">
            <div class="title-grey"></div>
            <div class="textarea-g">
              <div class="textarea-text">甄别说明:</div>
              <el-input
                type="textarea"
                :disabled="isdisabled||$route.query.status==1"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="distinguishNote"
                class="textarea-input">
              </el-input>
            </div>
          </div>
          <div  class="down-btn-area down3">
            <el-button   v-if="$route.query.status==0&&!isdisabled" type="primary" size="small" class="mb-15" @click="queding" >确定</el-button>
            <el-button type="warning" size="small" @click="$router.go(-1)">返回</el-button>
          </div>

        </div>
      </el-col>
      <el-col :span="8">
        <div class="top boder1">
          <div class="title-green mb-0">
            信息比对
          </div>
        </div>
        <div class="middle boder1">
          <div class="l-m-title ">
            人员照片
          </div>
          <div class="img-checkbox1 mb-15">
            <div >
              <label for="p1" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/ph_s.png" alt="" :class="{'ch-img':checkedImg==1}">
                <i class="el-icon-circle-check " :class="{'cheched-img':checkedImg==1}"></i>
              </label>
              <input type="radio" name="pPhoto" value="1"  v-model="checkedImg" id="p1" class="img-checkbox-input" >

            </div>

          </div>
          <div class="l-m-title ">
            布控照片
          </div>
          <div class="img-checkbox1">
            <div >
              <label for="b1" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/ph_s.png" alt="" :class="{'ch-img':checkedImg2==1}">
                <i class="el-icon-circle-check " :class="{'cheched-img':checkedImg2==1}"></i>
              </label>
              <input type="radio" name="pPhoto" value="1"  v-model="checkedImg2" id="b1" class="img-checkbox-input">

            </div>

          </div>
        </div>
        <div class="middle mb-2">
          <div class="img-box mb-15">
            <img src="../../../assets/img/bp_ap/ph_l.png" alt="" class="mr-20">
            <img src="../../../assets/img/bp_ap/ph_l.png" alt="">

          </div>
          <div class="btn-succ-box">
            <el-button type="success" plain class="btn-succ" size="small">比对通过</el-button>

          </div>
        </div>
        <div class="middle res-height">
          <el-row type="flex" class="res-height">
            <el-col :span="6" class="res-item1">
              指纹比对
            </el-col>
            <el-col :span="6" class="res-item1">
              比对结果
            </el-col>
            <el-col :span="12" class="res-item2">
              <div class="">
                顺序比中数：
                <b>--</b>枚
              </div>
              <div class="">
                交叉比中数：
                <b>--</b>枚
              </div>
            </el-col>


          </el-row>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  data() {
   return {
     textarea3:"",
     value: '223333333333',
     checkedImg:1,
     checkedImg2:1,
     martchPort:1,
     pd1:{},
     tableData:{
       BZRJyfbywtList:{},
       invalidCardList:{},
       invalidVisaList:{},
       WnameListList:{},
       LKNameListList:{}
     },
     travellerInfo:{},
     compareList:{},
     compareResult:{},
     distinguishInfo:"",
     distinguishResult:1,
     distinguishNote:"",
     isdisabled:false,
   }
 },

 mounted(){
   this.pd1.NameListType=parseInt(this.$route.query.NameListType);
   this.pd1.eventserial=this.$route.query.eventserial;
   this.pd1.iapiSerial=this.$route.query.iapiSerial;
   this.pd1.nationAndPass=this.$route.query.nationAndPass;
   this.pd1.visaNo=this.$route.query.visaNo;
   this.pd1.personCode=this.$route.query.nationAndPass;
   this.pd1.recordNum=this.$route.query.dh;
   this.pd1.AlarmType=this.$route.query.AlarmType;
   this.getData();
 },
 activated(){
   this.pd1.NameListType=parseInt(this.$route.query.NameListType);
   this.pd1.eventserial=this.$route.query.eventserial;
   this.pd1.iapiSerial=this.$route.query.iapiSerial;
   this.pd1.nationAndPass=this.$route.query.nationAndPass;
   this.pd1.visaNo=this.$route.query.visaNo;
   this.pd1.personCode=this.$route.query.nationAndPass;
   this.pd1.recordNum=this.$route.query.dh;
   this.pd1.AlarmType=this.$route.query.AlarmType;
   this.getData();
 },
 methods:{
   getData(){

     let p={
    	"currentPage":0,
    	"showCount":10,
    	"pd":this.pd1
    }
    if(this.$route.query.isZDGZ){
      this.$api.post('/manage-platform/pnrAlarmEvent/attentionFocusDistinguish',p,
       r => {
         console.log(r);
         this.tableData=r.data;
         this.travellerInfo=r.data.travellerInfo;
         this.compareResult=r.data.compareResult;
         this.distinguishInfo=r.data.distinguishInfo
         this.distinguishResult=r.data.distinguishResult||1;
         this.distinguishNote=r.data.distinguishNote;
         // this.martchPort=r.data.martchPort

      })
    }else{
      this.$api.post('/manage-platform/alarmEvents/nameListDistinguish',p,
       r => {
         console.log(r);
         this.tableData=r.data;
         this.travellerInfo=r.data.travellerInfo;
         this.compareResult=r.data.compareResult;
         this.distinguishInfo=r.data.distinguishInfo;
         this.distinguishResult=r.data.distinguishResult||1;
         this.distinguishNote=r.data.distinguishNote;
         this.martchPort=r.data.martchPort||0;

      })
    }


   },
   queding(){

     let p={
       "currentPage":0,
       "showCount":3,
       "pd":{
          "NameListType":this.pd1.NameListType,
          "eventSerial":this.pd1.eventserial,
          "distinguishNote":this.distinguishNote,
          "distinguishResult":this.distinguishResult.toString(),
          "distinguishInfo":this.distinguishInfo,
          "martchPort":this.martchPort,
          "recordNum":this.$route.query.dh
        }
     };
     if(this.$route.query.isZDGZ){
       this.$confirm('是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$router.go(-1);
          this.$api.post('/manage-platform/pnrAlarmEvent/saveNameListAttentionFocus',p,
           r => {
             console.log(r);
             if(r.success){
               this.$message({
                  message: '恭喜你，甄别成功！',
                  type: 'success'
                });
                this.$router.go(-1);

             }
          })
        }).catch(() => {
          // this.isdisabled=true;
          // this.getData();
        });

     }else{
       this.$confirm('是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/manage-platform/alarmEvents/getSaveNameToIdentify',p,
           r => {
             console.log(r);
             if(r.success){
               this.$message({
                  message: '恭喜你，甄别成功！',
                  type: 'success'
                });
                this.$router.go(-1);

             }
          })

        }).catch(() => {
          // this.isdisabled=true;

          // this.getData();
        });

     }


   }
 }
}
</script>

<style scoped>

.radio-g-area{
  height: 75px;
  width: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}
.textarea-g{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.textarea-text{
  width: 72px;
}
.l-m-title{
  color: #7f7f7f;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 14px;
}
.img-checkbox1{
  display: flex;

}
.img-checkbox1 img{
  width: 80px;
  height: 100px;
  margin-bottom: 5px;
  margin-right: 3px;
}
.img-checkbox-item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-checkbox-input{
  display: none;
}
.el-icon-circle-check{
  color: #b4b4b4;
}
.cheched-img{
  color: #0baaee;
}
.ch-img{
  border: 1px #0baaee solid;
}
.img-box{
  display: flex;
  justify-content: center;
}
.img-box img{
  height: 160px;
  width: 128px;
}
.btn-succ-box{
  display: flex;
  justify-content: center;
  align-items:center;
}
.btn-succ{
  width: 280px;
}
.res-height{
  height: 94px;
}
.res-item1{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.res-item1:first-child{
  color: rgb(75, 195, 160);
  border-right: 1px #d1d1d1 solid;
}
.res-item2{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.res-item2 b{
  margin: 0 12px;
  color: #ff8f47;
}
.o-th1{
  width: 100%;
  border: 1px #eee solid;

}
.o-th1 th,.o-th1 td{
  border: 1px #eee solid;
  height: 32px!important;
  padding: 0!important;

}
.o-th1 th{
  color: #fff;
  font-size: 16px;
  background-color: #858585;
}
.down{
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
}
.down1{
  width: 22%;
}
.down2{
  width: 60%;
}
.down3{
  height: 100%;
  width: 16%;
  padding-bottom: 40px;
}
.middle-top{
  min-height: 314px;
}
.height2{
  height: 237px;
}
</style>
