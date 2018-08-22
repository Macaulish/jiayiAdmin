<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-创建作品-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">名称类型</h3>
    	<table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品名称 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="容请输入作品名称"></td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品类型 ：</span></td>
                    <td class="td-cont">
                        <ul class="radioGroup">
                            <li class="radioList" :class="{active: radioActive==radio.value}" v-for="radio in radioGroup">
                                <input class="inputradio" type="radio" name="prodType" :value="radio.value" v-model="prodType">
                                <span class="icon"></span>
                                <span class="text">{{radio.title}}</span>
                            </li>
                        </ul>
                    </td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品标签 ：</span></td>
                    <td class="td-cont">
                        <ul class="checkboxGroup">
                            <li class="checkboxList" :class="{active: checkbox.active}" v-for="(checkbox,index) in checkboxGroup" @click="checkboxActive(index)">
                                <input class="inputcheckbox" type="checkbox" name="prodTag" :value="checkbox.value" v-model="prodTag">
                                <span class="icon"></span>
                                <span class="text">{{checkbox.title}}</span>
                            </li>
                        </ul>
                    </td>
                    <td class="td-right"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont2">
        <h3 class="c-title">简介信息</h3>
        <table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品简介 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入作品简介"></td>
                    <td class="td-right">0/200</td>
                </tr>
                <tr>
                    <td class="td-title"><span>作品地址 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入作品地址"></td>
                    <td class="td-right"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">作品封面</h3>
        <ul class="itemList">
            <li>
                <dl>
                    <dt>
                        <span class="icon-plus"></span>
                        <span class="text">添加图片</span>
                    </dt>
                    <dd>
                        <span>尺寸：315*420像素</span>
                        <span>大小：不超过5MB</span>
                        <span>格式：.JPG .PNG</span>
                    </dd>
                </dl>
            </li>
            <li>
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <i class="close"></i>
            </li>
            <li class="list-status2">
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <i class="close"></i>
                <div class="success">
                    <i class="text">上传成功</i>
                </div>
            </li>
            <li class="list-status3">
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <i class="close"></i>
                <div class="processing">
                    <i class="text">70%</i>
                </div>
            </li>

            <li class="list-status4">
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <i class="close"></i>
                <div class="processing">
                    <span class="fail">
                        <i class="text">上传失败，重新上传</i>
                        <i class="btn">重新上传</i>
                    </span>
                </div>
            </li>
        </ul>
    </div>

    <div class="cont-last">
        <a class="btn" @click="submit">创建</a>
        <span class="errorTips">请输入作品名 / 请选择作品类型 </span>
    </div>

  </div>

</template>

<script>
export default {
    name: 'createProduction',
        data() {
        return {
            radioGroup: [
                {title: '漫画', value: 1},
                {title: '动漫', value: 2},
                {title: '游戏', value: 3},
                {title: '微博', value: 4},
                {title: '小说', value: 5},
                {title: '电影', value: 6},
                {title: '虚拟偶像', value: 7},
            ],
            prodType: '',
            checkboxGroup: [
                {title: '漫画', value: 1, active: false},
                {title: '动漫', value: 2, active: false},
                {title: '游戏', value: 3, active: false},
                {title: '微博', value: 4, active: false},
                {title: '小说', value: 5, active: false},
                {title: '电影', value: 6, active: false},
                {title: '虚拟偶像', value: 7, active: false},
            ],
            prodTag: [],
        }
    },
    methods:{
        checkboxActive(index){
            this.checkboxGroup[index].active = !this.checkboxGroup[index].active;
        },
        submit(){
            console.log(this.prodType);
            console.log(this.prodTag);
        }
    },
    computed:{
        radioActive(){
            return this.prodType||this.radioGroup[0].value;
        },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/createProduction.less';
</style>
