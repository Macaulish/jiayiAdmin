<template>
 
  <div class="pageNav">
    <ul>
      <!-- <li><a href="#"><img src="../../assets/images/icon-home.png"><span>平台首页</span></a></li> -->
      <li><router-link :to="{ name: 'index'}" :class="{active: $route.meta.navActive=='index'}"><img src="../../assets/images/icon-home.png"><span>平台首页</span></router-link></li>
      <li><router-link :to="{ name: 'productionList'}" :class="{active: $route.meta.navActive=='production'}"><img src="../../assets/images/icon-production.png"><span>作品管理</span></router-link></li>
      <li><router-link :to="{ name: 'characterList'}" :class="{active: $route.meta.navActive=='character'}"><img src="../../assets/images/icon-character.png"><span>人物管理</span></router-link></li>
      <li><router-link :to="{ name: 'dynamicList'}" :class="{active: $route.meta.navActive=='dynamic'}"><img src="../../assets/images/icon-dynamic.png"><span>人物动态</span></router-link></li>
      <li><router-link :to="{ name: 'QAList'}" :class="{active: $route.meta.navActive=='QA'}"><img src="../../assets/images/icon-qa.png"><span>问答管理</span></router-link></li>
      <li><router-link :to="{ name: 'fansList'}" :class="{active: $route.meta.navActive=='fans'}"><img src="../../assets/images/icon-fans.png"><span>后援会</span></router-link></li>
    </ul>
  </div>
    
</template>

<script>

export default {
  data () {
    return {
      active: '',//导航高亮
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/less/pageNav.less';
</style>
