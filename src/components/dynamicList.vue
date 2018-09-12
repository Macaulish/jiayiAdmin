<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-动态信息-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:20px;">
        <div class="left">
            <table>
                <tr>
                    <td>选择人物</td>
                    <td>
                        <select class="input" v-model="selectRole">
                            <option value="-1">全部</option>
                            <option v-for="role in allRole" :value="role.roleId">{{role.userName}}</option>
                        </select>
                    </td>
                    <td style="padding-left:20px;">动态类型</td>
                    <td>
                        <select class="input" v-model="selectSourceType">
                            <option :value="source.value" v-for="source in sourceType">{{source.title}}</option>
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
                            <router-link class="btn" :to="{name: 'dynamicDetail', query: {postId: list.postId,roleId: list.roleId}}">详情</router-link>
                            <a class="btn" @click="deleteDynamic(list.postId)">删除</a>
                            <!-- <a class="btn" @click="operationDynamic(list.postId,list.state)">{{list.state==1?'隐藏':'显示'}}</a> -->
                            <a class="btn" @click="showHideDynamic(list.postId,list.state)">{{list.state==1?'隐藏':'显示'}}</a>
                        </div>
                    </td>
                </tr>
            </tbody>     
        </table>

        <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :page-size="10" :total="total"></el-pagination>
        </div>

    </div>

    <div style="display:none;">{{isUpdateListState}}</div>

  </div>

</template>

<script>
import {mapState} from 'vuex';
import {util} from '../assets/js/util'

//type值：0代表删除，1代表显示，2:代表隐藏
//state值：1代表显示，2:代表隐藏

export default {
  name: 'dynamicList',
  data () {
    return { 
        sourceType: [
            {title: '图文', value: 1},
            {title: '视频', value: 3}
        ],
        selectSourceType: 1,
        listsInfo: [],
        allRole: [],
        selectRole: -1,//设置默认roleId为0（可现实全部数据）
        currentPage: 1,//当前第几页（默认第一页）
        total: 0,//总条数
    }
  },
  created(){
    this.$store.state.updateDynamicList
    this.getAllRole();
    this.getAllDynamic(1);
  },
  watch: {
    /*
    $route(to,from){
        if(from.name=='releaseDynamic'){
            this.getAllDynamic(1);
            //console.log('来源');
        }
    }*/
  },
  methods:{
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
            //console.log(response);
            if(response.data.code=='0000'){
                this.allRole = response.data.data;
            }
        });
    },
    //获取动态列表
    getAllDynamic(page){
        let params = {
            method: 'get',
            url: 'user/getRolePost',           
            data: {
                rowPage: 10,
                page: page,
                adminId: util.getAdminId(),
                roleId: this.selectRole,
                sourceType: this.selectSourceType
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.listsInfo = response.data.data.postInfo;
                this.total = response.data.data.total;
            }
        });
    },
    search(){
        this.currentPage = 1;
        this.getAllDynamic(this.currentPage);
    },
    //跳转发布动态页
    linkReleaseDynamic(){
        //console.log(this.selectRole);
        if(this.selectRole==-1){
            this.$message({message: '请先选择人物',type: 'error'});
            return false;
        }else{  
            this.$router.push({name: 'releaseDynamic', query: {roleId: this.selectRole} });
        }
    },
    //删除
    deleteDynamic(postId){
        let params = {
            url: 'user/updatePost',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId(),
                roleId: this.selectRole,
                postId: postId,
                type: 0,
                source: 1,//1：表示来自于人物动态，2：表示来自于后援会
            }
        }
        //console.log(params);

        this.$confirm('您确定删除此条信息吗？', '操作信息', {
            type: 'warning'
        }).then(() => {
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.getAllDynamic(this.currentPage);
                    this.$message({
                      type: 'success',
                      message: '操作成功'
                    });
                }
            });
        });
    },
    //显示、隐藏
    showHideDynamic(postId,type){
        //type值：1代表显示，2:代表隐藏
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
        let params = {
            url: 'user/updatePost',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId(),
                roleId: this.selectRole,
                postId: postId,
                type: types,
                source: 1,//1：表示来自于人物动态，2：表示来自于后援会
            }
        }
        //console.log(params);

        this.$confirm(`您确定${text}此条信息吗？`, '操作信息', {
            type: 'warning'
        }).then(() => {
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.getAllDynamic(this.currentPage);
                    this.$message({
                      type: 'success',
                      message: '操作成功',
                    });
                }
            });
        });
    },
    handleCurrentChange(page){
        //console.log(page);
        this.getAllDynamic(page);
    }
  },
  computed:{
        //监听列表是否需要刷新
        isUpdateListState(){
            if(this.$store.getters.dynamicListState){
                //console.log(123);
                this.getAllDynamic(1);
                this.$store.commit('updateDynamicList',false);
            }
        }
   }
    /*
    mapState({
        isUpdateListState: 'isUpdateDynamicList',
        isUpdateListState: state=>{
            let that = this;
            console.log('mapState');
            if(state.isUpdateDynamicList){
                console.log(123);
                that.getAllDynamic(1);
                that.$store.commit('isUpdateDynamicList',false);
            }
        }
    })
    */
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
