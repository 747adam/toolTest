<template>
  <div class="gtm_test">
    <h1>GTM Test</h1>
    <button
      :data-gtm-cancel="cancelTime"
      @click="cancel"
    >
      SET GTM {{ timer }}
    </button>
    <p>now is {{ cancelTime }}</p>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
export default {
  name: 'GtmTest',
  components: {
  },
  setup () {
    let cancelTime = ref('')
    let timer = ref(0)
    const countdown = () => {
      window.dataLayer = window.dataLayer || []
      timer.value = 60
      cancelTime.value = '60-50s'
      setInterval(() => {
        if (timer.value > 0) {
          timer.value -= 1
          switch (timer.value) {
            case 50:
              cancelTime.value = '50-40s'
              break
            case 40:
              cancelTime.value = '40-20s'
              break
            case 20:
              cancelTime.value = '20-0s'
              break
            default:
              break
          }
        }
      }, 1000)
    }
    const cancel = () => {
      if (confirm('你確定要取消健診?')) {
        window.dataLayer.push({ event: 'custom-event', eventAction: '確認取消健檢', eventLabel: '確定' })
        console.log('yes', window.dataLayer)
      } else {
        window.dataLayer.push({ event: 'custom-event', eventAction: '確認取消健檢', eventLabel: '取消' })
        console.log('no', window.dataLayer)
      }
    }
    onMounted(() => {
      countdown()
    })
    onBeforeUnmount(() => {
      countdown()
    })
    return {
      cancelTime,
      timer,
      cancel,
      countdown
    }
  }
}
</script>

<style lang="scss">
.gtm_test {
  margin: 0 auto;
  padding: 40px 0;
  width: 600px;
  text-align: center;
  h1 {
    margin-bottom: 30px;
  }
  button {
    padding: 5px 20px;
    font-size: 16px;
    border: 1px solid #777;
    border-radius: 5px;
  }
}
</style>
