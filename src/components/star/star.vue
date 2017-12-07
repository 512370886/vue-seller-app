<template>
  <div class="star" :class="starType">
  	<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    // star的尺寸,决定star的大小
    size: {
      type: Number
    },
    // 评分，决定显现几个star
    score: {
      type: Number
    }
  },
  computed: {
    // 根据外部传入的不同size，决定相应的starType
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      // 比如评分为4<=score<4.5以下则最后的评分为4，如果为4.5<=scroe<5则评分为4.5,score=5则评分为5
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0 // 判断是否有小数点,即评分是否有.5的部分，判断是否为整数
      let integer = Math.floor(score) // 向下取整，即去整星star的部分
      // 往数组里添加整数部分的整星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 有.5的小数部分就往数组里添加半颗星，因每个评分里最大只有一个半颗星的，所以只添加一个
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 如果整星与半星都添加完到数组里，数组的长度还没到最大的长度，则用透明星填满
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin'
  .star
    font-size:0 /*清除行内块级元素之间的空隙*/
    .star-item
      display:inline-block
      background-repeat:no-repeat
    &.star-24
      .star-item
        width:10px
        height:10px
        margin-right:3px
        background-size:10px 10px
        &:last-child
          margin-right:0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')        
    &.star-36
      .star-item
        width:15px
        height:15px
        margin-right:6px
        background-size:15px 15px
        &:last-child
          margin-right:0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-48
      .star-item
        width:20px
        height:20px
        margin-right:22px
        background-size:20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
</style>
