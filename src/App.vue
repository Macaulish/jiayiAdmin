<template>
    <div id="app">

          	<pageHeader></pageHeader>
            <pageNav></pageNav>
            <div class='main'>
              <keep-alive> 
        		      <router-view/>
              </keep-alive> 
            </div>
            <div class="copyright">关于我们 服务协议 运营中心  加一客服 联系邮箱     Copyright © 2012-2018 Tencent. All Rights Reserved.</div>
        
    </div>
</template>

<script>
import pageHeader from './components/common/pageHeader'
import pageNav from './components/common/pageNav'
export default {
  name: 'App',
  components: {pageHeader,pageNav},
}
</script>

<style lang="less" scoped>
.main{ width: 100%; padding: 120px 50px 50px 250px; }
</style>
