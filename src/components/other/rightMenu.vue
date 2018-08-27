<template lang="html">
  <div class="">
    <el-dropdown trigger="click">
       <span class="el-dropdown-link" style="color:#fff">
         欢迎您！{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
       </span>
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item v-for="(x,index) in navIdCCdata" v-if="index!=0"><span style="display:block;width:100%;height:100%" @click="$router.push('/content/'+navIdcc+'/ManageCenter?nav1Id='+x.parentId+'&nav2Id='+x.SERIAL)">{{x.name}}</span></el-dropdown-item>
         <el-dropdown-item><span style="display:block;width:100%;height:100%" @click="logOut">退出</span></el-dropdown-item>
       </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navIdcc:null,
      navIdCCdata:null,
      userName:null
    }
  },
  mounted(){
    this.getUers();

  },
  methods:{
    getUers(){
      this.$api.post('/manage-platform/homePage/userInfo',{},
       r => {
         this.userName=r.data.userName;
      })
    },
    getNav0(){
      this.$api.post('/manage-platform/muneSys/selectMenuOne',{},
       r => {
         r.data.muneListOne.map(function(a){
           if(a.name=='常用菜单'){
             this.navIdcc=a.SERIAL
             this.getNavCC(this.navIdcc)
           }
         },this)
      })
    },
    getNavCC(navId){
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          if(r.success){
            this.navIdCCdata=r.data.menuChild[0].menuList;
            console.log(this.navIdCCdata)

          }
        })

    },
    logOut(){
      this.$api.post('/manage-platform/landout',{},
       r => {
        if(r.success){
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          this.isLogin=false;
          // this.$router.push({path:'/',query:{isLogin:false}})

        }
      })

      // this.$router.go(0)
    },
  }
}
</script>

<style lang="css">
</style>
