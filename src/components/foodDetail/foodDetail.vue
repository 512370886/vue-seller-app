<template>
<transition name="fade">
  <scroll class="food" v-show="showFlag" ref="foodDetail" :dataObject="food">
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
  	  	  <div class="carcontrol_wrapper">
  	  	    <carcontrol :food="food"></carcontrol>
  	  	  </div>
  	  	  <div class="addFood" v-show="!food.count || food.count===0" @click.prevent="addFirstGood">加入购物车</div>
  	  	</div>
  	  	<split v-show="food.info"></split>
	  	  <div class="info" v-show="food.info">
	  	  	<h1 class="title">商品信息</h1>
	  	  	<p class="text">{{food.info}}</p>
	  	  </div>
	  	  <split></split>
	  	  <div class="rating">
	  	  	<h1 class="title">商品评价</h1>
	  	  	<ratingselect @typeSelect='chooseType' 
	  	  		            @contentSelect='chooseContent'
	  	  		            :desc="desc" 
	  	  		            :selectType="selectType" 
	  	  		            :onlyContent="onlyContent" 
	  	  		            :ratings="food.ratings"
	  	  		            ></ratingselect>
	  	  	<div class="rating_wrapper">
	  	  		<ul v-show="food.ratings && food.ratings.length">
	  	  			<li v-show="needShow(rating.rateType,rating.text)" class="rating_item" v-for="rating in food.ratings">
	  	  				<div class="user">
	  	  					<span class="name">{{rating.username}}</span>
	  	  					<img class="avatar" :src="rating.avatar" width="12" height="12"/>
	  	  				</div>
	  	  				<div class="time">{{rating.rateTime | formatDate(rating.rateTime )}}</div>
	  	  				<p class="text">
	  	  					<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
	  	  					{{rating.text}}
	  	  				</p>
	  	  			</li>
	  	  		</ul>
	  	  		<div class="no_rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
	  	  	</div>	        
	  	  </div>
  	  </div>
  </scroll>
</transition>
  
</template>

<script type="text/ecmascript-6">
   import Vue from 'vue'
// import BScroll from 'better-scroll'
   import carcontrol from 'components/carcontrol/carcontrol'
   import Split from 'components/split/split'
   import Scroll from 'base/scroll/scroll'
   import ratingselect from 'components/ratingselect/ratingselect'
   import {dateFormat} from 'common/js/date'
   // const POSITIVE = 0
   // const NEGATIVE = 1
   const ALL = 2
   export default {
     data () {
       return {
         showFlag: false,
         selectType: ALL,
         onlyContent: false,
         desc: {
           all: '全部',
           positive: '推荐',
           negative: '吐槽'
         }
       }
     },
     props: {
       food: {
         type: Object
       }
     },
     methods: {
//     initPage () {
//       this.$nextTick(() => {
//         if (!this.scroll) {
//           this.scroll = new BScroll(this.$refs.foodDetail, {
//             click: true
//           })
//         } else {
//           this.scroll.refresh()
//         }
//       })
//     },
       show () {
         this.showFlag = true
         this.selectType = ALL
         this.onlyContent = false
//       this.initPage()
       },
       hide () {
         this.showFlag = false
       },
       addFirstGood () {
         if (!this.food.count) {
//         this.food.count = 1
           setTimeout(() => {
             Vue.set(this.food, 'count', 1) // 利用vue的接口给一个对象添加一个属性，然后这个属性的变化才能被观测到
           }, 500)
         }
         this.$root.eventHub.$emit('car.add', event.target)
       },
       chooseType (type) {
         console.log(type)
         this.selectType = type
       },
       chooseContent (type) {
         console.log(type)
         this.onlyContent = type
       },
       needShow (type, text) {
         if (this.onlyContent && !text) {
           return
         }
         if (this.selectType === ALL) {
           return true
         } else {
           return type === this.selectType
         }
       }
     },
     filters: {
       formatDate (time) {
         let date = new Date(time)
         return dateFormat(date, 'yyyy-MM-dd hh:mm')
       }
     },
     components: {
       carcontrol,
       Split,
       Scroll,
       ratingselect
     }
   }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
 @import '~common/stylus/mixin'
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
		    position:relative
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
		  .info
		    padding:18px
		    .title
		      line-height:14px
		      margin-bottom:6px
		      font-size:14px
		      color:rgb(7,17,27)
		    .text
		      line-height:24px
		      padding:0 8px
		      font-size:12px
		      color:rgb(77,85,93)
		  .rating
		    padding-top:18px
		    .title
		      line-height:14px
		      margin-left:18px
		      font-size:14px
		      color:rgb(7,17,27)
		    .rating_wrapper
		      padding:0 18px
		      .rating_item
		        position:relative
		        padding:16px 0
		        border-1px(rgba(7,17,27,0.1))
		        .user
		          position:absolute
		          right:0
		          top:16px
		          line-height:12px
		          font-size:0
		          .name
		            display:inline-block
		            margin-right:6px
		            vertical-align:top
		            font-size:10px
		            color:rgb(147,153,159)
		          .avatar
		            border-radius:50%
		        .time
		          margin-bottom:6px
		          line-height:12px
		          font-size:10px
		          color:rgb(147,153,159)
		        .text
		          line-height:16px
		          font-size:12px
		          color:rgb(7,17,27)
		          .icon-thumb_up,.icon-thumb_down
		            line-height:16px
		            margin-right:4px
		            font-size:12px
		          .icon-thumb_up
		            color:rgb(0,160,220)
		          .icon-thumb_down
		            color:rgb(147,153,159)
		      .no_rating
		        padding:16px
		        font-size:12px
		        color:rgb(147,153,159)
</style>
