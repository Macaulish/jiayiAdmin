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
                <textarea class="input" placeholder="说点什么......" v-model="commentContext"></textarea><a class="btn" @click="fabuComment">评论</a>
            </li>
            <li>
                <span class="tips">{{commentContextLength}}/200</span>
            </li>
        </ul>
    </div>

    <div class="cont4" v-if="noComment">
        <ul>
            <li class="list" v-for="(comment,index) in commentsList">
                <dl class="clearfix">
                    <dt><img src="../assets/images/ex1.png"></dt>
                    <dd>
                        <div class="row1">
                            <span class="username">{{comment.userName}}</span>
                            <span class="time">{{comment.commentTime}}</span>
                        </div>
                        <div class="row2">{{comment.commentContext}}</div>
                        <div class="row3">
                            <span class="reply" @click="showReplyInput(index)">【回复】</span>
                            <span class="zan">{{comment.praiseNum}}</span>
                            <span class="delete">删除</span>
                        </div>
                    </dd>
                </dl>
                <div class="input-reply" v-if="comment.isShowInput">
                    <textarea class="input" :placeholder="'回复：'+comment.userName"></textarea>
                    <a class="btn" @click="reply1(comment.isRole,comment.commentId,comment.postId,comment.replyContext,comment.isRole,comment.isRole,comment.isRole,comment.isRole,comment.isRole,comment.isRole,comment.isRole)">评论</a>
                </div>
                <router-link class="checkmore" :to="{name: 'replyDetail'}">查看对他的所有评论（{{comment.commentNum}}）>></router-link>

                <ul>
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
                        <div class="input-reply"><input type="text" class="input" placeholder="回复：张三李四"><a class="btn" href="#">评论</a></div>
                    </li>
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
                        <div class="input-reply"><input type="text" class="input" placeholder="回复：张三李四"><a class="btn" href="#">评论</a></div>
                    </li>
                </ul>

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
                <div class="input-reply"><input type="text" class="input" placeholder="回复：张三李四"><a class="btn" href="#">评论</a></div>
            </li>
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
    }
  },
  created(){
    this.getdynamicDetail();
    this.getComments(this.commentPage,1);
  },
  methods: {
    //获取内容详情
    getdynamicDetail(){
        console.log(this.$route.query.postId);
        let params = {
            method: 'get',
            url: 'post/getUserPostInfo',           
            data: {
                postId: this.$route.query.postId 
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
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
        console.log(this.$route.query.postId);
        let params = {
            method: 'get',
            url: 'post/getPostInfo',           
            data: {
                page: commentPage,
                rowPage: 5,
                postId: this.$route.query.postId 
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
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
                });
                console.log(this.commentsList);
                //this.commentsList.push(response.data.data.comment);
            }
        });
    },
    //查看更多评论
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
            console.log(response);
            if(response.data.code=='0000'){
                this.getComments(this.commentPage,1);
            }
        });
    },
    //评论：盖楼
    reply1(){

    },
    //显示、隐藏子评论的输入框
    showReplyInput(index){
        this.commentsList[index].isShowInput = !this.commentsList[index].isShowInput;
    },
    //回到填写评论的输入框位置
    linkcommentInput(){
        window.scrollTo(0,450);
    },
    back(){
        
    }
  },
  computed:{
    commentContextLength(){
        if(this.commentContext.length<this.maxContextlength){
            return this.commentContext.length;
        }else{
            this.commentContext = this.commentContext.substr(0,this.maxContextlength);
            return this.maxContextlength;
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicDetail.less';
</style>
