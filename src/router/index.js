import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import login from '@/components/login'
import forgetpw from '@/components/forgetpw'
import index from '@/components/index'
import productionList from '@/components/productionList'
import editProduction from '@/components/editProduction'
import createProduction from '@/components/createProduction'
import productionDetail from '@/components/productionDetail'
import characterList from '@/components/characterList'
import characterDetail from '@/components/characterDetail'
import editCharacter from '@/components/editCharacter'
import createCharacter from '@/components/createCharacter'
import dynamicList from '@/components/dynamicList'
import releaseDynamic from '@/components/releaseDynamic'
import QAList from '@/components/QAList'
import dynamicDetail from '@/components/dynamicDetail'
import replyDetail from '@/components/replyDetail'
import QADetail from '@/components/QADetail'
import QADetail2 from '@/components/QADetail2'
import fansList from '@/components/fansList'
import postingsDetail from '@/components/postingsDetail'
import postingsMore from '@/components/postingsMore'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: home
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isNeedlogin: false,//是否需要登录，true：需要登录，false：不需要登录
        isNeedNav: false,//是否需要显示pageHeader头、pageNav左导航，true：需要，false：不需要
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isNeedlogin: false,
        isNeedNav: false,
      }
    },
    {
      path: '/forgetpw',
      name: 'forgetpw',
      component: forgetpw,
      meta: {
        isNeedlogin: false,
        isNeedNav: false,
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'index'//设置此组件属于哪个导航条（即哪个导航条高亮）
      }
    },
    {
      path: '/productionList',
      name: 'productionList',
      component: productionList,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'production'
      }
      // children: [
      //     {
      //       path: '', 
      //       component: productionList
      //     },
      //     {
      //       path: 'productionList', 
      //       name: 'productionList',
      //       component: productionList
      //     },
      //     {
      //       path: 'productionDetail', 
      //       name: 'productionDetail',
      //       component: productionDetail
      //     }
      // ]
    },
    {
      path: '/productionDetail',
      name: 'productionDetail',
      component: productionDetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'production'
      }
    },
    {
      path: '/editProduction',
      name: 'editProduction',
      component: editProduction,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'production'
      }
    },
    {
      path: '/createProduction',
      name: 'createProduction',
      component: createProduction,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'production'
      }
    },
    {
      path: '/characterList',
      name: 'characterList',
      component: characterList,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'character'
      }
    },
    {
      path: '/characterDetail',
      name: 'characterDetail',
      component: characterDetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'character'
      }
    },
    //编辑人物
    {
      path: '/editCharacter',
      name: 'editCharacter',
      component: editCharacter,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'character'
      }
    },
    {
      path: '/createCharacter',
      name: 'createCharacter',
      component: createCharacter,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'character'
      }
    },
    //动态列表
    {
      path: '/dynamicList',
      name: 'dynamicList',
      component: dynamicList,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'dynamic'
      }
    },
    //动态详情
    {
      path: '/dynamicDetail',
      name: 'dynamicDetail',
      component: dynamicDetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'dynamic'
      }
    },
    //回复详情
    {
      path: '/replyDetail',
      name: 'replyDetail',
      component: replyDetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'dynamic'
      }
    },
    //发布动态
    {
      path: '/releaseDynamic',
      name: 'releaseDynamic',
      component: releaseDynamic,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'dynamic'
      }
    },
    //问答列表
    {
      path: '/QAList',
      name: 'QAList',
      component: QAList,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'QA'
      }
    },
    //问答详情
    {
      path: '/QADetail',
      name: 'QADetail',
      component: QADetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'QA'
      }
    },
    //问答详情2
    {
      path: '/QADetail2',
      name: 'QADetail2',
      component: QADetail2,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'QA'
      }
    },
    //后援会列表
    {
      path: '/fansList',
      name: 'fansList',
      component: fansList,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'fans'
      }
    },
    //帖子详情
    {
      path: '/postingsDetail',
      name: 'postingsDetail',
      component: postingsDetail,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'fans'
      }
    },
    //更多帖子详情
    {
      path: '/postingsMore',
      name: 'postingsMore',
      component: postingsMore,
      meta: {
        isNeedlogin: true,
        isNeedNav: true,
        navActive: 'fans'
      }
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: '',
})

export default router;

router.beforeEach((to, from, next)=>{
  //console.log(to);
  let isNeedlogin = to.meta.isNeedlogin;
  let path = to.name;
  let adminId = localStorage.getItem('adminId');
  let loginTimestamp = localStorage.getItem('lastLoginTimestamp');
  let nowTime = new Date().getTime();
  let isLoginTimeout = (nowTime-loginTimestamp)>2*60*60*1000;//大于2小时：说明登录超时
  //console.log(nowTime-loginTimestamp);
  //console.log((nowTime-loginTimestamp)>10*1000);
  if(isNeedlogin){//如果是需要登录的页面，则判断是否在登录状态
    //console.log(adminId);
    if(from.name=='login'){
      //console.log(from.name);
      next();
    }else{
        if(adminId&&adminId.length>=1){//如果已登录
            //console.log('已登录');
            if(isLoginTimeout){//如果登录超时，则跳转登录页，并清除adminName、adminId、lastLoginTimestamp
              //console.log('超时');
              if(path == 'login') {
                next()
              }else{
                next({name: 'login'});
              }
              localStorage.removeItem('adminName');
              localStorage.removeItem('adminId');
              localStorage.removeItem('lastLoginTimestamp');
            }else{
              next();
            }

        }else{//如果未登录
          //console.log('未登录');
            if(path == 'login') {
              next();
              return;
            }else{
              next({name: 'login'});
            }

        }
    }

  }else{
    next();
  }

})
