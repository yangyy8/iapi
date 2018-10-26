<template lang="html">
  <div class="rank">

    <el-row class="mb-15">
      <el-button type="success" size="small" @click="adds(0,'');form={};">发送</el-button>
      <el-button type="primary" size="small" @click="adds(0,'');form={};">预览</el-button>
      <el-button plain size="small" @click="adds(0,'');form={};">取消</el-button>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        项目名称：
        <el-input placeholder="请输入内容" size="small" v-model="pd.NAME" class="inputr"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        过期时间：
         <el-input placeholder="请输入内容" size="small" v-model="pd.NAME1" class="inputr"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 介：
         <el-input placeholder="请输入内容" size="small" v-model="pd.NAME1" class="inputr"></el-input>
      </el-col>
    </el-row>

     <div id="editorElem" style="text-align:left; margin-bottom:10px;"></div>
     <el-row class="mb-15">
    <el-button type="success" size="small" @click="adds(0,'');form={};">发送</el-button>
    <el-button type="primary" size="small" v-on:click="getContent">预览</el-button>
    </el-row>

  </div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data() {
    return {
      editorContent: '',
      pd:{}
    }
  },
  methods: {
          getContent: function () {
              alert(this.editorContent)
          }
        },
mounted() {
          var editor = new E('#editorElem')
          editor.customConfig.onchange = (html) => {
            this.editorContent = html
          }
          editor.create()
  }


}
</script>

<style scoped>
.rank{background: #ffffff; min-height: 750px; padding: 10px;}
.lht{line-height: 40px; border-bottom: 1px solid #eeeeee; color: #1676C2;}
.inputr{width:90%;border:none!important;}

</style>
<style>
.lht .el-input--small .el-input__inner {
    border: none;
}
</style>
