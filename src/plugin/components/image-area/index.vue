<template>
  <div class="admin-image-area">
    <div class="component-header">
      <h3 class="title">{{ $t('bean.pageGenerator.imageHotArea') }}</h3>
    </div>
    <div class="component-body">
      <div class="panel panel-canvas" :style="panelCanvasStyle" v-loading="loading" v-if="form.image">
        <img :src="form.image" class="preview-img" @load="handleImageLoaded" @error="handleImageLoadError">
        <div class="main">
          <div class="action-map-container" ref="main" @mousedown="handleMouseDown">
            <Area
              :containerRect="containerRect"
              v-for="(item, index) in form.areas"
              :key="index"
              v-model="form.areas[index]"
              @click="handleSelect(index)"
              :active="index === activeIndex"
            />
          </div>
        </div>
      </div>
      <div class="panel panel-control">
        <AdminForm
          :columns="formColumns"
          v-model="form"
        >
          <template v-slot:action>
            <span />
          </template>
        </AdminForm>

        <el-collapse v-model="activeIndex" accordion>
          <el-collapse-item
            v-for="(item, index) in form.areas"
            :key="index"
            :title="`${$t('bean.pageGenerator.hotArea')}-${index + 1}`"
            :name="index"
          >
            <component
              :is="usePageGeneratorEvent ? 'PageGenEvent' : 'EventForm'"
              v-bind="eventProps"
              :value="item.event"
              @change="handleEventChange($event, index)"
            />
            <el-form label-width="80px">
              <el-form-item :label="$t('bean.pageGenerator.zIndex')">
                <el-input-number :min="1" :value="item.zIndex" v-model="form.areas[index].zIndex"></el-input-number>
                <div>{{ $t('bean.pageGenerator.zIndexBigOneOnTop') }}</div>
              </el-form-item>
            </el-form>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete(index)">{{ $t('bean.actionDelete') }}</el-button>
          </el-collapse-item>
        </el-collapse>

      </div>
    </div>
   <div class="component-footer">
     <el-button type="primary" @click="handleSave">{{ $t('bean.pageGenerator.save') }}</el-button>
   </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import AdminForm from '../form';
  import PageGenEvent from '../page-creator/event';
  import EventForm from '../event-form';
  import Area from './area';
  import { sleep } from '../../utils';

  const defaultValue = {
    containerWidth: 750,
    image: '',
    areas: []
  }

  @Component({
    components: {
      AdminForm,
      PageGenEvent,
      Area,
      EventForm
    }
  })
  export default class AdminImageArea extends Vue {
    @Model('change', { type: Object, default: () => defaultValue }) value;
    @Prop({ type: Object, default: () => ({}) }) eventProps;
    @Prop({ type: Boolean, default: true }) usePageGeneratorEvent;
    @Prop(Function) beforeSubmit;

    form = _.cloneDeep(defaultValue);
    activeIndex = -1;
    loading = false;
    containerRect = {};
    panelCanvasStyle = {};

    get formColumns() {
      const columns = [
        {
          prop: 'image',
          label: this.$t('bean.pageGenerator.selectImage'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ];
      const { enableModuleName } = _.get(this.$vadminConfig, 'pageGenerator', {});
      if (enableModuleName) {
        columns.unshift(
          {
            prop: 'moduleName',
            label: this.$t('bean.pageGenerator.moduleName'),
            renderCell: {
              component: 'input',
              hint: this.$t('bean.pageGenerator.moduleNameTip')
            }
          }
        )
      }
      return columns;
    }

    async handleImageLoaded(e) {
      // 先重置掉之前计算好的容器宽度样式
      this.panelCanvasStyle = {};
      await this.$nextTick();

      this.loading = true;
      const { height } = e.target;
      // 等渲染完
      await sleep(500);
      this.containerRect = this.$refs.main.getBoundingClientRect();
      const { width, height: containerH } = this.containerRect;
      // 当前图片容器宽
      let containerWidth = width;
      if (height > containerH) {
        // 修正图片容器宽
        containerWidth = Math.ceil(containerH / height * containerWidth);
      }
      this.form = {
        ...this.form,
        containerWidth: containerWidth,
        // 计算新容器宽度下的位置
        areas: (this.form.areas || []).map(item => {
          const ratio = containerWidth / this.form.containerWidth;
          return {
            ...item,
            width: ratio * item.width,
            height: ratio * item.height,
            left: ratio * item.left,
            top: ratio * item.top
          }
        })
      };
      this.panelCanvasStyle = {
        width: containerWidth + 'px'
      };
      await sleep(500);
      this.containerRect = this.$refs.main.getBoundingClientRect();
      this.loading = false;
    }

    handleImageLoadError() {
      this.form.image = '';
      this.loading = false;
    }

    handleEventChange(event, index) {
      _.set(this.form.areas, `${index}.event`, event);
    }

    handleSelect(index) {
      this.activeIndex = index;
    }

    handleDelete(index) {
      this.form.areas.splice(index, 1);
      if (index === this.activeIndex) {
        this.activeIndex = -1;
      }
    }

    handleMouseDown(e) {
      if (e.which !== 1) {
        return;
      }
      const { x: left, y: top } = e;

      const containerRect = this.containerRect;
      const boundaryPoint = {
        x: [containerRect.x, containerRect.x + containerRect.width],
        y: [containerRect.y, containerRect.y + containerRect.height]
      };

      this.form.areas.push({
        width: 0,
        height: 0,
        event: {},
        zIndex: _.get(_.last(this.form.areas), 'zIndex', 0) + 1,
        left: left - containerRect.x,
        top: top - containerRect.y,
      });

      const area = _.last(this.form.areas);

      const moveHandler = e => {
        const x = Math.min(Math.max(boundaryPoint.x[0], e.x), boundaryPoint.x[1]);
        const y = Math.min(Math.max(boundaryPoint.y[0], e.y), boundaryPoint.y[1]);
        const width = x - left;
        const height = y - top;
        const body = {
          width,
          height
        }
        if (width < 0) {
          body.left = x - containerRect.x;
          body.width = Math.abs(width);
        }
        if (height < 0) {
          body.top = y - containerRect.y;
          body.height = Math.abs(height);
        }
        Object.assign(area, body);
      }
      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        if (area.width <= 10 || area.height <= 10) {
          this.form.areas.pop();
        }
      }
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }

    async handleSave() {
      if (_.isFunction(this.beforeSubmit)) {
        await this.beforeSubmit(this.form);
      }
      this.$emit('change', this.form);
    }

    @Watch('value', { immediate: true })
    onValueChange(val) {
      this.form = _.cloneDeep(val);
    }

    @Watch('form.image')
    onImageChange(image) {
      this.form = {
        ..._.cloneDeep(defaultValue),
        image
      };
      this.activeIndex = -1;
      this.loading = true;
    }

  }
</script>
