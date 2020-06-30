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
          <SelectCategory
            :type="'Major'"
            :name="'工具'"
            :max="1"
            :rules="'required'"
            @emitSelect="emitMajor"
          />
        </div>
      </section>
      <section>
        <div class="title">
          <h2>自訂類目選單</h2>
          <p>json檔存於個人githoub</p>
        </div>
        <div class="content">
          <SelectCategory
            :type="'https://747adam.github.io/menuTest/dist/json/testJson.json'"
            :name="'你的夢想職業'"
            :max="3"
            :rules="'required'"
            @emitSelect="emitTest"
          />
        </div>
      </section>
      <section>
        <div class="title">
          <h2>select改樣式</h2>
        </div>
        <div class="content">
          <h3>橘色 單選</h3>
          <ElSelect
            :select-list="selectList"
            :limit="5"
            @emitSelected="emitSelected"
          />
          <h3>藍色 復選</h3>
          <ElSelect
            :select-list="selectList"
            :limit="5"
            :color="'blue'"
            :multiple="true"
            @emitSelected="emitSelected"
          />
          <p>{{ dataSelect }}</p>
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
import SelectCategory from '~/components/SelectCategory'
import ElSelect from '@/components/ElSelect.vue'
export default {
  name: 'FormTest',
  components: {
    SelectCategory,
    ElSelect
  },
  setup (props, context) {
    let ww = ref(0)
    let selectList = ref([
      {
        value: 'a1',
        text: '選項1'
      },
      {
        value: 'a2',
        text: '選項2'
      },
      {
        value: 'a3',
        text: '選項3'
      },
      {
        value: 'a4',
        text: '選項4'
      },
      {
        value: 'a5',
        text: '選項5'
      },
      {
        value: 'a6',
        text: '選項6'
      },
      {
        value: 'a7',
        text: '選項7'
      }
    ])
    const dataMajor = ref([])
    let dataTest = ref([])
    let dataSelect = ref(null)
    const mapObj = ref({
      'Major': dataMajor,
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
    const emitMajor = data => {
      dataMajor.value = data
    }
    const emitTest = data => {
      dataTest.value = data
    }
    const emitSelected = data => {
      dataSelect.value = data
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
      selectList,
      dataMajor,
      dataTest,
      dataSelect,
      mapObj,
      openSelect,
      delItem,
      emitMajor,
      emitTest,
      emitSelected,
      fnFormCheck
    }
  }
}
</script>
<style lang="scss">
  h3 {
    margin: 10px 0;
    text-align: center;
  }
</style>
