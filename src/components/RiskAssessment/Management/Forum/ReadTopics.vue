<template lang="html">
  <div class="rank">

    <el-row type="flex" class="mb-6 ppading"  >
      <el-col :span="1" class="ttitle" style="width:70px;">
      <img src="../../../../assets/img/tx1.png">
      </el-col>
      <el-col :span="23">
        <el-row type="flex" class="mb-6" >
          <el-col :span="20" class="ttitle">
      #瑞典电视台回应节目报告#
          </el-col>
          <el-col :span="4" style="text-align:right">
            <el-button plain size="small" @click="adds(0,'');form={};">返回</el-button>
          <el-button type="success" size="small" @click="adds(0,'');form={};">编辑</el-button>
        </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 tcont" >
          <el-col :span="3">
            作者：张先生
          </el-col>
          <el-col :span="6">
            发布时间：2018-09-09 12：23：25</el-col>
            <el-col :span="8">
              有效时间：2018-09-09 12：23：25</el-col>
        </el-row>
        <el-row type="flex" class="mb-6 tcc" >
          <el-col :span="24">
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
               但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6 " >
          <el-col :span="20" class="ttitle">
       附件：###      <span class="sspan">  删除|下载</span>
          </el-col>
          <el-col :span="4" style="text-align:right">

          回复
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
            <el-input type="textarea" placeholder="请发表评论" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="pd.REASON" style="width:100%"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="text-align:right">

          <el-col :span="24" >
            <el-button plain size="small" @click="adds(0,'');form={};">发送</el-button>
          </el-col>
        </el-row>
      </el-col>

    </el-row>

    <el-row type="flex" class="mb-6 ppading" >
      <el-col :span="1" class="ttitle" style="width:70px;text-align:center;border-bottom:1px solid #dddddd;">
      <img src="../../../../assets/img/logo.png" width="40" height="40">
      </el-col>
      <el-col :span="23" class="hf">
        <el-row type="flex" class="mb-6 " >
          <el-col :span="24">
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 " >
          <el-col :span="20">
          2018-09-09 12：23：25    <span class="sspan">#12楼</span>
        </el-col>
         <el-col :span="4" style="text-align:right;">
             <img src="../../../../assets/img/zan.png">(24512)
           </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="mb-6 ppading" >
      <el-col :span="1" class="ttitle" style="width:70px;text-align:center;border-bottom:1px solid #dddddd;">
      <img src="../../../../assets/img/logo.png" width="40" height="40">
      </el-col>
      <el-col :span="23" class="hf">
        <el-row type="flex" class="mb-6 " >
          <el-col :span="24">
               当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 " >
          <el-col :span="24">
          2018-09-09 12：23：25    <span class="sspan">#12楼</span></el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
pd:{}
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
