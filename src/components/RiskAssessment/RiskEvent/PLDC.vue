<template lang="html">
  <div class="">
    <div class="top mb-6">
      <el-row align="center" :gutter="2">
        <el-col :sm="24" :md="12":lg="6">
          <span class="title-blue">查询条件：</span>
          <el-select v-model="select1" placeholder="请选择"  size="small" clearable filterable class="input-input">
            <el-option label="国籍+出入境证件号" value="1"></el-option>
            <el-option label="姓名+国籍+性别+出生日期" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :sm="24" :md="12":lg="6">
          <el-radio v-model="radio" label="1">手动输入</el-radio>
          <el-radio v-model="radio" label="2" class="mr-10">批量导入</el-radio>
          <el-button size="small" v-if="radio==2">下载模板</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="top mb-6" v-if="radio==1">
      <el-row type="flex">
        <el-col :span="2">
          <span class="title-blue">手动输入：</span>
        </el-col>
        <el-col :span="22" class="pr-20">
          <el-row align="center" :gutter="2" v-if="select1==1">
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.nationality" placeholder="请选择" size="small" multiple collapse-tags
                style="margin-left: 20px;" clearable filterable class="block input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">证件号：</span>
              <el-input v-model="pd.passportno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" v-if="select1==2">
            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.nationality" placeholder="请选择" size="small" multiple collapse-tags
                style="margin-left: 20px;" clearable filterable class="block input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input v-model="pd.name" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item">
              <span class="input-text">性別：</span>
              <el-select v-model="pd.gender" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="M - 男" value="1"></el-option>
                <el-option label="F - 女" value="2"></el-option>
                <el-option label="U - 未知" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
                size="small" value-format="yyyy-MM-dd"
                v-model="pd.birthday"
                type="date"
                start-placeholder="出生日期"
                class="input-input block">
              </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle mb-6" v-if="radio==2">
      <span class="title-blue">文件导入：</span>
      <label class="file">
        添加附件
        <input type="file" name="">
      </label>
    </div>
    <div class="top mb-6">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedModel" @change="handleCheckedModelChange" class="o-checkbox-g2">
        <el-checkbox v-for="m in models" :label="m" :key="m.id">{{m.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="middle" style="justify-content: center;">
      <el-button type="warning" size="small" class="mr-5">导出</el-button>
      <el-button type="success" size="small">查询</el-button>
    </div>
  </div>

</template>

<script>
const modelsOption = [

    {
      name:"标签详情",
      id:"box1"
    },
    {
      name:"风险评估",
      id:"box2"
    },
    {
      name:"户籍信息",
      id:"box5"
    },
    {
      name:"出入境信息",
      id:"box6"
    },
    {
      name:"出入境证件",
      id:"box7"
    },
    {
      name:"签证(居留)签发",
      id:"box8"
    },
    {
      name:"边检违法违规",
      id:"box9"
    },
    {
      name:"遣返遣送信息",
      id:"box10"
    },
    {
      name:"外管常住/临住",
      id:"box11"
    },
    {
      name:"出入境管理案事件",
      id:"box12"
    },
    {
      name:"收缴证件/物品",
      id:"box13"
    },
    {
      name:"携带枪支弹药",
      id:"box14"
    },
    {
      name:"自助备案",
      id:"box15"
    },
    {
      name:"API信息",
      id:"box16"
    },
    {
      name:"工作单位",
      id:"box17"
    },
    {
      name:"铁路订票",
      id:"box18"
    },
    {
      name:"民航订票",
      id:"box19"
    },
    {
      name:"民航离港",
      id:"box20"
    },
  ];
export default {
  data(){
    return{
      select1:'1',
      radio:'2',
      isIndeterminate: true,
      models:modelsOption,
      checkAll:false,
      checkedModel:[],
      pd:{nationality:[]},
      nationAlone:null,
    }
  },
  mounted(){
    this.queryNationalityAlone();
  },
  activated(){

  },
  methods:{
    handleCheckAllChange(val) {
      this.checkedModel = val ? modelsOption : [];
      this.isIndeterminate = false;
    },
    handleCheckedModelChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.models.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.models.length;
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
  }
}
</script>

<style scoped>
.middle{
  display: flex;
  align-items:center;
}
.file {
    position: relative;
    display: inline-block;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #409EFF;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
}
.file input {
    position: absolute;
    /* font-size: 100px; */
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
}
</style>
