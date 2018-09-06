<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-问答信息-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">-问答详情-</h3>
        <ul class="textList">
            <li class="t1">
                <span class="s1"><i class="i-title">提问人 ：</i><i class="i-cont">{{detail.userName}}</i></span>
                <span class="s2"><i class="i-title">提问时间 ：</i><i class="i-cont">{{detail.createTime}}</i></span>
                <span class="s3"><i class="i-title">消耗亲密度 ：</i><i class="i-cont">{{detail.intimacy}}</i></span>
            </li>
            <li class="t2">
                <span class="s1">
                    <i class="i-title">提问内容 ：</i>
                    <i class="i-cont">{{detail.problemContext}}</i>
                </span>
            </li>
        </ul>
    </div>

    <div class="cont5">
        <h3 class="c-title">-解答问题-</h3>
        <div class="row1">
            <table width="100%">
                <tbody>
                    <tr>
                        <td class="td-title">回复内容 ：</td>
                        <td>{{replyObj.planContext}}</td>
                    </tr>
                    <tr v-if="replyObj.planType==1">
                        <td class="td-title">附加内容 ：</td>
                        <td>
                            <ul class="imgList">
                                <li v-for="imageUrl in imageUrlArray"><img :src="imageUrl"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="replyObj.planType==3">
                        <td class="td-title">附加内容 ：</td>
                        <td>
                            <ul class="videoList">
                                <li><video :src="replyObj.planUrl" controls="controls" width="100%"></video></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


  </div>

</template>

<script>
import {util} from '../assets/js/util'

export default {
    name: 'QADetail2',
        data() {
        return {
            detail: {},//消耗亲密度
            replyObj:{},
            imageUrlArray: [],
        }
    },
    created() {
        let detail = this.$route.query.p;
        detail = JSON.parse(decodeURIComponent(detail));
        this.detail = detail;
       this.init();
    },
    methods:{
        init(){
            let params = {
                url: 'user/getQuestionDetails',           
                data: {
                    problemId: this.detail.problemId,
                }
            };
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.replyObj = response.data.data;
                    if(this.replyObj.planType==1){
                        this.imageUrlArray = this.replyObj.planUrl.split(',');
                    }
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/QADetail.less';
</style>
