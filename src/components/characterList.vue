<template>
  <div class="productionList">

    <div class="cont1 clearfix">
        <div class="left">
            <table>
                <tr>
                    <td>选择作品</td>
                    <td>
                        <select class="input" v-model="selectWorksName">
                            <option value="0">全部作品</option>
                            <option :value="list.worksId" v-for="list in worksName">{{list.worksName}}</option>
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
    		<li v-for="(list,index) in roleList">
    			<dl>
    				<dt>
                        <span class="imgbox"><img :src="list.imageUrl"></span>
                        <span class="text">{{list.userName}}<br>粉丝：{{list.fansNum}}</span>
                    </dt>
    				<dd>
                        <router-link class="btn" :to="{name: 'characterDetail',query:{roleId: list.roleId}}">详情</router-link>
                        <router-link class="btn" :to="{name: 'editCharacter',query:{roleId: list.roleId}}">编辑</router-link>
                        <a class="btn" @click="deleteRole(list.roleId,index)">删除</a>
    				</dd>
    			</dl>
    		</li>
    	</ul>

        <div class="fenye">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next" :page-size="16" :total="total"></el-pagination>
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

    <div style="display:none;">{{isUpdateListState}}</div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
  name: 'characterList',
  data () {
    return {
        worksName: [],
        selectWorksName: 0,
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
        //console.log(response);
        if(response.data.code=='0000'){
            this.worksName = response.data.data;
        }
    }); 
    this.init(1);
  },
  methods:{
    init(page){
        let params = {
            method: 'get',
            url: 'user/roleList',           
            data: {
                rowPage: 16,
                page: page,
                adminId: util.getAdminId(),
                worksId: this.selectWorksName,
            }
        };
        util.$http(params).then(response=>{
            ////console.log(response);
            if(response.data.code=='0000'){
                this.roleList = response.data.data.adminInfo;
                this.total = response.data.data.total;
            }else{
                that.noData = true;
            }
        });
    },
    //选择作品，搜索
    search(){
        this.currentPage = 1;
        this.init(this.currentPage);
    },  
    //删除人物角色
    deleteRole(roleId,index){
        let params = {
            url: 'user/delRole',           
            data: {
                adminId: util.getAdminId(),
                page: 1,
                rowPage: 16,
                roleId: roleId
            }
        };

        this.$confirm('你确定要删除此人物吗？','删除',{type: 'warning'}).then(()=>{
            util.$http(params).then(response=>{
                ////console.log(response);
                if(response.data.code=='0000'){
                    this.init(this.currentPage);
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                }else{
                    this.$message({
                      message: '删除失败',
                      type: 'error'
                    });
                }
            });
        });
    },
    handleCurrentChange(page){
        //console.log(page);
        this.init(page);
    },
  },
  computed:{
    isUpdateListState(){
        if(this.$store.getters.characterListState){
            this.init(this.currentPage);
            this.$store.commit('updateCharacterList',false);
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/characterList.less';
</style>
