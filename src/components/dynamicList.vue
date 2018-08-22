<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-动态信息-</h3>
    </div>

    <div class="cont1 clearfix" style="margin-top:40px;">
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
                    <td style="padding-left:20px;">动态类型</td>
                    <td>
                        <select>
                            <option>图文</option>
                            <option>视频</option>
                        </select>
                    </td>
                    <td><a class="sure" @click="search">确定</a></td>
                </tr>
            </table>
        </div>
        <router-link class="btn" :to="{name: 'releaseDynamic'}">发布动态</router-link>
    </div>

    <div class="cont2">
	    <table width="100%" class="tableList">
            <thead>
                <tr>
                    <td>发布时间</td>
                    <td>发自</td>
                    <td>发布内容</td>
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
                            <router-link class="btn" :to="{name: 'dynamicDetail'}">详情</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">删除</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">隐藏</router-link> 
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>2018-01-22  17:07</td>
                    <td>逍遥门口</td>
                    <td>修真是条漫漫长路，在这条长路上保...</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>2312</td>
                    <td>
                        <div class="operation">
                            <router-link class="btn" :to="{name: 'dynamicDetail'}">详情</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">删除</router-link>
                            <router-link class="btn" :to="{name: 'createCharacter'}">隐藏</router-link> 
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
  name: 'dynamicList',
  data () {
    return {
    }
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
