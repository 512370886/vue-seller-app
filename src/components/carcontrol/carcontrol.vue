<template>
  <div class="carcontrol">
    <div class="car-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
    <div class="car-count" v-show="food.count>0">{{food.count}}</div>
    <div class="car-add icon-add_circle" @click="addfood"></div>
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
    addfood () {
      console.log('click')
      if (!this.food.count) {
//      this.food.count = 1
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .carcontrol
    font-size:0
    .car-decrease, .car-add
      display:inline-block
      padding:6px
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    .car-count
      display:inline-block
    .car-add
      display:inline-block
 </style>
