<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-问答管理-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:40px;height: 50px;">
        <div class="left">
            <table>
                <tr>
                    <td>选择人物</td>
                    <td>
                        <select>
                            <option v-for="role in roles">{{role.userName}}</option>
                        </select>
                    </td>
                    <td style="padding-left:20px;">问答状态</td>
                    <td>
                        <select>
                            <option>图文</option>
                            <option>视频</option>
                        </select>
                    </td>
                    <td><a class="sure" @click="search">确定</a></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="cont2">
	    <table width="100%" class="tableList">
            <thead>
                <tr>
                    <td>提问时间</td>
                    <td>提问人</td>
                    <td>提问内容</td>
                    <td>消耗亲密度</td>
                    <td>操作</td>
                </tr>
            </thead>  
            <tbody>
                <tr>
                    <td>{{}}</td>
                    <td>逍遥门口</td>
                    <td>修真是条漫漫长路，在这条长路上保...</td>
                    <td>2312</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'QADetail'}">详情</router-link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>2018-01-22  17:07</td>
                    <td>逍遥门口</td>
                    <td>修真是条漫漫长路，在这条长路上保...</td>
                    <td>2312</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'QADetail'}">详情</router-link>
                        </div>
                    </td>
                </tr>
            </tbody>     
        </table>
        <ul class="pages">
            <li>[1]</li>
            <li>[2]</li>
            <li>[3]</li>
            <li>[4]</li>
            <li>[5]</li>
            <li>[6]</li>
            <li>[7]</li>
            <li>[8]</li>
            <li>[9]</li>
            <li>[10]</li>
        </ul>

    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
    name: 'QAList',
    data () {
        return {
            QALists: [],
            roles: [],
        }
    },
    created() {
        /*
        let that = this;
        let url = "http://192.168.0.95:8443/user/questionHome";
        this.$axios.post(url,{
            adminId: 1,
            roleId: 1,
            page: 1,
            problemState: 1
        }).then(function (response) {
            console.log(response);
            console.log(response.data.data.roleName);
            that.response = response;
            that.roles = response.data.data.roleName;
        }).catch(function (error) {
            console.log(error);
        });
        */
       this.init()
    },
    methods:{
        init(){
            let params = {
                method: 'get',
                url: 'user/questionHome',           
                data: {
                    rowPage: 10,
                    page: 1,
                    adminId: util.getAdminId(),
                    roleId: 1,
                }
            };
            util.$http(params).then(response=>{
                console.log(response);
                if(response.data.code=='0000'){
                    this.QALists = response.data.data.adminInfo;
                }else{
                    that.noData = true;
                }
            });
        },
        search(){

        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
