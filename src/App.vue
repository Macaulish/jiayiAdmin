<template>
    <div id="app">

        <div v-if="$route.name!='login'">
        	<div><pageHeader ></pageHeader></div>
          <pageNav></pageNav>
        </div>

        <div :class="$route.name=='login'?'loginMain':'main'">
          <keep-alive include="login,index,productionList,characterList,dynamicList,QAList,fansList"> 
    		      <router-view></router-view>
          </keep-alive> 

          <div class="copyright">关于我们 服务协议 运营中心  加一客服 联系邮箱     Copyright © 2012-2018 Tencent. All Rights Reserved.</div>

        </div>

    </div>
</template>

<script>
import pageHeader from './components/common/pageHeader'
import pageNav from './components/common/pageNav'
export default {
  name: 'App',
  components: {pageHeader,pageNav},
  data(){
      return {
          isShow: true
      }
  },
  watch: {
    '$route'(to,from){
      console.log('登录');
        let path = to.path;
        if(/login/.test(path)){
          console.log('登录');
            this.isShow = false;
        }
    }
  },
  beforeRouteEnter(){
    console.log('登录');
  }
}
</script>

<style lang="less" scoped>
.main{ width: 100%; padding: 80px 50px 0 250px; }
</style>
