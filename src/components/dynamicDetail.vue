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
                <input type="text" class="input" placeholder="说点什么......"><a class="btn" href="#">评论</a>
            </li>
            <li>
                <span class="tips">0/200</span>
            </li>
        </ul>
    </div>

    <div class="cont4">
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
                <router-link class="checkmore" :to="{name: 'replyDetail'}">查看对他的所有评论（32）>></router-link>
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
            <li class="list-checkmore">
                <span class="s1">查看更多评论</span>
                <span class="s2">写评论</span>
            </li>
            <li class="list-checkmore">
                <span class="s1">加载中...</span>
                <span class="s2">写评论</span>
            </li>
            <li class="list-checkmore no-more">
                <span class="s1">没有更多评论了</span>
                <span class="s2">写评论</span>
            </li>
        </ul>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

//postType字段含义， 0：代码纯文字 1：代码图片，3：代码视频

export default {
  name: 'dynamicDetail',
  data () {
    return {
        postDetail: {}
    }
  },
  created(){
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
  methods: {
    back(){
        
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicDetail.less';
</style>
