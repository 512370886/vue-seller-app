<template>
  <div class="carcontrol">
  	<transition name="fade">
  		<div class="car-decrease" v-show="food.count>0" @click="decreaseFood($event)">
  			<i class="inner icon-remove_circle_outline"></i>
  		</div>
  	</transition>
    <div class="car-count" v-show="food.count>0">{{food.count}}</div>
    <div class="car-add icon-add_circle" @click="addfood($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addfood (event) {
      console.log('click')
      if (!this.food.count) {
//      this.food.count = 1
        setTimeout(() => {
          Vue.set(this.food, 'count', 1) // 利用vue的接口给一个对象添加一个属性，然后这个属性的变化才能被观测到
        }, 500)
      } else {
        setTimeout(() => {
          this.food.count++
        }, 500)
      }
      console.log(this.$root.eventHub)
      this.$root.eventHub.$emit('car.add', event.target)
    },
    decreaseFood (event) {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .carcontrol
    font-size:0
    .car-decrease
      display:inline-block
      padding:6px
      transition:all .4s linear
      .inner
        display:inline-block
        line-height:24px
        font-size:24px
        color:rgb(0,160,220)
        transition:all .4s linear
      &.fade-enter-active
        opacity:1
        transform:translate3d(0,0,0)
        .inner
          transform:rotate(0)
      &.fade-enter,&.fade-leave-to
        opacity:0
        transform:translate3d(24px,0,0)
        .inner
          transform:rotate(180deg)
    .car-count
      display:inline-block
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
    .car-add
      display:inline-block
      padding:6px
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
  /*.fade-enter-active, .fade-leave-active
    transition:all .5s ease*/
    /*transform:rotate(0)*/
    /*transform:rotate(180deg)
  .fade-enter, .fade-leave-to
    transform:translate3D(24px,0,0)
    opacity:0*/
 </style>
