import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(1);
    function handleAdd() {
      console.log(121);

      count.value += 1;
      console.log(12);
      
    }
    return () => (
      <>
        <div>{count.value}</div>
        <button onClick={handleAdd}>点我</button>
      </>
    );
  },
});
