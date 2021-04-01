declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}
