<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <!-- <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">洲：</span>
              <el-select placeholder="请选择" v-model="cdt.CONTINENTS_CODE" filterable clearable @visible-change="chau" @change="nationality(cdt.CONTINENTS_CODE)" size="small"  class="input-input">
                <el-option
                  v-for="item in chauName"
                  :key="item.code"
                  :value="item.code"
                  :label="item.code+' - '+item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select placeholder="请选择" v-model="cdt.COUNTRY_CODE" filterable clearable size="small"  class="input-input" @visible-change="baseNation" @change="cityAble(cdt.COUNTRY_CODE)">
                <el-option
                  v-for="item in selection"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">城市：</span>
              <el-select placeholder="请选择" v-model="cdt.CITY_CODE" filterable clearable size="small"  class="input-input" @visible-change="city" :disabled="able">
                <el-option
                  v-for="item in cityName"
                  :key="item.citycode"
                  :value="item.citycode"
                  :label="item.citycode+' - '+item.cityname"
                ></el-option>
              </el-select>
            </el-col> -->
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.FLT_CODE"  class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出发地：</span>
                <el-cascader
                  @visible-change="handleChange"
                  :options="startPark"
                  :props="props"
                  size="small"
                  v-model="cdt.FLTDEPT"
                  filterable
                  change-on-select
                  class="input-input"
                  clearable
                ></el-cascader>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">目的地：</span>
              <el-cascader
                @visible-change="landing"
                :options="endPark"
                :props="props"
                size="small"
                v-model="cdt.FLTDEST"
                filterable
                change-on-select
                class="input-input"
                clearable
              ></el-cascader>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="cdt.IN_OUT_FLAG" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="1"></el-option>
                <el-option label="O - 出境" value="2"></el-option>
                <el-option label="A - 入出境" value="3"></el-option>
                <!-- <el-option label="全部" value=""></el-option> -->
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker
                  v-model="cdt.SCHEDULEDEPARTURETIMESTR"
                  type="datetime" size="small"
                  placeholder="开始日期"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyyMMddHHmm"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                   v-model="cdt.SCHEDULEARRIVETIMESTR"
                   type="datetime" size="small"
                   placeholder="结束日期"
                   format="yyyy-MM-dd HH:mm"
                   value-format="yyyyMMddHHmm"
                   :picker-options="pickerOptions1">
               </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt,order,direction)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" name="xzhblbgl_add" @click="adds(0,'');form={}">新增</el-button>
        <el-button type="success" size="small" name="xzhblbgl_batch_import" @click="batchI">批量导入</el-button>
        <el-button type="success" size="small" name="xzhblbgl_template_download" @click="download">模板下载</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @sort-change='sortChange'
        @header-click="headerClick">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="FLT_CODE"
          label="航班号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="IN_OUT_FLAG"
          label="出入标识"
          sortable>
          <template slot-scope="scope">
            {{scope.row.IN_OUT_FLAG | fifterInOut}}
          </template>
        </el-table-column>
        <el-table-column
          prop="CITYFROMNAME"
          label="出发地"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CITYTONAME"
          label="目的地"
          sortable>
        </el-table-column>
        <el-table-column
          prop="SCHEDULEDEPARTURETIMESTR"
          label="航班开始日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="SCHEDULEARRIVETIMESTR"
          label="航班结束日期"
          sortable>
        </el-table-column>
        <!-- <el-table-column
          label="洲"
          sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.CONTINENTS_NAME+' | '+scope.row.DESTAIRPORT.CONTINENTS_NAME}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="国籍/地区"
          sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.COUNTRY_NAME+' | '+scope.row.DESTAIRPORT.COUNTRY_NAME}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="城市"
          sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.CITY_NAME+' | '+scope.row.DESTAIRPORT.CITY_NAME}}</span>
            <span v-else></span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="操作" width="80">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" name="xzhblbgl_edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" name="xzhblbgl_del" @click="deletes(scope.row)"></el-button>
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
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="FLT_CODE" data-type="input"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FLT_CODE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="AIRWAY_CODE" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航线：</span>
            <el-select placeholder="请选择" v-model="form.AIRWAY_CODE" filterable clearable @visible-change="takeLine" size="small" class="yy-input-input">
              <el-option
              v-for="item in takeOffLine"
              :key="item.AIRWAY_CODE"
              :value="item.AIRWAY_CODE"
              :label="item.AIRWAY_CODE+' - '+item.AIRLINE_DESC">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="SCHEDULEDEPARTURETIMESTR" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航班开始时间：</span>
              <el-date-picker
              v-model="form.SCHEDULEDEPARTURETIMESTR"
              type="datetime" size="mini"
              placeholder="请选择航班开始时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="SCHEDULEARRIVETIMESTR" data-type="select"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>航班结束时间：</span>
              <el-date-picker
              v-model="form.SCHEDULEARRIVETIMESTR"
              type="datetime" size="mini"
              placeholder="请选择航班结束时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm"
              :picker-options="pickerOptions3">
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="SCHEDULE_CODE" data-type="textarea"
          v-validate-easy="[['required']]">
            <span class="yy-input-text"><i class="t-must">*</i>班期：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.SCHEDULE_CODE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- action="http://192.168.99.248:8081/manage-platform/flightManage/importFlightManage" -->
    <el-dialog title="批量导入" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="importform" ref="importForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="file"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :action="$api.rootUrl+'/manage-platform/flightManage/importFlightManage'"

          :on-success="uploadSuccess"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload" size="small">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate,format,timestampToTime} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  data() {
    return {
      order:'',
      direction:0,
      props: {
          value: 'CODE',
          label:'ENAME',
          children: 'childList'
        },
      tp: 0,
      ssssssss:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      cdt:{
        SCHEDULEDEPARTURETIMESTR:'',
        SCHEDULEARRIVETIMESTR:''
      },
      nation: [],
      company: [],
      endPark:[],
      chauName:[],
      selection:[],
      cityName:[],
      takeOffLine:[],
      able:true,

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,
      uploadDialogVisible:false,
      importform:{},

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
            if (this.cdt.SCHEDULEARRIVETIMESTR != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.SCHEDULEARRIVETIMESTR;
            }else if(this.cdt.SCHEDULEARRIVETIMESTR == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let todayS =  (this.cdt.SCHEDULEDEPARTURETIMESTR).slice(0,8);
          let currentTime = formatDate(new Date(time.getTime()),'yyyyMMdd');
          let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
          if((todayS==currentTime)){
            return this.cdt.SCHEDULEDEPARTURETIMESTR>this.cdt.SCHEDULEARRIVETIMESTR
          }else{
           return endT < this.cdt.SCHEDULEDEPARTURETIMESTR;
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
            if (this.form.SCHEDULEARRIVETIMESTR != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.form.SCHEDULEARRIVETIMESTR;
            }else if(this.form.SCHEDULEARRIVETIMESTR == null){
              return false
            }
        }
      },
      pickerOptions3: {
          disabledDate: (time) => {
            let todayS =  (this.form.SCHEDULEDEPARTURETIMESTR).slice(0,8);
            let currentTime = formatDate(new Date(time.getTime()),'yyyyMMdd');
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            if(todayS==currentTime){
              return this.form.SCHEDULEDEPARTURETIMESTR>this.form.SCHEDULEARRIVETIMESTR
            }else{
              return endT < this.form.SCHEDULEDEPARTURETIMESTR;
            }

        }
      },
      form: {
        SCHEDULEARRIVETIMESTR:'',
        SCHEDULEDEPARTURETIMESTR:''
      },
      dform: {},
      startPark:[],
    }
  },
  mounted() {
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.cdt.SCHEDULEDEPARTURETIMESTR=formatDate(flightStart,'yyyyMMddhhmm');
    this.cdt.SCHEDULEARRIVETIMESTR=formatDate(end,'yyyyMMddhhmm');

    // if(this.cdt.SCHEDULEDEPARTURETIMESTR.slice(0,8)=this.cdt.SCHEDULEARRIVETIMESTR.splice(0,8) = formatDate(newDate(),'yyyyMMdd'){
    //   return this.cdt.SCHEDULEDEPARTURETIMESTR<this.cdt.SCHEDULEARRIVETIMESTR
    // }
    // console.log()
    // this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
  },
  activated() {
    this.btnctlFn(this.$root.checkItem);
  },
  methods: {
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    //时间转换
    timePlace(val){
      let y = val.substring(0,4);
      let m = val.substring(4,6);
      let d = val.substring(6,8);
      let h = val.substring(8,10);
      let s = val.substring(10,12);
      return y+'-'+m+'-'+d+' '+h+':'+s;
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    queryNationality() {
      this.$api.post('/manage-platform/userSys/goAdd', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },
    download(){
      window.location.href=this.$api.rootUrl+'/manage-platform/templateFile/flt_temple.xlsx'
      // window.location.href='http://192.168.99.245:8080/manage-platform/templateFile/flt_temple.xlsx'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val, this.cdt,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize, this.cdt,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd,order,direction) {
      console.log(this.cdt.FLTDEPT)
      if(this.cdt.SCHEDULEDEPARTURETIMESTR==''||this.cdt.SCHEDULEARRIVETIMESTR==''||this.cdt.SCHEDULEDEPARTURETIMESTR==null||this.cdt.SCHEDULEARRIVETIMESTR==null){
        this.$message({
          message: '航班日期不能为空',
          type: 'warning'
        });
        return
      }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
        "order":order,
        "direction":direction
      };
      this.$api.post('/manage-platform/flightManage/queryListPage', p,
        r => {
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },
    takeLine(){//航线
      this.$api.post('/manage-platform/codeTable/queryAirline',{},
       r =>{
         if(r.success){
           this.takeOffLine = r.data;
         }
       })
    },
    handleClose(){//关闭文件上传模态框
      this.cancelUpload();
    },
    cancelUpload(){
      this.$refs.upload.clearFiles();
      this.uploadDialogVisible=false;
    },
    batchI(){//批量导入
      if( this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
      this.uploadDialogVisible = true;
    },
    uploadSuccess(response, file, fileList){
      console.log(response);
      if(response.success){
        this.uploadDialogVisible=false;
        this.rows = response.data.cdtList;
        this.$refs.upload.clearFiles();
        this.$message({
          duration:3000,
          message: response.data,
          type: 'success'
        });
        this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
      }else{
        this.$message({
          duration:6000,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: response.message,
          type: 'warning'
        });
        this.uploadDialogVisible=false;
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
    beforeUpload(file){
      console.log(file);
    },
    submitUpload() {
      console.log(this.$refs.upload);
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
    chau(){//调用洲
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.chauName = r.data;
         };
       })
    },
    nationality(data){//基础查询国籍与洲二级联动
      this.$set(this.cdt,'COUNTRY_CODE','');
      let arr=this.chauName;
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].code == data){
          that.selection=arr[i].countryList;
        }
      }
    },
    baseNation(){
      if(this.cdt.CONTINENTS_CODE==undefined||this.cdt.CONTINENTS_CODE==''){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
         r => {
           if(r.success){
             this.selection = r.data;
           };
         })
      }
    },
    cityAble(val){
      this.$set(this.cdt,'CITY_CODE','');
      if(val==undefined||val==''){
        this.able=true;
      }else{
        this.able=false;
      }
    },
    city(){//调用城市
      var countryCode='';
      countryCode = this.cdt.COUNTRY_CODE
      let p = {
        'countryCode':countryCode
      }
      this.$api.post('/manage-platform/codeTable/queryCity',p,
       r =>{
         if(r.success){
            this.cityName = r.data;
         }
       })
    },
    adds(n, i) {
      this.addDialogVisible = true;
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        delete this.form.FLTDEPT;
        delete this.form.FLTDEST;
        this.form.SCHEDULEDEPARTURETIMESTR=formatDate(new Date(this.form.SCHEDULEDEPARTURETIMESTR),'yyyyMMddhhmm');
        this.form.SCHEDULEARRIVETIMESTR=formatDate(new Date(this.form.SCHEDULEARRIVETIMESTR),'yyyyMMddhhmm');
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
      this.V.$reset('demo2')
    },
    addItem(formName) {
      this.V.$submit('demo2', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        var url = "/manage-platform/flightManage/changFlightManage";
        this.$api.post(url, this.form,
          r => {
            console.log(r);
            if (r.success) {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.addDialogVisible = false;
            }
            this.$refs[formName].resetFields();
            this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
            // this.tableData=r.Data.ResultList;
          }, e => {
            this.$message.error('失败了');
          })
      })
    },

    deletes(i) {
      let p = {
        "FLT_CODE": i.FLT_CODE
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/flightManage/deleteFlightManage', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleChange(value){//调用起飞机场
      let p={
        'flighttype':this.cdt.IN_OUT_FLAG,
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
        'flighttype':this.cdt.IN_OUT_FLAG,
        'citytype':'cityto'
      }
      this.$api.post('/manage-platform/codeTable/queryAirportCascade',p,
       r =>{
         if(r.success){
           this.endPark = r.data;
         }
       })
    },
  },
  filters: {
    fiftertype(val) {
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
      }
    },
    fifterInOut(val){
      if(val == '1'){
        return "入境"
      }else if(val == '2'){
        return "出境"
      }else if(val == '3'){
        return "出入境"
      }
    },
  }
}

function checkRate(nubmer) {　　
  var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  　　　　
  if (!re.test(nubmer)) {　　　　
    return false;　　
  }
  return true;
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

.yy-input-text {
  width: 25% !important;
}
.width-ts{
  width: 20.3%!important;
}
</style>
