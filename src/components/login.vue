<template>
  <div>

      <div class="login">
          <dl>
              <dt>用户名</dt>
              <dd><input class="input" type="text" v-model="username"></dd>
          </dl>
          <dl>
              <dt>密码</dt>
              <dd><input class="input" type="password" v-model="password"></dd>
          </dl>
          <div class="submit"><a class="btn" @click="login">登录</a></div>
          <div class="errorMsg" v-if="isShowErrorMessage">{{errorMessage}}</div>
      </div> 

  </div>

</template>

<script>
import {util} from '../assets/js/util'
//13611077238
//jiayiworld0201

export default {
    name: 'login',
    data () {
        return {
          isShowErrorMessage: false,
          errorMessage: '',
          username: '',
          password: '',
        }
    },
    methods: {
        login(){
            this.isShowErrorMessage = false;

            if(util.trim(this.username).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入用户名';
                return false;
            }
            if(util.trim(this.password).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入密码';
                return false;
            }

            let params = {
                url: 'user/loginVerify',
                data: {
                    adminName: this.username,
                    adminPassWord: this.password,
                },
            }
            util.$http(params).then(response=>{
                console.log(response);
                if(response.data.code=='0000'){
                    let adminId = response.data.data.adminId;
                    let adminName = response.data.data.adminName;
                    //console.log(adminId);
                    //console.log(adminName);
                    sessionStorage.setItem('adminId',adminId);
                    sessionStorage.setItem('adminName',adminName);
                    this.$router.push({name: 'productionList'});
                }else{
                  this.isShowErrorMessage = true;
                  this.errorMessage = '用户名或密码错误';
                }
            }).then(error=>{
              this.isShowErrorMessage = true;
              this.errorMessage = '登录失败';
            }); 
                    
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/login.less';
</style>
