<template>
  <div class="header">
  	<div class="content-wrapper">
  	  <div class="avatar">
  	    <img width="64" height="64" :src="seller.avatar"/>
  	  </div>
  	  <div class="content">
  	  	<div class="title">
  	  		<span class="brand"></span>
  	  		<span class="name">{{seller.name}}</span>
  	  	</div>
  	  	<div class="description">
  	  		<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
  	  	</div>
  	  	<div v-if="seller.supports" class="support">
  	  		<span class="icon"></span>
  	  		<span class="text">{{seller.supports[0].description}}</span>
  	  	</div>
  	  </div>
  	</div>
  	<div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    color: #fff
    background: #000
    .content-wrapper
      padding: 24px 12px 18px 24px /*四个数分别表示上,右,下,左*/
      font-size: 0 /*由一些空白字符造成层与层之间的缝隙，在父元素设置font-size为零，再在他的子元素设置各自的font-size*/
      .avatar
        display: inline-block
      .content
        display: inline-block
        font-size: 14px
</style>
