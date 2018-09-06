<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-帖子详情-</h3>
    </div>

    <div class="cont2">
         <ul class="textList">
            <li class="t1">
                <span class="s1"><i class="i-title">发帖人 ：</i><i class="i-cont">{{postDetail.userName }}</i></span>
                <span class="s2"><i class="i-title">发布时间 ：</i><i class="i-cont">{{postDetail.dynamicTime}}</i></span>
            </li>
            <li class="t2">
                <span class="s1">
                    <i class="i-title">帖子内容 ：</i>
                    <i class="i-cont">{{postDetail.dynamicContext}}</i>
                </span>
            </li>
            <li class="t3">
                <span class="s1"><i class="i-title">浏览次数 ：</i><i class="i-cont">{{$route.query.seeNum}}</i></span>
                <span class="s2"><i class="i-title">评论次数 ：</i><i class="i-cont">{{$route.query.commentNum}}</i></span>
                <span class="s3"><i class="i-title">获赞次数 ：</i><i class="i-cont">{{$route.query.goodNum}}</i></span>
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
//isRole，0：别人，1：自己
export default {
  name: 'postingsDetail',
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
    this.getdynamicDetail(this.commentPage, 1);
  },
  methods: {
    //获取内容详情、评论列表评论
    getdynamicDetail(commentPage,nodata){
        let params = {
            url: 'user/getDynamicDetails',           
            data: {
                dynamicId: this.$route.query.dynamicId,
                roleId: this.$route.query.roleId,
                page: 1,
                rowPage: 5, 
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                if(response.data.data.commentInfo.length==0){
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
                this.postDetail = response.data.data.dynamicInfo;
                this.commentsList = [...this.commentsList,...response.data.data.commentInfo];
                //向评论列表里面插入isShowInput属性：用于显示、隐藏回复框
                this.commentsList.map((value,index)=>{
                    this.$set(this.commentsList[index],'isShowInput', false);
                    value.secondView.map((value1,index1)=>{
                        this.$set(this.commentsList[index].secondView[index1],'isShowInput', false);
                    });
                });
            }
        });
    },
    //查看更多评论（加载更多）
    checkMoreDetailComment(){
        let commentPage = ++this.commentPage;
        this.getdynamicDetail(commentPage,2);
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
                postId: this.$route.query.dynamicId,
                roleId: this.$route.query.roleId,
                type: 1,//1：发布大评论，2：发布小评论
                source: 2//1：帖子，2：后援会  
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                //console.log();
                this.commentsList.unshift(response.data.data.commentInfo);
                this.$set(this.commentsList[0],'isShowInput', false);
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
            replyUid = this.commentsList[index].commentUid;
        }
        let roleId  = this.$route.query.roleId;

        let commentObj = this.commentsList[index];
        let commentContext = this.replyInput;
        let replyContext = commentObj.commentContext;
        let parentCommentId = commentObj.commentId;
        let postId = this.$route.query.dynamicId;
        let replyId = commentObj.commentId;
        //let replyUid = this.$route.query.roleId;//1212
        let commentUid = commentObj.commentUid;//132
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
                source: 2//1：帖子，2：后援会  
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
            this.$router.push({name: 'postingsMore',query: {commentId: commentId, postId: this.$route.query.postId, roleId: this.$route.query.roleId, index: index, dynamicId: this.postDetail.roleId}});  
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
                source: 2
            }
        }   
        //console.log(hasPraise);
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                if(hasPraise==1){//点过赞，即取消，减1
                    this.commentsList[index].hasPraise = 0;
                    this.commentsList[index].praiseNum = --this.commentsList[index].praiseNum;
                }else{//没点过赞，加1
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
