<template lang="html">
  <div class="zlbg">
    <div class="middle">
      <div class="title-green">
        修改密码
      </div>
      <div class="ycontent">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 旧密码：</span>
            <el-input placeholder="请输入内容" size="small" type="password" v-model="form.PASSWORD" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 新密码：</span>
            <el-input placeholder="请输入内容" size="small" type="password"  v-model="form.PASSWORDNEW1" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 确认密码：</span>
            <el-input placeholder="请输入内容" size="small" type="password"  v-model="form.PASSWORDNEW2" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="form={}" size="small">重 置</el-button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{}
    }
  },
    methods: {
       addItem(i)
       {
         console.log("-----"+this.form.PASSWORD);
         let p = {
           "PASSWORD": this.form.PASSWORD,
           "PASSWORDNEW1": this.form.PASSWORDNEW1,
           "PASSWORDNEW2": this.form.PASSWORDNEW2
         };
         this.$api.post('/manage-platform/userSys/updatePwd', p,
           r => {
                if(r.success){
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });

                }
              this.form={};
           })

       }
    },
}
</script>


<style scoped>
.ycontent {
  width: 400px;
  line-height: 40px;
  border: 1px solid #cccccc;
  padding: 20px 20px 20px 0px;
  border-radius: 5px;
}

.yy-input-text {
  width: 25% !important;
}

.yy-input-input {
  width: 75% !important;
}
</style>
