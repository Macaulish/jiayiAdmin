<template>

<div class="page-index">

    <div class="top-bgimg">
        <div class="index-header clearfix">
            <a @click="linkHome">
                <dl class="logobox">
                    <dt><img src="../../static/images/logo.png" alt="logo"></dt>
                    <dd>
                        <h3>加一运营管理平台</h3>
                        <h4>www.jiayiworld.com</h4>
                    </dd>
                </dl>
            </a>
            <ul class="nav">
                <li><a @click="linkHome">首页</a></li>
                <li><a href="#">平台亮点</a></li>
                <li><a href="#">作者评价</a></li>
                <li><a href="#">合作伙伴</a></li>
                <li><a href="#">联系我们</a></li>
            </ul>
            <ul class="btns">
                <li><a @click="linkLogin">登录</a></li>
            </ul> 
        </div>
        <div class="banner">
            <div class="bg1"><img src="../../static/images/bg2.png"></div>
            <div class="loginbox">
                <ul>
                    <li><input class="input" type="text" placeholder="请输入账号" autocomplete="off" v-model="username"></li>
                    <li><input class="input" type="password" placeholder="请输入密码" autocomplete="off" v-model="password"></li>
                    <li><a class="btn" @click="login">登录</a></li>
                    <li><a class="forgetpw" @click="linkForgetpw">忘记密码</a></li>
                </ul>
            </div>
            <div class="bg3"><img src="../../static/images/bg3.png"></div>
        </div>
    </div>

    <div class="footer">
        <div class="row1">联系我们：010-57284115       邮箱：business@jiayiworld.com    北京朝阳区建外SOHO西区17号楼1008</div>
        <div class="row1">Copyright © 2018  北京加一时代数字科技有限公司    京ICP备18044271号-1</div>
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
    mounted(){
    },
    methods: {
        login(){
            this.isShowErrorMessage = false;

            if(util.trim(this.username).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入用户名';
                this.$message({
                  message: '请输入用户名',
                  type: 'error'
                });
                return false;
            }
            if(util.trim(this.password).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入密码';
                this.$message({
                  message: '请输入密码',
                  type: 'error'
                });
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
                //console.log(response);
                if(response.data.code=='0000'){
                    let adminId = response.data.data.adminId;
                    let adminName = response.data.data.adminName;
                    //console.log(adminId);
                    //console.log(adminName);
                    sessionStorage.setItem('adminId',adminId);
                    sessionStorage.setItem('adminName',adminName);
                    this.$router.push({name: 'index'});

                    let timestamp = new Date().getTime();
                    sessionStorage.setItem('loginTimestamp',timestamp);
                    //console.log(timestamp);
                }else{
                  this.isShowErrorMessage = true;
                  this.errorMessage = '用户名或密码错误';

                  this.$message({
                    message: '用户名或密码错误',
                    type: 'error'
                  });
                }
            }).then(error=>{
              this.isShowErrorMessage = true;
              this.errorMessage = '登录失败';
            });         
        }, 
        linkLogin(){
            this.$router.push({name: 'login'});
        },
        linkHome(){
            this.$router.push({name: 'home'});
        },
        linkForgetpw(){
            this.$router.push({name: 'forgetpw'});
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/login.less';
</style>
