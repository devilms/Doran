import DrButton from './components/button';
import DrIcon from './components/icon';
import DrButtonGroup from './components/button-group';
import DrCollapse from './components/collapse';
import DrCollapseItem from './components/collapse-item';
import DrRadio from './components/radio';
import DrRadioGroup from './components/radio-group';
import DrCheckbox from './components/checkbox';
import DrCheckboxGroup from './components/checkbox-group';

const DoranComponents = [
  DrButton,
  DrButtonGroup,
  DrIcon,
  DrCollapse,
  DrCollapseItem,
  DrRadio,
  DrRadioGroup,
  DrCheckbox,
  DrCheckboxGroup
];

const install = function (Vue, opt = {}) {
  DoranComponents.forEach(component => {
    Vue.component(component.name, component);
  });
};

typeof window !== 'undefined' && window.Vue && install(window.Vue);

export default {
  install,
  DrButton,
  DrButtonGroup,
  DrIcon,
  DrCollapse,
  DrCollapseItem,
  DrRadio,
  DrRadioGroup,
  DrCheckbox,
  DrCheckboxGroup
};
