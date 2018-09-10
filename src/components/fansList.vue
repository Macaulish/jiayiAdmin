<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-后援会-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:40px;height: 58px;">
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
                    <td><a class="sure" @click="search">确定</a></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="cont2">
	    <table width="100%" class="tableList">
            <thead>
                <tr>
                    <td>发布时间</td>
                    <td>发帖人</td>
                    <td>帖子内容</td>
                    <td>浏览量</td>
                    <td>评论数</td>
                    <td>获赞</td>
                    <td>操作</td>
                </tr>
            </thead>  
            <tbody>
                <tr v-for="(list,index) in tableArray">
                    <td>{{list.dynamicTime}}</td>
                    <td>{{list.userName}}</td>
                    <td class="maxwidth"><div class="maxwidth">{{list.dynamicContext}}</div></td>
                    <td>{{list.seeNum}}</td>
                    <td>{{list.commentNum}}</td>
                    <td>{{list.goodNum}}</td>
                    <td>
                        <div class="operation">
                            <a class="btn" @click="linkDetail(list.dynamicId, list.roleId, list.seeNum, list.commentNum, list.goodNum)">详情</a>
                            <a class="btn" @click="operationDynamic(list.dynamicId,index)">删除</a>
                        </div>
                    </td>
                </tr>
            </tbody>     
        </table>

        <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total"></el-pagination>
        </div>

    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
    name: 'fansList',
    data () {
        return {
            tableArray: [],
            rolesArray: [],
            total: 0,//总条数
            selectRoleValue: 0,
            currentPage: 1,
        }
    },
    created() {
       this.init(this.currentPage,this.selectRoleValue);
    },
    methods:{  
        init(currentPage,selectRoleValue){
            let params = {
                url: 'user/dynamicHome',           
                data: {
                    rowPage: 10,
                    page: currentPage,
                    adminId: util.getAdminId(),
                    roleId: selectRoleValue,
                }
            };
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.tableArray = response.data.data.dynamicInfo;
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
            this.currentPage = 1;
            this.init(this.currentPage,this.selectRoleValue);
        },        
        //删除帖子
        operationDynamic(dynamicId,index){
            let params = {
                url: 'user/updatePost',           
                data: {
                    rowPage: 10,
                    page: 1,
                    adminId: util.getAdminId(),
                    roleId: this.selectRoleValue,
                    dynamicId: dynamicId,
                    source: 2,//1：表示来自于人物动态，2：表示来自于后援会
                }
            }
            //console.log(params);

            this.$confirm('您确定删除此条信息吗？', '删除', {
                type: 'warning'
            }).then(() => {
                util.$http(params).then(response=>{
                    //console.log(response);
                    if(response.data.code=='0000'){
                        this.tableArray.splice(index,1);
                        this.total = response.data.data.total;
                        this.$message({
                          type: 'success',
                          message: '删除成功'
                        });
                    }else{
                        this.$message({
                          type: 'info',
                          message: '删除失败'
                        });
                    }
                });
            });
        },
        //跳转详情页
        linkDetail(dynamicId, roleId, seeNum, commentNum, goodNum){
            this.$router.push({name: 'postingsDetail',query: {dynamicId: dynamicId, roleId: roleId, seeNum, commentNum, goodNum}});
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
