<template>
  <ProvideFeature>
    <div>1212112123132122221221</div>
  </ProvideFeature>
</template>

<script>
import ProvideFeature from '@/components/feature.vue';

export default {
  name: 'App',
  components: { ProvideFeature },
};
</script>

<router>
  {
    props(params) {
      console.log(params);
    },

    meta: {
      test: 'hello'
    },

    redirect: '/home/a',
  }
</router>
