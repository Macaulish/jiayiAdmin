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
                    <td class="td-cont"><input style="width:80%;" type="text" class="input" placeholder="容请输入作品名称" value="worksName" v-model="worksName"></td>
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
                <tr v-if="isShowSecondSource">
                    <td class="td-title"><i class="icon-star">*</i><span>作品来源 ：</span></td>
                    <td class="td-cont">
                        <ul class="radiocheckboxGroup" v-for="(allSource,index) in productTypes" v-if="allSource.isShowSecond">
                            <li class="radioList" :class="{active: source.key==checkSourceType}" v-for="(source,index1) in allSource.source" @click="clickSourceType(index,index1)">
                                <input class="inputradio" type="radio" name="sourceType" :value="source.key" v-model="checkSourceType">
                                <span class="icon"></span>
                                <span class="text">{{source.title}}</span>
                            </li>
                        </ul>
                    </td>
                    <td class="td-right"></td>
                </tr>
                <tr v-if="isShowSecondTags">
                    <td class="td-title"><i class="icon-star">*</i><span>作品标签 ：</span></td>
                    <td class="td-cont">
                        <ul class="radiocheckboxGroup" v-for="(allTags,index) in productTypes" v-if="allTags.isShowSecond">
                            <li class="checkboxList" :class="{active: tags.active}" v-for="(tags,index1) in allTags.tags" @click="clickTagType(index,index1)" >
                                <input class="inputcheckbox" type="checkbox" name="prodTag" :value="tags.title" v-model="checkProductTags">
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
                    <td class="td-cont">
                        <!-- <textarea class="input" value="worksIntroduce" v-model="worksIntroduce"></textarea> -->
                        <el-input type="textarea" :autosize="{minRows: 1.2, maxRows: 4}" placeholder="请输入作品简介" maxlength="200" v-model="worksIntroduce"></el-input>
                    </td>
                    <td class="td-right">{{worksIntroduce.length}}/200</td>
                </tr>
                <tr v-if="isShowZuopingUrl">
                    <td class="td-title"><span>{{isShowZuopingTitle}} ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="worksUrl" v-model="worksUrl" placeholder="容请输入作品地址"></td>
                    <td class="td-right"></td>
                </tr>
                <tr v-if="isShowWeiboUrl">
                    <td class="td-title"><i class="icon-star">*</i><span>微博地址 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" value="weiboUrl" v-model="weiboUrl"></td>
                    <td class="td-right"></td>
                </tr>
            </tbody>
            <tbody v-if="isShowYouxiUrl">
                <tr>
                    <td class="td-title"><span>下载地址 ：</span></td>
                    <td class="td-cont td-col2"><span>IOS</span><input type="text" class="input" placeholder="请输入作品地址" value="iOSUrl" v-model="iOSUrl"></td>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"></td>
                    <td class="td-cont td-col2"><span>Android</span><input type="text" class="input" placeholder="请输入作品地址" value="androidUrl" v-model="androidUrl"></td>
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
            isShowSecondSource: false,//是否显示二级的作品来源
            isShowSecondTags: false,//是否显示二级的作品标签
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
            isShowZuopingTitle: '作品地址',
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
            //console.log(response);
            if(response.data.code=='0000'){
                this.aliData = response.data.data;
            }
        }); 
    },
    mounted(){
        //console.log(this.GLOBAL.PRODUCT_TYPES);
        //console.log(this.$route.query.worksId);
        this.productTypes = this.GLOBAL.PRODUCT_TYPES;
        //console.log(this.productTypes);
        let params = {
            method: 'get',
            url: 'works/getWorksInfo',
            data: {
                worksId: this.$route.query.worksId,
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
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
                this.checkSourceType = this.sourceType;
                this.requestUrls = response.data.data.worksImg;
                this.isMultiselect = this.GLOBAL.PRODUCT_TYPES[worksType].multiselect;//设置第一个显示的事多选、还是单选
                this.iOSUrl = response.data.data.iOSUrl;
                this.androidUrl = response.data.data.androidUrl;

                this.isShowSecondSource = this.productTypes[worksType].source?true:false;
                this.isShowSecondTags = this.productTypes[worksType].tags?true:false;

                //设置选中的作品标签高亮（后端返回的是带空格分割的汉字）
                let worksTag = response.data.data.worksTag.split(' ');
                //console.log(worksTag);
                this.productTypes[worksType].isShowSecond = true;
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
        clickProductType(index){
            //console.log(index);
            this.isShowSecondSource = this.productTypes[index].source?true:false;//显示、隐藏二级来源项
            this.isShowSecondTags = this.productTypes[index].tags?true:false;//显示、隐藏二级标签项
            //显示对应的二级项
            this.productTypes.map(function(v,k){
                v.isShowSecond = false;
            });
            this.productTypes[index].isShowSecond = true;

            this.worksType = index;
            this.showTagsIndex = index;

            this.isShowYouxiUrl = index==2;
            this.isShowZuopingUrl = index==0||index==1||index==4||index==5||index==6;
            if(index==6){
                this.isShowZuopingTitle = '官网地址';
            }else{
                this.isShowZuopingTitle = '作品地址';
            }
            this.isShowWeiboUrl = index==3;
        },
        clickSourceType(index,index1){
            this.productTypes[index].source.map(function(v,k){
                v.active = false;
            });
            this.productTypes[index].source[index1].active = true;
        },
        clickTagType(index,index1){//让作品类型高亮
            this.productTypes[index].tags[index1].active = !this.productTypes[index].tags[index1].active;
        },
        deleteRequestUrls(){//删除上传图片
            this.requestUrls = '';
        },
        selectFile(event){
            let file = event.target.files[0];
            //console.log(file);
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
                  //console.log(result);
                    that.requestUrls = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  //console.log("超时啦!");
                }
                //console.log(e)
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

            //isShowSecondSource: '',//是否显示二级的作品来源
            //isShowSecondTags: '',//是否显示二级的作品标签
            //console.log(this.worksType);
            //console.log(this.productTypes[this.worksType].tags);
            let worksTag = '', sourceType = null;
            if(this.isShowSecondTags){//如果有tag，则把tag用逗号隔开
                this.productTypes[this.worksType].tags.map(function(value,index){
                    if(value.active){
                        worksTag += value.title+" ";
                    }
                });
                this.worksTag = worksTag.replace(/\s$/,"");
            }
            if(this.isShowSecondSource){//如果有来源，则显示来源的key值
                this.productTypes[this.worksType].source.map(function(value,index){
                    if(value.active){
                        sourceType = value.key;
                    }
                });
                this.sourceType = sourceType;
            }
            //console.log(sourceType);
            //console.log(worksTag);
            
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
                    sourceType: this.sourceType,
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
            //console.log(params);
            let that = this;
            util.$http(params).then(response=>{
                //console.log(response);
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
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/createProduction.less';
</style>
