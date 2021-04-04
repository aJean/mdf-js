<template>
  <div v-if="hasExportCsv">222</div>
</template>

<script>
import { computed, inject } from 'vue';

import { EXPORT_CSV } from '../config/features';

import { FeatureDecisionsProviderSymbol } from './ProvideFeatureDecisions.vue';

export default {
  name: 'WidgetVisitors',
  setup() {
    const features = inject(FeatureDecisionsProviderSymbol);
    const hasExportCsv = computed(() => features.isEnabled(EXPORT_CSV));
    
    return { hasExportCsv };
  },
};
</script>