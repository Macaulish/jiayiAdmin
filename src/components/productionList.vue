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
                        <router-link class="btn" :to="{name: 'editProduction',query:{worksId:list.worksId}}">编辑</router-link>
                        <a class="btn">删除</a>
    				</dd>
    			</dl>
    		</li>
    	</ul>

<!--         <ul class="pages">
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
        </ul> -->

         <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total"></el-pagination>
          </div>

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
//import $ from "jquery"

export default {
  name: 'productionList',
  data () {
    return {
        postInfo: [],
        noData: false,
        currentPage: 1,//当前第几页（默认第一页）
        total: 0//总条数
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
        //console.log(util.getAdminId());
        let params = {
            method: 'get',
            url: 'works/getWorksInfoList',           
            data: {
                rowPage: 18,
                page: 1,
                adminId: util.getAdminId()
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.postInfo = response.data.data.postInfo;
                this.total = response.data.data.total;
            }else{
                that.noData = true;
            }
        });
    },
    handleCurrentChange(page){
        //console.log(page);
        let params = {
            method: 'get',
            url: 'works/getWorksInfoList',           
            data: {
                rowPage: 10,
                page: page,
                adminId: util.getAdminId()
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.postInfo = response.data.data.postInfo;
            }else{
                that.noData = true;
            }
        });
    },
  },
  watch:{
    $route(to,from){
        //console.log('route');
        //console.log(to);
        //console.log(from);
        if(from.name == 'editProduction'||from.name == 'createProduction'){
            this.init();
        }
    }
  },
  beforeRouteEnter (to, from, next) {
    next();
  },
  beforeRouteUpdate (to, from, next) {
    //console.log(1);
    next();
  },
  beforeRouteLeave (to, from, next) {
    //console.log(2);
    next();
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/productionList.less';
</style>
