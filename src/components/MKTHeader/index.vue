<script>
export default {
  name: 'MKTHeader',
  props: {
    menu: {
      type: Array,
      default: () => { return [] }
    },
    company: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted () {
    window.addEventListener('resize', this.resizeHandler)
  },
  methods: {
    openMenu () {
      this.active = !this.active
    },
    resizeHandler () {
      this.active = false
    }
  }
}
</script>

<template src="./template.html" />
<style src="./style.scss" lang="scss" />
