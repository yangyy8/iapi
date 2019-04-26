<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-10">
      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text"><i class="t-must">*</i>时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="pd.startCreatetime"
                     type="date"
                     size="small"
                     value-format="yyyyMMdd"
                     format="yyyy-MM-dd"
                     placeholder="开始时间" >
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.endCreatetime"
                      type="date"
                      size="small"
                      format="yyyy-MM-dd"
                      value-format="yyyyMMdd"
                      placeholder="结束时间"  >
                  </el-date-picker>
              </div>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text"><i class="t-must">*</i>模型：</span>
              <el-button type="success" size="small" plain @click="getmodel">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" size="small" plain @click="seeModel">点击查看</el-button>
            </el-col>
            <el-dialog title="模型选择" :visible.sync="modelDialogVisible" width="640px" :before-close="cancelModel">
              <el-input
                placeholder="输入模型关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                class="filter-tree"
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="MODEL_CODE"
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

            <el-dialog title="模型选择" :visible.sync="seeModelDialogVisible" width="800px">
              <div class="" v-show="modelCheck">
                <span class="redx">您还未选择模型</span>
              </div>
              <el-row align="center" style="width:100%">
                <!-- <h4 style="margin-top:0px!important">选中的模型</h4> -->
                <span v-for="(item,ind) in dutyName" :key="ind" style="width:25%;margin-bottom: 7px;display:inline-block;line-height: 20px;">{{item.MODEL_NAME}}</span>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="seeModelDialogVisible = false" size="small">取 消</el-button>
              </div>
            </el-dialog>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text" style="width:20%!important">类型：</span>
              <div class="input-input t-flex t-date" style="width:80%!important">
                <el-select v-model="pd.type" @visible-change="pd.typeValue=[]" filterable placeholder="请选择" size="small" class="tt-input" style="width:42%!important">
                  <el-option label="请选择" value="0"></el-option>
                  <el-option label="1 - 国籍/地区" value="1"></el-option>
                  <el-option label="2 - 航线" value="2"></el-option>
                  <el-option label="3 - 签证种类" value="3"></el-option>
                  <el-option label="4 - 证件种类" value="4"></el-option>
                  <el-option label="5 - 年龄段" value="5"></el-option>
                </el-select>
                <span class="septum">-</span>
                <el-select v-if="pd.type!=5" :disabled="!pd.type||pd.type=='0'" v-model="pd.typeValue" multiple filterable clearable placeholder="请选择"  size="small" class="tt-input" collapse-tags style="text-align:left!important;width:68%!important">
                  <el-option
                    v-if="pd.type==1"
                    v-for="item in nationAlone"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                  <el-option
                    v-if="pd.type==2"
                    v-for="(item,ind) in airline"
                    :key="ind"
                    :label="item.AIRWAY_CODE+' - '+item.AIRLINE_DESC"
                    :value="item.AIRWAY_CODE">
                  </el-option>
                  <el-option
                    v-if="pd.type==3"
                    v-for="(item,ind) in visaType"
                    :key="ind"
                    :label="item.CODE+' - '+item.NAME"
                    :value="item.CODE">
                  </el-option>
                  <el-option
                    v-if="pd.type==4"
                    v-for="(item,ind) in cardType"
                    :key="ind"
                    :label="item.CODE+' - '+item.NAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
                <el-select v-if="pd.type==5" :disabled="!pd.type||pd.type=='0'" v-model="pd.typeValue" multiple filterable placeholder="请选择"  size="small" class="tt-input" collapse-tags style="text-align:left!important;width:68%!important">
                  <el-option label="A - 0~6 童年" value="A"></el-option>
                  <el-option label="B - 7~17 少年" value="B"></el-option>
                  <el-option label="C - 18~40 青年" value="C"></el-option>
                  <el-option label="D - 41~65 中年" value="D"></el-option>
                  <el-option label="E - >=66 老年" value="E"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item" style="position:relative">
              <span class="input-text">量选择：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.number" multiple clearable filterable class="block input-input" collapse-tags>
                <el-option label="使用量" value="0"></el-option>
                <el-option label="报警量" value="1"></el-option>
                <el-option label="命中量" value="2"></el-option>
                <el-option label="查获量" value="6"></el-option>
              </el-select>
              <span class="el-icon-warning t-tip" @click="warnOpen"></span>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item" style="position:relative">
              <span class="input-text">率选择：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.percent" multiple clearable filterable class="block input-input" collapse-tags>
                <el-option label="报警率" value="3"></el-option>
                <el-option label="模型命中率" value="4"></el-option>
                <el-option label="报警命中率" value="5"></el-option>
                <el-option label="查获率" value="7"></el-option>
              </el-select>
              <span class="el-icon-warning t-tip" @click="warnOpenLv"></span>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text widthT">排行榜：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.rank" clearable filterable class="block input-input widthTT">
                <el-option label="使用量" value="0"></el-option>
                <el-option label="报警量" value="1"></el-option>
                <el-option label="命中量" value="2"></el-option>
                <el-option label="查获量" value="6"></el-option>
                <el-option label="报警率" value="3"></el-option>
                <el-option label="模型命中率" value="4"></el-option>
                <el-option label="报警命中率" value="5"></el-option>
                <el-option label="查获率" value="7"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small"  class="mt-15" @click="getList()">查询</el-button>
          <el-button type="primary" class="mt-15" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle mb-2" v-for="(x,ind) in chartList" :key="ind">
      <div class="map-title">{{x.titleText}}</div>
      <span class="tubiao hand wwm" :class="{'checked':x.censusParamBean.queryType==0,'xuanzeLiang':isLiang}" :style="{display:qq}" @click="getType(x,ind,0);">量</span
      ><span class="tubiao hand wwm" :style="{display:qq}" :class="{'checked':x.censusParamBean.queryType==1,'xuanzeLv':isLv}" @click="getType(x,ind,1);">率</span
      ><span class="tubiao hand phb" :style="{display:qq}" :class="{'checked':x.censusParamBean.queryType==2,'xuanzeLv':isPai}" @click="getType(x,ind,2);">排行榜</span>

      <!-- <span class="tubiao hand borderL wwm" :class="{'checked':x.censusParamBean.queryType==0}" @click="getType(x,ind,0);" v-show="isLiang">量</span
      ><span class="tubiao hand borderR wwm" :class="{'checked':x.censusParamBean.queryType==1}" @click="getType(x,ind,1);" v-show="isLv">率</span
      ><span class="tubiao hand borderR phb" :class="{'checked':x.censusParamBean.queryType==2}" @click="getType(x,ind,2);" v-show="isPai">排行榜</span> -->
      <div class="" style="position:relative;" @mouseover="mouseHeader">
        <el-button class="table-btn dz-btn" plain @click="customized(x.censusParamBean)">定制</el-button>

        <Vecharts :chartDatas="x" v-if="x.titleText" :chartsId="ind"></Vecharts>
        <el-table
          :data="x.tableData"
          border
          style="width: 100%;"
          class="homePage o-table3"
          @header-click="headerClick">
          <el-table-column
            :label="data" v-for="(data,key) in x.header" :key="key">
            <template slot-scope="scope">
                {{x.tableData[scope.$index][key]}}
            </template>
          </el-table-column>
        </el-table>
        <span style="color:#FFCF81">注：列表数据查看顺序&nbsp;&nbsp;&nbsp;&nbsp;{{x.prompt}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vecharts from './echart'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  components:{
    Vecharts
  },
  data(){
    return{
      isLiang:true,
      isLv:true,
      isPai:true,
      qq:'none',
      modelDialogVisible:false,
      seeModelDialogVisible:false,
      modelCheck:false,
      isActive:true,
      dutyName:[],
      page:0,
      nationAlone:[],
      airline:[],
      cardType:[],
      visaType:[],
      pd:{type:'0',typeValue:[],queryType:'0',startCreatetime:'',endCreatetime:''},
      chartList:[],

      liangChart:null,
      lvChart:null,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'model',
        label: 'name'
      },
      chartItem:null,
      historyModel:null,
      keys:[],
      keysExample:[],
      flagCZ:0,
      flagQX:0,
    }
  },
  watch:{
     filterText(val) {
       this.$refs.tree.filter(val);
     }
  },
  mounted(){
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.startCreatetime=formatDate(begin,'yyyyMMdd');
    this.pd.endCreatetime=formatDate(end,'yyyyMMdd');
    this.queryNationalityAlone();
    this.queryAirline();
    this.queryCardType();
    this.queryVisaType();
  },
  activated(){

  },
  methods:{
    headerClick(column,event){
      event.target.title=column.label
    },
    customized(item){
      this.$api.post('/manage-platform/census/saveCustom',item,
       r =>{
         if(r.success){
           this.$message({
             message: '保存成功！',
             type: 'success'
           });
         }
       })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getmodel(){//点击选择
      this.filterText='';
      this.modelDialogVisible=true;
      if(this.flagCZ==1&&this.flagQX==1){
        this.keys = this.keysExample
        this.$refs.tree.setCheckedKeys(this.keys);
        console.log(this.keys);
      }
      this.flagCZ = 0;
      this.flagQX = 0;
      if(this.pd.models == undefined||this.pd.models.length==0){
        this.$api.post('/manage-platform/census/queryPortAndModel',{},
         r => {
           this.treeData=r.data;
        })
      }
    },
    resetModel(){//重置
      this.flagCZ=1;
      if(this.pd.models == undefined||this.pd.models.length==0){//没有值的时候
        this.historyModel = [];
        this.keysExample = [];
      }else{
        this.historyModel = this.$refs.tree.getCheckedNodes(true,true);;//存入清空前的值
        this.keysExample = this.$refs.tree.getCheckedKeys(true);//先存值再清空
      }
      this.$refs.tree.setCheckedKeys([]);
    },
    cancelModel(){//取消
      this.flagQX=1;
      if(this.flagCZ == 1){
        this.pd.models=this.historyModel;
      }
      this.modelDialogVisible=false
    },
    seeModel(){
      this.seeModelDialogVisible = true;
      this.dutyName = this.pd.models;
      if(this.dutyName == undefined || this.dutyName.length == 0){
        this.modelCheck = true
      }else{
        this.modelCheck = false
      }
    },
    getCheckedNodes() {//确认
      this.pd.models=this.$refs.tree.getCheckedNodes(true,true);
      this.modelDialogVisible=false;
    },

    reset(){
      this.pd={
        type:'0',
        typeValue:[],
        queryType:'0',
        number:[],
        percent:[],
        rank:'',
        startCreatetime:formatDate(new Date(new Date() - 1000 * 60 * 60 * 24 * 30),'yyyyMMdd'),
        endCreatetime:formatDate(new Date(),'yyyyMMdd')
      }
      this.chartList=[];
    },
    getList(){
      console.log(this.pd.startCreatetime);
      if(this.pd.startCreatetime==''||this.pd.endCreatetime==''||this.pd.startCreatetime==null||this.pd.endCreatetime==null){
        this.$message({
          message: '查询时间不能为空',
          type: 'warning'
        });
        return false
      }
      if(dayGap(this.pd.startCreatetime,this.pd.endCreatetime,0)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      console.log(this.pd.models);
      if(this.pd.models==undefined||this.pd.models.length==0){
        this.$alert('模型不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(this.pd.type!='0'&&this.pd.typeValue.length==0){
        this.$alert('请选择类型', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if((this.pd.number==''||this.pd.number==undefined)&&(this.pd.percent==''||this.pd.percent==undefined)&&(this.pd.rank==''||this.pd.rank==undefined)){
        this.$alert('量选择,率选择和排行榜三者必选其一', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if(this.pd.number==''||this.pd.number==undefined){
        this.isLiang=false;
        this.qq='none'
      }else{
        this.isLiang=true;
        this.qq='none'
      }
      if(this.pd.percent==''||this.pd.percent==undefined){
        this.isLv=false;
        this.qq='none'
      }else{
        this.isLv=true;
        this.qq='none'
      }
      if(this.pd.rank==null||this.pd.rank==''||this.pd.rank==undefined){
        this.isPai=false;
        this.qq='none'
      }else{
        this.isPai=true;
        this.qq='none'
      }
      // if(this.pd.number!=''&&this.pd.percent!=''&&this.pd.rank!=null){
      //   this.isLiang=false;
      //   this.isLv=false;
      //   this.isPai=false;
      //   this.qq='inline-block'
      // }
      if(this.pd.number.length!=0){
        this.pd.queryType='0'
      }else{
        if(this.pd.percent.length!=0){
          this.pd.queryType='1'
        }else{
          if(this.pd.rank!=''){
            this.pd.queryType='2'
          }
        }
      }
      this.pd.ranking=[this.pd.rank];
      this.$api.post('/manage-platform/census/queryCensus',this.pd,
       r => {
         this.chartList=r.data;
         console.log(this.chartList[0].tableData);
      })

    },
    getType(item,index,type){
      item.censusParamBean.queryType=type;
      this.$api.post('/manage-platform/census/queryCensusByQueryType',item.censusParamBean,
       r => {
         this.chartList.splice(index,1,r.data);
         console.log(this.chartList)
      })
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAirline(){
      this.$api.post('/manage-platform/codeTable/queryAirline',{},
       r => {
         if(r.success){
           this.airline=r.data;
         }
      })
    },
    queryCardType(){
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryCardType',{},
       r => {
         if(r.success){
           this.cardType=r.data;
         }
      })
    },
    queryVisaType(){
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryVisaType',{},
       r => {
         if(r.success){
           this.visaType=r.data;
         }
      })
    },

    warnOpen(){
      this.$alert('使用量：模型比对一次算一次</br>报警量：模型比中</br>命中量：事件处理中确认该模型非误报', '提示', {
        dangerouslyUseHTMLString: true
      });
    },
    warnOpenLv(){
      this.$alert('报警率：报警量/使用量</br>模型命中率：命中量/使用量</br>报警命中率：命中量/报警量', '提示', {
        dangerouslyUseHTMLString: true
      });
    }
  }
}
</script>
<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.line-h{
  line-height: 30px
}
.t-input-input{
  width: 60%!important;
}
.pd-6{
  padding-bottom: 6px!important
}
.bb{
  border-bottom: 1px solid #ccc;
}
.tt-input-text{
  width: 24%!important;
}
.wrapper{
  padding-left:3%;
}
.tt-input{
  width: 47%!important;
}
.mb-10{
  margin-bottom: 10px!important;
}
.map-title{
  color: #71CEB2;
  font-size: 18px;
}
.checked{
  background:#56A8FE;
  color:#ffffff;
}
.t-tip{
  position:absolute;
  right: -18px;
  top: 7px;
  z-index: 999;
}
.dz-btn{
  position: absolute;
  right: 140px;
  top: 2px;
  width: 20px!important;
  height: 20px;
  line-height: 3px;
  z-index: 100;
}
.xuanzeLiang{
  /* border-top-right-radius: 3px;
  border-bottom-right-radius: 3px; */
  display: inline-block!important;
  /* background:#56A8FE;
  color:#ffffff; */
}
.xuanzeLv{
  /* border-top-left-radius: 3px;
  border-bottom-left-radius: 3px; */
  display: inline-block!important;
  /* background:#56A8FE;
  color:#ffffff; */
}
.dd{
  display: none;
}
.wwm{
  width: 14px;
}
.phb{
  width: 36px;
}
.widthT{
  width: 20%!important;
}
.widthTT{
  width: 80%!important;
}
</style>
