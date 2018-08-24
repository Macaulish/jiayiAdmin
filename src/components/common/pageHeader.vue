<template>

    <header class="pageHeader">
      <div class="left">加一运营管理平台</div>
      <div class="middle">HI，13611077238，欢迎来到加一次元运营管理平台。 最后登录时间：2018-07-17 15:38:54</div>
      <div class="right">13611077238   <router-link class="signout" :to="{name: 'login'}">【退出】</router-link></div>
    </header>

</template>

<script>

export default {
  data () {
    return {
    }
  },
  created(){
  	
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/pageHeader.less';
</style>
