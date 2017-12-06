<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from 'components/header/header'
import Tab from 'components/tab/tab'

const ERR_NO = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$ajax.get('/api/seller').then((res) => {
      res = res.data
      if (res.errno === ERR_NO) {
        this.seller = res.data
        console.log(this.seller)
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
