<template lang="html">
  <div class="zlbg">
    <div class="middle">
      <div class="title-green">
        个人中心
      </div>
      <div class="ycontent">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 姓名：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.NAME" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 用户名：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.USERNAME" class="yy-input-input" ></el-input>

          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 警号：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.EMPLOYEE_CARD" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 状态：</span>
            <el-select v-model="form.STATUS"   placeholder="请选择" size="small" class="yy-input-input">
            <el-option value="1" label="启用">
              </el-option>
              <el-option value="0" label="停用">
              </el-option>
             </el-select>

          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">性别：</span>
            <el-select v-model="form.SEX"   placeholder="请选择" size="small" class="yy-input-input">
              <el-option value="1" label="男">
              </el-option>
              <el-option value="0" label="女">
              </el-option>
             </el-select>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 部门：</span>
            <el-select v-model="form.DEPT_ID"  filterable clearable placeholder="请选择" size="small" class="yy-input-input">
               <el-option
                 v-for="item in company"
                 :key="item.SERIAL"
                 :label="item.DEPT_JC"
                 :value="item.SERIAL" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 联系方式：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.PHONE" class="yy-input-input" ></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">身份证号：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.CERTIFICATE_NO" class="yy-input-input" ></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="margin-left:-90px;">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 角色：</span>
            <el-select v-model="form.roleList" multiple   placeholder="请选择" size="small" style="width:85%;">
               <el-option
                 v-for="item in role"
                 :key="item.SERIAL"
                 :label="item.ROLE_NAME"
                 :value="item.SERIAL" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="margin-left:-90px;">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
            <el-input type="textarea"  placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.REMARKS" style="width:85%;"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <!-- <el-button @click="" size="small">取 消</el-button> -->
      </div>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {},
      company:[],
      role:[],
    }
  },
  mounted() {
    this.getList();
    this.queryrole();
    this.queryNationality();
  },
  methods: {
    getList(){

    },
    queryNationality() {
      this.$api.post('/manage-platform/userSys/deptList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },
    queryrole() {
      this.$api.post('/manage-platform/userSys/roleList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.role = r.data.roleList;
          }
        })
    },
  }
}
</script>

<style scoped>
.ycontent {
  width: 700px;
  line-height: 40px;
  border: 1px solid #cccccc;
  padding: 20px 20px 20px 10px;
  border-radius: 5px;
}

.yy-input-text {
  width: 25% !important;
}

.yy-input-input {
  width: 75% !important;
}
</style>
