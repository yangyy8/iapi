<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">洲：</span>
              <el-select placeholder="请选择" v-model="cdt.continentsCode" filterable clearable @visible-change="chau(0)" @change="nationality(cdt.continentsCode,0)" size="small"  class="input-input">
                <el-option
                  v-for="(item,index) in chauName"
                  :key="index"
                  :value="item.code"
                  :label="item.code+' - '+item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select placeholder="请选择" v-model="cdt.countryCode" filterable clearable size="small"  class="input-input" @visible-change="baseNation(0)" @change="cityAble(cdt.countryCode,0)">
                <el-option
                  v-for="(item,index) in selection"
                  :key="index"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">城市：</span>
              <el-select placeholder="请选择" v-model="cdt.cityCode" filterable clearable size="small"  class="input-input" @visible-change="city(0)" :disabled="able">
                <el-option
                  v-for="(item,index) in cityName"
                  :key="index"
                  :value="item.citycode"
                  :label="item.citycode+' - '+item.cityname"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">机场：</span>
              <el-select placeholder="请选择" v-model="cdt.airportCode" filterable clearable @visible-change="takeOff(0)" size="small" class="input-input">
                <el-option
                v-for="(item,index) in takeOffName"
                :key="index"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt);">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'')">新增</el-button>
        <el-button type="success" size="small" @click="batchI">批量导入</el-button>
        <el-button type="success" size="small" @click="download">模板下载</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="airportCode"
          label="机场三位码">
        </el-table-column>
        <el-table-column
          prop="airportName"
          label="机场名称">
        </el-table-column>
        <el-table-column
          prop="continentsName"
          label="洲">
        </el-table-column>
        <el-table-column
          prop="countryName"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="城市">
        </el-table-column>
        <el-table-column
          label="经度">
          <template slot-scope="scope">
            <span v-if="scope.row.jingdu">{{scope.row.jingdu + '°'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="纬度">
          <template slot-scope="scope">
            <span v-if="scope.row.weidu">{{scope.row.weidu + '°'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="airportDesc"
          label="机场描述">
        </el-table-column> -->
        <el-table-column
          label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="detail(scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>机场三位码：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.airportCode"  maxlength="3" class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}" :disabled="airCodeAble"></el-input>
            <!-- <el-select placeholder="请选择" v-model="form.airportCode" filterable clearable @visible-change="takeOff(1)" size="small" class="yy-input-input" @change="takeOffReal(form.airportCode)">
              <el-option
              v-for="(item,index) in addTakeOffName"
              :key="index"
              :value="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE">
              </el-option>
            </el-select> -->
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>机场名称：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.airportName"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}" :disabled="airCodeAble"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>洲：</span>
            <el-select v-model="form.continentsCode"  filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="chau(1)" @change="nationality(form.continentsCode,1)" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
                v-for="(item,index) in addChauName"
                :key="index"
                :value="item.code"
                :label="item.code+' - '+item.name"
              ></el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>国籍/地区：</span>
            <el-select v-model="form.countryCode"  filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="baseNation(1)" @change="cityAble(form.countryCode,1)" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
                v-for="(item,index) in addSelection"
                :key="index"
                :value="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
              ></el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>城市：</span>
            <el-select v-model="form.cityCode"  filterable clearable placeholder="请选择" size="small" class="yy-input-input" @visible-change="city(1)" :disabled="addAble" @change="cityReal(form.cityCode)" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
                v-for="(item,index) in addCityName"
                :key="index"
                :value="item.citycode"
                :label="item.citycode+' - '+item.cityname"
              ></el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>经度：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.jingdu"  class="yy-input-input" v-verify.change.blur ="{regs:'required|number',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>纬度：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.weidu"  class="yy-input-input" v-verify.change.blur ="{regs:'required|number',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>机场描述：</span>
            <el-input placeholder="请输入内容" size="small" type="textarea" v-model="form.airportDesc"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem()" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- action="http://192.168.99.206:8080/manage-platform/airportManage/importFlightManage" -->

    <el-dialog title="批量导入" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="importform" ref="importForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="file"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :action="$api.rootUrl+'/manage-platform/airportManage/importFlightManage'"
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
    <el-dialog title="详情" :visible.sync="detailsDialogVisible" >
      <el-row type="flex"  class="mb-6" style="padding-left:30px">
        <el-col :span="6" class="t-el-content"><div class="t-el-text">机场名称：</div><div class="t-el-sub">{{qform.airportName}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">洲：</div><div class="t-el-sub">{{qform.continentsName}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍/地区：</div><div class="t-el-sub">{{qform.countryName}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">城市：</div><div class="t-el-sub">{{qform.cityName}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text" style="width:12.3%!important">机场描述：</span>
          <el-input type="textarea" v-model="qform.airportDesc" :autosize="{ minRows: 5, maxRows: 6}" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <!-- <span class="detailClass">{{content}}</span> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      cdt:{},

      selection:[],
      addSelection:[],

      chauName:[],
      addChauName:[],

      takeOffName:[],
      addTakeOffName:[],

      cityName:[],
      addCityName:[],

      able:true,
      addAble:true,
      airCodeAble:false,

      pd: {},
      nation: [],
      company: [],
      content:'',

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      sendDialogVisible:false,
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
      form: {},
      dform: {},
      qform:{},
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  methods: {
    queryNationality() {
      this.$api.post('/manage-platform/userSys/goAdd', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },
    detail(item){
      this.detailsDialogVisible = true;
      this.qform = item;
      // this.content = item;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.cdt);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.cdt);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/airportManage/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    download(){
      window.location.href=this.$api.rootUrl+'/manage-platform/templateFile/airport_temple.xlsx'
      // window.location.href='http://192.168.99.245:8080/manage-platform/templateFile/airport_temple.xlsx'
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
        this.getList(this.CurrentPage, this.pageSize, this.cdt);
      }else{
        // alert(response.message);
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
    chau(type){//调用洲
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           if(type==0){
             this.chauName = r.data;
           }else if(type==1){
             this.addChauName = r.data;
           }

         };
       })
    },
    nationality(data,type){//基础查询国籍与洲二级联动
      if(type==0){
        console.log(data);
        this.$set(this.cdt,'countryCode','');
        this.$set(this.cdt,'cityCode','');
        this.cityAble(this.form.countryCode,0)
        let arr=this.chauName;
        let that=this;
        for(var i=0;i<arr.length;i++){
          if(arr[i].code == data){
            that.selection=arr[i].countryList;
          }
        }
      }else if(type==1){
        this.$set(this.form,'countryCode','');
        this.$set(this.form,'cityCode','');
        this.cityAble(this.form.countryCode,1)
        let arr=this.addChauName;
        let that=this;
        for(var i=0;i<arr.length;i++){
          if(arr[i].code == data){
            that.addSelection=arr[i].countryList;
            this.form.continentsName = arr[i].name;
          }
        }
      }

    },
    baseNation(type){
      if((this.cdt.continentsCode==undefined||this.cdt.continentsCode=='')&&type==0){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
         r => {
           if(r.success){
             this.selection = r.data;
           };
         })
      }else if((this.form.continentsCode==undefined||this.form.continentsCode=='')&&type==1){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
         r => {
           if(r.success){
             this.addSelection = r.data;
           };
         })
      }
    },
    city(type){//调用城市
      var countryCode='';
      if(type==0){
        countryCode = this.cdt.countryCode
      }else if(type==1){
        countryCode = this.form.countryCode
      }
      let p = {
        'countryCode':countryCode
      }
      this.$api.post('/manage-platform/codeTable/queryCity',p,
       r =>{
         if(r.success){
           if(type==0){
             this.cityName = r.data;
           }else if(type==1){
             this.addCityName = r.data;
           }

         }
       })
    },
    cityReal(val){
      let arr = this.addCityName;
      let that = this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].citycode == val){
          this.form.cityName = arr[i].cityname
        }
      }
    },
    takeOff(type){//调用起飞机场
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           if(type==0){
             this.takeOffName = r.data;
           }else if(type==1){
             this.addTakeOffName = r.data;
           }
         }
       })
    },
    takeOffReal(val){
      this.$set(this.form,'airportName','');
      let arr = this.addTakeOffName;
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].AIRPORT_CODE == val){
          that.form.airportName = arr[i].AIRPORT_NAME;
        }
      }
    },
    cityAble(val,type){
      if(val==undefined||val==''){
        if(type==0){
          this.$set(this.cdt,'cityCode','');
          this.able=true;
        }else if(type==1){
          this.$set(this.form,'cityCode','');
          this.addAble=true;
        }
      }else{
        if(type==0){
          this.able=false;
        }else if(type==1){
          this.addAble=false;
          let arr = this.addSelection;
          let that = this;
          for(var i=0;i<arr.length;i++){
            if(arr[i].CODE == val){
              this.form.countryName = arr[i].CNAME
            }
          }
        }
      }
    },
    adds(n, i) {//新增&编辑
      this.addDialogVisible = true;
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.form.type=this.tp;
        this.airCodeAble = true;
        this.dialogText="编辑";
        this.form.continentsCode = i.continentsName;
        this.form.countryCode = i.countryName;
        this.form.cityCode = i.cityName;
        this.cityAble(this.form.countryCode,1);
      }else {
        this.tp = 0;
        this.dialogText="新增";
        this.airCodeAble = false;
        this.form={};
        this.cityAble(this.form.countryCode,1);
        this.form.type=this.tp;
      }

    },
    addItem() {//新增完成
      console.log(this.$validator)
      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return;
        }
      }
      this.$api.post('/manage-platform/airportManage/changFlightManage', this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.addDialogVisible = false;
          }
          this.getList(this.CurrentPage, this.pageSize, this.cdt);
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },

    deletes(i) {
      let p = {
        "airportCode": i.airportCode
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/airportManage/deleteFlightManage', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.cdt);
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
  },
  filters: {
    fiftertype(val) {
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
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
.detailClass{
  display: inline-block;
  line-height: 30px;
  text-indent:28px;
}
</style>
