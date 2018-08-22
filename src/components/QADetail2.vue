<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-问答信息-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">-问答详情-</h3>
        <ul class="textList">
            <li class="t1">
                <span class="s1"><i class="i-title">提问人 ：</i><i class="i-cont">东方纤云</i></span>
                <span class="s2"><i class="i-title">提问时间 ：</i><i class="i-cont">2018-01-22 17:07</i></span>
                <span class="s3"><i class="i-title">消耗亲密度 ：</i><i class="i-cont">100</i></span>
            </li>
            <li class="t2">
                <span class="s1">
                    <i class="i-title">提问内容 ：</i>
                    <i class="i-cont">筑基中阶，原为金、土双灵根，因替印飞星顶罪，被逐出逍遥门为彻底摆脱逍遥门选择自废灵根并主动与家</i>
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
                        <td>修真是条漫漫长路，在这条长路上保不定哪一天就挂了。</td>
                    </tr>
                    <tr>
                        <td class="td-title">附加内容 ：</td>
                        <td>
                            <ul class="imgList">
                                <li><img src="../assets/images/ex1.png"></li>
                                <li><img src="../assets/images/ex1.png"></li>
                                <li><img src="../assets/images/ex1.png"></li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-title">附加内容 ：</td>
                        <td>
                            <ul class="videoList">
                                <li><img src="../assets/images/video.png"></li>
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
export default {
    name: 'QADetail2',
        data() {
        return {
        }
    },
    methods:{
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/QADetail.less';
</style>
