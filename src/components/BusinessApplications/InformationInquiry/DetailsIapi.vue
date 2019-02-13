<template lang="html">
  <div>
    <el-form :model="dform" ref="detailsForm">
      <div class="hrtitle">基本信息</div>
      <el-row type="flex"  class="t-detail">
        <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍/地区：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">证件颁发国：</div><div class="t-el-sub">{{dform.PASSPORTISSUECOUNTRYNAME}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dform.PASSPORTEXPIREDATESTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="6" class="t-el-content"><div class="t-el-text">证件签发日期：</div><div class="t-el-sub">{{dform.PASSPORTISSUEDATESTR}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">出生国：</div><div class="t-el-sub">{{dform.BIRTHCOUNTRYNAME}}</div></el-col>
        <el-col :span="6" class="t-el-content"><div class="t-el-text">居住国：</div><div class="t-el-sub">{{dform.RESIDENCENAME}}</div></el-col>
      </el-row>
      <div class="hrtitle">航班信息</div>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">预计起飞时间：</div><div class="t-el-sub">{{dform.DEPARTDATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">预计到达时间：</div><div class="t-el-sub">{{dform.ARRIVDATESTR}}</div></el-col>

      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">原预检结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">最终预检结果：</div><div class="t-el-sub">{{dform.LASTCHECKRESULTSTR}}</div></el-col>
        <!-- <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col> -->
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班状态：</div><div class="t-el-sub">{{dform.FLIGHTSTATUSSTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班起飞时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEUPSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班取消时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEDOWNSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">降落口岸：</div><div class="t-el-sub">{{dform.PORTSTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
      </el-row>
      <div class="hrtitle">其他信息</div>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客订票号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">出入境手续：</div><div class="t-el-sub">{{dform.EEFLAG==1?'是':'否'}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">是否订票：</div><div class="t-el-sub">{{dform.PNRFLAG==1?'是':'否'}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">是否值机：</div><div class="t-el-sub">{{dform.CHKFLAG==1?'是':'否'}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">航班是否关闭：</div><div class="t-el-sub">{{dform.CLSFLAG==1?'是':'否'}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">是否报警：</div><div class="t-el-sub">{{dform.ISEVENT}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">ABO唯一标识：</div><div class="t-el-sub">{{dform.ABONO}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件号码：</div><div class="t-el-sub">{{dform.OTHER_NO}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件有效期：</div><div class="t-el-sub">{{dform.OTHER_EXPIREDATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件颁发国：</div><div class="t-el-sub">{{dform.OTHER_ISSUECOUNTRYSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件签发日期：</div><div class="t-el-sub">{{dform.OTHERDOCUMENTISSUEDATESTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">签证号码：</div><div class="t-el-sub">{{dform.VISANO}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">签证有效期：</div><div class="t-el-sub">{{dform.VISAEXPIREDATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">签证国家：</div><div class="t-el-sub">{{dform.VISAISSUECOUNTRYSTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">签证签发日期：</div><div class="t-el-sub">{{dform.VISAISSUEDATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dform.ORIGINSTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地地址：</div><div class="t-el-sub">{{dform.DESTADDRESS}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地城市：</div><div class="t-el-sub">{{dform.DESTCITY}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">目的的所在省：</div><div class="t-el-sub">{{dform.DESTSTATESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地国家：</div><div class="t-el-sub">{{dform.DESTCOUNTRYSTR}}</div></el-col>
      </el-row>
      <el-row type="flex"  class="t-detail">
        <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地邮编：</div><div class="t-el-sub">{{dform.DESTPOSTALCODE}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">边检接收时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
        <el-col :span="8" class="t-el-content"><div class="t-el-text">边检回复时间：</div><div class="t-el-sub">{{dform.IAPI_RESPONSETIMESTR}}</div></el-col>
      </el-row>
      <!-- 数据有效性 -->
      <div class="" v-show="isCheck">
        <div class="hrtitle">数据有效性</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">属性名：</div><div class="t-el-sub">{{check.FIELDNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">属性值：</div><div class="t-el-sub">{{check.FIELDVALUES}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">是否必填：</div><div class="t-el-sub">{{check.INPUT}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">最小长度：</div><div class="t-el-sub">{{check.MINLENGTH}}</div></el-col>
        </el-row>

        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">最大长度：</div><div class="t-el-sub">{{check.MAXLENGTH}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">正则表达式：</div><div class="t-el-sub">{{check.REGULAR}}</div></el-col>
          <el-col :span="12" class="t-el-content"><div class="t-el-text">错误描述：</div><div class="t-el-sub">{{check.DETAIL}}</div></el-col>
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
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">规则名称：</div><div class="t-el-sub">{{rules.MATCHRRULE}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">返回状态：</div><div class="t-el-sub">{{rules.STATUS}}</div></el-col>
          <el-col :span="12" class="t-el-content"><div class="t-el-text">错误详情：</div><div class="t-el-sub">{{rules.CHECKREMARK}}</div></el-col>
        </el-row>
      </div>

      <div class="hrtitle" style="margin-bottom:10px">历史值机信息</div>
      <el-table
        :data="detailstableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="NAME"
          label="姓名"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          label="性别"
          sortable
          width="80">
        <template slot-scope="scope">
          {{scope.row.GENDER | fiftersex}}
        </template>
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期"
          sortable
          width="130">
        </el-table-column>
        <el-table-column
          prop="NATIONALITYC"
          label="国籍/地区"
          sortable>
        </el-table-column>

        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          sortable
          width="130">
        </el-table-column>

        <el-table-column
          prop="FLTNO"
          label="航班号"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="SCHEDULEDEPARTURETIME"
          label="航班日期"
          sortable
          width="140">
        </el-table-column>

        <el-table-column
          label="预检结果"
          sortable
          width="120">
          <template slot-scope="scope">
            {{scope.row.CHECKRESULT | fiftecr}}
          </template>
        </el-table-column>
        <el-table-column
          label="报警信息"
          sortable
          width="120">
          <template slot-scope="scope">
            {{scope.row.STATUS | fifterbj}}
          </template>
        </el-table-column>

      </el-table>
      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共{{htotalPage}}页
          </div>
          <div class="">
            每页
            <el-select v-model="hshowCount" @change="hpageSizeChange(hshowCount)" placeholder="10" size="mini" class="page-select">
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
            共{{htotalResult}}条
          </div>
        </div>
        <el-pagination
          background
          @current-change="hhandleCurrentChange"
          :page-size="hshowCount"
          layout="prev, pager, next"
          :total="htotalResult">
        </el-pagination>
      </div>
    </el-form>
    <el-dialog
      title="事件文档"
      :visible.sync="queryDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>
  </div>
</template>

<script>
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
export default {
  components: {AlarmProcess},
  data(){
    return{
      dform:{},
      check:{},
      rules:{},
      eve:'',
      isCheck:false,
      isName:true,
      isRules:true,
      detailstableData:[],
      queryDialogVisible:false,
      historyCdt:{},
      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数
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
      nav1Id:null,
      nav2Id:null,
      SERIAL:this.SERIAL,
    }
  },
  props:['SERIAL','PASSPORTNO','iapiNationaName'],
  watch:{
    SERIAL:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.SERIAL = newVal;
      this.details();
    }
  },
  mounted(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  activated(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  filters:{
    fiftersex(val) {
      if (val == "F") {
        return "女"
      } else if (val == "M") {
        return "男"
      } else if (val == "U") {
        return "未知"
      }
    },
    fiftecr(val) {
      if (val == "0Z") {
        return "允许打印登机牌";
      } else if (val == "1Z") {
        return "禁止打印登机牌";
      } else if (val == "2Z") {
        return "请再次核对";
      } else {
        return "数据错误";
      }
    },
    fifterbj(val) {
      if (val == "1") {
        return "产生报警";
      } else {
        return "未产生报警";
      }
    },
  },
  methods:{
    getHistoryList(hcurrentPage,hshowCount,historyCdt){
      let gh = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"pd":historyCdt
      };
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',gh,
      r =>{
        this.detailstableData = r.data.pdList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    reviewDetail(){//详情里的查看详情信息
      this.queryDialogVisible = true;
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.eve,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }else if(r.data == false){
           this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
             confirmButtonText: '确定',
             type: 'warning'
           })
         }
       })
    },
    details(){
      this.historyCdt.NATIONALITY = this.iapiNationaName;
      this.historyCdt.PASSPORTNO = this.PASSPORTNO;
      this.historyCdt.nationalityEqual = this.iapiNationaName;
      this.historyCdt.passportnoEqual = this.PASSPORTNO;
      this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
      let p={
        'serial':this.SERIAL
      }
      this.$api.post('/manage-platform/iapi/queryIapiInfo',p,
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
  }
}
</script>

<style lang="css">
</style>
