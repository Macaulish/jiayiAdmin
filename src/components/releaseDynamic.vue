<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-发布动态-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">-文本素材-</h3>
    	<table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>发自 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入发布地点"></td>
                    <td class="td-right">0/50</td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>发布内容 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入人物简介"></td>
                    <td class="td-right">0/200</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont4">
        <h3 class="c-title">-动态类型-</h3>
        <div class="row1">
            <dl>
                <dt>选择类型 ：</dt>
                <dd>
                    <ul class="radioGroup">
                        <li class="radioList" :class="{active: radioActive==radio.value}" v-for="radio in radioGroup">
                            <input class="inputradio" type="radio" name="prodType" :value="radio.value" v-model="prodType">
                            <span class="icon"></span>
                            <span class="text">{{radio.title}}</span>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>

    </div>


    <div class="cont4" style="padding-bottom:0;" v-show="isShowPhoto">
        <h3 class="c-title">-图片素材-</h3>
        <ul class="itemList">
            <li>
                <dl>
                    <dt>
                        <span class="icon-plus"></span>
                        <span class="text">添加图片</span>
                    </dt>
                    <dd>
                        <span>格式：JPG/PNG/GIF</span>
                        <span>大小：5MB内/张</span>
                        <span>数量：限制9张</span>
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

    <div class="cont4" v-show="!isShowPhoto">
        <h3 class="c-title">-视频素材-</h3>
        <div class="row1">
            <dl>
                <dt>
                    <div class="t1">         
                        <a class="btn">点击上传</a>
                        <a class="s1">视频格式支持、MP4、AVI、WMV、MOV、视频大小不得超过50MB</a>
                    </div>
                </dt>
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
        <a class="btn" @click="submit">发布</a>
        <span class="errorTips">请填写发自哪里  /  请填发布内容</span>
    </div>


  </div>

</template>

<script>
export default {
    name: 'releaseDynamic',
        data() {
        return {
            radioGroup: [
                {title: '图文', value: 1},
                {title: '视频', value: 2},
            ],
            prodType: 1,
            isShowPhoto: true,
        }
    },
    methods:{
        clickRadio(){
            console.log(this.prodType);
        },
        submit(){

        }
    },
    computed:{
        radioActive(){
            console.log(this.prodType);
            if(this.prodType==1){
                this.isShowPhoto = true;
            }else{
                this.isShowPhoto = false;
            }
            return this.prodType||this.radioGroup[0].value;
        },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/releaseDynamic.less';
</style>
