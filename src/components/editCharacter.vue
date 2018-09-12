<template>
  <div class="productionList">

    <div class="cont1">
        <h3 class="row1">-编辑人物-</h3>
    </div>

    <div class="cont2">
        <h3 class="c-title">人物信息</h3>
    	<table width="100%">
            <tbody>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>所属作品 ：</span></td>
                    <td class="td-cont">
                        <select class="input" v-model="selectWorksName">
                            <option v-for="list in worksName" :value="list.worksId" selected="selected">{{list.worksName}}</option>
                        </select>
                    <td class="td-right"></td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>人物姓名 ：</span></td>
                    <td class="td-cont">
                        <!-- <input type="text" class="input" placeholder="请输入人物姓名" value="roleName" v-model="roleName"> -->
                        <el-input placeholder="请输入人物姓名" v-model="roleName" maxlength="20"></el-input>
                    </td>
                    <td class="td-right">{{roleName.length}}/20</td>
                </tr>
                <tr>
                    <td class="td-title"><i class="icon-star">*</i><span>人物简介 ：</span></td>
                    <td class="td-cont">
                        <!-- <textarea class="input" placeholder="请输入人物简介" value="introduce" v-model="introduce"></textarea> -->
                        <el-input type="textarea" :autosize="{minRows: 1.2, maxRows: 5}" placeholder="请输入人物简介" maxlength="500" v-model="introduce"></el-input>
                    </td>
                    <td class="td-right">{{introduce.length}}/500</td>
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
                <input class="inputFile" type="file" name="file" accept="image/png,image/jpg" @change="selectFile($event,1)">
            </li>
            <li v-if="imageUrl">
                <span class="imgbox"><img :src="imageUrl"></span>
                <i class="close" @click="deleteImageUrl"></i>
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
            <div class="row-left">
                <ul class="radiocheckboxGroup">
                    <li class="radioList" :class="{active: radioActive==radio.value}" v-for="radio in radioGroup">
                        <input class="inputradio" type="radio" name="showType" :value="radio.value" v-model="selectShowType">
                        <span class="icon"></span>
                        <span class="text">{{radio.title}}</span>
                    </li>
                </ul>
                <ul class="uploadImgList" v-if="!is2D3D">
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
                        <input class="inputFile" type="file" name="file" accept="image/png,image/jpg" @change="selectFile($event,2)">
                    </li>
                    <li v-if="showUrl&&selectShowType==1">
                        <span class="imgbox"><img :src="showUrl"></span>
                        <i class="close" @click="deleteShowUrl"></i>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row2" v-if="is2D3D">
            <a class="btn">点击上传<input class="inputFile" type="file" name="file" accept=".zip" @change="selectFile1($event,3)"></a>
            <div class="tips" v-if="is3D">            
                <a class="s1" @click="show3dMsg">3D模型有什么用？</a>
                <div class="msg3d" v-show="isShow3dMsg">ZIP包形式上传，50MB内，提示：3D模型展示<br>可与用户进行趣味性多元化交互，如想拥有模型，请联系我们。</div>
            </div>
            <div v-if="showUrl&&isProgress">
                <h6 class="t1" v-show="packageName">{{packageName}}</h6>
                <div class="t2" v-show="packageName">
                    <span class="s1">已上传：{{progressing*100}}%</span>          
                    <span class="s2">{{progressing*packageSize}}MB/{{packageSize}}MB</span>
                    <span class="s3" @click="deletePackage">删除文件</span>
                </div>
                <div class="t3" v-show="packageName">
                    <span class="bgbar"></span>
                    <span class="processbar" :style="{width: progressing*100+'%'}"></span>
                </div>
            </div>
        </div>

    </div>

    <div class="cont-last">
        <a class="btn" @click="submit">修改</a>
        <span class="errorTips" v-if="isShowErrorMessage">{{errorMessage}}</span>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
import OSS from "ali-oss"
import base64 from "base-64"

export default {
    name: 'editCharacter',
        data() {
        return {
            radioGroup: [
                {title: '立绘', value: 1, url: ''},
                {title: '2D', value: 2, url: ''},
                {title: '3D', value: 3, url: ''},
            ],
            isShowSuolue: false,
            isShowXingxiang: false,
            isShow3dMsg: false,
            is2D3D: false,
            is3D: true,
            isProgress: true,
            isShowPackgeProgress: false,
            isShowErrorMessage: false,
            errorMessage: '',

            aliData: {},//阿里云上传图片各种必须的参数
            worksName: [],//所属所有作品
            roleDetail: [],//作品详细信息
            selectWorksName: '',
            selectShowType: 1,//展示形象类型，1：立绘，2:2D，3:3D
            roleName: '',//人物姓名
            introduce: '',//人物简介
            imageUrl: '',//缩略形象图
            showUrl: '',//展示形象图
            maxFileSizeRAR: 100*1024*1024,
            packageName: '',
            packageSize: '',
            progressing: 0,//上传进度
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
                this.aliData = response.data.data;;
            }
        }); 

        //获取所有作品名称
        let params2 = {
            method: 'get',
            url: 'works/getWorksName',
            data: {
                adminId: util.getAdminId(),
            }
        }
        util.$http(params2).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.worksName = response.data.data;
            }
        }); 

        //获取作品的详情
        //console.log(this.$route.query.roleId);
        let params1 = {
            method: 'get',
            url: 'user/getRoleInfo',
            data: {
                roleId: this.$route.query.roleId,
            }
        }
        util.$http(params1).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                let data = response.data.data;
                this.roleDetail = response.data.data;
                this.roleName = data.userName;
                this.introduce = data.introduce;
                this.imageUrl = data.imageUrl;
                this.selectWorksName = data.worksId;
                this.selectShowType = data.showType;
                this.showUrl = data.showUrl;
                this.radioGroup[this.selectShowType-1].url = data.showUrl;
                this.packageName = data.modelName;
            }
        }); 
    },
    methods:{
        showSuolue(){
            this.isShowSuolue = !this.isShowSuolue;
        },
        showXingxiang(){
            this.isShowXingxiang = !this.isShowXingxiang;
        },
        show3dMsg(){
            //this.isShow3D = !this.isShow3D; 
            this.isShow3dMsg = !this.isShow3dMsg; 
        },
        //删除上传的缩略形象图
        deleteImageUrl(){
            this.imageUrl = '';
        },
        //删除上传的展示形象图
        deleteShowUrl(){
            //this.showUrl = '';
            this.radioGroup[this.selectShowType-1].url = '';
        },
        //删除上传的压缩包文件
        deletePackage(){
            //this.showUrl = '';
            this.radioGroup[this.selectShowType-1].url = '';
            this.is2D3D = false;
            this.isProgress = false;
        },
        selectFile(event,number){
            let file = event.target.files[0];
            //console.log(file);
            if (file.size > this.maxFileSize) {
              this.$message({showClose: true, message: '亲,图片大小不能超过5M!',type: 'error', duration: 2000});
              return false;
            }

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

            let that = this;
            if(number==1){
                this.imageUrl = '/static/images/loading.gif';
            }else{
                this.showUrl = '/static/images/loading.gif';
            }
            async function multipartUpload (storeAs,file) {
              try {
                let result = await client.multipartUpload(storeAs, file, {
                    partSize: 1024*1024
                  });
                  //console.log(result);
                  if(number==1){
                    that.imageUrl = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
                  }else{
                    that.showUrl = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
                    that.radioGroup[that.selectShowType-1].url = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
                  }
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  //console.log("超时啦!");
                }
                //console.log(e)
              }
            }
            multipartUpload(storeAs,file);
        },
        selectFile1(event,number){
            //console.log(event);
            let file = event.target.files[0];
            this.packageName = file.name;
            this.packageSize = (file.size/1024/1024).toFixed(2);
            //console.log(this.packageSize);

            console.log(file);
            if (file.size > this.maxFileSizeRAR) {
              this.$message({showClose: true, message: '亲,图片大小不能超过100M!',type: 'error', duration: 2000});
              return false;
            }
            if (!/\.(rar|zip)$/i.test(file.name)) {
              this.$message({showClose: true, message: '亲,文件必须是rar、zip的格式',type: 'error', duration: 2000});
              return false;
            }

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
            ////console.log(storeAs);
            // client.multipartUpload(storeAs, file).then(result=>{
            //     //console.log(result);
            //     this.showUrl = result.res.requestUrls[0];
            // }).catch(err=>{
            //   //console.log(err);
            // });

            this.isProgress = true;
            let that = this;
            async function multipartUpload (storeAs,file) {
              try {
                let result = await client.multipartUpload(storeAs, file, {
                    progress,
                    partSize: 1024*1024
                  });
                  //console.log(result);
                  //that.showUrl = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
                  that.radioGroup[that.selectShowType-1].url = result.res.requestUrls[0].replace(/\?.{0,}$/,"");
              } catch (e) {
                if (e.code === 'ConnectionTimeoutError') {
                  //console.log("超时啦!");
                }
                //console.log(e)
              }
            }
            let progress = progressing=>{
                //console.log(progressing);
                this.progressing = progressing.toFixed(2);
            }
            multipartUpload(storeAs,file);
        },
        submit(){
            this.isShowErrorMessage = false;

            if(util.trim(this.roleName).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请填写人物姓名';
                return false;
            }
            if(util.trim(this.introduce).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请填写人物简介';
                return false;
            }
            if(util.trim(this.imageUrl).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请上传缩略形象';
                return false;
            }
            if(util.trim(this.radioGroup[this.selectShowType-1].url).length<1){
                this.isShowErrorMessage = true;
                this.errorMessage = '请上传展示形象';
                return false;
            }

            let params = {
                url: 'user/updateRoleInfo',
                data: {
                    adminId: util.getAdminId(),
                    source: this.selectWorksName,
                    roleId: this.$route.query.roleId,
                    userName: this.roleName,
                    introduce: this.introduce,
                    imageUrl: this.imageUrl,
                    showUrl: this.radioGroup[this.selectShowType-1].url,
                    showType: this.selectShowType,
                    modelName: this.packageName
                }
            }
            //console.log(params);
            //return;
            let that = this;
            util.$http(params).then(response=>{
                //console.log(response);
                if(response.data.code=='0000'){
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                        duration: 1000,
                        onClose: function(){
                            //that.$router.push({name: 'characterList'});
                            that.$store.commit('updateCharacterList',true);
                            that.$router.go(-1);
                        }
                    }); 
                }
            });

        }
    },
    computed:{
        radioActive(){
            //console.log(this.selectShowType);
            this.is2D3D = this.selectShowType==2||this.selectShowType==3;
            this.is3D = this.selectShowType==3;   
            this.showUrl = this.radioGroup[this.selectShowType-1].url;
            return this.selectShowType;
        },
    }
}
</script>



<style lang="less" scoped>
@import '../assets/less/createCharacter.less';
</style>
