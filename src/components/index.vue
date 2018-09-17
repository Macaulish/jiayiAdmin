<template>
  <div class="index">

    <div class="cont1">
    	<h3 class="row1">-动态整体情况-</h3>

        <dl class="row-mselect clearfix" v-if="worksList.length>1">
            <dt>作品列表</dt>
            <dd>
                <select class="input" v-model="selectPostWorksId" @change="selectGetPost">
                    <option :value="work.worksId" v-for="(work,index) in worksList">{{work.worksName}}</option>
                </select>
            </dd>    
        </dl>
        <ul class="row-tabs" v-if="worksList.length==1">
            <li :class="{active: postActive==index}" v-for="(work,index) in worksList" @click="switchPost(work.worksId,index)">{{work.worksName}}</li>
        </ul>
    	<ul class="row2" v-if="worksList.length>0">
    		<li :class="{active: sourceActive==index}" v-for="(source,index) in sourceType" @click="switchFileType(index,source.value)">{{source.title}}</li>
    	</ul>

    	<ul class="row3">
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-reply.png"></dt>
    				<dd>
    					<span class="s1">回复最多</span>
                        <span class="s1">{{postCondition.firstCommentContext|textEllipsis}}</span>
    					<span class="s2">{{postCondition.firstCommentNum||0}}</span>
    				</dd>
    			</dl>
    		</li>
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-zan.png"></dt>
    				<dd>
    					<span class="s1">点赞最多</span>
                        <span class="s1">{{postCondition.firstGoodContext|textEllipsis}}</span>
    					<span class="s2">{{postCondition.firstGoodNum||0}}</span>
    				</dd>
    			</dl>
    		</li>
    		<li>
    			<dl>
    				<dt><img src="../assets/images/icon-share.png"></dt>
    				<dd>
    					<span class="s1">转发最多</span>
                        <span class="s1">{{postCondition.firstShareContext|textEllipsis}}</span>
    					<span class="s2">{{postCondition.firstShareNum||0}}</span>
    				</dd>
    			</dl>
    		</li>
    	</ul>
    </div>

    <div class="cont2">
    	<h3 class="row1">-人物亲密度整体情况-</h3>

        <dl class="row-mselect clearfix" v-if="worksList.length>1">
            <dt>作品列表</dt>
            <dd>
                <select class="input" v-model="selectIntimacyWorksId" @change="selectGetIntimacy">
                    <option :value="work.worksId" v-for="(work,index) in worksList">{{work.worksName}}</option>
                </select>
            </dd>    
        </dl>

        <ul class="row-tabs" v-if="worksList.length==1">
            <li :class="{active: intimacyActive==index}" v-for="(work,index) in worksList" @click="switchIntimacy(work.worksId,index)">{{work.worksName}}</li>
        </ul>

    	<div class="row-nodata" v-if="worksList.length<1">
    		<span class="s1">还没有人物，前往作品管理创建作品，再创建您的人物</span>
            <router-link :to="{name: 'createProduction'}" class="btn">创建作品</router-link>
    	</div>

        <ul class="itemList">
            <li v-for="intimacy in intimacyCondition">
                <span class="imgbox"><img :src="intimacy.imageUrl"></span>
                <span class="s1">{{intimacy.roleName}}获取亲密度</span>
                <span class="s2">{{intimacy.intimacyNum}}</span>
            </li>
        </ul>
    </div>

    <div class="cont2">
    	<h3 class="row1">-问答整体情况-</h3>

        <dl class="row-mselect clearfix" v-if="worksList.length>1">
            <dt>作品列表</dt>
            <dd>
                <select class="input" v-model="selectQuestionWorksId" @change="selectGetQuestion">
                    <option :value="work.worksId" v-for="(work,index) in worksList">{{work.worksName}}</option>
                </select>
            </dd>    
        </dl>

        <ul class="row-tabs" v-if="worksList.length==1">
            <li :class="{active: questionActive==index}" v-for="(work,index) in worksList" @click="switchQuestion(work.worksId,index)">{{work.worksName}}</li>
        </ul>
    	<div class="row-nodata" v-if="worksList.length<1">
    		<span class="s1">还没有人物，前往作品管理创建作品，再创建您的人物</span>
    		<router-link :to="{name: 'createProduction'}" class="btn">创建作品</router-link>
    	</div>
        <ul class="itemList">
            <li v-for="question in questionCondition">
                <span class="s1">{{question.roleName}}最新问答</span>
                <span class="s2">{{question.questionNum}}</span>
            </li>
        </ul>
    </div>

  </div>

</template>

<script>
import {util} from '../assets/js/util'
export default {
  name: 'index',
  data () {
    return {
        sourceType: [
            {title: '图文', value: 1},
            {title: '视频', value: 3}
        ],
        sourceActive: 0,//图文、视频tab高亮
        worksList: [],//动态tab高亮
        initPostWorksId: '',//动态的高亮中的worksId
        selectPostWorksId: '',//选择动态的下拉框的worksId
        selectIntimacyWorksId: '',//选择人物亲密度的下拉框的worksId
        selectQuestionWorksId: '',//选择问答的下拉框的worksId
        postCondition: {},//动态整体情况
        postActive: 0,//动态tab高亮
        intimacyCondition: [],//亲密度整体情况
        intimacyActive: 0,//亲密度tab高亮
        questionCondition: [],//问答整体情况
        questionActive: 0,//问答tab高亮
    }
  },
  filters:{
    textEllipsis(value){
        if(value){
            return value.length>20?value.slice(0,20)+'...':value;
        }
    }
  },
  created(){
    this.getWorksInfoList();
  },
  methods:{
    //获取作品列表
    getWorksInfoList(){
        let params = {
            method: 'get',
            url: 'works/getWorksInfoList',           
            data: {
                rowPage: 500,
                page: 1,
                adminId: util.getAdminId()
            }
        }
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                let postInfo = response.data.data.postInfo;
                this.worksList = postInfo;
                if(postInfo.length>0){
                    this.initPostWorksId = postInfo[0].worksId; 
                    this.selectPostWorksId = postInfo[0].worksId;
                    this.selectIntimacyWorksId = postInfo[0].worksId;
                    this.selectQuestionWorksId = postInfo[0].worksId;
                    this.getDynamic(postInfo[0].worksId, 1);
                    this.getIntimacy(postInfo[0].worksId);
                    this.getQuestion(postInfo[0].worksId);
                }
            }
        });
    },
    //获取动态整体情况
    getDynamic(worksId,sourceType){
        let params = {
            url: 'user/postCondition',           
            data: {
                worksId: worksId,
                sourceType: sourceType,
            }
        };
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.postCondition = response.data.data;
            }else{
                this.noData = true;
            }
        });
    },
    //动态：切换动态tab
    switchPost(worksId,index){
        if(this.postActive!=index){
            this.getDynamic(worksId, 1);
            this.postActive = index;//设置动态tab高亮
            this.initPostWorksId = worksId;//设置选择的动态tab的worksId
            this.sourceActive = 0;//恢复图文高亮
        }
    },
    //动态：下拉框选择作品列表
    selectGetPost(){
        //console.log(this.initPostWorksId);
        this.getDynamic(this.selectPostWorksId, 1);
        this.sourceActive = 0;//恢复图文高亮
    },
    //动态：切换图文、视频tab
    switchFileType(index,sourceType){
        if(this.sourceActive != index){
            this.sourceActive = index;
            this.getDynamic(this.initPostWorksId, sourceType);
        }
    },
    //人物亲密度：获取亲密度整体情况
    getIntimacy(worksId){
        let params = {
            url: 'user/intimacyCondition',           
            data: {
                worksId: worksId,
                sourceType: 1,
            }
        };
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.intimacyCondition = response.data.data;
            }else{
                that.noData = true;
            }
        });
    },
    //人物亲密度：下拉框选择作品列表
    selectGetIntimacy(){
        //console.log(this.selectIntimacyWorksId);return;
        this.getIntimacy(this.selectIntimacyWorksId);
    },
    //切换亲密度tab
    switchIntimacy(worksId,index){
        if(this.intimacyActive!=index){
            this.getIntimacy(worksId);
            this.intimacyActive = index;
        }
    },
    //获取亲问答整体情况
    getQuestion(worksId){
        let params = {
            url: 'user/questionCondition',           
            data: {
                worksId: worksId,
            }
        };
        util.$http(params).then(response=>{
            //console.log(response);
            if(response.data.code=='0000'){
                this.questionCondition = response.data.data;
            }else{
                that.noData = true;
            }
        });
    },
    //问答：下拉框选择作品列表
    selectGetQuestion(){
        //console.log(this.selectQuestionWorksId);
        this.getQuestion(this.selectQuestionWorksId);
    },
    //切换亲密度tab
    switchQuestion(worksId,index){
        if(this.questionActive!=index){
            this.getQuestion(worksId);
            this.questionActive = index;
        }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/index.less';
</style>
