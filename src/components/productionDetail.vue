<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-作品详情-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">名称类型</h3>
        <table width="100%">
            <tbody>
                <tr>
                    <td class="td-title">作品名称 ：</td>
                    <td class="td-cont">{{productionDetail.worksName}}</td>
                </tr>
                <tr>
                    <td class="td-title">作品类型 ：</td>
                    <td class="td-cont">{{productionDetail.worksTypeName}}</td>
                </tr>
                <tr>
                    <td class="td-title">作品标签 ：</td>
                    <td class="td-cont">{{productionDetail.worksTag}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont2">
        <h3 class="c-title">简介信息</h3>
        <table width="100%">
            <tbody>
                <tr>
                    <td class="td-title">作品简介 ：</td>
                    <td class="td-cont">{{productionDetail.worksIntroduce}}</td>
                </tr>
                <tr>
                    <td class="td-title">作品地址 ：</td>
                    <td class="td-cont">{{productionDetail.worksUrl}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">作品封面</h3>
        <ul class="itemList">
            <li>
                <span class="imgbox"><img :src="productionDetail.worksImg"></span>
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
//import $ from "jquery"

export default {
  name: 'productionDetail',
  data () {
    return {
        productionDetail: [],
    }
  },
  created(){
    ////console.log(this.$route.query.worksId);
    let params = {
        method: 'get',
        url: 'works/getWorksInfo',
        data: {
            worksId: this.$route.query.worksId,
        },
    }
    util.$http(params).then(response=>{
        ////console.log(response);
        if(response.data.code=='0000'){
            this.productionDetail = response.data.data;
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
