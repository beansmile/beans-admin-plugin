<template>
  <el-select :value="locale" @change="handleLocaleChange" class="admin-lang-switcher">
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  const LOCALE_NAME_MAP = {
    zh: '简体中文',
    en: 'English',
  }

  @Component
  export default class LangSwitcher extends Vue {
    @Prop({ type: Object, default: () => {} }) localeNameMap;

    get locale() {
      return _.get(this, '$i18n.locale');
    }

    get getLocaleNameMap() {
      if (Object.keys(this.localeNameMap).length > 0) {
        return this.localeNameMap;
      } else {
        return LOCALE_NAME_MAP;
      }
    }

    get options() {
      console.log(this.localeNameMap, this.getLocaleNameMap)
      return _.get(this, '$i18n.availableLocales', []).map(item => ({
        value: item,
        label: this.getLocaleNameMap[item]
      }));
    }

    handleLocaleChange(locale) {
      const localeStorageKey = _.get(this.$vadminConfig, 'i18n.localeStorageKey');
      if (localeStorageKey) {
        localStorage.setItem(localeStorageKey, locale);
      }
      // this.$i18n.locale = locale;
      // 没法直接让整个vue组件更新，只能先刷新页面了
      location.reload();
    }
  }
</script>

<style lang="scss">
  .admin-lang-switcher {
    .el-input__inner {
      border: none;
      width: 100px;
    }
  }
</style>
