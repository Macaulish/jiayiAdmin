<template>
  <div class="productionList">

    <div class="cont1">
        <a class="back" href="#"><返回</a>
        <h3 class="row1">-回复详情-</h3>
    </div>

    <div class="cont-head">
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
            </li>
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

    <div class="cont-noreply">
        <img src="../assets/images/message1.png">
        <span>暂时没有新的评论</span>
    </div>

  </div>

</template>

<script>
export default {
  name: 'postingsMore',
  data () {
    return {
    }
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
