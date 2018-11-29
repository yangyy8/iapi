<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br pr-20">
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">项目类型：</span>
              <el-select v-model="pd.ITEMTYPE" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="0" label="全部">
                </el-option>
                <el-option value="1" label="个人">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">项目名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.TITLE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">作者：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CREATEUSER"  class="input-input"></el-input>
            </el-col>
        <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">发帖时间：</span>
            <div class="input-input t-flex t-date">
            <el-date-picker
              v-model="pd.BEGINDATE" format="yyyy-MM-dd"
              type="datetime" size="small" value-format="yyyy-MM-dd"
              placeholder="开始时间"  :picker-options="pickerOptions" >
          </el-date-picker>
             <span class="septum">-</span>
             <el-date-picker
            v-model="pd.EXPIREDATE" format="yyyy-MM-dd"
            type="datetime" size="small" value-format="yyyy-MM-dd"
            placeholder="结束时间" :picker-options="pickerOptions1" >
              </el-date-picker>
            </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">有效期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.STARTDEADLINE" format="yyyy-MM-dd"
               type="datetime" size="small" value-format="yyyy-MM-dd"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.EXPIRATIONDATE" format="yyyy-MM-dd"
                type="datetime" size="small" value-format="yyyy-MM-dd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>

          </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
  <div class="middle">
  <div style="text-align:right">  <el-button type="primary" size="small" @click="link()" >发帖子</el-button></div>

  <div v-for="site in tableData">
    <el-row type="flex" class="mb-6" >
      <el-col :span="24" class="ttitle">
      #{{ site.TITLE }}#
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 tcont" >
      <el-col :span="3">
        作者：{{ site.CREATEUSERNAME }}
      </el-col>
      <el-col :span="8">
        发布时间：{{ site.CREATETIME }}</el-col>
    </el-row>
    <el-row type="flex" class="mb-6 tcc" >
      <el-col :span="24">
           {{ site.INTRO }}
           <a href="#" class="aa" @click = "getItemForumInfor(site.SERIAL)">查看全文</a>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 tcont tborder" >
      <el-col :span="5">
            有效时间：{{ site.EXPIRATIONDATE }}
      </el-col>
      <el-col :span="1">
            <div class="tline"></div>
      </el-col>
      <el-col :span="3" >
            回复数：{{ site.COMMENT_NUMBER }}
      </el-col>
      <el-col :span="1">
            <div class="tline"></div>
      </el-col>
      <el-col :span="8" >
          最后回复: {{ site.FINALLY_COMMENT_USER }}        {{ site.FINALLY_COMMENT_TIME }}
      </el-col>
    </el-row>
  </div>
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


  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      airport:[],
      backShow:false,
      fileList:[],
      CurrentPage:1,
      pageSize:2,
      options: [{
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        }
      ],
      TotalResult:0,
      tableData:[],
      pd: {}
    }
  },

  mounted() {

this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    pageSizeChange(val) {
      if(this.backShow){
        this.getHisFn(this.CurrentPage,val,this.pd);
      }else{
        this.getList(this.CurrentPage,val,this.pd);
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if(this.backShow){
        this.getHisFn(val,this.pageSize,this.pd);
      }else{
        this.getList(val,this.pageSize,this.pd);

      }
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };
      console.log(pd)

      this.$api.post('/manage-platform/itemForum/getItemForumPage',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    getItemForumInfor(id){
      //alert(id);
       this.$router.push({name: 'ReadTopics',params:{ SERIAL:id}});
    },
    link(){


        this.$router.push({name:'Sponsor'});
    }
  }
}
</script>

<style scoped>
.ttitle{font-size: 18px; font-weight: bold; color: #295F79;}
.tcont{line-height: 30px; color: #999999;}
.tcc{line-height: 30px; color: #666666;}
.tline{width:1px; background:#dddddd; height:18px; margin-top:5px;}
.tborder{border-bottom: 1px solid #dddddd;}
.aa{color: #409EFF; margin-left: 20px; }
</style>
