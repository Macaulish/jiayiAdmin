<template>
    <div id="app">

        <div v-if="path!='login'&&path!='home'&&path!='forgetpw'">
        	<pageHeader></pageHeader>
          <pageNav></pageNav>
        </div>

        <div :class="path=='login'||path=='home'||path=='forgetpw'?'loginMain':'main'">
          <keep-alive include="login,index,productionList,characterList,dynamicList,QAList,fansList"> 
    		      <router-view></router-view>
          </keep-alive> 

          <div v-if="path!='home'&&path!='login'&&path!='forgetpw'" class="copyright">关于我们 服务协议 运营中心  加一客服 联系邮箱  Copyright © 2012-2018 Tencent. All Rights Reserved.</div>

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
        path: ''
      }
  },
  created(){
    //console.log(this.$route.name);
    this.path = this.$route.name;
  },
  watch: {
    $route(to,from){
      //console.log(to);
      this.path = this.$route.name;
    }
  },
}
</script>

<style lang="less" scoped>
.main{ width: 100%; padding: 80px 50px 0 250px; }
</style>
