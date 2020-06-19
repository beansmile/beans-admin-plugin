<template>
  <div class="c-contact-service">
    <template v-for="(item, index) in value.data">
      <img class="image" :key="index" :src="item.src" v-if="item.src" />
    </template>

    <ControlBox :title="$t('pageEditor.客服')" :visible="showController" @close="$emit('close')">

      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.需要复制的客服名字')">
          <el-input v-model="value.config.text" @change="syncChange" :placeholder="$t('pageEditor.默认直接联系小程序客服')"/>
        </el-form-item>
      </el-form>

      <c-source-table :table="{ data: value.data }" :columns="columns" class="source-table"/>
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ControlBox from '../control-box';

  @Component({
    components: {
      ControlBox
    }
  })
  export default class ContactService extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [
        {
          src: ''
        }
      ],
      config: {
        text: ''
      }
    }) }) value;
    @Prop(Boolean) showController;

    get columns() {
      return [
        {
          prop: 'src',
          label: this.$t('pageEditor.图片'),
          renderCell: (h, { row }) => {
            return <c-upload-form-item value={ row.src } onChange={ imageUrl => this.handleSubmit(imageUrl) } />
          }
        }
      ];
    }

    mounted() {
      this.syncChange();
    }

    syncChange() {
      this.$emit('change', this.value);
    }

    handleSubmit(imageUrl) {
      this.$set(this.value.data[0], 'src', imageUrl);
      this.syncChange();
    }

  }
</script>

<style scoped>
  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
    vertical-align: top;
  }

  .source-table .img {
    width: 100%;
    height: auto;
  }
</style>
