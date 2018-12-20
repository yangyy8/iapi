<template lang="html">
  <div class="rank">
    <el-row class="mb-15">
      <el-button type="success" size="small" @click="addItemForum(pd);form={};">发送</el-button>
      <el-button type="primary" size="small" @click="getContent()">预览</el-button>
      <el-button plain size="small" @click="linkss()">取消</el-button>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        项目名称：
        <el-input placeholder="请输入内容(长度不超过100)" maxlength="100" size="small" v-model="pd.TITLE" class="inputr"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        过期时间：
         <el-date-picker class="inputr"
         v-model="pd.EXPIRATIONDATE" format="yyyy-MM-dd"
         type="date" size="small" value-format="yyyy-MM-dd"
         placeholder="请输入过期时间">
       </el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 介：
         <el-input placeholder="请输入内容" size="small" maxlength="660" v-model="pd.INTRO" class="inputr"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="mb-6 lht" >
      <el-col :span="24" >
        <label class="file">
          <img src="../../../../assets/img/fujian.png" />
          <input type="file" name="" multiple="multiple" @change="uploadFile">
        </label>

        <div class="" v-for="(ff,ind) in fileinfo" :key="ind">
          <span class="mr-30">{{ff.ACCESSORYNAME}}</span>
          <el-button type="text" class="redx" @click="delFileInfo(ff.SERIAL)">删除</el-button>
        </div>

        <div class="" v-if="fileData">
          <div class="" v-for="(x,ind) in fileData" :key="ind">
            <span class="mr-30">{{x.name}}   </span>
            <el-button type="text" class="redx" @click="deletes(ind)">删除</el-button>
          </div>

        </div>
      </el-col>
    </el-row>
     <div id="editorElem" style="text-align:left; margin-bottom:10px; "></div>
     <el-row class="mb-15">
    <el-button type="success" size="small" @click="addItemForum(pd);form={};">发送</el-button>
    <el-button type="primary" size="small" v-on:click="getContent()">预览</el-button>
    </el-row>
    <el-dialog
      title="预览"
      :visible.sync="ylDialogVisible"
      width="700px"
      >
<span v-html="editorContent"></span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ylDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data() {
    return {
      editorContent: '',
      pd: {},
      fileData: [],
      fileData0: [],
      SERIAL: "",
      ylDialogVisible: false,
      content: "",
      fileinfo: {}

    }
  },
  activated() {
    this.pd = {};
    this.getList();

  },
  mounted() {
    this.pd = {};
    this.getList();



    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()

  },
  methods: {
    getContent() {

      this.ylDialogVisible = true;

    },
    getList() {

      this.SERIAL = this.$route.params.SERIAL;
      this.content = "";
      this.editorContent = "";
      if (this.SERIAL != "" && this.SERIAL != undefined) {
        this.fileData=null;
        this.fileinfo=null;

        let p = {
          "SERIAL": this.SERIAL
        };

        this.$api.post('/manage-platform/itemForum/getItemForumInforNotComment', p,
          r => {
            console.log(r);
            this.pd = r.data;
            this.fileinfo = r.data.ACCESSORYNAMELIST;
            var editor = new E('#editorElem')
            editor.customConfig.onchange = (html) => {
              this.editorContent = html
            }
            editor.create()
            editor.txt.html(r.data.COUNT);
            this.editorContent = r.data.COUNT
            this.content = r.data.COUNT;
          });
      } else {
        this.fileData=null;
        this.fileinfo=null;

        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        editor.txt.html("");
      }
    },
    deletes(t) {
      console.log(this.fileData0);
      this.fileData0.splice(t, 1);
      this.fileData = this.fileData0

      // console.log(this.fileData0);
      // this.fileData0.splice(t,1);
      // this.fileData =[...this.fileData0];
    },
    delFileInfo(id) {
      let p = {
        "SERIAL": id
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/itemForum/deleteItemForumAccessory', p,
          r => {
            console.log("===" + r);
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList();
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
    addItemForum(pd) {
      pd.COUNT = this.editorContent;
      if (pd.TITLE == undefined || pd.TITLE.trim() == "") {
        this.$alert('项目名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      if (pd.EXPIRATIONDATE == undefined) {

        this.$alert('过期时间不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      if (pd.INTRO == undefined || pd.INTRO.trim() == "") {

        this.$alert('简介不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }


      if (this.content != "" && (pd.COUNT == undefined || pd.COUNT.trim() == "")) {
        pd.COUNT = this.content;
      }


      if (pd.COUNT == undefined || pd.COUNT.trim() == "") {

        this.$alert('发送内容不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      console.log(this.fileData);
      var formData = new FormData();
      if (this.SERIAL != "" && this.SERIAL != undefined) {

        formData.append("SERIAL", this.SERIAL);
      }
      if (this.fileData != null) {
        let arr = this.fileData;

        for (var i = 0; i < arr.length; i++) {
          formData.append("file", arr[i]);
        }
      }
      formData.append("TITLE", pd.TITLE);
      formData.append("INTRO", pd.INTRO);
      formData.append("COUNT", pd.COUNT);
      formData.append("EXPIRATIONDATE", pd.EXPIRATIONDATE);
      let p = formData;


      var url = '/manage-platform/itemForum/addItemForum';
      if (this.SERIAL != "" && this.SERIAL != undefined) {

        url = '/manage-platform/itemForum/updateItemForum';
      }

      this.$api.post(url, p,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });


            this.$router.push({
              name: 'Discussion'
            });

          } else {
            this.$message({
              message: r.message
            });
          }
          pd = {}
        }, e => {

        }, {
          'Content-Type': 'multipart/form-data'
        })
    },
    // 获取要上传的文件
    uploadFile(event) {

      this.fileData = event.target.files;
      //console.log(this.fileData)

      let _this = this
      if (this.fileData && this.fileData.length) {
        // 原始FileList对象不可更改，所以将其赋予curFiles提供接下来的修改
        Array.prototype.push.apply(_this.fileData0, _this.fileData);
      }
      //console.log(this.fileData0)
      //this.fileData0.push(event.target.files);

    },
    // 上传附件
    upload(serial) {
      console.log("this.fileData", this.fileData)
      var formData = new FormData();
      let arr = this.fileData;

      for (var i = 0; i < arr.length; i++) {
        formData.append("file", arr[i]);
      }
      formData.append("eventSerial", this.serial);
      formData.append("userId", this.user.userId);
      console.log(formData)
      let p = formData
      console.log("p", p)

      this.$api.post('/manage-platform/riskEventWarningController/upload', p,
        r => {
          if (r.success) {
            this.$message({
              message: '恭喜你，上传成功！',
              type: 'success'
            });
            if (this.delIndex.indexOf("3,") == -1) {
              this.delIndex += "3,"
            }
            // this.getRiskDescRecordInfo();
            this.fileData = null;
          } else {
            this.fileData = null;
            return
          }
        }, e => {

        }, {
          'Content-Type': 'multipart/form-data'
        })
    },
    linkss() {
      this.$router.push({
        name: 'Discussion'
      });
    }
  },



}
</script>

<style scoped>
.rank {
  background: #ffffff;
  min-height: 750px;
  padding: 10px;
}

.lht {
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
  color: #1676C2;
}

.inputr {
  width: 90%;
  border: none !important;
}

.file {
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
  width: 305px;
  height: 21px;

}

.file input {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
<style>
.lht .el-input--small .el-input__inner {
  border: none;
}

.w-e-menu {
  z-index: 2 !important;
}

.w-e-text-container {
  z-index: 1 !important;
}
</style>
