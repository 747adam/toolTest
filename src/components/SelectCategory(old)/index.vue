<script>
import { ref, computed, onMounted, onBeforeUnmount } from '@vue/composition-api'
export default {
  name: 'SelectCategory',
  props: {
    type: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      default: 1
    },
    whitelist: {
      type: String,
      default: ''
    },
    blacklist: {
      type: String,
      default: ''
    },
    unselectableList: {
      type: String,
      default: ''
    },
    singleleve: {
      type: Boolean,
      default: false
    },
    defaultText: {
      type: String,
      default: '請選擇'
    }
  },
  setup (props, context) {
    let ww = ref(0)
    let selected = ref(null)
    const handleCallback = (e) => {
      selected.value = e.selectedItems || null
      emitData()
    }
    const closeLOne = computed(() => {
      const elBody = document.getElementById('body')
      if (props.singleleve) {
        elBody.classList.add('close_select_LOne')
      } else {
        elBody.classList.remove('close_select_LOne')
      }
    })
    const openSelect = (type, max, selected, unselectableList) => {
      closeLOne()
      window.categoryPicker.open({
        onSubmit: handleCallback,
        dataSource: props.type,
        selectedItems: selected || null,
        theme: 'customer-theme',
        maxSelectedNumber: props.max,
        backdropClose: true,
        recommendation: false,
        whitelist: props.whitelist,
        blacklist: props.whitelist,
        unselectableList: props.unselectableList
      })
    }
    const delItem = (dataName, no) => {
      const delIndex = dataName.findIndex(dataName => dataName.no === no)
      dataName.splice(delIndex, 1)
    }
    const resizeWidth = () => {
      ww.value = document.body.offsetWidth
      window.categoryPicker.close()
    }
    const emitData = () => {
      context.emit('emitSelect', selected.value || null)
    }
    onMounted(() => {
      window.addEventListener('resize', resizeWidth)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeWidth)
    })
    return {
      ww,
      selected,
      openSelect,
      delItem,
      emitData
    }
  }
}
</script>

<template src="./template.html" />
<style src="./style.scss" lang="scss" />
