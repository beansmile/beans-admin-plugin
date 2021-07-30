<template>
  <div class="page-creator-image-area">
    <img :src="value.image" class="image" />
    <div
      class="item-area"
      v-for="(item, index) in areas"
      :key="index"
      :style="item.style"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import ImageArea from '../../image-area';

@Component({
  components: {
    ImageArea
  }
})
export default class PageCreatorImageArea extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    containerWidth: 750,
    image: 'https://via.placeholder.com/200x200/ccc',
    areas: []
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { listeners, props: { pages, popupComponents, value, visible } } = context;
      const change = (val) => {
        listeners.close && listeners.close();
        listeners.change(val);
      }
      return (
        <el-dialog fullscreen append-to-body visible={visible} onClose={listeners.close} custom-class="dialog-image-area">
          <ImageArea
            event-props={{ pages, popupComponents }}
            value={value}
            onChange={change}
          />
        </el-dialog>
      );
    }
  }

  get areas() {
    const baseW = this.pageWidth;
    const containerW = _.get(this.value, 'containerWidth');
    const ratio = baseW / containerW;
    const areas = _.get(this.value, 'areas') || [];

    return areas.map(item => {
      const body = {
        ...item,
        width: ratio * item.width,
        height: ratio * item.height,
        top: ratio * item.top,
        left: ratio * item.left
      }

      body.style = {
        width: `${body.width}px`,
        height: `${body.height}px`,
        top: `${body.top}px`,
        left: `${body.left}px`
      }
      return body;
    });
  }
}
</script>
