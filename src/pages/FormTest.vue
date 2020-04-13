<template>
  <div class="form_helper">
    <form
      id="formResume"
      name="formResume"
    >
      <dl>
        <dt>測試問題一</dt>
        <dd>
          <input
            id="taxIdNum"
            v-model="inputQ1"
            type="text"
            data-validate-type="required|name"
            maxlength="3"
            data-validate-name="姓名yaya"
          >
        </dd>
      </dl>
      <dl>
        <dt>Email</dt>
        <dd>
          <input
            id="taxIdNum"
            v-model="inputQ2"
            type="text"
            data-validate-type="required|email"
            maxlength="100"
          >
        </dd>
      </dl>
    </form>
    <a @click="fnFormCheck()">送出</a>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'Index',
  setup () {
    let inputQ1 = ref('name')
    let inputQ2 = ref('email')
    const fnFormCheck = () => {
      let formHelper = new FormHelper('#formResume')
      let errorMsg = formHelper.validate()
      if (errorMsg) {
        alert(errorMsg)
      }
      const data = {
        A1: inputQ1.value,
        A2: inputQ2.value
      }
      console.log('送出data===', data)
    }
    return {
      inputQ1,
      inputQ2,
      fnFormCheck
    }
  }
}
</script>

<style lang="scss">
  .form_helper {
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    font-size: 16px;
    line-height: 22px;
    dl {
      display: flex;
      align-items: center;
    }
    dt {
      flex: 0 0 100px;
    }
    dd {
      margin: 0;
      input {
        padding: 5px;
      }
    }
  }
</style>
