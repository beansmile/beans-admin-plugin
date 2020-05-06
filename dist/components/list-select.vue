<template>
  <div class="c-list-select">
    <el-form
      inline
      @submit.native.prevent="handleSearch"
      v-if="filterColumns.length"
      class="form-filter"
    >
      <c-source-form-item
        v-for="column in filterColumns"
        :key="column.prop"
        :column="column"
        v-model="params"
      />
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">{{ $t('查询') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="panel-container">
      <div class="box-panel">
        <div class="panel-header">
          <span>已选择
            <template v-if="sort">
            （拖拽排序）
            </template>
          </span>
          <span class="num">{{ value.length }}</span>
        </div>
        <component
          :is="sort ? 'draggable' : 'div'"
          :value="value"
          class="panel-content"
          @end="handleDragChange"
          v-if="value.length"
        >
          <div
            class="list-item"
            v-for="(item, index) in value"
            :key="item[trackBy]"
          >
            <div class="item-label">
              <template v-if="renderLabel">
                <v-node :render-node="(h) => renderLabel(h, { item, index, penel: 'left' })" />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <el-button icon="el-icon-close" circle @click="handleCancelSelect(index)"></el-button>
          </div>
        </component>
        <div class="empty" v-else>已选择为空</div>
      </div>
      <div class="box-panel">
        <div class="panel-header">
          <span>列表</span>
          <span class="num">{{ renderList.length }}</span>
        </div>
        <div class="panel-content" v-if="renderList.length" v-loading="loading">
          <div
            class="list-item"
            v-for="(item, index) in renderList"
            :key="item[trackBy]"
          >
            <div class="item-label">
              <template v-if="renderLabel">
                <v-node :render-node="(h) => renderLabel(h, { item, index, penel: 'right' })" />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <el-button icon="el-icon-check" circle @click="handleSelect(item)"></el-button>
          </div>
        </div>
        <div class="empty" v-else>没有可选择项</div>
      </div>
    </div>
  </div>
</template>

<script>import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { arrayMove } from "../utils"; // TODO i18n

var ListSelect = (_dec = Component({
  components: {
    draggable: draggable
  }
}), _dec2 = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: String,
  default: 'id'
}), _dec4 = Prop({
  type: String,
  default: 'label'
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Prop({
  type: Function
}), _dec7 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec8 = Prop({
  type: Function,
  default: function _default() {
    return [];
  }
}), _dec9 = Prop({
  type: Function
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ListSelect, _Vue);

  function ListSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "trackBy", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "label", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sort", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "renderLabel", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filterColumns", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "onFilter", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "onLoad", _descriptor8, _assertThisInitialized(_this));

    _this.loading = false;
    _this.data = [];
    _this.params = {};
    return _this;
  }

  _createClass(ListSelect, [{
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.onLoad) {
                  _context.next = 9;
                  break;
                }

                this.loading = true;
                _context.prev = 2;
                _context.next = 5;
                return this.onLoad();

              case 5:
                this.data = _context.sent;

              case 6:
                _context.prev = 6;
                this.loading = false;
                return _context.finish(6);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2,, 6, 9]]);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "handleSelect",
    value: function handleSelect(item) {
      this.$emit('change', [item].concat(this.value));
    }
  }, {
    key: "handleCancelSelect",
    value: function handleCancelSelect(index) {
      var value = JSON.parse(JSON.stringify(this.value));
      value.splice(index, 1);
      this.$emit('change', value);
    }
  }, {
    key: "handleDragChange",
    value: function handleDragChange(_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }
  }, {
    key: "handleSearch",
    value: function () {
      var _handleSearch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (!this.onFilter) {
                  _context2.next = 11;
                  break;
                }

                this.loading = true;
                _context2.prev = 4;
                _context2.next = 7;
                return this.onFilter(JSON.parse(JSON.stringify(this.params)));

              case 7:
                this.data = _context2.sent;

              case 8:
                _context2.prev = 8;
                this.loading = false;
                return _context2.finish(8);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4,, 8, 11]]);
      }));

      function handleSearch() {
        return _handleSearch.apply(this, arguments);
      }

      return handleSearch;
    }()
  }, {
    key: "valueTrackByValues",
    get: function get() {
      var _this2 = this;

      return this.value.map(function (item) {
        return item[_this2.trackBy];
      });
    }
  }, {
    key: "renderList",
    get: function get() {
      var _this3 = this;

      return this.data.filter(function (item) {
        return !_this3.valueTrackByValues.includes(item[_this3.trackBy]);
      });
    }
  }]);

  return ListSelect;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "trackBy", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sort", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "renderLabel", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "filterColumns", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "onFilter", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "onLoad", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ListSelect as default };</script>
