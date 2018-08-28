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
      </div> 

  </div>

</template>

<script>
import axios from 'axios'

import {util} from '../assets/js/util'
import $ from "jquery"

export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login(){
            let params = {
                url: 'user/loginVerify',
                data: {
                    adminName: '13330940741',
                    adminPassWord: 'pangeyupakun',
                },
            }
            util.$http(params).then(response=>{
                console.log(response);
                if(response.data.code=='0000'){
                    let adminId = response.data.data.adminId;
                    let adminName = response.data.data.adminName;
                    console.log(adminId);
                    console.log(adminName);
                    sessionStorage.setItem('adminId',adminId);
                    sessionStorage.setItem('adminName',adminName);
                    this.$router.push({name: 'productionList'});
                }
            });


               var data = {
                    adminName: '13330940741',
                    adminPassWord: 'pangeyupakun',
                };
                var url = 'http://192.168.0.105:8443/user/loginVerify';




            // $.ajax({
            //     type: "post",
            //     url: url,
            //     async:false,
            //     dataType:"json",
            //     contentType: "application/json;charset=utf-8",
            //     data: JSON.stringify(data),
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     crossDomain:true,
            //     success: function (data) {
                   
            //     },
            //     error:function (data) {
            //         console.log(data);
            //     }
            // });
                    
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/login.less';
</style>
