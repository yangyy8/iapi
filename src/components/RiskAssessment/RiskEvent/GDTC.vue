<template >
  <el-dialog :title="gtitle" :visible.sync="gdDialogVisible2" width="640px" :before-close="handleClose">
    <el-form :model="gdform" ref="gdForm">
      <div class="mb-15">
        <div class="f-bold mb-9">
          归档描述
        </div>
        <el-input
          class="mb-9"
          type="textarea"
          v-model="gdform.describe"
          :rows="3"
          placeholder="请输入描述意见">
        </el-input>
      </div>
      <div class="boder1 mb-9">
        <div class="f-bold mb-9">
          处理结果
        </div>
        <el-row align="center" :gutter="2">
          <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
            <span class="mr-5">类别 </span>
            <el-cascader
              expand-trigger="hover"
              class="input-input"
              :options="options2"
              v-model="gdform.processorResult"
              @change="handleChange">
            </el-cascader>
          </el-col>
        </el-row>
      </div>
      <div class="">
        <div class="f-bold mb-9">
          添加标签
        </div>
        <div class="">
          <div class="tag-list mb-6">
            <span v-for="(val, key, index) in tagData" :key="index" @click="taged=key" :class="{'checked-tag':taged==key}">{{key}}</span>
          </div>
          <el-checkbox-group
            v-model="checkedtag">
            <el-checkbox v-for="(i,ind) in tagData[taged]" :label="i" :key="ind">{{i.tag_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="gdSave" size="small">确认</el-button>
      <el-button type="warning" @click="gclose" size="small">取消</el-button>

    </div>
  </el-dialog>
</template>

<script>
export default {
  name:"GDTC",
  props:['gtitle','gvisible','garr','gtype'],
  data(){
    return{
      user:{},
      options2:[
        {
          value: '1',
          label: '入境',
          children:[
            {
              value: '1',
              label: '允许入境',
              children:[
                {
                  value: '1',
                  label: '排除嫌疑，允许入境',
                },
                {
                  value: '2',
                  label: '暂未排除嫌疑，允许入境',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            },
            {
              value: '2',
              label: '阻止入境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                }
              ]
            }
          ]
        },
        {
          value: '2',
          label: '出境',
          children:[
            {
              value: '3',
              label: '允许出境',
              children:[
                {
                  value: '3',
                  label: '排除嫌疑，允许出境',
                },
                {
                  value: '4',
                  label: '暂未排除嫌疑，允许出境',
                },

              ]
            },
            {
              value: '4',
              label: '阻止出境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            }
          ]
        },
        {
          value: '3',
          label: '过境',
          children:[
            {
              value: '5',
              label: '允许过境',
              children:[
                {
                  value: '5',
                  label: '排除嫌疑，允许过境',
                },
                {
                  value: '6',
                  label: '暂未排除嫌疑，允许过境',
                },
                {
                  value: '8',
                  label: '移交相关单位',
                }
              ]
            },
            {
              value: '6',
              label: '阻止过境',
              children:[
                {
                  value: '7',
                  label: '参考梅沙',
                },

              ]
            }
          ]
        }

      ],
      tagData:{},
      taged:0,
      checkedtag:[],
      gdform:{},
      gdDialogVisible2:this.gvisible,
      listData:this.garr,
      gt:this.gtype
    }
  },
  mounted(){
    if(this.gvisible){
      this.getBatchEventArchiveTagInfo()
      this.getUers();
    }
    console.log(this.gvisible)
  },
  watch:{
    gvisible:function(val){
      this.gdDialogVisible2=val;
      if(val){
        this.gdform={};
        this.getBatchEventArchiveTagInfo()
        this.getUers();
      }
    },
    garr:function(val){
      this.listData=val
    },
    gtype:function(val){
      this.gt=val
    }
  },
  methods:{
    handleClose(done) {
      this.gdDialogVisible2=false;

      this.$emit("gclose", this.gdDialogVisible2)
      done();
    },
    getBatchEventArchiveTagInfo(){

      this.$api.post('/manage-platform/riskEventController/getBatchEventArchiveTagInfo',{},
       r => {
         this.tagData=r.data;
         var that = this;
         for(var i in that.tagData){
           console.log(i)
           that.taged=i
           return;
         }

      })
    },
    handleChange(value) {
        console.log(value);
        console.log(this.gdform.processorResult)
    },
    getUers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        console.log(r)
        this.user=r.data;
      })
    },
    gdSave(){
      let arr1=this.listData;
      let p={
        list:[],
        userId:this.user.userId
      };
      if(arr1.length){
        let that=this;
        for(var i=0;i<arr1.length;i++){
          let a={
            "eventSerial":arr1[i].serial,
            "newcheckresult":arr1[i].newcheckresult,
            "archive_pepole":arr1[i].archive_pepole,
            "nationality":arr1[i].nationality,
            "passportno":arr1[i].passportno,
            "describe":that.gdform.describe,
            "type":this.gt,
            "IOType":that.gdform.processorResult[0],
            "firstType":that.gdform.processorResult[1],
            "secondType":that.gdform.processorResult[2],
            "operation_type":1,
            "tag_type":2,
            "tagList":that.checkedtag
          }
          p.list.push(a)
        }

      }else{
       p.list=[
         {
           "eventSerial":arr1.serial,
           "newcheckresult":arr1.newcheckresult,
           "archive_pepole":arr1.archive_pepole,
           "describe":this.gdform.describe,
           "type":this.gt,
           "IOType":this.gdform.processorResult[0],
           "firstType":this.gdform.processorResult[1],
           "secondType":this.gdform.processorResult[2],
           "operation_type":1,
           "tag_type":2,
           "tagList":this.checkedtag
         }
       ]
      }

      this.$api.post('/manage-platform/riskEventController/saveBatchEventArchiveInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，操作成功！',
             type: 'success'
           });
           this.gdDialogVisible2=false;
           this.$emit("gclose", this.gdDialogVisible2)

         }
      })
    },
    gclose(){
      console.log("88888")
      this.gdDialogVisible2=false;
      this.$emit("gclose", this.gdDialogVisible2)
    }
  }
}
</script>

<style scoped>
.tag-list{
  color: #0274f1;
  border-bottom: 1px solid #0274f1;
  font-size: 16px;
  padding-bottom: 3px;
  display: flex;
  /* justify-content: space-between; */
}
.tag-list span{
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px!important;
}
.checked-tag{
  background: #0274f1;
  color: #fff;
  border-radius: 50%;
}
.tag-list span:hover{
  background: #0274f1;
  color: #fff;
  border-radius: 50%;
}
</style>
