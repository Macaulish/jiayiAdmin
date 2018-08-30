<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-动态信息-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:40px;">
        <div class="left">
            <table>
                <tr>
                    <td>选择作品</td>
                    <td>
                        <select v-model="selectRole">
                            <option value="-1">全部</option>
                            <option v-for="role in allRole" :value="role.roleId">{{role.userName}}</option>
                        </select>
                    </td>
                    <td style="padding-left:20px;">动态类型</td>
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
        <a class="btn" href="javascript:;" @click="linkReleaseDynamic">发布动态</a>
    </div>

    <div class="cont2">
	    <table width="100%" class="tableList">
            <thead>
                <tr>
                    <td>发布时间</td>
                    <td>发自</td>
                    <td>发布内容</td>
                    <td>浏览量</td>
                    <td>评论数</td>
                    <td>获赞</td>
                    <td>操作</td>
                </tr>
            </thead>  
            <tbody>
                <tr v-for="list in listsInfo">
                    <td>{{list.postTime}}</td>
                    <td>{{list.postSource}}</td>
                    <td class="maxwidth"><div class="maxwidth">{{list.postContext}}</div></td>
                    <td>{{list.seeNum}}</td>
                    <td>{{list.commentNum}}</td>
                    <td>{{list.fansNum}}</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'dynamicDetail', query: {postId: list.postId}}">详情</router-link>
                            <a class="btn" href="javascript:;" @click="operationDynamic(list.postId,0)">删除</a>
                            <a class="btn" href="javascript:;" @click="operationDynamic(list.postId,list.state)">{{list.state==1?'隐藏':'显示'}}</a>
                        </div>
                    </td>
                </tr>
<!--                 <tr>
                    <td>2018-01-22  17:07</td>
                    <td>逍遥门口</td>
                    <td>修真是条漫漫长路，在这条长路上保...</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'dynamicDetail'}">详情</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">删除</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">隐藏</router-link> 
                        </div>
                    </td>
                </tr> -->
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

//type值：0代表删除，1代表显示，2:代表隐藏
//state值：1代表显示，2:代表隐藏

export default {
  name: 'dynamicList',
  data () {
    return {
        listsInfo: [],
        allRole: [],
        selectRole: -1,//设置默认roleId为0（可现实全部数据）
        currentPage: 1,//当前第几页（默认第一页）
        total: 0,//总条数
    }
  },
  created(){
    this.init();
  },
  watch: {
    $route(to,from){
        if(from.name=='releaseDynamic'){
            this.init();
            console.log('来源');
        }
    }
  },
  methods:{
    init(){
        this.getAllRole();
        this.getAllDynamic();
    },
    //获取所有角色
    getAllRole(){
        let params = {
            method: 'get',
            url: 'user/getRoleInfos',           
            data: {
                adminId: util.getAdminId(),
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.allRole = response.data.data;
            }
        });
    },
    //获取动态列表
    getAllDynamic(){
        let params = {
            method: 'get',
            url: 'user/getRolePost',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId(),
                roleId: this.selectRole
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.listsInfo = response.data.data.postInfo;
                this.total = response.data.data.total;
            }
        });
    },
    search(){
        //console.log(this.selectRole);
        let params = {
            method: 'get',
            url: 'user/getRolePost',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId(),
                roleId: this.selectRole
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.listsInfo = response.data.data.postInfo;
                this.total = response.data.data.total;
            }
        });
    },
    //跳转发布动态页
    linkReleaseDynamic(){
        console.log(this.selectRole);
        if(this.selectRole==-1){
            this.$message({message: '请先选择作品',type: 'error'});
            return false;
        }else{  
            this.$router.push({name: 'releaseDynamic', query: {roleId: this.selectRole} });
        }
    },
    //显示、隐藏、删除
    operationDynamic(postId,type){
        //type值：0代表删除，1代表显示，2:代表隐藏
        let text;
        let types;
        if(type==1){
            text = '隐藏';
            types = 2;
        }
        if(type==2){
            text = '显示';
            types = 1;
        }
        if(type==0){
            text = '删除';
            types = 0;
        }
        let params = {
            url: 'user/updatePost',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId(),
                roleId: this.selectRole,
                postId: postId,
                type: types
            }
        }
        console.log(params);

        this.$confirm(`您确定${text}此条信息吗？`, '操作信息', {
            type: 'warning'
        }).then(() => {
            util.$http(params).then(response=>{
                console.log(response);
                if(response.data.code=='0000'){
                    this.listsInfo = response.data.data.postInfo;
                    this.$message({
                      type: 'success',
                      message: '操作成功'
                    });
                }
            });
        });
    },
    handleCurrentChange(page){
        console.log(page);
        let params = {
            method: 'get',
            url: 'user/getRolePost',           
            data: {
                rowPage: 10,
                page: page,
                adminId: util.getAdminId(),
                roleId: this.selectRole
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.listsInfo = response.data.data.postInfo;
            }
        });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
