<template lang="html">
  <div class="">
    <div class="">
    <div class="ak-tab-pane">
      <el-row type="flex" style="height:100%">
        <el-col :span="22" class="br flex-c pr-20">
          <div style="display:flex;justify-content: flex-end;width:100%;margin-bottom:15px">
            <el-button type="primary" plain name="button" @click="openL" size="mini">{{listText}}</el-button>
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input"></el-input>
            </el-col>

            <!-- <el-col :sm="24" :md="12" :lg="6" class="input-item">
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
              <span class="input-text">国籍/地区：</span>
              <el-select placeholder="请选择" v-model="cdt.nationalityEqual" filterable clearable size="small"  class="input-input" @visible-change="baseNation">
                <el-option
                  v-for="item in selection"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
              </el-select>
            </el-col> -->

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">姓名：</span>
              <div class="input-input t-fuzzy t-flex">
                <el-input placeholder="请输入内容" v-model="cdt.familyname" size="small"></el-input>
                <el-checkbox v-model="cdt.isBlurred">模糊查询</el-checkbox>
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

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <!-- <el-option label="G - 过境" value="G"></el-option>
                <el-option label="全部" value=""></el-option> -->
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">机场：</span>
              <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">订票号：</span>
              <el-input placeholder="请输入内容" v-model="cdt.passportnoEqual" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">航空公司：</span>
              <el-select v-model="cdt.flighttypeEqual" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" v-model="cdt.fltnoEqual" size="small" class="input-input"></el-input>
            </el-col>


            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker
                  v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                  v-model="cdt.startFlightDepartdate"
                  type="date" size="small"
                  placeholder="开始日期"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                   v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                   v-model="cdt.endFlightDepartdate"
                   type="date" size="small"
                   placeholder="结束日期"
                   format="yyyy-MM-dd"
                   value-format="yyyyMMdd"
                   :picker-options="pickerOptions1">
               </el-date-picker>
              </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
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

            <!-- 展开收起项 -->
            <div class="" v-show="openList">
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
              <span class="input-text">校验结果：</span>
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
                <span class="planItem">{{item}}</span>
                <span class="planDelete el-icon-circle-close" @click.stop="deleteItem(item)"></span>
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
          <el-button type="success" class="mb-15" size="small" @click="getList(currentPage,showCount,cdt);">查询</el-button>
          <el-button type="primary" plain size="small" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
    <!-- 展示项 -->
    <div class="middle middle-top mb-2 mt-20">
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
  </div>
</template>

<script>
import Seat from '../../other/seat'
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  components: {AlarmProcess},
  components: {Seat},
  data(){
    return{
      listText:'收起',
      text:'收起',
      openList:true,
      openCheckbox:true,
      //方案
      ssss:'',//保存方案渲染
      sss:'',//方案名称渲染
      saveName:[],//保存方案数组
      formLabelWidth:'120px',
      dialogVisible:false,
      //表格数据
      tableData:[],
      radio:'',//表格单选按钮
      currentPage:1,//当前页数
      pageSize:10, //每页显示个数选择器的选项设置
      showCount:10,//每页显示的记录数
      totalResult:0,//总条数
      totalPage:1,//总页数
      releaseform:{},
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
      //查询条件
      cdt:{
        isBlurred:false,
        startFlightDepartdate:'',
        endFlightDepartdate:'',
      },
      takeOffName:[],
      landingName:[],
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

    }
  },
  mounted(){
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.cdt.startFlightDepartdate=formatDate(flightStart,'yyyyMMdd');
    this.cdt.endFlightDepartdate=formatDate(end,'yyyyMMdd');
    this.takeOff();
    this.landing();
  },
  methods:{
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
    checkRow(row){//列表单选操作
      console.log(row);
      this.radio=row.I_SERIAL
    },

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
    //-------------------------------------保存方案-------------------------------------------
    savePlanShow(){// 基础查询方案名称列表
      let sn = {
        page : this.$route.query.page
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
          page : this.$route.query.page,
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
          page:this.$route.query.page
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
    planSave(){//基础查询 方案保存是否重名
      if(this.sss==''){
        this.$alert('方案名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let tps = {
        name : this.sss,
        page : this.$route.query.page
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
        	"page":  this.$route.query.page,
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
    //==============查询===========================
    getList(currentPage,showCount,cdt){//基础查询 查询调用
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

      let pl={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"cdt":cdt
      };
      this.$api.post('/manage-platform/iapi/queryListPage',pl,
       r => {
         if(r.data.nextState==0){
           console.log(document.getElementsByClassName('btn-next')[0])
           document.getElementsByClassName('btn-next')[0].disabled=true;
         }else{
           document.getElementsByClassName('btn-next')[0].disabled=false;
         }
         this.tableData=r.data.resultList;//表格数据
         this.currentPage = r.data.currentPage;
      })
    },
    reset(){
      this.cdt={isBlurred:false};
      this.ssss='';
      this.tableData=[];
    },
    pageSizeChange(val) {//显示条数，调用
      this.getList(this.currentPage,val,this.cdt);
    },
    handleCurrentChange(val){
      this.getList(val,this.showCount,this.cdt);
    },
    //===========================打印导出================================
    tableDown(){
      axios({
       method: 'post',
       // url: 'http://192.168.99.245:8080/manage-platform/iapi/exportFileIo/0/600',
       url: this.$api.rootUrl+"/manage-platform/iapi/exportFileIo/0/600",
       data: {
           "exclTitles": this.checkList,
           "cdt":this.cdt
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
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
  },
}
</script>

<style scoped>

</style>
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
