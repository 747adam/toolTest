<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
extend('required', {
  ...required,
  message: '{_field_}為必選欄位'
})
export default {
  name: 'SelectCategory',
  components: {
    ValidationProvider
  },
  props: {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 1
    },
    // 只顯示類目代碼
    whitelist: {
      type: String,
      default: ''
    },
    // 隱藏類目代碼
    blacklist: {
      type: String,
      default: ''
    },
    // 隱藏類目代碼 CheckBox
    unselectablelist: {
      type: String,
      default: ''
    },
    // 隱藏大類
    singleleve: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    let ww = ref(0)
    let selected = ref(null)
    const handleCallback = e => {
      selected.value = e.selectedItems || null
      emitData()
    }
    const openSelect = () => {
      closeLOne()
      window.categoryPicker.open({
        onSubmit: handleCallback,
        dataSource: props.type,
        selectedItems: selected.value || null,
        theme: 'customer-theme',
        maxSelectedNumber: props.max,
        backdropClose: true,
        recommendation: false,
        whitelist: props.whitelist,
        blacklist: props.blacklist,
        unselectableList: props.unselectablelist
      })
      if (ww.value < 690 && props.singleleve) clickSelectItem()
    }
    const closeLOne = () => {
      if (props.singleleve) {
        document.querySelector('body').classList.add('close_select_LOne')
        // context.emit('emitChangeBodyClass', 'close_select_LOne')
      } else {
        // context.emit('emitChangeBodyClass', '')
        document.querySelector('body').classList.remove('close_select_LOne')
      }
    }
    const clickSelectItem = () => {
      if (document.querySelector('.category-item')) {
        document.querySelector('.category-item').click()
      } else {
        requestAnimationFrame(clickSelectItem)
      }
      // context.root.$nextTick(() => {
      //   if (document.querySelector('.category-item')) {
      //     document.querySelector('.category-item').click()
      //     console.log('XXXXXXXX')
      //   } else {
      //     setTimeout(() => {
      //       console.log('elseXXXXX')
      //       clickSelectItem()
      //     }, 100)
      //   }
      // })
      // if (document.querySelector('.category-item')) {
      //   document.querySelector('.category-item').click()
      //   console.log('XXXXXXXX')
      // } else {
      //   setTimeout(() => {
      //     console.log('elseXXXXX')
      //     clickSelectItem()
      //   }, 100)
      // }
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
      clickSelectItem,
      delItem,
      emitData
    }
  }
}
</script>

<template src="./template.html" />
<style src="./style.scss" lang="scss" />
