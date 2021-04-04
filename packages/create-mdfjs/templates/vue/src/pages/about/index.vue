<template>
  <ProvideFeatureDecisions>
    <WidgetVisitors />
    <div>1212112123132122221221</div>
  </ProvideFeatureDecisions>
</template>

<script>
import ProvideFeatureDecisions from '@/components/ProvideFeatureDecisions.vue';
import WidgetVisitors from '@/components/WidgetVisitors.vue';

export default {
  name: 'App',
  components: { ProvideFeatureDecisions, WidgetVisitors },
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
