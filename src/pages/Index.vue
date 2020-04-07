<template>
  <div class="index">
    <!-- <a
      class="el_select"
      @click="openSelect('Major')"
    >
      {{ majorData && majorData.des || '你就讀的科系' }}
    </a>
    <a
      class="el_select"
      @click="openSelect('Abil', 3)"
    >
      你擅長的活動（最多三組）
    </a> -->
    <a
      class="el_select"
      @click="openSelect('JobCat')"
    >
      {{ testData && testData.des || '你的夢想職業（選填)' }}
    </a>
  </div>
</template>
<script>
import testJson from '~/store/api/testJson.json'
import { ref } from '@vue/composition-api'
export default {
  name: 'Index',
  setup (context) {
    let majorData = ref(null)
    let abilData = ref(null)
    let JobCatData = ref(null)
    let testData = ref(null)
    const handleCallback = e => {
      console.log(e)
      if (e.payload.dataSource === 'Major') {
        majorData.value = e.selectedItems[0]
      } else if (e.payload.dataSource === 'Abil') {
        abilData.value = e.selectedItems
      } else if (e.payload.dataSource === 'JobCat') {
        JobCatData.value = e.selectedItems[0]
      } else {
        testData.value = e.selectedItems[0]
      }
    }
    const openSelect = (type, max) => {
      console.log(testJson)
      window.categoryPicker.open({
        onSubmit: handleCallback,
        // 資料類型或來源
        dataSource: 'https://747adam.github.io/menuTest/dist/json/testJson.json',
        // 類目選單主題樣式
        theme: 'customer-theme',
        // 最大可選數量
        maxSelectedNumber: max || 1,
        // 點選 lightbox 外部範圍可快速關閉
        backdropClose: true,
        // 推薦區塊是否顯示
        recommendation: false
      })
    }
    return {
      majorData,
      abilData,
      JobCatData,
      testData,
      openSelect
    }
  }
}
</script>

<style>
.index {
  padding: 50px 0;
}

.el_select {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 30px 10px 10px;
  width: 300px;
  font-size: 16px;
  color: #292929;
  background-color: #f3f3f3;
  border: solid 1px #eeeeee;
  border-radius: 4px;
  line-height: 22px;
  cursor: pointer;
}</style>
