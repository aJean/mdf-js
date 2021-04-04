<template>
  <ProvideFeatureDecisions>
    <WidgetVisitors />
    <p class="button"><button @click="handleClick">点我好吗，好的</button></p>
    <ul>
      <li><RouterLink to="/home/b">跳转到 home</RouterLink></li>
      <li><RouterLink to="/counter">跳转到 counter</RouterLink></li>
      <li><RouterLink to="/about">跳转到 about</RouterLink></li>
    </ul>
  </ProvideFeatureDecisions>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ProvideFeatureDecisions from '@/components/ProvideFeatureDecisions.vue';
import WidgetVisitors from '@/components/WidgetVisitors.vue';
import request from '@/api/request';

export default defineComponent({
  components: {
    ProvideFeatureDecisions,
    WidgetVisitors,
  },
  
  setup() {
    const value = ref(0);

    const handleClick = function () {
      request.get('/platform/checkApp');
    };

    return {
      value,
      handleClick,
    };
  },
});
</script>

<style>
.button {
  padding: 10px;
  background: rgb(189, 167, 167);
}
</style>