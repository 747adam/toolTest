<template>
  <div class="index">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <section>
          <div class="title">
            <h2>類目選單</h2>
          </div>
          <div class="content">
            <div
              class="wrap_select multiple"
              @click="openSelect('Major', 3, dataMajor)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="工具"
              >
                <input
                  v-show="dataMajor && !dataMajor.length"
                  class="el_select"
                  :value="dataMajor && dataMajor[0] && dataMajor[0].des"
                  type="text"
                  placeholder="請選擇工具"
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
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div
              class="wrap_select"
              @click="openSelect('Area', 1, dataArea, '[0-9]{7}000')"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="地區"
              >
                <input
                  class="el_select"
                  :value="dataArea && dataArea[0] && dataArea[0].des"
                  type="text"
                  placeholder="請選擇地區"
                >
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
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
              class="wrap_select"
              @click="openSelect( 'https://747adam.github.io/menuTest/dist/json/testJson.json', 1, dataTest, '[0-9]{7}000')"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="夢想職業"
              >
                <input
                  class="el_select"
                  :value="dataTest && dataTest[0] && dataTest[0].des"
                  type="text"
                  placeholder="你的夢想職業（選填)"
                >
                <div class="error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
          </div>
        </section>
        <div class="wrap_btn">
          <button
            class="btn_set"
            type="submit"
          >
            送出
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
extend('required', {
  ...required,
  message: '{_field_}為必選欄位'
})
export default {
  name: 'Index',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  setup () {
    let ww = ref(0)
    let dataMajor = ref([])
    let dataAbil = ref([])
    let dataTool = ref([])
    let dataArea = ref([])
    let dataTest = ref([])
    const mapObj = ref({
      'Major': dataMajor,
      'Abil': dataAbil,
      'Tool': dataTool,
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
    const onSubmit = () => {
      alert('表單驗證成功')
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
      dataAbil,
      dataArea,
      dataTool,
      dataTest,
      mapObj,
      openSelect,
      delItem,
      onSubmit
    }
  }
}
</script>

<style lang="scss">
::placeholder {
  color: #a4a4a4;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #a4a4a4;
}

.index {
  display: flex;
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  max-width: 980px;
  flex-direction: column;
}

section {
  margin-bottom: 20px;
}

h2 , p {
  text-align: center;
}

h2 {
  font-size: 24px;
  line-height: 30px;
}

p {
  font-size: 16px;
  line-height: 20px;
}

.title {
  margin-bottom: 20px;
}

.wrap_select {
  position: relative;
  margin: 0 auto 30px;
  width: 300px;
  font-size: 14px;
  line-height: 18px;
  color: #292929;
  background-color: #f3f3f3;
  border: solid 1px #eeeeee;
  border-radius: 4px;
  &:before {
    position: absolute;
    top: 50%;
    right: 10px;
    display: block;
    width: 8px;
    height: 8px;
    content: '';
    border-right: 1px solid #a9a9a9;
    border-bottom: 1px solid #a9a9a9;
    transform: rotate(45deg) translate(-50%, -50%);
    pointer-events: none;
  }
  .error {
    position: absolute;
    top: 45px;
    left: 10px;
    font-size: 12px;
    color: #ce0000;
    line-height: 14px;
  }
  .list {
    display: none;
  }
  &.multiple .list {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 5px;
    pointer-events: none;
    span {
      display: inline-flex;
      margin: 2px;
      padding: 4px 10px;
      color: #ffffff;
      background: #39c8d0;
      border-radius: 15px;
      pointer-events: auto;
    }
    a , a:after {
      display: flex;
      width: 12px;
      height: 12px;
      cursor: pointer;
      flex-direction: column;
    }
    a {
      position: relative;
      display: inline-block;
      margin-left: 4px;
      width: 16px;
      height: 16px;
      &:before , &:after {
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -1px;
        width: 100%;
        height: 2px;
        background-color: #ffffff;
        border-radius: 1px;
        transition: background-color .3s;
        content: '';
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
      &:hover {
        &:before , &:after {
          background-color: #c5e2e4;
        }
      }
    }
  }
}

.el_select {
  padding: 12px 26px 12px 10px;
  width: 100%;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  caret-color: transparent;
}

.wrap_btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.btn_set {
  padding: 10px 20px;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background: #ff9100;
  border-radius: 4px;
  line-clamp: 24px;
  cursor: pointer;
}

body.area {
  .category-picker .category-picker__level-one {
    display: none;
  }
  .category-picker__second-floor {
    width: 100%;
  }
}
@media (max-width: 768px) {
  body.area {
    .category-picker .category-picker__level-one {
      display: block;
    }
  }
}
</style>
