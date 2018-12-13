<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">

      <el-row type="flex">
        <el-col :span="22" class="br pr-20">

          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">模型名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.MODEL_NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">是否启用：</span>
              <el-select v-model="pd.STATUS" class="input-input"  filterable clearable placeholder="请选择"   size="small" >

                <el-option value="是" label="是">
                </el-option>
                <el-option value="否" label="否">
                </el-option>

               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">模型状态：</span>
              <el-select v-model="pd.MODEL_PHASES" class="input-input"  filterable clearable placeholder="请选择"   size="small" >
                <el-option value="1" label="1 - 编辑">
                </el-option>
                <el-option value="2" label="2 - 提交测试">
                </el-option>
                <el-option value="3" label="3 - 测试通过">
                </el-option>
                <el-option value="4" label="4 - 提交审核">
                </el-option>
                <el-option value="5" label="5 - 审核通过">
                </el-option>
                <el-option value="6" label="6 - 审核不通过">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">最后更新时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.beginTime" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endTime" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <!-- <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">发布状态：</span>
              <el-select v-model="pd.MODEL_STATUS" class="input-input"  filterable clearable placeholder="请选择"   size="small" >
                <el-option value="0" label="0 - 未发布">
                </el-option>
                <el-option value="1" label="1 - 已发布">
                </el-option>
               </el-select>
            </el-col> -->
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" >
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增模型</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          type="index"
          label="序号" width="60">
        </el-table-column>
        <!-- <el-table-column
          prop="MODEL_NAME"
          label="模型名称">
        </el-table-column> -->
         <el-table-column
          prop="MODEL_JC"
          label="模型简称"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="MODEL_DESCRIBE"
          label="模型描述">
        </el-table-column> -->
        <el-table-column
          prop="CREATE_PERSION"
          label="创建人">
        </el-table-column>
        <!-- <el-table-column
          prop="PORT_NAME"
          label="创建口岸">
        </el-table-column> -->

        <el-table-column
          prop="UPDATETIME"
          label="最后更新日期" width="130">
        </el-table-column>
        <el-table-column
          prop="LIFE_SPAN"
          label="有效日期">
        </el-table-column>
        <el-table-column
          label="是否启用">
          <template slot-scope="scope">
              <span :class="{'yyred':scope.row.STATUS == '0','yygreen':scope.row.STATUS == '1'}">  {{scope.row.STATUS | fifterstatus}}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="模型状态">
          <template slot-scope="scope">
              {{scope.row.MODEL_PHASES | fiftermodel}}
            </template>
        </el-table-column>
        <!-- <el-table-column
          prop="MODEL_STATUS"
          label="发布状态">
        </el-table-column> -->
      <el-table-column
          label="操作" width="480">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deletes(scope.row)">删除</el-button>
            <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">版本查看</el-button> -->
            <el-button class="table-btn" size="mini" plain icon="el-icon-share" @click="relates(scope.row)">关联问题</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-edit-outline" @click="auses(scope.row)">使用口岸</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-setting" v-if="scope.row.STATUS==0" @click="starts(scope.row,1)">启用</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-setting" v-else  @click="starts(scope.row,0)">停用</el-button>
            <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">推送测试</el-button> -->
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
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" style="margin-top:-100px;">
      <el-form :model="form" ref="addForm">

        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 模型名称：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.modelName"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
           <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 是否启用：</span>
            <el-select v-model="form.status" class="input-input"  filterable clearable placeholder="请选择"   size="small" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option value="0" label="0 - 禁用">
              </el-option>
              <el-option value="1" label="1 - 启用">
              </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 模型简称：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.modelJc"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
           <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 有效期：</span>
            <el-date-picker style="width:70%"
            v-model="form.lifeSpan" format="yyyy-MM-dd"
            v-verify.change.blur ="{regs:'required',submit:'demo2'}"
            type="date" size="small" value-format="yyyyMMdd"
            placeholder="有效期">
          </el-date-picker>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="input-text memol">适用口岸范围：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.LABELREASON"  class="memor"></el-input>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="input-text memol"><font class="yy-color">*</font> 模型描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.modelDescribe" class="memor" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item" >
            <span class="input-text memol"><font class="yy-color">*</font> 核查策略：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.strategy" class="memor" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item" >
            <span class="input-text memol"><font class="yy-color">*</font> 案例描述：</span>

           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.caseNarration" class="memor" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="tiaojian">进入条件</el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="title">指标项
      <div style="float:right;padding-right:10px;">  <el-button @click="addrows()" size="small">添 加</el-button></div>
          </el-col>
        </el-row>
        <el-row type="flex" v-for="(rr,ind) in rows">
          <el-col :span="3" class="tjcon tjconr" >
             <!-- C{{rr.id}}： -->
             <el-input placeholder="" size="small" style="width:80px;text-align:right;"  v-model="rr.targetSign" :readonly="true"></el-input>：
          </el-col>
          <el-col :span="5" class="tjcon">
           <el-select v-model="rr.targetId"  class="memoa" @change="changeTarget(rr.targetId)" filterable clearable placeholder="请选择"   size="small" >
             <el-option
               v-for="(item,ind) in target"
               :key="ind"
               :label="item.TARGET_SIGN+' - '+item.TARGET_NAME"
               :value="item.TARGET_ID">
             </el-option>
           </el-select>
          </el-col>
          <el-col :span="5" class="tjcon">
                   <el-select v-model="rr.calculation" class="memoa"  filterable clearable placeholder="请选择"   size="small" >
                    <el-option value="等于" label="等于">
                    </el-option>
                    <el-option value="不等于" label="不等于">
                    </el-option>
                    <el-option value="大于" label="大于">
                    </el-option>
                    <el-option value="小于" label="小于">
                    </el-option>
                    <el-option value="范围" label="范围">
                    </el-option>
                    <el-option value="包含" label="包含">
                    </el-option>
                    <el-option value="集合" label="集合">
                    </el-option>
                    <el-option value="属于" label="属于">
                    </el-option>
                    <el-option value="不属于" label="不属于">
                    </el-option>
                   </el-select>
          </el-col>
          <el-col :span="10" class="tjcon">
            <el-input placeholder="请输入内容" size="small" style="width:96%"   v-model="rr.targetValue" ></el-input>
          </el-col>
          <el-col :span="1" class="tjcon" style="padding-top:10px;">
            <i class="el-icon-remove-outline iconc" @click="deleterows(ind)"></i>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="3" class="tjcon"  style="text-align:right">
          <font class="yy-color">*</font>   进入规则：
          </el-col>
          <el-col :span="21" class="tjcon">
            <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 3}" v-model="form.enterRule"  class="memoa" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="3" class="tjcon"  style="text-align:right">
            过滤规则：
          </el-col>
          <el-col :span="21" class="tjcon">
            <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 3}" v-model="form.filterRule"  class="memoa"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="title">预警触发条件
            <div style="float:right;padding-right:10px;">  <el-button @click="adderows()" size="small">添 加</el-button></div>
          </el-col>
        </el-row>
<div  v-for="(ee,ind) in erows" style="border-bottom:1px solid #93C4F9; padding-top:10px; ">
    <el-row type="flex">
      <el-col :span="3" class="tjcon tjconr" >
        规则名称：
      </el-col>
      <el-col :span="6" class="tjcon">
        <el-input type="text" placeholder="请输入内容" size="small"  v-model="ee.ruleName"  class="memoa"></el-input>

      </el-col>
      <el-col :span="3" class="tjcon tjconr">
        触发条件：
      </el-col>
      <el-col :span="10" class="tjcon">
        <el-input type="text" placeholder="请输入内容" size="small"  v-model="ee.ruleRules"  class="memoa"></el-input>

      </el-col>
    </el-row>
    <el-row type="flex" >
      <el-col :span="3" class="tjcon tjconr" >
        风险等级：
      </el-col>
      <el-col :span="6" class="tjcon">
        <el-select v-model="ee.ruleGrade"  class="memoa" filterable clearable placeholder="请选择"   size="small" >
         <el-option value="1" label="1">
         </el-option>
         <el-option value="2" label="2">
         </el-option>
         <el-option value="3" label="3">
         </el-option>
         <el-option value="4" label="4">
         </el-option>
         <el-option value="5" label="5">
         </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="tjcon tjconr">
        规则描述：
      </el-col>
      <el-col :span="10" class="tjcon">
        <el-input type="text" placeholder="请输入内容" size="small"  v-model="ee.ruleDescribe"  class="memoa"></el-input>

      </el-col>
      <el-col :span="2" class="tjcon" style="padding-top:10px;">
        <i class="el-icon-remove-outline iconc" @click="deleteerows(ind)"></i>
      </el-col>
    </el-row>
  </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detailsDialogVisible">
      <el-form :model="map" ref="mapForm">
        <el-tabs :tab-position="tabPosition" style="height
        : 200px;">
       </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="关联问题" :visible.sync="menuDialogVisible" width="700px">
  <el-transfer
    v-model="value1"
    :titles="['备选', '已选']"
    :data="data">
       </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRelates()" size="small">保 存</el-button>
        <el-button @click="menuDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="使用口岸" :visible.sync="useDialogVisible" width="700px">


  <el-transfer
    v-model="value2"
    :titles="['备选', '已选']"
    :data="data2">
       </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUse()" size="small">保 存</el-button>
        <el-button @click="useDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog  title="权限校验" :visible.sync="AuthDialogVisible"  width="500px">

      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
            <span class="yy-input-text">用户名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="ap.userName" v-verify.change.blur ="{regs:'required',submit:'demo3'}" class="yy-input-input"></el-input></el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
              <span class="yy-input-text">密  码：</span>
              <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.password" v-verify.change.blur ="{regs:'required',submit:'demo3'}" class="yy-input-input"></el-input></el-col>

      </el-row>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="Authorization(ap)" size="small">确认</el-button>
        <el-button @click="AuthDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
    const data = [];
    for (let i = 1; i <= 4; i++) {
        data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0
        });
    }
    return data;
    };
    return {
      tp: 0,
      ap:{},
      data:generateData(),
      value1:[],
      data2:generateData(),
      value2:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      target: [],
      sertail: "",
      dialogText: "新增",
      tabPosition: 'left',
      addDialogVisible: false,
      detailsDialogVisible: false,
    useDialogVisible:false,
    AuthDialogVisible:false,
      menuDialogVisible: false,
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
      tem:{},
      form: {},
      mapForm: {},
      Airport: [],
      rows: [{
        id: 1,
        targetId: '',
        calculation: '',
        targetValue: '',
        targetSign:''
      }],
      modelrow: [{
        id: 1,
        targetId: '',
        calculation: '',
        targetValue: '',
        targetSign:''
      }],
      erows: [{
        id: 1,
        ruleName: '',
        ruleRules: '',
        ruleDescribe: '',
        ruleGrade: ''
      }],
      emodelrow: [{
        id: 1,
        ruleName: '',
        ruleRules: '',
        ruleDescribe: '',
        ruleGrade: ''
      }],
      count: 1,
      ecount: 1,
      mocode:'',
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  methods: {
    changeTarget(value){
      console.log(value);
      let arr = this.rows;
      let that = this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].targetId == value){

          let obj = {};
          obj = that.target.find((item)=>{//这里的userList就是上面遍历的数据源
              return item.TARGET_ID === value;//筛选出匹配数据
          });
          arr[i].targetSign=obj.TARGET_SIGN;
        }
      }

      // console.log(obj.TARGET_SIGN);//我这边的name就是对应label的

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/model/select', p,
        r => {
        
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/model/selectTarget', {},
        r => {
          console.log(r);
          if (r.success) {
            this.target = r.data;
          }
        })
    },

    adds(n, i) {
      this.addDialogVisible = true;

      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form = Object.assign({}, i);

        this.dialogText = "编辑";
        let p={
          "modelId": i.MODEL_ID,
          "modelCode": i.MODEL_CODE,
          "modelVersion": i.MODEL_VERSION
        };
        this.$api.post('/manage-platform/model/goEdit', p,
          r => {
            console.log(r);
            if (r.success) {
              this.form = r.data;
              console.log(r.data.ruleList+"----");
              this.erows=r.data.ruleList;
              this.rows=r.data.targetList;
              this.form.enterRule=r.data.enterRule.ruleRules;
              this.form.filterRule=r.data.filterRule.ruleRules;
            }
          });

      } else {
        this.tp = 0;
        this.dialogText = "新增";
      }

    },
    addItem(formName) {
      if(this.$validator.listener.demo2){
        const result = this.$validator.verifyAll('demo2')
         if (result.indexOf(false) > -1) {
           return
         } else {
         }
      }
      let p={};
      var url = "";
      if (this.tp == 1) {
         p = {
          "modelId": this.form.modelId,
          "modelCode":this.form.modelCode,
          "modelVersion":this.form.modelVersion,
          "modelName": this.form.modelName,
          "modelJc": this.form.modelJc,
          "status": this.form.status,
          "modelDescribe": this.form.modelDescribe,
          "strategy": this.form.strategy,
          "caseNarration": this.form.caseNarration,
          "lifeSpan": this.form.lifeSpan,
          "targetList": this.rows,
          "enterRule": {
            "ruleRules": this.form.enterRule
          },
          "filterRule": {
            "ruleRules": this.form.filterRule
          },
          "ruleList": this.erows
        };
        url = "/manage-platform/model/edit";
      } else {
         p = {
          "modelName": this.form.modelName,
          "modelJc": this.form.modelJc,
          "status": this.form.status,
          "modelDescribe": this.form.modelDescribe,
          "strategy": this.form.strategy,
          "caseNarration": this.form.caseNarration,
          "lifeSpan": this.form.lifeSpan,
          "targetList": this.rows,
          "enterRule": {
            "ruleRules": this.form.enterRule
          },
          "filterRule": {
            "ruleRules": this.form.filterRule
          },
          "ruleList": this.erows
        };

        url = "/manage-platform/model/add";
      }

      this.$api.post(url, p,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }

          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.pd);

        }, e => {
          this.$message.error('失败了');
        })
    },
    starts(i,type){
      let p={
"modelId":i.MODEL_ID,
"status":type

      };
      this.$api.post('/manage-platform/model/updateStatus', p,
        r => {
          if (r.success) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
              this.getList(this.CurrentPage, this.pageSize, this.pd);
          } else {
            this.$message.error(r.Message);
          }
        });


    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.mapForm = i;
    },
    relates(i){
     this.menuDialogVisible = true;
     this.data=[];
     this.value1=[];
     let p={
       "MODEL_CODE":i.MODEL_CODE
     };
     this.mocode=i.MODEL_CODE;
      this.$api.post('/manage-platform/model/questionAll', p,
        r => {
           for(let rr of r.data.questionList){
            this.data.push({
               key: rr.SERIAL,
               label: rr.NAME,
               disabled: rr.check
             });
           }
        });

    },
    addRelates(){

       let p={
         "MODEL_CODE":this.mocode,
         "checkQuestion":this.value1
       };
       this.$api.post('/manage-platform/model/relevancyQuestion', p,
         r => {
           if (r.success) {
             this.$message({
               message: '保存成功！',
               type: 'success'
             });
           } else {
             this.$message.error(r.Message);
           }
         });
          this.menuDialogVisible = false;
    },
    auses(i){
     this.useDialogVisible = true;
     this.data2=[];
     this.value2=[];
     let p={
       "MODEL_CODE":i.MODEL_CODE
     };
      this.mocode=i.MODEL_CODE;
      this.$api.post('/manage-platform/model/portAll', p,
        r => {
           for(let rr of r.data.portList){
            this.data2.push({
               key: rr.DEPT_CODE,
               label: rr.DEPT_JC,
               disabled: rr.check
             });
           }
        });

    },
    addUse(){
       let p={
         "MODEL_CODE":this.mocode,
         "checkPort":this.value2
       };
       this.$api.post('/manage-platform/model/savePort', p,
         r => {
           if (r.success) {
             this.$message({
               message: '保存成功！',
               type: 'success'
             });
           } else {
             this.$message.error(r.Message);
           }
         });
          this.useDialogVisible = false;
    },
   deletes(i){
  this.ap={};
   this.AuthDialogVisible=true;
   this.ap.MODEL_ID=i.MODEL_ID;
   this.ap.MODEL_CODE=i.MODEL_CODE;
   this.ap.MODEL_VERSION=i.MODEL_VERSION;
   },
    Authorization(ap) {

      if(this.$validator.listener.demo3){
        const result = this.$validator.verifyAll('demo3')
         if (result.indexOf(false) > -1) {
           return
         }
      }
      let p = {
        "modelId": ap.MODEL_ID,
        "modelCode": ap.MODEL_CODE,
        "modelVersion": ap.MODEL_VERSION,
        "userName":ap.userName,
        "password":ap.password
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.post('/manage-platform/model/delete', p,
          r => {

            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.AuthDialogVisible=false;
              this.getList(this.CurrentPage, this.pageSize, this.pd);
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

    addrows() {
      this.count++;
      this.modelrow = {
        id: 1,
        targetId: '',
        calculation: '',
        targetValue: '',
        targetSign:''
      };
      this.modelrow.id = this.count;
      this.rows.push(this.modelrow);
    },
    deleterows(index) {

      this.rows.splice(index, 1);

    },
    adderows() {
      this.ecount++;
      this.emodelrow = {
        id: 1,
        ruleName: '',
        ruleRules: '',
        ruleDescribe: '',
        ruleGrade: ''
      };
      this.emodelrow.id = this.ecount;
      this.erows.push(this.emodelrow);
    },
    deleteerows(index) {

      this.erows.splice(index, 1);

    },
  },

  filters: {

    fifterstatus(val) {
      if (val == 0) {

        return "停用"

      } else {
        return "启用"
      }
    },
    fiftermodel(val) {
      if (val == 1) {
        return "新建"

      } else if (val == 2) {
        return "提交测试"
      }
      else if (val == 3) {
        return "测试通过"
      }
      else if (val == 4) {
        return "提交审核"
      }
      else if (val == 5) {
        return "审核通过允许使用"
      }
      else if (val == 6) {
        return "审核不通过"
      }
    },

  },
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

.yy-input-input {
  width: 68% !important;

}

.memol {
  width: 12.5% !important;
}

.memor {
  width: 85% !important;
}

.memoa {
  width: 98%;
}

.tiaojian {
  color: #2084F4;
  border-bottom: 1px solid #5EA7F6;
  line-height: 35px;
  font-size: 16px;
  font-weight: bold;
}

.title {
  background: #D4E8FF;
  font-weight: bold;
  color: #666;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}

.tjcon {
  background: #FBFCFF;
  padding: 5px 0px;
}

.tjconr {
  text-align: right;
  line-height: 30px;
}

.iconc {
  cursor: pointer;
  font-size: 20px;
  color: red
}
.yyred{color: red}
.yygreen{color: blue}
</style>
<style>
.el-transfer-panel{max-height: 500px !important}
.el-transfer__buttons{width: 4%!important}
</style>
