<template>
  <el-form inline>
    <el-form-item :label="$t('bean.folder')">
      <SelectFolder
        @change="handleFolderChange"
      />
    </el-form-item>
    <el-form-item>
      <el-input v-model.trim="folderName" :placeholder="$t('bean.actionNew')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
        :loading="createLoading"
        :disabled="!folderName"
      >{{ $t('bean.actionNew') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator'
  import SelectFolder from '../select-folder'
  import { foldersStore } from '../../stores'
  import _ from 'lodash'

  @Component({
    components: {
      SelectFolder,
    }
  })
  export default class Folders extends Vue {
    folderName = ''
    createLoading = false
    dirPath = []

    get parentId() {
      return this.dirPath[this.dirPath.length - 1]
    }

    async onSubmit() {
      try {
        this.createLoading = true;
        await foldersStore.createFolder(_.pick(this, ['parentId', 'folderName', 'dirPath']))
        this.folderName = ''
      } finally {
        this.createLoading = false
      }
    }

    handleFolderChange(e) {
      this.dirPath = e
      this.$emit('folder-change', e)
    }
  }
</script>

<style lang="scss" scoped>
</style>
