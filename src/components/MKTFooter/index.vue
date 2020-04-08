<script>
export default {
  name: 'MKTFooter',
  props: {
    company: { type: String, required: true },
    phone: { type: String, default: '' },
    email: { type: String, default: '' }
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<template src="./template.html" />

<style src="./style.scss" lang="scss" />
