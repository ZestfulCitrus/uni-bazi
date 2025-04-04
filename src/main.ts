import { createSSRApp } from "vue";
import App from "./App.vue";
import uvUI from '@climblee/uv-ui'

export function createApp() {
  const app = createSSRApp(App);
  app.use(uvUI);
  return {
    app,
  };
}
