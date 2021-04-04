<script lang="tsx">
import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  props: {
    onClickHandle: Function
  },
  setup(props) {
    const onClickHandle: any = props.onClickHandle;
    const $style = useCssModule()
    console.log($style);

    return () => {
      return (
        <div class={$style.wrapper}>
          <h2> 这是vue组件</h2>
          <div>default slot:</div>
          <button onClick={onClickHandle}>点我</button>
        </div>
      );
    };
  },
});
</script>

<style module>
.wrapper {
  border: 1px solid #ccc;
}
</style>