<template>
  <div class="productionList">

    <div class="cont1">
        <a class="back" @click="back"><返回</a>
        <h3 class="row1">-回复详情-</h3>
    </div>

    <div class="cont-head">
        <ul>
            <li class="list">
                <dl class="clearfix">
                    <dt><img :src="firstComment.avatar"></dt>
                    <dd>
                        <div class="row1">
                            <span class="username">{{firstComment.userName}}</span>
                            <span class="time">{{firstComment.commentTime}}</span>
                        </div>
                        <div class="row2">{{firstComment.commentContext}}</div>
                        <div class="row3">
                            <span class="reply" @click="linkcommentInput">【回复】</span>
                            <span class="zan" @click="dianzan1(firstComment.hasPraise)">{{firstComment.praiseNum}}</span>
                            <span class="delete" @click="deleteComment1">删除</span>
                        </div>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>

    <div class="cont3">
        <h3 class="c-title">-评论信息-</h3>
        <ul class="itemList">
            <li>
                <input type="text" class="input" placeholder="说点什么......" v-model="replyInput">
                <a class="btn" @click="reply1">回复</a>
            </li>
            <li>
                <span class="tips">0/200</span>
            </li>
        </ul>
    </div>

    <div class="cont4" v-if="!noComment">
        <ul>
            <li class="list" v-for="(secondView,index) in commentsList">
                <dl class="clearfix">
                    <dt><img :src="secondView.avatar"></dt>
                    <dd>
                        <div class="row1">
                            <span class="username">{{secondView.userName}}</span>
                            <span class="time">{{secondView.commentTime}}</span>
                        </div>
                        <div class="row2">{{secondView.commentContext}}</div>
                        <div class="row3">
                            <span class="reply" @click="showReplyInput(index)">【回复】</span>
                            <span class="zan" @click="dianzan2(index, secondView.hasPraise)">{{secondView.praiseNum}}</span>
                            <span class="delete" @click="deleteComment2(index)">删除</span>
                        </div>
                    </dd>
                </dl>
                <div class="input-reply" v-if="secondView.isShowInput">
                    <textarea class="input" v-model="secondReplyInput"></textarea>
                    <a class="btn" @click="reply2(index)">回复</a>
                </div>
            </li>

        <!--             
            <li class="list-checkmore">
                <span class="s1">查看更多评论</span>
                <span class="s2">写评论</span>
            </li>
            <li class="list-checkmore no-more">
                <span class="s1">没有更多评论了</span>
                <span class="s2">写评论</span>
            </li> 
        -->
        </ul>
    </div>

    <div class="cont-noreply" v-if="noComment">
        <img src="../assets/images/message1.png">
        <span>暂时没有新的评论</span>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
export default {
  name: 'replyDetail',
  data () {
    return {
        firstComment: [],//具体是哪条评论
        commentsList: [],//子评论条数
        commentsListIndex: '',//具体是哪条评论的索引值
        noComment: false,//没有评论数据
        replyInput: '',//一级回复框值
        secondReplyInput: '',
    }
  },
  created(){
    this.getComments();
  },
  methods: {
    //获取评论列表评论
    getComments(commentPage){
        //nodata，1：表示页面刚加载时数据为空，2：表示点击加载更多时没有更多数据
        ////console.log(this.$route.query.postId);
        ////console.log(this.$route.query.index);
        
        // let params = {
        //     method: 'get',
        //     url: 'post/getPostInfo',           
        //     data: {
        //         page: 1,
        //         rowPage: 500,
        //         postId: this.$route.query.postId 
        //     }
        // }
        // util.$http(params).then(response=>{
        //     //console.log(response);
        //     if(response.data.code=='0000'){
        //         //this.commentsList = response.data.data.comment;
        //         if(response.data.data.comment.length==0){
        //             this.noComment = true;
        //         }else{
        //             this.noComment = false;
        //             this.commentsList = response.data.data.comment[this.$route.query.index];
        //             //向评论列表里面插入isShowInput属性：用于显示、隐藏回复框
        //             this.commentsList.secondView.map((value,index)=>{
        //                 this.$set(this.commentsList.secondView[index],'isShowInput', false);
        //             });
        //         }
        //         //console.log(this.commentsList);
        //         //this.commentsList.push(response.data.data.comment);
        //     }
        // });


        let params = {
            url: 'post/commentDetails',           
            data: {
                page: 1,
                rowPage: 500,
                postId: this.$route.query.postId,
                commentId: this.$route.query.commentId 
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                //this.commentsList = response.data.data.comment;
                if(response.data.data.secondComment.length==0){
                    this.noComment = true;
                }else{
                    this.noComment = false;
                    this.firstComment = response.data.data.firstComment;
                    this.commentsList = response.data.data.secondComment;
                    //向评论列表里面插入isShowInput属性：用于显示、隐藏回复框
                    this.commentsList.map((value,index)=>{
                        this.$set(this.commentsList[index],'isShowInput', false);
                    });
                }
                //console.log(this.commentsList);
                //this.commentsList.push(response.data.data.comment);
            }
        });

    },
    //评论
    reply1(){
        if(util.trim(this.replyInput).length<1){
            this.isShowPopover = true;
            this.$message({
              message: '请填写回复内容',
              type: 'error'
            });
            return false;
        }

        let replyUid = '';
        if(this.firstComment.isRole==1){//如果是自己给自己回复
            replyUid = this.$route.query.roleId;
        }else{
            replyUid = this.$route.query.dynamicId;
        }

        let commentObj = this.firstComment;
        let commentContext = this.replyInput;
        let replyContext = commentObj.commentContext;
        let parentCommentId = commentObj.commentId;
        let postId = commentObj.postId;
        let replyId = commentObj.commentId;
        //let replyUid = this.$route.query.roleId;//1212
        let commentUid = commentObj.commentUid;//132
        let roleId = this.$route.query.dynamicId;

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
                this.noComment = false;
                //console.log(this.commentsList);
                this.commentsList.unshift(response.data.data.commentInfo);
                this.$set(this.commentsList[0],'isShowInput', false);//设置刚插入的评论isShowInput为false
                this.replyInput = '';
            }
        });
    },
    //评论：盖楼
    reply2(index){
        if(util.trim(this.secondReplyInput).length<1){
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
            replyUid = this.$route.query.dynamicId;
        }

        let secondView = this.commentsList[index];
        let commentContext = this.secondReplyInput;
        let replyContext = secondView.commentContext;
        let parentCommentId = this.firstComment.commentId;
        let postId = secondView.postId;
        let replyId = secondView.commentId;
        //let replyUid = this.$route.query.roleId;
        let commentUid = secondView.commentUid;
        let roleId = this.$route.query.dynamicId;
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
        //console.log(params);

        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.commentsList[index].isShowInput = false;
                this.commentsList.unshift(response.data.data.commentInfo);
                this.$set(this.commentsList[0],'isShowInput', false);//设置刚插入的评论isShowInput为false
                this.secondReplyInput = '';
            }
        });
    },
    //回到填写评论的输入框位置
    linkcommentInput(){
        window.scrollTo(0,250);
    },
    //显示、隐藏回复输入框
    showReplyInput(index){
        //console.log(index);
        //console.log(this.commentsList[index].isShowInput);
        this.commentsList.map((v,k)=>{
            if(k!=index){
                this.commentsList[k].isShowInput = false;
            }            
        });
        this.commentsList[index].isShowInput = !this.commentsList[index].isShowInput;
        this.secondReplyInput = '';
    },
    //一级点赞
    dianzan1(hasPraise){
        let commentObj = this.firstComment;
        let commentId = commentObj.commentId;
        let roleId = this.$route.query.roleId;
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
                    this.firstComment.hasPraise = 0;
                    this.firstComment.praiseNum = --this.firstComment.praiseNum;     
                }else{//点还没点过赞，加1
                    this.firstComment.hasPraise = 1;
                    this.firstComment.praiseNum = ++this.firstComment.praiseNum;
                }
            }
        });
    },
    //二级点赞
    dianzan2(index,hasPraise){
        let commentObj = this.commentsList[index];
        let commentId = commentObj.commentId;
        let roleId = this.$route.query.roleId;
        let url = hasPraise==1?'comment/delPraise':'comment/addPraises';
        let params = {
            url: url,           
            data: {
                commentId: commentId,//上一级的id，commentId
                roleId: roleId,
                source: 1
            }
        }
        console.log(hasPraise);
        //return;
        util.$http(params).then(response=>{
            if(response.data.code=='0000'){
                if(hasPraise==1){//点过赞，即取消，减1
                    this.commentsList[index].hasPraise = 0;
                    this.commentsList[index].praiseNum = --this.commentsList[index].praiseNum;
                }else{//点还没点过赞，加1
                    this.commentsList[index].hasPraise = 1;
                    this.commentsList[index].praiseNum = ++this.commentsList[index].praiseNum;
                }
            }else{
                this.$message({
                    message: '发生了一个错误',
                    type: 'error'
                });
            }
        });
    },
    //删除一级评论
    deleteComment1(){
        let commentObj = this.firstComment;
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
                    this.$router.go(-1);
                }
            });
        });
    },
    //删除二级评论
    deleteComment2(index){
        let secondView = this.commentsList[index];
        let commentId = secondView.commentId;
        let params = {
            method: 'get',
            url: 'post/delComment',           
            data: {
                commentId: commentId
            }
        }
        //console.log(params);

        this.$confirm('您是否确定删除此条回复?', '删除', {
          type: 'warning'
        }).then(() => {
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.commentsList.splice(index,1);
                }
            });
        }); 
    },
    back(){
        this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicDetail.less';
</style>
