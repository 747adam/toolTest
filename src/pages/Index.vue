<template>
  <div class="index">
    <section>
      <div class="title">
        <h2>類目選單</h2>
      </div>
      <div class="content">
        <div
          class="el_select"
          :class="dataMajor && dataMajor[0] ? '' : 'placeholder'"
          @click="openSelect('Major', 1, dataMajor)"
        >
          {{ dataMajor && dataMajor[0] && dataMajor[0].des || '你就讀的科系' }}
        </div>
        <div
          class="el_select"
          :class="dataTool && dataTool[0] ? '' : 'placeholder'"
          @click="openSelect('Tool', 1, dataTool)"
        >
          {{ dataTool && dataTool[0] && dataTool[0].des || '工具' }}
        </div>
        <div
          class="el_select"
          :class="dataAbil && dataAbil[0] ? '' : 'placeholder'"
          @click.self="openSelect('Abil', 3, dataAbil)"
        >
          {{ dataAbil && dataAbil[0] && dataAbil[0].des ? '' : '技能類別（最多三組）' }}
          <span
            v-for="(item, index) in dataAbil"
            v-show="dataAbil && dataAbil[0]"
            :key="index"
          >
            {{ item.des }}
            <a @click.stop="delItem(dataAbil, item.no)" />
          </span>
        </div>
        <div
          class="el_select area"
          :class="dataArea && dataArea[0] ? '' : 'placeholder'"
          @click="openSelect('Area', 1, dataArea)"
        >
          {{ dataArea && dataArea[0] && dataArea[0].des || '選擇地區' }}
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
          class="el_select"
          :class="dataTest && dataTest[0] ? '' : 'placeholder'"
          @click="openSelect('https://747adam.github.io/menuTest/dist/json/testJson.json', 1, dataTest)"
        >
          {{ dataTest && dataTest[0] && dataTest[0].des || '你的夢想職業（選填)' }}
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
export default {
  name: 'Index',
  setup () {
    let ww = ref(0)
    let dataMajor = ref(null)
    let dataAbil = ref(null)
    let dataTool = ref(null)
    let dataArea = ref(null)
    let dataTest = ref(null)
    const handleCallback = (e) => {
      switch (e.type) {
        case 'close':
          break
      }
      if (e.payload.dataSource === 'Major') {
        dataMajor.value = e.selectedItems || null
      } else if (e.payload.dataSource === 'Abil') {
        dataAbil.value = e.selectedItems || null
      } else if (e.payload.dataSource === 'Tool') {
        dataTool.value = e.selectedItems || null
      } else if (e.payload.dataSource === 'Area') {
        dataArea.value = e.selectedItems || null
      } else {
        dataTest.value = e.selectedItems || null
      }
    }
    const openSelect = (type, max, selected) => {
      if (type === 'Area') {
        const element = document.getElementById('body')
        element.classList.add('area')
      } else {
        const element = document.getElementById('body')
        element.classList.remove('area')
      }
      window.categoryPicker.open({
        onSubmit: handleCallback,
        dataSource: type,
        // 已選
        selectedItems: selected || null,
        theme: 'customer-theme',
        maxSelectedNumber: max || 1,
        backdropClose: true,
        recommendation: false,
        whitelist: type === 'Area' ? '600[1]{1}' : '',
        unselectableList: selected === dataTest ? '[0-9]{7}000' : ''
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
      openSelect,
      // openArea,
      delItem
    }
  }
}
</script>

<style lang="scss">
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

.el_select {
  position: relative;
  display: block;
  margin: 0 auto 20px;
  padding: 10px 26px 10px 10px;
  width: 300px;
  font-size: 14px;
  color: #292929;
  background-color: #f3f3f3;
  border: solid 1px #eeeeee;
  border-radius: 4px;
  line-height: 16px;
  cursor: pointer;
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
  }
  &.placeholder {
    color: #a9a9a9;
  }
  span {
    display: inline-flex;
    align-items: center;
    margin: 2px;
    padding: 4px 10px;
    color: #ffffff;
    background: #39c8d0;
    border-radius: 15px;
    cursor: default;
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
        content: '';
        transition: background-color .3s;
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
