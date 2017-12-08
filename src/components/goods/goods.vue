<template>
	<div class="goods">
		<div class="menu-wrapper">
			<scroll :data="goods" :probeType='3' :refreshDelay="100">
			  <ul>
				  <li v-for="(item,index) in goods" class="menu-item">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
				  </li>
			  </ul>
			</scroll>
		</div>
    <div class="foods-wrapper">
    	<ul>
    		<li v-for="item in goods" class="food-list">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item">
    					<div class="icon">
    						<img width="57" height="57" :src="food.icon"/>
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span>月售{{food.sellCount}}</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span>￥{{food.price}}</span>
    							<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
	</div>
  
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
const ERR_NO = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$ajax.get('/api/goods').then((res) => {
      res = res.data
      if (res.errno === ERR_NO) {
        this.goods = res.data
        console.log(this.goods)
      }
    }).catch((error) => {
      alert(error)
    })
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin'
  .goods
    /*先定义视口的高度，及宽度*/
    display:flex
    position:absolute
    top:174px /*头部加导航的高度*/
    bottom:46px /*底部购物车的高度*/
    width:100%
    overflow:hidden /*超出的部分要隐藏*/
    .menu-wrapper
      flex:0 0 80px /*第一个参数表示当flex容器有多余空间时，item是否放大。默认值为0，即当有多余空间时也不放大,第二个参数定义了当容器空间不足时，item是否缩小。默认值为1，表示当空间不足时，item自动缩小，第三个参数表示项目在主轴上占据的空间*/
      width:80px /*为解决flex兼容性问题*/
      background:#f3f5f7
      .menu-item
        display:table /*垂直居中布局最好的样式,不管是一行还是两行都可以垂直居中*/
        padding:0 12px
        height:54px
        width:56px
        line-height:14px
        .icon
          display:inline-block
          margin-right:2px
          vertical-align: top /*左右顶部对齐方式*/
          width:12px
          height:12px
          background-size:12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display:table-cell
          width:56px
          vertical-align:middle
          border-1px(rgba(7,17,27,0.1))
          font-size:12px
    .foods-wrapper
      flex:1 /*表示flex-grow: 1;flex-shrink: 1;flex-basis: 0%;*/
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:1px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display:flex
        margin:18px
        padding-bottom:18px /*因为上下相同的margin不会相加,只会有一个有效果所以加个padding-bottom*/
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          width:57px
          margin-right:10px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          
</style>
