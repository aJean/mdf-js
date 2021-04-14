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
    props(params){
      console.log(params);
      console.log('qy');
    },
    meta: {
      test: 1233321231232222
    },
    redirect: '/home/a'
  }
</router>
