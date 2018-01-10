<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <!--router-view也可以像普通组件一样可以传数据，子组件通过props来接收-->
    <keep-alive>
    	<router-view :seller="seller"></router-view>
    </keep-alive>
    
  </div>
</template>

<script type="text/ecmascript-6">
import {urlParse} from 'common/js/utils'
import Header from 'components/header/header'
import Tab from 'components/tab/tab'

const ERR_NO = 0
export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$ajax.get('/api/seller?id=' + this.seller.id).then((res) => {
      res = res.data
      if (res.errno === ERR_NO) {
//      this.seller = res.data
        this.seller = Object.assign({}, this.seller, res.data) // ES6的语法，给对象扩展属性的一种方法， 在id的基础上给seller添加了其他的属性
        console.log(this.seller.id)
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  components: {
    'v-header': Header,
    Tab
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
