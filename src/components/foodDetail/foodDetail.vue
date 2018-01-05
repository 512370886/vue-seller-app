<template>
  <transition name="fade">
  	<div class="food" v-show="showFlag">
  	  <div class="food_content">
  	  	<div class="image_header">
  	  	  <img :src="food.image"/>
  	  	  <div class="back" @click="hide">
  	  	  	<i class="icon-arrow_lift"></i>
  	  	  </div>
  	  	</div>
  	  	<div class="content">
  	  	  <h1 class="title">{{food.name}}</h1>
  	  	  <div class="detail">
  	  	  	<span class="sell_count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
  	  	  </div>
  	  	  <div class="price">
  	  	  	<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  	  	  </div>
  	  	</div>
  	  	<div class="carcontrol_wrapper">
  	  	  <carcontrol :food="food"></carcontrol>
  	  	</div>
  	  	<div class="addFood" v-show="!food.count || food.count===0" @click.prevent="addFirstGood">加入购物车</div>
  	  </div>
  	</div>
  </transition>
  
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import carcontrol from 'components/carcontrol/carcontrol'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    addFirstGood () {
      if (!this.food.count) {
//      this.food.count = 1
        setTimeout(() => {
          Vue.set(this.food, 'count', 1) // 利用vue的接口给一个对象添加一个属性，然后这个属性的变化才能被观测到
        }, 500)
      }
      this.$root.eventHub.$emit('car.add', event.target)
    }
  },
  components: {
    carcontrol
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .food
    position:fixed
    left:0
    top:0
    bottom:48px
    width:100%
    z-index:30
    background:#fff
    /*transition:all 0.3s*/
    /*&.fade-enter-active
      transform:translate3d(0,0,0)
    &.fade-enter,&.fade-leave-to
      transform:translate3d(100%,0,0)*/
    &.fade-enter-active,&.fade-leave-active
      transition:all .3s
    &.fade-enter,&.fade-leave-to
      transform:translate3d(100%,0,0)
    .food_content
      position:relative
	  .image_header
	    position:relative
	    width:100%
	    height:0
	    padding-top:100%
	    img
	      position:absolute
	      top:0
	      left:0
	      width:100%
	      height:100%
	    .back
	      position:absolute
	      top:10px
	      left:0
	      .icon-arrow_lift
	        display:block
	        padding:12px
	        font-size:20px
	        color:#fff
	  .content
	    padding:18px
	    .title
	      line-height:14px
	      margin-bottom:8px
	      font-size:14px
	      font-weight:700
	      color:rgb(7,17,27)
	    .detail
	      margin-bottom:18px
	      line-height:10px
	      height:10px
	      font-size:10px
	      color:rgb(147,153,159)
	      .sell_count
	        margin-right:12px
	    .price
	      font-weight:700px
	      line-height:24px
	      .now
	        margin-right:8px
	        font-size:14px
	        color:rgb(240, 20, 20)
	      .old
	        text-decoration:line-through
	        font-size:10px
	        color:rgb(147,153,159)
	  .carcontrol_wrapper
	    position:absolute
	    right:12px
	    bottom:12px
	  .addFood
	    position:absolute
	    right:18px
	    bottom:18px
	    z-index:10
	    height:24px
	    line-height:24px
	    padding:0 12px
	    box-sizing:border-box
	    border-radius:12px
	    font-size:10px
	    color:#fff
	    background:rgb(0,160,220)
</style>
