<template lang="html">
  <div class="rank">

    <el-row type="flex" class="mb-6 ppading"  >
      <el-col :span="1" class="ttitle" style="width:70px;">
      <img src="../../../../assets/img/tx1.png">
      </el-col>
      <el-col :span="23">
        <el-row type="flex" class="mb-6" >
          <el-col :span="20" class="ttitle">
      #{{itemForumData.TITLE}}#
          </el-col>
          <el-col :span="4" style="text-align:right">
            <el-button type="warning" size="small" @click="link()">返回</el-button>

          <el-button type="success" size="small" v-if="itemForumData.isOriginal" @click="edits()">编辑</el-button>
          <el-button type="danger" size="small" v-if="itemForumData.isOriginal" @click="deletes()">删除</el-button>
        </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 tcont" >
          <el-col :span="3">
            作者：{{itemForumData.CREATEUSERNAME}}
          </el-col>
          <el-col :span="6">
            发布时间：{{itemForumData.CREATETIME}}</el-col>
            <el-col :span="8">
              有效时间：{{itemForumData.EXPIRATIONDATE}}</el-col>
        </el-row>
        <el-row type="flex" class="mb-6 tcc" >
          <el-col :span="24">
               <!-- 当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。 -->
              <span v-html="itemForumData.COUNT"> </span>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6 " >
          <el-col :span="1"  class="ttitle" style="line-height:30px;">附件：</el-col>
          <el-col :span="15" style="line-height:30px;">
       <!-- 附件： <span v-for="name in accessoryNameList">{{ name.ACCESSORYNAME }}
         <span class="sspan"> <a :href="name.URL">下载</a>   </span>   </span>-->

   <div class="" v-for="name in accessoryNameList" :key="ind">
     <span class="mr-30">{{name.ACCESSORYNAME}}</span>

     <a :href="name.URL">下载</a>
   </div>
  </el-col>
          <el-col :span="4" style="text-align:right">

          <!-- 回复 -->
        </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="mb-6 fbpl" id="fbpl" >
      <el-col :span="24">
        <el-row type="flex" class="mb-6">
          <el-col :span="24">
          发表评论
          </el-col>

        </el-row>
        <el-row type="flex" class="mb-6">

          <el-col :span="24" >
            <el-input type="textarea" placeholder="请发表评论" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="pd.COMMENT_CONTENT" style="width:100%"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="text-align:right">

          <el-col :span="24" >
            <el-button plain size="small" @click="addItemForumComment(pd);form={};">发送</el-button>
          </el-col>
        </el-row>
      </el-col>

    </el-row>

    <el-row v-for="comment in tableData" type="flex" class="mb-6 ppading" >
      <el-col :span="1" class="ttitle" style="width:70px;text-align:center;border-bottom:1px solid #dddddd;">
      <img src="../../../../assets/img/logo.png" width="40" height="40">
      </el-col>
      <el-col :span="23" class="hf">
        <el-row type="flex" class="mb-6 " >
          <el-col :span="24">
               {{comment.COMMENTCREATEUSERNAME}}：  {{comment.COMMENT_CONTENT}}
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 " >
          <el-col :span="20">
          {{comment.CREATETIME}}    <span class="sspan"># {{comment.ROW_NUMBER}}  楼</span>
        </el-col>
         <el-col :span="4" style="text-align:right;">
             <a @click="clickCommentLike(comment.SERIAL);"><img src="../../../../assets/img/zan.png"  v-if='comment.CREDITUSERCOUNT==0'> <img src="../../../../assets/img/zan1.png" v-else></a> {{comment.CREDITNUMBER}}
           </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div class="middle-foot" style="padding:10px 25px;">
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
</template>
<script>
export default {
  data() {
    return {
      accessoryNameList:[],
      comment_infor:[],
      itemForumData:{},
      SERIAL:"",
      airport:[],
      backShow:false,
      fileList:[],
      CurrentPage:1,
      pageSize:5,
      TotalResult:0,
      tableData:[],
      pd:{}
    }
  },
  activated(){
    this.getItemForumInfor();
    this.getCommentList(this.CurrentPage,this.pageSize,this.pd);
  },

  methods:{
    getItemForumInfor(){
     this.SERIAL=this.$route.params.SERIAL;
    //  this.SERIAL="84652c2c38b34fe8a6101732f406c6a5";
      let p={
        "SERIAL":this.SERIAL
      };

      this.$api.post('/manage-platform/itemForum/getItemForumInforNotComment',p,
       r => {
         console.log(r);
         if(r.success){
           this.itemForumData=r.data;
           this.accessoryNameList=r.data.ACCESSORYNAMELIST;
         }
      })
    },
    pageSizeChange(val) {
      if(this.backShow){
        this.getHisFn(this.CurrentPage,val,this.pd);

      }else{
        this.getCommentList(this.CurrentPage,val,this.pd);
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if(this.backShow){
        this.getHisFn(val,this.pageSize,this.pd);
      }else{
        this.getCommentList(val,this.pageSize,this.pd);

      }
      console.log(`当前页: ${val}`);
    },
    getCommentList(currentPage,showCount,pd){
      pd.SERIAL=this.SERIAL;
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };

      this.$api.post('/manage-platform/itemForum/getCommentListPage',p,
       r => {
         console.log(r);
         if(r.success){
           // this.comment_infor=r.data;
           this.tableData=r.data.resultList;
           this.TotalResult=r.data.totalResult;
         }
      })
    },
    addItemForumComment(pd){
      pd.ITEM_FORUM_CODE=this.SERIAL;
      this.$api.post('/manage-platform/itemForum/addItemForumComment',pd,
       r => {
         console.log(r);
         if(r.success){
           this.$message({
             message: '评论成功！',
             type: 'success'
           });
         }else {
           this.$message({
             message: r.message
           });
         }
         pd.COMMENT_CONTENT="";
         this.getCommentList(1,this.pageSize,this.pd);
      })
    },
    clickCommentLike(serial){
      let p={
        "SERIAL":this.SERIAL,
        "COMMENTID":serial
      };
      this.$api.post('/manage-platform/itemForum/updateCommentLike',p,
       r => {
         console.log(r);
         if(r.success){

           // this.$message({
           //   message: '点赞成功！',
           //   type: 'success'
           // });


         }else {
           this.$message({
             message: r.message
           });
         }
         this.getCommentList(1,this.pageSize,this.pd);
      })
    },
    deletes() {
      let p = {
        "SERIAL": this.SERIAL
      };
      this.$confirm('您是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.post('/manage-platform/itemForum/deleteItemForumUp', p,
          r => {
            console.log("===" + r);
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.link();
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
    link(){


        this.$router.push({name:'Discussion'});
    },
    edits(){
         this.$router.push({name: 'Sponsor',params:{ SERIAL:this.SERIAL}});
    }
  }
}
</script>

<style scoped>
.rank{background: #ffffff; min-height: 750px; }
.ppading{padding: 10px;}
.ttitle{font-size: 18px; font-weight: bold; color: #295F79;}
.tcont{line-height: 30px; color: #999999;}
.tcc{line-height: 30px; color: #666666;}
.tline{width:1px; background:#dddddd; height:18px; margin-top:5px;}
.tborder{border-bottom: 1px solid #dddddd;}
.fbpl{background:#F9F9F9; padding: 20px; border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd;color: #999999;}
.hf{border-bottom:1px solid #dddddd; font-size: 14px; color: #666666;}
.sspan{margin-left:50px;font-weight:lighter; }
</style>
