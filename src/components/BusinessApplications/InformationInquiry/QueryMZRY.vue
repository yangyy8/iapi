<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green ">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <div class="input-input t-fuzzy t-flex">
                <el-input placeholder="请输入内容" v-model="pd.familyname" size="small"></el-input>
                <el-checkbox v-model="pd.isBlurred">模糊查询</el-checkbox>
              </div>
              <!-- <span class="input-text">姓名：</span>
              <el-input  placeholder="请输入" size="small" v-model="pd.familyname" class="input-input"></el-input> -->
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">性别：</span>
              <el-select  placeholder="请选择"  size="small" filterable clearable v-model="pd.genderEqual"  class="input-input">
                <el-option label="M - 男" value="M"></el-option>
                <el-option label="F - 女" value="F"></el-option>
                <el-option label="U - 未知" value="U"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startDateofbirth"
               type="date" size="small"
               placeholder="开始时间" align="right" :picker-options="pickerOptions1"
               value-format="yyyyMMdd">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endDateofbirth"
                type="date" size="small" align="right"
                placeholder="结束时间"  :picker-options="pickerOptions1"
                value-format="yyyyMMdd">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <QueryNationality  :nationality="pd.nationalityEqual"  @transNation="getNation"></QueryNationality>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.passportnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期:</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startFlightDepartdate"
               type="datetime" size="small"
               placeholder="开始时间" align="right" :picker-options="pickerOptions1"
               value-format="yyyyMMdd HHmmss">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endFlightDepartdate"
                type="datetime" size="small" align="right"
                placeholder="结束时间"  :picker-options="pickerOptions1"
                value-format="yyyyMMdd HHmmss">
            </el-date-picker>
          </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model='pd.flighttypeEqual' placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option value="" label="全部"></el-option>
                  <el-option value="I" label="I - 入境"></el-option>
                    <el-option value="O" label="O - 出境"></el-option>
                    <el-option value="G" label="G - 过境"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">命中人员类别：</span>
              <el-select v-model='pd.eventtype' placeholder="请选择" size="small" filterable clearable class="input-input">
                <el-option value="" label="全部"></el-option>
                  <el-option value="0" label="0 - 黑名单"></el-option>
                    <el-option value="1" label="1 - 白名单"></el-option>
                    <el-option value="2" label="2 - 临控名单"></el-option>
                    <el-option value="3" label="3 - 重点关注人员"></el-option>
                    <el-option value="4" label="4 - 二次查控"></el-option>
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

      <el-table
        :data="tableData"
        border
        fit
        style="width: 100%;"
        @sort-change="ccc()"
        @cell-click="getMore"
      >
        <el-table-column
          sortable="custom"
          prop="NAME"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="GENDERNAME"
          label="性别"
          sortable="custom"
          >

        </el-table-column>
        <el-table-column
          prop="BIRTHDAY"
          label="出生日期"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="DEPARTDATESTRING"
          label="航班日期"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入标识"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="NSTRUCT_NEW"
          label="反馈结果"
          sortable="custom">
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="最终命中人员类别" width="170"
          sortable="custom">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          sortable="custom">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="details(scope.row)">详情</el-button>
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

    <!-- <el-dialog
      title="查询结果"
      :visible.sync="queryDialogVisible"
      width="1110px"
      >
      <div class="add-dialog">
        <el-table :data="gridData">
          <el-table-column property="name" label="姓名" width="150"></el-table-column>
          <el-table-column property="gender" label="性别" width="200"></el-table-column>
          <el-table-column property="birthDate" label="出生日期"></el-table-column>
          <el-table-column property="nationality" label="国籍" width="200"></el-table-column>
          <el-table-column property="idCard" label="身份证号"></el-table-column>
          <el-table-column property="" label="是否同值机" width="200"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queryDialogVisible = false" size="small">确定</el-button>
      </span>
    </el-dialog> -->
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
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">属性名：{{check.FIELDNAME}}</el-col>
            <el-col :span="6">属性值：{{check.FIELDVALUES}}</el-col>
            <el-col :span="6">是否必填：{{check.INPUT}}</el-col>
            <el-col :span="6">最小长度：{{check.MINLENGTH}}</el-col>
          </el-row>

          <el-row type="flex"  class="mb-6">
            <el-col :span="6">最大长度：{{check.MAXLENGTH}}</el-col>
            <el-col :span="6">正则表达式：{{check.REGULAR}}</el-col>
            <el-col :span="12">错误描述：{{check.DETAIL}}</el-col>
          </el-row>
        </div>

        <!-- 名单比中详情 -->
        <div class="" v-show="isName">
          <div class="hrtitle">名单比中详情</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">
              <el-button type="primary" plain name="button"  size="mini" @click="reviewDetail">查看评价详情</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 业务规则校验不通过 -->
        <div class="" v-show="isRules">
          <div class="hrtitle">业务规则校验不通过</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">规则名称：{{rules.MATCHRRULE}}</el-col>
            <el-col :span="6">返回状态：{{rules.STATUS}}</el-col>
            <el-col :span="12">错误详情：{{rules.CHECKREMARK}}</el-col>
          </el-row>
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
  data(){
    return{
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      pd: {},
      queryDialogVisible: false,
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
      eve:'',
      dform:{},
      rules:{},
      check:{},
      isCheck:false,
      isName:true,
      isRules:true,
      multipleSelection: [],
      detailsDialogVisible:false,
      lazyQuery:'',
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
      form: {},

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.nationalityEqual=msg;
      console.log("============",this.pd.nationalityEqual)
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
      pd.saveflag=1;
      pd.instructNew="1Z";
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/event/queryEventHisListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    details(i){
      if(i.EVENTTYPE == '0'){
        this.$router.push({name:'alarmProcess',query:{eventserial:i.EVENTSERIAL,type:0}})
      }else if(i.EVENTTYPE == '3'){
        this.$router.push({name:'alarmProcess',query:{eventserial:i.EVENTSERIAL,type:0}})
      }else if(i.EVENTTYPE == '4'){}
    },
    getMore(row,cell){
      console.log(row);
      if(cell.property =='NAME'){
        this.detailsDialogVisible = true;
        let gm = {
          "serial":row.REFSERIAL
        }
        this.$api.post('/manage-platform/iapi/queryIapiInfo',gm,
         r =>{
           if(r.success){
             this.dform = r.data.IAPI;
             if(r.data.hasOwnProperty('CHECKDATA') == false){
               this.isCheck = false;
             }else{
               this.isCheck = true;
               this.check = r.data.CHECKDATA;
             }

             if(r.data.hasOwnProperty('RULELIST') == false){
               this.isRules = false;
             }else{
               this.isRules = true;
               this.rules = r.data.RULELIST;
             }

             if(r.data.hasOwnProperty('EVENT') == false){
               this.isName = false;
             }else{
               this.isName = true;
               this.eve = r.data.EVENT;
             }
           }
         })
      }
    },
    reviewDetail(){
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:0}})
         }else if(r.data == false){
           this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:1}})
         }
       })
    },
  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
</style>
