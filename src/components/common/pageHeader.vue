<template>

    <header class="pageHeader">
      <div class="left">加一运营管理平台</div>
      <div class="middle">HI，{{adminName}}，欢迎来到加一次元运营管理平台。 最后登录时间：{{lastLoginTime}}</div>
      <div class="right">{{adminName}}   <a class="signout" @click="signout">【退出】</a></div>
    </header>

</template>

<script>
import {util} from '../../assets/js/util'

export default {
  data () {
    return {
      adminName: '',
      lastLoginTime: ''
    }
  },
  created(){
    if(sessionStorage.getItem('adminName')||sessionStorage.getItem('adminId')){
      this.adminName = sessionStorage.getItem('adminName');
      this.lastLoginTime = util.getNowFormatDate();
    }
  },
  methods:{
    signout(){
      let params = {
          method: 'get',
          url: 'user/logout',
      }

      this.$confirm('你确定要系统吗？','退出登录',{type: 'info'}).then(()=>{
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){      
              sessionStorage.removeItem('adminName');
              sessionStorage.removeItem('adminId');
              this.$router.push({name: 'login'});
            }
        }); 
      }).then();

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/pageHeader.less';
</style>
