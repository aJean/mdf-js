<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { provide } from 'vue';

const FeatureDecisionsProviderSymbol = Symbol(
  'Feature decisions provider identifier'
);
export default {
  setup() {
    provide(FeatureDecisionsProviderSymbol, {
      decisions: true,
      isEnabled: true,
    });
  },
};
</script>