import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
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

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      redirect: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/productionList',
      name: 'productionList',
      component: productionList,
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
    },
    {
      path: '/editProduction',
      name: 'editProduction',
      component: editProduction,
    },
    {
      path: '/createProduction',
      name: 'createProduction',
      component: createProduction,
    },
    {
      path: '/characterList',
      name: 'characterList',
      component: characterList,
    },
    {
      path: '/characterDetail',
      name: 'characterDetail',
      component: characterDetail,
    },
    //编辑人物
    {
      path: '/editCharacter',
      name: 'editCharacter',
      component: editCharacter,
    },
    {
      path: '/createCharacter',
      name: 'createCharacter',
      component: createCharacter,
    },
    //动态列表
    {
      path: '/dynamicList',
      name: 'dynamicList',
      component: dynamicList,
    },
    //发布动态
    {
      path: '/releaseDynamic',
      name: 'releaseDynamic',
      component: releaseDynamic,
    },
    //问答列表
    {
      path: '/QAList',
      name: 'QAList',
      component: QAList,
    },
    //动态详情
    {
      path: '/dynamicDetail',
      name: 'dynamicDetail',
      component: dynamicDetail,
    },
    //回复详情
    {
      path: '/replyDetail',
      name: 'replyDetail',
      component: replyDetail,
    },
    //问答详情
    {
      path: '/QADetail',
      name: 'QADetail',
      component: QADetail,
    },
    //问答详情2
    {
      path: '/QADetail2',
      name: 'QADetail2',
      component: QADetail2,
    },
    //后援会列表
    {
      path: '/fansList',
      name: 'fansList',
      component: fansList,
    },
    //帖子详情
    {
      path: '/postingsDetail',
      name: 'postingsDetail',
      component: postingsDetail,
    },
    //更多帖子详情
    {
      path: '/postingsMore',
      name: 'postingsMore',
      component: postingsMore,
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  beforeEach(to, from, next){

  }
})
