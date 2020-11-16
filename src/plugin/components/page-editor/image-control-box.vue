<template>
  <div class="c-image-control-box">
    <ControlBox :title="title" :visible="visible" @close="$emit('close')">
      <slot />
      <el-button class="btn-add" type="primary" @click="handleAdd">添加图片</el-button>
      <AdminTable
        :height="null"
        :value="value"
        :columns="columns"
        :actions="tableActions"
        :action-column-props="{ 'min-width': 150 }"
      />
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import ControlBox from './control-box';
  import AdminTable from '../table';
  import Upload from '../upload';

  @Component({
    components: {
      ControlBox,
      AdminTable,
      Upload
    }
  })
  export default class ImageControlBox extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) linkTypes;
    @Prop(String) title;
    @Prop(Boolean) visible;

    get columns() {
      return [
        {
          prop: 'src',
          label: '图片',
          minWidth: 70,
          renderCell: (h, { props: { value } }) => {
            if (value) {
              return <el-image style="width: 60px; height: 60px;" src={value} preview-src-list={[value]} />;
            }
            return null;
          }
        },
        {
          prop: 'link',
          label: '跳转链接',
          minWidth: 150,
          renderCell: {
            component: 'linkSelect',
            props: {
              linkTypes: this.linkTypes
            }
          }
        },
      ]
    }

    tableActions({ $index }) {
      return [
        () => <Upload type="primary" onSuccess={(image) => this.handleUpdateImage(image, $index)} />,
        $index - 1 >= 0 && (() => <el-button circle icon="el-icon-top" onClick={() => this.handleUp($index)}></el-button>),
        $index + 1 < this.value.length && (() => <el-button circle icon="el-icon-bottom" onClick={() => this.handleDown($index)}></el-button>),
        () => <el-button type="danger" circle icon="el-icon-delete" onClick={() => this.handleDelete($index)}></el-button>
      ].filter(Boolean);
    }

    syncChange() {
      this.$emit('change', this.value);
    }

    handleAdd() {
      const newImage = { src: '', link: { type: '', src: '' } }
      this.value.push(newImage);
      this.syncChange();
    }

    handleDelete($index) {
      this.value.splice($index, 1);
      this.syncChange();
    }

    handleUpdateImage(imageInfo, $index) {
      this.$set(this.value[$index], 'src', imageInfo.url);
      this.$set(this.value[$index], 'width', imageInfo.width);
      this.$set(this.value[$index], 'height', imageInfo.height);
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
