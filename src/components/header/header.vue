<template>
  <div class="header">
  	<!--头部内容区总的包裹层-->
  	<div class="content-wrapper">
  		<!--商家头像-->
  	  <div class="avatar">
  	    <img width="64" height="64" :src="seller.avatar"/>
  	  </div>
  	  <div class="content">
  	  	<!--标题，商家名称-->
  	  	<div class="title">
  	  		<span class="brand"></span>
  	  		<span class="name">{{seller.name}}</span>
  	  	</div>
  	  	<!--商家描述-->
  	  	<div class="description">
  	  		<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
  	  	</div>
  	  	<!--在线满减-->
  	  	<div v-if="seller.supports" class="support">
  	  		<span class="icon" :class="classMap[seller.supports[0].type]"></span>
  	  		<span class="text">{{seller.supports[0].description}}</span>
  	  	</div>
  	  </div>
  	  <!--隐藏的5个优惠信息，点开弹出浮层-->
  	  <div v-if="seller.supports" class="supoort-count" @click="show">
  	  	<span class="count">{{seller.supports.length}}个</span>
  	  	<i class="icon-keyboard_arrow_right"></i>
  	  </div>
  	</div>
  	<!--公告-->
  	<div class="bulletin-wrapper" @click="show">
  		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
  		<i class="icon-keyboard_arrow_right"></i>
  	</div>
  	<!--背景图片-->
  	<div class="background">
  		<img :src="seller.avatar" width="100%" height="100%"/>
  	</div>
  	<!--浮层，fix布局-->
  	<div class="detail" v-show="showFlag">
  		<!--sticky footers的经典结构，最外面大的包裹层-->
  		<div class="detail-wrapper clearfix">
  			<!--承载内容层-->
  			<div class="detail-main">
  				<h1 class="name">{{seller.name}}</h1>
  				<!--评星包裹层-->
  				<div class="star-wrapper">
  					<star :size='48' :score='seller.score'></star>
  				</div>
  				<div class="title">
  					<div class="line"></div>
  					<div class="text">优惠信息	</div>
  					<div class="line"></div>
  				</div>
  			</div>
  		</div>
  		<!--定在底部的关闭层-->
  		<div class="detail-close" @click="hide">
  			<i class="icon-close"></i>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin' /*这里的引入不能用别名来设置,别名的设置只针对JS的引入*/
  .header
    position:relative
    overflow:hidden
    color: #fff
    background:rgba(7,17,27,0.5)
    .content-wrapper
      position:relative
      padding: 24px 12px 18px 24px /*四个数分别表示上,右,下,左*/
      font-size: 0 /*由一些空白字符造成层与层之间的缝隙，在父元素设置font-size为零，再在他的子元素设置各自的font-size*/
      .avatar
        display: inline-block
        vertical-align: top /*左右顶部对齐方式*/
        img
          border-radius:2px
      .content
        display: inline-block
        margin-left:16px
        /*font-size: 14px*/
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top /*左右顶部对齐方式*/
            width:30px
            height:18px
            bg-image('brand')
            background-size:30px 18px
            background-repeat: no-repeat
          .name
            margin-left:6px
            font-size:16px
            font-weight: bold
            line-height:18px
        .description
          margin-bottom:10px
          font-size:12px
          font-weight:200
          line-height:12px
        .support
          .icon
            display:inline-block
            margin-right:4px
            vertical-align: top /*左右顶部对齐方式*/
            width:12px
            height:12px
            background-size:12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height:12px
            font-size:12px
      .supoort-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px /*这里的0px表示上下,8px表示左右*/
        line-height:24px
        height:24px
        border-radius:14px
        background:rgba(0,0,0,0.2)
        vertical-align:center
        .count
          vertical-align:top /*左右顶部对齐方式*/
          font-size:10px
        .icon-keyboard_arrow_right
          line-height:24px
          margin-left:2px
          font-size:10px
    .bulletin-wrapper
      position:relative
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      background:rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        margin-top:7px
        vertical-align:top /*左右顶部对齐方式*/
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align:top
        margin:0 4px
        font-size:10px
      .icon-keyboard_arrow_right
        position:absolute
        right:12px
        top:8px
        font-size:10px
     /*头部的背景图片的设置*/
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
      /*浮层，fix布局，全屏铺满整个屏幕*/
    .detail
      position:fixed
      z-index:100
      top:0
      left:0
      width:100%
      height:100%
      overflow:auto  /*为了如果内容超过屏幕的宽度会自动滚动,右边出现滚动条，hidden则不会*/
      background:rgba(7,17,27,0.8)
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px /*这里一定要是padding-bottom不能是margin-bottom*/
          .name
            line-height:16px
            text-align: center
            font-weight:700
            font-size:16px
          .star-wrapper
            margin-top:16px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              padding:0 12px  /*这里的0代表上下,12px代表左右*/
              font-size:14px
      .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0 auto /*关键的样式*/
        clear:both /*关键的样式*/
        font-size:32px
</style>
