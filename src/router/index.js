import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/content',
      name: 'Content',
      component:resolve =>require(['@/components/content'],resolve),

      children:[
// 业务处理=================================================================================================================================

        // 报警处理---------------------------------------------------------------------------------------------------
        {
          path:"listAlarm",
          name:"listAlarm",
          component:resolve =>require(['@/components/BusinessProcessing/Alarm/listAlarm'],resolve),

        },
        {
          path:"alarmProcess",
          name:"alarmProcess",
          component:resolve =>require(['@/components/BusinessProcessing/Alarm/alarmProcess'],resolve),
        },
        {
          path:"infoComparison",
          name:"infoComparison",
          component:resolve =>require(['@/components/BusinessProcessing/Alarm/infoComparison'],resolve),
        },


// 业务应用===================================================================================================================================
        // 信息查询---------------------------------------------------------------------------------------------------
        {
          path:"basicInformation",
          name:"basicInformation",
          component:resolve =>require(['@/components/BusinessApplications/InformationInquiry/basicInformation'],resolve),

        },
        // 关联人员查询---------------------------------------------------------------------------------------------------
        {
          path:"associatedPersonnel",
          name:"associatedPersonnel",
          component:resolve =>require(['@/components/BusinessApplications/InformationInquiry/associatedPersonnel'],resolve),

        },

        // 关联人员查询---------------------------------------------------------------------------------------------------
        {
          path:"businessEvents",
          name:"BusinessEvents",
          component:resolve =>require(['@/components/BusinessApplications/InformationInquiry/businessEvents'],resolve),

        },


// 业务管理===================================================================================================================================
        // 名单数据分析------------------------------------------------------------------------------------------------
        {
          path:"listAnalysis",
          name:"listAnalysis",
          component:resolve =>require(['@/components/BusinessManagement/List/listAnalysis'],resolve),

        },
        // 白名单管理--------------------------------------------------------------------------------------------------
        {
          path:"whitelist",
          name:"whitelist",
          component:resolve =>require(['@/components/BusinessManagement/List/whitelist'],resolve),

        },
        // 临控名单管理------------------------------------------------------------------------------------------------
        {
          path:"controlList",
          name:"ControlList",
          component:resolve =>require(['@/components/BusinessManagement/List/controlList'],resolve),

        },
        // 重点关注名单管理-----------------------------------------------------------------------------------------------
        {
          path:"focusList",
          name:"FocusList",
          component:resolve =>require(['@/components/BusinessManagement/List/focusList'],resolve),

        },
      ]
    }
  ]
})
