<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">项目类型：</span>
              <el-select v-model="pd.LABELTYPE_CODE" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="北京" label="北京">
                </el-option>
                <el-option value="上海" label="上海">
                </el-option>
                <el-option value="广东" label="广东">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">项目类型：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">作者：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
            </el-col>
        <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">发帖时间：</span>
            <div class="input-input t-flex t-date">
            <el-date-picker
              v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
              type="datetime" size="small" value-format="yyyyMMddHHmmss"
              placeholder="开始时间"  :picker-options="pickerOptions" >
          </el-date-picker>
             <span class="septum">-</span>
             <el-date-picker
            v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
            type="datetime" size="small" value-format="yyyyMMddHHmmss"
            placeholder="结束时间" :picker-options="pickerOptions1" >
              </el-date-picker>
            </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">有效期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>

  <div class="middle" style="margin-top:20px;" >

    <el-row type="flex" class="mb-6" >
      <el-col :span="24" class="ttitle">
#瑞典电视台回应节目报告#
      </el-col>
    </el-row>

    <el-row type="flex" class="mb-6 tcont" >
      <el-col :span="3">
        作者：张先生
      </el-col>
      <el-col :span="8">
        发布时间：2018-09-09 12：23：25</el-col>
    </el-row>
    <el-row type="flex" class="mb-6 tcc" >
      <el-col :span="24">
           当地时间9月25日下等，瑞典电视台在官网发表了一篇文章回应视频事件，承认节目表达的整体意思出现了缺失，“为此道歉”，
           但对外界关于其节目涉及种族歧视和用错地图的指责依旧闪烁其词，未作道歉。
           <a href="#">查看全文</a>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 tcont tborder" >
      <el-col :span="5">
            有效时间：2018-09-09 12：20：23
      </el-col>
      <el-col :span="1">
            <div class="tline"></div>
      </el-col>
      <el-col :span="3" >
            回复数：233
      </el-col>
      <el-col :span="1">
            <div class="tline"></div>
      </el-col>
      <el-col :span="8" >
          最后回复: 刘先生   2018-09-10   10：23：11
      </el-col>
    </el-row>
  </div>


  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
  pd: {}
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
</style>
