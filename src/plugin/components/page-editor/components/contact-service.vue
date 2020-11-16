<template>
  <div class="c-contact-service">
    <template v-for="(item, index) in value.data">
      <img class="image" :key="index" :src="item.src" v-if="item.src" />
    </template>

    <ControlBox title="客服" :visible="showController" @close="$emit('close')">

      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item label="需要复制的客服名字">
          <el-input v-model="value.config.text" @change="syncChange" placeholder="默认直接联系小程序客服"/>
        </el-form-item>
      </el-form>

      <Upload
        @success="handleSubmit"
      />
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ControlBox from '../control-box';
  import Upload from '../../upload';

  @Component({
    components: {
      ControlBox,
      Upload
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

    mounted() {
      this.syncChange();
    }

    syncChange() {
      this.$emit('change', this.value);
    }

    handleSubmit(image) {
      this.$set(this.value, 'data', [{ ...image, src: image.url }]);
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
