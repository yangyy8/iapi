<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltno"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.scheduledeparturetime"
               type="date" size="small"
               placeholder="开始时间"
               format="yyyy-MM-dd"
               value-format="yyyyMMdd"
               :picker-options="pickerOptions">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.schedulearrivetime"
                type="date" size="small"
                placeholder="结束时间"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>

            <!-- <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">查询范围：</span>
              <el-select v-model="pd.type" placeholder="请选择" filterable clearable size="small" class="input-input" @change="fightDate">
                 <el-option value="0" label="当前查询"></el-option>
                 <el-option value="1" label="历史查询"></el-option>
               </el-select>
            </el-col> -->

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input" @change="ftReal">
                 <el-option value="I" label="I - 入境"></el-option>
                 <el-option value="O" label="O - 出境"></el-option>
                 <el-option value="A" label="A - 入出境"></el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班状态：</span>
              <el-select v-model="pd.status" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="0 - 计划" value="0"></el-option>
                <el-option label="1 - 已预检" value="1"></el-option>
                <el-option label="2 - 已起飞" value="3"></el-option>
                <el-option label="3 - 已到达" value="6"></el-option>
                <el-option label="4 - 已办理入境手续" value="4"></el-option>
                <el-option label="5 - 已取消" value="5"></el-option>
                <el-option label="6 - 无关闭报文" value="7"></el-option>
                <el-option label="7 - 无值机报文" value="8"></el-option>
               </el-select>
            </el-col>

            <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">起飞机场：</span>
              <el-select placeholder="请选择" v-model="pd.stationfrom" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">到达机场：</span>
              <el-select placeholder="请选择" v-model="pd.stationto" filterable clearable @visible-change="landing" size="small" class="input-input">
                <el-option
                v-for="item in landingName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col> -->
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">起飞机场：</span>
                <el-cascader
                  @visible-change="handleChange"
                  :options="startPark"
                  :props="props"
                  size="small"
                  v-model="pd.stationfromList"
                  filterable
                  change-on-select
                  class="input-input"
                  clearable
                ></el-cascader>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">到达机场：</span>
              <el-cascader
                @visible-change="landing"
                :options="endPark"
                :props="props"
                size="small"
                v-model="pd.stationtoList"
                filterable
                change-on-select
                class="input-input"
                clearable
              ></el-cascader>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">所属航空公司：</span>
              <el-select v-model="pd.airlineCompanyId" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="(item,ind) in company"
                  :key="ind"
                  :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                  :value="item.AIRLINE_CODE" >
                </el-option>
               </el-select>
            </el-col>
            <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">口岸：</span>
              <el-select  v-model="pd.port" @change="airportReal" placeholder="请选择" filterable clearable size="small" class="input-input" @visible-change="queryAirport">
                <el-option
                  v-for="item in airport"
                  :key="item.KADM"
                  :label="item.KADM+' - '+item.KAMC"
                  :value="item.KADM">
                </el-option>
              </el-select>
            </el-col> -->

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" >
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd,order,direction)" class="mb-15">查询</el-button>
          <el-button type="primary" class="mb-15" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">

      <el-table
         ref="sort"
        :data="tableData"
        class="o-table3"
        border
        @header-click="headerClick"
        @sort-change='sortChange'
        style="width: 100%;"
        @cell-click="rowClick">
        <el-table-column
          sortable='custom'
          prop="fltno"
          label="航班号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="fltDateStr"
          sortable='custom'
          label="航班日期">
        </el-table-column>
        <el-table-column
          prop="flighttype"
          label="出入标识"
          width="100px"
          sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.flighttype | fifter1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="airwayMessage"
          label="航线"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="departuretimeStr"
          sortable='custom'
          label="计划起飞时间"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="arrivetimeStr"
          sortable='custom'
          label="计划降落时间"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="status"
          label="航班状态"
          width="120px">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status==0" class="s0">计划</span>
              <span v-if="scope.row.status==1" class="s1">已预检</span>
              <span v-if="scope.row.status==3" class="s2">已起飞</span>
              <span v-if="scope.row.status==6" class="s3">已到达</span>
              <span v-if="scope.row.status==4" class="s4">已办理入境手续</span>
              <span v-if="scope.row.status==5" class="s5">已取消</span>
              <span v-if="scope.row.status==7" class="s6">无关闭报文</span>
              <span v-if="scope.row.status==8" class="s7">无值机报文</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkincount"
          label="值机人数">
        </el-table-column>
        <el-table-column
          prop="boardingcount"
          label="登机人数">
            <el-table-column
            prop="boardingcount"
            label="已登机"
            width="120">
          </el-table-column>
          <el-table-column
            prop="chkNobrd"
            label="未登机"
            width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="closetime"
          label="关闭报文">
          <template slot-scope="scope">
            {{scope.row.closetimeStr}}
          </template>
        </el-table-column>
        <el-table-column
          label="座位"
          width="70">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="座位详情" icon="el-icon-tickets" name="hbxxcx_seat_detail" @click="details(scope.row)"></el-button>
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
    <el-dialog
      title="座位详情"
      :visible.sync="seatDialogVisible"
      width="1220px"
      >
      <Seat :flightNumber="flightNumber0" :globalserial="globalserial0" :FLTNO="FLTNO0" :FLTDATE="FLTDATE0" :seatType="1" :specifigseat="specifigseat0" :CHK_SERIAL="CHK_SERIAL0"></Seat>
    </el-dialog>

    <el-dialog
      :title="detailsTitle"
      :visible.sync="numberDialogVisible"
      width="1000px">
      <el-button  plain class="table-btn mb-9" size="small" @click="daochu">导出</el-button>
      <el-row type="flex"  class="mb-6">
        <el-col :span="12" class="input-item">
          <span class="yy-input-text width-dq">航班号：</span>
          <el-input placeholder="请输入内容" size="small" v-model="detailForm.fight" class="yy-input-input" :disabled="true"></el-input>

        </el-col>
        <el-col :span="12" class="input-item">
          <span class="yy-input-text width-dqd">航班日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="detailForm.fightDate" class="yy-input-input" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableInfo"
        border
        style="width: 100%;">
        <el-table-column
          prop="CNAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="GENDERNAME"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="BIRTHDAYSTR"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码">
        </el-table-column>
      </el-table>
      <div class="">
        共{{numberTotal}}条
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="numberDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import Seat from '../../other/seat'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  components: {Seat},
  data() {
    return {
      detailsTitle:'值机人员详情',
      detailForm:{},
      order:'',
      direction:0,
      numberTotal:0,
      numberDialogVisible:false,
      tableInfo:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {
        schedulearrivetime:'',
        scheduledeparturetime:''
      },
      checkList:['CNAME','GENDERNAME','BIRTHDAYSTR','NATIONALITYNAME','PASSPORTNO'],
      propertiesKeyAndName:{
        "CNAME":'姓名',
        'GENDERNAME':'性别',
        'BIRTHDAYSTR':'出生日期',
        'NATIONALITYNAME':'国籍/地区',
        'PASSPORTNO':'证件号码'
      },
      nation: [],
      company:[],
      airport:[],
      takeOffName:[],
      landingName:[],
      addDialogVisible: false,
      detailsDialogVisible: false,
      seatDialogVisible:false,
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
      multipleSelection: [],
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.schedulearrivetime != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMdd');
              return startT > this.pd.schedulearrivetime;
            }else if(this.pd.schedulearrivetime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMdd');
            return endT < this.pd.scheduledeparturetime;
        }
      },
      form: {},
      flightNumber0:'',
      globalserial0:'',
      specifigseat0:'',
      FLTNO0:'',
      FLTDATE0:'',
      specifigseat0:'',
      CHK_SERIAL0:'',
      props: {
          value: 'CODE',
          label:'ENAME',
          children: 'childList'
        },
      startPark:[],
      endPark:[],
    }
  },
  mounted() {
    let time = new Date();
    let end = new Date();
    // let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    // let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.pd.scheduledeparturetime=formatDate(time,'yyyyMMdd');
    this.pd.schedulearrivetime=formatDate(end,'yyyyMMdd');
    this.queryNationality();
    // this.queryAirport();
  },
  activated(){
    this.btnctlFn(this.$root.checkItem);
    // let time = new Date();
    // let end = new Date();
    // let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.scheduledeparturetime=formatDate(begin,'yyyyMMddhhmm');
    // this.pd.schedulearrivetime=formatDate(end,'yyyyMMddhhmm');
  },
  methods: {
    // fightDate(){
    //   if(this.pd.type==0){//当前
    //     let time = new Date();
    //     let end = new Date();
    //     this.pd.scheduledeparturetime=formatDate(time,'yyyyMMdd');
    //     this.pd.schedulearrivetime=formatDate(end,'yyyyMMdd');
    //   }else if(this.pd.type==1){//历史
    //     let begin = new Date(new Date() - 1000 * 60 * 60 * 24 * 30);
    //     let end =new Date(new Date() - 1000 * 60 * 60 * 24 * 30);
    //     this.pd.scheduledeparturetime=formatDate(begin,'yyyyMMdd');
    //     this.pd.schedulearrivetime=formatDate(end,'yyyyMMdd');
    //   }
    // },
    handleChange(value){//调用起飞机场
      let p={
        'flighttype':this.pd.flighttype=="I"?'1':this.pd.flighttype=="O"?'2':'3',
        'citytype':'cityfrom'
      }
      this.$api.post('/manage-platform/codeTable/queryAirportCascade',p,
       r =>{
         if(r.success){
           this.startPark = r.data;
         }
       })
    },
    landing(){//调用降落机场
      let p={
        'flighttype':this.pd.flighttype=="I"?'1':this.pd.flighttype=="O"?'2':'3',
        'citytype':'cityto'
      }
      this.$api.post('/manage-platform/codeTable/queryAirportCascade',p,
       r =>{
         if(r.success){
           this.endPark = r.data;
         }
       })
    },
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
    reset(){
      this.pd={schedulearrivetime:'',scheduledeparturetime:''};
      let time = new Date();
      let end = new Date();
      this.pd.scheduledeparturetime=formatDate(time,'yyyyMMdd');
      this.pd.schedulearrivetime=formatDate(end,'yyyyMMdd');

      this.$nextTick(()=>{
        let sortArr = this.$refs.sort.$children
        for(var i=0;i<sortArr.length;i++){
          if(sortArr[i].columnConfig&&sortArr[i].columnConfig.order){
            sortArr[i].columnConfig.order = ''
            return false
          }
        }
      })
      this.direction=0;
      this.order='';
      this.CurrentPage=1;
      this.pageSize=10;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
    daochu(){
      axios({
       method: 'post',
       // url: 'http://192.168.99.248:8081/manage-platform/iapiHead/exportGlobalDataIo',
       url: this.$api.rootUrl+"/manage-platform/iapiHead/exportGlobalDataIo",
       data: {
           "exclTitles": this.checkList,
           "propertiesKeyAndName":this.propertiesKeyAndName,
           "resultList":this.tableInfo,
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
    headerClick(column,event){
      console.log(column,event)
      event.target.title=column.label
    },
    zhuanhuan(item){
      if(item == 'checkincount'){
        return 'CHECKINCOUNT'
      }else if(item == 'boardingcount'){
        return 'BOARDINGCOUNT'
      }else if(item == 'chkNobrd'){
        return 'CHK_NOBRD'
      }
    },
    rowClick(row, column, cell, event){
      console.log(row);

      this.detailForm.fight = row.fltno;
      this.detailForm.fightDate = row.fltDateStr;
      if(column.property=='checkincount'||column.property=='boardingcount'||column.property=='chkNobrd'){
        if((column.property=='checkincount'&&row.checkincount==undefined)||(column.property=='boardingcount'&&row.boardingcount==undefined)||(column.property=='chkNobrd'&&row.chkNobrd==undefined)){
          this.$message('没有检索到详情');
          return false
        }
        if(column.property=='checkincount'){
          this.detailsTitle = '值机人员详情'
        }else{
          this.detailsTitle = '登机人员详情'
        }
        let p = {
          'flightRecordnum':row.flightRecordnum,
          'otherStr':this.zhuanhuan(column.property),
          'fltDate':row.fltDate,
          'fltno':row.fltno,
        }
        this.$api.post('/manage-platform/iapiHead/queryIapiTableInfoObject',p,
         r =>{
           if(r.success){
             this.tableInfo = r.data.iapiList;
             this.numberTotal = r.data.count;
             this.numberDialogVisible = true;
           }
         })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val, this.pd,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize, this.pd,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd,order,direction) {
      if(this.pd.scheduledeparturetime==''||this.pd.schedulearrivetime==''||this.pd.scheduledeparturetime==null||this.pd.schedulearrivetime==null){
        this.$message({
         message: '航班日期不能为空',
         type: 'warning'
       });
       return
      }
      // let end = new Date(new Date() - 1000 * 60 * 60 * 24 * 30);
      // let endTime = formatDate(end,'yyyy-MM-dd')
      // if(this.pd.type==0&&(this.pd.scheduledeparturetime<formatDate(end,'yyyyMMdd'))){//当前
      //   this.$alert('查询开始时间不能小于'+endTime+'', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // }
      // if(this.pd.type==1&&(this.pd.schedulearrivetime>formatDate(end,'yyyyMMdd'))){
      //   this.$alert('查询结束时间不能大于'+endTime+'', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // }
      if(dayGap(this.pd.scheduledeparturetime,this.pd.schedulearrivetime,2)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
        "order":order,
        "direction":direction
      };
      this.$api.post('/manage-platform/statusUpdate/flight/queryListPagesNew', p,
        r => {
          if(r.success){
            this.globalserial0 = '';
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
            this.$nextTick(()=>{
              this.btnctlFn(this.$root.checkItem);
            })
          }
        })
    },
    ftReal(){
      this.$set(this.pd,'stationfrom','');
      this.$set(this.pd,'stationto','');
    },
    airportReal(){
      this.$set(this.pd,'stationfrom','');
      this.$set(this.pd,'stationto','');
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryAircompanyList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
    addItem(formName) {
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       console.log(valid)
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      this.$api.post('/manage-platform/nameList/addNameList', this.form,
        r => {
          console.log(r);
          if (r.Success) {
            this.$message({
              message: '恭喜你，添加成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      console.log(i);
      this.seatDialogVisible=true;
      this.flightNumber0 = i.flightRecordnum;
      this.globalserial0=new Date().getTime();
      this.FLTNO0=i.fltno;
      this.FLTDATE0=i.fltDate;
      // this.specifigseat0=i.specifigseat;
      // this.$router.push({query:{flightNumber:i.flightRecordnum}})
    },
    // takeOff(){//调用起飞机场
    //   let p={
    //     "port":this.pd.port,
    //     "flighttype":this.pd.flighttype,
    //     "type":0
    //   }
    //   this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
    //    r =>{
    //      if(r.success){
    //        this.takeOffName = r.data;
    //      }
    //    })
    // },
    // landing(){//调用降落机场
    //   let p={
    //     "port":this.pd.port,
    //     "flighttype":this.pd.flighttype,
    //     "type":1
    //   }
    //   this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
    //    r =>{
    //      if(r.success){
    //        this.landingName = r.data;
    //      }
    //    })
    // },

  },

    filters: {

      fifter1(val) {
        if (val == "I") {
          return "入境";
        } else if(val == "O"){
          return "出境";
        }
      },
      fifter2(val) {
        if (val == "0") {
          return "计划";
        } else if(val == "1"){
          return "已预检";
        }
        else if(val == "3"){
          return "已起飞";
        }
        else if(val == "4"){
          return "已办理入境手续";
        }
        else if(val == "5"){
          return "已取消";
        }
        else if(val == "6"){
          return "已到达";
        }
        else if(val == "7"){
          return "无关闭报文";
        }
        else if(val == "8"){
          return "无值机报文";
        }
      },
      fifter3(val){
        if(val){
          return '是'
        }else{
          return '否'
        }
      },
      filterdate(n)
      {
        if(n=="" || n==null){
          return n;
        }else {
            return n.substring(0,n.length-3);
        }

      }

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
.width-dq{
  width: 12%!important;
}
.width-dqd{
  width: 18%!important;
}
</style>
