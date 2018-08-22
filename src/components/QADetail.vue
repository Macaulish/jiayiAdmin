<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-问答详情-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">-提问信息-</h3>
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

    <div class="cont3">
        <h3 class="c-title">-解答问题-</h3>
        <ul class="itemList">
            <li>
                <span class="s1"><i class="icon-star">*</i>回复内容 ：</span>
                <input type="text" class="input" placeholder="请输入作品简介">
                <span class="tips">0/200</span>
            </li>
        </ul>
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
        <a class="btn" @click="submit">发送</a>
        <span class="errorTips">请填写回复内容  /  请填发布内容</span>
    </div>


  </div>

</template>

<script>
export default {
    name: 'QADetail',
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
            this.$router.push({name: 'QADetail2'});
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
@import '../assets/less/QADetail.less';
</style>
