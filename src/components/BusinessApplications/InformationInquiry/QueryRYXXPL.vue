<template lang="html">
  <div class="">
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
            <el-button type="success" class="mb-15" size="small" @click="batchQueryList(currentPage,showCount,rows);">查询</el-button>
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
      <button type="button" name="button" class="mr-15" :class="{'pitchOn':bigBase==0}" @click="bigBase=0;batchQueryList(currentPage,showCount,rows);">IAPI数据</button>
      <button type="button" name="button" :class="{'pitchOn':bigBase==1}"  @click="bigBase=1;batchQueryListPnr(currentPage,showCount,rows);">PNR数据</button>
    </div>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2">
      <div class="title-green">
        <span style="float:left">结果显示项</span>
        <el-button style="float:right" type="primary" plain @click="openCheck" size="mini">{{text}}</el-button>
        <div style="clear:both"></div>
      </div>
       <el-checkbox-group v-model="checkList" class="o-checkbox-g" v-show="openCheckbox">
         <el-checkbox v-for="item in checkItem" :label="item.ITEMNAME" :key="item.ITEMNAME">{{item.LABEL}}</el-checkbox>
       </el-checkbox-group>
    </div>
    <!-- 表格 -->
    <div class="middle">
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="seat">航班座位图</el-button> -->
      <!-- <el-button  plain class="table-btn mb-9" size="small" @click="$router.push({name:'QueryGLRY'})">关联人员查询</el-button> -->
      <el-button  plain class="table-btn mb-9" size="small" @click="tableDown">导出</el-button>
      <el-button  plain class="table-btn mb-9" size="small" v-print="'#printMe'">打印</el-button>
      <el-table
        ref="singleTable"
        class="tableRy"
        :data="tableData"
        fit
        border
        style="width: 100%;"
        highlight-current-row
        @row-click="checkRow"
        id="printMe">
        <el-table-column
           width="70"
           label="单选">
          <template slot-scope="scope">
            <el-radio v-model="radio" class="radio" :label="scope.row.I_SERIAL">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="I_NAME"
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
          width="100"
          sortable
          v-if="checkList.indexOf(checkItem[7].ITEMNAME)>-1">
        </el-table-column>
        <el-table-column
          prop="filghtDate"
          label="航班日期"
          width="150"
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
          width="100"
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
          width="150">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="">详情</el-button>
         </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot">
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
          <!-- <div class="">
            共{{totalResult}}条
          </div> -->
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
    </div>
    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="releaseform" ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="excel"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

          :action="$api.rootUrl+'/manage-platform/iapi/readExcel'"
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
  </div>
</template>

<script>
import Seat from '../../other/seat'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data(){
    return{
      text:'收起',
      openCheckbox:true,
      //查询条件
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
      bigBase:0,
      //方案保存
      pppp:'',//方案渲染
      batchSaveName:[],//方案名称集合
      batchDialogVisible:false,
      ppp:'',//方案名称渲染
      formLabelWidth:'120px',
      //表格数据
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
      //展示项
      checkList: ['I_NAME','INTG_CHNNAME','I_34','I_76','I_37','I_39','I_12','filghtDate','I_65','I_13'],
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
      ],
      showConfiglist:[],//展示项数组
    }
  },
  mounted(){
    document.getElementsByClassName('btn-next')[0].disabled=true;
  },
  methods:{
    //------------------------------------------------全局代码项-------------------------------------------------
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
    openCheck(){
      this.openCheckbox = !this.openCheckbox
      if(this.openCheckbox == true){
        this.text = '收起';
      }else {
        this.text = '展开';
      }
    },
    //============================================查询项代码===============================================
    pageSizeChange(val) {//iapi显示条数，调用
      this.batchQueryList(this.currentPage,val,this.rows);
    },
    handleCurrentChange(val) {//显示当前页，调用
      this.batchQueryList(val,this.showCount,this.rows);
    },
    batchQueryList(currentPage,showCount,rows){//批量查询列表
      let bql = {
        "currentPage":currentPage,
      	"showCount":showCount,
      	"cdtList":rows
      }
      this.$api.post('/manage-platform/iapi/queryIapiBatch',bql,
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
          if(r.data.nextState==0){
            console.log(document.getElementsByClassName('btn-next')[0])
            document.getElementsByClassName('btn-next')[0].disabled=true;
          }else{
            document.getElementsByClassName('btn-next')[0].disabled=false;
          }
          this.tableData=r.data.resultList;//表格数据
          this.currentPage = r.data.currentPage;
        }
      })
    },
    checkRow(row){//列表单选操作
      console.log(row);
      this.radio=row.I_SERIAL
    },
    download(){
      // console.log(format(new Date(),'yyyy-MM-dd hh:mm:ss'));
      // console.log(this.$api.rootUrl+"/manage-platform/iapi/export/three");
      axios({
       method: 'post',
       // url: 'http://192.168.99.206:8080/manage-platform/iapi/export/three',
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
    tableDown(){//导出iapi查询列表
      axios({
       method: 'post',
       // url: 'http://192.168.99.247:8080/manage-platform/iapi/exportFileIo/1/600',
       url: this.$api.rootUrl+"/manage-platform/iapi/exportFileIo/1/600",
       data: {
           "exclTitles": this.checkList,
           "cdtList":this.rows
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
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
        this.currentPage = 1;
        this.batchQueryList(this.currentPage,this.showCount,this.rows);
      }else if(this.bigBase == 1){
        this.currentPage = 1;
        this.batchQueryListPnr(this.currentPage,this.showCount,this.rows);
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
        page : this.$route.query.page
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
        page : this.$route.query.page,
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
              endArrivdate:'',
              cityfromNameEqual:'',
              citytoNameEqual:''
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
          page:this.$route.query.page
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
    batchPlanSave(){//批量 方案保存是否重名
      if(this.ppp==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let  batch = {
        name : this.ppp,
        page : this.$route.query.page
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
    batchSavePlan(){//批量查询 保存方案
      this.$options.methods.showConfiglistArr.bind(this)();//展示项数组
      let batchSP = {
        "name" : this.ppp,
        "page" : this.$route.query.page,
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
