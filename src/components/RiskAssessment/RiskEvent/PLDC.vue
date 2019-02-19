<template lang="html">
  <div class="">
    <div class="top mb-6">
      <el-row align="center" :gutter="2">
        <el-col :sm="24" :md="12":lg="6">
          <span class="title-blue">查询条件：</span>
          <el-select v-model="select1" placeholder="请选择"  size="small" clearable filterable class="input-input" @change="selectFn">
            <el-option label="国籍+出入境证件号" value="1"></el-option>
            <el-option label="姓名+国籍+性别+出生日期" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :sm="24" :md="12":lg="6">
          <el-radio v-model="radio" label="1">手动输入</el-radio>
          <el-radio v-model="radio" label="2" class="mr-10">批量导入</el-radio>
          <el-button size="small" v-if="radio==2" @click="downloadM">下载模板</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="top mb-6" v-if="radio==1">
      <el-row type="flex">
        <el-col :span="2">
          <span class="title-blue">手动输入：</span>
        </el-col>
        <el-col :span="11" class="pr-20" v-show="select1==1">
          <el-row align="center" :gutter="2"  v-for="(i,ind) in list1" :key="ind" style="position:relative">
            <el-col :sm="24" :md="12"  :lg="12" class="input-item my-form-group" data-scope="demo1" data-name="nationality" data-type="multiple"
              v-validate-easy="[['required']]">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="i.nationality" placeholder="请选择" size="small" multiple collapse-tags
                style="margin-left: 20px;" clearable filterable class="block input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="12" class="input-item my-form-group" data-scope="demo1" data-name="passportno" data-type="input"
              v-validate-easy="[['required']]">
              <span class="input-text">证件号：</span>
              <el-input v-model="i.passportno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>
            <el-button type="danger" plain size="mini" @click="delRow(ind)" class="delBtn" v-if="ind>0">删除</el-button>

          </el-row>

        </el-col>
        <el-col :span="21" class="pr-20" v-if="select1==2">
          <el-row align="center" :gutter="2" v-for="(j,ind2) in list2" :key="ind2" style="position:relative">
            <el-col :sm="24" :md="12"  :lg="6" class="input-item my-form-group" data-scope="demo1" data-name="nationality" data-type="multiple"
              v-validate-easy="[['required']]">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="j.nationality" placeholder="请选择" size="small" multiple collapse-tags
                style="margin-left: 20px;" clearable filterable class="block input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6" class="input-item my-form-group" data-scope="demo1" data-name="lkname" data-type="input"
              v-validate-easy="[['required'],['cname']]">
              <span class="input-text">姓名：</span>
              <el-input v-model="j.lkname" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="6" class="input-item my-form-group" data-scope="demo1" data-name="gender" data-type="select"
              v-validate-easy="[['required']]">
              <span class="input-text">性別：</span>
              <el-select v-model="j.gender" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="1 - 男" value="1"></el-option>
                <el-option label="2 - 女" value="2"></el-option>
                <el-option label="3 - 未知" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6"  class="input-item my-form-group" data-scope="demo1" data-name="dateofbirth" data-type="select"
              v-validate-easy="[['required']]">
              <span class="input-text">出生日期：</span>
              <el-date-picker
                size="small" value-format="yyyy-MM-dd"
                v-model="j.dateofbirth"
                type="date"
                start-placeholder="出生日期"
                class="input-input block">
              </el-date-picker>
            </el-col>
            <el-button type="danger" plain size="mini" @click="delRow(ind2)" class="delBtn" v-if="ind2>0">删除</el-button>

          </el-row>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" @click="addRow">添加</el-button>

        </el-col>
      </el-row>
    </div>
    <div class="middle mb-6" v-if="radio==2">
      <span class="title-blue">文件导入：</span>
      <label class="file mr-10">
        添加附件
        <input type="file" name="" @change="uploadFile">

      </label>
      <span v-if="fileData" class="mr-10">{{fileData.name}}</span>
      <span style="color:#b2cb65">{{fileText}}</span>
    </div>
    <div class="top mb-6">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedModel" @change="handleCheckedModelChange" class="o-checkbox-g2">
        <el-checkbox v-for="m in models" :label="m.type" :key="m.type">{{m.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="middle" style="justify-content: center;">
      <el-button type="warning" size="small" class="mr-5" @click="batchExport">导出</el-button>
      <el-button type="success" size="small" v-if="radio==1&&list1.length==1&&list2.length==1" @click="chaxun">查询</el-button>
    </div>
  </div>

</template>

<script>
const modelsOption = [

    {
      name:"标签详情",
      type:"2"
    },
    {
      name:"风险评估信息",
      type:"3"
    },
    {
      name:"户籍信息",
      type:"4"
    },
    {
      name:"出入境信息",
      type:"5"
    },
    {
      name:"出入境证件信息",
      type:"6"
    },
    {
      name:"签证(居留)签发信息",
      type:"7"
    },
    {
      name:"边检违法违规信息",
      type:"8"
    },
    {
      name:"遣返遣送信息",
      type:"9"
    },
    {
      name:"外管常住信息",
      type:"10"
    },
    {
      name:"外管临住信息",
      type:"11"
    },
    {
      name:"出入境管理案事件信息",
      type:"12"
    },
    {
      name:"收缴证件信息",
      type:"13"
    },
    {
      name:"收缴物品信息",
      type:"14"
    },
    {
      name:"携带枪支弹药信息",
      type:"15"
    },
    {
      name:"自助备案信息",
      type:"16"
    },
    {
      name:"API信息",
      type:"17"
    },
    {
      name:"工作单位信息",
      type:"18"
    },
    {
      name:"铁路订票信息",
      type:"19"
    },
    {
      name:"民航订票信息",
      type:"20"
    },
    {
      name:"民航离港信息",
      type:"21"
    },
  ];
export default {
  data(){
    return{
      select1:'1',
      radio:'2',
      fileData:null,
      fileText:'',
      isIndeterminate: false,
      models:modelsOption,
      checkAll:false,
      checkedModel:[],
      list1:[
        {nationality:[],passportno:''},
      ],
      m1:{nationality:[],passportno:''},
      list2:[
        {nationality:[],lkname:'',gender:'1',dateofbirth:''},
      ],
      m2:{nationality:[],lkname:'',gender:'1',dateofbirth:''},
      nationAlone:null,
    }
  },
  mounted(){
    this.queryNationalityAlone();
  },
  activated(){

  },
  methods:{
    selectFn(){
      this.list1=[
        {nationality:[],passportno:''},
      ];
      this.list2=[
        {nationality:[],lkname:'',gender:'1',dateofbirth:''},
      ];
    },
    handleCheckAllChange(val) {
      console.log(val)
      let arr=modelsOption.map(function(val){
        return val.type
      })
      this.checkedModel = val ? arr : [];
      this.isIndeterminate = false;
    },
    handleCheckedModelChange(value) {
      console.log(value)

      console.log(this.checkedModel)
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
    downloadM(){
      if(this.select1==1){
        window.location.href='http://192.168.99.247:8080/manage-platform/dzdaExport/erecordExcelOne.xls'
      }else if(this.select1==2){
        window.location.href='http://192.168.99.247:8080/manage-platform/dzdaExport/erecordExcelTwo.xls'
      }
    },
    // 获取要上传的文件
    uploadFile(event){
      this.fileData=event.target.files[0];
      console.log(this.fileData);
      let formData = new FormData();
      formData.append("file",this.fileData);
      formData.append("fileType",this.select1);
      this.$api.post('/manage-platform/excelController/importExcel',formData,
       r => {
         if(r.success){
           this.fileText="恭喜上传成功！"
           this.$message({
             message: '恭喜你，上传成功！',
             type: 'success'
           });
           return true;
         }
      },e => {

      },{'Content-Type': 'multipart/form-data'})
    },
    addRow(){
      if(this.select1==1){
        this.list1.push(this.m1)
      }else if(this.select1==2){
        this.list2.push(this.m2)
      }
    },
    delRow(ind){
      if(this.select1==1){
        this.list1.splice(ind,1)
      }else if(this.select1==2){
        this.list2.splice(ind,1)
      }
    },
    batchExport(){
      this.V.$submit('demo1', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        // 只有验证全部通过才会执行
        console.log('验证通过的数据'+data);
        if(this.checkedModel.length==0){
          this.$message.error('请选择要导出的模块！');
        }
        let p={
          exportType:this.radio,
          fileType:this.select1,
          type:this.checkedModel
        }
        if(this.radio==1){
          if(this.select1==1){
            p.list=this.list1
          }else{
            p.list=this.list2

          }
        }
        this.$api.post('/manage-platform/excelController/batchExport',p,
         r => {
           console.log("data",r)
           if (!r) {
               return
           }
           let url = window.URL.createObjectURL(new Blob([r.data],{type:"application/octet-stream"}))

           let link = document.createElement('a')
           link.style.display = 'none'
           link.href = url;
           link.setAttribute('download', 'batchExport.xlsx')
           document.body.appendChild(link)
           link.click();

         },e=>{},'','blob')
      })

    },
    chaxun(){
      this.V.$submit('demo1', (canSumit,data) => {
        if(!canSumit) return
        if(this.select1==1){
          this.$router.push({name:"FileDZDA",query:{list:this.list1[0],title:'人员电子档案'}})
        }else{
          this.$router.push({name:"FileDZDA",query:{list:this.list2[0],title:'人员电子档案'}})
        }
      })
    }
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
.delBtn{
  position: absolute;
  right:-75px;
  top:2px;
}
</style>
