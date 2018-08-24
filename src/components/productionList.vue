<template>
  <div class="productionList">

    <div class="cont1 clearfix" style="padding-top:15px;">
        <h3 class="row1">-作品信息-</h3>
        <router-link :to="{name: 'createProduction', params: { userId: 123 }}" class="btn">创建作品</router-link>
    </div>

    <div class="cont2">
    	<ul class="itemList">
    		<li v-for="list in postInfo">
    			<dl>
    				<dt>
                        <span class="imgbox"><img :src="list.worksImg"></span>
                        <span class="text">{{list.worksName}}</span>
                    </dt>
    				<dd>
                        <router-link class="btn" :to="{name: 'productionDetail',query:{worksId:list.worksId}}">详情</router-link>
                        <a class="btn">编辑</a>
                        <a class="btn">删除</a>
    				</dd>
    			</dl>
    		</li>
<!--             <li>
                <dl>
                    <dt>
                        <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                        <span class="text">《叫我僵小鱼》</span>
                    </dt>
                    <dd>
                        <router-link class="btn" :to="{name: 'productionDetail'}">详情</router-link>
                        <a class="btn">编辑</a>
                        <a class="btn">删除</a>
                    </dd>
                </dl>
            </li> -->
    	</ul>
        <ul class="pages">
            <li>[1]</li>
            <li>[2]</li>
            <li>[3]</li>
            <li>[4]</li>
            <li>[5]</li>
            <li>[6]</li>
            <li>[7]</li>
            <li>[8]</li>
            <li>[9]</li>
            <li>[10]</li>
        </ul>

        <ul class="no-list" v-if="noData">
            <router-link :to="{path: 'createProduction'}">
                <li>
                    <span class="icon-plus">+</span>
                    <span class="text">添加作品</span>
                </li>
            </router-link>
        </ul>

    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
import $ from "jquery"

export default {
  name: 'productionList',
  data () {
    return {
        postInfo: [],
        noData: false,
    }
  },
  created(){
    console.log(util.getAdminId());
    let params = {
        method: 'get',
        url: 'works/getWorksInfoList',           
        data: {
            rowPage: 12,
            page: 1,
            adminId: util.getAdminId()
        }
    }
    util.ajax(params).then(response=>{
        console.log(response);
        if(response.data.code=='0000'){
            this.postInfo = response.data.data.postInfo;
        }else{
            that.noData = true;
        }
    });
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/productionList.less';
</style>
