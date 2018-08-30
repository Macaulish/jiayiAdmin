<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-修改作品-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">名称类型</h3>
    	<table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品名称 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="容请输入作品名称" value="worksName" v-model="worksName"></td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>作品类型 ：</span></td>
                    <td class="td-cont">
                        <ul class="radiocheckboxGroup">
                            <li class="radioList" :class="{active: productType.key==worksType}" v-for="(productType,index) in productTypes" @click="clickProductType(index)">
                                <input class="inputradio" type="radio" name="prodType" :value="productType.key" v-model="checkProductType">
                                <span class="icon"></span>
                                <span class="text">{{productType.title}}</span>
                            </li>
                        </ul>
                    </td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>{{showTagsIndex==2||showTagsIndex==3?'作品标签':'作品来源'}} ：</span></td>
                    <td class="td-cont">
 <!--                        <ul class="radiocheckboxGroup" v-if="isMultiselect">
                            <li class="checkboxList" :class="{active: tagType.active}" v-for="(tagType,index) in allTagTypes" @click="clickTagType(index)" >
                                <input class="inputcheckbox" type="checkbox" name="prodTag" :value="tagType.title" v-model="checkProductTags">
                                <span class="icon"></span>
                                <span class="text">{{tagType.title}}</span>
                            </li>
                        </ul>

                        <ul class="radiocheckboxGroup" v-else>
                            <li class="radioList" :class="{active: tagType.key==checkSourceType}" v-for="(tagType,index) in allTagTypes" @click="clickSourceType(index)" >
                                <input class="inputradio" type="radio" name="sourceType" :value="tagType.key" v-model="checkSourceType">
                                <span class="icon"></span>
                                <span class="text">{{tagType.title}}</span>
                            </li>
                        </ul> -->

                        <ul class="radiocheckboxGroup" v-for="(allTagTypes,index) in productTypes" v-if="allTagTypes.multiselect" v-show="showTagsIndex==index">
                            <li class="checkboxList" :class="{active: tags.active}" v-for="(tags,index1) in allTagTypes.tags" @click="clickTagType(index,index1)" >
                                <input class="inputcheckbox" type="checkbox" name="prodTag" :value="tags.title" v-model="checkProductTags">
                                <span class="icon"></span>
                                <span class="text">{{tags.title}}</span>
                            </li>
                        </ul>

                        <ul class="radiocheckboxGroup" v-for="(allTagTypes,index) in productTypes" v-if="!allTagTypes.multiselect" v-show="showTagsIndex==index">
                            <li class="radioList" :class="{active: tags.key==checkSourceType}" v-for="(tags,index1) in allTagTypes.tags" @click="clickSourceType(index,index1)">
                                <input class="inputradio" type="radio" name="sourceType" :value="tags.key" v-model="checkSourceType">
                                <span class="icon"></span>
                                <span class="text">{{tags.title}}</span>
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
                    <td class="td-cont"><textarea class="input" value="worksIntroduce" v-model="worksIntroduce"></textarea></textarea></td>
                    <td class="td-right">0/200</td>
                </tr>
                <tr v-if="isShowZuopingUrl">
                    <td class="td-title"><span>作品地址 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="worksUrl" v-model="worksUrl" placeholder="容请输入作品地址"></td>
                    <td class="td-right"></td>
                </tr>
                <tr v-if="isShowWeiboUrl">
                    <td class="td-title"><i class="icon-star">*</i><span>微博地址 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="weiboUrl" v-model="weiboUrl"></td>
                    <td class="td-right"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont3">
        <h3 class="c-title">作品封面</h3>
        <ul class="uploadImgList">
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
                <input class="inputFile" type="file" name="file" accept="image/png,image/jpg" @change="selectFile($event)">
            </li>
            <li v-if="requestUrls">
                <span class="imgbox"><img :src="requestUrls"></span>
                <i class="close" @click="deleteRequestUrls"></i>
            </li>
<!--             <li class="list-status2">
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
            </li> -->
        </ul>
    </div>

    <div class="cont2" v-if="isShowYouxiUrl">
        <h3 class="c-title">下载地址</h3>
        <table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><span>IOS ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="iOSUrl" v-model="iOSUrl"></td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><span>安卓 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="androidUrl" v-model="androidUrl"></td>
                    <td class="td-right"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="cont-last">
        <a class="btn" @click="submit">修改</a>
        <span class="errorTips" v-if="isShowErrorMessage">{{errorMessage}}</span>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
import $ from "jquery"
import OSS from "ali-oss"
import base64 from "base-64"

export default {
    name: 'editProduction',
    data() {
        return {
            aliData: {},
            productionDetail: [],
            productTypes: [],
            allTagTypes: [],
            worksType: '',
            showTagsIndex: 0,
            sourceType: '',
            worksTag: '',
            worksName: '',
            worksIntroduce: '',
            worksUrl: '',
            weiboUrl: '',
            requestUrls: '',//图片地址
            checkProductType: '',//选择作品类型
            checkSourceType: '-1',//选择的作品来源
            checkProductTags: [],//选择的作品标签
            maxFileSize: 5*1024*1024,
            isShowZuopingUrl: false,
            isShowYouxiUrl: false,
            isShowWeiboUrl: false,
            iOSUrl: '',
            androidUrl: '',
            isShowErrorMessage: false,
            errorMessage: ''
        }
    },
    created(){
        //获取阿里云上传图片各种必须的参数
        let params = {
            url: '/post/getAliKey',
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.aliData = response.data.data;
            }
        }); 
    },
    mounted(){
        console.log(this.GLOBAL.PRODUCT_TYPES);
        console.log(this.$route.query.worksId);

        this.productTypes = this.GLOBAL.PRODUCT_TYPES;
        console.log(this.productTypes);
        let params = {
            method: 'get',
            url: 'works/getWorksInfo',
            data: {
                worksId: this.$route.query.worksId,
            }
        }
        util.$http(params).then(response=>{
            console.log(response);
            if(response.data.code=='0000'){
                this.productionDetail = response.data.data;
                this.worksName = response.data.data.worksName;
                this.worksIntroduce = response.data.data.worksIntroduce;
                this.worksUrl = response.data.data.worksUrl;
                this.weiboUrl = response.data.data.weiboUrl;

                let worksType = response.data.data.worksType;
                this.showTagsIndex = worksType;
                this.worksType = worksType;
                this.isShowYouxiUrl = worksType==2;
                this.isShowZuopingUrl = worksType==0||worksType==1||worksType==4||worksType==5;
                this.isShowWeiboUrl = worksType==3;

                this.sourceType = response.data.data.sourceType;
                this.requestUrls = response.data.data.worksImg;
                this.isMultiselect = this.GLOBAL.PRODUCT_TYPES[worksType].multiselect;//设置第一个显示的事多选、还是单选
                this.iOSUrl = response.data.data.iOSUrl;
                this.androidUrl = response.data.data.androidUrl;

                //设置选中的作品标签高亮（后端返回的是带空格分割的汉字）
                let worksTag = response.data.data.worksTag.split(' ');
                console.log(worksTag);
                this.productTypes[worksType].tags.map((value,index)=>{
                    worksTag.map((value1,index1)=>{
                        if(value.title == value1){
                            this.productTypes[worksType].tags[index].active = true;//设置选中的作品标签高亮
                        }
                    });
                    if(value.key == response.data.data.sourceType){
                        //console.log(this.productTypes[worksType].tags[index]);
                        //this.productTypes[worksType].tags[index].active = true;//设置选中的作品来源高亮
                        this.checkSourceType = response.data.data.sourceType;
                    }

                });
            }
        }); 
    },
    methods:{
        clickProductType(index){//判断作品类型下面的子项是多选还是单选
            console.log(index);
            this.worksType = index;
            this.showTagsIndex = index;

            this.isShowYouxiUrl = index==2;
            this.isShowZuopingUrl = index==0||index==1||index==4||index==5;
            this.isShowWeiboUrl = index==3;
        },
        clickTagType(index,index1){//让作品类型高亮
            this.productTypes[index].tags[index1].active = !this.productTypes[index].tags[index1].active;
        },
        clickSourceType(index,index1){
            let tags = this.productTypes[index].tags;
            tags.map(function(v,i){
                tags[i].active = false;
            });
            tags[index1].active = true;
        },
        deleteRequestUrls(){//删除上传图片
            this.requestUrls = '';
        },
        selectFile(event){
            let file = event.target.files[0];
            console.log(file);
            if (file.size > this.maxFileSize) {
              this.$message({showClose: true, message: '亲,图片大小不能超过5M!',type: 'error', duration: 2000});
              return false;
            }

            //let region = base64.decode(response.data.data.endpoint);
            let endpoint = base64.decode(this.aliData.endpoint);
            let accessKeyId = base64.decode(this.aliData.accessKeyId);
            let accessKeySecret = base64.decode(this.aliData.accessKeySecret);
            let bucket = base64.decode(this.aliData.bucket);
            // console.log( endpoint );
            // console.log( accessKeyId );
            // console.log( accessKeySecret );
            // console.log( bucket );

            let OSS = require('ali-oss');
            let client = new OSS({
                region : endpoint,
                endpoint : endpoint,
                accessKeyId : accessKeyId,
                accessKeySecret : accessKeySecret,
                bucket : bucket
            });

            let type = file.name.split('.')[1];
            let storeAs = new Date().getTime() + '.' + type;

            // client.multipartUpload(storeAs, file).then(result=>{
            //   console.log(result)
            //   this.requestUrls = result.res.requestUrls[0];
            // }).catch(err=>{
            //   console.log(err);
            // });

            let that = this;
            async function multipartUpload (storeAs,file) {
              try {
                let result = await client.multipartUpload(storeAs, file, {
                    partSize: 1024*1024
                  });
                  console.log(result);
                    that.requestUrls = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  console.log("超时啦!");
                }
                console.log(e)
              }
            }
            multipartUpload(storeAs,file);
        },
        submit(){
            let that = this;
            this.isShowErrorMessage = false;

            if(util.trim(this.worksName).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入作品名';
                return false;
            }
            if(util.trim(this.worksIntroduce).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请输入作品简介';
                return false;
            }

            if(this.worksType==3){

              if(!this.weiboUrl||this.weiboUrl.length<5){
                    this.isShowErrorMessage = true;
                    this.errorMessage = '请输入微博地址';
                    return false;
                }  
            }

            if(util.trim(this.requestUrls).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请上传作品封面';
                return false;
            }

            console.log(this.worksType);
            console.log(this.productTypes[this.worksType].tags);
            let sourceType = '', worksTag = '';
            if(this.productTypes[this.worksType].multiselect){
                this.productTypes[this.worksType].tags.map(function(value,index){
                    if(value.active){
                        worksTag += value.title+" ";
                    }
                });
                worksTag = worksTag.replace(/\s$/,"");
                sourceType = -1;
            }else{
                this.productTypes[this.worksType].tags.map(function(value,index){
                    if(value.active){
                        sourceType = value.key;
                    }
                });
            }
            console.log(sourceType);
            console.log(worksTag);

            this.worksTag = worksTag;
            this.sourceType = sourceType;

            let confirm = this.$confirm('您确定要修改填写的信息？',{
                type: 'warning'
            }).then(()=>{
                that.sureSubmit();
                confirm.close();
            }).catch(()=>{});;
        },
        sureSubmit(){
            //let loading = this.$loading({ text: '修改中...', customClass: 'el-selfloading' });

            let params = {
                url: 'works/updateWorksInfo',
                data: {
                    adminId: util.getAdminId(),
                    androidUrl: this.androidUrl,
                    iOSUrl: this.iOSUrl,
                    sourceType: parseInt(this.sourceType),
                    weiboUrl: this.weiboUrl,
                    worksId: this.$route.query.worksId,
                    worksImg: this.requestUrls,
                    worksIntroduce: this.worksIntroduce,
                    worksName: this.worksName,
                    worksTag: this.worksTag,
                    worksType: this.worksType,
                    worksTypeName: this.GLOBAL.PRODUCT_TYPES[this.worksType].title,
                    worksUrl: this.worksUrl,
                }
            };
            console.log(params);
            let that = this;
            util.$http(params).then(response=>{
                console.log(response);
                //loading.close();
                if(response.data.code=='0000'){
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                        duration: 1000,
                        onClose: function(){
                            that.$router.push({name: 'productionList'});
                        }
                    }); 
                }
            });
        }
    },
    computed:{
        // radioActive(){
        //     let index = this.checkProductType||0;
        //     console.log(index);
        //     this.tagTypes = this.productTypes[index].tags;//选择作品类型时：显示对应的所有小项
        //     this.radioActive1 = 0;//选择作品类型时：设置对应的作品来源的第一项为选择状态
        //     this.checkSourceType = this.productTypes[index].tags[0].key;//选择作品类型时：设置对应的作品来源的值为第一项的值
        //     return index;
        // },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/createProduction.less';
</style>
