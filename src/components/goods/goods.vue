<template>
<div>
  <div class="goods">
		<scroll class="menu-wrapper" :data="goods" :probeType='3'>
			  <ul>
				  <li v-for="(item,index) in goods" class="menu-item" 
				  	                                :class="{'current':currentIndex === index}"
				  	                                @click="selectMenu(index,$event)">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
				  </li>
			  </ul>
		</scroll>
    <scroll class="foods-wrapper" 
    	      :data="goods" 
    	      :probeType="3" 
    	      :listenScroll="listenScroll"
    	      @scroll="scroll" 
    	      ref="foodsWrapper">
    	<ul>
    		<li v-for="item in goods" class="food-list food-list-hook" ref="listGroup">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item" @click="chooseFood(food,$event)">
    					<div class="icon">
    						<img width="57" height="57" :src="food.icon"/>
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
    						</div>
    						<div class="carcontrol-wrapper">
    							<carcontrol :food="food"></carcontrol>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </scroll>
    <shopcar :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
  </div>
  <foodDetail ref="foodDetail" :food="selectedFood"></foodDetail>
</div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import shopcar from 'components/shopcar/shopcar'
import carcontrol from 'components/carcontrol/carcontrol'
import foodDetail from 'components/foodDetail/foodDetail'
const ERR_NO = 0
export default {
  props: {
    // 接收从App组件传过来的数据
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      scrollY: 0,
      listHeight: [],
      selectedFood: {}
    }
  },
  created () {
//  this.listHeight = []
    this.listenScroll = true
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
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count && food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectMenu (index, event) {
//    if (!event._constructed) {
//      return
//    }
      console.log(index)
//    let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let foodList = this.$refs.listGroup
      this.$refs.foodsWrapper.scrollToElement(foodList[index], 100)
    },
    _calculateHeight () {
      this.listHeight = []
      let foodList = this.$refs.listGroup
      console.log(foodList)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      console.log(this.listHeight)
    },
    scroll (pos) {
      this.scrollY = Math.abs(Math.round(pos.y))
    },
    chooseFood (food, event) {
      console.log(event)
      this.$refs.foodDetail.show()
      this.selectedFood = food
    }
  },
  watch: {
    goods () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  },
  components: {
    Scroll,
    shopcar,
    carcontrol,
    foodDetail
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
        &.current
          position:relative
          z-index: 10
          margin-top:-1px
          background:#fff
          font-weight:700
          .text
            border-none()
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
          .desc, .extra
            font-size:10px
            line-height:10px
            color:rgb(147,153,159)
          .desc
            margin-bottom:8px
            line-height:12px
          .extra
            .count
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
          .carcontrol-wrapper
            position:absolute
            right:0
            bottom:12px
</style>
