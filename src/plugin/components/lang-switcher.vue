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
  import { Vue, Component } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class LangSwitcher extends Vue {
    get LOCALE_NAME_MAP() {
      return _.get(this.$vadminConfig, 'i18n.locales', {});
    }

    get locale() {
      return _.get(this, '$i18n.locale');
    }

    get options() {
      return _.map(this.LOCALE_NAME_MAP, (label, value) => ({
        value,
        label
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
      padding-left: 0;
    }
  }
</style>
