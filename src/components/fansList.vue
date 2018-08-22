<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-后援会-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:40px;height: 58px;">
        <div class="left">
            <table>
                <tr>
                    <td>选择人物</td>
                    <td>
                        <select>
                            <option v-for="role in roles">{{role.userName}}</option>
                        </select>
                    </td>
                    <td><a class="sure" @click="search">确定</a></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="cont2">
	    <table width="100%" class="tableList">
            <thead>
                <tr>
                    <td>发布时间</td>
                    <td>发帖人</td>
                    <td>帖子内容</td>
                    <td>浏览量</td>
                    <td>评论数</td>
                    <td>获赞</td>
                    <td>操作</td>
                </tr>
            </thead>  
            <tbody>
                <tr>
                    <td>2018-01-22  17:07</td>
                    <td>逍遥门口</td>
                    <td>修真是条漫漫长路，在这条长路上保...</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'postingsDetail'}">详情</router-link>
                            <a class="btn">删除</a>
                            <a class="btn">隐藏</a>
                        </div>
                    </td>
                </tr>
            </tbody>     
        </table>
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

    </div>

  </div>

</template>

<script>

export default {
    name: 'fansList',
    data () {
        return {
            response: [],
            roles: [],
        }
    },
    created() {
    },
    methods:{
        search(){

        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/dynamicList.less';
</style>
