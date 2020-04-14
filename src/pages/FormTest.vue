<template>
  <div class="index">
    <form
      id="formResume"
      name="formResume"
    >
      <section>
        <div class="title">
          <h2>類目選單2</h2>
          <p>FormHelper</p>
        </div>
        <div class="content">
          <div
            class="wrap_category_multiple"
            @click="openSelect('Major', 3, dataMajor)"
          >
            <input
              v-show="dataMajor && !dataMajor.length"
              class="el_select"
              :value="dataMajor && dataMajor[0] && dataMajor[0].des || ''"
              type="text"
              placeholder="請選擇工具"
              data-validate-type="required"
              data-validate-name="工具"
            >
            <div
              v-show="dataMajor && dataMajor.length"
              class="list"
            >
              <span
                v-for="(item, index) in dataMajor"
                :key="index"
              >
                {{ item.des }}
                <a @click.stop="delItem(dataMajor, item.no)" />
              </span>
            </div>
          </div>
          <div
            class="wrap_category"
            @click="openSelect('Area', 1, dataArea, '[0-9]{7}000')"
          >
            <input
              class="el_select"
              :value="dataArea && dataArea[0] && dataArea[0].des || ''"
              type="text"
              placeholder="請選擇地區"
              data-validate-type="required"
              data-validate-name="地區"
            >
          </div>
        </div>
      </section>
      <section>
        <div class="title">
          <h2>自訂類目選單</h2>
          <p>json檔存於個人githoub</p>
        </div>
        <div class="content">
          <div
            class="wrap_category"
            @click="openSelect( 'https://747adam.github.io/menuTest/dist/json/testJson.json', 1, dataTest, '[0-9]{7}000')"
          >
            <input
              class="el_select"
              :value="dataTest && dataTest[0] && dataTest[0].des || ''"
              type="text"
              placeholder="你的夢想職業（選填)"
              data-validate-type="required"
              data-validate-name="夢想職業"
            >
          </div>
        </div>
      </section>
      <div class="wrap_btn">
        <a
          class="btn_set"
          @click="fnFormCheck"
        >
          送出
        </a>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'

export default {
  name: 'FormTest',
  setup () {
    let ww = ref(0)
    let dataMajor = ref([])
    let dataArea = ref([])
    let dataTest = ref([])
    const mapObj = ref({
      'Major': dataMajor,
      'Area': dataArea,
      'https://747adam.github.io/menuTest/dist/json/testJson.json': dataTest
    })
    const handleCallback = (e) => {
      const objName = e.payload.dataSource
      mapObj.value[objName] = e.selectedItems || null
    }
    const openSelect = (type, max, selected, unselectableList) => {
      const elBody = document.getElementById('body')
      if (type === 'Area') {
        elBody.classList.add('area')
      } else {
        elBody.classList.remove('area')
      }
      window.categoryPicker.open({
        onSubmit: handleCallback,
        dataSource: type,
        selectedItems: selected || null,
        theme: 'customer-theme',
        maxSelectedNumber: max || 1,
        backdropClose: true,
        recommendation: false,
        whitelist: type === 'Area' ? '600[1]{1}' : '',
        unselectableList: unselectableList || ''
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
    const fnFormCheck = () => {
      let formHelper = new FormHelper('#formResume')
      let errorMsg = formHelper.validate()
      if (errorMsg) {
        alert(errorMsg)
      } else {
        alert('成功送出')
      }
    }
    onMounted(() => {
      window.addEventListener('resize', resizeWidth)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeWidth)
    })
    return {
      ww,
      dataMajor,
      dataArea,
      dataTest,
      mapObj,
      openSelect,
      delItem,
      fnFormCheck
    }
  }
}
</script>
