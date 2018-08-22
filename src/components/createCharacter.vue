<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-创建人物-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">人物信息</h3>
    	<table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>所属作品 ：</span></td>
                    <td class="td-cont">
                        <select class="input">
                            <option>我家大师兄脑子有坑</option>
                            <option>我家大师兄脑子有坑</option>
                            <option>我家大师兄脑子有坑</option>
                        </select>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品类型 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入人物姓名"></td>
                    <td class="td-right">0/20</td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>人物简介 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入人物简介"></td>
                    <td class="td-right">0/500</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">缩略形象<a class="sub" @click="showSuolue">什么是缩略形象？</a>
            <div class="modal" v-show="isShowSuolue">
                <dl>
                    <dt>
                        <h6>什么是缩略形象？</h6>
                        <p>缩略形象是指，在图文或视频动态中，人物的形象展示用户点击缩略形象后，可进入人物的主页。</p>
                    </dt>
                    <dd><img src="../assets/images/ex2.png"/></dd>
                </dl>
            </div>
        </h3>
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
                <div class="download">
                    <a class="btn">示例</a>
                    <a class="btn">下载示例</a>
                </div>
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

    <div class="cont4">
        <h3 class="c-title">展示形象<a class="sub" @click="showXingxiang">什么是展示形象？</a>
            <div class="modal" v-show="isShowXingxiang">
                <dl>
                    <dt>
                        <h6>什么是展示形象？</h6>
                        <p>展示形象是指，在人物主页中，展现给用户人物完整比例的形象效果v。</p>
                    </dt>
                    <dd><img src="../assets/images/ex2.png"/></dd>
                </dl>
            </div>
        </h3>
        <div class="row1">
            <dl>
                <dt>
                    <ul class="radioGroup">
                        <li class="radioList" :class="{active: radioActive==radio.value}" v-for="radio in radioGroup">
                            <input class="inputradio" type="radio" name="prodType" :value="radio.value" v-model="prodType">
                            <span class="icon"></span>
                            <span class="text">{{radio.title}}</span>
                        </li>
                    </ul>
                    <div class="t1">         
                        <a class="btn">点击上传</a>
                        <a class="s1" @click="show3D">3D模型有什么用？</a>
                    </div>
                </dt>
                <dd>
                    <span>ZIP包形式上传，50MB内，提示：3D模型展示<br>可与用户进行趣味性多元化交互，如想拥有模型，请联系我们。</span>
                </dd>
            </dl>
        </div>

        <div class="row2">
            <h6 class="t1">你要的第二个动态壁纸来啦1.zip</h6>
            <div class="t2">
                <span class="s1">已上传：40%</span>          
                <span class="s2">3.97MB/266.58MB</span>
                <span class="s3">取消上传</span>
            </div>
            <div class="t3">
                <span class="bgbar"></span>
                <span class="processbar" style="width:100px;"></span>
            </div>
        </div>

    </div>

    <div class="cont-last">
        <a class="btn" @click="submit">创建</a>
        <span class="errorTips">请输入作品名 / 请选择作品类型 </span>
    </div>


  </div>

</template>

<script>
export default {
    name: 'createCharacter',
        data() {
        return {
            radioGroup: [
                {title: '立体', value: 1},
                {title: '3D', value: 2},
                {title: '2D', value: 3},
            ],
            prodType: '',
            isShowSuolue: false,
            isShowXingxiang: false,
            isShow3D: false
        }
    },
    methods:{
        showSuolue(){
            this.isShowSuolue = !this.isShowSuolue;
        },
        showXingxiang(){
            this.isShowXingxiang = !this.isShowXingxiang;
        },
        show3D(){
        },
        submit(){

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
@import '../assets/less/createCharacter.less';
</style>
