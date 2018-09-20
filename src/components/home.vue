<template>

<div class="page-index">

    <div class="top-bgimg">
        <div class="index-header clearfix">
            <a @click="linkHome">
                <dl class="logobox">
                    <dt><img src="../../static/images/logo.png" alt="logo"></dt>
                    <dd>
                        <h3>加一运营管理平台</h3>
                        <h4>www.jiayiworld.com</h4>
                    </dd>
                </dl>
            </a>
            <ul class="nav">
                <li><a @click="linkHome">首页</a></li>
                <li><a @click="linkMao(800)">平台亮点</a></li>
                <li><a @click="linkMao(1700)">作者评价</a></li>
                <li><a @click="linkMao(2500)">合作伙伴</a></li>
                <li><a @click="linkMao(2500)">联系我们</a></li>
            </ul>
            <ul class="btns">
                <li><a @click="linkLogin">登录</a></li>
            </ul> 
        </div>
        <div class="banner">
            <div class="bg1"><img src="../../static/images/bg2.png"></div>
            <div class="bg2">
                <img class="logo" src="../../static/images/logo1.png">
                <h1>虚拟人物运营<br>管理平台</h1>
                <h3>ACGN 各领域的IP推广运营</h3>
            </div>
            <div class="bg3"><img src="../../static/images/bg3.png"></div>
        </div>
    </div>

    <div class="section-2"><img src="../../static/images/bg4.png"></div>

    <div class="section-3">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <dl>
                        <dt><img src="../../static/images/bg5.png"></dt>
                        <dd>
                            <h3>梁川</h3>
                            <h6>《潘戈与帕昆》运营总监</h6>
                            <p>绝对领域也就是动画片中所谓保护使徒（Angels）的强大的空间结界，可以直译为“绝对不可侵犯领域”。正是由于这种结界的存在才使得使徒有强大的生命力。</p>
                        </dd>
                    </dl>
                </div>
                <div class="swiper-slide">
                    <dl>
                        <dt><img src="../../static/images/bg5.png"></dt>
                        <dd>
                            <h3>梁川</h3>
                            <h6>《潘戈与帕昆》运营总监</h6>
                            <p>绝对领域也就是动画片中所谓保护使徒（Angels）的强大的空间结界，可以直译为“绝对不可侵犯领域”。正是由于这种结界的存在才使得使徒有强大的生命力。绝对领域也就是动画片中所谓保护使徒（Angels）的强大的空间结界，可以直译为“绝对不可侵犯领域”。正是由于这种结界的存在才使得使徒有强大的生命力。</p>
                        </dd>
                    </dl>
                </div>
<!--                 <div class="swiper-slide">
                    <dl>
                        <dt><img src="../../static/images/bg5.png"></dt>
                        <dd>
                            <h3>梁川</h3>
                            <h6>《潘戈与帕昆》运营总监</h6>
                            <p>绝对领域也就是动画片中所谓保护使徒（Angels）的强大的空间结界，可以直译为“绝对不可侵犯领域”。正是由于这种结界的存在才使得使徒有强大的生命力。</p>
                        </dd>
                    </dl>
                </div> -->
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            
        </div>
    </div>

    <div class="section-add">
        <ul class="clearfix">
            <li>
                <a>
                    <img src="../../static/images/ad1.png">
                    <span class="title">bilibili</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad2.png">
                    <span class="title">有妖气</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad3.png">
                    <span class="title">时尚集团</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad4.png">
                    <span class="title">华强方特</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad5.png">
                    <span class="title">狗尾草智能科技</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad6.png">
                    <span class="title">鱼果文化科技</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad7.png">
                    <span class="title">铂熠文化传媒</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad8.png">
                    <span class="title">两点十分</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad9.png">
                    <span class="title">好传动画</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad10.png">
                    <span class="title">漫野</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad11.png">
                    <span class="title">弘耀</span>
                </a>
            </li>
            <li>
                <a>
                    <img src="../../static/images/ad12.png">
                    <span class="title">风鱼动漫</span>
                </a>
            </li>
        </ul>
    </div>

    <div class="footer">
        <div class="row1">联系我们：010-57284115       邮箱：business@jiayiworld.com    北京朝阳区建外SOHO西区17号楼1008</div>
        <div class="row1">Copyright © 2018  北京加一时代数字科技有限公司    京ICP备18044271号-1</div>
    </div>

    <div class="backtop" title="回到顶部" @click="backtop"></div>

</div>

</template>

<script>

export default {
  name: 'home',
  data () {
    return {
    }
  },
  created(){
  },
  mounted(){
      $(window).on('scroll',function(){
        let $this = $(window);
        let sTop = $this.scrollTop();
        if(sTop>=650){
            $('.backtop').show();
        }else{
            $('.backtop').hide();
        }
      });          
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        simulateTouch : false,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }) 
  },
  methods:{
    linkLogin(){
        this.$router.push({name: 'login'});
    },
    linkHome(){
        this.$router.push({name: 'home'});
    },
    linkMao(top){
        //window.scrollTo(0,top);
        $('html,body').animate({scrollTop:top});
    },
    backtop(){
        $('html,body').animate({scrollTop:0},function(){
            $('.backtop').hide();
        });
    }
  },
}
</script>





