<template>
  <ProvideFeature>
    <p :class="$style.line"><button @click="handleClick">点我好吗，好的</button></p>
    <ul>
      <li :class="$style.li"><RouterLink to="/home">跳转到 home</RouterLink></li>
      <li><RouterLink to="/counter">跳转到 counter</RouterLink></li>
      <li><RouterLink to="/about">跳转到 about</RouterLink></li>
    </ul>
  </ProvideFeature>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProvideFeature from '@/components/feature.vue';
import request from '@/api/request';

export default defineComponent({
  components: {
    ProvideFeature,
  },

  mounted() {
    console.log(this['$style']);
  },

  setup() {
    const value = ref(0);

    const handleClick = function () {
      this.showLoading('测试 loading 插件');
      request
        .get('/platform/checkApp', {headers: {Authorization: 1}})
        .then((res) => console.log(res))
        .finally(() => this.hideLoading());
    };

    return {
      value,
      handleClick,
    };
  },
});
</script>

<style lang="scss" module>
@import '@/styles/common.scss';

.line {
  padding: 20px;
  background: rgb(193, 178, 236);
}

.button {
  padding: 10px;
  background: rgb(189, 167, 167);
}
</style>

<router>
{
  meta: {
    test: 1
  },
}
</router>