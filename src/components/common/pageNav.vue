<template>
 
  <div class="pageNav">
    <ul>
      <!-- <li><a href="#"><img src="../../assets/images/icon-home.png"><span>平台首页</span></a></li> -->
      <li><router-link :to="{ name: 'index'}" :class="{active: active=='index'}"><img src="../../assets/images/icon-home.png"><span>平台首页</span></router-link></li>
      <li><router-link :to="{ name: 'productionList'}" :class="{active: active=='production'}"><img src="../../assets/images/icon-production.png"><span>作品管理</span></router-link></li>
      <li><router-link :to="{ name: 'characterList'}" :class="{active: active=='character'}"><img src="../../assets/images/icon-character.png"><span>人物管理</span></router-link></li>
      <li><router-link :to="{ name: 'dynamicList'}" :class="{active: active=='dynamic'}"><img src="../../assets/images/icon-dynamic.png"><span>人物动态</span></router-link></li>
      <li><router-link :to="{ name: 'QAList'}" :class="{active: active=='QA'}"><img src="../../assets/images/icon-qa.png"><span>问答管理</span></router-link></li>
      <li><router-link :to="{ name: 'fansList'}" :class="{active: active=='fans'}"><img src="../../assets/images/icon-fans.png"><span>后援会</span></router-link></li>
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
  watch: {
    '$route' (to, from) {
      console.log('导航');
      //console.log(to);
      let path = to.path;
      if(/index/i.test(path)){
        this.active = 'index';
      }
      if(/production/i.test(path)){
        this.active = 'production';
      }
      if(/character/i.test(path)){
        this.active = 'character';
      }
      if(/dynamic/i.test(path)){
        this.active = 'dynamic';
      }
      if(/QA/.test(path)){
        this.active = 'QA';
      }
      if(/fans/i.test(path)){
        this.active = 'fans';
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/less/pageNav.less';
</style>
