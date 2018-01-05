<template>
	<div>
	  <div class="shopcar">
	  	<div class="content" @click="toggleList">
	  	  <div class="content-left">
	  	  	<div class="logo-wrapper">
	  	  	  <div class="logo" :class="{'heightlight':totalCount&&totalCount>0}">
	  	  	  	<i class="icon-shopping_cart" :class="{'heightlight':totalCount&&totalCount>0}"></i>
	  	  	  </div>
	  	  	  <div class="num" v-show="totalCount&&totalCount>0">{{totalCount}}</div>
	  	  	</div>
	  	  	<div class="price" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}元</div>
	  	  	<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
	  	  </div>
	  	  <div class="content-right" @click.stop.prevent="toPay"> <!--stop阻止冒泡，prevent阻止默认事件-->
	  	  	<div class="pay" :class="payClass">
	  	  	  {{payDesc}}
	  	  	</div>
	  	  </div>
	  	</div>
	  	<div class="ball_container">
	      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
	        <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
	          <span class="inner inner_hook icon-add_circle"></span>
	        </div>
	      </transition-group>
	    </div>
	    <transition name="up_shift">
		    <div class="shopcar_list" v-show="listShow">
		    	<div class="list_header">
		    		<h1 class="title">购物车</h1>
		    		<span class="empty" @click="empty">清空</span>
		    	</div>
		    	<scroll :data="selectFoods"  class="list_content">
		    		<ul>
		    			<li class="food" v-for="food in selectFoods">
		    				<span class="name">{{food.name}}</span>
		    				<div class="price">
		    					<span>￥{{food.price*food.count}}</span>
		    				</div>
		    				<div class="carcontrol_wrapper">
		    					<carcontrol :food="food"></carcontrol>
		    				</div>
		    			</li>
		    		</ul>
		    	</scroll>
		    </div>
	    </transition>
	  </div>
	  <transition name="mask_fade">
	  	<div class="list_mask" v-show="listShow" @click="hideList"></div>
	  </transition>
	</div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import carcontrol from 'components/carcontrol/carcontrol'
export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  props: {
    // 接收从goods组件传过来的数据
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.$root.eventHub.$on('car.add', this.drop)
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      return this.totalPrice === 0 ? `￥${this.minPrice}元起送` : this.totalPrice < this.minPrice ? `还差￥${this.minPrice - this.totalPrice}起送` : '去结算'
    },
    payClass () {
      return this.totalPrice < this.minPrice ? 'no-enough' : 'enough'
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      return show
    }
  },
  methods: {
    drop (ele) {
      console.log(ele) // 获取到点击的那个添加按钮
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true // 表示可以有下落动画
          ball.el = ele
          this.dropBalls.push(ball)
          return // 跳出循环
        }
      }
      console.log(this.dropBalls)
    },
    beforeEnter (ele) {
      let len = this.balls.length
      while (len--) {
        let ball = this.balls[len]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect() // 小球盒模型
          let x = rect.left - 32 // 小球距离购物车图标的位置
          let y = -(window.innerHeight - rect.top - 22)
          ele.style.display = ''
          ele.style.webkitTransform = `translate3d(0,${y}px,0)`
          ele.style.transform = `translate3d(0,${y}px,0)`
          let inner = ele.getElementsByClassName('inner_hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (ele) {
      /* eslint-disable no-unused-vars */
      var ch = ele.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      this.$nextTick(() => { // 改回运动初始状态
        ele.style.webkitTransform = 'translate3d(0, 0, 0)'
        ele.style.transform = 'translate3d(0,0,0)'
        let inner = ele.getElementsByClassName('inner_hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter (ele) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        ele.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    toPay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`需支付${this.totalPrice}元`)
    }
  },
  components: {
    carcontrol,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
 @import "~common/stylus/mixin"
  .shopcar
    position:fixed
    left:0
    bottom:0
    z-index:50
    height:48px
    width:100%
    .content
      display:flex
      background:#141d27
      font-size:0
      color:rgba(255,255,255,0.4)
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          position:relative
          top:-10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          vertical-align:top
          border-radius:50%
          background:#141d27
          .logo
            width:100%
            height:100%
            border-radius:50%
            text-align:center
            background:#2b343c
            &.heightlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              line-height:44px
              font-size:24px
              color:#80858a
              &.heightlight
                color:#fff
          .num
            position:absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            border-radius:16px
            font-size:9px
            font-weight:700
            color:#ffff
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display:inline-block
          vertical-align:top
          margin-top:12px
          line-height:24px
          padding-right:12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          &.heightlight
            color:#fff
        .desc
          display:inline-block
          vertical-align:top
          margin:12px 0 0 12px
          line-height:24px
          font-size:10px
      .content-right
        flex:0 0 105px
        width:105px
        text-align:center
        .pay
          vertical-align:top
          height:48px
          line-height:48px
          font-size:12px
          font-weight:700
          &.no-enough
            background:#2b333b
          &.enough
            background:#00b43c
            color:#fff
    .ball_container
	    .ball
	      position:fixed
	      left:32px
	      bottom:22px
	      z-index:100
	      color:rgb(0,160,220)
	      &.drop-enter,&.drop-enter-active
	        transition all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
	        .inner
	          display:inline-block
	          width:16px
	          height:16px
	          border-radius:50%
	          /*background:rgb(0,160,220)*/
	          transition:all .4s linear
	  .shopcar_list
	    position:absolute
	    left:0
	    top:0
	    z-index:-1
	    width:100%
	    /*transition:all .4s*/
	    transform:translate3d(0,-100%,0)
	    &.up_shift-enter-active,&.up_shift-leave-active
	      transition:all .4s
	    &.up_shift-leave-active
	      transform:translate3d(0,-100%,0)
	    &.up_shift-enter,&.up_shift-leave-active
	      transform:translate3d(0,0,0)
	    .list_header
	      height:40px
	      line-height:40px
	      padding:0 18px
	      background:#f3f5f7
	      border-bottom:2px solid rgba(7,17,27,0.1)
	      .title
	        float:left
	        font-size:14px
	        color:rgb(7,17,27)
	      .empty
	        float:right
	        font-size:12px
	        color:rgb(0,160,220)
	    .list_content
	      padding:0 18px
	      max-height:217px
	      overflow:hidden
	      background:#fff
	      .food
	        position:relative
	        padding:12px 0
	        box-sizing:border-box
	        border-1px(rgba(7,17,27,0.1))
	        .name
	          line-height:24px
	          font-size:14px
	          color:rgb(7,17,27)
	        .price
	          position:absolute
	          right:90px
	          bottom:12px
	          line-height:24px
	          font-size:14px
	          font-weight:700
	          color:rgb(240,20,20)
	        .carcontrol_wrapper
	          position:absolute
	          right:0
	          bottom:6px
	.list_mask
	  position:fixed
	  top:0
	  left:0
	  width:100%
	  height:100%
	  z-index:40
	  backdrop-filter:blur(10px)
	  background:rgba(7,17,27,0.6)
	  &.mask_fade-enter-active,&.mask_fade-leave-active
	    transition:opacity .4s
	  &.mask_fade-enter,&.mask_fade-leave-to
	    opacity:0
	  /*transform:translate3d(0,-100%,0)
	  &.mask_fade-enter-active,&.mask_fade-leave-active
	    transition:all .4s
	  &.mask_fade-leave-active
	    transform:translate3d(0,-100%,0)
	  &.mask_fade-enter,&.mask_fade-leave-active
	    transform:translate3d(0,0,0)*/
</style>
