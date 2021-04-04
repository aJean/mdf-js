<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { provide } from 'vue';

import { decisions, isEnabled } from '../config/features';

export const FeatureDecisionsProviderSymbol = Symbol(
  'Feature decisions provider identifier'
);

export default {
  setup() {
    provide(FeatureDecisionsProviderSymbol, {
      decisions,
      isEnabled,
    });
  },
};
</script>