<template>
  <div class="productionList">

    <div class="cont1 clearfix">
        <div class="left">
            <table>
                <tr>
                    <td>选择作品</td>
                    <td>
                        <select class="input" v-model="selectWorksName">
                            <option v-for="list in worksName" :value="list.worksId" selected="selected">{{list.worksName}}</option>
                        </select>
                    </td>
                    <td><a class="sure" @click="search">确定</a></td>
                </tr>
            </table>
        </div>
        <h3 class="row1">-人物信息-</h3>
        <router-link class="btn" :to="{name: 'createCharacter'}">创建人物</router-link>
    </div>

    <div class="cont2">
    	<ul class="itemList">
    		<li v-for="list in roleList">
    			<dl>
    				<dt>
                        <span class="imgbox"><img :src="list.imageUrl"></span>
                        <span class="text">{{list.userName}}<br>粉丝：{{list.fansNum}}</span>
                    </dt>
    				<dd>
                        <router-link class="btn" :to="{name: 'characterDetail',query:{roleId:list.roleId}}">详情</router-link>
                        <router-link class="btn" :to="{name: 'editCharacter',query:{roleId:list.roleId}}">编辑</router-link>
                        <a class="btn">删除</a>
    				</dd>
    			</dl>
    		</li>
    	</ul>

         <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total"></el-pagination>
          </div>

        <ul class="no-list" v-if="noData">
            <router-link :to="{name: 'createCharacter'}">
                <li>
                    <span class="icon-plus">+</span>
                    <span class="text">添加人物</span>
                </li>
            </router-link>
        </ul>

    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
  name: 'characterList',
  data () {
    return {
        worksName: [],
        selectWorksName: '',
        roleList: [],
        noData: false,
        currentPage: 1,//当前第几页（默认第一页）
        total: 0//总条数
    }
  },
  created(){
    //获取所有作品名称
    let params = {
        method: 'get',
        url: 'works/getWorksName',
        data: {
            adminId: util.getAdminId(),
        }
    }
    util.$http(params).then(response=>{
        console.log(response);
        if(response.data.code=='0000'){
            this.worksName = response.data.data;
            this.selectWorksName = response.data.data[0].worksId;
        }
    }); 

    this.init();
  },
  methods:{
    init(){
        let params = {
            method: 'get',
            url: 'user/roleList',           
            data: {
                rowPage: 10,
                page: 1,
                adminId: util.getAdminId()
            }
        };
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.roleList = response.data.data.adminInfo;
                this.total = response.data.data.total;
            }else{
                that.noData = true;
            }
        });
    },
    search(){

    },  
    handleCurrentChange(page){
        console.log(page);
        let params = {
            method: 'get',
            url: 'user/roleList',           
            data: {
                rowPage: 10,
                page: page,
                adminId: util.getAdminId()
            }
        };
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.roleList = response.data.data.adminInfo;
            }else{
                that.noData = true;
            }
        });
    },
  },
  watch: {
    $route(to,from){
        if(from.name=='editCharacter'||from.name=='createCharacter'){
            this.init();
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/characterList.less';
</style>
