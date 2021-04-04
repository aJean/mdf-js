import { defineComponent, Transition } from 'vue';
import TsxComponent from './components/TsxComponent';
import VueComponent from './components/VueComponent.vue';

const FuncComponent = () => <div>这是函数组件</div>;

export default defineComponent({
  setup() {
    function add() {
      console.log('add', 1);
    }

    return () => {
      return (
        <>
          <h1>测试tsx文件导入vue和tsx文件</h1>
          <TsxComponent></TsxComponent>
          <VueComponent onClickHandle={add}></VueComponent>
          <FuncComponent></FuncComponent>
        </>
      );
    };
  },
});
