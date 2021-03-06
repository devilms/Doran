<template>
  <div
    v-click-outside="handlerClickOutside"
    @mouseenter="handlerMouseenter"
    @mouseleave="handlerMouseleave"
    @contextmenu.prevent="handlerRightClick"
    :class="classes">
    <div
      @click="handlerClick"
      ref="reference"
      class="dr-dropdown-link">
      <slot></slot>
    </div>
    <transition
      @before-leave="beforeTransition"
      @before-enter="beforeTransition"
      @after-leave="afterTransition"
      @after-enter="afterTransition"
      name="select-suggestion"
      appear>
      <!--  v-show是为了和transition配合生成显示和隐藏时的动画  visible是告诉popper配合transfer控制该怎么渲染 -->
      <dr-popper
        @mouseenter.native="handlerMouseenter"
        @mouseleave.native="handlerMouseleave"
        :transfer="transfer"
        :placement="placement"
        ref="popper"
        v-show="isVisible || (visible && trigger === 'custom')"
        :visible="isVisible || (visible && trigger === 'custom')">
        <slot name="dropdown"></slot>
      </dr-popper>
    </transition>
  </div>
</template>

<script>
import DrPopper from '@/base/popper';

import emitter from '@/mixins/emitter';
import { validValue } from '@/utils/validate';
import { directive as clickOutside } from 'v-click-outside-x'; // 点击dom外部时

const drPreFixDrondown = 'dr-dropdown';

export default {
  name: 'DrDropdown',
  mixins: [emitter],
  directives: {
    clickOutside
  },
  props: {
    placement: {
      validator (value) {
        return validValue(value, ['top', 'bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']);
      },
      default: 'bottom-start'
    },
    trigger: {
      validator (value) {
        return validValue(value, ['hover', 'click', 'contextMenu', 'custom']);
      },
      default: 'hover'
    },
    transfer: {
      type: Boolean,
      default() {
        return !!this.$DORAN.transfer
      }
    },
    visible: Boolean
  },
  data() {
    return {
      togglePopperFlag: true,
      isVisible: false,
      timeOut: undefined
    };
  },
  components: {
    DrPopper
  },
  computed: {
    classes() {
      return [
        `${drPreFixDrondown}-default`,
        {}
      ];
    }
  },
  methods: {
    handlerClick(e) {
      if (this.trigger !== 'click') {
        return;
      };
      if (this.togglePopperFlag) {
        this.isVisible = !this.isVisible;
      };
    },
    handlerClickOutside() {
      if (this.trigger !== 'custom') {
        this.isVisible = false;
      };
    },
    beforeTransition() {
      this.togglePopperFlag = false;
    },
    afterTransition() {
      this.togglePopperFlag = true;
    },
    handlerMouseenter() {
      if (this.trigger !== 'hover') {
        return;
      };
      // 延迟出现，防止鼠标快速hover时的显示bug
      // 移入或者移出的时候互相清除对方内部的计时器，执行自己内部的计时器
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.isVisible = true;
      }, 251);
    },
    handlerMouseleave() {
      if (this.trigger !== 'hover') {
        return;
      };
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.isVisible = false;
      }, 150);
    },
    handlerRightClick() { // 右键click
      if (this.trigger === 'contextMenu') {
        if (this.togglePopperFlag) {
          this.isVisible = !this.isVisible;
        };
      }
    },
    itemClick(name) {
      this.$emit('clickChange', name);
    }
  },
  watch: {
    isVisible(newValue) {
      this.$emit('visibleChange', newValue);
      this.$nextTick(() => {
        this.broadcast('DrPopper', newValue ? 'onUpdatePopper' : 'onDestoryPopper');
      })
    },
    visible(newValue) {
      this.isVisible = newValue;
    }
  },
  beforeDestroy() {
    this.broadcast('DrPopper', 'onDestoryPopper');
    this.$refs.popper.removeChild(); // 销毁时移除popper的dom元素
  }
};
</script>
