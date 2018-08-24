<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-人物详情-</h3>
    </div>

    <div class="cont2">
        <table width="100%">
            <tbody>
                <tr>
                    <td class="td-title">人物姓名 ：</td>
                    <td class="td-cont">{{characterDetail.userName}}</td>
                </tr>
                <tr>
                    <td class="td-title">所在作品 ：</td>
                    <td class="td-cont">{{characterDetail.source}}</td>
                </tr>
                <tr>
                    <td class="td-title">人物简介 ：</td>
                    <td class="td-cont">{{characterDetail.introduce}}</td>
                </tr>
                <tr>
                    <td class="td-title">身高 ：</td>
                    <td class="td-cont">{{characterDetail.hight}}</td>
                </tr>
                <tr>
                    <td class="td-title">性别 ：</td>
                    <td class="td-cont">{{characterDetail.sex==1?'男':'女'}}</td>
                </tr>
                <tr>
                    <td class="td-title">星座 ：</td>
                    <td class="td-cont">{{characterDetail.constellation}}</td>
                </tr>
                <tr>
                    <td class="td-title">三围 ：</td>
                    <td class="td-cont">{{characterDetail.measurements}}</td>
                </tr>
                <tr>
                    <td class="td-title">粉丝数 ：</td>
                    <td class="td-cont">{{characterDetail.fansNum}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">人物形象</h3>
        <ul class="itemList">
            <li>
                <span class="imgbox"><img :src="characterDetail.imageUrl"></span>
            </li>
        </ul>
    </div>

    <div class="cont3">
        <h3 class="c-title">独立展示</h3>
        <ul class="itemList">
            <li>
                <span class="imgbox"><img :src="characterDetail.showUrl"></span>
            </li>
        </ul>
    </div>

    <div class="cont4">
        <a class="btn" @click="back">返回</a>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
import $ from "jquery"

export default {
  name: 'characterDetail',
  data () {
    return {
        characterDetail: [],
    }
  },
  created(){
    console.log(this.$route.query.roleId);
    let params = {
        method: 'get',
        url: 'user/getRoleInfo',
        data: {
            roleId: this.$route.query.roleId,
        },
    }
    util.ajax(params).then(response=>{
        console.log(response);
        if(response.data.code=='0000'){
            this.characterDetail = response.data.data;
        }
    });
  },
  methods: {
    back(){
         this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/productionDetail.less';
</style>
