<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-动态详情-</h3>
    </div>

    <div class="cont2">
         <ul class="textList">
            <li class="t1">
                <span class="s1"><i class="i-title">作品名称 ：</i><i class="i-cont">{{postDetail.userName }}</i></span>
                <span class="s2"><i class="i-title">发布时间 ：</i><i class="i-cont">{{postDetail.postTime}}</i></span>
                <span class="s3"><i class="i-title">来自 ：</i><i class="i-cont">{{postDetail.postSource}}</i></span>
            </li>
            <li class="t2">
                <span class="s1">
                    <i class="i-title">发布内容 ：</i>
                    <i class="i-cont">{{postDetail.postContext}}</i>
                </span>
            </li>
            <li class="t3">
                <span class="s1"><i class="i-title">浏览次数 ：</i><i class="i-cont">{{postDetail.seeNum}}</i></span>
                <span class="s2"><i class="i-title">评论次数 ：</i><i class="i-cont">{{postDetail.commentNum}}</i></span>
                <span class="s3"><i class="i-title">获赞次数 ：</i><i class="i-cont">{{postDetail.fansNum}}</i></span>
            </li>
        </ul>
        <ul class="imgList" v-if="postDetail.postType==1">
            <li v-for="imgurl in postDetail.postUrls"><img :src="imgurl"></li>
        </ul>
        <ul class="videoList" v-if="postDetail.postType==3">
            <li><video controls="controls" :src="postDetail.postUrls[0]">对不起；您的浏览器不支持HTML5视频播放</video></li>
        </ul>
    </div>

    <div class="cont3">
        <h3 class="c-title">-评论信息-</h3>
        <ul class="itemList">
            <li>
                <!-- <textarea class="input" placeholder="说点什么......" v-model="commentContext"></textarea> -->
                <el-input class="input" type="textarea" :autosize="{minRows: 1.2, maxRows: 5}" placeholder="说点什么......" maxlength="200" v-model="commentContext"></el-input>
                <a class="btn" @click="fabuComment">评论</a>
            </li>
            <li>
                <span class="tips">{{commentContext.length}}/200</span>
            </li>
        </ul>
    </div>

    <div class="cont4" v-if="noComment">
        <ul>
            <li class="list" v-for="(comment,index) in commentsList">
                <dl class="clearfix">
                    <dt><img :src="comment.avatar"></dt>
                    <dd>
                        <div class="row1">
                            <span class="username">{{comment.userName}}</span>
                            <span class="time">{{comment.commentTime}}</span>
                        </div>
                        <div class="row2">{{comment.commentContext}}</div>
                        <div class="row3">
                            <span class="reply" @click="showReplyInput(index)">【回复】</span>
                            <span class="zan" @click="dianzan1(index, comment.hasPraise)">{{comment.praiseNum}}</span>
                            <span class="delete" @click="deleteComment1(index)">删除</span>
                            <!-- <span class="more" @click="linkMore(index,comment.commentNum,comment.commentId)">查看所有评论({{comment.commentNum}})</span> -->
                        </div>
                    </dd>
                </dl>
                <div class="input-reply" v-if="comment.isShowInput">
                    <textarea class="input" :placeholder="'回复：'+comment.userName" v-model="replyInput"></textarea>
                    <a class="btn" @click="reply1(index)">回复</a>
                </div>
                <a class="checkmore" v-if="comment.commentNum>0" @click="linkMore(index,comment.commentNum,comment.commentId)">查看对他的所有评论（{{comment.commentNum}}）>></a>
                <!-- <router-link class="checkmore" :to="{name: 'replyDetail'}">查看对他的所有评论（{{comment.commentNum}}）>></router-link> -->

<!--                 <ul v-if="comment.secondView&&comment.secondView.length>0">
                   <li class="list" v-for="(secondView,secondIndex) in comment.secondView">
                        <dl class="clearfix">
                            <dt><img :src="secondView.avatar"></dt>
                            <dd>
                                <div class="row1">
                                    <span class="username">{{secondView.userName}} @ {{comment.userName}}</span>
                                    <span class="time">{{secondView.commentTime}}</span>
                                </div>
                                <div class="row2">{{secondView.commentContext}}</div>
                                <div class="row3">
                                    <span class="reply" @click="showSecondReplyInput(index,secondIndex)">【回复】</span>
                                    <span class="zan" @click="dianzan2(index,secondIndex)">{{secondView.praiseNum}}</span>
                                    <span class="delete" @click="deleteComment2(index,secondIndex)">删除</span>
                                </div>
                            </dd>
                        </dl>
                        <div class="input-reply" v-if="secondView.isShowInput">
                            <textarea class="input" placeholder="" v-model="secondReplyInput"></textarea>
                            <a class="btn" @click="reply2(index,secondIndex)">回复</a>
                        </div>
                    </li>
                </ul> -->

            </li>
<!-- 
           
            <li class="list">
                <dl class="clearfix">
                    <dt><img src="../assets/images/ex1.png"></dt>
                    <dd>
                        <div class="row1">
                            <span class="username">张三李四</span>
                            <span class="time">2018-01-22  17:07</span>
                        </div>
                        <div class="row2">修真是条漫漫长路，在这条长路上保不定哪一天就挂了。</div>
                        <div class="row3">
                            <span class="reply">【回复】</span>
                            <span class="zan">231</span>
                            <span class="delete">删除</span>
                        </div>
                    </dd>
                </dl>
                <div class="checkmore">查看对他的所有评论（32）>></div>
            </li> 
        -->

            <li class="list-checkmore">
                <span class="s1" @click="checkMoreDetailComment">{{noCommentText}}</span>
                <a class="s2" @click="linkcommentInput">写评论</a>
            </li>
<!--             <li class="list-checkmore" v-if="!noComment">
                <span class="s1">加载中...</span>
                <span class="s2">写评论</span>
            </li> -->
<!--             <li class="list-checkmore no-more" v-if="noComment">
                <span class="s1">没有更多评论了</span>
                <a class="s2" @click="linkcommentInput">写评论</a>
            </li> -->
        </ul>
    </div>


    <div class="cont-noreply" v-if="noInit">
        <img src="../assets/images/message1.png">
        <span>暂时没有新的评论</span>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
  name: 'dynamicDetail',
  data () {
    return {
        postDetail: {},//动态详情
        commentsList: [],//评论列表
        commentPage: 1,//当前是第几页的评论列表
        noCommentText: '查看更多评论',
        noComment: false,//没有评论数据
        noInit: false,//页面第一次加载时没有数据,
        commentContext: '',//填写的评论内容,
        maxContextlength: 200,
        replyInput: '',//一级回复框值
        secondReplyInput: '',//二级回复框值
    }
  },
  created(){
    this.getdynamicDetail();
    this.getComments(this.commentPage,1);
  },
  methods: {
    //获取内容详情
    getdynamicDetail(){
        //console.log(this.$route.query.postId);
        let params = {
            method: 'get',
            url: 'post/getUserPostInfo',           
            data: {
                postId: this.$route.query.postId 
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.postDetail = response.data.data;
            }else{
                that.noData = true;
            }
        });
    },
    //获取评论列表评论
    getComments(commentPage,nodata){
        //nodata，1：表示页面刚加载时数据为空，2：表示点击加载更多时没有更多数据
        //console.log(this.$route.query.postId);
        let params = {
            method: 'get',
            url: 'post/getPostInfo',           
            data: {
                page: commentPage,
                rowPage: 5,
                postId: this.$route.query.postId,  
                roleId: this.$route.query.roleId 
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                //this.commentsList = response.data.data.comment;
                if(response.data.data.comment.length==0){
                    if(nodata==1){
                        this.noInit = true;
                    }
                    if(nodata==2){
                        this.noComment = true;
                        this.noCommentText = '没有更多评论了';
                    }
                }else{
                    this.noComment = true;
                }
                this.commentsList = [...this.commentsList,...response.data.data.comment];

                //向评论列表里面插入isShowInput属性：用于显示、隐藏回复框
                this.commentsList.map((value,index)=>{
                    this.$set(this.commentsList[index],'isShowInput', false);
                    value.secondView.map((value1,index1)=>{
                        this.$set(this.commentsList[index].secondView[index1],'isShowInput', false);
                    });
                });
                //console.log(this.commentsList);
                //this.commentsList.push(response.data.data.comment);
            }
        });
    },
    //查看更多评论（加载更多）
    checkMoreDetailComment(){
        let commentPage = ++this.commentPage;
        this.getComments(commentPage,2);
    },
    //发布总的大评论
    fabuComment(){
        if(util.trim(this.commentContext).length<1){
            this.$message({
              message: '请填写评论内容',
              type: 'error',
              center: true
            });
            return false;
        }
        let params = {
            url: 'post/addComments',           
            data: {
                commentContext: this.commentContext,
                postId: this.$route.query.postId,
                roleId: this.postDetail.roleId,
                type: 1,//1：发布大评论，2：发布小评论
                source: 1//1：帖子，2：后援会  
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.commentsList.unshift(response.data.data.commentInfo);
                this.$set(this.commentsList[0],'isShowInput', false);
                //this.getComments(this.commentPage,1);
            }
        });
    },
    //评论：盖楼
    reply1(index){
        if(util.trim(this.replyInput).length<1){
            this.$message({
              message: '请填写回复内容',
              type: 'error'
            });
            return false;
        }

        let replyUid = '';
        if(this.commentsList[index].isRole==1){//如果是自己给自己回复
            replyUid = this.$route.query.roleId;
        }else{
            replyUid = this.postDetail.roleId;
        }

        let commentObj = this.commentsList[index];
        let commentContext = this.replyInput;
        let replyContext = commentObj.commentContext;
        let parentCommentId = commentObj.commentId;
        let postId = commentObj.postId;
        let replyId = commentObj.commentId;
        //let replyUid = this.postDetail.roleId;//1212
        let commentUid = commentObj.commentUid;//132
        let roleId = this.postDetail.roleId;
        let params = {
            url: 'post/addComments',           
            data: {
                commentContext: commentContext,
                replyContext: replyContext,
                parentCommentId: parentCommentId,//第一级的id，
                postId: postId,
                replyId: replyId,//上一级的id，commentId
                replyUid: replyUid,//上一级的id，commentUid
                commentUid: commentUid,//自己的角色id，roleId
                roleId: roleId,
                type: 2,//1：评论，2：回复
                isRole: 1,//1：角色
                source: 1,
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.commentsList[index].isShowInput = false;
                if(!this.commentsList[index].secondView){
                    this.commentsList[index].secondView = [];
                }
                this.commentsList[index].secondView.unshift(response.data.data.commentInfo);
                this.$set(this.commentsList[index].secondView[0],'isShowInput', false);//设置刚插入的评论isShowInput为false
                this.commentsList[index].commentNum = ++this.commentsList[index].commentNum;
                this.replyInput = '';
            }
        });
    },
    //显示、隐藏一级回复输入框
    showReplyInput(index){
        this.commentsList.map((v,k)=>{
            if(k!=index){
                v.isShowInput = false;
            }            
        });
        this.commentsList[index].isShowInput = !this.commentsList[index].isShowInput;
        this.replyInput = '';
    },
    //显示、隐藏二级回复输入框
    showSecondReplyInput(index,secondIndex){
        this.commentsList[index].secondView.map((v,k)=>{
            v.isShowInput = false;
        });
        this.commentsList[index].secondView[secondIndex].isShowInput = !this.commentsList[index].secondView[secondIndex].isShowInput;
        this.secondReplyInput = '';
    },
    //回到填写评论的输入框位置
    linkcommentInput(){
        window.scrollTo(0,450);
    },
    //跳转查看所有评论
    linkMore(index,commentNum,commentId){
        if(commentNum==0){
            this.$message({
              message: '暂无评论',
              type: 'info'
            });
        }else{
            this.$router.push({name: 'replyDetail',query: {commentId: commentId, postId: this.$route.query.postId, roleId: this.postDetail.roleId, index: index, dynamicId: this.postDetail.roleId}});  
        }
    },
    //一级点赞
    dianzan1(index, hasPraise){
        let commentObj = this.commentsList[index];
        let commentId = commentObj.commentId;
        let roleId = this.postDetail.roleId;
        let url = hasPraise==1?'comment/delPraise':'comment/addPraises';
        let params = {
            url: url,           
            data: {
                commentId: commentId,//上一级的id，commentId
                roleId: roleId,
                source: 1
            }
        }
        util.$http(params).then(response=>{
            if(response.data.code=='0000'){
                if(hasPraise==1){//点过赞，即取消，减1
                    this.commentsList[index].hasPraise = 0;
                    this.commentsList[index].praiseNum = --this.commentsList[index].praiseNum;   
                }else{//点还没点过赞，加1
                    this.commentsList[index].hasPraise = 1;
                    this.commentsList[index].praiseNum = ++this.commentsList[index].praiseNum;
                }
            }
        });
    },
    //删除一级评论
    deleteComment1(index){
        let commentObj = this.commentsList[index];
        let commentId = commentObj.commentId;
        let params = {
            method: 'get',
            url: 'post/delComment',           
            data: {
                commentId: commentId
            }
        }
        //console.log(params);

        this.$confirm('您是否确定删除此条评论及回复?', '删除', {
          type: 'warning'
        }).then(() => {
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    let commentObj_index = this.commentsList;
                    commentObj_index.splice(index,1);
                    this.commentsList= commentObj_index;
                    //console.log(this.commentsList[index]);
                }
            });
        });
    },
  },
  computed:{
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicDetail.less';
</style>
