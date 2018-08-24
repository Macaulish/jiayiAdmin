<template>
  <div class="index">

    <div class="cont1">
    	<h3 class="row1">-动态整体情况-</h3>
        <ul class="row-tabs">
            <li class="active">我家大师兄脑子有坑</li>
            <li>潘戈与帕昆</li>
        </ul>
    	<ul class="row2">
    		<li class="active">视频</li>
    		<li>图文</li>
    	</ul>
    	<ul class="row3">
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-reply.png"></dt>
    				<dd>
    					<span class="s1">回复最多</span>
                        <span class="s1">校服是我和小师姐唯一的情侣装</span>
    					<span class="s2">0</span>
    				</dd>
    			</dl>
    		</li>
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-zan.png"></dt>
    				<dd>
    					<span class="s1">点赞最多</span>
                        <span class="s1">校服是我和小师姐唯一的情侣装</span>
    					<span class="s2">0</span>
    				</dd>
    			</dl>
    		</li>
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-share.png"></dt>
    				<dd>
    					<span class="s1">转发最多</span>
                        <span class="s1">校服是我和小师姐唯一的情侣装</span>
    					<span class="s2">0</span>
    				</dd>
    			</dl>
    		</li>
    	</ul>
    </div>

    <div class="cont2">
    	<h3 class="row1">-人物亲密度整体情况-</h3>
        <ul class="row-tabs">
            <li class="active">我家大师兄脑子有坑</li>
            <li>潘戈与帕昆</li>
        </ul>
    	<div class="row-nodata">
    		<span class="s1">还没有人物，前往作品管理创建作品，再创建您的人物</span>
            <router-link :to="{name: 'createProduction'}" class="btn">创建作品</router-link>
    	</div>
        <ul class="itemList">
            <li>
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <span class="s1">潘戈获取亲密度</span>
                <span class="s2">3423</span>
            </li>
            <li>
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <span class="s1">潘戈获取亲密度</span>
                <span class="s2">3423</span>
            </li>
        </ul>
    </div>

    <div class="cont2">
    	<h3 class="row1">-问答整体情况-</h3>
        <ul class="row-tabs">
            <li class="active">我家大师兄脑子有坑</li>
            <li>潘戈与帕昆</li>
        </ul>
    	<div class="row-nodata">
    		<span class="s1">还没有人物，前往作品管理创建作品，再创建您的人物</span>
    		<router-link :to="{name: 'createProduction'}" class="btn">创建作品</router-link>
    	</div>
        <ul class="itemList">
            <li>
                <span class="s1">潘戈最新问答</span>
                <span class="s2">3423</span>
            </li>
            <li>
                <span class="s1">帕昆最新问答</span>
                <span class="s2">3423</span>
            </li>
        </ul>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  created(){
    let params = {
        url: 'works/getWorksInfoList'
    };
    util.axios(params).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(1);
        console.log(error);
    });
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/index.less';
</style>
