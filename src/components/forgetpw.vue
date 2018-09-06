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
                    <li><input class="input" type="text" placeholder="请输入手机号" autocomplete="off" v-model="phoneNumber"></li>
                    <li class="yzmbox"><input class="input" type="password" placeholder="请输入验证码" autocomplete="off" v-model="yzmCode"><a class="btn" @click="getYZM">获取验证码</a></li>
                    <li><input class="input" type="password" placeholder="设置新的登录密码" autocomplete="off" v-model="newPW"></li>
                    <li><input class="input" type="password" placeholder="确认新的登录密码" autocomplete="off" v-model="resetPW"></li>
                    <li><a class="btn" @click="findPassword">找回密码</a></li>
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


export default {
    name: 'forgetpw',
    data () {
        return {
          isShowErrorMessage: false,
          errorMessage: '',
          phoneNumber: '',
          yzmCode: '',
          newPW: '',
          resetPW: '',
        }
    },
    methods: {
        getYZM(){     
            if(util.trim(this.phoneNumber).length<1){
                this.$message({
                  message: '请输入手机号',
                  type: 'error'
                });
                return false;
            }
            let params = {
                url: 'user/getAdminVerCode',
                data: {
                    phone: this.phoneNumber,
                },
            }
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){  
                  this.$message({
                    message: '已发送到手机上',
                    type: 'success'
                  });
                }else{
                  this.$message({
                    message: '获取失败',
                    type: 'error'
                  });
                }
            }); 
        },
        findPassword(){
            this.isShowErrorMessage = false;

            if(util.trim(this.phoneNumber).length<1){
                this.$message({
                  message: '请输入手机号',
                  type: 'error'
                });
                return false;
            }
            if(util.trim(this.yzmCode).length<1){
                this.$message({
                  message: '请输入验证码',
                  type: 'error'
                });
                return false;
            }
            if(util.trim(this.newPW).length<1){
                this.$message({
                  message: '请输入新密码',
                  type: 'error'
                });
                return false;
            }
            if(util.trim(this.resetPW).length<1){
                this.$message({
                  message: '请输入确认密码',
                  type: 'error'
                });
                return false;
            }
            if(this.newPW!=this.resetPW){
                this.$message({
                  message: '两次密码不一致',
                  type: 'error'
                });
                return false;
            }

            let params = {
                url: 'user/findPassword',
                data: {
                    phone: this.phoneNumber,
                    password: this.newPW,
                    newPassWord: this.resetPW,
                    verCode: this.yzmCode
                },
            }
            
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.$router.push({name: 'login'});
                }else{
                  this.$message({
                    message: '修改失败',
                    type: 'error'
                  });
                }
            }).then(error=>{
              this.$message({
                message: '修改失败',
                type: 'error'
              });
            });         
        }, 
        linkLogin(){
            this.$router.push({name: 'login'});
        },
        linkHome(){
            this.$router.push({name: 'home'});
        },
        linkForgetpw(){
            this.$router.push({name: 'home'});
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/login.less';
</style>
