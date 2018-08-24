<template>
  <div class="productionList">

    <div class="cont1 clearfix">
        <div class="left">
            <table>
                <tr>
                    <td>选择作品</td>
                    <td>
                        <select>
                            <option>我家大师兄脑子有坑</option>
                            <option>我家大师兄脑子有坑</option>
                            <option>我家大师兄脑子有坑</option>
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
                        <a class="btn">编辑</a>
                        <a class="btn">删除</a>
    				</dd>
    			</dl>
    		</li>
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
import $ from "jquery"

export default {
  name: 'characterList',
  data () {
    return {
        roleList: [],
        noData: false
    }
  },
  created(){
    let params = {
        method: 'get',
        url: 'user/roleList',           
        data: {
            rowPage: 12,
            page: 1,
            adminId: util.getAdminId()
        }
    };
    util.ajax(params).then(response=>{
        console.log(response);
        if(response.data.code=='0000'){
            this.roleList = response.data.data.adminInfo;
        }else{
            that.noData = true;
        }
    });
  },
  methods:{
    search(){

    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/characterList.less';
</style>
