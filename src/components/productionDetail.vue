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
                    <td class="td-cont">我家大师兄脑子有坑</td>
                </tr>
                <tr>
                    <td class="td-title">作品类型 ：</td>
                    <td class="td-cont">漫画</td>
                </tr>
                <tr>
                    <td class="td-title">作品标签 ：</td>
                    <td class="td-cont">穿越</td>
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
                    <td class="td-cont">筑基中阶，原为金、土双灵根，因替印飞星顶罪，被逐出逍遥门为彻底摆脱逍遥门选择自废灵根并主动与家族断绝关系被印飞星推下悬崖后与魔女女女女女</td>
                </tr>
                <tr>
                    <td class="td-title">作品地址 ：</td>
                    <td class="td-cont">http://www.u17.com/2dsd0ewe/dfddfdf/23232/wjdsxnzyk.html</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">名称类型</h3>
        <ul class="itemList">
            <li>
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
            </li>
        </ul>
    </div>

    <div class="cont4">
        <a class="btn" @click="back">返回</a>
    </div>

  </div>

</template>

<script>
export default {
  name: 'productionDetail',
  data () {
    return {
    }
  },
  methods: {
    back(){
        
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/productionDetail.less';
</style>
