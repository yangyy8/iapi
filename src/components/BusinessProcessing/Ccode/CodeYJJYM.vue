<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" data-scope="demo" data-name="type" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><font class="yy-color">*</font>校验码类型：</span>
              <el-select v-model="cdt.type" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="QY - 应急启用校验码" value="QY"></el-option>
                <el-option label="JS -  应急结束校验码" value="JS"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item my-form-group" data-scope="demo" data-name="flighttype" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><font class="yy-color">*</font>出入标识：</span>
              <el-select v-model="cdt.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <!-- <el-option label="A - 入出境" value="A"></el-option> -->
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">适用航空公司：</span>
              <el-select v-model="cdt.aircompanyCodeList" placeholder="请选择" multiple filterable clearable size="small" class="input-input" @visible-change="applicationMethod(cdt.flighttype)">
                <el-option
                v-for="item in application"
                :key="item.AIRLINE_CODE"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">适用机场：</span>
              <el-button type="success" size="small" plain @click="getmodel(cdt.flighttype,0)">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" size="small" plain @click="seeModel(0)">点击查看</el-button>
            </el-col>
            <!-- <el-dialog title="机场选择" :visible.sync="modelDialogVisible" width="640px" :before-close="cancelModel(0)">
              <el-input
                placeholder="输入模型关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                class="filter-tree"
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="CODE"
                :filter-node-method="filterNode"
                :props="defaultProps"
                :default-checked-keys='keys'>
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getCheckedNodes(0)" size="small">确认</el-button>
                <el-button type="primary" @click="resetModel(0)" size="small" plain>重置</el-button>
                <el-button type="warning" @click="cancelModel(0)" size="small">取消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="机场选择详情" :visible.sync="seeModelDialogVisible" width="800px">
              <el-row align="center" style="width:100%">
                <span v-for="(item,ind) in dutyName" :key="ind" style="width:25%;margin-bottom: 7px;display:inline-block;line-height: 20px;">{{item.ENAME}}</span>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="seeModelDialogVisible = false" size="small">取 消</el-button>
              </div>
            </el-dialog> -->

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">生成时间：</span>
              <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="cdt.startCreatetime"
                 type="datetime"
                 size="small"
                 format="yyyy-MM-dd HH:mm:ss"
                 value-format="yyyyMMddHHmmss"
                 placeholder="开始时间"
                 :picker-options="pickerOptions">
                </el-date-picker>
                 <span class="septum">-</span>
                 <el-date-picker
                  v-model="cdt.endCreatetime"
                  type="datetime"
                  size="small"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyyMMddHHmmss"
                  placeholder="结束时间"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">校验码：</span>
              <div class="input-input t-fuzzy t-flex">
                <el-input placeholder="请输入内容" v-model="cdt.emergencyCode" size="small"></el-input>
                <el-checkbox v-model="cdt.isBlurred">模糊查询</el-checkbox>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt,order,direction);">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'')">新增</el-button>
        <el-button type="success" size="small" @click="exportFile()">导出</el-button>
        <el-button type="primary" size="small" plain v-print="'#printMe'">打印</el-button>
        </el-row>
      <el-table
        id='printMe'
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick"
        @sort-change='sortChange'>
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="emergencyCode"
          label="校验码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="createtimeStr"
          label="生成时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="typeStr"
          label="校验码类型"
          sortable>
        </el-table-column>
        <el-table-column
          prop="flighttypeStr"
          label="出入标识"
          sortable>
        </el-table-column>
        <el-table-column
          width="200"
          prop="aircompanyNameStr"
          label="适用航空公司">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.aircompanyList==undefined||scope.row.aircompanyList.length==1"
              popper-class="YymmaxWidth">
              <div class="">
                <el-row class="detailFat" :gutter="10">
                  <el-col :span="8" v-for="(i,ind) in scope.row.aircompanyList" :key="ind"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span class="tt-noWrap" slot="reference">{{(scope.row.aircompanyNameStr==undefined||scope.row.aircompanyNameStr=='null')?'':scope.row.aircompanyNameStr}}</span>
            </el-popover>
          </template>
          </el-table-column>
          <el-table-column
            width="200"
            prop="airportNameStr"
            label="适用机场">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                :disabled="scope.row.airportList==undefined||scope.row.airportList.length==1"
                popper-class="YymmaxWidth">
                <div class="">
                  <el-row class="detailFat" :gutter="10">
                    <el-col :span="8" v-for="(i,ind) in scope.row.airportList" :key="ind"><div class="tipDetail">{{i}}</div></el-col>
                  </el-row>
                </div>
                <span class="tt-noWrap" slot="reference">{{(scope.row.airportNameStr==undefined||scope.row.airportNameStr=='null')?'':scope.row.airportNameStr}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="operateUserName"
            label="操作人员"
            sortable>
          </el-table-column>
          <el-table-column
            prop="content"
            label="备注说明">
          </el-table-column>
          <el-table-column
            label="操作" width="80">
            <template slot-scope="scope">
                <el-button  type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
                <el-button  type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="type" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>校验码类型：</span>
            <el-select placeholder="请选择" v-model="form.type" filterable clearable  size="small" class="yy-input-input">
              <el-option label="QY - 应急启用校验码" value="QY"></el-option>
              <el-option label="JS -  应急结束校验码" value="JS"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="flighttype" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>出入标识：</span>
            <el-select v-model="form.flighttype" placeholder="请选择" filterable clearable size="small" class="yy-input-input">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <!-- <el-option label="A - 入出境" value="A"></el-option> -->
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">适用航空公司：</span>
            <el-select placeholder="请选择" v-model="form.aircompanyMapList" filterable clearable multiple @visible-change="applicationMethod(form.flighttype)" size="small" class="yy-input-input">
              <el-option
              v-for="item in application"
              :key="item.AIRLINE_CODE"
              :value="item.AIRLINE_CODE"
              :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">适用机场：</span>
            <el-button type="success" size="small" plain @click="getmodel(form.flighttype,1)">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="small" plain @click="seeModel(1)">点击查看</el-button>
          </el-col>

        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.content" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm',0)" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="500px" >
      <el-form :model="eform" ref="eForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">校验码：</span>
            <el-input placeholder="请输入电话" size="small" v-model="eform.emergencyCode"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">校验码类型：</span>
            <el-select placeholder="请选择" v-model="eform.typeStr" filterable clearable  size="small" class="yy-input-input" :disabled="true">
              <el-option label="QY - 应急启用校验码" value="QY"></el-option>
              <el-option label="JS -  应急结束校验码" value="JS"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">生成时间：</span>
              <el-date-picker
              :disabled="true"
              v-model="eform.createtimeStr"
              type="datetime" size="mini"
              placeholder="请选择值班结束时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyyMMddHHmmss">
            </el-date-picker>
          </el-col>
        </el-row>


        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">出入标识：</span>
            <el-select v-model="eform.flighttype" placeholder="请选择" filterable clearable size="small" class="yy-input-input">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <!-- <el-option label="A - 入出境" value="A"></el-option> -->
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">适用航空公司：</span>
            <el-select placeholder="请选择" v-model="eform.aircompanyList" filterable clearable multiple @visible-change="applicationMethod(eform.flighttype)" size="small" class="yy-input-input">
              <el-option
              v-for="item in application"
              :key="item.AIRLINE_CODE"
              :value="item.AIRLINE_CODE"
              :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">适用机场：</span>
            <el-button type="success" size="small" plain @click="getmodel(eform.flighttype,2)">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="small" plain @click="seeModel(2)">点击查看</el-button>
          </el-col>

        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="eform.content" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm',1)" size="small">保 存</el-button>
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="机场选择" :visible.sync="modelDialogVisible" width="640px" :before-close="cancelModel">
      <el-input
        placeholder="输入模型关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="CODE"
        :filter-node-method="filterNode"
        :props="defaultProps"
        :default-checked-keys='keys'>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getCheckedNodes" size="small">确认</el-button>
        <el-button type="primary" @click="resetModel" size="small" plain>重置</el-button>
        <el-button type="warning" @click="cancelModel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="机场选择" :visible.sync="addmodelDialogVisible" width="640px" :before-close="cancelModel">
      <el-input
        placeholder="输入模型关键字进行过滤"
        v-model="addfilterText">
      </el-input>
      <el-tree
        class="filter-tree"
        ref="addtree"
        :data="treeData"
        show-checkbox
        node-key="CODE"
        :filter-node-method="filterNode"
        :props="defaultProps"
        :default-checked-keys='addkeys'>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getCheckedNodes" size="small">确认</el-button>
        <el-button type="primary" @click="resetModel" size="small" plain>重置</el-button>
        <el-button type="warning" @click="cancelModel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="机场选择" :visible.sync="editmodelDialogVisible" width="640px" :before-close="cancelModel">
      <el-input
        placeholder="输入模型关键字进行过滤"
        v-model="editfilterText">
      </el-input>
      <el-tree
        class="filter-tree"
        ref="edittree"
        :data="treeData"
        show-checkbox
        node-key="CODE"
        :filter-node-method="filterNode"
        :props="defaultProps"
        :default-checked-keys='editkeys'>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getCheckedNodes" size="small">确认</el-button>
        <el-button type="primary" @click="resetModel" size="small" plain>重置</el-button>
        <el-button type="warning" @click="cancelModel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="机场选择详情" :visible.sync="seeModelDialogVisible" width="800px">
      <el-row align="center" style="width:100%">
        <span v-for="(item,ind) in dutyName" :key="ind" style="width:25%;margin-bottom: 7px;display:inline-block;line-height: 20px;">{{item.ENAME}}</span>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeModelDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data() {
    return {
      //新增机场选择
      addmodelDialogVisible:false,
      queryOrAdd:0,
      //编辑
      editDialogVisible:false,
      editmodelDialogVisible:false,
      eform:{
        createtimeStr:'',
      },


      application:[],
      order:'',
      direction:0,
      modelDialogVisible:false,
      seeModelDialogVisible:false,
      filterText:'',
      addfilterText:'',
      editfilterText:'',
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'ENAME',
      },

      keys:[],
      addkeys:[],
      editkeys:[],

      keysExample:[],
      addkeysExample:[],
      editkeysExample:[],

      keyCode:[],
      dutyName:[],
      flagCZ:0,
      addflagCZ:0,
      editflagCZ:0,

      flagQX:0,
      addflagQX:0,
      editflagQX:0,

      historyModel:null,
      addhistoryModel:null,
      edithistoryModel:null,

      bumen:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      cdt:{
        "isBlurred":false,
        startCreatetime:'',
        endCreatetime:'',
        type:'QY',
        flighttype:'I',
        aircompanyCodeList:[],
      },
      // props:{
      //   label:'DEPT_QC',
      //   value:'DEPT_CODE',
      //   children:'childDeptList'
      // },
      pd: {},
      nation: [],
      company: [],
      dutyName:[],
      leaderName:[],

      value: '',
      value1: "",
      addDialogVisible: false,
      detailsDialogVisible: false,
      sendDialogVisible:false,
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
            if (this.cdt.ENDTIME != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.cdt.ENDTIME;
            }else if(this.cdt.ENDTIME == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.cdt.STARTTIME;
        }
      },
      form: {

      },
      dform: {},
    }
  },
  mounted() {
    // this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
  },
  activated() {
    // this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
  },
  watch:{
     filterText(val) {
       this.$refs.tree.filter(val);
     },
     addfilterText(val) {
       this.$refs.addtree.filter(val);
     },
     editfilterText(val) {
       this.$refs.edittree.filter(val);
     }
  },
  methods: {
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    applicationMethod(val){//航空公司
      this.$api.post('/manage-platform/codeTable/queryAircompanyListByFlttype',{'flighttype':val},
       r =>{
         if(r.success){
           this.application = r.data;
         }
       })
    },
    downloadM (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
    },
    exportFile(){
      axios({
       method: 'post',
       // url: 'http://192.168.99.201:8080/manage-platform/emergencyCode/exportFileIo',
       url: this.$api.rootUrl+"/manage-platform/emergencyCode/exportFileIo",
       data: {
         "currentPage": 1,
         "cdt": this.cdt
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    getmodel(flighttype,type){//点击选择
      this.queryOrAdd = type;

      if(this.queryOrAdd==0){
        this.filterText='';
        this.modelDialogVisible=true;
        if(this.flagCZ==1&&this.flagQX==1){//既点了重置又点了取消
          this.keys = this.keysExample
          this.$refs.tree.setCheckedKeys(this.keys);
          this.flagCZ = 0;
          this.flagQX = 0;
        }
      }else if(this.queryOrAdd==1){
        this.addfilterText='';
        this.addmodelDialogVisible=true;
        if(this.addflagCZ==1&&this.addflagQX==1){//有值得时候
          this.addkeys = this.addkeysExample
          this.$refs.addtree.setCheckedKeys(this.addkeys);
          this.addflagCZ = 0;
          this.addflagQX = 0;
        }
      }else if(this.queryOrAdd==2){
        this.editfilterText='';
        this.editmodelDialogVisible=true;
        if(this.editflagCZ==1&&this.editflagQX==1){
          this.editkeys = this.editkeysExample
          this.$refs.edittree.setCheckedKeys(this.editkeys);
          this.editflagCZ = 0;
          this.editflagQX = 0;
        }
      }
      let p={
        'flighttype':flighttype=='I'?1:flighttype=='O'?2:'',
        'citytype':'cityfrom'
      }
      this.$api.post('/manage-platform/codeTable/queryAirportCascade',p,
       r => {
         if(r.success){
           this.treeData=r.data;
         }
      })
      if(this.queryOrAdd==0){
        if(this.keys.length!=0){
          // console.log(this.$refs.tree.getCheckedKeys(true))
          // this.keys = this.$refs.tree.getCheckedKeys(true);
          this.$refs.tree.setCheckedKeys(this.keys);
        }
      }else if(this.queryOrAdd==1){
        if(this.addkeys.length!=0){
          // this.addkeys = this.$refs.addtree.getCheckedKeys(true);
          this.$refs.addtree.setCheckedKeys(this.addkeys);
        }
      }else if(this.queryOrAdd==2){
        if(this.editkeys.length!=0){
          // this.editkeys = this.$refs.edittree.getCheckedKeys(true);
          this.$refs.edittree.setCheckedKeys(this.editkeys);
        }
      }
    },
    resetModel(){//重置
      if(this.queryOrAdd==0){
        this.flagCZ=1;
        if(this.cdt.airportMapList == undefined||this.cdt.airportMapList.length==0){//没有值的时候
          this.historyModel = [];
          this.keysExample = [];
        }else{
          this.historyModel = this.$refs.tree.getCheckedNodes(true,true);//存入清空前的值
          this.keysExample = this.$refs.tree.getCheckedKeys(true);//先存值再清空
        }
        this.$refs.tree.setCheckedKeys([]);
      }else if(this.queryOrAdd==1){
        this.addflagCZ=1;
        if(this.form.airportMapList == undefined||this.form.airportMapList.length==0){//没有值的时候
          this.addhistoryModel = [];
          this.addkeysExample = [];
        }else{
          this.addhistoryModel = this.$refs.addtree.getCheckedNodes(true,true);//存入清空前的值
          this.addkeysExample = this.$refs.addtree.getCheckedKeys(true);//先存值再清空
        }
        this.$refs.addtree.setCheckedKeys([]);
      }else if(this.queryOrAdd==2){
        this.editflagCZ=1;
        if(this.eform.airportMapList == undefined||this.eform.airportMapList.length==0){//没有值的时候
          this.edithistoryModel = [];
          this.editkeysExample = [];
        }else{
          this.edithistoryModel = this.$refs.edittree.getCheckedNodes(true,true);//存入清空前的值
          this.editkeysExample = this.$refs.edittree.getCheckedKeys(true);//先存值再清空
        }
        this.$refs.edittree.setCheckedKeys([]);
      }
    },
    cancelModel(){//取消
      if(this.queryOrAdd==0){
        this.flagQX=1;
        if(this.flagCZ == 1){
          this.cdt.airportMapList=this.historyModel;
        }else{
          this.cdt.airportMapList=this.$refs.tree.getCheckedNodes(true,true);
        }
        this.modelDialogVisible=false
      }else if(this.queryOrAdd==1){
        this.addflagQX=1;
        if(this.addflagCZ == 1){
          this.form.airportMapList=this.addhistoryModel;
        }else{
          this.form.airportMapList=this.$refs.addtree.getCheckedNodes(true,true);
        }
        this.addmodelDialogVisible=false
      }else if(this.queryOrAdd==2){
        this.editflagQX=1;
        if(this.editflagCZ == 1){
          this.eform.airportMapList=this.edithistoryModel;
        }else{
          this.eform.airportMapList=this.$refs.edittree.getCheckedNodes(true,true);
        }
        this.editmodelDialogVisible=false
      }
    },
    getCheckedNodes() {//确认
      if(this.queryOrAdd==0){
        this.cdt.airportMapList=this.$refs.tree.getCheckedNodes(true,true);
        this.keys = this.$refs.tree.getCheckedKeys(true);//先存值再清空
        if(this.flagCZ==1){this.flagCZ=0}
        this.modelDialogVisible=false;
      }else if(this.queryOrAdd==1){
        this.form.airportMapList=this.$refs.addtree.getCheckedNodes(true,true);
        this.addkeys = this.$refs.addtree.getCheckedKeys(true);//先存值再清空
        if(this.addflagCZ==1){this.addflagCZ=0}
        this.addmodelDialogVisible=false;
      }else if(this.queryOrAdd==2){
        this.eform.airportMapList=this.$refs.edittree.getCheckedNodes(true,true);
        this.editkeys = this.$refs.edittree.getCheckedKeys(true);//先存值再清空
        if(this.editflagCZ==1){this.editflagCZ=0}
        this.editmodelDialogVisible=false;
      }

    },
    seeModel(t){
      if(t==0){
        this.dutyName = this.cdt.airportMapList;
      }else if(t==1){
        this.dutyName = this.form.airportMapList;
      }else if(t==2){
        this.dutyName = this.eform.airportMapList;
      }
      if(this.dutyName == undefined || this.dutyName.length == 0){
        this.$message('未选择机场');
      }else{
        this.seeModelDialogVisible = true;
      }
    },
    filterNode(value, data,node) {
      if (!value) return true;
      let level = node.level;
      let _array = [];
      this.getReturnNode(node,_array,value);
      let result = false;
      _array.forEach((item)=>{
        result = result||item;
      });
      return result;
      // return data.ENAME.indexOf(value) !== -1;
    },
    getReturnNode(node,_array,value){
     let isPass = node.data &&  node.data.ENAME && node.data.ENAME.indexOf(value) !== -1;
     isPass?_array.push(isPass):'';
     this.index++;
     // console.log(this.index)
     if(!isPass && node.level!=1 && node.parent){
      this.getReturnNode(node.parent,_array,value);
     }
   },
    bumenMethod(){
      this.$api.post('/manage-platform/watch/queryDeptLv2And3',{},
       r =>{
         if(r.success){
           this.bumen = r.data;
         }
       })
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.cdt,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.cdt,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd,order,direction) {
      this.V.$submit('demo', (canSumit,data) => {
        if(!canSumit) return
        let p = {
          "currentPage": currentPage,
          "showCount": showCount,
          "cdt": pd,
          "order":order,
          "direction":direction
        };
        this.$api.post('/manage-platform/emergencyCode/queryListPage', p,
          r => {
            if(r.success){
              this.tableData = r.data.resultList;
              this.TotalResult = r.data.totalResult;
            }
          })
      })
    },
    nameMethod(type){
      this.$api.post('/manage-platform/watch/queryUserAll',{},
        r => {
          if(type==0){
            this.dutyName = r.data;
          }else if(type==1){
            this.leaderName = r.data;
          }
        })
    },
    leaderNameReal(val){
      console.log(val);
      let arr = this.leaderName;
      for(var i=0;i<arr.length;i++){
        if(arr[i].NAME == val){
          this.form.LEADERSERIAL = arr[i].SERIAL;
        }
      }
    },
    // nameMethodReal(val){//新增添值&编辑修改
    //   this.$set(this.form,'PHONE','');
    //   this.$set(this.form,'DEPT_QC','');
    //   this.$set(this.form,'USERNAME','');
    //   let arr = this.dutyName;
    //   for(var i=0;i<arr.length;i++){
    //     if(arr[i].NAME == val){
    //       this.form.PHONE = arr[i].PHONE;//电话
    //       this.form.USERNAME = arr[i].USERNAME;//账号
    //       this.form.DEPT_QC = arr[i].DEPT_QC;
    //       this.form.DEPT_ID = arr[i].DEPT_ID;//部门id
    //       this.form.USERSERIAL = arr[i].SERIAL;//姓名
    //     }
    //   }
    // },
    adds(n, i) {//打开新增&编辑模态框
      if (n == 1) {//编辑
        // this.form = i;
        this.editDialogVisible = true;
        this.$api.post('/manage-platform/emergencyCode/queryByCode',{'emergencyCode':i.emergencyCode},
         r =>{
           if(r.success){
             this.eform.emergencyCode = r.data.emergencyCode;
             this.eform.typeStr = r.data.typeStr;
             this.eform.flighttype = r.data.flighttype;
             this.eform.createtimeStr = r.data.createtimeStr;

             if(r.data.hasOwnProperty('aircompanyList')){
               this.eform.aircompanyList = r.data.aircompanyList;
               console.log()
             }else{
               this.eform.aircompanyList=[];
             }
             if(r.data.hasOwnProperty('airportMapList')){
               this.eform.airportMapList = r.data.airportMapList
               var arr=[];
               for(var i=0;i<r.data.airportMapList.length;i++){
                 arr.push(r.data.airportMapList[i].CODE)
               }
               this.editkeys = arr;//树
               // this.eform.airportNameStr = r.data.airportNameStr;
             }else{
               this.eform.airportMapList=[];
               this.editkeys = [];
             }

             // this.$refs.edittree.setCheckedKeys(this.editkeys);
           }
         })
        // this.form=Object.assign({}, i);
        // this.form.STARTTIMESTR=formatDate(new Date(this.form.STARTTIMESTR),'yyyyMMddhhmm');
        // this.form.ENDTIMESTR=formatDate(new Date(this.form.ENDTIMESTR),'yyyyMMddhhmm');
      }else if(n == 0){//新增
        this.form={
          type:'',
          aircompanyMapList:[],
        }
        this.addkeys = [];
        this.form.airportMapList = [];
        this.addDialogVisible = true;
      }
      this.V.$reset('demo2')
    },
    airlineChange(arr){

      if(arr==undefined||arr.length==0){
        return []
      }else if(arr.length!=0){
        var arrAfter=[];
        for(var i=0;i<arr.length;i++){
          var obj = {};
          obj.AIRLINE_CODE=arr[i];
          arrAfter.push(obj)
        }
          return arrAfter
      }

    },
    addItem(formName,type) {//新增&编辑保存
      if(type==0){
        this.V.$submit('demo2', (canSumit,data) => {
          if(!canSumit) return
          // var arr=[];
          // for(var i=0;i<this.form.aircompanyMapList.length;i++){
          //   var obj = {};
          //   obj.AIRLINE_CODE=this.form.aircompanyMapList[i];
          //   arr.push(obj)
          // }
          this.form.aircompanyMapList = this.airlineChange(this.form.aircompanyMapList);
          this.$api.post('/manage-platform/emergencyCode/save', this.form,
            r => {
              if (r.success) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
              } else {
                this.$message.error('保存失败！');
              }
              this.addDialogVisible = false;
              this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
            }, e => {
              this.$message.error('失败了');
            })
        })
      }else if(type==1){//编辑保存
        let p={
          'emergencyCode':this.eform.emergencyCode,
          'flighttype':this.eform.flighttype,
          'content':this.eform.content,
          'airportMapList':this.eform.airportMapList,
          'aircompanyMapList':this.airlineChange(this.eform.aircompanyList)
        }
        this.$api.post('/manage-platform/emergencyCode/update',p,
         r =>{
           if(r.success){
             this.$message({
               message: '保存成功！',
               type: 'success'
             });
           }else{
             this.$message.error('保存失败！');
           }
           this.editDialogVisible = false;
           this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
         })
      }

    },

    deletes(i) {
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let p = {
          'emergencyCode':i.emergencyCode
        }
        this.$api.post('/manage-platform/emergencyCode/delete',p,
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
</style>
