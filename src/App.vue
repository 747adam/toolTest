<template>
  <div id="app">
    <MKTHeader
      :company="company"
      :menu="menu"
    />
    <router-view />
    <MKTFooter
      :company="company"
      :phone="phone"
      :email="email"
    />
  </div>
</template>
<script>
import MKTHeader from '~/components/MKTHeader'
import MKTFooter from '~/components/MKTFooter'
export default {
  components: {
    MKTHeader,
    MKTFooter
  },
  data () {
    return {
      company: '類目選單測試',
      phone: '123456789',
      email: 'adam.lai@104.com.tw',
      menu: [
        {
          href: '/index.html',
          title: 'vee-validate'
        },
        {
          href: '/formTest.html',
          title: 'FormHelper'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  @import '~@/assets/style/main';

  #app {
    padding-top: 115px;
  }
</style>
