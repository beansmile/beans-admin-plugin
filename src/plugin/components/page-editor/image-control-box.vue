<template>
  <div class="c-image-control-box">
    <ControlBox :title="title" :visible="visible" @close="$emit('close')">
      <slot />
      <el-button class="btn-add" type="primary" @click="handleAdd">添加图片</el-button>
      <c-source-table :table="{ data: value }" :columns="columns" />
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import ControlBox from './control-box';

  @Component({
    components: {
      ControlBox
    }
  })
  export default class ImageControlBox extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) links;
    @Prop(String) title;
    @Prop(Boolean) visible;

    get columns() {
      return [
        {
          prop: 'src',
          label: '图片',
          renderCell: (h, { row, $index }) => {
            return <c-upload-form-item
              value={row.src}
              onSubmit={imageInfoArr => this.handleUpdateImage(imageInfoArr[0], $index)}
              onDelete={() => this.handleUpdateImage({ src: '', width: 0, height: 0 }, $index)}
            />
          }
        },
        {
          prop: 'link',
          label: '跳转链接',
          renderCell: (h, { row, $index }) => {
            const selectProps = {
              value: row.link,
              options: this.links,
              filterable: true,
            }
            return <c-select props={selectProps} filterable={true} clearable={true} onChange={(val) => this.handleUpdateLink(val, $index)} />
          }
        },
        {
          prop: 'action',
          label: '操作',
          extraAction: (h, { $index }) => {
            return [
              $index - 1 >= 0 && {
                title: '上移',
                handler: () => this.handleUp($index)
              },
              $index + 1 < this.value.length && {
                title: '下移',
                handler: () => this.handleDown($index)
              },
              {
                title: '移除图片',
                handler: () => this.handleDelete($index)
              }
            ]
          }
        }
      ]
    }

    syncChange() {
      this.$emit('change', this.value);
    }

    handleAdd() {
      const newImage = { src: '', link: '' }
      this.value.push(newImage);
      this.syncChange();
    }

    handleDelete($index) {
      this.value.splice($index, 1);
      this.syncChange();
    }

    handleUpdateImage(imageInfo, $index) {
      this.$set(this.value[$index], 'src', imageInfo.src);
      this.$set(this.value[$index], 'width', imageInfo.width);
      this.$set(this.value[$index], 'height', imageInfo.height);
      this.syncChange();
    }

    handleUpdateLink(link, $index) {
      this.$set(this.value[$index], 'link', link);
      this.syncChange();
    }

    handleUp($index) {
      const current = this.value.splice($index, 1)[0];
      this.value.splice($index - 1, 0, current);
      this.syncChange();
    }

    handleDown($index) {
      const current = this.value.splice($index, 1)[0];
      this.value.splice($index + 1, 0, current);
      this.syncChange();
    }

  }
</script>
