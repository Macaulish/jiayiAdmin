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
                        <select v-model="selectRoleValue">
                            <option value="0">全部</option>
                            <option :value="role.roleId" v-for="role in rolesArray">{{role.userName}}</option>
                        </select>
                    </td>
                    <td style="padding-left:20px;">问答状态</td>
                    <td>
                        <select class="input" v-model="selectProblemState">
                            <option :value="source.value" v-for="source in problemState">{{source.title}}</option>
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
                <tr v-for="list in answersArray">
                    <td>{{list.createTime}}</td>
                    <td>{{list.userName}}</td>
                    <td class="maxwidth"><div class="maxwidth">{{list.problemContext}}</div></td>
                    <td>{{list.intimacy}}</td>
                    <td>
                        <div class="operation">
                            <a class="btn" @click="linkDetail(list)">详情</a>
                            <!-- <router-link class="btn" :to="{name: 'QADetail',query:{params: list}}">详情</router-link> -->
                        </div>
                    </td>
                </tr>
            </tbody>     
        </table>

        <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :page-size="10" :total="total"></el-pagination>
        </div>

    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
    name: 'QAList',
    data () {
        return {
            problemState: [
                // {title: '全部状态', value: -1},
                {title: '已解答', value: 1},
                {title: '未解答', value: 0}
            ],
            selectProblemState: 0,
            answersArray: [],
            rolesArray: [],
            selectRoleValue: 0,
            currentPage: 1,
            total: 0,//总条数
        }
    },
    created() {
       this.init(this.currentPage,this.selectRoleValue);
    },
    methods:{
        init(currentPage,selectRoleValue){
            let params = {
                url: 'user/questionHome',           
                data: {
                    rowPage: 10,
                    page: currentPage,
                    adminId: util.getAdminId(),
                    roleId: selectRoleValue,
                    problemState: this.selectProblemState
                }
            };
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.answersArray = response.data.data.answerInfo;
                    this.rolesArray = response.data.data.roleName;
                    this.total = response.data.data.total;
                }else{
                    that.noData = true;
                }
            });
        },
        //点击分页
        handleCurrentChange(){
            this.init(this.currentPage,this.selectRoleValue);
        },
        search(){
            //console.log(this.currentPage,this.selectRoleValue);
            this.currentPage = 1;
            this.init(this.currentPage,this.selectRoleValue);
        },
        linkDetail(detail){
            //console.log(detail);
            if(detail.problemState==0){//如果是未解答
                this.$router.push({name: 'QADetail',query:{p: encodeURIComponent(JSON.stringify(detail))}});
            }else{//如果是已解答
                this.$router.push({name: 'QADetail2',query:{p: encodeURIComponent(JSON.stringify(detail))}});
            }
        },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
