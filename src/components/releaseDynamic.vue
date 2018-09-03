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
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入发布地点" v-model="postSource"></td>
                    <td class="td-right">0/50</td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>发布内容 ：</span></td>
                    <td class="td-cont"><input type="text" class="input" placeholder="请输入人物简介" v-model="postContext"></td>
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
                    <ul class="radiocheckboxGroup">
                        <li class="radioList" :class="{active: selectFileType==radio.value}" v-for="radio in fileTypeGroup">
                            <input class="inputradio" type="radio" name="fileType" :value="radio.value" v-model="fileType">
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
        <ul class="uploadImgList">
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
                <input class="inputFile" type="file" name="file" multiple="multiple" accept="image/png,image/jpg" @change="selectFile($event)">
            </li>

            <li v-for="(image,index) in imageUrl">
                <span class="imgbox"><img :src="image"></span>
                <i class="close" @click="deleteImage(index)"></i>
            </li>
<!--             <li>
                <span class="imgbox"><img src="../assets/images/ex1.png"></span>
                <div class="download">
                    <a class="btn">示例</a>
                    <a class="btn">下载示例</a>
                </div>
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
            </li> -->
        </ul>
    </div>

    <div class="uploadMaxFileProgressbar" v-show="!isShowPhoto">
        <h3 class="c-title">-视频素材-</h3>
        <div class="row1">
            <dl>
                <dt>
                    <div class="t1">         
                        <a class="btn">点击上传<input class="inputFile" type="file" name="file" accept="video/mp4,.avi,.wmv,.mov" @change="selectFile1($event)"></a>
                        <a class="s1">视频格式支持、MP4、AVI、WMV、MOV，视频大小不得超过50MB</a>
                    </div>
                </dt>
            </dl>
        </div>
        <div class="row2" v-show="videoName">
            <h6 class="t1">{{videoName}}</h6>
            <div class="t2">
                <span class="s1">已上传：{{currentPercent}}%</span>          
                <span class="s2">{{currentSize}}MB/{{videoSize}}MB</span>
                <span class="s3" @click="deleteVideo">删除文件</span>
            </div>
            <div class="t3">
                <span class="bgbar"></span>
                <span class="processbar" :style="{width: currentPercent+'%'}"></span>
            </div>

            <div id="videoPreview"></div>
        </div>
    </div>

    <div class="cont-last">
        <a class="btn" @click="submit">发布</a>
        <span class="errorTips" v-if="isShowErrorMessage">{{errorMessage}}</span>
    </div>


  </div>

</template>

<script>
import {util} from '../assets/js/util'
import OSS from "ali-oss"
import base64 from "base-64"

export default {
    name: 'releaseDynamic',
    data() {
        return {
            isShowErrorMessage: false,
            errorMessage: '',
            fileTypeGroup: [
                {title: '图文', value: 1},
                {title: '视频', value: 3},
            ],
            roleId: '',
            fileType: 1,//选择文件类型
            isShowPhoto: true,
            aliData: {},//阿里云上传图片各种必须的参数
            postSource: '',//发自
            postContext: '',//发布内容
            maxImageSize: 5*1024*1024,//单张图片大小不超过5M
            maxVideoSize: 50*1024*1024,//单个视频大小不超过50M
            videoName: '',//视频名字
            videoSize: '',//视频大小
            videoTime: 0,//视频总时长
            progressing: 0,//上传视频进度（0-1的小数）
            currentPercent: 0,//当前已上传的进度
            currentSize: 0,//当前已上传的文件大小
            imageUrl: [],//上传后的图片地址
            videoUrl: '',//上传后的视频地址
        }
    },
    created(){
        //获取阿里云上传图片各种必须的参数
        console.log(this.$route.query.roleId);
        this.roleId = this.$route.query.roleId;
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
    methods:{
        //删除图片素材
        deleteImage(index){
            //console.log(this.imageUrl);
            let imageUrl = this.imageUrl;
            imageUrl.splice(index,1);
            this.imageUrl = imageUrl;
            //console.log(this.imageUrl);
        },
        selectFile(event){
            let that = this;

            let files = event.target.files;
            let filesLength = files.length;
            console.log(files);
            console.log(filesLength);

            let rightFiles = [];//获取图片大小符合要求的图片
            for(let i=0;i<filesLength;i++){
                if(files[i].size > this.maxImageSize){
                  this.$message({showClose: true, message: '亲,您选择的有些图片大小超过5M，我们忽略这些图片!',type: 'error', duration: 2000});
                }else{
                    rightFiles.push(files[i]);
                }
            }
            console.log(rightFiles);

            let endpoint = base64.decode(this.aliData.endpoint);
            let accessKeyId = base64.decode(this.aliData.accessKeyId);
            let accessKeySecret = base64.decode(this.aliData.accessKeySecret);
            let bucket = base64.decode(this.aliData.bucket);

            let OSS = require('ali-oss');
            let client = new OSS({
                region : endpoint,
                endpoint : endpoint,
                accessKeyId : accessKeyId,
                accessKeySecret : accessKeySecret,
                bucket : bucket
            });

            async function multipartUpload (file) {
              try {
                for(let i=0;i<file.length;i++){
                  let storeAs = new Date().getTime() + '.png';
                  let result = await client.multipartUpload(storeAs, file[i], {
                    partSize: 1024*1024
                  });
                  console.log(result);
                  that.imageUrl.push(result.res.requestUrls[0].replace(/\?.{0,}$/,""));
                }
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  console.log("超时啦!");
                }
                console.log(e)
              }
            }
            multipartUpload(rightFiles);
        },
        //删除视频
        deleteVideo(){
            this.videoName = '';
            this.videoUrl = '';
        },
        //上传视频
        selectFile1(event){
            const that = this;
            let file = event.target.files[0];
            console.log(file);
            if (file.size > this.maxVideoSize) {
              this.$message({showClose: true, message: '亲,视频大小不能超过50M!',type: 'error', duration: 2000});
              return false;
            }

            var videoPreview = document.getElementById("videoPreview");
            var fileurl = window.URL.createObjectURL(file);
            var createVideo = document.createElement("video");
            createVideo.setAttribute("src", fileurl);
            createVideo.setAttribute("controls", "controls");
            createVideo.setAttribute("width", "100%");
            videoPreview.appendChild(createVideo);
            createVideo.ondurationchange = function() {
                that.videoTime = createVideo.duration;
            }

            this.videoName = file.name;
            this.videoSize = (file.size/1024/1024).toFixed(2);

            let endpoint = base64.decode(this.aliData.endpoint);
            let accessKeyId = base64.decode(this.aliData.accessKeyId);
            let accessKeySecret = base64.decode(this.aliData.accessKeySecret);
            let bucket = base64.decode(this.aliData.bucket);

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

            async function multipartUpload (storeAs,file) {
              try {
                let result = await client.multipartUpload(storeAs, file, {
                    progress,
                    partSize: 1024*1024
                  });
                  console.log(result);
                  that.videoUrl = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  console.log("超时啦!");
                }
                console.log(e)
              }
            }
            let progress = progressing=>{
                console.log(progressing);
                this.progressing = progressing;
                this.currentPercent = (progressing*100).toFixed(0);
                this.currentSize = (this.videoSize*progressing).toFixed(2);
            }
            multipartUpload(storeAs,file);
        },
        submit(){
            const that = this;
            this.isShowErrorMessage = false;

            if(util.trim(this.postSource).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请填写发布地点';
                return false;
            }
            if(util.trim(this.postContext).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请填写发布内容';
                return false;
            }

            //console.log(this.imageUrl);
            let postUrl = '';
            if(this.fileType==1){
                if(this.imageUrl.length<1){
                    this.isShowErrorMessage = true;
                    this.errorMessage = '请上传图片素材';
                    return false;
                }
                postUrl = this.imageUrl.join(",");
            }else if(this.fileType==3){
                if(util.trim(this.videoUrl).length<5){
                    this.isShowErrorMessage = true;
                    this.errorMessage = '请上传视频素材';
                    return false;
                }
                postUrl = this.videoUrl;
            }

            let params = {
                url: 'post/addPost',
                data: {
                    roleId: this.roleId,
                    postType: this.fileType,
                    postSource: this.postSource,
                    postContext: this.postContext,
                    postUrl: postUrl,
                    videoTime: this.videoTime//单位：秒
                }
            }
            //console.log(params);
            util.$http(params).then(response=>{
                console.log(response);
                if(response.data.code=='0000'){
                    this.$message({
                        type: 'success',
                        message: '发布成功',
                        duration: 1000,
                        onClose: function(){
                            that.$router.push({name: 'dynamicList'});
                        }
                    });
                }
            }); 
        }
    },
    computed:{
        selectFileType(){
            console.log(this.fileType);
            if(this.fileType==1){
                this.isShowPhoto = true;
            }else{
                this.isShowPhoto = false;
            }
            return this.fileType;
        },
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/releaseDynamic.less';
</style>
